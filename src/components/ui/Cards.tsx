'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar } from 'lucide-react';

// Reusable card wrapper that adds interactive scale/glow transitions
function CardWrapper({
  children,
  className = '',
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const hoverScale = interactive && !shouldReduceMotion ? 1.015 : 1;

  return (
    <motion.div
      whileHover={interactive ? { scale: hoverScale } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`card-standard ${interactive ? 'card-interactive' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Experience Card
export function ExperienceCard({
  role,
  company,
  location,
  period,
  description,
  bullets = [],
}: {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <CardWrapper interactive={false} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
        <div>
          <h4 className="font-display text-base font-bold text-white">{role}</h4>
          <span className="text-xs text-accent-cyan font-mono tracking-wider">{company}</span>
          {location && <span className="text-[10px] text-text-muted block mt-0.5">{location}</span>}
        </div>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-text-secondary bg-white/[0.02] border border-border-subtle px-2.5 py-1 rounded-md max-w-max shrink-0">
          <Calendar className="h-3 w-3 text-accent-teal" />
          <span>{period}</span>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
      {bullets.length > 0 && (
        <ul className="space-y-2 pl-4 border-l border-border-standard">
          {bullets.map((b, idx) => (
            <li key={idx} className="text-xs text-text-secondary list-disc pl-1 leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}
    </CardWrapper>
  );
}
