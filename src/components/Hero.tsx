"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { hero } from "@/lib/content";
import { CharReveal, Magnetic } from "@/components/motion-primitives";

function PixelAvatar() {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setActive((value) => !value)}
      aria-pressed={active}
      aria-label={active ? "Show default portrait" : "Show AI-mode portrait"}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group/avatar relative aspect-square w-[86vw] max-w-[400px] sm:w-[min(92vh,72vw)] sm:max-w-[880px] sm:min-w-[560px]"
      data-testid="pixel-avatar"
      data-cursor="hover"
    >
      <div className="absolute inset-[8%] rounded-full border border-[#282c20]/12 bg-[#e7e8df]/55 shadow-[0_30px_100px_rgba(40,44,32,.12)]" />
      <div className="absolute inset-[14%] rounded-full border border-dashed border-[#282c20]/18 transition-transform duration-[2600ms] ease-linear group-hover/avatar:rotate-180" />
      <div className="absolute inset-[24%] rounded-full bg-lime/60 opacity-20 blur-3xl transition-opacity duration-700 group-hover/avatar:opacity-60" />

      <Image
        src="/characters/chen-pixel-avatar.png"
        alt="CHEN Guang pixel portrait"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 470px, 880px"
        className={`relative z-10 object-contain transition-[opacity,transform] duration-500 group-hover/avatar:scale-[1.02] group-hover/avatar:opacity-0 ${active ? "opacity-0" : "opacity-100"}`}
        style={{ imageRendering: "pixelated" }}
      />
      <Image
        src="/characters/chen-pixel-ai-mode.png"
        alt="CHEN Guang AI-mode pixel portrait"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 470px, 880px"
        className={`relative z-20 object-contain transition-[opacity,transform] duration-500 group-hover/avatar:scale-[1.02] group-hover/avatar:opacity-100 ${active ? "opacity-100" : "opacity-0"}`}
        style={{ imageRendering: "pixelated" }}
      />
    </motion.button>
  );
}

/** Circular rotating "scroll" label around the magnetic down arrow. */
function ScrollBadge() {
  return (
    <div className="relative grid size-24 place-items-center sm:size-28">
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="animate-spin-slow absolute inset-0 size-full"
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
      <Magnetic strength={0.4}>
        <a
          href="#about"
          data-cursor="hover"
          className="flex size-12 items-center justify-center rounded-full bg-lime text-xl font-bold text-[#282c20] transition-shadow hover:shadow-[0_10px_30px_rgba(40,44,32,.22)]"
          aria-label="Scroll to about"
        >
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);

  // Big name reacts to scroll velocity with a kinetic skew.
  const skew = useMotionValue(0);
  const smoothSkew = useSpring(skew, { stiffness: 140, damping: 18, mass: 0.5 });
  useLenis(({ velocity }: { velocity: number }) => {
    skew.set(Math.max(-9, Math.min(9, velocity * 0.45)));
  });

  // Avatar drifts gently toward the cursor (on top of its scroll parallax).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.8 });
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 26);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="contour-bg relative min-h-[100svh] overflow-hidden bg-[#f4f4ed] text-[#282c20]"
    >
      <motion.div style={{ opacity: fade }} className="absolute left-6 top-[22%] z-20 hidden lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
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

      <motion.div style={{ y: copyY }} className="pointer-events-none absolute inset-x-0 top-[12%] z-0 px-4 text-center sm:top-[9%]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.24em]"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          style={{ skewX: smoothSkew }}
          className="font-display text-[clamp(4.7rem,18vw,17rem)] uppercase leading-[0.76] tracking-[-0.04em]"
        >
          <CharReveal mount delay={0.25} stagger={0.045} text={hero.name.join(" ")} />
        </motion.h1>
      </motion.div>

      <motion.div style={{ y: avatarY }} className="absolute inset-x-0 bottom-[-15%] z-10 flex justify-center sm:bottom-[-24%]">
        <motion.div style={{ x: smx, y: smy }}>
          <PixelAvatar />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="absolute left-4 top-[34%] z-30 max-w-[230px] sm:bottom-8 sm:left-8 sm:top-auto sm:max-w-sm"
      >
        <p className="mb-3 text-[0.82rem] font-medium leading-snug">{hero.sub}</p>
        <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.14em] text-[#282c20]/70">{hero.now}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-3 right-2 z-30 sm:bottom-6 sm:right-6"
      >
        <ScrollBadge />
      </motion.div>
    </section>
  );
}
