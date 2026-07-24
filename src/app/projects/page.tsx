import { Container } from '@/components/ui/Sections';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projects',
  description:
    "Detailed projects content is being prepared. The verified overview of Enosh Jaques' projects is available on the homepage.",
  path: '/projects',
  noIndex: true,
});

export default function ProjectsPage() {
  return (
    <main className="flex-grow flex flex-col justify-center py-20 px-6">
      <Container variant="reading" className="text-center space-y-6">
        <h1 className="font-display text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="text-xs text-text-secondary leading-relaxed">
          Detailed projects content is being prepared. The verified overview is currently available
          on the homepage.
        </p>
        <div className="pt-4 flex justify-center">
          <Button variant="primary" href="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Studio</span>
          </Button>
        </div>
      </Container>
    </main>
  );
}
