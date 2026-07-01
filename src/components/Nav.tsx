"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { brand, navItems } from "@/lib/content";

export function Nav() {
  const lenis = useLenis();
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-44% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -60 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-100 flex items-start justify-between p-4 sm:p-6">
      <a href="#top" onClick={(e) => go(e, "top")} className="pointer-events-auto rounded-sm bg-[#f4f4ed]/90 px-1.5 py-1 leading-[0.78] text-[#282c20] backdrop-blur-sm">
        <span className="block font-editorial text-[1.25rem] sm:text-[1.5rem]">{brand.split(" ")[0]}</span>
        <span className="block font-display text-[1.25rem] uppercase sm:text-[1.5rem]">GUANG</span>
      </a>

      <div className="pointer-events-auto flex items-center gap-2.5">
        <nav className="mr-2 hidden items-center gap-5 rounded-full border border-[#282c20]/20 bg-[#f4f4ed]/80 px-5 py-3 backdrop-blur-lg lg:flex">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`text-[0.68rem] font-bold uppercase tracking-[0.12em] transition-colors ${active === item.id ? "text-[#282c20]" : "text-[#282c20]/45 hover:text-[#282c20]"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-[11px] border-2 border-[#282c20] bg-[#f4f4ed] text-[#282c20]"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="relative block h-4 w-5">
            <i className={`absolute left-0 top-1 block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <i className={`absolute bottom-1 left-1 block h-0.5 w-4 bg-current transition-transform ${open ? "-translate-x-1 -translate-y-1 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div className={`pointer-events-auto fixed inset-0 -z-1 flex flex-col justify-center bg-[#282c20] px-6 text-[#f4f4ed] transition-[clip-path] duration-700 sm:px-12 ${open ? "[clip-path:circle(230%_at_96%_4%)]" : "[clip-path:circle(0%_at_96%_4%)]"}`}>
        <span className="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-lime">Navigate</span>
        {navItems.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="group flex items-baseline gap-5 border-t border-white/15 py-3 last:border-b">
            <span className="text-xs text-lime">0{index + 1}</span>
            <span className="font-display text-[clamp(2.8rem,8vw,7rem)] uppercase leading-none transition-transform group-hover:translate-x-4">{item.label}</span>
          </a>
        ))}
      </div>
    </header>
  );
}
