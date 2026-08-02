/**
 * One-off visual review tool. Not part of the regular test suite — used to
 * self-critique design work by actually looking at the rendered page instead
 * of guessing from markup. Screenshots land in the OS temp dir.
 */
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3742";
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const OUT = join(tmpdir(), "swifthire-screens");
mkdirSync(OUT, { recursive: true });

const targets = [
  { path: "/", name: "home", width: 1440, height: 4200 },
  { path: "/", name: "home-mobile", width: 390, height: 5200 },
  { path: "/services", name: "services", width: 1440, height: 2400 },
  { path: "/services/recruitment-staffing", name: "service-detail", width: 1440, height: 3600 },
  { path: "/about", name: "about", width: 1440, height: 2600 },
  { path: "/how-it-works", name: "how-it-works", width: 1440, height: 2400 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-device-scale-factor=1"],
});

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: t.width, height: Math.min(t.height, 1400) });
  await page.goto(`${BASE}${t.path}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 900));
  const file = join(OUT, `${t.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await page.close();
}

await browser.close();
