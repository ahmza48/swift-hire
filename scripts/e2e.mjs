/**
 * End-to-end checks against a running production build, driven through the
 * locally-installed Chrome via puppeteer-core (no browser download).
 *
 *   pnpm build && pnpm start -p 3742 &
 *   node scripts/e2e.mjs
 *
 * Focus is the navigation, because that is the part with real state: a mobile
 * accordion inside a scroll-locked sheet, and a hover-intent mega-menu. It also
 * fails the run on any React hydration error or console error, on every page.
 */
import puppeteer from "puppeteer-core";

import { ROUTES, SERVICE_SLUGS } from "./routes.mjs";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3742";
/** Forward slashes work on Windows and avoid escaping noise. */
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const MOBILE = { width: 375, height: 667, isMobile: true, hasTouch: true };
const DESKTOP = { width: 1440, height: 900 };

let failures = 0;
let checks = 0;

function check(label, condition, detail = "") {
  checks++;
  if (condition) {
    console.log(`  PASS  ${label}`);
  } else {
    failures++;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function section(title) {
  console.log(`\n${title}`);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

/** Collects console errors and page exceptions for one page. */
function watchErrors(page) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

/* ============================================================ MOBILE NAV === */
section("MOBILE (375×667) — hamburger, services accordion, navigation");
{
  const page = await browser.newPage();
  await page.setViewport(MOBILE);
  const errors = watchErrors(page);

  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });

  // The sheet must not be in the DOM before the hamburger is pressed.
  check(
    "menu closed on load",
    (await page.$("#mobile-menu")) === null,
  );

  const toggle = await page.$('button[aria-controls="mobile-menu"]');
  check("hamburger button present", toggle !== null);

  await toggle.click();
  await page.waitForSelector("#mobile-menu", { visible: true, timeout: 5000 });
  check("menu opens on tap", true);

  check(
    "hamburger reports expanded",
    (await page.$eval(
      'button[aria-controls="mobile-menu"]',
      (el) => el.getAttribute("aria-expanded"),
    )) === "true",
  );

  check(
    "page scroll locked behind sheet",
    (await page.evaluate(() => getComputedStyle(document.body).overflow)) ===
      "hidden",
  );

  // Services accordion — collapsed to begin with.
  const chevron = await page.$('button[aria-controls="mobile-services-panel"]');
  check("services accordion toggle present", chevron !== null);
  check(
    "accordion collapsed initially",
    (await page.$("#mobile-services-panel")) === null,
  );

  await chevron.click();
  await page.waitForSelector("#mobile-services-panel", {
    visible: true,
    timeout: 5000,
  });
  // Let the height:auto animation settle.
  await new Promise((r) => setTimeout(r, 450));

  const links = await page.$$eval("#mobile-services-panel a[href]", (nodes) =>
    nodes.map((n) => ({
      href: n.getAttribute("href"),
      text: n.textContent.trim(),
      visible: n.getBoundingClientRect().height > 0,
    })),
  );

  check("all 6 services listed", links.length === 6, `got ${links.length}`);
  check(
    "every service link is rendered with height",
    links.every((l) => l.visible),
  );
  check(
    "every link points at /services/<slug>",
    links.every((l) => /^\/services\/[a-z-]+$/.test(l.href)),
    links.map((l) => l.href).join(", "),
  );

  // The panel must be reachable by scrolling — 10 services overflow 667px.
  const panelScroll = await page.$eval("#mobile-menu", (el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    overflowY: getComputedStyle(el).overflowY,
  }));
  check(
    "sheet scrolls when content overflows",
    panelScroll.overflowY === "auto" || panelScroll.overflowY === "scroll",
    `overflowY=${panelScroll.overflowY}`,
  );

  // Last service must be reachable after scrolling the sheet.
  await page.$eval("#mobile-menu", (el) => {
    el.scrollTop = el.scrollHeight;
  });
  await new Promise((r) => setTimeout(r, 200));
  const lastVisible = await page.$$eval("#mobile-services-panel a[href]", (nodes) => {
    const last = nodes[nodes.length - 1];
    const r = last.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= window.innerHeight + 1;
  });
  check("last service reachable after scrolling sheet", lastVisible);

  // Tapping a service navigates.
  await page.$eval("#mobile-services-panel a[href]", (el) => el.scrollIntoView());
  await new Promise((r) => setTimeout(r, 150));
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 15000 }),
    page.click('#mobile-services-panel a[href="/services/technical-talent-acquisition"]'),
  ]);
  check(
    "tapping a service navigates to its page",
    page.url().endsWith("/services/technical-talent-acquisition"),
    page.url(),
  );
  // The sheet has a 240ms exit animation, so it is still in the DOM for a beat
  // after the route changes. Poll for its removal rather than sampling once.
  let sheetGone = false;
  for (let i = 0; i < 20; i++) {
    if ((await page.$("#mobile-menu")) === null) {
      sheetGone = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  check("menu auto-closes after navigation", sheetGone);
  check(
    "scroll lock released after navigation",
    (await page.evaluate(() => getComputedStyle(document.body).overflow)) !==
      "hidden",
  );

  const h1 = await page.$eval("h1", (el) => el.textContent.trim());
  check("service page renders its H1", h1 === "Technical Talent Acquisition", h1);

  // The "Services" label itself must still reach the landing page.
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await (await page.$('button[aria-controls="mobile-menu"]')).click();
  await page.waitForSelector("#mobile-menu", { visible: true });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 15000 }),
    page.click('#mobile-menu a[href="/services"]'),
  ]);
  check(
    "Services label still opens the landing page",
    page.url().endsWith("/services"),
    page.url(),
  );

  check("no console errors on mobile", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* =========================================================== DESKTOP NAV === */
section("DESKTOP (1440×900) — mega-menu hover, keyboard, escape");
{
  const page = await browser.newPage();
  await page.setViewport(DESKTOP);
  const errors = watchErrors(page);

  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });

  check(
    "mega-menu closed on load",
    (await page.$("#services-mega-menu")) === null,
  );

  const servicesBtn = await page.$('button[aria-controls="services-mega-menu"]');
  check("services trigger present", servicesBtn !== null);

  // Hover-to-open: the primary interaction is now pointer-hover so the panel
  // must appear when the cursor lands on the trigger.
  await servicesBtn.hover();
  await page.waitForSelector("#services-mega-menu", {
    visible: true,
    timeout: 5000,
  });
  await new Promise((r) => setTimeout(r, 200));
  check("mega-menu opens on hover", true);

  // Click still works as an equivalent open/toggle for keyboard/tap users.
  // We close first so the click actually opens rather than closes.
  await page.mouse.move(20, 20);
  await new Promise((r) => setTimeout(r, 300));
  await servicesBtn.click();
  await page.waitForSelector("#services-mega-menu", {
    visible: true,
    timeout: 5000,
  });
  await new Promise((r) => setTimeout(r, 200));
  check("mega-menu opens on click", true);

  const megaLinks = await page.$$eval(
    "#services-mega-menu ul a[href]",
    (nodes) => nodes.map((n) => n.getAttribute("href")),
  );
  check("mega-menu lists 6 services", megaLinks.length === 6, `got ${megaLinks.length}`);

  const cols = await page.$eval("#services-mega-menu ul", (el) =>
    getComputedStyle(el).gridTemplateColumns.split(" ").length,
  );
  check("mega-menu is a 3-column grid", cols === 3, `${cols} columns`);

  // Panel must never dominate the viewport.
  const panelRatio = await page.evaluate(() => {
    const el = document.querySelector("#services-mega-menu");
    return el.getBoundingClientRect().height / window.innerHeight;
  });
  check(
    "mega-menu stays under half the viewport height",
    panelRatio < 0.5,
    `${Math.round(panelRatio * 100)}% of viewport`,
  );

  // Clicking outside dismisses it.
  await page.mouse.click(20, 700);
  await new Promise((r) => setTimeout(r, 400));
  check(
    "click outside closes mega-menu",
    (await page.$("#services-mega-menu")) === null,
  );

  // Reopen via hover, then confirm Escape closes and returns focus to the
  // trigger. Using hover rather than click because a mouse traversal to the
  // button now toggles between mouseenter-open and click-toggle in the same
  // gesture; hover keeps the intent unambiguous for this assertion.
  await servicesBtn.hover();
  await page.waitForSelector("#services-mega-menu", { visible: true, timeout: 5000 });
  await servicesBtn.focus();
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));
  check(
    "escape closes mega-menu",
    (await page.$("#services-mega-menu")) === null,
  );
  check(
    "focus returns to trigger after escape",
    await page.evaluate(
      () =>
        document.activeElement?.getAttribute("aria-controls") ===
        "services-mega-menu",
    ),
  );

  // Header goes frosted after scrolling past the hero.
  const before = await page.$eval("header", (el) => getComputedStyle(el).backgroundColor);
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise((r) => setTimeout(r, 600));
  const after = await page.$eval("header", (el) => ({
    bg: getComputedStyle(el).backgroundColor,
    blur: getComputedStyle(el).backdropFilter,
  }));
  check(
    "header transparent over hero",
    before === "rgba(0, 0, 0, 0)",
    before,
  );
  check(
    "header becomes frosted on scroll",
    after.bg !== "rgba(0, 0, 0, 0)" && after.blur !== "none",
    `bg=${after.bg} blur=${after.blur}`,
  );

  // The persistent floating CTA was retired: the header already carries a
  // Book Appointment button on every viewport, so a second sticky control at
  // the bottom-right would give the mobile screen two competing appointment
  // controls at once. What must stay true is that the header CTA is still
  // there after scroll — verified via the top-of-page header link.
  const headerCta = await page.$('header a[href="/contact#book"]');
  check("header Book Appointment stays reachable", headerCta !== null);

  check("no console errors on desktop", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ====================================================== ALL PAGES CLEAN === */
section("ALL ROUTES — hydration + console errors, content visible");
{
  /*
   * A full browser pass per route is slow, so this samples rather than
   * exhausting the list — every non-service page, plus the first and last
   * service slug to catch both ends of the dynamic route. Every route (all 10
   * services included) is checked by `validate:html` and `check:hydration`,
   * which are HTTP-level and cheap enough to run exhaustively.
   */
  const nonServiceRoutes = ROUTES.filter((r) => !r.startsWith("/services/"));
  const sampleServiceRoutes = [
    `/services/${SERVICE_SLUGS[0]}`,
    `/services/${SERVICE_SLUGS[SERVICE_SLUGS.length - 1]}`,
  ];
  const routes = [...nonServiceRoutes, ...sampleServiceRoutes];

  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport(DESKTOP);
    const errors = watchErrors(page);

    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
    // Give scroll-reveal a moment; above-the-fold content should be visible.
    await new Promise((r) => setTimeout(r, 700));

    const hydration = errors.filter((e) =>
      /hydrat|did not match|server rendered HTML/i.test(e),
    );
    const heroVisible = await page.$eval("h1", (el) => {
      const style = getComputedStyle(el);
      return style.opacity !== "0" && style.visibility !== "hidden";
    });

    const ok = errors.length === 0 && heroVisible;
    checks++;
    if (ok) {
      console.log(`  PASS  ${route}`);
    } else {
      failures++;
      console.log(
        `  FAIL  ${route} — hydration=${hydration.length} errors=${errors.length} heroVisible=${heroVisible}`,
      );
      for (const e of errors.slice(0, 3)) console.log(`          ${e.slice(0, 160)}`);
    }
    await page.close();
  }
}

/* ===================================================== REDUCED MOTION ===== */
section("REDUCED MOTION — everything static and visible");
{
  const page = await browser.newPage();
  await page.setViewport(DESKTOP);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  const errors = watchErrors(page);

  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));

  // Nothing anywhere on the page may be left at opacity 0.
  const hidden = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("[data-motion], section, h1, h2")) {
      const s = getComputedStyle(el);
      if (parseFloat(s.opacity) < 0.99) {
        out.push(`${el.tagName}.${el.className?.toString().slice(0, 40)}`);
      }
    }
    return out;
  });
  check(
    "no element left transparent under reduced motion",
    hidden.length === 0,
    hidden.slice(0, 4).join(" | "),
  );

  // Deep content must be visible without scrolling to it.
  const deepVisible = await page.evaluate(() => {
    const headings = [...document.querySelectorAll("h2")];
    return headings.every((h) => parseFloat(getComputedStyle(h).opacity) > 0.99);
  });
  check("below-fold headings visible without scrolling", deepVisible);

  const ambient = await page.$$eval("[data-motion]", (nodes) =>
    nodes.some((n) => n.className.toString().includes("radial-gradient")),
  );
  check("ambient loop removed under reduced motion", ambient === false);

  check("no console errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

await browser.close();

console.log(
  `\n${failures === 0 ? "ALL PASS" : `${failures} FAILED`} — ${checks - failures}/${checks} checks`,
);
process.exit(failures === 0 ? 0 : 1);
