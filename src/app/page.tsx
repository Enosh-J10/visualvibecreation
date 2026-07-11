import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="flex-1 w-full relative">
      <Hero />
      <Intro />
      <ServicesGrid />
      <ProjectsGrid />
      <Skills />
      <Timeline />
      <ContactSection />
    </main>
  );
}
