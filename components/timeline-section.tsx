"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { SectionHeading } from "./section-heading";
import { useReveal } from "./use-reveal";

type TimelineItem = { period: string; title: string; org: string };

export function TimelineSection() {
  const t = useTranslations("trajetoria");
  const { ref, inView } = useReveal<HTMLElement>();
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const items = t.raw("items") as TimelineItem[];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // The spine fills as the section scrolls past 70% of the viewport; each
    // node lights up once the fill head reaches its centre.
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.height) return;

      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.7 - rect.top) / rect.height),
      );
      const head = progress * rect.height;

      const fill = fillRef.current;
      if (fill) fill.style.transform = `translateX(-50%) scaleY(${progress})`;

      const marker = markerRef.current;
      if (marker) {
        marker.style.top = `${head}px`;
        marker.style.opacity = progress > 0.001 ? "1" : "0";
      }

      wrap.querySelectorAll<HTMLElement>(".tl-row").forEach((row) => {
        const node = row.querySelector<HTMLElement>(".tl-node");
        const centre = row.offsetTop + (node ? node.offsetTop + node.offsetHeight / 2 : 0);
        row.setAttribute("data-on", head >= centre ? "1" : "0");
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <section id="trajetoria" ref={ref} data-inview={inView} className="rb-section">
      <div className="sec-glow" data-pos="left" />
      <div className="sec-glow" data-pos="right-top" />

      <div className="rb-container tl-inner">
        <SectionHeading num="03" label={t("label")} title={t("headline")} />

        <div className="tl-wrap" ref={wrapRef}>
          <div className="tl-scan" aria-hidden="true" />
          <div className="tl-line" />
          <div className="tl-fill" ref={fillRef} />

          {items.map((item, i) => (
            <div
              key={item.period + item.title}
              className="tl-row"
              data-side={i % 2 === 1 ? "left" : "right"}
              data-current={item.period.startsWith("2026") ? "1" : "0"}
              data-on="0"
            >
              <div className="tl-node" />
              <div className="tl-date">{item.period}</div>
              <div className="tl-card">
                <h3 className="tl-title">{item.title}</h3>
                <span className="tl-org">{item.org}</span>
              </div>
            </div>
          ))}

          <div className="tl-marker" ref={markerRef} />
        </div>
      </div>
    </section>
  );
}
