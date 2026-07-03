"use client";

import { publications } from "@/lib/content";
import { Reveal, ClipReveal } from "@/components/motion-primitives";

export function Publications() {
  return (
    <section id="publications" className="scroll-mt-16 bg-[#f4f4ed] px-5 py-[clamp(90px,13vw,170px)] text-[#282c20] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-end justify-between border-b border-[#282c20] pb-5">
          <div>
            <span className="mb-4 block text-[0.65rem] font-bold uppercase tracking-[0.22em]">02 / Research archive</span>
            <h2 className="font-display text-[clamp(3.8rem,9vw,9rem)] uppercase leading-[0.78]"><ClipReveal>PUBLICATIONS</ClipReveal></h2>
          </div>
          <span className="hidden font-editorial text-3xl italic sm:block">Google Scholar / 06</span>
        </div>

        <div>
          {publications.map((pub, index) => (
            <Reveal key={pub.title} delay={index * 0.06}>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View paper: ${pub.title}`}
                data-cursor="hover"
                className="group relative grid gap-5 overflow-hidden border-b border-[#282c20]/35 py-8 md:grid-cols-[180px_1fr_70px] md:py-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
                />
                <span
                  aria-hidden
                  className="text-stroke pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 font-display text-[clamp(4rem,7vw,7rem)] leading-none opacity-0 transition-opacity duration-500 group-hover:opacity-70 lg:block"
                >
                  0{index + 1}
                </span>
                <div className="relative flex flex-wrap content-start gap-2 transition-transform duration-500 group-hover:translate-x-1">
                  {pub.badges.map((badge) => (
                    <span key={badge.text} className={`rounded-full border border-[#282c20] px-3 py-1 text-[0.65rem] font-bold uppercase ${badge.highlight ? "bg-lime transition-colors duration-500 group-hover:bg-[#282c20] group-hover:text-lime" : ""}`}>{badge.text}</span>
                  ))}
                </div>
                <div className="relative transition-transform duration-500 group-hover:translate-x-2">
                  <h3 className="max-w-4xl text-[clamp(1.15rem,2.1vw,2rem)] font-semibold leading-[1.25]">{pub.title}</h3>
                  <p className="mt-4 text-sm text-[#63675b] transition-colors duration-500 group-hover:text-[#3d4234]">{pub.authors.map((author, i) => author.bold ? <b key={i} className="text-[#282c20]">{author.t}</b> : <span key={i}>{author.t}</span>)}</p>
                </div>
                <span className="relative grid size-12 place-items-center rounded-full border border-[#282c20] font-editorial text-lg transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-[#282c20] group-hover:text-lime">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
