/**
 * Sample letter configurations for visual testing and verification
 * These can be rendered to PDFs for manual FIP compliance checking
 */

import React from 'react';
import GcLetter from '../../components/GcLetter';
import LetterBlock from '../../components/LetterBlock';
import SeparatorLine from '../../components/SeparatorLine';

/**
 * Basic letter with minimal content
 */
export const BasicLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="basic-letter"
    deptSignature="https://example.com/signature.png"
    onReady={onReady}
  >
    <LetterBlock content="# Basic Letter

This is a simple letter with minimal content to test basic rendering.

Thank you for your attention to this matter." />
  </GcLetter>
);

/**
 * Multi-page letter with extensive content
 */
export const LongLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="long-letter"
    deptSignature="https://example.com/signature.png"
    showPageNumbers={true}
    pageNumberFormat="-#-"
    showNextPage={true}
    nextPageNumberFormat=".../#"
    onReady={onReady}
  >
    <LetterBlock content="# Multi-Page Letter Test

This letter contains extensive content to test page breaking functionality." />

    {Array.from({ length: 10 }).map((_, i) => (
      <LetterBlock key={i} content={`## Section ${i + 1}

This is section ${i + 1} of the letter. It contains multiple paragraphs to ensure that page breaks work correctly when content exceeds a single page.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Key points for this section:
- First important point about section ${i + 1}
- Second critical detail to remember
- Third consideration for review

The content should flow naturally across pages while maintaining proper formatting and spacing.`} />
    ))}
  </GcLetter>
);

/**
 * Letter with custom typography
 */
export const CustomTypographyLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="custom-typography"
    deptSignature="https://example.com/signature.png"
    fontFace="Times"
    textSizeNormal="12pt"
    textSizeHeading1="18pt"
    paragraphSpacing="12mm"
    lineSpacing="8mm"
    onReady={onReady}
  >
    <LetterBlock content="# Custom Typography Letter

This letter uses Times font with custom spacing to demonstrate typography flexibility.

The paragraph spacing and line spacing have been adjusted for a different visual appearance." />
  </GcLetter>
);

/**
 * Letter with different text alignments
 */
export const AlignmentLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="alignment-test"
    deptSignature="https://example.com/signature.png"
    onReady={onReady}
  >
    <LetterBlock content="# Left Aligned (Default)

This content is left-aligned, which is the default alignment for letter content." textAlign="left" />

    <SeparatorLine />

    <LetterBlock content="## Center Aligned

This content is center-aligned to demonstrate alignment options." textAlign="center" />

    <SeparatorLine />

    <LetterBlock content="### Right Aligned

This content is right-aligned for testing purposes." textAlign="right" />

    <SeparatorLine />

    <LetterBlock content="#### Full Justification

This content uses full justification, which spreads the text evenly across the line width. This is useful for formal documents that require a professional appearance with aligned left and right margins." textAlign="full" />
  </GcLetter>
);

/**
 * Letter with lists and formatting
 */
export const FormattedLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="formatted-letter"
    deptSignature="https://example.com/signature.png"
    onReady={onReady}
  >
    <LetterBlock content="# Letter with Formatting

This letter demonstrates various markdown formatting options.

## Unordered List

- First item in the list
- Second item with more detail
- Third item for completeness

## Ordered List

1. Primary consideration
2. Secondary factor
3. Final point

## Mixed Content

This paragraph follows the lists and demonstrates **bold text** and *italic text* formatting within regular content." />
  </GcLetter>
);

/**
 * Letter with page numbers and metadata
 */
export const MetadataLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="metadata-letter"
    deptSignature="https://example.com/signature.png"
    showPageNumbers={true}
    pageNumberFormat="Page #"
    pageNumberLocation="footer"
    pageNumberAlignment="center"
    showLetterNumber={true}
    letterNumber="DPT-2024-001"
    letterNumberLocation="footer"
    letterNumberAlignment="right"
    letterVersion="1.0"
    onReady={onReady}
  >
    <LetterBlock content="# Letter with Metadata

This letter includes page numbers and a letter tracking number in the footer.

The page number appears in the center, while the letter number appears on the right side of the footer." />
  </GcLetter>
);

/**
 * Letter with various page types
 */
export const PageTypeLetter = ({ onReady, pageType }: {
  onReady?: (download: () => void) => void;
  pageType: 'letter' | 'legal' | 'a4';
}) => (
  <GcLetter
    fileName={`${pageType}-page-type`}
    deptSignature="https://example.com/signature.png"
    pageType={pageType}
    onReady={onReady}
  >
    <LetterBlock content={`# ${pageType.toUpperCase()} Page Type

This letter uses the ${pageType} page format to demonstrate different page sizes.

Page dimensions vary based on the selected format to accommodate different regional standards.`} />
  </GcLetter>
);

/**
 * Letter with separator lines
 */
export const SeparatorLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="separator-letter"
    deptSignature="https://example.com/signature.png"
    onReady={onReady}
  >
    <LetterBlock content="# Section One

This is the first section of the letter." />

    <SeparatorLine />

    <LetterBlock content="# Section Two

This is the second section, separated by a horizontal line." />

    <SeparatorLine />

    <LetterBlock content="# Section Three

This is the final section, demonstrating multiple separators." />
  </GcLetter>
);

/**
 * Minimal edge case - very short letter
 */
export const MinimalLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => (
  <GcLetter
    fileName="minimal-letter"
    deptSignature="https://example.com/signature.png"
    onReady={onReady}
  >
    <LetterBlock content="Short letter." />
  </GcLetter>
);

/**
 * Edge case - letter with very long single paragraph
 */
export const LongParagraphLetter = ({ onReady }: { onReady?: (download: () => void) => void }) => {
  const longText = Array(200).fill('This is a very long paragraph with repeated content to test text wrapping and page breaking with continuous content.').join(' ');

  return (
    <GcLetter
      fileName="long-paragraph"
      deptSignature="https://example.com/signature.png"
      onReady={onReady}
    >
      <LetterBlock content={`# Long Paragraph Test

${longText}`} />
    </GcLetter>
  );
};
