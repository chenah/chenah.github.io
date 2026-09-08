"use client";

import { motion } from "motion/react";
import { useMotionPreferences } from "./Providers";
import styles from "./MotionShell.module.css";

/** A brief opening accent. Content, deep links, and scrolling are always ready. */
export function Loader() {
  const { motionPaused } = useMotionPreferences();
  if (motionPaused) return null;
  return (
    <motion.div
      aria-hidden="true"
      className={styles.openingRule}
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: 0 }}
      transition={{ scaleX: { duration: 1.25, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 1.1, duration: 0.3 } }}
    />
  );
}
