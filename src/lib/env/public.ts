import { z } from 'zod';

const canonicalUrl = 'https://www.visualvibecreation.com';

const publicEnvSchema = z.object({
  siteUrl: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid absolute URL')
    .transform((val) => {
      return val.endsWith('/') ? val.slice(0, -1) : val;
    }),
  turnstileSiteKey: z.string().min(1, 'NEXT_PUBLIC_TURNSTILE_SITE_KEY is required'),
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || canonicalUrl;
const rawTurnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// In local Vitest or CI testing execution, allow fallback to Cloudflare's official mock test site key if omitted.
const isTestOrCI = process.env.NODE_ENV === 'test' || process.env.CI === 'true';
const resolvedTurnstileKey =
  rawTurnstileSiteKey || (isTestOrCI ? '1x00000000000000000000AA' : undefined);

const parsed = publicEnvSchema.safeParse({
  siteUrl: rawSiteUrl,
  turnstileSiteKey: resolvedTurnstileKey,
});

if (!parsed.success) {
  const errorMsg = `❌ Public Env Validation Error: ${JSON.stringify(parsed.error.format())}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

export const publicEnv = parsed.data;
