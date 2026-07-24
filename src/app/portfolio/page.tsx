import { Container } from '@/components/ui/Sections';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Portfolio',
    description:
      'Browse the design portfolios, android apps, game designs, and web development project files created by Enosh Jaques.',
    path: '/portfolio',
  });
}

export default function PortfolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteConfig.url}/portfolio/#webpage`,
        url: `${siteConfig.url}/portfolio`,
        name: 'Visual Works & Project Portfolio — Enosh Jaques',
        description:
          'Collection of web applications, mobile platforms, software code bases, and branding layouts.',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteConfig.url}/portfolio/#fincalc`,
        name: 'FinCalc',
        operatingSystem: 'Android, Web',
        applicationCategory: 'FinanceApplication',
        description:
          'Financial calculator application providing loan, mortgage, and investment projections.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        author: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/portfolio/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Portfolio',
            item: `${siteConfig.url}/portfolio`,
          },
        ],
      },
    ],
  };

  return (
    <main className="flex-grow w-full py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
