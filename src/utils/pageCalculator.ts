/**
 * Utility functions for calculating page breaks and content positioning
 */

export const convertToMm = (value: string): number => {
  if (value.endsWith('mm')) {
    return parseFloat(value);
  }
  if (value.endsWith('pt')) {
    // 1 pt = 0.3528 mm
    return parseFloat(value) * 0.3528;
  }
  if (value.endsWith('in')) {
    // 1 in = 25.4 mm
    return parseFloat(value) * 25.4;
  }
  if (value.endsWith('px')) {
    // 1 px = 0.2645833 mm (at 96 DPI)
    return parseFloat(value) * 0.2645833;
  }
  // Assume mm if no unit specified
  return parseFloat(value);
};

export const convertPtToMm = (pt: number): number => {
  return pt * 0.3528;
};

export const convertMmToPt = (mm: number): number => {
  return mm / 0.3528;
};

export const calculateAvailableHeight = (
  pageHeight: number,
  topMargin: number,
  bottomMargin: number
): number => {
  return pageHeight - topMargin - bottomMargin;
};

export const calculateAvailableWidth = (
  pageWidth: number,
  leftMargin: number,
  rightMargin: number
): number => {
  return pageWidth - leftMargin - rightMargin;
};

export const shouldBreakPage = (
  currentY: number,
  contentHeight: number,
  pageHeight: number,
  bottomMargin: number
): boolean => {
  return currentY + contentHeight > pageHeight - bottomMargin;
};

export const getLineHeight = (fontSize: string, lineSpacing?: string): number => {
  const fontSizeMm = convertToMm(fontSize);
  if (lineSpacing) {
    return convertToMm(lineSpacing);
  }
  // Default to 1.5x font size if no line spacing specified
  return fontSizeMm * 1.5;
};
