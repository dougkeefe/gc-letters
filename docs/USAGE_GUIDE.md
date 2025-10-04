# Usage Guide

This guide provides practical examples and best practices for using the gc-letters package.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Basic Examples](#basic-examples)
- [Advanced Usage](#advanced-usage)
- [FIP Compliance](#fip-compliance)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Installation

```bash
npm install gc-letters
```

### Peer Dependencies

Ensure you have React installed:

```bash
npm install react react-dom
```

---

## Quick Start

### Minimal Letter

The simplest possible letter:

```tsx
import React from 'react';
import { GcLetter, LetterBlock } from 'gc-letters';

function SimpleLetter() {
  return (
    <GcLetter
      fileName="simple-letter"
      deptSignature="https://example.com/signature.png"
      onReady={(download) => download()}
    >
      <LetterBlock content="This is a simple letter." />
    </GcLetter>
  );
}

export default SimpleLetter;
```

### With Download Button

Control when the PDF downloads:

```tsx
import React, { useState } from 'react';
import { GcLetter, LetterBlock } from 'gc-letters';

function ControlledLetter() {
  const [downloadFn, setDownloadFn] = useState(null);

  return (
    <div>
      <button onClick={() => downloadFn && downloadFn()}>
        Download PDF
      </button>

      <GcLetter
        fileName="controlled-letter"
        deptSignature="https://example.com/signature.png"
        onReady={(download) => setDownloadFn(() => download)}
      >
        <LetterBlock content="Letter content here." />
      </GcLetter>
    </div>
  );
}
```

---

## Basic Examples

### Multi-Section Letter

```tsx
<GcLetter
  fileName="multi-section"
  deptSignature="https://example.com/signature.png"
>
  <LetterBlock content="# Introduction

This is the introduction section of the letter." />

  <SeparatorLine topMargin="8mm" bottomMargin="12mm" />

  <LetterBlock content="## Main Content

This section contains the main body of the letter with important details." />

  <SeparatorLine />

  <LetterBlock content="## Conclusion

Thank you for your attention to this matter." />
</GcLetter>
```

### Letter with Lists

```tsx
<LetterBlock content="# Action Items

Please complete the following tasks:

1. Review the attached document
2. Provide feedback by end of week
3. Schedule follow-up meeting

## Additional Notes

- All deadlines are firm
- Contact us with any questions
- Reference number: REF-2024-001" />
```

### Letter with Tables

```tsx
<LetterBlock content={`# Quarterly Budget Report

## Revenue Summary

| Quarter | Revenue | Expenses | Net Income |
|:--------|--------:|---------:|-----------:|
| Q1 2024 | $2.5M   | $1.8M    | $0.7M      |
| Q2 2024 | $2.8M   | $2.1M    | $0.7M      |
| Q3 2024 | $3.1M   | $2.3M    | $0.8M      |
| Q4 2024 | $2.6M   | $2.0M    | $0.6M      |
| **Total** | **$11.0M** | **$8.2M** | **$2.8M** |

All figures are preliminary and subject to audit.
`} />
```

### Custom Table Styling

```tsx
<LetterBlock
  content={`| Department | Allocation | Percentage |
|:-----------|----------:|-----------:|
| Operations | $5.2M | 47% |
| Research   | $3.8M | 35% |
| Admin      | $2.0M | 18% |`}
  tableTheme="striped"
  tableHeaderBold={true}
  tableHeaderFillColor={[220, 230, 240]}
  tableBorderColor={[150, 150, 150]}
/>
```

### Custom Typography

```tsx
<GcLetter
  fileName="custom-typography"
  deptSignature="https://example.com/signature.png"
  fontFace="Times"
  textSizeNormal="12pt"
  paragraphSpacing="12mm"
  lineSpacing="8mm"
>
  <LetterBlock content="This letter uses Times font with custom spacing." />
</GcLetter>
```

---

## Advanced Usage

### Multi-Page Letter with Page Numbers

```tsx
<GcLetter
  fileName="multi-page"
  deptSignature="https://example.com/signature.png"
  showPageNumbers={true}
  pageNumberFormat="Page # of 5"
  pageNumberLocation="footer"
  pageNumberAlignment="center"
  showNextPage={true}
  nextPageNumberFormat="Continued on page #"
>
  {/* Long content that spans multiple pages */}
  <LetterBlock content={longContent} />
</GcLetter>
```

### Letter Number Tracking

```tsx
<GcLetter
  fileName="tracked-letter"
  deptSignature="https://example.com/signature.png"
  showLetterNumber={true}
  letterNumber="DPT-2024-00123"
  letterNumberLocation="footer"
  letterNumberAlignment="right"
  letterVersion="1.2"
>
  <LetterBlock content="Official correspondence with tracking." />
</GcLetter>
```

### Block-Level Typography Overrides

```tsx
<GcLetter
  fileName="mixed-typography"
  deptSignature="https://example.com/signature.png"
  textAlign="left"
>
  <LetterBlock
    content="# Title (Centered)"
    textAlign="center"
  />

  <LetterBlock
    content="Standard left-aligned body text."
  />

  <LetterBlock
    content="**Important Notice** (Centered and Bold)"
    textAlign="center"
  />

  <LetterBlock
    content="Signature section"
    textAlign="right"
  />
</GcLetter>
```

### Preventing Page Breaks

Use `allowPagebreak={false}` for critical content:

```tsx
<LetterBlock
  allowPagebreak={false}
  content="# Critical Section

This content must stay together on one page.
Do not break across pages."
/>
```

⚠️ **Warning**: Content may overflow if it doesn't fit on a single page.

### Different Page Sizes

```tsx
// North American Letter (default)
<GcLetter pageType="letter" {...props}>

// Legal Size
<GcLetter pageType="legal" {...props}>

// International A4
<GcLetter pageType="a4" {...props}>
```

---

## FIP Compliance

### Required Elements

For Federal Identity Program compliance, your letter should include:

1. **Department Signature** (required)
   ```tsx
   deptSignature="https://your-dept.gc.ca/signature.png"
   ```

2. **Helvetica Font** (recommended)
   ```tsx
   fontFace="Helvetica"  // This is the default
   ```

3. **Appropriate Margins** (defaults are FIP-compliant)
   ```tsx
   xMargin="38mm"  // Default horizontal margin
   yMargin="13mm"  // Default vertical margin
   ```

### FIP-Compliant Example

```tsx
<GcLetter
  fileName="fip-compliant-letter"
  deptSignature="https://your-dept.gc.ca/bilingual-signature.png"
  fontFace="Helvetica"
  pageType="letter"
  xMargin="38mm"
  yMargin="13mm"
  textSizeNormal="11pt"
  showPageNumbers="skip-first"
  pageNumberFormat="-#-"
>
  <LetterBlock content="# Department Name / Nom du ministère

[Date]

[Recipient Name]
[Address]

Dear [Recipient],

[Letter body in English]

Sincerely,

[Signature]
[Name]
[Title]" />
</GcLetter>
```

### Bilingual Letters

For bilingual correspondence:

```tsx
<GcLetter {...props}>
  <LetterBlock content="# English Section

English content here." />

  <SeparatorLine />

  <LetterBlock content="# Section française

Contenu français ici." />
</GcLetter>
```

---

## Common Patterns

### Data Tables in Letters

Presenting structured data in professional tables:

```tsx
function BudgetLetter({ fiscalYear, departments }) {
  const tableContent = `
## ${fiscalYear} Budget Allocation

| Department | Q1 | Q2 | Q3 | Q4 | Total |
|:-----------|---:|---:|---:|---:|------:|
${departments.map(d =>
  `| ${d.name} | ${d.q1} | ${d.q2} | ${d.q3} | ${d.q4} | ${d.total} |`
).join('\n')}
  `;

  return (
    <GcLetter fileName="budget-report" {...props}>
      <LetterBlock content="# Budget Report" />
      <LetterBlock
        content={tableContent}
        tableTheme="grid"
        tableHeaderBold={true}
      />
      <LetterBlock content="Please review and approve." />
    </GcLetter>
  );
}
```

### Form Letter Generator

```tsx
function FormLetter({ recipientName, refNumber, details }) {
  const content = `# Reference: ${refNumber}

Dear ${recipientName},

${details}

Please contact us if you have any questions.

Sincerely,
Department Representative`;

  return (
    <GcLetter
      fileName={`letter-${refNumber}`}
      deptSignature="https://example.com/sig.png"
      onReady={(download) => download()}
    >
      <LetterBlock content={content} />
    </GcLetter>
  );
}
```

### Template System

```tsx
const templates = {
  approval: (data) => `# Approval Notice

Your request ${data.requestId} has been approved.

Effective date: ${data.effectiveDate}`,

  rejection: (data) => `# Notice

We regret to inform you that request ${data.requestId} has been declined.

Reason: ${data.reason}`,
};

function TemplatedLetter({ type, data }) {
  return (
    <GcLetter fileName={`${type}-letter`} {...props}>
      <LetterBlock content={templates[type](data)} />
    </GcLetter>
  );
}
```

### Batch Generation

```tsx
function BatchLetters({ recipients }) {
  return (
    <>
      {recipients.map((recipient) => (
        <GcLetter
          key={recipient.id}
          fileName={`letter-${recipient.id}`}
          deptSignature="https://example.com/sig.png"
          onReady={(download) => {
            // Delay downloads to avoid browser blocking
            setTimeout(download, recipients.indexOf(recipient) * 1000);
          }}
        >
          <LetterBlock content={`Dear ${recipient.name},\n\n...`} />
        </GcLetter>
      ))}
    </>
  );
}
```

---

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed troubleshooting guidance.

### Quick Fixes

**PDF won't download**
```tsx
// Make sure onReady callback is called
<GcLetter
  onReady={(download) => {
    console.log('PDF ready');
    download();
  }}
  {...props}
>
```

**Image not loading**
```tsx
// Check CORS and URL accessibility
// Use data URLs for testing:
deptSignature="data:image/png;base64,iVBORw0KG..."
```

**Content cut off**
```tsx
// Check margins aren't too large
xMargin="38mm"  // Not "380mm"
```

**Nested LetterBlock error**
```tsx
// ❌ Don't do this
<LetterBlock>
  <LetterBlock />
</LetterBlock>

// ✅ Do this instead
<LetterBlock />
<LetterBlock />
```

---

## Next Steps

- Read the [API Reference](./API.md) for complete prop documentation
- Review [FIP Compliance Guide](./FIP_COMPLIANCE.md) for federal requirements
- Check [Examples](../src/__tests__/visual/sampleLetters.tsx) for more patterns
- See [Troubleshooting](./TROUBLESHOOTING.md) for common issues
