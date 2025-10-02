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
  pageNumberLocation = 'header',
  pageNumberAlignment = 'center',
  showNextPage = false,
  nextPageNumberFormat = '.../#',
  nextPageNumberLocation = 'header',
  nextPageNumberAlignment = 'center',
  letterVersion: _letterVersion,
  letterNumber,
  showLetterNumber = false,
  letterNumberLocation = 'footer',
  letterNumberAlignment = 'right',
}) => {
  const [currentY, setCurrentY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Function to render page numbers, metadata, and next page indicators
  const renderPageElements = React.useCallback(
    (pdf: jsPDF, pageNum: number) => {
      const totalPages = pdf.getNumberOfPages();

      // Render page numbers
      if (showPageNumbers) {
        if (showPageNumbers === 'skip-first' && pageNum === 1) {
          // Skip first page
        } else {
          const pageText = pageNumberFormat.replace('#', pageNum.toString());
          const textWidth = pdf.getTextWidth(pageText);

          let x: number;
          if (pageNumberAlignment === 'left') {
            x = xMarginMm;
          } else if (pageNumberAlignment === 'right') {
            x = dimensions.width - xMarginMm - textWidth;
          } else {
            x = dimensions.width / 2 - textWidth / 2;
          }

          const y =
            pageNumberLocation === 'header'
              ? yMarginMm / 2
              : dimensions.height - yMarginMm / 2;
          pdf.text(pageText, x, y);
        }
      }

      // Render next page indicator (if not last page)
      if (showNextPage && pageNum < totalPages) {
        if (showNextPage === 'skip-first' && pageNum === 1) {
          // Skip first page
        } else {
          const nextPageText = nextPageNumberFormat.replace(
            '#',
            (pageNum + 1).toString()
          );
          const textWidth = pdf.getTextWidth(nextPageText);

          let x: number;
          if (nextPageNumberAlignment === 'left') {
            x = xMarginMm;
          } else if (nextPageNumberAlignment === 'right') {
            x = dimensions.width - xMarginMm - textWidth;
          } else {
            x = dimensions.width / 2 - textWidth / 2;
          }

          const y =
            nextPageNumberLocation === 'header'
              ? yMarginMm / 2
              : dimensions.height - yMarginMm / 2;
          pdf.text(nextPageText, x, y);
        }
      }

      // Render letter number
      if (showLetterNumber && letterNumber) {
        const textWidth = pdf.getTextWidth(letterNumber);

        let x: number;
        if (letterNumberAlignment === 'left') {
          x = xMarginMm;
        } else if (letterNumberAlignment === 'right') {
          x = dimensions.width - xMarginMm - textWidth;
        } else {
          x = dimensions.width / 2 - textWidth / 2;
        }

        const y =
          letterNumberLocation === 'header'
            ? yMarginMm / 2
            : dimensions.height - yMarginMm / 2;
        pdf.text(letterNumber, x, y);
      }
    },
    [
      showPageNumbers,
      pageNumberFormat,
      pageNumberAlignment,
      pageNumberLocation,
      showNextPage,
      nextPageNumberFormat,
      nextPageNumberAlignment,
      nextPageNumberLocation,
      showLetterNumber,
      letterNumber,
      letterNumberAlignment,
      letterNumberLocation,
      xMarginMm,
      yMarginMm,
      dimensions.width,
      dimensions.height,
    ]
  );

  // Function to add a new page and render headers/footers
  const addNewPage = React.useCallback(() => {
    const pdf = pdfRef.current;
    if (!pdf) return;

    pdf.addPage();
    const newPageNum = currentPage + 1;
    setCurrentPage(newPageNum);
    setCurrentY(yMarginMm);

    // Render headers/footers for the new page
    renderPageElements(pdf, newPageNum);
  }, [currentPage, yMarginMm, renderPageElements]);

  // Render initial page elements
  useEffect(() => {
    if (pdfRef.current) {
      renderPageElements(pdfRef.current, currentPage);
    }
  }, [currentPage, renderPageElements]);

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
    currentPage,
    setCurrentPage,
    addNewPage,
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
