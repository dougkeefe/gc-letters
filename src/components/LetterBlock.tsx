import React from 'react';
import { LetterBlockProps } from '../types';

/**
 * LetterBlock - Content section component for letters
 *
 * This is a passive component that holds props.
 * Actual rendering is done by GcLetter component.
 */
const LetterBlock: React.FC<LetterBlockProps> = () => {
  // This component doesn't render anything itself
  // GcLetter extracts the props and renders the content
  return null;
};

// Set displayName for reliable component identification
LetterBlock.displayName = 'LetterBlock';

export default LetterBlock;
