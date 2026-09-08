"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useMotionPreferences } from "./Providers";
import styles from "./MotionShell.module.css";

export function ScrollProgress() {
  const { motionPaused } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 });
  return <motion.div className={styles.scrollProgress} style={{ scaleX: motionPaused ? scrollYProgress : smoothProgress }} aria-hidden="true" />;
}
