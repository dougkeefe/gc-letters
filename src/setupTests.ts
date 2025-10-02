/**
 * Jest setup file to suppress jsPDF canvas warnings in tests
 */

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
