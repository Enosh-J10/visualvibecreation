/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  link: string;
}

// NOTE: This is a legacy card component scheduled for retirement/consolidation in Phase 5: Projects
export default function ProjectCard({
  title,
  description,
  category,
  tags,
  link,
}: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const bypass = !mounted || shouldReduceMotion;

  if (bypass) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-border-standard bg-bg-secondary p-6 sm:p-8">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
                {category}
              </span>
              <Link
                href={link}
                target={link.startsWith('http') ? '_blank' : '_self'}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-accent-teal hover:text-bg-primary"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <h3 className="font-display mt-6 text-2xl font-bold text-white tracking-tight">
              {title}
            </h3>
            <p className="mt-4 text-xs text-text-secondary leading-relaxed">{description}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.03] px-3.5 py-1 text-[10px] font-mono text-text-secondary border border-border-subtle group-hover:border-accent-teal/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-border-standard bg-bg-secondary p-6 sm:p-8 transition-colors duration-500 hover:border-accent-teal/30"
    >
      {/* Background Radial Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 148, 136, 0.12), transparent 80%)`,
        }}
      />

      {/* Grid background inside card */}
      <div className="absolute inset-0 grid-overlay opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
              {category}
            </span>
            <Link
              href={link}
              target={link.startsWith('http') ? '_blank' : '_self'}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-accent-teal hover:text-bg-primary"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <h3 className="font-display mt-6 text-2xl font-bold text-white tracking-tight">
            {title}
          </h3>

          <p className="mt-4 text-xs text-text-secondary leading-relaxed">{description}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.03] px-3.5 py-1 text-[10px] font-mono text-text-secondary border border-border-subtle group-hover:border-accent-teal/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
