/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Configure hardware-accelerated spring configurations
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const bypass = !mounted || shouldReduceMotion;

  if (bypass) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent-cyan origin-left z-[99] shadow-[0_1px_8px_rgba(165,243,252,0.22)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
