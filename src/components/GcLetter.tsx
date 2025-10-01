import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { GcLetterProps } from '../types';
import { LetterProvider } from '../context/LetterContext';
import { createPDF, getPageDimensions } from '../utils/pdfGenerator';
import { convertToMm } from '../utils/pageCalculator';
import {
  validateFileName,
  validateDeptSignature,
  validatePageNumberFormat,
  validateNextPageFormat,
} from '../utils/validators';

/**
 * GcLetter - Main wrapper component for FIP-compliant letters
 *
 * This component handles document-level settings and coordinates
 * PDF generation using jsPDF.
 */
const GcLetter: React.FC<GcLetterProps> = ({
  fileName,
  deptSignature,
  children,
  pageType = 'letter',
  xMargin = '38mm',
  yMargin = '13mm',
  fontFace = 'Helvetica',
  textSizeNormal = '11pt',
  textSizeHeading1 = '16pt',
  textSizeHeading2 = '14pt',
  textSizeHeading3 = '12pt',
  textAlign = 'left',
  paragraphSpacing = '11mm',
  lineSpacing = '7mm',
  showPageNumbers = false,
  pageNumberFormat = '-#-',
  pageNumberLocation: _pageNumberLocation = 'header',
  pageNumberAlignment: _pageNumberAlignment = 'center',
  showNextPage = false,
  nextPageNumberFormat = '.../#',
  nextPageNumberLocation: _nextPageNumberLocation = 'header',
  nextPageNumberAlignment: _nextPageNumberAlignment = 'center',
  letterVersion: _letterVersion,
  letterNumber: _letterNumber,
  showLetterNumber: _showLetterNumber = false,
  letterNumberLocation: _letterNumberLocation = 'footer',
  letterNumberAlignment: _letterNumberAlignment = 'right',
}) => {
  const [currentY, setCurrentY] = useState(0);
  const pdfRef = useRef<jsPDF | null>(null);

  useEffect(() => {
    // Validate required props
    validateFileName(fileName);
    validateDeptSignature(deptSignature);

    // Validate optional formats if provided
    if (showPageNumbers && pageNumberFormat) {
      validatePageNumberFormat(pageNumberFormat);
    }
    if (showNextPage && nextPageNumberFormat) {
      validateNextPageFormat(nextPageNumberFormat);
    }

    // Initialize PDF
    const pdf = createPDF(pageType);
    pdfRef.current = pdf;

    const topMargin = convertToMm(yMargin);

    // Set initial Y position (below top margin and any header content)
    setCurrentY(topMargin);

    // Set default font
    pdf.setFont(fontFace);
    pdf.setFontSize(convertToMm(textSizeNormal));
  }, [
    fileName,
    deptSignature,
    pageType,
    yMargin,
    fontFace,
    textSizeNormal,
    showPageNumbers,
    pageNumberFormat,
    showNextPage,
    nextPageNumberFormat,
  ]);

  const dimensions = getPageDimensions(pageType);
  const xMarginMm = convertToMm(xMargin);
  const yMarginMm = convertToMm(yMargin);

  // Only render if PDF is initialized
  if (!pdfRef.current) {
    return null;
  }

  const contextValue = {
    pdf: pdfRef.current,
    currentY,
    setCurrentY,
    pageHeight: dimensions.height,
    pageWidth: dimensions.width,
    pageType,
    xMargin: xMarginMm.toString() + 'mm',
    yMargin: yMarginMm.toString() + 'mm',
    fontFace,
    textSizeNormal,
    textSizeHeading1,
    textSizeHeading2,
    textSizeHeading3,
    textAlign,
    paragraphSpacing,
    lineSpacing,
  };

  // Render children in a hidden container for measurement
  // The actual PDF rendering will happen through the context
  return (
    <div style={{ display: 'none' }} data-component="gc-letter">
      <LetterProvider value={contextValue}>{children}</LetterProvider>
    </div>
  );
};

export default GcLetter;
