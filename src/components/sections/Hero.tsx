"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const words = ["Digital Experiences", "Brand Identities", "Software Solves", "Interactive Games"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
    } else if (isDeleting && currentText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 200);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullWord.substring(0, currentText.length - 1)
            : fullWord.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 md:px-12 py-20">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.04] pointer-events-none" />

      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-accent-purple/10 blur-[120px] animate-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-blue/10 blur-[140px] animate-glow pointer-events-none" style={{ animationDelay: "-4s" }} />

      {/* Mouse interaction light spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(157, 78, 221, 0.05), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
          <span>Available for Freelance & Internships</span>
        </motion.div>

        {/* Large Typography Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.1]"
        >
          Creating Premium <br />
          <span className="text-gradient-accent">{currentText}</span>
          <span className="animate-pulse text-accent-purple">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base text-text-secondary sm:text-lg leading-relaxed"
        >
          We are **Visual Vibe Creation**, an independent creative digital studio founded by **Enosh Jaques**. We design and build high-end software, web layouts, games, mobile applications, and visual motion graphics.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-bg-primary px-8 py-4 text-sm font-semibold transition-transform hover:scale-[1.02] hover:bg-accent-purple hover:text-white shadow-xl shadow-white/5"
            >
              Explore Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all backdrop-blur-sm"
            >
              Let&apos;s Build
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
