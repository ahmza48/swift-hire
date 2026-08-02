import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { primaryNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="on-ink grain surface-wash-ink flex min-h-[80vh] items-center bg-ink pt-24 text-on-ink">
      <div className="container-page py-20">
        <p className="eyebrow text-jade">
          <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
          Error 404
        </p>

        <h1 className="mt-7 max-w-3xl text-[length:var(--text-h1)] leading-[0.98] font-bold tracking-[-0.03em]">
          This page didn&apos;t make the shortlist.
        </h1>

        <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
          The URL is wrong, or the page has moved. Here is everywhere else you
          might have been heading.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" variant="onInk" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Site pages" className="mt-14 border-t border-ink-line pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-xs font-mono text-[0.8125rem] text-on-ink-muted underline-offset-8 transition-colors hover:text-jade hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
