import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent-purple/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-accent-purple border border-white/[0.05]">
          <Sparkles className="h-6 w-6" />
        </div>

        <h1 className="font-display mt-8 text-7xl font-extrabold tracking-wider text-white">
          404
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-accent-blue">
          Visual Coordinate Lost
        </p>

        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          The coordinates you requested do not exist or have been relocated inside the Visual Vibe network.
        </p>

        <MagneticButton className="mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-accent-purple hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Return to Studio</span>
          </Link>
        </MagneticButton>
      </div>
    </main>
  );
}
