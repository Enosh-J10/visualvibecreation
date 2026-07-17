/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export interface ScrollController {
  stop: () => void;
  start: () => void;
  scrollToTop: (immediate?: boolean) => void;
  scrollToHash: (hash: string) => void;
  isReady: boolean;
  isReducedMotion: boolean;
}

const ScrollContext = createContext<ScrollController>({
  stop: () => {},
  start: () => {},
  scrollToTop: () => {},
  scrollToHash: () => {},
  isReady: false,
  isReducedMotion: false,
});

export const useScrollController = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  // Monitor back/forward browser history transitions
  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initialize Lenis or fall back to native scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setIsReady(true);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setIsReady(false);
    };
  }, []);

  // Reset scroll coordinates upon client-side route transitions
  useEffect(() => {
    // Force Lenis to start/resume and recalculate size boundaries on route transition
    if (lenisRef.current) {
      lenisRef.current.start();
      
      // Avoid overriding scroll position on Back/Forward history navigation
      if (isPopStateRef.current) {
        isPopStateRef.current = false;
        requestAnimationFrame(() => {
          lenisRef.current?.resize();
        });
        return;
      }

      // Avoid scrolling to top if landing on a valid hash target
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          requestAnimationFrame(() => {
            lenisRef.current?.resize();
          });
          return;
        }
      }

      lenisRef.current.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
    } else {
      window.scrollTo(0, 0);
      if (isPopStateRef.current) {
        isPopStateRef.current = false;
      }
    }
  }, [pathname]);

  const controller = useMemo<ScrollController>(() => ({
    stop: () => {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    },
    start: () => {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    },
    scrollToTop: (immediate = true) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate });
      } else {
        window.scrollTo(0, 0);
      }
    },
    scrollToHash: (hash: string) => {
      const target = document.querySelector(hash);
      if (target) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target as HTMLElement, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    isReady,
    isReducedMotion,
  }), [isReady, isReducedMotion]);
  return (
    <ScrollContext.Provider value={controller}>
      {children}
    </ScrollContext.Provider>
  );
}
