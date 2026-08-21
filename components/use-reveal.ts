"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * Drives the `data-inview` attribute the `.rv` reveal classes key off.
 * Fires once, when ~20% of the section has entered the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return { ref, inView: inView ? "1" : "0" } as const;
}
