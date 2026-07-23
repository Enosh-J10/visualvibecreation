'use client';

import { useCallback, useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

/**
 * SplashWrapper
 *
 * Shows the splash screen on every full page load / hard refresh.
 * It will NOT replay on client-side route changes because Next.js keeps
 * the root layout mounted — `showSplash` stays false after completion
 * for the lifetime of the current page session.
 *
 * No sessionStorage required: a fresh browser load always starts with
 * useState(false) → useEffect fires → splash plays → done.
 */
export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Lock scroll immediately (DOM side-effect — allowed in effect body)
    document.body.style.overflow = 'hidden';
    // setState in a timer callback — satisfies react-hooks/set-state-in-effect
    const t = setTimeout(() => setShowSplash(true), 0);
    return () => clearTimeout(t);
  }, []);

  const handleComplete = useCallback(() => {
    document.body.style.overflow = '';
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      {children}
    </>
  );
}
