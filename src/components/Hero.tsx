"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/lib/content";
import { useLang } from "@/lib/lang";

function PixelAvatar() {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setActive((value) => !value)}
      aria-pressed={active}
      aria-label={active ? "Deactivate AI mode" : "Activate AI mode"}
      initial={{ opacity: 0, y: 80, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group/avatar relative aspect-square w-[min(92vh,72vw)] min-w-[470px] max-w-[880px] cursor-crosshair sm:min-w-[620px]"
      data-testid="pixel-avatar"
    >
      <div className="absolute inset-[8%] rounded-full border border-[#282c20]/15 bg-[#e7e8df]/75 shadow-[0_28px_90px_rgba(40,44,32,.14)]" />
      <div className="absolute inset-[13%] rounded-full border border-dashed border-[#282c20]/25 transition-transform duration-[1600ms] group-hover/avatar:rotate-90" />
      <div className="absolute inset-[21%] rounded-full bg-lime/75 blur-3xl transition-opacity duration-500 group-hover/avatar:opacity-100 sm:opacity-35" />

      <Image
        src="/characters/chen-pixel-avatar.png"
        alt="陈光的复古像素角色"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 470px, 880px"
        className={`relative z-10 object-contain transition-[opacity,transform] duration-300 group-hover/avatar:scale-[1.025] group-hover/avatar:opacity-0 ${active ? "opacity-0" : "opacity-100"}`}
        style={{ imageRendering: "pixelated" }}
      />
      <Image
        src="/characters/chen-pixel-ai-mode.png"
        alt="进入 AI 模式的像素角色"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 470px, 880px"
        className={`relative z-20 object-contain transition-[opacity,transform] duration-300 group-hover/avatar:scale-[1.025] group-hover/avatar:opacity-100 ${active ? "opacity-100" : "opacity-0"}`}
        style={{ imageRendering: "pixelated" }}
      />

      <div className="absolute left-1/2 top-[14%] z-30 -translate-x-1/2 border border-[#282c20] bg-[#f4f4ed] px-3 py-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] transition-colors group-hover/avatar:border-lime group-hover/avatar:bg-[#282c20] group-hover/avatar:text-lime">
        <span className={`${active ? "hidden" : "group-hover/avatar:hidden"}`}>
          <span className="sm:hidden">Tap · Activate AI</span>
          <span className="hidden sm:inline">Hover · Activate AI</span>
        </span>
        <span className={`${active ? "inline" : "hidden"} group-hover/avatar:inline`}>AI Mode · Online</span>
      </div>
    </motion.button>
  );
}

export function Hero() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={ref} id="top" className="contour-bg relative min-h-[100svh] overflow-hidden bg-[#f4f4ed] text-[#282c20]">
      <div className="absolute left-4 top-[20%] z-20 hidden w-32 border border-[#282c20]/45 font-mono text-[0.54rem] font-bold uppercase lg:block">
        <div className="border-b border-inherit px-2 py-1.5">Current Quest</div>
        <div className="px-2 py-3">
          SCUT<br />
          AI Applications<br />
          PhD · 2027.09
        </div>
      </div>

      <motion.div style={{ y: copyY }} className="pointer-events-none absolute inset-x-0 top-[12%] z-0 px-4 text-center sm:top-[9%]">
        <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.22em]">{t(hero.eyebrow)}</p>
        <h1 className="font-display text-[clamp(4.7rem,18vw,17rem)] uppercase leading-[0.76] tracking-[-0.04em]">
          {lang === "zh" ? hero.nameZh : hero.nameEn.join(" ")}
        </h1>
      </motion.div>

      <motion.div style={{ y: avatarY }} className="absolute inset-x-0 bottom-[-15%] z-10 flex justify-center sm:bottom-[-24%]">
        <PixelAvatar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute left-4 top-[29%] z-30 max-w-[250px] sm:bottom-8 sm:left-8 sm:top-auto sm:max-w-sm"
      >
        <p className="mb-3 text-[0.78rem] font-medium leading-snug">{t(hero.sub)}</p>
        <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.12em]">{t(hero.now)}</p>
      </motion.div>

      <a href="#about" className="absolute bottom-5 right-4 z-30 flex size-12 items-center justify-center rounded-[12px] bg-lime text-xl font-bold sm:bottom-8 sm:right-8" aria-label="Scroll to about">
        ↓
      </a>
    </section>
  );
}
