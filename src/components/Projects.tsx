"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Reveal, ClipReveal, Tilt } from "@/components/motion-primitives";
import styles from "./ResearchSections.module.css";

export function Projects() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<Project>(projects[0]);

  function showFigure(project: Project) {
    setPreview(project);
    dialogRef.current?.showModal();
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className={`${styles.section} ${styles.projects}`}>
      <div className={styles.container}>
        <Reveal><div className={styles.sectionLabel}><span>03 / Selected work</span><span className={styles.labelNote}>Ideas, tested in the real world</span></div></Reveal>
        <div className={styles.sectionHeadingRow}>
          <h2 id="projects-title" className={styles.sectionHeading}><ClipReveal block>Research into<br /><em>real applications.</em></ClipReveal></h2>
          <Reveal delay={0.15}><a href="#publications" className={styles.textLink}>All publications <ArrowUpRight size={18} aria-hidden="true" /></a></Reveal>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.1}>
              <article className={styles.projectCard}>
                <Tilt max={2}>
                  <button className={styles.paperCanvas} onClick={() => showFigure(project)} aria-label={`Enlarge figure: ${project.title}`} data-tone={index}>
                    <span className={styles.paperTopline}><span>{project.venue} <span className={styles.paperSlash}>/</span> {project.year}</span><span>0{index + 1}</span></span>
                    <span className={styles.figureFrame}><Image src={project.figure} alt={`Research figure from “${project.title}”`} fill unoptimized sizes="(min-width: 1440px) 600px, (min-width: 768px) 44vw, 90vw" className={styles.paperImage} /></span>
                    <span className={styles.figureHint}><Expand size={13} aria-hidden="true" /> Explore the figure</span>
                    <span className={styles.canvasCorner} aria-hidden="true">+</span>
                  </button>
                </Tilt>
                <div className={styles.projectInfo}>
                  <ul className={styles.projectTags} aria-label="Research topics">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectTitleLink}>
                    <h3>{project.title}</h3><span className={styles.projectArrow}><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                  </a>
                  <p className={styles.projectDescription}>{project.desc}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectRead}>Read publication <ArrowUpRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <dialog ref={dialogRef} className={styles.previewDialog} aria-labelledby="figure-preview-title" data-lenis-prevent onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <div className={styles.previewHeader}>
          <div><span className={styles.eyebrow}>{preview.venue} / {preview.year}</span><h3 id="figure-preview-title">{preview.title}</h3></div>
          <button className={styles.previewClose} onClick={() => dialogRef.current?.close()} aria-label="Close enlarged figure"><X size={22} /></button>
        </div>
        <div className={styles.previewImage}><Image src={preview.figure} alt={`Full research figure from “${preview.title}”`} fill unoptimized sizes="95vw" className={styles.paperImage} /></div>
        <a className={styles.textLink} href={preview.link} target="_blank" rel="noopener noreferrer">Read the publication <ArrowUpRight size={16} aria-hidden="true" /></a>
      </dialog>
    </section>
  );
}
