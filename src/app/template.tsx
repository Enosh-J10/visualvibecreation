/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const bypass = !mounted || shouldReduceMotion;

  if (bypass) {
    return <>{children}</>;
  }

  const variants = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.4,
      }}
    >
      {children}
    </motion.div>
  );
}
