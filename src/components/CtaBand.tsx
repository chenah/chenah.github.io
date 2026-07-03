"use client";

import { useLenis } from "lenis/react";
import { ctas } from "@/lib/content";
import { ClipReveal, Parallax } from "@/components/motion-primitives";

export function CtaBand() {
  const lenis = useLenis();
  function go(e: React.MouseEvent, href: string) {
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -60 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="grid border-b border-[#282c20] bg-[#f4f4ed] text-[#282c20] md:grid-cols-2">
      {ctas.map((cta, index) => (
        <a
          key={cta.href}
          href={cta.href}
          onClick={(e) => go(e, cta.href)}
          data-cursor="hover"
          className={`group relative min-h-[48vw] overflow-hidden p-6 transition-colors duration-500 hover:bg-lime sm:p-10 md:min-h-[39vw] lg:p-14 ${index ? "border-t border-[#282c20] md:border-l md:border-t-0" : ""}`}
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">{cta.kicker}</span>
          <span className="absolute right-6 top-6 grid size-12 place-items-center overflow-hidden rounded-full border border-[#282c20] text-xl transition-colors duration-500 group-hover:bg-[#282c20] group-hover:text-lime sm:right-10 sm:top-10">
            <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45">↗</span>
          </span>
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10 lg:inset-x-14 lg:bottom-14">
            <span className="mb-4 block font-display text-[clamp(3.2rem,7vw,8rem)] uppercase leading-[0.8]">
              <ClipReveal block delay={index * 0.1}>
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-3">{cta.title}</span>
              </ClipReveal>
            </span>
            <span className="block text-sm font-medium">{cta.desc}</span>
          </div>
          <Parallax speed={-0.35} className="absolute -bottom-[14%] right-[4%]">
            <span className="block font-editorial text-[clamp(10rem,25vw,25rem)] leading-none text-[#282c20]/5 transition-colors duration-700 group-hover:text-[#282c20]/10">{index + 1}</span>
          </Parallax>
        </a>
      ))}
    </section>
  );
}
