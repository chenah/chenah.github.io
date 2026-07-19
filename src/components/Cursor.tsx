"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * A minimal custom cursor: a precise dot that tracks the pointer 1:1 and a
 * softer ring that trails it with spring physics, growing over interactive
 * elements. Only enabled on fine-pointer, hover-capable, motion-OK devices;
 * everywhere else the native cursor is left untouched.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const capable =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!capable) return;

    const enableTimer = window.setTimeout(() => setEnabled(true), 0);
    document.documentElement.classList.add("cursor-ready");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest("a, button, [role='button'], [data-cursor='hover']"),
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.7 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </>
  );
}
