import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const metadata = {
  title: "Portfolio | Visual Vibe Creation",
  description: "Browse the design portfolios, android apps, game designs, and web development project files created by Enosh Jaques.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 w-full py-12">
      <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Visual Works
        </h1>
        <p className="mt-4 text-sm text-text-secondary leading-relaxed">
          Explore complete digital builds, mobile platforms, software code bases, and branding layouts.
        </p>
      </div>

      <ProjectsGrid />
    </main>
  );
}
