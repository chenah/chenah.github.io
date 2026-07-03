"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { marqueeItems } from "@/lib/content";

/**
 * Infinite marquee of affiliations / venues. Base motion is a CSS animation;
 * scroll velocity adds a subtle kinetic skew so it reacts as you scroll.
 */
export function Marquee() {
  const skew = useMotionValue(0);
  const smoothSkew = useSpring(skew, { stiffness: 120, damping: 20 });

  useLenis(({ velocity }: { velocity: number }) => {
    skew.set(Math.max(-8, Math.min(8, velocity * 0.35)));
  });

  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-hidden
      className="olive-section overflow-hidden border-y border-white/20 py-8"
    >
      <motion.div
        style={{ skewX: smoothSkew }}
        className="flex whitespace-nowrap"
      >
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 font-display text-[clamp(1.6rem,4vw,3rem)] uppercase text-muted-foreground">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <span className="text-lime">/</span>
            </span>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-8 pr-8 font-display text-[clamp(1.6rem,4vw,3rem)] uppercase text-muted-foreground"
          aria-hidden
        >
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item}
              <span className="text-lime">/</span>
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ skewX: smoothSkew }}
        className="mt-3 flex whitespace-nowrap"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="animate-marquee flex shrink-0 items-center gap-8 pr-8 font-display text-[clamp(1.6rem,4vw,3rem)] uppercase [animation-direction:reverse]"
            aria-hidden={copy === 1}
          >
            {row.map((item, i) => (
              <span key={i} className="text-stroke-light flex items-center gap-8">
                {item}
                <span className="text-lime [-webkit-text-stroke:0]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
