// Type definitions for GC Letters

export type PageType = 'letter' | 'legal' | 'a4';
export type TextAlign = 'left' | 'right' | 'center' | 'full';
export type HeaderFooterLocation = 'header' | 'footer';
export type Alignment = 'left' | 'center' | 'right';
export type ShowPageNumbers = boolean | 'skip-first';

export interface GcLetterProps {
  // Required
  fileName: string;
  deptSignature: string;
  children: React.ReactNode;

  // Optional callbacks
  onReady?: (downloadFn: () => void) => void;

  // Layout
  pageType?: PageType;
  xMargin?: string;
  yMargin?: string;

  // Typography
  fontFace?: string;
  textSizeNormal?: string;
  textSizeHeading1?: string;
  textSizeHeading2?: string;
  textSizeHeading3?: string;
  textAlign?: TextAlign;
  paragraphSpacing?: string;
  lineSpacing?: string;

  // Page Numbers
  showPageNumbers?: ShowPageNumbers;
  pageNumberFormat?: string;
  pageNumberLocation?: HeaderFooterLocation;
  pageNumberAlignment?: Alignment;

  // Next Page Indicators
  showNextPage?: ShowPageNumbers;
  nextPageNumberFormat?: string;
  nextPageNumberLocation?: HeaderFooterLocation;
  nextPageNumberAlignment?: Alignment;

  // Letter Metadata
  letterVersion?: string;
  letterNumber?: string;
  showLetterNumber?: boolean;
  letterNumberLocation?: HeaderFooterLocation;
  letterNumberAlignment?: Alignment;

  // Canada Wordmark (FIP requirement)
  showCanadaWordmark?: boolean;
  canadaWordmarkPath?: string;
}

export interface LetterBlockProps {
  content?: string;
  children?: React.ReactNode;
  allowPagebreak?: boolean;

  // Typography overrides
  paragraphSpacing?: string;
  lineSpacing?: string;
  fontFace?: string;
  textSizeNormal?: string;
  textSizeHeading1?: string;
  textSizeHeading2?: string;
  textSizeHeading3?: string;
  textAlign?: TextAlign;
}

export interface SeparatorLineProps {}

export interface LetterContext {
  pageType: PageType;
  xMargin: string;
  yMargin: string;
  fontFace: string;
  textSizeNormal: string;
  textSizeHeading1: string;
  textSizeHeading2: string;
  textSizeHeading3: string;
  textAlign: TextAlign;
  paragraphSpacing: string;
  lineSpacing: string;
}
