"use client";

import type { MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/content";
import { ClipReveal, Magnetic, Reveal } from "@/components/motion-primitives";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./EditorialSections.module.css";

export function Footer() {
  const lenis = useLenis();
  const { motionPaused: reducedMotion } = useMotionPreferences();
  function toTop(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    history.pushState(null, "", "#top");
    document.getElementById("top")?.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(0, { immediate: Boolean(reducedMotion) });
    else window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }
  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-heading">
      <div className={styles.contactPanel}>
        <div className={styles.container}>
          <Reveal className={styles.sectionMeta}><span>06 / Let’s talk</span><span>Good things start with a conversation.</span></Reveal>
          <a href={`mailto:${contact.email}`} className={styles.contactHeadline} aria-label={`Let's make something matter. Email ${contact.email}`}>
            <h2 id="contact-heading"><ClipReveal block>Let’s make<br /><em>something matter.</em></ClipReveal></h2>
            <span className={styles.contactArrow}><ArrowUpRight aria-hidden="true" strokeWidth={1} /></span>
          </a>
          <Reveal className={styles.contactDetails}>
            <p>For research, collaboration,<br />and the next useful idea.</p>
            <Magnetic strength={0.1}><a href={`mailto:${contact.email}`} className={styles.emailLink}>{contact.email}<ArrowUpRight aria-hidden="true" size={20} /></a></Magnetic>
          </Reveal>
        </div>
      </div>
      <div className={styles.footerBase}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <a href="#top" onClick={toTop} className={styles.footerBrand} aria-label="CHEN Guang, back to top">CHEN GUANG<span>↗</span></a>
          <nav className={styles.footerLinks} aria-label="Social and contact links">
            {[{ label: "Email", href: `mailto:${contact.email}` }, { label: "Google Scholar", href: contact.scholar }, { label: "GitHub", href: contact.github }].map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>{link.label}<ArrowUpRight aria-hidden="true" size={14} /></a>
            ))}
          </nav>
          <p className={styles.copyright}>© {new Date().getFullYear()} CHEN Guang <a href="#cities" className={styles.footerCities}>香港 → 广州</a></p>
          <a href="#top" onClick={toTop} className={styles.backToTop}>Back to top <span><ArrowUp aria-hidden="true" size={17} /></span></a>
        </div>
      </div>
    </footer>
  );
}
