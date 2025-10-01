import { marked, Tokens } from 'marked';
import { jsPDF } from 'jspdf';

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
  const fontStyle = bold && italic ? 'bolditalic' : bold ? 'bold' : italic ? 'italic' : 'normal';
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
 * Render a paragraph
 */
export const renderParagraph = (
  context: RenderContext,
  text: string
): number => {
  const { pdf, x, y, maxWidth, fontSizeNormal, lineSpacing, paragraphSpacing } =
    context;

  pdf.setFontSize(fontSizeNormal);
  pdf.setFont(pdf.getFont().fontName, 'normal');

  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeightMm = lineSpacing;

  lines.forEach((line: string, index: number) => {
    pdf.text(line, x, y + index * lineHeightMm);
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
  const { pdf, x, y, maxWidth, fontSizeH1, fontSizeH2, fontSizeH3, paragraphSpacing } =
    context;

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

  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeight = pdf.getLineHeight() / pdf.internal.scaleFactor;

  lines.forEach((line: string, index: number) => {
    pdf.text(line, x, y + index * lineHeight);
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

  lines.forEach((line: string, index: number) => {
    pdf.text(line, x + indent + bulletWidth, y + index * lineHeightMm);
  });

  return y + lines.length * lineHeightMm;
};
