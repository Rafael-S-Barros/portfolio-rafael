"use client";

import { useTranslations } from "next-intl";

import { stackChips } from "@/lib/site";
import { useReveal } from "./use-reveal";

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
            <div key={chip.label} className={`rv sk-chip rvd${i}`}>
              <span
                className="chip-ic rb-bg-dark"
                aria-hidden="true"
                style={{ backgroundImage: `url(${chip.iconDark})` }}
              />
              <span
                className="chip-ic rb-bg-light"
                aria-hidden="true"
                style={{ backgroundImage: `url(${chip.iconLight})` }}
              />
              <span className="chip-label">{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
