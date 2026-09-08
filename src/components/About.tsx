"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { about } from "@/lib/content";
import { Reveal, ClipReveal, CountUp } from "@/components/motion-primitives";
import styles from "./ResearchSections.module.css";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={`${styles.section} ${styles.about}`}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.sectionLabel}>
            <span>01 / A little context</span>
            <span className={styles.labelNote}>The person behind the research</span>
          </div>
        </Reveal>
        <div className={styles.manifestoGrid}>
          <h2 id="about-title" className={styles.manifesto}>
            <ClipReveal block>Turning AI</ClipReveal>
            <ClipReveal block delay={0.08}><em>possibility</em> into</ClipReveal>
            <ClipReveal block delay={0.16}>real-world</ClipReveal>
            <ClipReveal block delay={0.24}>applications<span>.</span></ClipReveal>
          </h2>
          <Reveal delay={0.2} className={styles.aboutAside}>
            <ArrowDownRight className={styles.manifestoArrow} aria-hidden="true" strokeWidth={1} />
            <p className={styles.aboutCopy}>I am a PhD student in Intelligent Science and Technology at SCUT&apos;s School of Future Technology.</p>
            <p className={styles.aboutDetail}>My work connects AI capabilities with real user needs and deployable interactive systems, spanning agentic AI, human-centered AI, education and virtual reality.</p>
            <a href="#experience" className={styles.textLink}>Explore my journey <ArrowUpRight size={16} aria-hidden="true" /></a>
          </Reveal>
        </div>
        <div className={styles.aboutBottom}>
          <Reveal className={styles.expertise}>
            <p className={styles.eyebrow}>Working at the intersection of</p>
            <ul className={styles.skills} aria-label="Research expertise">{about.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </Reveal>
          <div className={styles.stats}>
            {about.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1} className={styles.stat}>
                <span className={styles.statNumber}><CountUp to={Number(stat.num)} delay={0.1 + index * 0.12} /><span aria-hidden="true">↗</span></span>
                <span className={styles.statLabel}>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
