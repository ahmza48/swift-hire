"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState } from "react";

import { EASE_OUT } from "@/components/motion/reveal";
import { pipelineStages } from "@/content/pipeline";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

const ownerTone: Record<string, string> = {
  "Staffing Viro": "text-jade",
  Together: "text-on-ink",
  You: "text-on-ink-muted",
};

/**
 * The funnel: 240 sourced becomes 1 hire, and you can open any stage to see
 * what happens inside it.
 *
 * Implemented as an ARIA tablist so arrow keys move between stages and screen
 * readers announce the panel relationship, rather than as a pile of divs.
 */
export function Pipeline() {
  const [activeId, setActiveId] = useState(pipelineStages[0]!.id);
  const baseId = useId();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const prefersReduced = usePrefersReducedMotion();

  const activeIndex = pipelineStages.findIndex(
    (stage) => stage.id === activeId,
  );

  const focusStage = (index: number) => {
    const wrapped =
      (index + pipelineStages.length) % pipelineStages.length;
    const stage = pipelineStages[wrapped];
    if (!stage) return;
    setActiveId(stage.id);
    tabRefs.current.get(stage.id)?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusStage(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusStage(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusStage(0);
        break;
      case "End":
        event.preventDefault();
        focusStage(pipelineStages.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      {/* Funnel bars */}
      <div
        role="tablist"
        aria-label="Hiring pipeline stages"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex shrink-0 flex-col gap-1.5 lg:w-[46%]"
      >
        {pipelineStages.map((stage, index) => {
          const selected = stage.id === activeId;
          return (
            <button
              key={stage.id}
              ref={(node) => {
                if (node) tabRefs.current.set(stage.id, node);
                else tabRefs.current.delete(stage.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${stage.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${stage.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(stage.id)}
              className="group grid cursor-pointer grid-cols-[2.25rem_1fr] items-center gap-3 rounded-sm py-1.5 text-left sm:grid-cols-[2.75rem_1fr] sm:gap-4"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "font-mono text-xs tabular-nums transition-colors",
                  selected ? "text-jade" : "text-on-ink-muted/60",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex items-center gap-3">
                {/*
                 * The bar is the data: its width is the funnel narrowing. It
                 * grows in once, the first time the funnel scrolls into view —
                 * a plain static width read the same way but said nothing.
                 * Structurally identical to the original: a single element,
                 * direct child of this flex row, sized by percentage against
                 * it — only the width is now animated instead of static, and
                 * the selected state fills with a gradient instead of flat colour.
                 */}
                <motion.span
                  aria-hidden="true"
                  initial={prefersReduced ? false : { width: 0 }}
                  whileInView={{ width: `${stage.width}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.9,
                    delay: prefersReduced ? 0 : index * 0.08,
                    ease: EASE_OUT,
                  }}
                  style={prefersReduced ? { width: `${stage.width}%` } : undefined}
                  className={cn(
                    "h-9 shrink-0 rounded-xs transition-[background-color,transform] duration-300 sm:h-11",
                    "origin-left group-hover:scale-x-[1.015]",
                    selected
                      ? "bg-[linear-gradient(90deg,var(--color-jade-strong),var(--color-jade))] shadow-[0_0_16px_-2px_rgba(198,157,94,0.55)]"
                      : "bg-ink-raised group-hover:bg-[#282d33]",
                  )}
                />
                <span className="flex min-w-0 items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-[1.0625rem] font-bold transition-colors sm:text-xl",
                      selected ? "text-on-ink" : "text-on-ink/70",
                    )}
                  >
                    {stage.count}
                  </span>
                  <span
                    className={cn(
                      "truncate font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors sm:text-xs",
                      selected ? "text-jade" : "text-on-ink-muted",
                    )}
                  >
                    {stage.label}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="min-w-0 flex-1">
        {pipelineStages.map((stage) => (
          <div
            key={stage.id}
            role="tabpanel"
            id={`${baseId}-panel-${stage.id}`}
            aria-labelledby={`${baseId}-tab-${stage.id}`}
            hidden={stage.id !== activeId}
            tabIndex={0}
            className="rounded-md border border-ink-line bg-ink-raised/50 p-6 focus:outline-none sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
              <span className="text-on-ink-muted">
                Runs&nbsp;
                <span className={ownerTone[stage.owner] ?? "text-on-ink"}>
                  {stage.owner === "Staffing Viro"
                    ? "Staffing Viro"
                    : stage.owner === "You"
                      ? "Your team"
                      : "Both"}
                </span>
              </span>
              <span className="text-on-ink-muted">{stage.window}</span>
            </div>

            <h3 className="mt-4 text-[length:var(--text-h3)] leading-tight font-bold text-on-ink">
              {stage.label}
            </h3>

            <p className="mt-3 leading-relaxed text-on-ink-muted">
              {stage.detail}
            </p>
          </div>
        ))}

        <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-on-ink-muted/70">
          Representative volumes for a single mid-to-senior backend role. Bar
          lengths are scaled for legibility; the counts are exact.
        </p>
      </div>
    </div>
  );
}
