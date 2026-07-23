import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';
import { renderContactEmailHtml } from '@/components/email/ContactEmail';

// ── Contact Schema Tests ────────────────────────────────────────────────────

describe('contactSchema', () => {
  it('accepts a valid complete submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token-abc',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.format();
      expect(fields.name?._errors?.length).toBeGreaterThan(0);
    }
  });

  it('rejects a name that is too short (single character)', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a name that exceeds 80 characters', () => {
    const result = contactSchema.safeParse({
      name: 'A'.repeat(81),
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().name?._errors?.[0]).toContain('80');
    }
  });

  it('rejects an invalid email address', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'not-an-email',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors?.length).toBeGreaterThan(0);
    }
  });

  it('normalises email to lowercase', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'Jane.SMITH@Example.COM',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('jane.smith@example.com');
    }
  });

  it('rejects a message shorter than 20 characters', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Too short',
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().message?._errors?.[0]).toContain('20');
    }
  });

  it('rejects a message exceeding 3000 characters', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'A'.repeat(3001),
      turnstileToken: 'valid-token',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().message?._errors?.[0]).toContain('3000');
    }
  });

  it('rejects a missing turnstileToken', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: '',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional companyWebsite field (honeypot)', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'This is a test message that meets the minimum length requirement.',
      turnstileToken: 'valid-token',
      companyWebsite: 'https://spam.example.com',
    });
    // Schema itself accepts it; honeypot logic is applied at the route level
    expect(result.success).toBe(true);
  });
});

// ── HTML Escaping Tests ─────────────────────────────────────────────────────

describe('renderContactEmailHtml', () => {
  it('escapes HTML special characters in name field', () => {
    const html = renderContactEmailHtml({
      name: '<script>alert("xss")</script>',
      email: 'test@example.com',
      message: 'Hello',
      timestamp: new Date().toUTCString(),
    });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('escapes ampersands and quotes in email field', () => {
    const html = renderContactEmailHtml({
      name: 'Test User',
      email: 'test&user@example.com',
      message: 'Hello',
      timestamp: new Date().toUTCString(),
    });
    expect(html).toContain('&amp;');
  });

  it('converts newlines in message to line breaks', () => {
    const html = renderContactEmailHtml({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Line one\nLine two',
      timestamp: new Date().toUTCString(),
    });
    expect(html).toContain('<br />');
  });

  it('includes the sender name in output', () => {
    const html = renderContactEmailHtml({
      name: 'Enosh Jaques',
      email: 'enosh@example.com',
      message: 'Test message',
      timestamp: '2025-01-01T00:00:00Z',
    });
    expect(html).toContain('Enosh Jaques');
  });
});
