"use client";

import { useLenis } from "lenis/react";
import { contact } from "@/lib/content";
import { CharReveal, Magnetic, RollingText } from "@/components/motion-primitives";

export function Footer() {
  const lenis = useLenis();
  function toTop(e: React.MouseEvent) {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer id="contact" className="olive-section contour-bg-dark scroll-mt-16 overflow-hidden px-5 pb-8 pt-[clamp(90px,13vw,170px)] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <span className="mb-8 block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-lime">05 / Get in touch</span>
        <h2 className="font-display text-[clamp(5.4rem,17vw,17rem)] uppercase leading-[0.72] tracking-[-0.04em]">
          <CharReveal text="LET'S" stagger={0.04} />
          <br />
          <span className="font-editorial italic text-lime">
            <CharReveal text="CONNECT" stagger={0.04} delay={0.2} />
          </span>
        </h2>
        <Magnetic strength={0.25} className="mt-14">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="hover"
            className="link-sweep inline-block max-w-full break-all pb-2 text-[clamp(1rem,2.4vw,2.2rem)] shadow-[inset_0_-1px_rgba(255,255,255,.35)] transition-colors hover:text-lime"
          >
            {contact.email} ↗
          </a>
        </Magnetic>
        <div className="mt-[clamp(80px,12vw,150px)] flex flex-col gap-7 border-t border-white/20 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {[
              { label: "Email", href: `mailto:${contact.email}` },
              { label: "Scholar", href: contact.scholar },
              { label: "GitHub", href: contact.github },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-cursor="hover"
                className="roll-trigger rounded-full border border-white/30 px-4 py-2 text-xs uppercase transition-colors hover:border-lime hover:bg-lime hover:text-[#282c20]"
              >
                <RollingText text={link.label} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs uppercase tracking-[0.12em] text-[#b9bcae]">© {new Date().getFullYear()} CHEN Guang · AI Applications PhD</p>
            <Magnetic strength={0.4}>
              <a
                href="#top"
                onClick={toTop}
                data-cursor="hover"
                aria-label="Back to top"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 text-lg transition-colors hover:border-lime hover:bg-lime hover:text-[#282c20]"
              >
                ↑
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
