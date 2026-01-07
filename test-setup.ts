
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock ResizeObserver which is not present in JSDOM but used by Recharts
// Fix: Use globalThis instead of global to resolve the 'Cannot find name global' error in JSDOM
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock process.env for tests
vi.stubGlobal('process', {
  env: {
    API_KEY: 'test-api-key'
  }
});
