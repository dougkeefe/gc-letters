/**
 * Custom Formatting Example
 *
 * This example demonstrates:
 * - Custom typography settings
 * - Different text alignments
 * - Block-level overrides
 * - Custom margins and spacing
 */

import React, { useState } from 'react';
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

function CustomFormattingExample() {
  const [downloadFn, setDownloadFn] = useState<(() => void) | null>(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Custom Formatting Example</h1>
      <p>This demonstrates custom typography and formatting options.</p>

      <button
        onClick={() => downloadFn?.()}
        disabled={!downloadFn}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: downloadFn ? 'pointer' : 'not-allowed',
          backgroundColor: downloadFn ? '#0066cc' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Download Formatted PDF
      </button>

      <GcLetter
        fileName="custom-formatted-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        fontFace="Times"
        textSizeNormal="12pt"
        textSizeHeading1="18pt"
        textSizeHeading2="15pt"
        paragraphSpacing="12mm"
        lineSpacing="8mm"
        xMargin="40mm"
        yMargin="15mm"
        onReady={(download) => setDownloadFn(() => download)}
      >
        {/* Centered Title */}
        <LetterBlock
          content="# OFFICIAL NOTICE"
          textAlign="center"
          textSizeHeading1="20pt"
        />

        <SeparatorLine />

        {/* Left-aligned body */}
        <LetterBlock
          content={`Date: ${new Date().toLocaleDateString()}

Reference: NOTICE-2024-001`}
          textAlign="left"
        />

        <LetterBlock content="## Subject: Important Policy Update

This letter demonstrates the use of custom formatting options available in the gc-letters package.

### Typography Customization

This document uses:
- **Font**: Times (instead of default Helvetica)
- **Text Size**: 12pt (instead of default 11pt)
- **Heading Size**: 18pt for H1, 15pt for H2
- **Margins**: 40mm horizontal, 15mm vertical
- **Line Spacing**: 8mm (instead of default 7mm)
- **Paragraph Spacing**: 12mm (instead of default 11mm)" />

        <SeparatorLine />

        {/* Centered important notice */}
        <LetterBlock
          content="## IMPORTANT NOTICE

This section is center-aligned for emphasis."
          textAlign="center"
        />

        <SeparatorLine />

        {/* Full justification */}
        <LetterBlock
          content="## Justified Text Example

This paragraph uses full justification, which means the text is aligned to both the left and right margins. Full justification creates a clean, professional appearance with straight edges on both sides of the text block. This is commonly used in formal documents and publications."
          textAlign="full"
        />

        <SeparatorLine />

        {/* Right-aligned signature section */}
        <LetterBlock
          content="Respectfully submitted,

[Signature]

John Doe
Director, Policy Division
Department Name"
          textAlign="right"
        />

        {/* Footer note with smaller text */}
        <LetterBlock
          content="*This document is for demonstration purposes only and does not constitute official correspondence.*"
          textSizeNormal="9pt"
          textAlign="center"
        />
      </GcLetter>
    </div>
  );
}

export default CustomFormattingExample;
