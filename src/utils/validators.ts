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

export const validateUnitValue = (value: string, fieldName?: string): void => {
  const validUnits = ['mm', 'pt', 'in', 'px'];
  const hasValidUnit = validUnits.some((unit) => value.endsWith(unit));

  if (!hasValidUnit && isNaN(parseFloat(value))) {
    const field = fieldName ? `${fieldName}: ` : '';
    throw new Error(
      `Invalid unit value ${field}${value}. Must be a number followed by one of: ${validUnits.join(', ')}`
    );
  }

  // Validate the numeric value is positive
  const numericValue = parseFloat(value);
  if (numericValue < 0) {
    const field = fieldName ? `${fieldName} ` : '';
    throw new Error(`${field}value must be positive, got: ${value}`);
  }
};

export const validateMarginValues = (
  xMargin: string,
  yMargin: string
): void => {
  validateUnitValue(xMargin, 'xMargin');
  validateUnitValue(yMargin, 'yMargin');

  // Warn if margins are unusually large
  const xValue = parseFloat(xMargin);
  const yValue = parseFloat(yMargin);

  if (xValue > 100 || yValue > 100) {
    console.warn(
      `Large margin values detected (x: ${xMargin}, y: ${yMargin}). This may result in very limited content space.`
    );
  }
};

export const validateSpacingValues = (
  paragraphSpacing?: string,
  lineSpacing?: string
): void => {
  if (paragraphSpacing) {
    validateUnitValue(paragraphSpacing, 'paragraphSpacing');
  }
  if (lineSpacing) {
    validateUnitValue(lineSpacing, 'lineSpacing');
  }
};
