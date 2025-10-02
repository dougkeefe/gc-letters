import { useState } from 'react';
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

type ExampleTab = 'basic' | 'multipage' | 'custom';

function App() {
  const [activeTab, setActiveTab] = useState<ExampleTab>('basic');
  const [basicDownload, setBasicDownload] = useState<(() => void) | null>(null);
  const [multipageDownload, setMultipageDownload] = useState<(() => void) | null>(null);
  const [customDownload, setCustomDownload] = useState<(() => void) | null>(null);

  return (
    <div>
      <h1>GC Letters Test App</h1>
      <p>Test the gc-letters package locally before publishing to npm.</p>

      <div className="info-box">
        <h3>Testing Mode</h3>
        <p>
          <strong>Currently testing:</strong> Source code (via vite alias)
        </p>
        <p>
          To test the built package, run: <code>npm run test:package</code>
        </p>
      </div>

      <div className="tab-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'basic' ? 'active' : ''}
            onClick={() => setActiveTab('basic')}
          >
            Basic Example
          </button>
          <button
            className={activeTab === 'multipage' ? 'active' : ''}
            onClick={() => setActiveTab('multipage')}
          >
            Multi-Page Example
          </button>
          <button
            className={activeTab === 'custom' ? 'active' : ''}
            onClick={() => setActiveTab('custom')}
          >
            Custom Formatting
          </button>
        </div>

        <div className="example-container">
          {activeTab === 'basic' && <BasicExample onReady={setBasicDownload} download={basicDownload} />}
          {activeTab === 'multipage' && <MultiPageExample onReady={setMultipageDownload} download={multipageDownload} />}
          {activeTab === 'custom' && <CustomFormattingExample onReady={setCustomDownload} download={customDownload} />}
        </div>
      </div>
    </div>
  );
}

// Basic Example Component
function BasicExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Basic Letter Example</h2>
      <p>Demonstrates minimal setup with required props and simple markdown content.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Basic Letter PDF
      </button>

      <GcLetter
        fileName="basic-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
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

// Multi-Page Example Component
function MultiPageExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Multi-Page Letter Example</h2>
      <p>Demonstrates page numbering (skip-first), next page indicators, and letter tracking numbers.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Multi-Page Letter PDF
      </button>

      <GcLetter
        fileName="multi-page-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        showPageNumbers="skip-first"
        pageNumberFormat="Page #"
        pageNumberLocation="footer"
        pageNumberAlignment="center"
        showNextPage="skip-first"
        nextPageNumberFormat=".../#"
        nextPageNumberLocation="footer"
        nextPageNumberAlignment="right"
        letterNumber="2024-GC-00123"
        showLetterNumber={true}
        letterNumberLocation="footer"
        letterNumberAlignment="left"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock content={`# Official Notice

[Date: ${new Date().toLocaleDateString()}]

**File Number:** 2024-GC-00123

Dear Stakeholder,

This letter demonstrates the multi-page capabilities of the gc-letters package.`} />

        <SeparatorLine />

        <LetterBlock content={`## Section 1: Introduction

This is the first section of our multi-page letter. It contains important information that spans multiple pages.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`} />

        <LetterBlock content={`## Section 2: Details

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Subsection 2.1

Additional details that may span across pages. The page numbering will automatically handle multi-page content.

### Subsection 2.2

More content to ensure we have enough text to create multiple pages for testing purposes.`} />

        <LetterBlock content={`## Section 3: Conclusion

Thank you for reviewing this multi-page document. Notice how:

- Page numbers appear on all pages except the first
- Next page indicators show which page is coming next
- The letter tracking number appears on every page

Sincerely,

**Department Official**
Government of Canada`} />
      </GcLetter>
    </div>
  );
}

// Custom Formatting Example Component
function CustomFormattingExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Custom Formatting Example</h2>
      <p>Demonstrates typography customization, alignment options, and block-level overrides.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Custom Formatted PDF
      </button>

      <GcLetter
        fileName="custom-formatted-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        fontFace="Helvetica"
        textSizeNormal="12pt"
        textSizeHeading1="18pt"
        textSizeHeading2="16pt"
        textSizeHeading3="14pt"
        lineSpacing="8mm"
        paragraphSpacing="12mm"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock
          content={`# Custom Typography Letter`}
          textAlign="center"
        />

        <LetterBlock
          content={`[Date: ${new Date().toLocaleDateString()}]`}
          textAlign="right"
        />

        <LetterBlock content={`## Left Aligned Section

This section uses the default left alignment. It demonstrates standard paragraph formatting with custom line and paragraph spacing.

This is how most body text will appear in your letters.`} />

        <SeparatorLine />

        <LetterBlock
          content={`## Center Aligned Section

This section is centered for emphasis.

Perfect for titles or important announcements.`}
          textAlign="center"
        />

        <SeparatorLine />

        <LetterBlock
          content={`## Right Aligned Section

This section is right-aligned.

Often used for dates or signatures.`}
          textAlign="right"
        />

        <SeparatorLine />

        <LetterBlock
          content={`## Fully Justified Section

This section uses full justification, which means text is aligned to both the left and right margins. This creates a clean, professional appearance and is commonly used in formal government documents. The spacing between words is adjusted to ensure both edges are flush.`}
          textAlign="full"
        />

        <LetterBlock
          content={`**Custom Font Example**

This block uses a larger font size to demonstrate block-level typography overrides.`}
          textSizeNormal="14pt"
        />

        <LetterBlock
          content={`Thank you for reviewing these formatting options.

Sincerely,

Design Team`}
        />
      </GcLetter>
    </div>
  );
}

export default App;
