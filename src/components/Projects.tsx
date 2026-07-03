"use client";

import Image from "next/image";
import { projects, type Project } from "@/lib/content";
import { Reveal, ClipReveal, Parallax, Tilt } from "@/components/motion-primitives";

function PaperPreview({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative aspect-[1.28] overflow-hidden bg-[#282c20] p-4 shadow-[0_22px_45px_rgba(40,44,32,.16)] sm:p-6">
      <div className="relative h-full overflow-hidden bg-[#f8f8f2] p-5 text-[#282c20] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.025]">
        <div className="mb-4 flex items-center justify-between border-b border-[#282c20] pb-2 font-mono text-[0.52rem] font-bold uppercase">
          <span>{project.venue} · {project.year}</span>
          <span>Paper 0{index + 1}</span>
        </div>
        <h3 className="max-w-[32ch] text-[clamp(0.8rem,1.35vw,1.2rem)] font-bold leading-tight">{project.title}</h3>
        <div className="absolute inset-x-5 bottom-5 top-[39%] border-t border-[#282c20]/25 pt-4">
          <Parallax speed={0.08} className="h-full w-full">
            <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
              <Image
                src={project.figure}
                alt={`Figure from “${project.title}”`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 90vw, 640px"
                className="object-contain"
              />
            </div>
          </Parallax>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(0deg,transparent_0_3px,#fff_4px)]" />
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 bg-[#f4f4ed] px-5 py-[clamp(90px,13vw,170px)] text-[#282c20] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <span className="mb-5 block text-[0.65rem] font-bold uppercase tracking-[0.22em]">04 / Papers into applications</span>
        <h2 className="mb-[clamp(60px,9vw,120px)] font-display text-[clamp(4.5rem,12vw,12rem)] uppercase leading-[0.76]">
          <ClipReveal block>
            SELECTED <span className="font-editorial italic">WORK</span>
          </ClipReveal>
        </h2>

        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.08} className={index % 2 ? "lg:mt-24" : ""}>
              <Tilt max={4} className="relative">
                <span
                  aria-hidden
                  className="text-stroke pointer-events-none absolute -top-[0.55em] right-2 z-10 font-display text-[clamp(4.5rem,8vw,8rem)] leading-none"
                >
                  0{index + 1}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View project: ${project.title}`}
                  data-cursor="hover"
                  className="group block border border-[#282c20] bg-[#f4f4ed] p-4 transition-colors duration-500 hover:bg-[#eceee4] sm:p-6"
                >
                  <PaperPreview project={project} index={index} />
                  <div className="px-1 pb-2 pt-7 sm:px-2">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#282c20] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide transition-colors duration-300 group-hover:border-[#282c20] group-hover:bg-lime">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="max-w-[23ch] text-[clamp(1.5rem,2.6vw,2.6rem)] font-semibold leading-[1.08]">{project.title}</h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#63675b]">{project.desc}</p>
                      </div>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#282c20] transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-[#282c20] group-hover:text-lime">↗</span>
                    </div>
                  </div>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
