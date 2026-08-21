"use client";

import { useTranslations } from "next-intl";

import { site } from "@/lib/site";
import { ImageSlot } from "./image-slot";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <main className="hero">
      <div className="hero-bg rb-bg-dark">
        <ImageSlot src="/hero/dark.webp" alt="" decorative priority sizes="100vw" />
      </div>
      <div className="hero-bg rb-bg-light">
        <ImageSlot src="/hero/light.webp" alt="" decorative priority sizes="100vw" />
      </div>

      <div className="hero-scrim" />
      <div className="hero-fade" />

      <div className="hero-inner">
        <h1 className="hero-name">{site.name}</h1>
        <h2 className="hero-role">{t("role")}</h2>
        <div className="hero-ctas">
          <a href="#projetos" className="btn btn-primary">
            {t("ctaPrimary")}
          </a>
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className="btn btn-secondary"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </main>
  );
}
