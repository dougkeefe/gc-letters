/**
 * Validation utilities for component props and inputs
 */

export const validateFileName = (fileName: string): void => {
  if (!fileName || fileName.trim() === '') {
    throw new Error('fileName is required');
  }
};

export const validateDeptSignature = (deptSignature: string): void => {
  if (!deptSignature || deptSignature.trim() === '') {
    throw new Error('deptSignature is required');
  }
  // Basic URL validation
  try {
    new URL(deptSignature);
  } catch {
    // Could be a relative path or data URL, which are also valid
    if (
      !deptSignature.startsWith('/') &&
      !deptSignature.startsWith('./') &&
      !deptSignature.startsWith('data:')
    ) {
      console.warn(
        'deptSignature should be a valid URL, relative path, or data URL'
      );
    }
  }
};

export const validatePageNumberFormat = (format: string): void => {
  if (!format.includes('#')) {
    throw new Error(
      'pageNumberFormat must contain # as placeholder for page number'
    );
  }
};

export const validateNextPageFormat = (format: string): void => {
  if (!format.includes('#')) {
    throw new Error(
      'nextPageNumberFormat must contain # as placeholder for page number'
    );
  }
};

export const validateUnitValue = (value: string): void => {
  const validUnits = ['mm', 'pt', 'in', 'px'];
  const hasValidUnit = validUnits.some((unit) => value.endsWith(unit));

  if (!hasValidUnit && isNaN(parseFloat(value))) {
    throw new Error(
      `Invalid unit value: ${value}. Must be a number followed by one of: ${validUnits.join(', ')}`
    );
  }
};
