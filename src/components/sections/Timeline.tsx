"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "Present",
    title: "University Preparation & Studio Scaling",
    location: "United Kingdom",
    description: "Preparing to begin university studies in Computer Science while scaling Visual Vibe Creation. Building premium digital systems and exploring game engine sandboxes (Unity/C#).",
  },
  {
    year: "2025",
    title: "FinCalc Launch & Mobile Expertise",
    location: "United Kingdom / Google Play",
    description: "Built and launched FinCalc on the Google Play Store, mastering Android SDK patterns, compounding math algorithms, and native Kotlin development.",
  },
  {
    year: "2024",
    title: "Migration & Tech Stack Expansion",
    location: "United Kingdom",
    description: "Moved to the UK. Shifted focus to advanced web development utilizing React, Next.js, and TypeScript, blending robust engineering with elite visual graphics.",
  },
  {
    year: "2023",
    title: "Founding Visual Vibe Creation",
    location: "Goa, India",
    description: "Established the creative studio to deliver branding, UI assets, poster design, and high-fidelity video content for local and digital businesses.",
  },
  {
    year: "2021",
    title: "First Steps in Engineering & Art",
    location: "Goa, India",
    description: "Wrote first lines of code and began designing digital vectors. Discovered a deep fascination for combining software development with artistic assets.",
  },
];

export default function Timeline() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-white/[0.03]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
            Our Journey
          </span>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl">
            The Studio Timeline
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            An overview of Enosh Jaques&apos; path, detailing how he started in India and brought Visual Vibe Creation to the UK.
          </p>
        </div>

        <div className="mt-20 relative max-w-3xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-purple via-accent-blue to-transparent transform -translate-x-1/2" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Circle Node */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-bg-primary bg-accent-purple z-10 shadow-lg shadow-accent-purple/50" />

                  {/* Left Side Content Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      className={`rounded-2xl border border-white/[0.05] bg-bg-secondary/40 backdrop-blur-sm p-6 text-left hover:border-accent-purple/20 transition-all duration-300 ${
                        isEven ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <span className="inline-block text-xs font-bold text-accent-purple tracking-widest bg-accent-purple/10 px-2.5 py-0.5 rounded-full mb-3">
                        {event.year}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-[11px] font-medium text-accent-blue tracking-wider uppercase mt-1">
                        {event.location}
                      </p>
                      <p className="mt-4 text-xs text-text-secondary leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for Desktop Grid alignment */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
