"use client";

import { experience } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { Reveal } from "@/components/motion-primitives";

export function Experience() {
  const { lang, t } = useLang();
  return (
    <section id="experience" className="olive-section contour-bg-dark scroll-mt-16 px-5 py-[clamp(90px,13vw,170px)] sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-6 block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime">03 / Timeline</span>
          <h2 className="font-display text-[clamp(4.2rem,9vw,9.5rem)] uppercase leading-[0.76]">
            {lang === "zh" ? <>经历<br /><span className="font-editorial italic text-lime">轨迹</span></> : <>EXPERIENCE<br /><span className="font-editorial italic text-lime">& EDUCATION</span></>}
          </h2>
        </div>
        <div className="relative border-l border-white/20 pl-7 sm:pl-12">
          {experience.map((item, index) => (
            <Reveal key={t(item.role)} delay={index * 0.08}>
              <article className="relative border-b border-white/20 py-9 first:pt-0 sm:py-12">
                <span className="absolute -left-[34px] top-2 size-3 rounded-full border-2 border-[#282c20] bg-lime sm:-left-[54px]" />
                <span className="mb-4 block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-lime">{t(item.date)}</span>
                <h3 className="max-w-2xl text-[clamp(1.55rem,3.1vw,3.2rem)] font-semibold leading-tight">{t(item.role)}</h3>
                <p className="mt-3 max-w-xl text-[#b9bcae]">{t(item.org)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
