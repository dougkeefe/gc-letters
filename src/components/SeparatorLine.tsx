import React, { useEffect } from 'react';
import { SeparatorLineProps } from '../types';
import { useLetterContext } from '../context/LetterContext';
import { convertToMm } from '../utils/pageCalculator';

/**
 * SeparatorLine - Horizontal line separator component
 *
 * Renders a visual separator line in the document.
 */
const SeparatorLine: React.FC<SeparatorLineProps> = () => {
  const context = useLetterContext();

  useEffect(() => {
    if (!context || !context.pdf) return;

    const { pdf, currentY, setCurrentY, pageWidth } = context;

    // Calculate margins
    const xMargin = convertToMm(context.xMargin);
    const lineWidth = pageWidth - 2 * xMargin;

    // Add some spacing before the line
    const spacingBefore = 3; // mm
    const spacingAfter = 3; // mm
    const lineThickness = 0.5; // mm

    const y = currentY + spacingBefore;

    // Draw the horizontal line
    pdf.setLineWidth(lineThickness);
    pdf.line(xMargin, y, xMargin + lineWidth, y);

    // Update Y position
    setCurrentY(y + spacingAfter);
  }, [context]);

  return <div data-component="separator-line" />;
};

export default SeparatorLine;
