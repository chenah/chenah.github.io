import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CtaBand } from "@/components/CtaBand";
import { Publications } from "@/components/Publications";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <CtaBand />
        <Publications />
        <Experience />
        <Projects />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
