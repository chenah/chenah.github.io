"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { contact, publications } from "@/lib/content";
import { Reveal, ClipReveal } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./EditorialSections.module.css";

const getYear = (badge: string) => badge.match(/\b20\d{2}\b/)?.[0] ?? "";
const records = [...publications].sort((a, b) =>
  getYear(b.badges[0].text).localeCompare(getYear(a.badges[0].text)),
);
const years = ["All", ...new Set(records.map((paper) => getYear(paper.badges[0].text)))];

export function Publications() {
  const [year, setYear] = useState("All");
  const { motionPaused: reducedMotion } = useMotionPreferences();
  const visible = records.filter((paper) => year === "All" || getYear(paper.badges[0].text) === year);

  return (
    <section id="publications" className={styles.section} aria-labelledby="publications-heading">
      <div className={styles.container}>
        <Reveal className={styles.sectionMeta}>
          <span>04 / Publications</span>
          <span>Research archive <span className={styles.metaDot}>●</span> 2024—2026</span>
        </Reveal>
        <div className={styles.archiveHeading}>
          <h2 id="publications-heading" className={styles.heading}>
            <ClipReveal block>Research,<br /><em>on record.</em></ClipReveal>
          </h2>
          <Reveal delay={0.1} className={styles.archiveIntro}>
            <span className={styles.archiveCount}>{String(publications.length).padStart(2, "0")}<span> / Papers</span></span>
            <p>Exploring how people work, learn, and connect with intelligent systems.</p>
            <ArrowDown aria-hidden="true" size={24} strokeWidth={1.25} />
          </Reveal>
        </div>
        <Reveal className={styles.archiveToolbar}>
          <div className={styles.filters} role="group" aria-label="Filter publications by year">
            {years.map((option) => (
              <button key={option} type="button" onClick={() => setYear(option)} aria-pressed={year === option} className={`${styles.filter} ${year === option ? styles.activeFilter : ""}`}>
                {option === "All" ? "All work" : option}
                <sup>{option === "All" ? records.length : records.filter((paper) => getYear(paper.badges[0].text) === option).length}</sup>
              </button>
            ))}
          </div>
          <span className={styles.archiveLabel}>Selected publications / Index</span>
        </Reveal>
        <div className={styles.paperList}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((paper) => {
              const index = records.indexOf(paper);
              const paperYear = getYear(paper.badges[0].text);
              return (
                <motion.article key={paper.title} layout={!reducedMotion} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <a className={styles.paper} href={paper.link ?? contact.scholar} target="_blank" rel="noopener noreferrer" aria-label={`Read paper: ${paper.title} (opens in a new tab)`}>
                    <span className={styles.paperNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.paperContent}>
                      <div className={styles.paperBadges}>
                        <span className={styles.venue}>{paper.badges[0].text.replace(paperYear, "").trim()}</span>
                        {paper.badges.slice(1).map((badge) => <span key={badge.text} className={styles.paperBadge}>{badge.text}</span>)}
                      </div>
                      <h3>{paper.title}</h3>
                      <p className={styles.authors}>{paper.authors.map((author, i) => author.bold ? <b key={i}>{author.t}</b> : <span key={i}>{author.t}</span>)}</p>
                    </div>
                    <div className={styles.paperEnd}><span>{paperYear}</span><span className={styles.paperArrow}><ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.5} /></span></div>
                  </a>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
        <div className={styles.archiveBottom}>
          <span role="status" aria-live="polite">Showing {visible.length} of {publications.length} publications</span>
          <a href={contact.scholar} target="_blank" rel="noopener noreferrer" className={styles.textLink}>View Google Scholar <ArrowUpRight aria-hidden="true" size={16} /></a>
        </div>
      </div>
    </section>
  );
}
