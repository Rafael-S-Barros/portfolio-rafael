"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { MobileMenu, type NavItem } from "./mobile-menu";
import { useLocale, useTheme } from "./providers";

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="7" y2="7" />
      <line x1="17" y1="17" x2="19.1" y2="19.1" />
      <line x1="4.9" y1="19.1" x2="7" y2="17" />
      <line x1="17" y1="7" x2="19.1" y2="4.9" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function SiteHeader() {
  const t = useTranslations();
  const { toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = t.raw("nav.items") as NavItem[];

  return (
    <header id="rb-header" data-scrolled={scrolled ? "1" : "0"}>
      <a href="#" className="rb-brand">
        {site.name}
      </a>

      <nav className="rb-nav">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="rb-controls">
        <div className="rb-langs">
          <button
            type="button"
            className="rb-lang"
            data-active={locale === "pt" ? "1" : "0"}
            aria-pressed={locale === "pt"}
            onClick={() => setLocale("pt")}
          >
            PT
          </button>
          <span className="rb-lang-sep" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className="rb-lang"
            data-active={locale === "en" ? "1" : "0"}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>

        <button
          type="button"
          className="rb-theme-btn"
          onClick={toggleTheme}
          aria-label={t("header.toggleTheme")}
        >
          {/* Both icons ship; CSS shows the one matching `data-theme`. Driving
              this from React state would render the wrong icon for the whole
              hydration pass, since the server cannot know the visitor's OS
              preference — the same reason the hero and the chips do it here. */}
          <span className="rb-bg-dark" aria-hidden="true">
            <SunIcon />
          </span>
          <span className="rb-bg-light" aria-hidden="true">
            <MoonIcon />
          </span>
        </button>

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
