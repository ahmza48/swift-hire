/**
 * Renders a JSON-LD data block.
 *
 * No nonce, deliberately. CSP's `script-src` only governs elements the browser
 * would execute as script — `type="application/ld+json"` is not one of those
 * MIME types, so no browser gates it on `script-src` regardless of nonce. A
 * nonce here does nothing for security and previously caused a real bug: once
 * a browser parses `<script nonce="...">` from HTML text it zeroes out the
 * reflected *attribute* immediately (a CSP mitigation called nonce hiding),
 * while the underlying property keeps the real value. React's hydration check
 * reads the attribute, sees `""`, and flags a mismatch against the value it
 * expected to render — a false positive on every page, not a real defect.
 *
 * `data` must be built by a helper in `lib/structured-data.ts`, never from
 * user input: this content is serialised straight into the document.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escape the sequence that would otherwise close the script element.
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
