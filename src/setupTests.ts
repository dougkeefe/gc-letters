/**
 * Jest setup file to suppress jsPDF canvas warnings in tests
 */

import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder polyfills for jsPDF 3.x
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// Suppress HTMLCanvasElement.getContext errors from jsPDF in jsdom
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  // Filter out jsPDF canvas warnings
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Not implemented: HTMLCanvasElement.prototype.getContext')
  ) {
    return;
  }
  originalConsoleError(...args);
};
