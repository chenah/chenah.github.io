"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

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

/**
 * Per-character kinetic reveal: each letter rises out of a per-word clip mask
 * with a slight un-rotate, staggered across the whole string. The heavyweight
 * version of MaskReveal, reserved for display-size headlines.
 */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  mount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mount?: boolean;
}) {
  const words = text.split(" ");
  let charIndex = 0;
  // The OBSERVED element is this outer, untransformed wrapper — the chars
  // themselves start fully clipped inside their word masks, so an observer on
  // them would never fire (same trap documented on ClipReveal). Variants
  // propagate down; per-char stagger comes from the dynamic variant.
  const charVariants: Variants = {
    hidden: { y: "115%", rotate: 10 },
    shown: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 0.8, ease: EASE, delay: delay + i * stagger },
    }),
  };
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      {...(mount
        ? { animate: "shown" }
        : {
            whileInView: "shown",
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            // keep descenders / rotated glyphs from clipping at rest
            paddingBottom: "0.1em",
            marginBottom: "-0.1em",
          }}
        >
          {word.split("").map((ch, ci) => {
            const i = charIndex++;
            return (
              <motion.span
                key={ci}
                custom={i}
                variants={charVariants}
                style={{
                  display: "inline-block",
                  willChange: "transform",
                  transformOrigin: "0% 100%",
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

/** Count a number up from 0 when it scrolls into view (ease-out cubic). */
export function CountUp({
  to,
  className,
  duration = 1.5,
  delay = 0,
}: {
  to: number;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/**
 * Scroll-linked parallax: drifts children vertically as the element crosses
 * the viewport. speed > 0 lags the scroll, speed < 0 moves against it.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** 3D perspective tilt that follows the cursor across the element. */
export function Tilt({
  children,
  max = 6,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 2 * max);
    rx.set(-py * 2 * max);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rolling hover text: two stacked copies inside a clip; hovering any ancestor
 * with the `roll-trigger` class (or the element itself) rolls the second copy
 * up into place.
 */
export function RollingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`roll ${className ?? ""}`}>
      <span className="roll-inner">
        <span className="roll-line">{text}</span>
        <span className="roll-line" aria-hidden>
          {text}
        </span>
      </span>
    </span>
  );
}
