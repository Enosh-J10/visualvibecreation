/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Hook to track if the client component has completed hydration mounting
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// 1. Fade Up
export function FadeUp({ children, className = "", delay = 0 }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  // Progressive enhancement: render static content if JS fails or not mounted
  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.6,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Fade In
export function FadeIn({ children, className = "", delay = 0 }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        ease: "linear",
        duration: 0.4,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Blur Reveal
export function BlurReveal({ children, className = "", delay = 0 }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        ease: [0.16, 1, 0.3, 1],
        duration: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Scale Reveal
export function ScaleReveal({ children, className = "", delay = 0 }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        ease: [0.16, 1, 0.3, 1],
        duration: 0.6,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Stagger Container
export function StaggerContainer({ children, className = "", delay = 0 }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5%" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Floating Element (subtle loops, bypassed on reduced motion)
export function FloatingElement({ children, className = "" }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 7. Mouse Tilt (3D tilt on mouse hover, bypassed on touch & reduced motion)
export function MouseTilt({ children, className = "" }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mounted) {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }
  }, [mounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted || shouldReduceMotion || isTouch || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setCoords({ x, y });
  };

  const bypass = !mounted || shouldReduceMotion || isTouch;

  if (bypass) {
    return <div className={className}>{children}</div>;
  }

  const rotateX = hovering ? -coords.y * 8 : 0;
  const rotateY = hovering ? coords.x * 8 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setCoords({ x: 0, y: 0 });
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`perspective-[800px] cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 8. Magnetic Wrapper (bypassed on touch & reduced motion)
export function MagneticWrapper({ children, className = "" }: WrapperProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Springs for smooth movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (mounted) {
      setIsTouch(window.matchMedia("(hover: none)").matches);
    }
  }, [mounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted || shouldReduceMotion || isTouch || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (left + width / 2);
    const mouseY = e.clientY - (top + height / 2);
    
    // Attract up to 15px max
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const bypass = !mounted || shouldReduceMotion || isTouch;

  if (bypass) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
