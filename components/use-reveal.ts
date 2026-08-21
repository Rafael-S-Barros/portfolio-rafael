"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import type { CSSProperties } from "react";

/** One stagger step between consecutive items. */
const REVEAL_STEP_MS = 60;
/** Ceiling, so a long list never leaves its tail invisible for too long. */
const REVEAL_MAX_DELAY_MS = 540;

/**
 * Drives the `data-inview` attribute the `.rv` reveal classes key off.
 * Fires once, when ~20% of the section has entered the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return { ref, inView: inView ? "1" : "0" } as const;
}

/**
 * Stagger delay for the nth revealed item, as a style the `.rv` rule reads.
 * Scales to any list length — unlike the fixed class ladder it replaces.
 */
export function revealDelay(index: number): CSSProperties {
  const delay = Math.min(Math.max(index, 0) * REVEAL_STEP_MS, REVEAL_MAX_DELAY_MS);
  return { "--rv-delay": `${delay}ms` } as CSSProperties;
}
