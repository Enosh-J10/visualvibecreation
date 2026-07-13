import { Container } from "@/components/ui/Sections";
import Intro from "@/components/sections/Intro";
import Timeline from "@/components/sections/Timeline";
import Skills from "@/components/sections/Skills";

export const metadata = {
  title: "About | Visual Vibe Creation",
  description: "Learn more about Enosh Jaques and the vision behind the Visual Vibe Creation creative digital studio.",
};

export default function AboutPage() {
  return (
    <main className="flex-grow w-full py-12">
      <Container variant="standard" className="text-center mb-16 pt-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          The Creative Journey
        </h1>
        <p className="mt-4 text-xs text-text-secondary leading-relaxed max-w-xl mx-auto">
          Driven by engineering precision and designed with cinematic style. Read about my origins, tools, and technical timeline.
        </p>
      </Container>

      <Intro />
      <Skills />
      <Timeline />
    </main>
  );
}
