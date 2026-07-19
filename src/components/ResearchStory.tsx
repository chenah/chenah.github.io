"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

const signals = [
  {
    phase: "Observe",
    keyword: "Attention",
    figure: "/figures/avatar.jpg",
    alt: "Avatars interacting in a collaborative virtual-reality study",
    summary:
      "Understanding how people direct attention, build trust and coordinate with others inside collaborative virtual worlds.",
    tags: ["Collaborative VR", "Eye tracking", "Human interaction"],
  },
  {
    phase: "Prototype",
    keyword: "Agency",
    figure: "/figures/audio.jpg",
    alt: "Audio interface used to prototype an agentic AI application",
    summary:
      "Turning emerging AI capabilities into useful systems, including agentic moderation that can support people in the moment.",
    tags: ["Agentic AI", "Moderation", "Interactive systems"],
  },
  {
    phase: "Validate",
    keyword: "Evidence",
    figure: "/figures/network.png",
    alt: "Network diagram representing evidence gathered in an AI education study",
    summary:
      "Testing whether AI improves learning through randomized studies, behavioral data and mixed-method accounts of experience.",
    tags: ["AI in education", "Randomized study", "Mixed methods"],
  },
] as const;

export function ResearchStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-research-card]");
    const observer = new IntersectionObserver(
      (entries) => {
        const centered = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!centered) return;
        const nextIndex = Number(
          (centered.target as HTMLElement).dataset.researchCard,
        );
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex);
      },
      {
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="research-story"
      aria-labelledby="research-story-title"
      className="bg-[#f4f4ed] px-5 py-[clamp(88px,12vw,180px)] text-[#282c20] sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-12 border-b border-[rgba(40,44,32,.42)] pb-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] lg:mb-20">
          02 / Research signals
        </p>

        <div className="grid gap-20 lg:grid-cols-[minmax(0,.78fr)_minmax(520px,1.22fr)] lg:gap-[clamp(48px,7vw,120px)]">
          <div className="lg:self-start">
            <div className="lg:sticky lg:top-[12vh]">
              <h2
                id="research-story-title"
                className="font-display text-[clamp(4rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.035em]"
              >
                Research
                <br />
                starts with
                <br />
                <span className="font-editorial normal-case italic text-[#282c20]">
                  people.
                </span>
              </h2>

              <div className="mt-12 grid gap-7 border-t border-[rgba(40,44,32,.42)] pt-6 sm:grid-cols-[8rem_1fr] lg:mt-[clamp(48px,7vw,90px)] lg:max-w-xl">
                <div>
                  <span
                    aria-live="polite"
                    className="font-display text-3xl leading-none"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}/03
                  </span>
                  <div
                    className="mt-4 flex gap-1.5"
                    aria-hidden="true"
                  >
                    {signals.map((signal, index) => (
                      <span
                        key={signal.phase}
                        className="h-1 flex-1 overflow-hidden bg-[#282c20]/15"
                      >
                        <span
                          className={`block h-full origin-left bg-[#d2ff00] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                            index <= activeIndex ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-[#565b4d]">
                  A human-centered loop: observe real behavior, prototype useful
                  applications, then validate their impact with evidence.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-20 lg:space-y-[28vh]">
            {signals.map((signal, index) => {
              const active = reducedMotion || index === activeIndex;
              const dark = index !== 1;

              return (
                <article
                  key={signal.phase}
                  data-research-card={index}
                  aria-current={index === activeIndex ? "step" : undefined}
                  className={`group border border-[rgba(40,44,32,.42)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${
                    active ? "scale-100" : "scale-[.96]"
                  } ${
                    dark
                      ? "bg-[#282c20] text-[#f4f4ed]"
                      : "bg-[#f4f4ed] text-[#282c20]"
                  } ${
                    index === 0
                      ? "lg:ml-[7%]"
                      : index === 1
                        ? "lg:mr-[10%]"
                        : "lg:ml-[14%]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-current/25 px-5 py-4 sm:px-7">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em]">
                      Signal {String(index + 1).padStart(2, "0")} / {signal.phase}
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-45 motion-reduce:transition-none"
                    />
                  </div>

                  <div className="p-3 sm:p-5">
                    <div className="overflow-hidden">
                      <div className="relative aspect-[4/3] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none">
                        <Image
                          src={signal.figure}
                          alt={signal.alt}
                          fill
                          sizes="(min-width: 1024px) 48vw, 100vw"
                          className={`object-cover transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:opacity-100 motion-reduce:transition-none ${
                            active ? "opacity-100" : "opacity-[.62]"
                          }`}
                        />
                        <div
                          aria-hidden="true"
                          className={`absolute inset-0 mix-blend-color transition-opacity duration-500 motion-reduce:hidden ${
                            active ? "opacity-0" : "bg-[#282c20] opacity-20"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="px-2 pb-3 pt-7 sm:px-3 sm:pb-4 sm:pt-9">
                      <p className="font-display text-[clamp(3.3rem,7vw,7.5rem)] uppercase leading-[0.78] tracking-[-0.035em]">
                        {signal.keyword}
                      </p>
                      <p
                        className={`mt-8 max-w-xl text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.45] ${
                          dark ? "text-[#d8dacd]" : "text-[#4f5447]"
                        }`}
                      >
                        {signal.summary}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Methods">
                        {signal.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-current/35 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
