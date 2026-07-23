import { Container } from '@/components/ui/Sections';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const metadata = {
  title: 'Portfolio | Visual Vibe Creation',
  description:
    'Browse the design portfolios, android apps, game designs, and web development project files created by Enosh Jaques.',
};

export default function PortfolioPage() {
  return (
    <main className="flex-grow w-full py-12">
      <Container variant="standard" className="text-center mb-16 pt-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Visual Works
        </h1>
        <p className="mt-4 text-xs text-text-secondary leading-relaxed max-w-xl mx-auto">
          Explore complete digital builds, mobile platforms, software code bases, and branding
          layouts.
        </p>
      </Container>

      <ProjectsGrid />
    </main>
  );
}
