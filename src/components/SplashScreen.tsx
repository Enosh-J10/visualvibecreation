'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'black' | 'ambient' | 'logo' | 'sweep' | 'hold' | 'exit';

interface SplashScreenProps {
  onComplete: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  // Stable ref so timers always call the latest onComplete without being deps
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const [phase, setPhase] = useState<Phase>('black');
  const [sweepActive, setSweepActive] = useState(false);

  // Exit-target: pixel offset from viewport center → navbar logo center
  const [exitOffset, setExitOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // ── Animation schedule (absolute ms from mount) ──────────────────────────
    // 0        black silence
    // 200      ambient glow fades in
    // 500      logo fades in
    // 1100     metallic sweep fires
    // 1350     sweep done → hold
    // 2050     exit: compute exit offset + start phase (setState in callback ✓)
    // 2950     onComplete()

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    if (shouldReduceMotion) {
      // Reduced motion: show logo via timer callback (satisfies lint rule), fade quickly, done
      at(0, () => setPhase('logo'));
      at(900, () => onCompleteRef.current());
    } else {
      at(200, () => setPhase('ambient'));
      at(500, () => setPhase('logo'));
      at(1100, () => {
        setPhase('sweep');
        setSweepActive(true);
      });
      at(1350, () => {
        setPhase('hold');
        setSweepActive(false);
      });
      at(2050, () => {
        // Compute exit offset inside the timer callback — satisfies lint rule.
        // React 18 batches both setState calls into a single re-render.
        const hPad = window.innerWidth >= 768 ? 48 : 24;
        setExitOffset({
          x: hPad + 18 - window.innerWidth / 2,
          y: 34 - window.innerHeight / 2,
        });
        setPhase('exit');
      });
      at(2950, () => onCompleteRef.current());
    }

    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]); // only depends on reduced-motion pref

  // ── Derived state ─────────────────────────────────────────────────────────
  const logoVisible = !['black', 'ambient'].includes(phase);
  const ambientVisible = phase !== 'black';
  const isExiting = phase === 'exit';

  // ── Easing ───────────────────────────────────────────────────────────────
  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
      // Full overlay fades out during exit phase
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={isExiting ? { duration: 0.9, ease: smoothEase } : { duration: 0 }}
    >
      {/* ── Premium paper texture ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          opacity: 0.55,
        }}
      />

      {/* ── Vignette ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ── Ambient focus light ───────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 68%)',
          filter: 'blur(56px)',
        }}
        animate={{ opacity: ambientVisible ? 1 : 0, scale: ambientVisible ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* ── Logo + sweep ─────────────────────────────────────────────────── */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{
          opacity: logoVisible ? 1 : 0,
          // Exit: scale to navbar-logo size and fly to its position
          scale: isExiting && !shouldReduceMotion ? 0.145 : 1,
          x: isExiting && !shouldReduceMotion ? exitOffset.x : 0,
          y: isExiting && !shouldReduceMotion ? exitOffset.y : 0,
        }}
        transition={
          isExiting ? { duration: 0.85, ease: smoothEase } : { duration: 0.6, ease: smoothEase }
        }
      >
        {/*
          240 × 240 px circular clip.
          The logo image is used EXACTLY as designed — no redraws, no path
          modifications, no colour changes.
        */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/ej-logo.jpg"
            alt="Enosh Jaques — EJ personal brand monogram"
            width={240}
            height={240}
            style={
              {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                draggable: 'false',
              } as React.CSSProperties
            }
            draggable={false}
          />

          {/*
            Metallic light sweep — mounts when sweepActive is true,
            animates across the logo once, then unmounts.
            Confined to the circular clip of the parent.
          */}
          {sweepActive && !shouldReduceMotion && (
            <motion.div
              key="metallic-sweep"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '55%',
                background:
                  'linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.04) 28%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.04) 72%, transparent 100%)',
                filter: 'blur(3px)',
                willChange: 'transform',
              }}
              initial={{ x: '-130%' }}
              animate={{ x: '290%' }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
