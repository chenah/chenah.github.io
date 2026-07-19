"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { brand } from "@/lib/content";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const COUNT_DURATION_MS = 1150;
const COMPLETION_HOLD_MS = 120;
const HARD_DEADLINE_MS = COUNT_DURATION_MS + COMPLETION_HOLD_MS + 250;
const FORCE_UNMOUNT_MS = 1050;

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
  const [forceUnmount, setForceUnmount] = useState(false);
  const hidden = done || Boolean(reduce);

  // Use wall-clock time rather than animation frames so a throttled background
  // tab still lands at the correct progress when its timers resume.
  useEffect(() => {
    if (reduce) return;

    window.scrollTo(0, 0);
    const startedAt = Date.now();
    let active = true;
    let completionTimer: number | undefined;

    const clearTimers = () => {
      if (progressTimer !== undefined) window.clearInterval(progressTimer);
      if (durationTimer !== undefined) window.clearTimeout(durationTimer);
      if (completionTimer !== undefined) window.clearTimeout(completionTimer);
      if (hardDeadlineTimer !== undefined) window.clearTimeout(hardDeadlineTimer);
    };

    const finish = () => {
      if (!active) return;
      clearTimers();
      setCount(100);
      setDone(true);
    };

    const completeCount = () => {
      if (!active || completionTimer !== undefined) return;

      setCount(100);
      if (progressTimer !== undefined) window.clearInterval(progressTimer);
      completionTimer = window.setTimeout(finish, COMPLETION_HOLD_MS);
    };

    const updateProgress = () => {
      if (!active) return;

      const elapsed = Date.now() - startedAt;
      const nextCount = Math.min(100, Math.round((elapsed / COUNT_DURATION_MS) * 100));
      setCount((current) => (current === nextCount ? current : nextCount));

      if (elapsed >= COUNT_DURATION_MS) completeCount();
    };

    const progressTimer = window.setInterval(updateProgress, 32);
    const durationTimer = window.setTimeout(completeCount, COUNT_DURATION_MS);
    const hardDeadlineTimer = window.setTimeout(finish, HARD_DEADLINE_MS);

    updateProgress();

    return () => {
      active = false;
      clearTimers();
    };
  }, [reduce]);

  // Motion's exit animation uses animation frames. A hidden/background tab can
  // throttle those frames indefinitely, so force-remove the curtain shortly
  // after its normal 0.9s exit window as a final safety net.
  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(() => setForceUnmount(true), FORCE_UNMOUNT_MS);
    return () => window.clearTimeout(timer);
  }, [done]);

  // Lock native and Lenis scrolling while the curtain is up, then restore both
  // on completion or an early unmount.
  useEffect(() => {
    if (hidden) {
      lenis?.start();
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      lenis?.start();
    };
  }, [lenis, hidden]);

  if (reduce || forceUnmount) return null;

  return (
    <AnimatePresence>
      {!hidden && (
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
                {brand}
              </motion.span>
            </span>

            <div className="flex w-[min(78vw,420px)] items-center gap-4">
              <div className="h-px flex-1 bg-[color:var(--cream)]/25">
                <motion.div
                  className="h-full bg-lime"
                  style={{ scaleX: count / 100, transformOrigin: "left" }}
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
