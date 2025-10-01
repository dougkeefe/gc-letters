import { jsPDF } from 'jspdf';
import { PageType, Alignment, HeaderFooterLocation } from '../types';

/**
 * Utility functions for PDF generation using jsPDF
 */

export const getPageDimensions = (pageType: PageType) => {
  switch (pageType) {
    case 'letter':
      return { width: 215.9, height: 279.4 }; // 8.5" x 11" in mm
    case 'legal':
      return { width: 215.9, height: 355.6 }; // 8.5" x 14" in mm
    case 'a4':
      return { width: 210, height: 297 }; // A4 in mm
    default:
      return { width: 215.9, height: 279.4 };
  }
};

export const createPDF = (pageType: PageType): jsPDF => {
  const dimensions = getPageDimensions(pageType);
  return new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [dimensions.width, dimensions.height],
  });
};

/**
 * Load and render an image (department signature) to the PDF
 */
export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

export const addImageToPDF = (
  pdf: jsPDF,
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> => {
  return loadImage(imageUrl).then((img) => {
    pdf.addImage(img, 'PNG', x, y, width, height);
  });
};

/**
 * Calculate X position based on alignment
 */
export const getAlignedX = (
  alignment: Alignment,
  pageWidth: number,
  leftMargin: number,
  rightMargin: number,
  textWidth: number = 0
): number => {
  const availableWidth = pageWidth - leftMargin - rightMargin;

  switch (alignment) {
    case 'left':
      return leftMargin;
    case 'center':
      return leftMargin + (availableWidth - textWidth) / 2;
    case 'right':
      return pageWidth - rightMargin - textWidth;
    default:
      return leftMargin;
  }
};

/**
 * Render page number at specified location
 */
export const renderPageNumber = (
  pdf: jsPDF,
  pageNumber: number,
  format: string,
  location: HeaderFooterLocation,
  alignment: Alignment,
  pageWidth: number,
  pageHeight: number,
  xMargin: number,
  yMargin: number
): void => {
  const text = format.replace('#', pageNumber.toString());
  const textWidth = pdf.getTextWidth(text);

  const x = getAlignedX(alignment, pageWidth, xMargin, xMargin, textWidth);
  const y = location === 'header' ? yMargin / 2 : pageHeight - yMargin / 2;

  pdf.text(text, x, y);
};
