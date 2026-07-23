const isDev = process.env.NODE_ENV === 'development';

function sanitize(val: unknown): unknown {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    // Redact Turnstile tokens
    if (val.startsWith('0x') && val.length > 20) return '[REDACTED_TURNSTILE_TOKEN]';
    // Redact Resend keys
    if (val.startsWith('re_') && val.length > 15) return '[REDACTED_RESEND_KEY]';
    // Redact emails
    if (val.includes('@') && val.includes('.')) {
      return val.replace(/(.{2})(.*)(@.*)/, '$1***$3');
    }
    return val;
  }
  if (val instanceof Error) {
    return {
      message: val.message,
      name: val.name,
      stack: isDev ? val.stack : undefined,
    };
  }
  if (Array.isArray(val)) {
    return val.map(sanitize);
  }
  if (typeof val === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    const obj = val as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('token') ||
        lowerKey.includes('secret') ||
        lowerKey.includes('key') ||
        lowerKey.includes('password') ||
        lowerKey.includes('message') ||
        lowerKey.includes('email')
      ) {
        sanitizedObj[key] = '[REDACTED]';
      } else {
        sanitizedObj[key] = sanitize(obj[key]);
      }
    }
    return sanitizedObj;
  }
  return val;
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (isDev) {
      console.log('[DEBUG]', ...args.map(sanitize));
    }
  },
  info: (...args: unknown[]) => {
    console.log('[INFO]', ...args.map(sanitize));
  },
  warn: (...args: unknown[]) => {
    console.warn('[WARN]', ...args.map(sanitize));
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args.map(sanitize));
  },
};
