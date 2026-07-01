"use client";

import { about } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { Reveal, ClipReveal } from "@/components/motion-primitives";

export function About() {
  const { lang, t } = useLang();
  return (
    <section id="about" className="olive-section contour-bg-dark scroll-mt-16 px-5 py-[clamp(90px,14vw,190px)] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="mb-10 text-center text-[0.65rem] font-bold uppercase tracking-[0.25em] text-lime">01 / Manifesto</p>
        </Reveal>
        <h2 className="mx-auto max-w-[1220px] text-center font-display text-[clamp(3rem,8.4vw,8.5rem)] uppercase leading-[0.86] tracking-[-0.035em]">
          <ClipReveal block delay={0.05}>
            {lang === "zh" ? (
              <>让人工智能从<span className="whitespace-nowrap font-editorial italic text-lime">技术可能</span><br />走向<span className="whitespace-nowrap font-editorial italic text-lime">真实应用。</span></>
            ) : (
              <>Turning AI <span className="font-editorial italic text-lime">possibility</span><br />into real-world<br /><span className="font-editorial italic text-lime">applications.</span></>
            )}
          </ClipReveal>
        </h2>

        <div className="mt-[clamp(48px,7vw,100px)] grid gap-14 border-t border-white/20 pt-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.15rem,2.2vw,2rem)] leading-[1.35] text-[#d8dacd]">
              {lang === "zh"
                ? "我是华南理工大学未来技术学院智能科学与技术博士生，关注 AI 应用、智能体系统与以人为本的智能技术。我的研究连接算法能力、真实用户需求和可落地的交互系统，成果发表于 CHI、BESC、Computers in Human Behavior 与 Frontiers in Virtual Reality。"
                : "I am a PhD student in Intelligent Science and Technology at SCUT’s School of Future Technology. My work connects AI capabilities with real user needs and deployable interactive systems, spanning agentic AI, human-centered AI, education and virtual reality."}
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {about.stats.map((stat, index) => (
              <Reveal key={stat.num} delay={index * 0.08}>
                <div className="border-t border-white/25 pt-4">
                  <span className="block font-display text-[clamp(2.2rem,5vw,5rem)] leading-none text-lime">{stat.num}</span>
                  <span className="mt-2 block text-[0.68rem] uppercase tracking-[0.12em] text-[#b9bcae]">{t(stat.label)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {about.skills.map((skill) => <span key={skill} className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.08em] transition-colors hover:border-lime hover:bg-lime hover:text-[#282c20]">{skill}</span>)}
        </div>
      </div>
    </section>
  );
}
