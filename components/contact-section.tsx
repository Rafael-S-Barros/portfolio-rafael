"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { site } from "@/lib/site";
import { revealDelay, useReveal } from "./use-reveal";

export function ContactSection() {
  const t = useTranslations("contato");
  const { ref, inView } = useReveal<HTMLElement>();

  const links = [
    {
      href: `mailto:${site.email}`,
      key: t("emailKey"),
      value: site.email,
      ariaLabel: t("emailAria", { value: site.email }),
      external: false,
    },
    {
      href: site.github.url,
      key: t("githubKey"),
      value: site.github.label,
      ariaLabel: t("githubAria"),
      external: true,
    },
    {
      href: site.linkedin.url,
      key: t("linkedinKey"),
      value: site.linkedin.label,
      ariaLabel: t("linkedinAria"),
      external: true,
    },
  ];

  return (
    <section id="contato" ref={ref} data-inview={inView}>
      <div className="stack-glow" aria-hidden="true" />
      <div className="ct-comet" aria-hidden="true" />

      <div className="rb-container">
        <div className="ct-grid">
          <div className="ct-col">
            <h2 className="rv ct-title" style={revealDelay(0)}>
              {t("title")}
            </h2>
            <p className="rv ct-text" style={revealDelay(2)}>
              {t("text")}
            </p>
          </div>

          <div className="rv ct-links" style={revealDelay(3)}>
            {links.map((link) => (
              <a
                key={link.href}
                className="ct-link"
                href={link.href}
                aria-label={link.ariaLabel}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="ct-key">{link.key}</span>
                <span className="ct-val">{link.value}</span>
              </a>
            ))}
          </div>
        </div>

        <footer className="ct-footer">
          {/* This band is dark in both themes, so it always takes the
              dark-theme variant — same rule as the stack chips. */}
          <span className="ct-logo">
            <Image src="/logo/logo-dark.png" alt={site.name} width={32} height={32} />
          </span>
          <span className="ct-copy">
            {site.name} · {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </section>
  );
}
