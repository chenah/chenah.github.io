"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Search, X } from "lucide-react";
import { contact, publications, scholarProfile } from "@/lib/content";
import { Reveal, ClipReveal } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./EditorialSections.module.css";

const records = [...publications].sort((a, b) => b.year - a.year);
const years = ["All", ...new Set(records.map((paper) => String(paper.year)))];
const yearRange = `${Math.min(...records.map((paper) => paper.year))}—${Math.max(...records.map((paper) => paper.year))}`;

export function Publications() {
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const search = query.trim().toLocaleLowerCase();
  const { motionPaused: reducedMotion } = useMotionPreferences();
  const visible = records.filter((paper) =>
    (year === "All" || String(paper.year) === year) &&
    `${paper.title} ${paper.authors.map((author) => author.t).join("")} Guang Chen Chen Guang 陈光 ${paper.venue} ${paper.badges[0].text} ${paper.year}`.toLocaleLowerCase().includes(search),
  );

  return (
    <section id="publications" className={styles.section} aria-labelledby="publications-heading">
      <div className={styles.container}>
        <Reveal className={styles.sectionMeta}>
          <span>04 / Publications</span>
          <span>Research archive <span className={styles.metaDot}>●</span> {yearRange}</span>
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
                <sup>{option === "All" ? records.length : records.filter((paper) => String(paper.year) === option).length}</sup>
              </button>
            ))}
          </div>
          <div className={styles.paperSearch}>
            <Search size={15} aria-hidden="true" />
            <input ref={searchRef} type="search" aria-label="Search publications" placeholder="Title, author, venue…" value={query} onChange={(event) => setQuery(event.target.value)} />
            {query && <button type="button" aria-label="Clear publication search" onClick={() => { setQuery(""); searchRef.current?.focus(); }}><X size={14} aria-hidden="true" /></button>}
          </div>
        </Reveal>
        <div className={styles.paperList}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((paper) => {
              const index = records.indexOf(paper);
              const paperYear = paper.year;
              return (
                <motion.article key={paper.title} layout={!reducedMotion} initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <a className={styles.paper} href={paper.link ?? contact.scholar} target="_blank" rel="noopener noreferrer" aria-label={`Read paper: ${paper.title} (opens in a new tab)`}>
                    <span className={styles.paperNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.paperContent}>
                      <div className={styles.paperBadges}>
                        <span className={styles.venue}>{paper.venue}</span>
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
          {visible.length === 0 && <div className={styles.emptyPapers}><p>No publications match your search.</p><button type="button" className={styles.textLink} onClick={() => { setQuery(""); setYear("All"); searchRef.current?.focus(); }}>Reset filters <ArrowUpRight size={16} aria-hidden="true" /></button></div>}
        </div>
        <div className={styles.archiveBottom}>
          <span role="status" aria-live="polite">Showing {visible.length} of {publications.length} publications</span>
          <a href={contact.scholar} target="_blank" rel="noopener noreferrer" className={styles.textLink}>View Google Scholar <ArrowUpRight aria-hidden="true" size={16} /></a>
        </div>
        <p className={styles.sourceNote}><span>Google Scholar snapshot</span><time dateTime={scholarProfile.checkedAt}>{scholarProfile.displayDate}</time><span>· {scholarProfile.citations} citations · h-index {scholarProfile.hIndex}</span></p>
      </div>
    </section>
  );
}
