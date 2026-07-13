import { Sparkles, ArrowLeft } from "lucide-react";
import { MagneticWrapper } from "@/components/animations/MotionWrappers";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative overflow-hidden">
      {/* Decorative glows using design system cyan accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent-cyan/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-accent-cyan border border-border-standard">
          <Sparkles className="h-6 w-6" />
        </div>

        <h1 className="font-display mt-8 text-7xl font-extrabold tracking-wider text-white">
          404
        </h1>
        <p className="mt-2 text-xs font-mono uppercase tracking-widest text-accent-teal">
          Visual Coordinate Lost
        </p>

        <p className="mt-4 text-xs text-text-secondary leading-relaxed">
          The coordinates you requested do not exist or have been relocated inside the Visual Vibe network.
        </p>

        <div className="mt-10">
          <MagneticWrapper>
            <Button variant="primary" href="/">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Return to Studio</span>
            </Button>
          </MagneticWrapper>
        </div>
      </div>
    </main>
  );
}
