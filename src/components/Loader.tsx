"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { brand } from "@/lib/content";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * One-shot intro curtain: locks scroll, mask-reveals the name over a short
 * count-up, then lifts away to reveal the page. Skipped entirely for users who
 * prefer reduced motion (also hidden via CSS before hydration).
 */
export function Loader() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  // Run the count-up once; skip entirely for reduced motion.
  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    window.scrollTo(0, 0);
    const start = performance.now();
    const dur = 1150;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 320);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Lock scroll while the curtain is up; release when it lifts. Reacts to Lenis
  // mounting after this component (it may be null on first render).
  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-lime"
            >
              Portfolio · 2026
            </motion.span>

            <span className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-[clamp(3.4rem,11vw,9rem)] uppercase leading-[0.86]"
              >
                {brand.en}
              </motion.span>
            </span>

            <div className="flex w-[min(78vw,420px)] items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--cream)]/25">
                <motion.div
                  className="h-full bg-lime"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <span className="w-9 text-right font-mono text-xs tabular-nums text-[color:var(--cream)]/70">
                {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
