"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

const categories = ["All", "Web Dev", "Android Apps", "Future Games", "Concept Stages"];

const projectsList = [
  {
    title: "FinCalc - Financial Calculator",
    description: "My first published Android calculator application. Features compound interest plans, loan amortizations, profit margins, and custom calculation logic written in Java.",
    category: "Android Apps",
    tags: ["Java", "Android SDK", "Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.enosh.fincalc",
  },
  {
    title: "Visual Vibe Creation Portfolio",
    description: "Official digital identity framework. Built from scratch with Next.js App Router, Tailwind CSS, TypeScript, and Framer Motion visual components.",
    category: "Web Dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "/",
  },
  {
    title: "Upcoming Mobile Game",
    description: "Currently in the planning and concept stage. Researching graphic layout elements and gameplay logic blueprints.",
    category: "Future Games",
    tags: ["Concept Stage", "Planning"],
    link: "/projects",
  },
  {
    title: "Micro Web Utilities",
    description: "Research project focusing on visual representation systems for data structures. Concept stage layout exploration.",
    category: "Concept Stages",
    tags: ["Research", "Concept"],
    link: "/projects",
  },
];

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projectsList.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              Creative Portfolio
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-white tracking-tight sm:text-4xl">
              Featured Work
            </h2>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center gap-2 border border-border-standard bg-bg-secondary/40 backdrop-blur-sm p-1 rounded-full w-fit">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-full px-5 py-2 text-xs font-medium transition-colors duration-300 cursor-pointer ${
                    isSelected ? "text-bg-primary font-bold" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeFilterBg"
                      className="absolute inset-0 rounded-full bg-accent-teal"
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border-subtle">
          <a
            href="https://github.com/Enosh-J10"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 rounded-2xl border border-border-standard bg-bg-secondary/50 hover:bg-bg-secondary hover:border-accent-teal/20 transition-all duration-300"
          >
            <div>
              <span className="text-[9px] uppercase font-mono text-accent-cyan tracking-widest">
                GitHub Repository
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">
                Explore Enosh-J10 Codebases
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                Check active development pipelines, scripts, and structures.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/5 group-hover:bg-accent-teal group-hover:text-bg-primary flex items-center justify-center transition-all">
              <span className="text-sm font-semibold">&rarr;</span>
            </div>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.enosh.fincalc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 rounded-2xl border border-border-standard bg-bg-secondary/50 hover:bg-bg-secondary hover:border-accent-teal/20 transition-all duration-300"
          >
            <div>
              <span className="text-[9px] uppercase font-mono text-accent-cyan tracking-widest">
                Google Play Store
              </span>
              <h4 className="font-display text-lg font-bold text-white mt-1">
                Get FinCalc on Android
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                Download and install directly on your Android device.
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/5 group-hover:bg-accent-teal group-hover:text-bg-primary flex items-center justify-center transition-all">
              <span className="text-sm font-semibold">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
