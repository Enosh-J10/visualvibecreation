'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error category only — never expose stack or message content
    console.error('[ErrorBoundary] Runtime error caught:', {
      digest: error.digest,
      name: error.name,
    });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border-standard bg-white/5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-accent-teal"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="font-display text-4xl font-extrabold tracking-wide text-white">
        Something went wrong
      </h1>

      <p className="mt-3 max-w-sm text-sm text-text-secondary">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-accent-teal/10 px-6 py-3 text-sm font-semibold text-accent-teal ring-1 ring-accent-teal/30 transition-colors hover:bg-accent-teal/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-xl border border-border-standard px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
