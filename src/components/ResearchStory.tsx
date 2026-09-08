"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, ClipReveal } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./ResearchSections.module.css";

const signals = [
  {
    phase: "Observe",
    keyword: "Start with people.",
    summary: "Understanding how people direct attention, build trust and coordinate with others inside collaborative virtual worlds.",
    tags: ["Collaborative VR", "Eye tracking", "Human interaction"],
    caption: "Human behavior → research questions",
  },
  {
    phase: "Prototype",
    keyword: "Make possibility useful.",
    summary: "Turning emerging AI capabilities into useful systems, including agentic moderation that can support people in the moment.",
    tags: ["Agentic AI", "Moderation", "Interactive systems"],
    caption: "Emerging capabilities → working systems",
  },
  {
    phase: "Validate",
    keyword: "Let evidence lead.",
    summary: "Testing whether AI improves learning through randomized studies, behavioral data and mixed-method accounts of experience.",
    tags: ["AI in education", "Randomized study", "Mixed methods"],
    caption: "Research studies → grounded understanding",
  },
] as const;

function ProcessVisual({ phase }: { phase: number }) {
  return (
    <div className={styles.processCanvas} aria-hidden="true">
      <div className={styles.canvasTopline}><span>Human-centered AI</span><span>Process / 0{phase + 1}</span></div>
      <svg className={styles.processSvg} viewBox="0 0 600 340" fill="none">
        <defs>
          <radialGradient id="research-glow"><stop stopColor="#ff6b35" stopOpacity=".18" /><stop offset="1" stopColor="#ff6b35" stopOpacity="0" /></radialGradient>
          <linearGradient id="research-line" x1="80" y1="170" x2="520" y2="170" gradientUnits="userSpaceOnUse"><stop stopColor="#ff6b35" stopOpacity=".12" /><stop offset=".5" stopColor="#ff6b35" /><stop offset="1" stopColor="#ff6b35" stopOpacity=".12" /></linearGradient>
        </defs>
        <circle cx="300" cy="170" r="170" fill="url(#research-glow)" />
        <path d="M24 38V24H38 M562 24H576V38 M24 302V316H38 M562 316H576V302" stroke="#f2f0e9" strokeOpacity=".24" />
        {phase === 0 && (
          <g>
            <g className={styles.orbitRings}>
              <ellipse cx="300" cy="166" rx="174" ry="80" stroke="#ff6b35" strokeOpacity=".65" transform="rotate(-30 300 166)" />
              <ellipse cx="300" cy="166" rx="174" ry="80" stroke="#ff6b35" strokeOpacity=".3" transform="rotate(30 300 166)" />
              <ellipse cx="300" cy="166" rx="174" ry="80" stroke="#ff6b35" strokeOpacity=".24" transform="rotate(90 300 166)" />
              <circle cx="451" cy="79" r="5" fill="#ff6b35" /><circle cx="162" cy="97" r="4" fill="#f2f0e9" /><circle cx="287" cy="316" r="4" fill="#ff6b35" />
            </g>
            <circle cx="300" cy="166" r="36" fill="#191a17" stroke="#ff6b35" />
            <circle cx="300" cy="159" r="8" stroke="#f2f0e9" strokeWidth="1.5" />
            <path d="M285 181C285 164 315 164 315 181" stroke="#f2f0e9" strokeWidth="1.5" />
            <text x="95" y="68" fill="#9b9d94" fontSize="10" letterSpacing="2">CONTEXT</text><text x="448" y="270" fill="#9b9d94" fontSize="10" letterSpacing="2">ATTENTION</text>
            <path d="M154 72L175 94 M442 255L423 235" stroke="#9b9d94" strokeOpacity=".45" />
          </g>
        )}
        {phase === 1 && (
          <g>
            <path d="M110 170H220C270 170 220 85 285 85H370 M220 170H365 M220 170C270 170 220 255 285 255H370 M400 85C465 85 430 170 490 170 M400 170H490 M400 255C465 255 430 170 490 170" stroke="url(#research-line)" strokeWidth="1.5" />
            <path d="M110 170H220C270 170 220 85 285 85H370 M220 170H365 M220 170C270 170 220 255 285 255H370 M400 85C465 85 430 170 490 170 M400 170H490 M400 255C465 255 430 170 490 170" stroke="#ff6b35" strokeWidth="2" strokeDasharray="4 95" className={styles.signalFlow} />
            <rect x="76" y="136" width="68" height="68" rx="18" fill="#23241f" stroke="#9b9d94" strokeOpacity=".5" />
            <circle cx="110" cy="162" r="9" stroke="#f2f0e9" /><path d="M95 184C95 168 125 168 125 184" stroke="#f2f0e9" />
            {[85, 170, 255].map((y, index) => (
              <g key={y}>
                <rect x="335" y={y - 24} width="88" height="48" rx="8" fill="#22231e" stroke="#ff6b35" strokeOpacity={index === 1 ? 1 : 0.5} />
                <text x="379" y={y + 4} fill="#f2f0e9" textAnchor="middle" fontSize="10" letterSpacing="1">{["SENSE", "REASON", "RESPOND"][index]}</text>
              </g>
            ))}
            <circle cx="490" cy="170" r="12" fill="#ff6b35" /><path d="M485 170L489 174L496 165" stroke="#10110f" strokeWidth="1.5" />
            <text x="110" y="235" fill="#9b9d94" textAnchor="middle" fontSize="10" letterSpacing="2">HUMAN</text><text x="379" y="315" fill="#9b9d94" textAnchor="middle" fontSize="10" letterSpacing="2">AGENTIC SYSTEM</text>
          </g>
        )}
        {phase === 2 && (
          <g>
            {[0, 1, 2].map((row) => (
              <g key={row}>
                <text x="80" y={86 + row * 85} fill="#9b9d94" fontSize="10" letterSpacing="2">{["BEHAVIOR", "EXPERIENCE", "EVIDENCE"][row]}</text>
                <path d={`M80 ${114 + row * 85}H520`} stroke="#f2f0e9" strokeOpacity=".12" />
                {Array.from({ length: 28 }, (_, index) => {
                  const height = 5 + ((index * 17 + row * 11) % 31);
                  return <rect key={index} className={styles.evidenceBar} x={82 + index * 16} y={113 + row * 85 - height} width="5" height={height} rx="2" fill={row === 2 ? "#ff6b35" : "#9b9d94"} fillOpacity={0.3 + (index % 4) * 0.15} style={{ animationDelay: `${index * 0.045}s` }} />;
                })}
              </g>
            ))}
          </g>
        )}
      </svg>
      <div className={styles.canvasBottomline}><span className={styles.canvasDot} />{signals[phase].caption}<span>Illustrative workflow</span></div>
    </div>
  );
}

export function ResearchStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { motionPaused: reducedMotion } = useMotionPreferences();
  const signal = signals[activeIndex];

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % signals.length;
    else if (event.key === "ArrowLeft") nextIndex = (index + signals.length - 1) % signals.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = signals.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="research-story" aria-labelledby="research-story-title" className={`${styles.section} ${styles.research}`}>
      <div className={styles.container}>
        <Reveal><div className={styles.sectionLabel}><span>02 / The way I work</span><span className={styles.labelNote}>A human-centered loop</span></div></Reveal>
        <div className={styles.sectionHeadingRow}>
          <h2 id="research-story-title" className={styles.sectionHeading}><ClipReveal block>Good questions.<br /><em>Meaningful impact.</em></ClipReveal></h2>
          <Reveal delay={0.15}><p className={styles.headingAside}>Observe real behavior. Build useful applications. Put their impact to the test.</p></Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className={styles.tabs} role="tablist" aria-label="Explore my research process">
            {signals.map((item, index) => (
              <button key={item.phase} ref={(element) => { tabRefs.current[index] = element; }} id={`research-tab-${index}`} role="tab" aria-selected={index === activeIndex} aria-controls="research-process-panel" tabIndex={index === activeIndex ? 0 : -1} className={styles.tab} onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleTabKey(event, index)}>
                <span className={styles.tabNumber}>0{index + 1}</span><span>{item.phase}</span><ArrowUpRight size={20} aria-hidden="true" />
                {activeIndex === index && <motion.span className={styles.tabUnderline} layoutId="research-active-tab" transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }} />}
              </button>
            ))}
          </div>
          <div id="research-process-panel" role="tabpanel" aria-labelledby={`research-tab-${activeIndex}`} tabIndex={0} className={styles.processPanel}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={signal.phase} className={styles.processContent} initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                <div className={styles.processCopy}>
                  <span className={styles.processIndex}>0{activeIndex + 1}<span>/ 03</span></span>
                  <h3>{signal.keyword}</h3><p>{signal.summary}</p>
                  <ul className={styles.processTags} aria-label="Research methods">{signal.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
                <ProcessVisual phase={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
