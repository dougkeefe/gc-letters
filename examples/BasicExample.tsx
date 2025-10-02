/**
 * Basic Example: Simple Letter Generation
 *
 * This example demonstrates the minimal setup needed to generate a letter.
 */

import React, { useState } from 'react';
import { GcLetter, LetterBlock } from 'gc-letters';

function BasicExample() {
  const [downloadFn, setDownloadFn] = useState<(() => void) | null>(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Basic Letter Example</h1>
      <p>Click the button to download a simple PDF letter.</p>

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
        Download PDF
      </button>

      <GcLetter
        fileName="basic-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        onReady={(download) => setDownloadFn(() => download)}
      >
        <LetterBlock content={`# Basic Letter

[Date: ${new Date().toLocaleDateString()}]

Dear Recipient,

This is a basic example of a letter generated using the gc-letters package.

The letter contains simple markdown formatting including **bold text** and *italic text*.

Thank you for your attention.

Sincerely,

Department Representative`} />
      </GcLetter>
    </div>
  );
}

export default BasicExample;
