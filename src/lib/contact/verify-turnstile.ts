import 'server-only';
import { logger } from '../logger';

export type TurnstileVerificationResult =
  | { success: true; hostname?: string }
  | {
      success: false;
      reason: 'missing-token' | 'rejected' | 'network-error';
      errorCodes?: string[];
    };

export async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteIp?: string,
): Promise<TurnstileVerificationResult> {
  if (!token) {
    logger.warn('Turnstile verification skipped: Missing token.');
    return { success: false, reason: 'missing-token' };
  }

  const turnstileUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    body.append('remoteip', remoteIp);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(turnstileUrl, {
      method: 'POST',
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      logger.error('Turnstile server returned non-OK status', { status: response.status });
      return { success: false, reason: 'rejected' };
    }

    const result = await response.json();

    logger.debug('Turnstile verification response details', {
      success: result.success,
      errorCodes: result['error-codes'],
    });

    if (result.success) {
      return { success: true, hostname: result.hostname };
    }

    return {
      success: false,
      reason: 'rejected',
      errorCodes: result['error-codes'],
    };
  } catch (error: unknown) {
    const isAbort = error instanceof Error && error.name === 'AbortError';
    if (isAbort) {
      logger.error('Turnstile verification timed out after 8000ms.');
    } else {
      logger.error('Turnstile verification connection failed.', error);
    }
    return { success: false, reason: 'network-error' };
  } finally {
    clearTimeout(timeout);
  }
}
