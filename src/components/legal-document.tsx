import type { ReactNode } from "react";

/**
 * Shared shell for the legal pages: a table of contents plus a constrained
 * prose column. Typographic rules live here so both documents read identically.
 */
export function LegalDocument({
  updated,
  sections,
  children,
}: {
  updated: string;
  sections: readonly { id: string; title: string }[];
  children: ReactNode;
}) {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start" data-print-hide="">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
            Last updated
          </p>
          <p className="mt-2 font-mono text-[0.8125rem]">{updated}</p>

          <nav aria-label="On this page" className="mt-8">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink">
              Contents
            </h2>
            <ol className="mt-4 flex flex-col gap-2 border-l border-on-paper/15">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px flex gap-3 border-l border-transparent py-1 pl-4 text-[0.875rem] leading-snug text-on-paper-muted transition-colors hover:border-jade-strong hover:text-on-paper"
                  >
                    <span className="font-mono text-[0.75rem] tabular-nums opacity-60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/*
          Prose rules are scoped to this wrapper with child selectors so they
          cannot leak into components rendered inside it.
        */}
        <article
          className="
            max-w-3xl
            [&_a]:rounded-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-jade-ink
            [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-[length:var(--text-h3)] [&_h2]:leading-tight [&_h2]:font-bold first:[&_h2]:mt-0
            [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-bold
            [&_li]:leading-relaxed
            [&_ol]:mt-4 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5
            [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-on-paper-muted
            [&_strong]:font-semibold [&_strong]:text-on-paper
            [&_ul]:mt-4 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:text-on-paper-muted
          "
        >
          {children}
        </article>
      </div>
    </div>
  );
}
