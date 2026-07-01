"use client";

import { MaskReveal } from "@/components/motion-primitives";
import { Reveal } from "@/components/motion-primitives";

export function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-12 flex items-baseline gap-4 border-b border-border pb-5">
      <Reveal>
        <span className="font-display text-[1.1rem] tracking-wide text-lime">
          {num}
        </span>
      </Reveal>
      <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] uppercase leading-none tracking-wide">
        <MaskReveal text={title} />
      </h2>
    </div>
  );
}
