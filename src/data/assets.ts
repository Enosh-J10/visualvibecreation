export interface AssetEntry {
  key: string;
  intendedPath: string;
  status: 'available' | 'missing';
  alt: string;
  aspectRatio: string;
  label: string;
  dimensions: string;
}

export const ASSET_REGISTRY: Record<string, AssetEntry> = {
  portrait: {
    key: 'portrait',
    intendedPath: '/assets/images/enosh-portrait.jpg',
    status: 'available',
    alt: 'Enosh Jaques — Student Experience Award 2026, West Thames College',
    aspectRatio: '4:5',
    label: 'Professional Portrait (Enosh Jaques)',
    dimensions: '800 x 1000 px · 4:5 Aspect',
  },
  fincalcMockup: {
    key: 'fincalcMockup',
    intendedPath: '/assets/images/fincalc-phone.jpg',
    status: 'available',
    alt: 'FinCalc — Smart Finance, Smart Travel, Smarter You. Launch poster showing app screens and key features.',
    aspectRatio: '1:1',
    label: 'FinCalc Launch Poster',
    dimensions: '1080 x 1080 px',
  },
  portfolioPoster: {
    key: 'portfolioPoster',
    intendedPath: '/assets/images/portfolio-poster-v3.png',
    status: 'available',
    alt: "Graphic Layout Poster showing visual event design and typography 'Design that Connects'",
    aspectRatio: '3:4',
    label: 'Graphic Layout Poster',
    dimensions: '639 x 744 px',
  },
  portfolioBranding: {
    key: 'portfolioBranding',
    intendedPath: '/assets/images/portfolio-branding-v3.png',
    status: 'available',
    alt: 'Logo guidelines and monogram grid for EJ Brand Identity',
    aspectRatio: '16:9',
    label: 'EJ Monogram Branding',
    dimensions: '568 x 318 px',
  },
  goaLandscape: {
    key: 'goaLandscape',
    intendedPath: '/assets/images/goa-landscape-v3.png',
    status: 'available',
    alt: 'Sunset silhouette photograph with palm trees and boats',
    aspectRatio: '2:1',
    label: 'Sunset Silhouette',
    dimensions: '583 x 301 px',
  },
};

// Debug diagnostics helper to report missing asset keys in development
export function checkAssetKey(key: string) {
  if (process.env.NODE_ENV !== 'production') {
    if (!ASSET_REGISTRY[key]) {
      console.warn(`[Asset Diagnostics] Request for unregistered asset key: "${key}"`);
    }
  }
}
