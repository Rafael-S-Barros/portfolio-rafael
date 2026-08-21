"use client";

import { useTranslations } from "next-intl";

import { ImageSlot } from "./image-slot";
import { SectionHeading } from "./section-heading";
import { revealDelay, useReveal } from "./use-reveal";

type MetaRow = { k: string; v: string };

export function AboutSection() {
  const t = useTranslations("sobre");
  const { ref, inView } = useReveal<HTMLElement>();

  const meta = t.raw("meta") as MetaRow[];
  const photoAlt = t("photoAlt");

  return (
    <section id="sobre" ref={ref} data-inview={inView} className="rb-section">
      <div className="sec-glow" data-pos="left" />
      <div className="rb-container sobre-inner">
        <SectionHeading num="01" label={t("label")} title={t("headline")} />

        <div className="sobre-grid">
          <div className="sobre-col">
            <div className="rv sobre-photo" style={revealDelay(0)}>
              <div className="sobre-photo-frame">
                <ImageSlot alt={photoAlt} sizes="(max-width: 760px) 100vw, 380px" />
              </div>
            </div>
            <p className="rv sobre-text" style={revealDelay(1)}>
              {t("text")}
            </p>
          </div>

          <div className="sobre-meta">
            {meta.map((row, i) => (
              <div key={row.k} className="rv meta-row" style={revealDelay(i + 2)}>
                <span className="meta-k">{row.k}</span>
                <span className="meta-v">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
