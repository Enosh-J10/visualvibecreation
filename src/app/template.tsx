"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  // If prefers-reduced-motion is active, disable translation offset
  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: shouldReduceMotion ? 0.15 : 0.4,
      }}
    >
      {children}
    </motion.div>
  );
}
