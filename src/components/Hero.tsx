"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Asterisk, MoveUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { CharReveal, Magnetic } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import { NeuralField } from "@/components/NeuralField";
import styles from "./Hero.module.css";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [shape, setShape] = useState<"orbit" | "sphere" | "wave">("wave");
  const { motionPaused } = useMotionPreferences();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], motionPaused ? [0, 0] : [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], motionPaused ? [1, 1] : [1, 0.15]);

  return (
    <section id="top" ref={ref} tabIndex={-1} className={styles.hero} aria-label="CHEN Guang, AI and HCI researcher">
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.topline}>
        <span><i /> AI APPLICATIONS & HUMAN–COMPUTER INTERACTION</span>
        <a href="#cities" className={styles.cityLink}>HONG KONG <span>↗</span> GUANGZHOU</a>
      </div>
      <motion.div className={styles.main} style={{ y, opacity }}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span>陈光</span> RESEARCHER. BUILDER. EXPLORER.</p>
          <h1 className={styles.name} aria-label="CHEN Guang">
            <span><CharReveal text="CHEN" mount delay={0.12} stagger={0.055} /></span>
            <span><CharReveal text="GUANG" mount delay={0.25} stagger={0.055} /><b>.</b></span>
          </h1>
          <motion.div initial={motionPaused ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
            <p className={styles.statement}>Intelligent systems.<br /><span>Human</span> possibilities.</p>
            <p className={styles.description}>Turning frontier AI into useful, trustworthy<br className={styles.desktopBreak} /> and human-centered applications.</p>
            <div className={styles.actions}>
              <Magnetic strength={0.16}><a href="#projects" className={styles.primary}>Explore my work <ArrowUpRight size={19} /></a></Magnetic>
              <a href="#about" className={styles.secondary}>A little about me <ArrowUpRight size={15} /></a>
            </div>
          </motion.div>
        </div>
        <div className={styles.visual}>
          <div className={styles.fieldHeader}>
            <span className={styles.fieldTitle}><Asterisk size={15} /> IDEAS IN MOTION</span>
            <span className={styles.fieldEdition}>FIG. 001</span>
          </div>
          <div className={styles.canvasWrap}>
            <NeuralField shape={shape} />
            <div className={styles.fieldCaption} aria-live="polite"><span>0{shape === "wave" ? 1 : shape === "orbit" ? 2 : 3} /</span> {shape === "wave" ? "Like water, ideas find a way." : shape === "orbit" ? "Different paths. Shared curiosity." : "A world of possibilities."}</div>
            <span className={`${styles.crosshair} ${styles.crosshairOne}`} aria-hidden="true">+</span>
            <span className={`${styles.crosshair} ${styles.crosshairTwo}`} aria-hidden="true">+</span>
            <span className={styles.axisLabel} aria-hidden="true">X / Y / Z</span>
          </div>
          <div className={styles.fieldFooter}>
            <span className={styles.interact}><MoveUpRight size={13} /><span>MOVE TO INTERACT</span></span>
            <div className={styles.shapeControl} role="group" aria-label="Particle shape">
              {([{ id: "wave", label: "Tide" }, { id: "orbit", label: "Orbit" }, { id: "sphere", label: "Sphere" }] as const).map((option) => (
                <button key={option.id} type="button" onClick={() => setShape(option.id)} aria-pressed={shape === option.id}>
                  {shape === option.id && <motion.span className={styles.shapeIndicator} layoutId="particle-shape" transition={{ duration: motionPaused ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} />}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <div className={styles.bottomline}>
        <div className={styles.affiliation}><span className={styles.affiliationMark} aria-hidden="true">↳</span><p>PhD student · SCUT<span>School of Future Technology</span></p></div>
        <a href="#cities" className={styles.location}>香港 <span className={styles.cityRoute} aria-hidden="true" /> 广州 <span>FROM THE HARBOUR TO THE PEARL RIVER</span></a>
        <a href="#cities" className={styles.scroll}>SCROLL TO DISCOVER <span><ArrowDown size={18} /></span></a>
      </div>
    </section>
  );
}
