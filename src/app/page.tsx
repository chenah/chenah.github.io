import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ResearchStory } from "@/components/ResearchStory";
import { Publications } from "@/components/Publications";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <ResearchStory />
        <Projects />
        <Publications />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
