import type { Faq } from "@/content/faq";

/**
 * Built on native <details>/<summary>: keyboard operable, screen-reader
 * announced and expandable before hydration, with no JS of its own.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.question} className="border-b border-on-paper/15">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <h3 className="text-[1.0625rem] leading-snug font-bold transition-colors group-hover:text-jade-ink md:text-lg">
                {item.question}
              </h3>

              <span
                aria-hidden="true"
                className="mt-1 grid size-6 shrink-0 place-items-center rounded-xs border border-on-paper/25 text-on-paper-muted transition-colors group-hover:border-jade-strong group-hover:text-jade-ink"
              >
                {/* Plus collapses to a minus: only the vertical stroke turns. */}
                <svg viewBox="0 0 12 12" className="size-3" fill="none">
                  <path
                    d="M1.5 6h9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 1.5v9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="origin-center transition-transform duration-200 group-open:rotate-90"
                  />
                </svg>
              </span>
            </summary>

            <p className="max-w-3xl pb-6 leading-relaxed text-on-paper-muted">
              {item.answer}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
