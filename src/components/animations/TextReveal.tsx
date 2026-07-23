/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function TextReveal({
  text,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bypass = !mounted || shouldReduceMotion;

  if (bypass) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: custom,
      },
    }),
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Tag className={`relative overflow-hidden py-1 ${className}`} ref={containerRef}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        custom={delay}
        className="inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="relative inline-block overflow-hidden mr-[0.25em] pb-1">
            <motion.span variants={wordVariants} className="inline-block">
              {word === '' ? '\u00A0' : word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
