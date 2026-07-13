"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ---------------------------------------------------------------------------
// SSR-safe hydration rule:
//   Always render the SAME element type on server and client.
//   motion.div serialises to a plain <div> on the server, so using it
//   unconditionally avoids className / attribute mismatches during rehydration.
//
//   Reduced-motion: skip the animated variants; use the final resting values
//   as both `initial` and `animate` so no visual jump occurs.
//
//   Touch / mount detection: guard imperative DOM access with useEffect;
//   never change the *type* of element rendered based on mounted state.
// ---------------------------------------------------------------------------

// 1. Fade Up
export function FadeUp({ children, className = "", delay = 0 }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ease: [0.16, 1, 0.3, 1], duration: 0.6, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Fade In
export function FadeIn({ children, className = "", delay = 0 }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ease: "linear", duration: 0.4, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Blur Reveal
export function BlurReveal({
  children,
  className = "",
  delay = 0,
}: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ease: [0.16, 1, 0.3, 1], duration: 0.8, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Scale Reveal
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.96 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ease: [0.16, 1, 0.3, 1], duration: 0.6, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Stagger Container
export function StaggerContainer({
  children,
  className = "",
  delay = 0,
}: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
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

// 6. Floating Element (subtle loop; skipped entirely on reduced motion)
export function FloatingElement({ children, className = "" }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 7. Mouse Tilt (3D tilt on hover; no DOM tree switch on mount)
export function MouseTilt({ children, className = "" }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  // useRef: only accessed inside event handlers (not during render).
  const isTouchRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchRef.current || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setCoords({ x, y });
  };

  // hovering can only be true when onMouseEnter fires without isTouchRef.current,
  // so a touch guard here is redundant and would violate react-hooks/refs.
  const rotateX = hovering && !shouldReduceMotion ? -coords.y * 8 : 0;
  const rotateY = hovering && !shouldReduceMotion ? coords.x * 8 : 0;

  // Always render motion.div — same tag on server and client.
  // On touch / reduced-motion the animate values are 0 so nothing moves.
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { if (!isTouchRef.current) setHovering(true); }}
      onMouseLeave={() => {
        setHovering(false);
        setCoords({ x: 0, y: 0 });
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`perspective-[800px] ${shouldReduceMotion ? "" : "cursor-pointer"} ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}

// 8. Magnetic Wrapper (bypassed on touch & reduced motion)
export function MagneticWrapper({ children, className = "" }: WrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // useRef avoids re-render and the set-state-in-effect lint rule.
  const isTouchRef = useRef(false);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(hover: none)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchRef.current || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (left + width / 2);
    const mouseY = e.clientY - (top + height / 2);
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Always render motion.div — same tag on server and client.
  // Spring values stay at 0 when touch/reduced-motion so nothing moves.
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
