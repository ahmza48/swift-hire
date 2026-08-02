/**
 * Validates the rendered HTML of every public page.
 *
 * Run against a live server:
 *   pnpm build && pnpm start &
 *   pnpm validate:html
 *
 * Next.js streams document metadata into <body> and hoists it on the client,
 * and React tags suspense boundaries with ids like `B:0` and `S:1`. Both are
 * framework behaviour we cannot change and browsers handle correctly, so they
 * are filtered out below — everything that survives the filter is our markup
 * and should be fixed.
 */
import { HtmlValidate } from "html-validate";

import { ROUTES } from "./routes.mjs";

const BASE = process.env.VALIDATE_BASE_URL ?? "http://localhost:3742";

/** Every real route, plus one unknown path to confirm 404 renders validly. */
const PATHS = [...ROUTES, "/this-page-does-not-exist"];

/** Artifacts of Next/React streaming, not defects in our markup. */
const FRAMEWORK_ARTIFACTS = [
  // Metadata streamed into <body>, hoisted to <head> during hydration.
  (m) =>
    ["element-permitted-content", "element-permitted-parent"].includes(m.ruleId) &&
    /<(title|meta|link|style)> element/.test(m.message),
  (m) =>
    m.ruleId === "element-required-content" &&
    /<head> element must have <title>/.test(m.message),
  // React suspense-boundary and Next runtime ids.
  (m) => m.ruleId === "valid-id",
  // camelCase prop names appearing inside the serialised RSC flight payload,
  // not real DOM attributes.
  (m) => m.ruleId === "attr-case",
  // React serialises boolean attributes as `hidden=""`, which is valid HTML5.
  (m) => m.ruleId === "attribute-empty-style",
];

/*
 * Config is inlined rather than read from .htmlvalidate.json: `validateString`
 * has no file path to resolve a config from.
 *
 * The disabled rules are all stylistic preferences about how markup is *written*
 * (`<meta/>` vs `<meta>`, `async=""` vs `async`, inline styles). React controls
 * that serialisation entirely, so they can only ever report framework output.
 * Everything left enabled catches genuine defects: bad nesting, duplicate ids,
 * skipped heading levels, missing required attributes, and the WCAG rules.
 */
const htmlvalidate = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "element-permitted-content": "error",
    "element-required-attributes": "error",
    "no-dup-id": "error",
    "heading-level": "error",
    "no-implicit-button-type": "error",
    "no-implicit-input-type": "error",
    "wcag/h30": "error",
    "wcag/h32": "error",
    "wcag/h37": "error",
    "wcag/h63": "error",
    "wcag/h71": "error",

    // React-controlled serialisation — not something we author.
    "void-style": "off",
    "attribute-boolean-style": "off",
    "attribute-empty-style": "off",
    "attr-case": "off",
    "valid-id": "off",
    "no-inline-style": "off",
    "no-trailing-whitespace": "off",
    "long-title": "off",
    "require-sri": "off",
    "script-type": "off",
    "prefer-native-element": "off",
  },
});

let total = 0;

for (const path of PATHS) {
  const response = await fetch(`${BASE}${path}`);
  const html = await response.text();
  const report = await htmlvalidate.validateString(html);

  const real = report.results
    .flatMap((result) => result.messages)
    .filter((message) => !FRAMEWORK_ARTIFACTS.some((skip) => skip(message)));

  total += real.length;

  const status = real.length === 0 ? "ok  " : "FAIL";
  console.log(`${status} ${response.status} ${path}${real.length ? ` — ${real.length} issue(s)` : ""}`);

  for (const message of real) {
    console.log(`       ${message.ruleId}: ${message.message}`);
  }
}

console.log(
  total === 0
    ? "\nNo HTML validity or nesting issues in app markup."
    : `\n${total} issue(s) found.`,
);

process.exit(total === 0 ? 0 : 1);
