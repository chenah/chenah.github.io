"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import styles from "./MotionShell.module.css";

const MotionPreferences = createContext({ motionPaused: false, prefersReducedMotion: false });

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** One preference shared by CSS, scroll, canvas, and every motion primitive. */
export function useMotionPreferences() {
  return useContext(MotionPreferences);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [userPaused, setUserPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const motionPaused = userPaused || prefersReducedMotion;
  const preference = useMemo(() => ({ motionPaused, prefersReducedMotion }), [motionPaused, prefersReducedMotion]);
  const toggleMotion = useCallback(() => setUserPaused((paused) => !paused), []);

  useEffect(() => {
    document.documentElement.dataset.motionPaused = String(motionPaused);
    return () => { delete document.documentElement.dataset.motionPaused; };
  }, [motionPaused]);

  const label = prefersReducedMotion
    ? "Animations paused by your system preference"
    : motionPaused ? "Resume animations" : "Pause animations";

  return (
    <MotionPreferences.Provider value={preference}>
      <MotionConfig reducedMotion={motionPaused ? "always" : "user"}>
        <ReactLenis root options={{ lerp: 0.085, smoothWheel: !motionPaused, wheelMultiplier: 1 }}>
          <Loader />
          <Cursor />
          <ScrollProgress />
          {children}
          <button
            type="button"
            className={styles.motionToggle}
            aria-label={label}
            aria-pressed={motionPaused}
            aria-disabled={prefersReducedMotion}
            onClick={prefersReducedMotion ? undefined : toggleMotion}
          >
            {motionPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            <span className={styles.motionLabel}>{label}</span>
          </button>
        </ReactLenis>
      </MotionConfig>
    </MotionPreferences.Provider>
  );
}
