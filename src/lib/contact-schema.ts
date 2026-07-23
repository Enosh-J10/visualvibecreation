import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be 80 characters or less'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(254, 'Email must be 254 characters or less')
    .transform((val) => val.toLowerCase()),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(3000, 'Message must be 3000 characters or less'),
  turnstileToken: z.string().min(1, 'Verification is required'),
  companyWebsite: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
