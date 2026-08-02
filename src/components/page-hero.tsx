import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Crumb = { name: string; href: string };

/**
 * Header band for every inner page: breadcrumb, H1, lead, optional actions.
 * Emits the matching BreadcrumbList JSON-LD so the markup and the structured
 * data can never drift apart.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: readonly Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="on-ink grain surface-wash-ink bg-ink text-on-ink">
      {/* Top padding clears the fixed header, which is transparent over the hero. */}
      <div className="container-page pt-28 pb-16 md:pt-36 md:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-on-ink-muted">
            <li>
              <Link
                href="/"
                className="rounded-xs transition-colors hover:text-jade"
              >
                Home
              </Link>
            </li>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="opacity-45">
                    /
                  </span>
                  {isLast ? (
                    <span aria-current="page" className="text-on-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="rounded-xs transition-colors hover:text-jade"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal className="mt-10 max-w-4xl">
          <p className="eyebrow text-jade">
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-[length:var(--text-h1)] leading-[0.98] font-bold tracking-[-0.03em]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </Reveal>
      </div>

      {crumbs.length > 0 ? <JsonLd data={breadcrumbJsonLd(crumbs)} /> : null}
    </section>
  );
}
