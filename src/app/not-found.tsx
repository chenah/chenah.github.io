"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#f4f4ed] px-5 text-[#282c20]">
      <h1 className="font-display text-[clamp(6rem,20vw,16rem)] uppercase leading-none">404</h1>
      <p className="mt-4 text-lg text-[#63675b]">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-[#282c20] px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-[#282c20] hover:text-lime"
      >
        Back Home
      </Link>
    </section>
  );
}