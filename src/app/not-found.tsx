"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-5 text-foreground">
      <h1 className="font-display text-[clamp(6rem,20vw,16rem)] uppercase leading-none">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Back Home
      </Link>
    </section>
  );
}
