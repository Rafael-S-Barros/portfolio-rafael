"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

export type NavItem = { href: string; label: string };

/** Matches the breakpoint where `.rb-nav` is hidden and this takes over. */
const MOBILE_QUERY = "(max-width: 760px)";

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

/**
 * Below 760px the header's four anchors do not fit, so `.rb-nav` is hidden and
 * this button opens them in a panel instead. Above that breakpoint the button
 * is hidden by CSS and this component is inert.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  function close({ restoreFocus = false } = {}) {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const links = () => Array.from(panel.querySelectorAll<HTMLAnchorElement>("a"));
    links()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab") return;

      // Keep Tab inside the panel while it is open.
      const focusable = links();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel.contains(target) || buttonRef.current?.contains(target)) return;
      close();
    };

    // Resizing past the breakpoint hides the button, which would strand an
    // open panel with no way to dismiss it.
    const desktop = window.matchMedia(MOBILE_QUERY);
    const onBreakpointChange = () => {
      if (!desktop.matches) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="rb-menu-btn"
        aria-label={t("menu")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Always rendered, toggled with `hidden`, so `aria-controls` always
          points at a real element and the panel stays out of the tab order
          while closed. */}
      <div id={panelId} ref={panelRef} className="rb-menu-panel" hidden={!open}>
        <nav aria-label={t("menu")}>
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => close()}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
