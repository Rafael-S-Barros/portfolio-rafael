"use client";

import { useTranslations } from "next-intl";

import { stackChips } from "@/lib/site";
import { revealDelay, useReveal } from "./use-reveal";

export function StackSection() {
  const t = useTranslations("stack");
  const { ref, inView } = useReveal<HTMLElement>();

  return (
    <section id="stack" ref={ref} data-inview={inView} aria-label={t("title")}>
      <div className="stack-comet" aria-hidden="true" />
      <div className="stack-glow" aria-hidden="true" />

      <div className="rb-container stack-inner">
        <h2 className="stack-title">{t("title")}</h2>

        <div className="stack-chips">
          {stackChips.map((chip, i) => (
            // The reveal sits on a wrapper: it animates `transform`, and so
            // does the chip's hover lift. One transition-delay cannot serve
            // both a staggered entrance and an instant hover.
            <div key={chip.label} className="rv" style={revealDelay(i)}>
              <div className="sk-chip">
                <span
                  className="chip-ic"
                  aria-hidden="true"
                  style={{ backgroundImage: `url(${chip.icon})` }}
                />
                <span className="chip-label">{chip.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
