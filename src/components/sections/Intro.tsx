"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function Intro() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border-subtle bg-bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Personal Intro */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              Biography
            </span>
            <TextReveal
              text="Creative Developer & Designer building functional digital products."
              tag="h2"
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-text-secondary leading-relaxed max-w-2xl"
            >
              Visual Vibe Creation is my independent creative studio where I combine design, branding and technology to help ideas become engaging digital experiences. I believe digital builds should not only function cleanly but feel responsive and modern.
            </motion.p>
          </div>

          {/* Right Column: Founder Info */}
          <div className="lg:col-span-5 rounded-2xl border border-border-standard bg-bg-secondary p-8 md:p-10 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-teal/5 blur-3xl" />

            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              Identity Detail
            </span>
            <h3 className="font-display mt-4 text-2xl font-bold text-white tracking-tight">
              Enosh Jaques
            </h3>
            <p className="mt-1 text-[10px] font-mono text-accent-teal uppercase tracking-widest">
              Founder — Visual Vibe Creation
            </p>

            <div className="mt-6 space-y-4 text-xs text-text-secondary leading-relaxed">
              <p>
                Based in London, United Kingdom (originally from Goa, India), I focus on software development, graphic layout, and digital design.
              </p>
              <p>
                Currently preparing to begin the second and final year of my BTEC Level 3 Information Technology course at West Thames College, I founded Visual Vibe Creation to channel my creative project work.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Location</p>
                <p className="mt-1 text-xs font-semibold text-white">London, UK</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Current Status</p>
                <p className="mt-1 text-xs font-semibold text-white">Staged for Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
