import 'server-only';
import { z } from 'zod';

const contactEnvSchema = z.object({
  resendApiKey: z.string().min(1, 'RESEND_API_KEY is required'),
  contactFromEmail: z.string().email('CONTACT_FROM_EMAIL must be a valid email'),
  contactToEmail: z.string().email('CONTACT_TO_EMAIL must be a valid email'),
  turnstileSecretKey: z.string().min(1, 'TURNSTILE_SECRET_KEY is required'),
});

export function getContactEnv() {
  const result = contactEnvSchema.safeParse({
    resendApiKey: process.env.RESEND_API_KEY,
    contactFromEmail: process.env.CONTACT_FROM_EMAIL,
    contactToEmail: process.env.CONTACT_TO_EMAIL,
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
  });

  if (!result.success) {
    console.error(
      '❌ Contact Server Env Validation Failure: Configuration is missing or invalid.',
      result.error.format(),
    );
    throw new Error('CONTACT_ENV_INVALID');
  }

  return result.data;
}
