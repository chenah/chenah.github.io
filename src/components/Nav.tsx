"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { RollingText } from "@/components/motion-primitives";
import { useMotionPreferences } from "./Providers";
import styles from "./MotionShell.module.css";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
];

export function Nav() {
  const lenis = useLenis();
  const { motionPaused } = useMotionPreferences();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigatingFromMenu = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
      }),
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    ["top", ...links.map((item) => item.id), "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    const media = window.matchMedia("(min-width: 900px)");
    const closeAtDesktop = () => { if (media.matches) dialogRef.current?.close(); };
    media.addEventListener("change", closeAtDesktop);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      lenis?.start();
      media.removeEventListener("change", closeAtDesktop);
    };
  }, [open, lenis]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (dialogRef.current?.open) {
      navigatingFromMenu.current = true;
      dialogRef.current.close();
    }
    setOpen(false);
    history.pushState(null, "", `#${id}`);
    // Closing the modal restores scrolling before the anchor navigation starts.
    requestAnimationFrame(() => {
      lenis?.start();
      if (lenis) lenis.scrollTo(target, { immediate: motionPaused, duration: 1.1 });
      else target.scrollIntoView({ behavior: motionPaused ? "instant" : "smooth" });
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    });
  }

  return (
    <>
      <header className={styles.header}>
        <a href="#top" onClick={(event) => navigate(event, "top")} className={styles.brand} aria-label="CHEN Guang, back to top">
          <span className={styles.monogram}>cg<span>.</span></span>
          <span className={styles.brandName}>CHEN Guang</span>
        </a>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => navigate(event, item.id)} className={`roll-trigger ${styles.navLink}`} aria-current={active === item.id ? "location" : undefined}>
              <RollingText text={item.label} />
            </a>
          ))}
        </nav>
        <a href="#contact" onClick={(event) => navigate(event, "contact")} className={styles.contactLink}>Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
        <button ref={triggerRef} className={styles.menuButton} type="button" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { dialogRef.current?.showModal(); setOpen(true); }}>
          <Menu size={21} aria-hidden="true" />
        </button>
      </header>

      <dialog ref={dialogRef} id="mobile-navigation" className={styles.mobileDialog} aria-labelledby="navigation-title" onClose={() => {
        setOpen(false);
        if (!navigatingFromMenu.current) triggerRef.current?.focus();
        navigatingFromMenu.current = false;
      }}>
        <div className={styles.dialogHeader}>
          <span id="navigation-title" className={styles.dialogEyebrow}>Explore the portfolio</span>
          <button type="button" className={styles.closeButton} aria-label="Close navigation menu" onClick={() => dialogRef.current?.close()}><X size={24} aria-hidden="true" /></button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {[...links, { id: "contact", label: "Let’s talk" }].map((item, index) => (
            <a key={item.id} href={`#${item.id}`} onClick={(event) => navigate(event, item.id)} aria-current={active === item.id ? "location" : undefined} style={{ "--item-index": index } as React.CSSProperties}>
              <span className={styles.mobileIndex}>0{index + 1}</span><span>{item.label}</span><ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className={styles.dialogFooter}><span>CHEN GUANG</span><span>Intelligence. With intention.</span></div>
      </dialog>
    </>
  );
}
