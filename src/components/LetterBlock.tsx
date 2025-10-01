import React, { useEffect } from 'react';
import { LetterBlockProps } from '../types';
import { useLetterContext } from '../context/LetterContext';
import {
  parseMarkdown,
  renderParagraph,
  renderHeading,
  renderListItem,
  RenderContext,
} from '../utils/markdownParser';
import { convertToMm, shouldBreakPage } from '../utils/pageCalculator';
import { Tokens } from 'marked';

/**
 * LetterBlock - Content section component for letters
 *
 * Renders markdown content with optional page break control.
 * Can override document-level typography settings.
 */
const LetterBlock: React.FC<LetterBlockProps> = ({
  content,
  children,
  allowPagebreak = true,
  paragraphSpacing,
  lineSpacing,
  fontFace,
  textSizeNormal,
  textSizeHeading1,
  textSizeHeading2,
  textSizeHeading3,
  textAlign,
}) => {
  const context = useLetterContext();

  useEffect(() => {
    if (!context || !context.pdf) return;

    const { pdf, currentY, setCurrentY, pageHeight, pageWidth } = context;

    // Get typography settings (use block-level overrides or fall back to document-level)
    const effectiveFontSize = textSizeNormal || context.textSizeNormal;
    const effectiveFontSizeH1 = textSizeHeading1 || context.textSizeHeading1;
    const effectiveFontSizeH2 = textSizeHeading2 || context.textSizeHeading2;
    const effectiveFontSizeH3 = textSizeHeading3 || context.textSizeHeading3;
    const effectiveLineSpacing = lineSpacing || context.lineSpacing;
    const effectiveParagraphSpacing =
      paragraphSpacing || context.paragraphSpacing;
    const effectiveFontFace = fontFace || context.fontFace;
    const effectiveTextAlign = textAlign || context.textAlign;

    // Calculate margins
    const xMargin = convertToMm(context.xMargin);
    const yMargin = convertToMm(context.yMargin);
    const maxWidth = pageWidth - 2 * xMargin;

    // Set font
    pdf.setFont(effectiveFontFace);

    // Get markdown content
    const markdownContent =
      typeof content === 'string'
        ? content
        : typeof children === 'string'
        ? children
        : '';

    if (!markdownContent) return;

    // Parse markdown
    const tokens = parseMarkdown(markdownContent);

    let y = currentY;

    // Create render context
    const renderContext: RenderContext = {
      pdf,
      x: xMargin,
      y,
      maxWidth,
      fontSizeNormal: convertToMm(effectiveFontSize),
      fontSizeH1: convertToMm(effectiveFontSizeH1),
      fontSizeH2: convertToMm(effectiveFontSizeH2),
      fontSizeH3: convertToMm(effectiveFontSizeH3),
      lineSpacing: convertToMm(effectiveLineSpacing),
      paragraphSpacing: convertToMm(effectiveParagraphSpacing),
      textAlign: effectiveTextAlign,
    };

    // Render each token
    tokens.forEach((token) => {
      if (token.type === 'paragraph') {
        const paragraphToken = token as Tokens.Paragraph;
        renderContext.y = y;
        y = renderParagraph(renderContext, paragraphToken.text);
      } else if (token.type === 'heading') {
        const headingToken = token as Tokens.Heading;
        renderContext.y = y;
        y = renderHeading(renderContext, headingToken.text, headingToken.depth);
      } else if (token.type === 'list') {
        const listToken = token as Tokens.List;
        listToken.items.forEach((item, index) => {
          renderContext.y = y;
          y = renderListItem(
            renderContext,
            item.text,
            listToken.ordered,
            index
          );
        });
      } else if (token.type === 'space') {
        y += convertToMm(effectiveLineSpacing);
      }

      // Check if we need a page break
      if (!allowPagebreak && shouldBreakPage(y, 0, pageHeight, yMargin)) {
        // If allowPagebreak is false and we're at the page boundary,
        // we should have started this block on a new page
        // This is a simplified implementation - in practice, you'd measure
        // the entire block height before starting
        console.warn(
          'LetterBlock content exceeds page boundary with allowPagebreak=false'
        );
      }
    });

    // Update current Y position
    setCurrentY(y);
  }, [
    content,
    children,
    allowPagebreak,
    paragraphSpacing,
    lineSpacing,
    fontFace,
    textSizeNormal,
    textSizeHeading1,
    textSizeHeading2,
    textSizeHeading3,
    textAlign,
    context,
  ]);

  return <div data-component="letter-block" data-allow-pagebreak={allowPagebreak} />;
};

export default LetterBlock;
