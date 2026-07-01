"use client";

import { projects, type Project } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { Reveal } from "@/components/motion-primitives";

function PaperFigure({ type }: { type: Project["visual"] }) {
  if (type === "audio") {
    return (
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="text-center">
          <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full border-2 border-[#282c20] text-2xl">AI</div>
          <span className="font-mono text-[0.55rem] uppercase">Agentic moderator</span>
        </div>
        <div className="flex h-20 items-center gap-1">
          {[18, 36, 58, 28, 72, 46, 24].map((height, index) => (
            <i key={index} className="w-1.5 bg-lime" style={{ height }} />
          ))}
        </div>
        <div className="text-center">
          <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full border-2 border-[#282c20] text-2xl">H</div>
          <span className="font-mono text-[0.55rem] uppercase">Human moderator</span>
        </div>
      </div>
    );
  }

  if (type === "network") {
    return (
      <div className="relative h-full">
        <svg viewBox="0 0 420 170" className="size-full" aria-hidden>
          <g stroke="#282c20" strokeWidth="2">
            <path d="M38 90L120 35L205 82L292 30L382 88M120 35L152 145L205 82L272 143L382 88M38 90L152 145M292 30L272 143" fill="none" />
          </g>
          {[[38,90],[120,35],[205,82],[292,30],[382,88],[152,145],[272,143]].map(([cx,cy], index) => (
            <g key={index}>
              <circle cx={cx} cy={cy} r={index === 2 ? 17 : 12} fill={index === 2 ? "#d2ff00" : "#f4f4ed"} stroke="#282c20" strokeWidth="3" />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700">{index === 2 ? "AI" : index + 1}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (type === "avatar") {
    return (
      <div className="relative flex h-full items-end justify-center gap-12 overflow-hidden">
        <div className="absolute left-8 top-5 font-mono text-[0.55rem] uppercase">Attention allocation →</div>
        {[0, 1].map((index) => (
          <div key={index} className="relative">
            <div className="mx-auto size-16 rounded-full border-2 border-[#282c20] bg-[#e5e6dc]" />
            <div className="h-24 w-24 rounded-t-[45%] border-2 border-b-0 border-[#282c20] bg-[#282c20]" />
            <i className={`absolute top-7 h-0.5 w-24 origin-left bg-lime ${index ? "-left-16 rotate-[18deg]" : "left-14 -rotate-[12deg]"}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-2 gap-4 font-mono text-[0.58rem]">
      <div className="border border-[#282c20] p-3">
        <b className="mb-3 block bg-[#282c20] px-2 py-1 text-[#f4f4ed]">THEORY-INFORMED</b>
        {["Framework", "Constructs", "Codebook", "LLM output"].map((item) => <span key={item} className="mb-2 block border-b border-[#282c20]/25 pb-2">{item}</span>)}
      </div>
      <div className="border border-[#282c20] p-3">
        <b className="mb-3 block bg-lime px-2 py-1">EXAMPLE-DRIVEN</b>
        {["Examples", "Patterns", "Few-shot", "LLM output"].map((item) => <span key={item} className="mb-2 block border-b border-[#282c20]/25 pb-2">{item}</span>)}
      </div>
    </div>
  );
}

function PaperPreview({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative aspect-[1.28] overflow-hidden bg-[#282c20] p-4 shadow-[0_22px_45px_rgba(40,44,32,.16)] sm:p-6">
      <div className="relative h-full overflow-hidden bg-[#f8f8f2] p-5 text-[#282c20] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.025]">
        <div className="mb-4 flex items-center justify-between border-b border-[#282c20] pb-2 font-mono text-[0.52rem] font-bold uppercase">
          <span>{project.venue} · {project.year}</span>
          <span>Paper 0{index + 1}</span>
        </div>
        <h3 className="max-w-[32ch] text-[clamp(0.8rem,1.35vw,1.2rem)] font-bold leading-tight">{project.title.en}</h3>
        <div className="absolute inset-x-5 bottom-5 top-[39%] border-t border-[#282c20]/25 pt-4">
          <PaperFigure type={project.visual} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(0deg,transparent_0_3px,#fff_4px)]" />
    </div>
  );
}

export function Projects() {
  const { lang, t } = useLang();
  return (
    <section id="projects" className="scroll-mt-16 bg-[#f4f4ed] px-5 py-[clamp(90px,13vw,170px)] text-[#282c20] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <span className="mb-5 block text-[0.65rem] font-bold uppercase tracking-[0.22em]">04 / Papers into applications</span>
        <h2 className="mb-[clamp(60px,9vw,120px)] font-display text-[clamp(4.5rem,12vw,12rem)] uppercase leading-[0.76]">
          {lang === "zh" ? <>研究<span className="font-editorial italic">项目</span></> : <>SELECTED <span className="font-editorial italic">WORK</span></>}
        </h2>

        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={t(project.title)} delay={(index % 2) * 0.08}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View project: ${t(project.title)}`}
                className={`group block border border-[#282c20] p-4 transition-colors hover:bg-[#eceee4] sm:p-6 ${index % 2 ? "lg:mt-24" : ""}`}
              >
                <PaperPreview project={project} index={index} />
                <div className="px-1 pb-2 pt-7 sm:px-2">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#282c20] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="max-w-[23ch] text-[clamp(1.5rem,2.6vw,2.6rem)] font-semibold leading-[1.08]">{t(project.title)}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#63675b]">{t(project.desc)}</p>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#282c20] transition-colors group-hover:bg-[#282c20] group-hover:text-lime">↗</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
