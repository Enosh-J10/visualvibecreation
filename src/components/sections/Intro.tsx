"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function Intro() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-white/[0.03]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Business Intro */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
              Who We Are
            </span>
            <TextReveal
              text="A premium creative digital studio delivering next-generation digital products."
              tag="h2"
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-text-secondary leading-relaxed max-w-2xl"
            >
              Visual Vibe Creation operates at the intersection of stunning aesthetic design and robust software engineering. We believe digital assets should not only function flawlessly but captivate users instantly. From brand identities to full-scale web, mobile, and game solutions, we build interfaces that feel premium, responsive, and alive.
            </motion.p>
          </div>

          {/* Right Column: Founder Info */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.05] bg-bg-secondary p-8 md:p-10 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-blue/10 blur-3xl" />

            <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
              Meet The Founder
            </span>
            <h3 className="font-display mt-4 text-2xl font-bold text-white tracking-tight">
              Enosh Jaques
            </h3>
            <p className="mt-1 text-xs text-text-secondary font-medium uppercase tracking-widest">
              Lead Architect & Designer
            </p>

            <div className="mt-6 space-y-4 text-sm text-text-secondary leading-relaxed">
              <p>
                Based in the **United Kingdom** (originally from **Goa, India**), Enosh is a software engineer, graphic artist, mobile developer, and future game architect.
              </p>
              <p>
                Currently preparing to enter university, Enosh founded **Visual Vibe Creation** to manifest his creative vision into high-end digital solutions for global clients, recruiters, and academic platforms.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05] grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider">Location</p>
                <p className="mt-1 text-sm font-semibold text-white">United Kingdom</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider">Status</p>
                <p className="mt-1 text-sm font-semibold text-white">Ready for Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
