import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/animations/SmoothScroll';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SplashWrapper from '@/components/SplashWrapper';
import InteractiveBackground from '@/components/animations/InteractiveBackground';
import { siteConfig } from '@/lib/site-config';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  publisher: siteConfig.name,
  generator: 'Next.js 16',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Visual Vibe Creation',
    'Enosh Jaques',
    'Software Developer UK',
    'Creative Digital Studio',
    'UI UX Design',
    'Web Development Portfolio',
    'Android App Development',
    'Game Developer Goa',
    'Motion Graphics UK',
  ],
  authors: [{ name: siteConfig.founder, url: siteConfig.links.github }],
  creator: siteConfig.founder,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: 'Software engineering and design portfolio by Enosh Jaques.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.founder}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: 'Software engineering and design portfolio by Enosh Jaques.',
    images: [siteConfig.ogImage],
    creator: '@EnoshJaques',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/assets/images/ej-logo.jpg',
    apple: '/assets/images/ej-logo.jpg',
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: {
        'msvalidate.01': [process.env.BING_SITE_VERIFICATION],
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  description: siteConfig.description,
                  publisher: {
                    '@id': `${siteConfig.url}/#studio`,
                  },
                },
                {
                  '@type': 'Person',
                  '@id': `${siteConfig.url}/#person`,
                  name: siteConfig.founder,
                  jobTitle: siteConfig.jobTitle,
                  url: siteConfig.url,
                  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': `${siteConfig.url}/#studio`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                  description: siteConfig.description,
                  founder: {
                    '@id': `${siteConfig.url}/#person`,
                  },
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'United Kingdom',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: siteConfig.links.email,
                    contactType: 'customer support',
                  },
                },
                {
                  '@type': 'ProfilePage',
                  '@id': `${siteConfig.url}/#profile`,
                  url: siteConfig.url,
                  name: `${siteConfig.founder} — ${siteConfig.name}`,
                  mainEntity: {
                    '@id': `${siteConfig.url}/#person`,
                  },
                },
              ],
            }),
          }}
        />
        <SplashWrapper>
          <SmoothScroll>
            <InteractiveBackground />
            <ScrollProgress />
            <Header />
            <div className="relative z-10 flex flex-col min-h-screen pt-[var(--header-height,68px)]">
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </SplashWrapper>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
