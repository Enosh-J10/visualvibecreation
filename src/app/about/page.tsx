import Intro from "@/components/sections/Intro";
import Timeline from "@/components/sections/Timeline";
import Skills from "@/components/sections/Skills";

export const metadata = {
  title: "About | Visual Vibe Creation",
  description: "Learn more about Enosh Jaques and the vision behind the Visual Vibe Creation creative digital studio.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 w-full py-12">
      <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          The Creative Journey
        </h1>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          Driven by engineering precision and designed with cinematic style. Read about our origins, tools, and technical timeline.
        </p>
      </div>

      <Intro />
      <Skills />
      <Timeline />
    </main>
  );
}
