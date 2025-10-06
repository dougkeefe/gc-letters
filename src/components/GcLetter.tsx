import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { GcLetterProps } from '../types';
import {
  createPDF,
  getPageDimensions,
  downloadPDF,
} from '../utils/pdfGenerator';
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
  renderTable,
} from '../utils/markdownParser';
import { CANADA_WORDMARK_BASE64 } from '../assets/canadaWordmark';

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
  paragraphSpacing = '5mm',
  lineSpacing = '5mm',
  showPageNumbers = false,
  pageNumberFormat = '-#-',
  pageNumberLocation = 'header',
  pageNumberAlignment = 'center',
  showNextPage = false,
  nextPageNumberFormat = '.../#',
  nextPageNumberLocation = 'footer',
  nextPageNumberAlignment = 'right',
  letterVersion: _letterVersion,
  letterNumber,
  showLetterNumber = false,
  letterNumberLocation = 'footer',
  letterNumberAlignment = 'right',
  showCanadaWordmark = true,
  canadaWordmarkPath = CANADA_WORDMARK_BASE64,
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

      // Render department signature at top
      const signatureHeight = await renderDepartmentSignature(pdf);
      y = topMargin + signatureHeight + 10; // Add spacing after signature

      // Render Canada wordmark on first page (bottom left)
      if (showCanadaWordmark) {
        await renderCanadaWordmark(pdf, 1);
      }

      // Process children sequentially
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        // Handle LetterBlock components
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (child.type && (child.type as any).name === 'LetterBlock') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = child.props as any;
          // Render LetterBlock content directly here
          y = renderLetterBlockContent(pdf, y, props);
        }
        // Handle SeparatorLine components
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        else if (child.type && (child.type as any).name === 'SeparatorLine') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = child.props as any;
          y = renderSeparatorLineContent(pdf, y, props);
        }
      });

      // After all content is rendered, add page numbers and metadata to all pages
      const totalPages = pdf.getNumberOfPages();
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        pdf.setPage(pageNum);
        renderPageElements(pdf, pageNum, totalPages);
      }

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
    (pdf: jsPDF, pageNum: number, totalPages: number) => {
      // Set consistent font size and style for page elements
      pdf.setFontSize(8); // Smaller font for page numbers and metadata
      pdf.setFont(fontFace, 'normal');

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
              ? yMarginMm
              : dimensions.height - yMarginMm;
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
              ? yMarginMm
              : dimensions.height - yMarginMm;
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
            ? yMarginMm
            : dimensions.height - yMarginMm;
        pdf.text(letterNumber, x, y);
      }

      // Restore default font size for content
      pdf.setFontSize(parseFloat(textSizeNormal));
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
      fontFace,
      textSizeNormal,
    ]
  );

  // Function to add a new page
  const addNewPage = (pdf: jsPDF, _pageNum: number): number => {
    pdf.addPage();
    // Use a larger top margin for subsequent pages (no dept signature)
    // First page has signature which adds visual balance; subsequent pages need more space
    return yMarginMm * 2; // Double the margin for pages without signature
  };

  // Helper function to render LetterBlock content
  const renderLetterBlockContent = (
    pdf: jsPDF,
    startY: number,
    props: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): number => {
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
      tableTheme: blockTableTheme,
      tableHeaderBold: blockTableHeaderBold,
      tableHeaderFillColor: blockTableHeaderFillColor,
      tableBorderColor: blockTableBorderColor,
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

    // Helper to extract font size in points (jsPDF expects points, not mm)
    const extractFontSizePt = (sizeStr: string): number => {
      if (sizeStr.endsWith('pt')) {
        return parseFloat(sizeStr);
      }
      // If not in points, convert from mm to points
      const sizeInMm = toMm(sizeStr);
      return sizeInMm / 0.3528; // Convert mm to pt
    };

    // Create render context
    const renderContext = {
      pdf,
      x: xMarginMm,
      y,
      maxWidth,
      fontSizeNormal: extractFontSizePt(effectiveFontSize),
      fontSizeH1: extractFontSizePt(effectiveFontSizeH1),
      fontSizeH2: extractFontSizePt(effectiveFontSizeH2),
      fontSizeH3: extractFontSizePt(effectiveFontSizeH3),
      lineSpacing: toMm(effectiveLineSpacing),
      paragraphSpacing: toMm(effectiveParagraphSpacing),
      textAlign: effectiveTextAlign,
      tableTheme: blockTableTheme,
      tableHeaderBold: blockTableHeaderBold,
      tableHeaderFillColor: blockTableHeaderFillColor,
      tableBorderColor: blockTableBorderColor,
    };

    // Helper to calculate effective bottom margin (accounting for wordmark on first page)
    const getEffectiveBottomMargin = (currentPageNum: number): number => {
      if (currentPageNum === 1 && showCanadaWordmark) {
        // FIP specs: Canada wordmark is 13mm from bottom edge, 30mm wide
        // Clear space requirement: Use full wordmark height as clear space for safety
        const wordmarkWidth = 30; // mm (per FIP specs)
        const wordmarkHeight = (34 / 144) * wordmarkWidth; // aspect ratio from original PNG (144x34 pixels)
        const clearSpace = wordmarkHeight * 1.5; // Increased clear space to prevent overlap
        const wordmarkBottomPosition = 13; // mm from bottom edge (per FIP specs)

        // Content should stay above: wordmark position + wordmark height + clear space
        return wordmarkBottomPosition + wordmarkHeight + clearSpace;
      }
      return yMarginMm;
    };

    // If allowPagebreak is false, check if we need to start a new page before rendering
    if (!allowPagebreak) {
      // Estimate the height needed for this block (rough estimate)
      const estimatedBlockHeight =
        toMm(effectiveLineSpacing) * tokens.length * 3;
      const effectiveBottomMargin = getEffectiveBottomMargin(pageNum);

      if (
        shouldBreakPage(
          y,
          estimatedBlockHeight,
          dimensions.height,
          effectiveBottomMargin
        )
      ) {
        // Start a new page to keep the entire block together
        y = addNewPage(pdf, pageNum);
        pageNum++;
        renderContext.y = y;
      }
    }

    // Render each token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokens.forEach((token: any) => {
      // Check if we need a page break before rendering
      const estimatedHeight = toMm(effectiveLineSpacing) * 3;
      const effectiveBottomMargin = getEffectiveBottomMargin(pageNum);
      if (
        shouldBreakPage(
          y,
          estimatedHeight,
          dimensions.height,
          effectiveBottomMargin
        )
      ) {
        if (allowPagebreak) {
          y = addNewPage(pdf, pageNum);
          pageNum++;
          renderContext.y = y;
        } else {
          // Block content is too large to fit on a single page
          // This warning indicates the block itself exceeds one page height
          console.warn(
            'LetterBlock content is too large to fit on a single page even with allowPagebreak=false. Consider breaking content into smaller blocks or setting allowPagebreak=true.'
          );
        }
      }

      if (token.type === 'paragraph') {
        renderContext.y = y;
        y = renderParagraph(renderContext, token.text);
      } else if (token.type === 'heading') {
        renderContext.y = y;
        y = renderHeading(renderContext, token.text, token.depth);
      } else if (token.type === 'table') {
        renderContext.y = y;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        y = renderTable(renderContext, token as any);
      } else if (token.type === 'list') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.items.forEach((item: any, index: number) => {
          const effectiveBottomMargin = getEffectiveBottomMargin(pageNum);
          if (
            shouldBreakPage(
              y,
              estimatedHeight,
              dimensions.height,
              effectiveBottomMargin
            )
          ) {
            if (allowPagebreak) {
              y = addNewPage(pdf, pageNum);
              pageNum++;
              renderContext.y = y;
            }
          }

          renderContext.y = y;
          y = renderListItem(renderContext, item.text, token.ordered, index);
        });
        // Add paragraph spacing after the list
        y += toMm(effectiveParagraphSpacing);
      } else if (token.type === 'space') {
        y += toMm(effectiveLineSpacing);
      }
    });

    return y;
  };

  // Helper function to render SeparatorLine content
  const renderSeparatorLineContent = (
    pdf: jsPDF,
    startY: number,
    props: any = {} // eslint-disable-line @typescript-eslint/no-explicit-any
  ): number => {
    const { topMargin, bottomMargin } = props;

    const lineWidth = dimensions.width - 2 * xMarginMm;
    const spacingBefore = topMargin
      ? convertToMm(topMargin)
      : convertToMm(paragraphSpacing); // Use standard paragraph spacing by default
    const spacingAfter = bottomMargin
      ? convertToMm(bottomMargin)
      : convertToMm(paragraphSpacing) * 2; // Double spacing by default
    const lineThickness = 0.5; // mm

    const y = startY + spacingBefore;

    // Draw the horizontal line
    pdf.setLineWidth(lineThickness);
    pdf.line(xMarginMm, y, xMarginMm + lineWidth, y);

    return y + spacingAfter;
  };

  // Helper function to render department signature
  const renderDepartmentSignature = async (pdf: jsPDF): Promise<number> => {
    try {
      // Load the image
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = deptSignature;
      });

      // Calculate dimensions (max width 60mm, maintain aspect ratio)
      const maxWidth = 60; // mm
      const aspectRatio = img.height / img.width;
      const signatureWidth = maxWidth;
      const signatureHeight = signatureWidth * aspectRatio;

      // Position at top left margin
      const x = xMarginMm;
      const y = yMarginMm;

      pdf.addImage(img, 'PNG', x, y, signatureWidth, signatureHeight);

      return signatureHeight; // Return height for Y position tracking
    } catch (error) {
      console.error('Failed to load department signature:', error);
      return 0; // Return 0 if signature fails to load
    }
  };

  // Helper function to render Canada wordmark
  const renderCanadaWordmark = async (pdf: jsPDF, pageNum: number) => {
    // Only render on first page
    if (pageNum !== 1) return;

    console.log('[DEBUG] renderCanadaWordmark called for page', pageNum);
    console.log('[DEBUG] showCanadaWordmark:', showCanadaWordmark);
    console.log(
      '[DEBUG] canadaWordmarkPath:',
      canadaWordmarkPath?.substring(0, 50) + '...'
    );

    try {
      // Load the image
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = canadaWordmarkPath;
      });

      // Calculate dimensions (per FIP specs: 30mm wide, maintain aspect ratio)
      const wordmarkWidth = 30; // mm (per FIP specs)
      const aspectRatio = img.height / img.width;
      const wordmarkHeight = wordmarkWidth * aspectRatio;

      // Position according to FIP specifications
      // FIP specs: 13mm from bottom edge, 38mm from left edge
      const x = 38; // mm from left edge (per FIP specs)
      const y = dimensions.height - 13 - wordmarkHeight; // 13mm from bottom edge

      console.log('[DEBUG] Adding wordmark at position:', {
        x,
        y,
        wordmarkWidth,
        wordmarkHeight,
      });
      console.log('[DEBUG] Page dimensions:', dimensions);

      // Add image directly (same method as department signature)
      pdf.addImage(img, 'PNG', x, y, wordmarkWidth, wordmarkHeight);
      console.log('[DEBUG] Canada wordmark added successfully');
    } catch (error) {
      console.warn('Failed to load Canada wordmark:', error);
      // Continue without the wordmark if it fails to load
    }
  };

  // PDF is rendered in useEffect - component doesn't need to render anything
  return null;
};

export default GcLetter;
