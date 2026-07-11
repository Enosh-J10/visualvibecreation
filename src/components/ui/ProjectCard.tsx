"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  tags,
  link,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-bg-secondary p-6 sm:p-8 transition-colors duration-500 hover:border-accent-purple/30"
    >
      {/* Background Radial Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(157, 78, 221, 0.15), transparent 80%)`,
        }}
      />

      {/* Grid background inside card */}
      <div className="absolute inset-0 grid-overlay opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-purple">
              {category}
            </span>
            <Link
              href={link}
              target={link.startsWith("http") ? "_blank" : "_self"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white hover:text-black"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <h3 className="font-display mt-6 text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>

          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.03] px-3.5 py-1 text-xs text-text-secondary border border-white/[0.03] group-hover:border-accent-purple/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
