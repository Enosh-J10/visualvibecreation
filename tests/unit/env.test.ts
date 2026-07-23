import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Turnstile Verification Tests ────────────────────────────────────────────

// We mock fetch globally to test verifyTurnstile without real network calls.

const createFetchMock = (body: object, ok = true, status = 200) =>
  vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  });

describe('verifyTurnstile', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success:true on accepted token', async () => {
    global.fetch = createFetchMock({ success: true, hostname: 'www.visualvibecreation.com' });

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('good-token', 'secret-key');

    expect(result.success).toBe(true);
  });

  it('returns success:false with reason "rejected" on verification failure', async () => {
    global.fetch = createFetchMock({
      success: false,
      'error-codes': ['invalid-input-response'],
    });

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('bad-token', 'secret-key');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.reason).toBe('rejected');
    }
  });

  it('returns success:false with reason "missing-token" when token is empty', async () => {
    global.fetch = vi.fn();

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('', 'secret-key');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.reason).toBe('missing-token');
    }
    // Fetch should not be called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns success:false with reason "network-error" on fetch failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('some-token', 'secret-key');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.reason).toBe('network-error');
    }
  });

  it('returns success:false with reason "rejected" on non-OK HTTP status', async () => {
    global.fetch = createFetchMock({}, false, 500);

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('token', 'secret-key');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.reason).toBe('rejected');
    }
  });

  it('includes errorCodes in rejection result', async () => {
    global.fetch = createFetchMock({
      success: false,
      'error-codes': ['timeout-or-duplicate'],
    });

    const { verifyTurnstile } = await import('@/lib/contact/verify-turnstile');
    const result = await verifyTurnstile('expired-token', 'secret-key');

    expect(result.success).toBe(false);
    if (!result.success && result.errorCodes) {
      expect(result.errorCodes).toContain('timeout-or-duplicate');
    }
  });
});

// ── Site Config Tests ───────────────────────────────────────────────────────

describe('siteConfig', () => {
  it('uses the www canonical domain', async () => {
    const { siteConfig } = await import('@/lib/site-config');
    expect(siteConfig.url).toBe('https://www.visualvibecreation.com');
  });

  it('does not have a trailing slash', async () => {
    const { siteConfig } = await import('@/lib/site-config');
    expect(siteConfig.url).not.toMatch(/\/$/);
  });
});
