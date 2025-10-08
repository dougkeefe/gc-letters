import React from 'react';
import { SeparatorLineProps } from '../types';

/**
 * SeparatorLine - Horizontal line separator component
 *
 * This is a passive component that holds props.
 * Actual rendering is done by GcLetter component.
 */
const SeparatorLine: React.FC<SeparatorLineProps> = () => {
  // This component doesn't render anything itself
  // GcLetter extracts the props and renders the content
  return null;
};

// Set displayName for reliable component identification
SeparatorLine.displayName = 'SeparatorLine';

export default SeparatorLine;
