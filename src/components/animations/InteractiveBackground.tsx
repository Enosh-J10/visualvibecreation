/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

export default function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const prefersReducedMotion = useReducedMotion();

  // Mouse coordinates (default to neutral window center initially)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Springs for pointer glow tracking
  const mouseXSpring = useSpring(cursorX, { stiffness: 45, damping: 22, mass: 0.8 });
  const mouseYSpring = useSpring(cursorY, { stiffness: 45, damping: 22, mass: 0.8 });

  // Teal secondary glow with slightly slower spring to create lag
  const tealXSpring = useSpring(cursorX, { stiffness: 30, damping: 20, mass: 1.0 });
  const tealYSpring = useSpring(cursorY, { stiffness: 30, damping: 20, mass: 1.0 });

  // Scroll Progress and transform values for Top and Bottom Ambient Orbs
  const { scrollYProgress } = useScroll();
  // Animate transform only
  const topOrbY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bottomOrbY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    setMounted(true);

    // Initial center position
    cursorX.set(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    cursorY.set(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

    // Conditions: fine pointer (mouse/trackpad), width >= 1024px, no reduced-motion
    const checkInteractivity = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isWideViewport = window.innerWidth >= 1024;
      const hasNoReducedMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsInteractive(isFinePointer && isWideViewport && hasNoReducedMotion);
    };

    checkInteractivity();

    const handleResize = () => {
      checkInteractivity();
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handlePointerLeave = () => {
      // Smoothly return cursor values to viewport center
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);

    // Section Awareness with IntersectionObserver
    const sections = [
      'hero',
      'focus',
      'fincalc',
      'journey',
      'visual-vibe',
      'experience',
      'education',
      'awards',
      'contact',
    ];
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Motion template for highlighted grid mask around cursor glow
  const highlightedGridMask = useMotionTemplate`radial-gradient(circle 400px at ${mouseXSpring}px ${mouseYSpring}px, black 0%, rgba(0,0,0,0.25) 50%, transparent 100%)`;

  // Reusable Section-Aware Glow variables (optimized with solid colors and clear opacities)
  const sectionGlowConfig = {
    hero: { left: '25%', top: '25%', scale: 1.2, opacity: 0.08, bg: 'rgb(165, 243, 252)' },
    focus: { left: '50%', top: '35%', scale: 0.8, opacity: 0.04, bg: 'rgb(165, 243, 252)' },
    fincalc: { left: '30%', top: '50%', scale: 1.4, opacity: 0.09, bg: 'rgb(13, 148, 136)' },
    journey: { left: '35%', top: '65%', scale: 1.3, opacity: 0.07, bg: 'rgb(165, 243, 252)' },
    'visual-vibe': { left: '70%', top: '75%', scale: 1.1, opacity: 0.07, bg: 'rgb(165, 243, 252)' },
    experience: { left: '25%', top: '72%', scale: 1.3, opacity: 0.08, bg: 'rgb(165, 243, 252)' },
    education: { left: '65%', top: '80%', scale: 1.2, opacity: 0.07, bg: 'rgb(13, 148, 136)' },
    awards: { left: '40%', top: '86%', scale: 1.4, opacity: 0.08, bg: 'rgb(165, 243, 252)' },
    contact: { left: '50%', top: '92%', scale: 1.5, opacity: 0.11, bg: 'rgb(13, 148, 136)' },
  }[activeSection] || {
    left: '50%',
    top: '50%',
    scale: 1.0,
    opacity: 0.07,
    bg: 'rgb(165, 243, 252)',
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#070708]"
    >
      {/* 1. Static faint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Cursor-highlighted grid mask (always present, but opacity drops if not interactive/mounted) */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          WebkitMaskImage: highlightedGridMask,
          maskImage: highlightedGridMask,
          opacity: mounted && isInteractive ? 0.06 : 0,
        }}
      />

      {/* 3. Main cyan cursor glow */}
      <motion.div
        className="absolute rounded-full bg-accent-cyan blur-[140px] transition-opacity duration-700 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          x: useTransform(mouseXSpring, (x) => x - 300),
          y: useTransform(mouseYSpring, (y) => y - 300),
          opacity: mounted && isInteractive ? 0.08 : 0,
        }}
      />

      {/* 4. Delayed teal cursor glow */}
      <motion.div
        className="absolute rounded-full bg-accent-teal blur-[110px] transition-opacity duration-700 pointer-events-none"
        style={{
          width: 450,
          height: 450,
          x: useTransform(tealXSpring, (x) => x - 225),
          y: useTransform(tealYSpring, (y) => y - 225),
          opacity: mounted && isInteractive ? 0.12 : 0,
        }}
      />

      {/* 5. Top ambient orb */}
      <motion.div
        className="absolute top-[-10%] left-[10%] rounded-full bg-accent-cyan blur-[160px] w-[600px] h-[600px]"
        style={{
          y: mounted && !prefersReducedMotion ? topOrbY : 0,
          opacity: 0.03,
        }}
      />

      {/* 6. Bottom ambient orb */}
      <motion.div
        className="absolute bottom-[-10%] right-[10%] rounded-full bg-accent-teal blur-[180px] w-[700px] h-[700px]"
        style={{
          y: mounted && !prefersReducedMotion ? bottomOrbY : 0,
          opacity: 0.04,
        }}
      />

      {/* 7. One reusable section-aware localized glow */}
      <motion.div
        className="absolute rounded-full blur-[140px] w-[500px] h-[500px]"
        animate={{
          left: sectionGlowConfig.left,
          top: sectionGlowConfig.top,
          scale: sectionGlowConfig.scale,
          opacity: mounted ? sectionGlowConfig.opacity : 0.04,
          backgroundColor: sectionGlowConfig.bg,
        }}
        transition={
          mounted && !prefersReducedMotion
            ? { type: 'spring', stiffness: 35, damping: 20, mass: 1 }
            : { duration: 0 }
        }
        style={{
          x: '-50%',
          y: '-50%',
        }}
      />
    </div>
  );
}
