"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { experience } from "@/lib/content";
import { Reveal, ClipReveal } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./EditorialSections.module.css";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const { motionPaused: reducedMotion } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 65%"] });
  return (
    <section id="experience" className={`${styles.section} ${styles.experience}`} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <Reveal className={styles.sectionMeta}><span>05 / Experience & Education</span><span>Always moving forward</span></Reveal>
        <div className={styles.experienceGrid}>
          <div className={styles.experienceIntro}>
            <h2 id="experience-heading" className={styles.heading}><ClipReveal block>A path built<br />on <em>curiosity.</em></ClipReveal></h2>
            <Reveal delay={0.1}>
              <p>From computer science to data science and human-centered AI. Each chapter brings a different way to ask better questions.</p>
              <div className={styles.timelineRange}><span />2017 — Present</div>
            </Reveal>
          </div>
          <div ref={listRef} className={styles.timeline}>
            <span aria-hidden="true" className={styles.timelineTrack} />
            <motion.span aria-hidden="true" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} className={styles.timelineProgress} />
            {experience.map((item, index) => (
              <Reveal key={`${item.date}-${item.role}`} delay={Math.min(index * 0.04, 0.12)}>
                <article className={styles.timelineItem}>
                  <span aria-hidden="true" className={`${styles.timelineNode} ${index === 0 ? styles.currentNode : ""}`} />
                  <div className={styles.timelineDate}><span>{item.date}</span>{index === 0 && <span className={styles.nowBadge}>Current</span>}</div>
                  <h3>{item.role}</h3><p>{item.org}</p><span className={styles.timelineIndex} aria-hidden="true">0{index + 1}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
