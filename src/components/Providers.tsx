"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { ScrollProgress } from "@/components/ScrollProgress";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}
      >
        <Loader />
        <Grain />
        <Cursor />
        <ScrollProgress />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
