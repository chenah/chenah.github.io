"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Card that reveals on scroll, lifts on hover, and tracks a lime spotlight
 * under the cursor (via the `.spotlight` CSS in globals.css).
 */
export function SpotlightCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      whileHover={{ y: -4 }}
      className={
        "spotlight group relative overflow-hidden rounded-2xl border border-border bg-card " +
        "transition-colors duration-300 hover:border-lime/40 hover:bg-card-2 " +
        className
      }
    >
      {children}
    </motion.div>
  );
}
