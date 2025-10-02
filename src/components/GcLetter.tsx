import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { GcLetterProps } from '../types';
import { createPDF, getPageDimensions, downloadPDF } from '../utils/pdfGenerator';
import { convertToMm, shouldBreakPage } from '../utils/pageCalculator';
import {
  validateFileName,
  validateDeptSignature,
  validatePageNumberFormat,
  validateNextPageFormat,
} from '../utils/validators';
import {
  parseMarkdown,
  renderParagraph,
  renderHeading,
  renderListItem,
} from '../utils/markdownParser';

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
  onReady,
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
  showCanadaWordmark = true,
  canadaWordmarkPath,
}) => {
  const pdfRef = useRef<jsPDF | null>(null);
  const hasRendered = useRef(false);

  // Render children to PDF sequentially
  useEffect(() => {
    // Only render once
    if (hasRendered.current) return;
    hasRendered.current = true;

    // Async rendering function
    const renderPDF = async () => {
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
    let y = topMargin;

    // Set default font
    pdf.setFont(fontFace);
    pdf.setFontSize(convertToMm(textSizeNormal));

    // Render initial page elements
    renderPageElements(pdf, 1);

    // Render Canada wordmark on first page (bottom left)
    if (showCanadaWordmark) {
      await renderCanadaWordmark(pdf, 1);
    }

    // Process children sequentially
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      // Handle LetterBlock components
      if (child.type && (child.type as any).name === 'LetterBlock') {
        const props = child.props as any;
        // Render LetterBlock content directly here
        y = renderLetterBlockContent(pdf, y, props);
      }
      // Handle SeparatorLine components
      else if (child.type && (child.type as any).name === 'SeparatorLine') {
        y = renderSeparatorLineContent(pdf, y);
      }
    });

    // Provide download function to parent via callback
    if (onReady) {
      const download = () => {
        downloadPDF(pdf, fileName);
      };
      onReady(download);
    }
    };

    // Call the async render function
    renderPDF();
  }); // No dependencies - runs on every render, but hasRendered prevents re-execution

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
  const addNewPage = (pdf: jsPDF, pageNum: number): number => {
    pdf.addPage();
    renderPageElements(pdf, pageNum + 1);
    return yMarginMm; // Return new Y position
  };

  // Helper function to render LetterBlock content
  const renderLetterBlockContent = (pdf: jsPDF, startY: number, props: any): number => {
    const {
      content,
      children: blockChildren,
      allowPagebreak = true,
      paragraphSpacing: blockParagraphSpacing,
      lineSpacing: blockLineSpacing,
      fontFace: blockFontFace,
      textSizeNormal: blockTextSizeNormal,
      textSizeHeading1: blockTextSizeHeading1,
      textSizeHeading2: blockTextSizeHeading2,
      textSizeHeading3: blockTextSizeHeading3,
      textAlign: blockTextAlign,
    } = props;

    // Use imported utilities (renamed convertToMm to avoid shadowing)
    const toMm = convertToMm;

    // Get typography settings (use block-level overrides or fall back to document-level)
    const effectiveFontSize = blockTextSizeNormal || textSizeNormal;
    const effectiveFontSizeH1 = blockTextSizeHeading1 || textSizeHeading1;
    const effectiveFontSizeH2 = blockTextSizeHeading2 || textSizeHeading2;
    const effectiveFontSizeH3 = blockTextSizeHeading3 || textSizeHeading3;
    const effectiveLineSpacing = blockLineSpacing || lineSpacing;
    const effectiveParagraphSpacing = blockParagraphSpacing || paragraphSpacing;
    const effectiveFontFace = blockFontFace || fontFace;
    const effectiveTextAlign = blockTextAlign || textAlign;

    const maxWidth = dimensions.width - 2 * xMarginMm;

    // Set font
    pdf.setFont(effectiveFontFace);

    // Get markdown content
    const markdownContent =
      typeof content === 'string'
        ? content
        : typeof blockChildren === 'string'
        ? blockChildren
        : '';

    if (!markdownContent) return startY;

    // Parse markdown
    const tokens = parseMarkdown(markdownContent);

    let y = startY;
    let pageNum = 1;

    // Create render context
    const renderContext = {
      pdf,
      x: xMarginMm,
      y,
      maxWidth,
      fontSizeNormal: toMm(effectiveFontSize),
      fontSizeH1: toMm(effectiveFontSizeH1),
      fontSizeH2: toMm(effectiveFontSizeH2),
      fontSizeH3: toMm(effectiveFontSizeH3),
      lineSpacing: toMm(effectiveLineSpacing),
      paragraphSpacing: toMm(effectiveParagraphSpacing),
      textAlign: effectiveTextAlign,
    };

    // Render each token
    tokens.forEach((token: any) => {
      // Check if we need a page break before rendering
      const estimatedHeight = toMm(effectiveLineSpacing) * 3;
      if (shouldBreakPage(y, estimatedHeight, dimensions.height, yMarginMm)) {
        if (allowPagebreak) {
          y = addNewPage(pdf, pageNum);
          pageNum++;
          renderContext.y = y;
        } else {
          console.warn(
            'LetterBlock content exceeds page boundary with allowPagebreak=false'
          );
        }
      }

      if (token.type === 'paragraph') {
        renderContext.y = y;
        y = renderParagraph(renderContext, token.text);
      } else if (token.type === 'heading') {
        renderContext.y = y;
        y = renderHeading(renderContext, token.text, token.depth);
      } else if (token.type === 'list') {
        token.items.forEach((item: any, index: number) => {
          if (shouldBreakPage(y, estimatedHeight, dimensions.height, yMarginMm)) {
            if (allowPagebreak) {
              y = addNewPage(pdf, pageNum);
              pageNum++;
              renderContext.y = y;
            }
          }

          renderContext.y = y;
          y = renderListItem(renderContext, item.text, token.ordered, index);
        });
      } else if (token.type === 'space') {
        y += toMm(effectiveLineSpacing);
      }
    });

    return y;
  };

  // Helper function to render SeparatorLine content
  const renderSeparatorLineContent = (pdf: jsPDF, startY: number): number => {
    const lineWidth = dimensions.width - 2 * xMarginMm;
    const spacingBefore = 3; // mm
    const spacingAfter = 3; // mm
    const lineThickness = 0.5; // mm

    const y = startY + spacingBefore;

    // Draw the horizontal line
    pdf.setLineWidth(lineThickness);
    pdf.line(xMarginMm, y, xMarginMm + lineWidth, y);

    return y + spacingAfter;
  };

  // Helper function to render Canada wordmark
  const renderCanadaWordmark = async (pdf: jsPDF, pageNum: number) => {
    // Only render on first page
    if (pageNum !== 1) return;

    const wordmarkPath = canadaWordmarkPath || 'assets/Canada_wordmark.png';

    try {
      // Load the image
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = wordmarkPath;
      });

      // Position at bottom left, above the bottom margin
      const wordmarkWidth = 30; // mm
      const wordmarkHeight = (img.height / img.width) * wordmarkWidth;
      const x = xMarginMm;
      const y = dimensions.height - yMarginMm - wordmarkHeight - 3; // 3mm spacing above margin

      pdf.addImage(img, 'PNG', x, y, wordmarkWidth, wordmarkHeight);
    } catch (error) {
      console.warn('Failed to load Canada wordmark:', error);
      // Continue without the wordmark if it fails to load
    }
  };

  // PDF is rendered in useEffect - component doesn't need to render anything
  return null;
};

export default GcLetter;
