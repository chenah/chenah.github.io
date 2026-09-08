"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, PointerEvent } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type Variants } from "motion/react";
import { useMotionPreferences } from "./Providers";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Every reveal has an immediately visible, static reduced-motion path. */
export function Reveal({ children, delay = 0, y = 24, className }: {
  children: ReactNode; delay?: number; y?: number; className?: string;
}) {
  const { motionPaused } = useMotionPreferences();
  if (motionPaused) return <div className={className}>{children}</div>;
  return (
    <motion.div data-motion-reveal className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.75, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export function MaskReveal({ text, className, delay = 0, mount = false }: {
  text: string; className?: string; delay?: number; mount?: boolean;
}) {
  const { motionPaused } = useMotionPreferences();
  if (motionPaused) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  return (
    <motion.span data-motion-reveal className={className} style={{ display: "inline-block" }} initial="hidden" {...(mount ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
          <motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }} transition={{ duration: 0.8, ease: EASE, delay: delay + index * 0.07 }}>
            {word}{index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function ClipReveal({ children, delay = 0, className, mount = false, block = false }: {
  children: ReactNode; delay?: number; className?: string; mount?: boolean; block?: boolean;
}) {
  const { motionPaused } = useMotionPreferences();
  const display = block ? "block" : "inline-block";
  if (motionPaused) return <span className={className} style={{ display }}>{children}</span>;
  return (
    <motion.span
      data-motion-reveal className={className}
      style={{ display, overflow: "hidden", paddingBottom: "0.14em", marginBottom: "-0.14em" }}
      initial="hidden" {...(mount ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}
    >
      <motion.span style={{ display }} variants={{ hidden: { y: "115%" }, shown: { y: "0%" } }} transition={{ duration: 0.85, ease: EASE, delay }}>
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Bounds are read on entry only, never in the pointer-move animation loop. */
export function Magnetic({ children, strength = 0.2, className }: {
  children: ReactNode; strength?: number; className?: string;
}) {
  const { motionPaused } = useMotionPreferences();
  const bounds = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  useEffect(() => {
    const reset = () => { bounds.current = null; x.set(0); y.set(0); };
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset, { passive: true });
    if (motionPaused) { sx.jump(0); sy.jump(0); x.jump(0); y.jump(0); }
    return () => { window.removeEventListener("scroll", reset); window.removeEventListener("resize", reset); };
  }, [motionPaused, x, y, sx, sy]);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (motionPaused || !bounds.current || event.pointerType !== "mouse") return;
    const rect = bounds.current;
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  return (
    <motion.div
      className={className} style={{ display: "inline-block", x: motionPaused ? 0 : sx, y: motionPaused ? 0 : sy }}
      onPointerEnter={(event) => { if (!motionPaused && event.pointerType === "mouse") bounds.current = event.currentTarget.getBoundingClientRect(); }}
      onPointerMove={move}
      onPointerLeave={() => { bounds.current = null; x.set(0); y.set(0); }}
    >{children}</motion.div>
  );
}

export function CharReveal({ text, className, delay = 0, stagger = 0.03, mount = false }: {
  text: string; className?: string; delay?: number; stagger?: number; mount?: boolean;
}) {
  const { motionPaused } = useMotionPreferences();
  if (motionPaused) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  let charIndex = 0;
  const variants: Variants = {
    hidden: { y: "110%", rotate: 5 },
    shown: (index: number) => ({ y: "0%", rotate: 0, transition: { duration: 0.85, ease: EASE, delay: delay + index * stagger } }),
  };
  return (
    <motion.span data-motion-reveal className={className} style={{ display: "inline-block" }} initial="hidden" {...(mount ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}>
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} aria-hidden="true" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
          {Array.from(word).map((character, index) => (
            <motion.span key={index} custom={charIndex++} variants={variants} style={{ display: "inline-block", transformOrigin: "0% 100%" }}>
              {character}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </motion.span>
  );
}

/** Keep the final number available to assistive technology during the count. */
export function CountUp({ to, className, duration = 1.5, delay = 0 }: {
  to: number; className?: string; duration?: number; delay?: number;
}) {
  const { motionPaused } = useMotionPreferences();
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const completed = useRef(false);
  const inView = useInView(ref, VIEWPORT);

  useEffect(() => {
    if (!numberRef.current) return;
    if (motionPaused || duration <= 0 || completed.current) {
      numberRef.current.textContent = String(to);
      completed.current = true;
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + Math.max(0, delay) * 1000;
    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      if (numberRef.current) numberRef.current.textContent = String(Math.round((1 - Math.pow(1 - progress, 3)) * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else completed.current = true;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, motionPaused, to, duration, delay]);

  return <span ref={ref} className={className}><span ref={numberRef} aria-hidden="true">{to}</span><span className="sr-only">{to}</span></span>;
}

export function Parallax({ children, speed = 0.2, className }: {
  children: ReactNode; speed?: number; className?: string;
}) {
  const { motionPaused } = useMotionPreferences();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);
  return <motion.div ref={ref} style={{ y: motionPaused ? 0 : y }} className={className}>{children}</motion.div>;
}

export function Tilt({ children, max = 6, className }: {
  children: ReactNode; max?: number; className?: string;
}) {
  const { motionPaused } = useMotionPreferences();
  const bounds = useRef<DOMRect | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 160, damping: 22, mass: 0.6 });

  useEffect(() => {
    const reset = () => { bounds.current = null; rx.set(0); ry.set(0); };
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset, { passive: true });
    if (motionPaused) { srx.jump(0); sry.jump(0); rx.jump(0); ry.jump(0); }
    return () => { window.removeEventListener("scroll", reset); window.removeEventListener("resize", reset); };
  }, [motionPaused, rx, ry, srx, sry]);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (motionPaused || !bounds.current || event.pointerType !== "mouse") return;
    const rect = bounds.current;
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * max);
    rx.set(-((event.clientY - rect.top) / rect.height - 0.5) * 2 * max);
  }

  return (
    <motion.div
      className={className}
      onPointerEnter={(event) => { if (!motionPaused && event.pointerType === "mouse") bounds.current = event.currentTarget.getBoundingClientRect(); }}
      onPointerMove={move}
      onPointerLeave={() => { bounds.current = null; rx.set(0); ry.set(0); }}
      style={{ rotateX: motionPaused ? 0 : srx, rotateY: motionPaused ? 0 : sry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
    >{children}</motion.div>
  );
}

export function RollingText({ text, className }: { text: string; className?: string }) {
  const { motionPaused } = useMotionPreferences();
  if (motionPaused) return <span className={className}>{text}</span>;
  return (
    <span className={`roll ${className ?? ""}`}>
      <span className="roll-inner"><span className="roll-line">{text}</span><span className="roll-line" aria-hidden="true">{text}</span></span>
    </span>
  );
}
