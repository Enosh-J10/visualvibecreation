"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setHasHover(window.matchMedia("(hover: hover)").matches);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || !hasHover || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 150px because the glow container is 300x300
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, mounted, hasHover, shouldReduceMotion]);

  if (!mounted || !hasHover || shouldReduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden h-[300px] w-[300px] rounded-full bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 blur-[80px] md:block"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
}
