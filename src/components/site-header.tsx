"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ServiceIcon } from "@/components/icons/service-icon";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { services } from "@/data/services";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";
import { primaryNav, siteConfig } from "@/lib/site";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn(
        "size-3 shrink-0 transition-transform duration-200",
        open && "rotate-180",
      )}
    >
      <path
        d="m2.5 4.5 3.5 3.5 3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  /* Header goes frosted once the hero is behind us. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Any navigation closes everything. */
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /*
   * Click-outside dismissal.
   *
   * The panel is click-toggled, not hover-driven — a full-width overlay that
   * opens on hover is far too easy to trigger by accident while moving the
   * pointer across the header, and just as easy to get stuck open. With click
   * there is no ambiguity about intent, so it needs an explicit way out:
   * anywhere outside the panel and its trigger.
   */
  useEffect(() => {
    if (!megaOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (servicesButtonRef.current?.contains(target)) return;
      setMegaOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [megaOpen]);

  /* Scrolling with a full-width panel open leaves it floating over content. */
  useEffect(() => {
    if (!megaOpen) return;
    const onScroll = () => setMegaOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaOpen]);

  /* Escape closes whichever layer is open, and returns focus to its trigger. */
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (megaOpen) {
          setMegaOpen(false);
          servicesButtonRef.current?.focus();
        } else {
          setMobileOpen(false);
          toggleRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, mobileOpen]);

  /* Lock the page and trap Tab while the mobile sheet is open. */
  useEffect(() => {
    if (!mobileOpen) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = mobileRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /* Transparent over the hero; frosted once scrolled or when a panel is open. */
  const solid = scrolled || megaOpen || mobileOpen;

  const accordionTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.25, 1, 0.5, 1] as const };

  return (
    <header
      className={cn(
        "on-ink fixed inset-x-0 top-0 z-50 text-on-ink transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "bg-ink/85 shadow-[0_1px_0_0_var(--color-ink-line),0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-20 md:h-[5.5rem]",
          )}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="rounded-xs text-on-ink transition-colors hover:text-jade"
          >
            <Logo markClassName="text-jade" />
          </Link>

          {/* ------------------------------------------------ desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) =>
              item.hasMegaMenu ? (
                <div key={item.href} className="relative flex items-center">
                  <button
                    ref={servicesButtonRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls="services-mega-menu"
                    onClick={() => setMegaOpen((open) => !open)}
                    className={cn(
                      // Browsers default <button> to cursor:default, not
                      // pointer — the other nav items are <Link>s (anchors),
                      // which get pointer for free, so without this the
                      // Services trigger was the only item in the row that
                      // didn't look clickable on hover.
                      "relative inline-flex cursor-pointer items-center gap-1.5 rounded-xs px-3.5 py-2 text-[0.9375rem] transition-colors",
                      megaOpen || isActive(item.href)
                        ? "text-jade"
                        : "text-on-ink/80 hover:text-on-ink",
                    )}
                  >
                    {item.label}
                    <Chevron open={megaOpen} />
                    {isActive(item.href) ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-jade"
                      />
                    ) : null}
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-xs px-3.5 py-2 text-[0.9375rem] transition-colors",
                    isActive(item.href)
                      ? "text-jade"
                      : "text-on-ink/80 hover:text-on-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-jade"
                    />
                  ) : null}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/contact"
              size="md"
              className="hidden sm:inline-flex"
              data-analytics="cta_click_start_hiring"
            >
              Get a quote
              <ArrowRight />
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-on-ink/20 text-on-ink transition-colors hover:border-jade hover:text-jade lg:hidden"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                {mobileOpen ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- desktop mega-menu */}
      <AnimatePresence>
        {megaOpen ? (
          <motion.div
            id="services-mega-menu"
            ref={panelRef}
            key="mega"
            data-motion=""
            initial={prefersReduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={
              prefersReduced ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }
            }
            className="absolute inset-x-0 top-full hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-ink-line bg-ink/95 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl lg:block"
          >
            <div className="container-page py-7">
              <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-ink-line pb-3">
                <p className="eyebrow text-jade">
                  <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
                  What we do
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xs text-[0.875rem] text-on-ink/80 underline-offset-8 transition-colors hover:text-jade hover:underline"
                >
                  View all services
                  <ArrowRight />
                </Link>
              </div>

              {/* Three columns keeps ten services to ~4 rows instead of 5,
                  so the panel never approaches full-screen height. */}
              <ul className="grid grid-cols-3 gap-x-6 gap-y-0.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-3 rounded-sm p-2.5 transition-colors hover:bg-ink-raised"
                    >
                      <span className="text-jade transition-transform duration-300 group-hover:scale-110">
                        <ServiceIcon name={service.icon} className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-medium text-on-ink transition-colors group-hover:text-jade">
                          {service.name}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ----------------------------------------------- mobile sheet */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            ref={mobileRef}
            key="mobile"
            data-motion=""
            initial={prefersReduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={
              prefersReduced ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }
            }
            /*
             * Ten services plus five nav links overflows a 375×667 screen, so the
             * sheet scrolls independently and `overscroll-contain` stops the scroll
             * chaining to the locked page behind it.
             */
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink-line bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-5">
              <ul className="flex flex-col">
                {primaryNav.map((item) =>
                  item.hasMegaMenu ? (
                    <li key={item.href} className="border-b border-ink-line/60">
                      {/*
                       * Split row: the label navigates to /services, the chevron
                       * expands the list. Making the whole row do both is the usual
                       * way this breaks on touch — you can no longer reach the
                       * landing page at all.
                       */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex min-h-[52px] flex-1 items-center rounded-xs py-3 text-lg transition-colors",
                            isActive(item.href)
                              ? "text-jade"
                              : "text-on-ink hover:text-jade",
                          )}
                        >
                          {item.label}
                        </Link>

                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((open) => !open)}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-panel"
                          aria-label={
                            mobileServicesOpen
                              ? "Collapse services list"
                              : "Expand services list"
                          }
                          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-on-ink/20 text-on-ink transition-colors hover:border-jade hover:text-jade"
                        >
                          <Chevron open={mobileServicesOpen} />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {mobileServicesOpen ? (
                          <motion.div
                            id="mobile-services-panel"
                            key="services-accordion"
                            data-motion=""
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={accordionTransition}
                            className="overflow-hidden"
                          >
                            <ul className="flex flex-col gap-0.5 border-l border-ink-line pb-3 pl-3">
                              {services.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex min-h-[48px] items-center gap-3 rounded-xs py-2 text-[0.9375rem] text-on-ink/85 transition-colors hover:text-jade"
                                  >
                                    <ServiceIcon
                                      name={service.icon}
                                      className="size-[18px] text-jade"
                                    />
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.href} className="border-b border-ink-line/60">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-[52px] items-center justify-between rounded-xs py-3 text-lg transition-colors",
                          isActive(item.href)
                            ? "text-jade"
                            : "text-on-ink hover:text-jade",
                        )}
                      >
                        {item.label}
                        <ArrowRight className="opacity-40" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>

              <ButtonLink href="/contact" size="lg" className="mt-6 mb-2 w-full">
                Get a quote
                <ArrowRight />
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
