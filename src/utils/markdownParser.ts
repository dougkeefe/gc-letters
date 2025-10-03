import { marked, Tokens } from 'marked';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Utility functions for parsing and rendering markdown content
 */

export interface RenderContext {
  pdf: jsPDF;
  x: number;
  y: number;
  maxWidth: number;
  fontSizeNormal: number;
  fontSizeH1: number;
  fontSizeH2: number;
  fontSizeH3: number;
  lineSpacing: number;
  paragraphSpacing: number;
  textAlign: 'left' | 'right' | 'center' | 'full';
  tableTheme?: 'striped' | 'grid' | 'plain';
  tableHeaderBold?: boolean;
  tableHeaderFillColor?: [number, number, number] | false;
  tableBorderColor?: [number, number, number];
}

/**
 * Parse markdown into tokens
 */
export const parseMarkdown = (markdown: string): Tokens.Generic[] => {
  const tokens = marked.lexer(markdown);
  return tokens as Tokens.Generic[];
};

/**
 * Render a single line of text with formatting
 */
export const renderTextLine = (
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  bold: boolean = false,
  italic: boolean = false
): number => {
  const fontStyle =
    bold && italic
      ? 'bolditalic'
      : bold
        ? 'bold'
        : italic
          ? 'italic'
          : 'normal';
  pdf.setFont(pdf.getFont().fontName, fontStyle);

  // Split text into lines if it's too long
  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeight = pdf.getLineHeight() / pdf.internal.scaleFactor;

  lines.forEach((line: string, index: number) => {
    pdf.text(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
};

/**
 * Calculate X position based on alignment
 */
const getAlignedXPosition = (
  pdf: jsPDF,
  text: string,
  x: number,
  maxWidth: number,
  align: 'left' | 'right' | 'center' | 'full'
): number => {
  if (align === 'left' || align === 'full') {
    return x;
  }

  const textWidth = pdf.getTextWidth(text);

  if (align === 'center') {
    return x + (maxWidth - textWidth) / 2;
  }

  if (align === 'right') {
    return x + maxWidth - textWidth;
  }

  return x;
};

/**
 * Process inline markdown formatting (bold, italic)
 */
const processInlineFormatting = (text: string): string => {
  // Remove markdown syntax - jsPDF doesn't support it
  // We'll just strip the markers for now since jsPDF has limited text styling per line
  let processed = text;

  // Remove bold markers
  processed = processed.replace(/\*\*(.+?)\*\*/g, '$1');

  // Remove italic markers
  processed = processed.replace(/\*(.+?)\*/g, '$1');

  return processed;
};

/**
 * Render text with inline formatting
 * For now, this is simplified - jsPDF has limitations with inline styles
 */
const renderTextWithFormatting = (
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  _maxWidth: number
): void => {
  // Check if text has bold formatting
  const hasBold = /\*\*(.+?)\*\*/.test(text);

  if (hasBold) {
    // If entire text is bold, render as bold
    if (text.startsWith('**') && text.endsWith('**')) {
      const cleanText = text.replace(/\*\*/g, '');
      pdf.setFont(pdf.getFont().fontName, 'bold');
      pdf.text(cleanText, x, y);
      pdf.setFont(pdf.getFont().fontName, 'normal');
    } else {
      // Mixed formatting - render segments
      const segments: Array<{ text: string; bold: boolean }> = [];
      let remaining = text;
      let currentX = x;

      while (remaining.length > 0) {
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        if (boldMatch && boldMatch.index !== undefined) {
          // Add text before bold
          if (boldMatch.index > 0) {
            segments.push({
              text: remaining.substring(0, boldMatch.index),
              bold: false,
            });
          }
          // Add bold text
          segments.push({ text: boldMatch[1], bold: true });
          remaining = remaining.substring(
            boldMatch.index + boldMatch[0].length
          );
        } else {
          // No more bold text
          segments.push({ text: remaining, bold: false });
          break;
        }
      }

      // Render segments
      segments.forEach((segment) => {
        pdf.setFont(pdf.getFont().fontName, segment.bold ? 'bold' : 'normal');
        pdf.text(segment.text, currentX, y);
        currentX += pdf.getTextWidth(segment.text);
      });

      pdf.setFont(pdf.getFont().fontName, 'normal');
    }
  } else {
    // No formatting, render normally
    const cleanText = processInlineFormatting(text);
    pdf.text(cleanText, x, y);
  }
};

/**
 * Render a paragraph
 */
export const renderParagraph = (
  context: RenderContext,
  text: string
): number => {
  const {
    pdf,
    x,
    y,
    maxWidth,
    fontSizeNormal,
    lineSpacing,
    paragraphSpacing,
    textAlign,
  } = context;

  pdf.setFontSize(fontSizeNormal);
  pdf.setFont(pdf.getFont().fontName, 'normal');

  // Process text for wrapping, but keep formatting markers
  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeightMm = lineSpacing;

  lines.forEach((line: string, index: number) => {
    const xPos = getAlignedXPosition(pdf, line, x, maxWidth, textAlign);

    if (textAlign === 'full' && index < lines.length - 1) {
      // Justify text (except last line) - simplified, no inline formatting
      const cleanLine = processInlineFormatting(line);
      const words = cleanLine.split(' ');
      if (words.length > 1) {
        const totalTextWidth = words.reduce(
          (sum, word) => sum + pdf.getTextWidth(word),
          0
        );
        const spaceWidth = (maxWidth - totalTextWidth) / (words.length - 1);
        let currentX = x;
        words.forEach((word) => {
          pdf.text(word, currentX, y + index * lineHeightMm);
          currentX += pdf.getTextWidth(word) + spaceWidth;
        });
        return;
      }
    }

    // Render with inline formatting support
    renderTextWithFormatting(
      pdf,
      line,
      xPos,
      y + index * lineHeightMm,
      maxWidth
    );
  });

  return y + lines.length * lineHeightMm + paragraphSpacing;
};

/**
 * Render a heading
 */
export const renderHeading = (
  context: RenderContext,
  text: string,
  level: number
): number => {
  const {
    pdf,
    x,
    y,
    maxWidth,
    fontSizeH1,
    fontSizeH2,
    fontSizeH3,
    paragraphSpacing,
    textAlign,
  } = context;

  let fontSize: number;
  switch (level) {
    case 1:
      fontSize = fontSizeH1;
      break;
    case 2:
      fontSize = fontSizeH2;
      break;
    case 3:
      fontSize = fontSizeH3;
      break;
    default:
      fontSize = fontSizeH2;
  }

  pdf.setFontSize(fontSize);
  pdf.setFont(pdf.getFont().fontName, 'bold');

  // Clean markdown formatting from heading text
  const cleanText = processInlineFormatting(text);
  const lines = pdf.splitTextToSize(cleanText, maxWidth);
  const lineHeight = pdf.getLineHeight() / pdf.internal.scaleFactor;

  lines.forEach((line: string, index: number) => {
    const xPos = getAlignedXPosition(pdf, line, x, maxWidth, textAlign);
    pdf.text(line, xPos, y + index * lineHeight);
  });

  return y + lines.length * lineHeight + paragraphSpacing;
};

/**
 * Render a list item
 */
export const renderListItem = (
  context: RenderContext,
  text: string,
  ordered: boolean = false,
  index: number = 0
): number => {
  const { pdf, x, y, maxWidth, fontSizeNormal, lineSpacing } = context;

  pdf.setFontSize(fontSizeNormal);
  pdf.setFont(pdf.getFont().fontName, 'normal');

  const bullet = ordered ? `${index + 1}.` : '•';
  const bulletWidth = pdf.getTextWidth(bullet + ' ');
  const indent = 5; // mm

  // Render bullet
  pdf.text(bullet, x + indent, y);

  // Render text with indent
  const textMaxWidth = maxWidth - indent - bulletWidth;
  const lines = pdf.splitTextToSize(text, textMaxWidth);
  const lineHeightMm = lineSpacing;

  lines.forEach((line: string, lineIndex: number) => {
    renderTextWithFormatting(
      pdf,
      line,
      x + indent + bulletWidth,
      y + lineIndex * lineHeightMm,
      textMaxWidth
    );
  });

  return y + lines.length * lineHeightMm;
};

/**
 * Render a markdown table using jsPDF-AutoTable
 */
export const renderTable = (
  context: RenderContext,
  tableToken: Tokens.Table
): number => {
  const {
    pdf,
    x,
    y,
    maxWidth,
    fontSizeNormal,
    paragraphSpacing,
    tableTheme = 'grid',
    tableHeaderBold = true,
    tableHeaderFillColor = [240, 240, 240], // Light gray
    tableBorderColor = [200, 200, 200], // Medium gray
  } = context;

  // Extract table data
  const header = tableToken.header.map((cell) => cell.text);
  const body = tableToken.rows.map((row) => row.map((cell) => cell.text));
  const alignments = tableToken.align;

  // Convert markdown alignment to jsPDF-AutoTable format
  const columnStyles: {
    [key: number]: { halign: 'left' | 'center' | 'right' };
  } = {};
  alignments.forEach((align, index) => {
    if (align) {
      columnStyles[index] = {
        halign:
          align === 'center' ? 'center' : align === 'right' ? 'right' : 'left',
      };
    }
  });

  // Configure table styling to match GC Letters design
  autoTable(pdf, {
    head: [header],
    body: body,
    startY: y,
    margin: { left: x, right: x },
    tableWidth: maxWidth,
    theme: tableTheme,
    styles: {
      font: pdf.getFont().fontName,
      fontSize: fontSizeNormal,
      cellPadding: 2,
      lineColor: tableBorderColor,
      lineWidth: 0.1,
    },
    headStyles: {
      fontStyle: tableHeaderBold ? 'bold' : 'normal',
      fillColor: tableHeaderFillColor,
      textColor: [0, 0, 0],
    },
    columnStyles: columnStyles,
    didDrawPage: (data) => {
      // Store the final Y position after table rendering
      context.y = data.cursor?.y || y;
    },
  });

  // Get the final Y position after the table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (pdf as any).lastAutoTable?.finalY || y;

  // Add paragraph spacing after table
  return finalY + paragraphSpacing;
};
