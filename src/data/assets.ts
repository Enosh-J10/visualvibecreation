export interface AssetEntry {
  key: string;
  intendedPath: string;
  status: "available" | "missing";
  alt: string;
  aspectRatio: string;
  label: string;
  dimensions: string;
}

export const ASSET_REGISTRY: Record<string, AssetEntry> = {
  portrait: {
    key: "portrait",
    intendedPath: "/assets/images/enosh-portrait.jpg",
    status: "available",
    alt: "Enosh Jaques — Student Experience Award 2026, West Thames College",
    aspectRatio: "4:5",
    label: "Professional Portrait (Enosh Jaques)",
    dimensions: "800 x 1000 px · 4:5 Aspect"
  },
  fincalcMockup: {
    key: "fincalcMockup",
    intendedPath: "/assets/images/fincalc-phone.jpg",
    status: "available",
    alt: "FinCalc — Smart Finance, Smart Travel, Smarter You. Launch poster showing app screens and key features.",
    aspectRatio: "1:1",
    label: "FinCalc Launch Poster",
    dimensions: "1080 x 1080 px"
  },
  portfolioPoster: {
    key: "portfolioPoster",
    intendedPath: "/assets/images/portfolio-poster.jpg",
    status: "missing",
    alt: "Graphic Layout Poster showing visual event design and typography",
    aspectRatio: "16:9",
    label: "Graphic Layout Poster (Preview)",
    dimensions: "1200 x 675 px"
  },
  portfolioBranding: {
    key: "portfolioBranding",
    intendedPath: "/assets/images/portfolio-branding.jpg",
    status: "missing",
    alt: "Logo guidelines and monogram grid for visual brand identities",
    aspectRatio: "16:9",
    label: "EJ Monogram Branding (Preview)",
    dimensions: "1200 x 675 px"
  },
  goaLandscape: {
    key: "goaLandscape",
    intendedPath: "/assets/images/goa-landscape.jpg",
    status: "missing",
    alt: "Sunset silhouette photograph of quiet Orlim landscape in Goa",
    aspectRatio: "16:9",
    label: "Sunset at Orlim Landscape (Preview)",
    dimensions: "1200 x 675 px"
  }
};

// Debug diagnostics helper to report missing asset keys in development
export function checkAssetKey(key: string) {
  if (process.env.NODE_ENV !== "production") {
    if (!ASSET_REGISTRY[key]) {
      console.warn(`[Asset Diagnostics] Request for unregistered asset key: "${key}"`);
    }
  }
}
