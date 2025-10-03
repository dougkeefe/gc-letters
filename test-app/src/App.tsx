import { useState } from 'react';
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

type ExampleTab = 'basic' | 'multipage' | 'custom' | 'table';

function App() {
  const [activeTab, setActiveTab] = useState<ExampleTab>('basic');
  const [basicDownload, setBasicDownload] = useState<(() => void) | null>(null);
  const [multipageDownload, setMultipageDownload] = useState<(() => void) | null>(null);
  const [customDownload, setCustomDownload] = useState<(() => void) | null>(null);
  const [tableDownload, setTableDownload] = useState<(() => void) | null>(null);

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
            FIP-Compliant Letter
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
          <button
            className={activeTab === 'table' ? 'active' : ''}
            onClick={() => setActiveTab('table')}
          >
            Markdown Table
          </button>
        </div>

        <div className="example-container">
          {activeTab === 'basic' && <BasicExample onReady={setBasicDownload} download={basicDownload} />}
          {activeTab === 'multipage' && <MultiPageExample onReady={setMultipageDownload} download={multipageDownload} />}
          {activeTab === 'custom' && <CustomFormattingExample onReady={setCustomDownload} download={customDownload} />}
          {activeTab === 'table' && <TableExample onReady={setTableDownload} download={tableDownload} />}
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
      <h2>FIP-Compliant Letter Example</h2>
      <p>A complete example demonstrating Federal Identity Program (FIP) standards with realistic government correspondence about open source software adoption.</p>

      <div className="info-box">
        <h3>FIP Elements Demonstrated:</h3>
        <ul>
          <li>✅ Department signature (Veterans Affairs Canada)</li>
          <li>✅ Canada wordmark (bottom left, first page only)</li>
          <li>✅ Letter tracking number (VAC-DPI-2024-003)</li>
          <li>✅ Proper margins and typography (Helvetica font)</li>
          <li>✅ Professional government letter format</li>
        </ul>
      </div>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download FIP-Compliant Letter PDF
      </button>

      <GcLetter
        fileName="open-source-initiative"
        deptSignature="/veterans-affairs-signature.png"
        showLetterNumber={false}
        letterNumber="VAC-DPI-2024-003"
        letterNumberLocation="footer"
        letterNumberAlignment="left"
        showPageNumbers={'skip-first'}

        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock content={`**Veterans Affairs Canada**

**Digital Policy and Innovation**

${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}

Dr. Sarah Chen
Director, Technology Modernization
Veterans Affairs Canada
66 Slater Street
Ottawa, ON K1A 0P4`} />

        <LetterBlock content={`Dear Dr. Chen,

**Re: Approval of Open Source Software Initiative**

I am pleased to inform you that the Digital Policy and Innovation team has approved your proposal to adopt open source software practices within Veterans Affairs Canada's digital services.`} />

        <LetterBlock content={`## Initiative Overview

Your initiative demonstrates exceptional alignment with the Government of Canada's Digital Standards and the Treasury Board Directive on Service and Digital. By embracing open source principles, we will:

- **Increase transparency** in how we deliver digital services to veterans
- **Reduce costs** through shared development and reusable code
- **Improve security** through community peer review and faster vulnerability patching
- **Foster innovation** by enabling collaboration across departments`} />

        <LetterBlock content={`## Approved Activities

The following activities have been approved for immediate implementation:

1. **Open Source Licensing**: All new software projects will use approved open source licenses (MIT, Apache 2.0, or GPL v3)
2. **Public Code Repositories**: Non-sensitive code will be published on GitHub under the @veterans-affairs-canada organization
3. **Community Engagement**: Developers are authorized to participate in relevant open source communities during work hours
4. **Documentation Standards**: All projects will maintain comprehensive README files and contribution guidelines`} />

        <SeparatorLine />

        <LetterBlock content={`## Budget Allocation

An annual budget of **$250,000** has been allocated to support:

- Open source tool licensing and hosting
- Developer training and certification programs
- Community event participation
- External contributor recognition and rewards`} />

        <LetterBlock content={`## Next Steps

Please proceed with the following:

1. Establish the Open Source Program Office by March 31, 2025
2. Develop internal contribution guidelines aligned with TBS policies
3. Provide quarterly reports on adoption metrics and community engagement
4. Schedule a department-wide information session on open source best practices`} />

        <LetterBlock content={`This initiative represents a significant step forward in modernizing our digital infrastructure while maintaining the highest standards of security and privacy for veterans' information.

Congratulations to you and your team on this important achievement. I look forward to seeing the positive impact of this work on veterans and their families.`} />

        <LetterBlock content={`Sincerely,

**Jean-Marc Dubois**
*Assistant Deputy Minister*
Digital Policy and Innovation
Veterans Affairs Canada

**cc:**
Chief Information Officer
Director General, Service Delivery
Privacy Commissioner`} textAlign="left" allowPagebreak={false} />
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
        deptSignature="/veterans-affairs-signature.png"
        showPageNumbers="skip-first"
        pageNumberFormat="Page #"
        pageNumberLocation="footer"
        pageNumberAlignment="center"
        showNextPage="skip-first"
        nextPageNumberFormat=".../#"
        nextPageNumberLocation="footer"
        nextPageNumberAlignment="right"
        letterNumber="2024-GC-00123"
        showLetterNumber={false}
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
        deptSignature="/veterans-affairs-signature.png"
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

// Table Example Component
function TableExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Markdown Table Example</h2>
      <p>Demonstrates markdown table rendering within a GcLetter component.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Table Example PDF
      </button>

      <GcLetter
        fileName="table-example"
        deptSignature="/veterans-affairs-signature.png"
        showPageNumbers="skip-first"
        pageNumberFormat="Page #"
        pageNumberLocation="footer"
        pageNumberAlignment="center"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock content={`# Budget Report FY 2024-2025

**Veterans Affairs Canada**
**Financial Planning Division**

${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}`} />

        <SeparatorLine />

        <LetterBlock content={`## Quarterly Budget Allocation

The following table outlines the approved budget allocation across our key program areas for the current fiscal year:`} />

        <LetterBlock content={`| Program Area | Q1 Budget | Q2 Budget | Q3 Budget | Q4 Budget | Total |
|--------------|-----------|-----------|-----------|-----------|-------|
| Veterans Services | $2.5M | $2.8M | $3.1M | $2.6M | $11.0M |
| Healthcare Support | $4.2M | $4.5M | $4.8M | $4.3M | $17.8M |
| Digital Transformation | $1.8M | $2.1M | $2.3M | $1.9M | $8.1M |
| Research & Development | $0.9M | $1.2M | $1.4M | $1.0M | $4.5M |
| Administrative | $1.1M | $1.0M | $1.2M | $1.1M | $4.4M |
| **Total** | **$10.5M** | **$11.6M** | **$12.8M** | **$10.9M** | **$45.8M** |`} />

        <LetterBlock content={`## Regional Distribution

Budget allocation by regional office:`} />

        <LetterBlock content={`| Region | Allocation | Percentage |
|--------|------------|------------|
| Atlantic | $8.2M | 18% |
| Quebec | $12.4M | 27% |
| Ontario | $15.6M | 34% |
| Prairies | $5.8M | 13% |
| Pacific | $3.8M | 8% |
| **Total** | **$45.8M** | **100%** |`} />

        <SeparatorLine topMargin="8mm" bottomMargin="8mm" />

        <LetterBlock content={`## Key Performance Indicators

Current quarter performance metrics:`} />

        <LetterBlock content={`| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Service Response Time | < 48hrs | 36hrs | ✅ Met |
| Client Satisfaction | > 85% | 89% | ✅ Exceeded |
| Budget Utilization | 90-95% | 93% | ✅ On Track |
| Digital Adoption | > 70% | 68% | ⚠️ Below Target |`} />

        <LetterBlock content={`## Summary

The budget allocation for FY 2024-2025 reflects our commitment to delivering exceptional services to Canadian veterans while investing in digital transformation and innovation.

For questions regarding this report, please contact the Financial Planning Division.

**Approved by:**

**Michelle Tremblay**
*Director, Financial Planning*
Veterans Affairs Canada`} textAlign="left" />
      </GcLetter>
    </div>
  );
}

export default App;
