"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

const categories = ["All", "Web Dev", "Android Apps", "Games", "Graphic Design"];

const projectsList = [
  {
    title: "FinCalc - Financial Calculator",
    description: "A comprehensive, high-utility financial planning application published on Google Play. Features compounding interest plans, loan amortizations, tax estimators, and clean dark mode charts.",
    category: "Android Apps",
    tags: ["Kotlin", "Android SDK", "Material Design 3", "Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.enosh.fincalc",
  },
  {
    title: "Visual Vibe Creation Studio",
    description: "The digital studio portal itself. Built from scratch with Next.js App Router, Tailwind CSS, Lenis, and GSAP. Features high-end custom physics transitions and optimized rendering pipelines.",
    category: "Web Dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
    link: "/",
  },
  {
    title: "Galactic Odyssey Sandbox",
    description: "A conceptual retro space flight sandbox game showcasing modular vehicle physics, pathfinders, custom graphic assets, and orbit simulators.",
    category: "Games",
    tags: ["C#", "Unity Engine", "3D Math", "Game Design"],
    link: "https://github.com/Enosh-J10",
  },
  {
    title: "Minimal Studio Brand Suite",
    description: "Curated collection of corporate design templates, modern luxury business card designs, social assets, and vector logos designed for digital creators.",
    category: "Graphic Design",
    tags: ["Illustrator", "Brand Identity", "Print Media", "Vector Art"],
    link: "https://www.instagram.com/designer_visual_vibe_creations/",
  },
  {
    title: "VibeSync Systems Controller",
    description: "Desktop utility featuring dashboard monitors, custom automation pipelines, system monitors, and smooth hardware analytics overlays.",
    category: "Web Dev",
    tags: ["Electron", "React", "Node.js", "Chart.js"],
    link: "https://github.com/Enosh-J10",
  },
];

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsList.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-white/[0.03]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
              Creative Portfolio
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-white tracking-tight sm:text-4xl">
              Featured Work
            </h2>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center gap-2 border border-white/[0.05] bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-full w-fit">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-full px-5 py-2 text-xs font-medium transition-colors duration-300 ${
                    isSelected ? "text-bg-primary" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFilterBg"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  tags={project.tags}
                  link={project.link}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Integration Callout widgets */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/[0.05]">
          <a
            href="https://github.com/Enosh-J10"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 rounded-2xl border border-white/[0.05] bg-bg-secondary/50 hover:bg-bg-secondary hover:border-accent-purple/20 transition-all duration-300"
          >
            <div>
              <span className="text-[10px] uppercase font-semibold text-accent-purple tracking-widest">
                GitHub Repository
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">
                Explore Enosh-J10 Codebases
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                Check active development pipelines, scripts, and structures.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
              <span className="text-sm font-semibold">&rarr;</span>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 rounded-2xl border border-white/[0.05] bg-bg-secondary/50 hover:bg-bg-secondary hover:border-accent-blue/20 transition-all duration-300"
          >
            <div>
              <span className="text-[10px] uppercase font-semibold text-accent-blue tracking-widest">
                Google Play Store
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">
                Get FinCalc on Android
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                Download and install directly on your Android device.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
              <span className="text-sm font-semibold">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
