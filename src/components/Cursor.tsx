"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMotionPreferences } from "./Providers";
import styles from "./MotionShell.module.css";

/** A quiet pointer halo that leaves the native system cursor intact. */
export function Cursor() {
  const { motionPaused } = useMotionPreferences();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (motionPaused) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event: PointerEvent) => {
      const target = event.target;
      setHovering(target instanceof Element && Boolean(target.closest("a, button, [role='button']")));
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, [motionPaused, x, y]);

  if (motionPaused) return null;
  return (
    <motion.div
      className={styles.cursorHalo}
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? (hovering ? 0.6 : 0.28) : 0, scale: hovering ? 1.7 : 1 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    />
  );
}
