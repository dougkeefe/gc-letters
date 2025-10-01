/**
 * GC Letters - Federal Identity Program compliant letter generation
 *
 * An npm package for Government of Canada departments to generate
 * FIP-compliant letters as PDFs.
 */

export { default as GcLetter } from './components/GcLetter';
export { default as LetterBlock } from './components/LetterBlock';
export { default as SeparatorLine } from './components/SeparatorLine';

export type {
  GcLetterProps,
  LetterBlockProps,
  SeparatorLineProps,
  PageType,
  TextAlign,
  HeaderFooterLocation,
  Alignment,
  ShowPageNumbers,
} from './types';
