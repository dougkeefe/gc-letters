/**
 * Jest setup file to suppress jsPDF canvas warnings in tests
 */

import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder polyfills for jsPDF 3.x
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// Suppress expected test errors and jsPDF warnings in jsdom
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';

  // Filter out expected errors that are tested intentionally
  const expectedErrors = [
    'Not implemented: HTMLCanvasElement.prototype.getContext', // jsPDF canvas warnings
    'Error downloading PDF', // Intentional test error
    'Failed to load image from', // Intentional test error
  ];

  if (expectedErrors.some((expected) => message.includes(expected))) {
    return;
  }

  originalConsoleError(...args);
};
