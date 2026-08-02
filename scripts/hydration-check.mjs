/**
 * Visits every route against a `next dev` server and prints every console
 * message verbatim. Dev mode gives React's actual hydration diff (component
 * name, attribute, server value vs client value) — production only shows the
 * generic "attributes didn't match" summary, which is what triage needs.
 */
import puppeteer from "puppeteer-core";

import { ROUTES } from "./routes.mjs";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3743";
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let anyIssue = false;

for (const route of ROUTES) {
  const page = await browser.newPage();
  const messages = [];

  page.on("console", (msg) => {
    messages.push({ type: msg.type(), text: msg.text() });
  });
  page.on("pageerror", (err) => {
    messages.push({ type: "pageerror", text: String(err) });
  });

  // Fresh navigation each time so hydration genuinely runs (not a soft nav).
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const interesting = messages.filter(
    (m) =>
      m.type === "error" ||
      m.type === "warning" ||
      /hydrat|did not match|Warning:/i.test(m.text),
  );

  if (interesting.length > 0) {
    anyIssue = true;
    console.log(`\n=== ${route} ===`);
    for (const m of interesting) {
      console.log(`[${m.type}] ${m.text}`);
    }
  } else {
    console.log(`ok   ${route}`);
  }

  await page.close();
}

await browser.close();
console.log(anyIssue ? "\nISSUES FOUND" : "\nNo console warnings/errors on any route.");
process.exit(anyIssue ? 1 : 0);
