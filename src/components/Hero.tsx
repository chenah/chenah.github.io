"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { hero } from "@/lib/content";
import { CharReveal, Magnetic } from "@/components/motion-primitives";

const PORTRAIT_BANDS = [0, 1, 2, 3, 4] as const;

function PortraitBand({
  band,
  scrollProgress,
  active,
  reducedMotion,
  sliceTravel,
}: {
  band: number;
  scrollProgress: MotionValue<number>;
  active: boolean;
  reducedMotion: boolean;
  sliceTravel: number;
}) {
  const direction = band % 2 === 0 ? 1 : -1;
  const sliceX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reducedMotion ? 0 : direction * sliceTravel],
  );

  return (
    <motion.span
      aria-hidden
      className="absolute left-0 block h-1/5 w-full overflow-hidden"
      style={{ top: `${band * 20}%`, x: sliceX }}
    >
      <span
        className="absolute left-0 block h-[500%] w-full"
        style={{ top: `${band * -100}%` }}
      >
        <Image
          src="/characters/chen-pixel-avatar.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 639px) 86vw, min(92vh, 72vw)"
          className={`object-contain transition-[opacity,transform] duration-500 ease-out group-hover/avatar:scale-[1.015] group-hover/avatar:opacity-0 group-focus-visible/avatar:scale-[1.015] group-focus-visible/avatar:opacity-0 ${active ? "scale-[1.015] opacity-0" : "opacity-100"}`}
          style={{ imageRendering: "pixelated" }}
        />
        <Image
          src="/characters/chen-pixel-ai-mode.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 639px) 86vw, min(92vh, 72vw)"
          className={`object-contain transition-[opacity,transform] duration-500 ease-out group-hover/avatar:scale-[1.015] group-hover/avatar:opacity-100 group-focus-visible/avatar:scale-[1.015] group-focus-visible/avatar:opacity-100 ${active ? "scale-[1.015] opacity-100" : "opacity-0"}`}
          style={{ imageRendering: "pixelated" }}
        />
      </span>
    </motion.span>
  );
}

function PixelAvatar({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [active, setActive] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const syncViewport = () => setDesktop(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => setActive((value) => !value)}
      aria-pressed={active}
      aria-label={active ? "Show default portrait" : "Show AI-mode portrait"}
      initial={reducedMotion ? false : { opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group/avatar relative aspect-square w-[86vw] max-w-[400px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#282c20] sm:w-[min(92vh,72vw)] sm:max-w-[880px] sm:min-w-[560px]"
      data-testid="pixel-avatar"
      data-cursor="hover"
    >
      <span className="sr-only">Interactive portrait of CHEN Guang</span>
      <div className="absolute inset-[8%] rounded-full border border-[#282c20]/12 bg-[#e7e8df]/55 shadow-[0_30px_100px_rgba(40,44,32,.12)]" />
      <div
        className={`absolute inset-[14%] rounded-full border border-dashed border-[#282c20]/18 transition-transform duration-[1600ms] ease-out group-hover/avatar:rotate-180 group-focus-visible/avatar:rotate-180 ${active ? "rotate-180" : ""}`}
      />
      <div
        className={`absolute inset-[19%] rounded-full border border-[#282c20]/10 transition-transform duration-[1800ms] ease-out group-hover/avatar:-rotate-90 group-focus-visible/avatar:-rotate-90 ${active ? "-rotate-90" : ""}`}
      />
      <div
        className={`absolute inset-[24%] rounded-full bg-lime/60 blur-3xl transition-opacity duration-700 group-hover/avatar:opacity-60 group-focus-visible/avatar:opacity-60 ${active ? "opacity-60" : "opacity-20"}`}
      />

      <div className="absolute inset-0 z-10">
        {PORTRAIT_BANDS.map((band) => (
          <PortraitBand
            key={band}
            band={band}
            scrollProgress={scrollProgress}
            active={active}
            reducedMotion={reducedMotion}
            sliceTravel={desktop ? 24 : 12}
          />
        ))}
      </div>
    </motion.button>
  );
}

/** Circular rotating "scroll" label around the magnetic down arrow. */
function ScrollBadge() {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <div className="relative grid size-24 place-items-center sm:size-28">
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className={`absolute inset-0 size-full ${reducedMotion ? "" : "animate-spin-slow"}`}
      >
        <defs>
          <path
            id="scroll-circle"
            d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
          />
        </defs>
        <text
          fill="#282c20"
          fontSize="8.2"
          letterSpacing="2.6"
          style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700 }}
        >
          <textPath href="#scroll-circle">
            SCROLL · EXPLORE · SCROLL · EXPLORE ·
          </textPath>
        </text>
      </svg>
      <Magnetic strength={reducedMotion ? 0 : 0.4}>
        <a
          href="#about"
          data-cursor="hover"
          className="flex size-12 items-center justify-center rounded-full bg-lime text-xl font-bold text-[#282c20] transition-shadow hover:shadow-[0_10px_30px_rgba(40,44,32,.22)]"
          aria-label="Scroll to about"
        >
          <motion.span
            animate={reducedMotion ? undefined : { y: [0, 3, 0] }}
            transition={reducedMotion ? undefined : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </a>
      </Magnetic>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 150]);
  const copyY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 70]);
  const fade = useTransform(scrollYProgress, reducedMotion ? [0, 1] : [0.35, 0.9], reducedMotion ? [1, 1] : [1, 0]);

  // Big name reacts to scroll velocity with a kinetic skew.
  const skew = useMotionValue(0);
  const smoothSkew = useSpring(skew, { stiffness: 140, damping: 18, mass: 0.5 });
  useLenis(({ velocity }: { velocity: number }) => {
    if (reducedMotion) return;
    skew.set(Math.max(-9, Math.min(9, velocity * 0.45)));
  });

  // The portrait and oversized type drift gently toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.8 });
  const titleX = useTransform(smx, (value) => value * 0.24);
  const titlePointerY = useTransform(smy, (value) => value * 0.18);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || e.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 26);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  function resetPointerDrift() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointerDrift}
      className="contour-bg relative min-h-[100svh] overflow-hidden bg-[#f4f4ed] text-[#282c20]"
    >
      <motion.div style={{ opacity: fade }} className="absolute left-6 top-[22%] z-20 hidden lg:block">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 1, duration: reducedMotion ? 0 : 0.8 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#282c20]/40" />
            <span className="font-editorial text-base italic">Portrait, 2026</span>
          </div>
          <p className="mt-3 max-w-[160px] font-mono text-[0.56rem] uppercase leading-[1.7] tracking-[0.14em] text-[#282c20]/60">
            SCUT · School of<br />Future Technology<br />PhD · AI Applications
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: copyY, x: titleX }}
        className="pointer-events-none absolute inset-x-0 top-[12%] z-0 px-4 text-center sm:top-[9%]"
      >
        <motion.div style={{ y: titlePointerY }}>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0 : 0.6 }}
            className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.24em]"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            style={{ skewX: smoothSkew }}
            className="font-display text-[clamp(4.7rem,18vw,17rem)] uppercase leading-[0.76] tracking-[-0.04em]"
          >
            <CharReveal mount delay={reducedMotion ? 0 : 0.25} stagger={reducedMotion ? 0 : 0.045} text={hero.name.join(" ")} />
          </motion.h1>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: avatarY }} className="absolute inset-x-0 bottom-[-15%] z-10 flex justify-center sm:bottom-[-24%]">
        <motion.div style={{ x: smx, y: smy }}>
          <PixelAvatar scrollProgress={scrollYProgress} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 0.9, duration: reducedMotion ? 0 : 0.7 }}
        className="absolute left-4 top-[34%] z-30 max-w-[230px] sm:bottom-8 sm:left-8 sm:top-auto sm:max-w-sm"
      >
        <p className="mb-3 text-[0.82rem] font-medium leading-snug">{hero.sub}</p>
        <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.14em] text-[#282c20]/70">{hero.now}</p>
      </motion.div>

      <motion.p
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.15, duration: reducedMotion ? 0 : 0.7 }}
        className="absolute bottom-28 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap font-mono text-[0.53rem] font-bold uppercase tracking-[0.18em] text-[#282c20]/65 sm:bottom-auto sm:left-[calc(50%+min(35vw,390px))] sm:top-[48%] sm:translate-x-0"
      >
        TAP / HOVER TO SHIFT
      </motion.p>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.1, duration: reducedMotion ? 0 : 0.8 }}
        className="absolute bottom-3 right-2 z-30 sm:bottom-6 sm:right-6"
      >
        <ScrollBadge />
      </motion.div>
    </section>
  );
}
