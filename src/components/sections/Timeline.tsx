"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2026+",
    title: "Looking Ahead",
    location: "London, UK",
    description: "Preparing for higher studies in Computer Science at university to build functional software products and learn advanced systems engineering.",
  },
  {
    year: "2025",
    title: "FinCalc App Launch",
    location: "Google Play Store",
    description: "Developed and published FinCalc on the Google Play Store from scratch. Learnt how to resolve lifecycle state management and calculations in Java.",
  },
  {
    year: "2024",
    title: "Moving to London & College",
    location: "West Thames College, London",
    description: "Relocated to the UK. Completed the T Level Foundation year with a verified distinction D*D result. Preparing for BTEC Level 3 Year 2 in September.",
  },
  {
    year: "2022",
    title: "Founding Visual Vibe Creation",
    location: "Goa, India",
    description: "Established the independent creative studio to channel video editing and visual branding design commissions for clients.",
  },
  {
    year: "2021",
    title: "First Steps in Creative Design",
    location: "Goa, India",
    description: "Started experimenting with digital layouts, graphic vectors, and taking atmospheric landscape photos of quiet Goan settings.",
  },
];

export default function Timeline() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
            My Journey
          </span>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Journey Timeline
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            A chronological mapping of my academic progression, creative projects, and transition from Goa to London.
          </p>
        </div>

        <div className="mt-20 relative max-w-3xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-teal via-accent-cyan to-transparent transform -translate-x-1/2" />

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
                  <div className="absolute left-4 md:left-1/2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-bg-primary bg-accent-teal z-10 shadow-lg shadow-accent-teal/50" />

                  {/* Left Side Content Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      className={`rounded-2xl border border-border-standard bg-bg-secondary/40 backdrop-blur-sm p-6 text-left hover:border-accent-teal/20 transition-all duration-300 ${
                        isEven ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <span className="inline-block text-[10px] font-mono font-bold text-accent-cyan tracking-widest bg-accent-teal/10 px-2.5 py-0.5 rounded-full mb-3">
                        {event.year}
                      </span>
                      <h3 className="font-display text-base font-bold text-white tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-[10px] font-mono text-accent-teal tracking-wider uppercase mt-1">
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
