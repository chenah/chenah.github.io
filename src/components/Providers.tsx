"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { LangProvider } from "@/lib/lang";

/**
 * App-wide client providers:
 * - LangProvider: zh / en toggle
 * - MotionConfig: respect the user's reduced-motion preference globally
 * - ReactLenis: momentum smooth-scroll on the document root
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    </LangProvider>
  );
}
