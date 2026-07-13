# Asset Manifest

This document records all digital assets needed for the Visual Vibe Creation studio portfolio. All assets correspond to the typed registry declared in `src/data/assets.ts`.

---

## Required Visual Assets

| Asset Key | File Name / Path | Purpose | Required Dimensions | Aspect Ratio | Status |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `portrait` | `enosh-portrait.jpg` | Professional Portrait (Hero & About) | 800 x 1000 px | 4:5 | **Missing** |
| `fincalcMockup` | `fincalc-phone.jpg` | FinCalc Case Study Mockup Graphic | 1080 x 2400 px | 9:19.5 | **Missing** |
| `portfolioPoster` | `portfolio-poster.jpg` | Graphic Layout Poster Showcase Card | 1200 x 675 px | 16:9 | **Missing** |
| `portfolioBranding` | `portfolio-branding.jpg` | EJ Monogram Branding Guidelines Card | 1200 x 675 px | 16:9 | **Missing** |
| `goaLandscape` | `goa-landscape.jpg` | Sunset Landscape Photograph (Orlim, Goa) | 1200 x 675 px | 16:9 | **Missing** |

---

## Asset Status Management Rules

1. **Production Safety**: Standard `Image` fetches must never request a path marked as **Missing**.
2. **Layout Shifts**: Components wrapping visual assets must retain the intended aspect ratio container wrapper (e.g. `aspect-[16/9]`, `aspect-[4/5]`) to prevent rendering layout shifts during placeholder swapping.
3. **Asset Insertion**: To replace a placeholder:
   * Place the file in `/public/assets/images/[path]`.
   * Update the file status key in `src/data/assets.ts` from `"missing"` to `"available"`.
