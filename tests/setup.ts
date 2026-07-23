// Global test setup — runs before each test file
import { vi } from 'vitest';

// Suppress console.error noise in tests unless explicitly needed
// Individual tests can spy on console methods directly
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
