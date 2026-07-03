"use client";

import { about } from "@/lib/content";
import { Reveal, ClipReveal, CountUp } from "@/components/motion-primitives";

export function About() {
  return (
    <section id="about" className="olive-section contour-bg-dark scroll-mt-16 px-5 py-[clamp(90px,14vw,190px)] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="mb-10 text-center text-[0.65rem] font-bold uppercase tracking-[0.25em] text-lime">01 / Manifesto</p>
        </Reveal>
        <h2 className="mx-auto max-w-[1220px] text-center font-display text-[clamp(3rem,8.4vw,8.5rem)] uppercase leading-[0.86] tracking-[-0.035em]">
          <ClipReveal block delay={0.05}>
            Turning AI <span className="font-editorial italic text-lime">possibility</span><br />into real-world<br /><span className="font-editorial italic text-lime">applications.</span>
          </ClipReveal>
        </h2>

        <div className="mt-[clamp(48px,7vw,100px)] grid gap-14 border-t border-white/20 pt-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.15rem,2.2vw,2rem)] leading-[1.35] text-[#d8dacd]">
              I am a PhD student in Intelligent Science and Technology at SCUT&apos;s School of Future Technology. My work connects AI capabilities with real user needs and deployable interactive systems, spanning agentic AI, human-centered AI, education and virtual reality.
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {about.stats.map((stat, index) => (
              <Reveal key={stat.num} delay={index * 0.08}>
                <div className="border-t border-white/25 pt-4">
                  <span className="block font-display text-[clamp(2.2rem,5vw,5rem)] leading-none text-lime">
                    <CountUp to={Number(stat.num)} delay={0.2 + index * 0.12} />
                  </span>
                  <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.12em] text-[#b9bcae]">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {about.skills.map((skill, index) => (
            <Reveal key={skill} delay={index * 0.05} y={14}>
              <span className="inline-block rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.08em] transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-[#282c20]">{skill}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
