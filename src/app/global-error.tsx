'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Global error boundary - replaces the root layout on catastrophic failure.
 * Must define its own <html> and <body> since layout.tsx is unavailable.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Root layout error caught:', {
      digest: error.digest,
      name: error.name,
    });
  }, [error]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong — Visual Vibe Creation</title>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          body{background:#0d0e12;color:#f3f4f6;font-family:system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:1.5rem;text-align:center}
          h1{font-size:2rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:0.75rem}
          p{color:#9ca3af;font-size:0.9rem;max-width:26rem;line-height:1.6}
          .actions{margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
          button,a{border-radius:0.75rem;padding:0.75rem 1.5rem;font-size:0.875rem;font-weight:600;cursor:pointer;text-decoration:none;transition:opacity 0.15s}
          button{background:rgba(45,212,191,0.1);color:#2dd4bf;border:1px solid rgba(45,212,191,0.3)}
          button:hover{opacity:0.85}
          a{border:1px solid rgba(255,255,255,0.1);color:#9ca3af}
          a:hover{color:#f3f4f6}
          @media(prefers-reduced-motion:reduce){button,a{transition:none}}
        `}</style>
      </head>
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>Please try loading the site again. If the problem persists, return to the homepage.</p>
          <div className="actions">
            <button type="button" onClick={reset}>
              Try again
            </button>
            <Link href="/">Return home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
