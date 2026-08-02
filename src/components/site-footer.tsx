import Link from "next/link";

import { ArrowRight } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { services } from "@/data/services";
import { footerNav, siteConfig } from "@/lib/site";

/**
 * How many services the footer lists before deferring to "All N services".
 * Five keeps the column roughly level with the tallest of the other three,
 * so the footer stays a balanced four-column block.
 */
const FOOTER_SERVICE_COUNT = 5;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink grain surface-wash-ink border-t border-ink-line bg-ink text-on-ink">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="w-fit rounded-xs transition-colors hover:text-jade"
            >
              <Logo markClassName="text-jade" />
            </Link>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-on-ink-muted">
              {siteConfig.description}
            </p>
            <dl className="mt-1 flex flex-col gap-2 font-mono text-[0.8125rem] text-on-ink-muted">
              <div className="flex gap-2">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="rounded-xs transition-colors hover:text-jade"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Location</dt>
                <dd>{siteConfig.location}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/*
              Generated from the catalogue, but capped. Listing all ten made
              this column twice the height of its neighbours and stretched the
              whole footer; the rest are one click away behind "All services",
              which is what a footer link is for.
            */}
            <div className="flex flex-col gap-4">
              <h2 className="eyebrow text-on-ink/45">
                <span aria-hidden="true" className="h-px w-5 bg-current" />
                Services
              </h2>
              <ul className="flex flex-col gap-2.5">
                {services.slice(0, FOOTER_SERVICE_COUNT).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-[28px] items-center rounded-xs text-[0.9375rem] text-on-ink/80 transition-colors hover:text-jade"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="inline-flex min-h-[28px] items-center gap-1.5 rounded-xs text-[0.9375rem] font-medium text-jade transition-colors hover:text-on-ink"
                  >
                    All {services.length} services
                    <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h2 className="eyebrow text-on-ink/45">
                  <span aria-hidden="true" className="h-px w-5 bg-current" />
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-[28px] items-center rounded-xs text-[0.9375rem] text-on-ink/80 transition-colors hover:text-jade"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-on-ink-muted">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="outbound_click"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xs text-[0.9375rem] text-on-ink/80 transition-colors hover:text-jade"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]">
                <path
                  fill="currentColor"
                  d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95C21.6 8.75 22 11 22 14.1V21h-4v-6.1c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9Z"
                />
              </svg>
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xs text-[0.9375rem] text-jade transition-colors hover:text-on-ink"
            >
              Book a call
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
