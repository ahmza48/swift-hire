/**
 * Guards against horizontal overflow at every breakpoint.
 *
 * Full-bleed elements (the marquee, ambient glows, oversized display type) are
 * the usual cause of a page that scrolls sideways on mobile, and it is easy to
 * ship because it is invisible at desktop widths.
 */
import puppeteer from "puppeteer-core";

import { ROUTES } from "./routes.mjs";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3742";
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const WIDTHS = [375, 768, 1280, 1440];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let failures = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("swifthire.consent.v1", "rejected");
  });

  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 300));

    const result = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowing = [];
      if (doc.scrollWidth > doc.clientWidth + 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            overflowing.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`,
            );
          }
        }
      }
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        culprits: overflowing.slice(0, 3),
      };
    });

    if (result.scrollWidth > result.clientWidth + 1) {
      failures++;
      console.log(
        `FAIL ${width}px ${route} — scrollWidth ${result.scrollWidth} > ${result.clientWidth}`,
      );
      for (const c of result.culprits) console.log(`       ${c}`);
    }
  }

  if (failures === 0) console.log(`ok   ${width}px — no horizontal overflow on any route`);
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "\nNo horizontal overflow anywhere." : `\n${failures} overflow(s).`);
process.exit(failures === 0 ? 0 : 1);
