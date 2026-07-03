"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { experience } from "@/lib/content";
import { Reveal, ClipReveal } from "@/components/motion-primitives";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  // Lime line draws down the timeline as it moves through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <section id="experience" className="olive-section contour-bg-dark scroll-mt-16 px-5 py-[clamp(90px,13vw,170px)] sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-6 block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime">03 / Timeline</span>
          <h2 className="font-display text-[clamp(4.2rem,9vw,9.5rem)] uppercase leading-[0.76]">
            <ClipReveal block>
              EXPERIENCE<br /><span className="font-editorial italic text-lime">& EDUCATION</span>
            </ClipReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xs text-[0.98rem] leading-relaxed text-[#b9bcae]">
              From computer science to data science to AI applications and HCI — a path moving steadily toward real-world problems.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-lime">
              <span className="h-px w-10 bg-lime/60" />
              2017 — Now
            </div>
          </Reveal>
        </div>
        <div ref={listRef} className="relative pl-7 sm:pl-12">
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/20" />
          <motion.span
            aria-hidden
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-lime shadow-[0_0_12px_rgba(210,255,0,.55)]"
          />
          {experience.map((item, index) => (
            <Reveal key={item.date} delay={index * 0.08}>
              <article className="group relative border-b border-white/20 py-9 first:pt-0 sm:py-12">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 + index * 0.05 }}
                  className="absolute -left-[34px] top-2 size-3 rounded-full border-2 border-[#282c20] bg-lime sm:-left-[54px]"
                >
                  {index === 0 && (
                    <span aria-hidden className="absolute -inset-1 animate-ping rounded-full bg-lime/50" />
                  )}
                </motion.span>
                <div className="transition-transform duration-500 group-hover:translate-x-2">
                  <span className="mb-4 block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-lime">{item.date}</span>
                  <h3 className="max-w-2xl text-[clamp(1.55rem,3.1vw,3.2rem)] font-semibold leading-tight transition-colors duration-300 group-hover:text-lime">{item.role}</h3>
                  <p className="mt-3 max-w-xl text-[#b9bcae]">{item.org}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
