"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade + rise into view once, with an optional stagger delay. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Kinetic "mask reveal" for headings: text rises out from behind a clip edge.
 * Splits on spaces so each word animates on its own line-mask with a stagger.
 */
export function MaskReveal({
  text,
  className,
  delay = 0,
  mount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** animate immediately on mount (above-the-fold) instead of on scroll */
  mount?: boolean;
}) {
  const words = text.split(" ");
  const anim = { y: "0%" };
  const initial = { y: "110%" };
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          className="mask-line"
          style={{ display: "inline-block", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={initial}
            {...(mount
              ? { animate: anim }
              : {
                  whileInView: anim,
                  viewport: { once: true, margin: "0px 0px -10% 0px" },
                })}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: delay + i * 0.08,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Clip-mask reveal for rich headings: the whole block rises out from behind a
 * clip edge on scroll into view. Unlike MaskReveal it keeps arbitrary inner
 * markup (line breaks, italic accents), so it suits multi-line display titles.
 * A small padding/negative-margin pair keeps descenders from being clipped.
 */
export function ClipReveal({
  children,
  delay = 0,
  className,
  mount = false,
  block = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  mount?: boolean;
  /** render full-width block (keeps text-align of a centered/multi-line heading) */
  block?: boolean;
}) {
  const display = block ? "block" : "inline-block";
  const variants = {
    hidden: { y: "115%" },
    shown: { y: "0%" },
  };
  // The OUTER wrapper is what the viewport observer watches — it stays in normal
  // flow (never transformed), so the in-view trigger fires at the right spot.
  // The inner child does the actual rise, driven by variant propagation. (An
  // earlier version animated the observed element itself, whose 115% offset
  // pushed it out of the trigger zone, leaving headings permanently clipped.)
  return (
    <motion.span
      className={className}
      style={{
        display,
        overflow: "hidden",
        paddingBottom: "0.14em",
        marginBottom: "-0.14em",
      }}
      initial="hidden"
      {...(mount
        ? { animate: "shown" }
        : {
            whileInView: "shown",
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
    >
      <motion.span
        style={{ display, willChange: "transform" }}
        variants={variants}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Subtle magnetic pull toward the cursor while hovering. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
