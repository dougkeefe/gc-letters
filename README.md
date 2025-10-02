# gc-letters

[![npm version](https://img.shields.io/npm/v/gc-letters.svg)](https://www.npmjs.com/package/gc-letters)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An npm package for Government of Canada departments to generate Federal Identity Program (FIP) compliant letters as PDFs directly in the browser.

## Features

- ✅ **FIP Compliant** - Follows Government of Canada Federal Identity Program standards
- ✅ **Browser-Based** - No server required; generates PDFs client-side using jsPDF
- ✅ **Markdown Support** - Write letter content in markdown for easy formatting
- ✅ **React Components** - Simple, declarative API using React
- ✅ **Flexible Typography** - Control fonts, sizes, spacing at document and block levels
- ✅ **Page Management** - Automatic page breaks, page numbering, and next-page indicators
- ✅ **Letter Metadata** - Support for letter numbers, versions, and tracking
- ✅ **Multiple Page Sizes** - Letter, Legal, and A4 formats
- ✅ **TypeScript** - Full TypeScript support with type definitions

## Installation

```bash
npm install gc-letters
```

### Peer Dependencies

Requires React 17 or 18:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { GcLetter, LetterBlock } from 'gc-letters';

function MyLetter() {
  const [downloadFn, setDownloadFn] = useState(null);

  return (
    <div>
      <button onClick={() => downloadFn?.()}>
        Download PDF
      </button>

      <GcLetter
        fileName="my-letter"
        deptSignature="https://example.com/signature.png"
        onReady={(download) => setDownloadFn(() => download)}
      >
        <LetterBlock content={`# Dear Recipient

This is my letter written in **markdown**.

## Key Points

- First point
- Second point
- Third point

Thank you for your attention.`} />
      </GcLetter>
    </div>
  );
}
```

## Components

### GcLetter

Main wrapper component that handles document-level settings and PDF generation.

```tsx
<GcLetter
  fileName="my-letter"                    // Required: PDF filename
  deptSignature="https://..."              // Required: Department signature URL
  pageType="letter"                        // Optional: 'letter' | 'legal' | 'a4'
  showPageNumbers={true}                   // Optional: Display page numbers
  onReady={(download) => download()}       // Optional: Callback with download function
>
  {children}
</GcLetter>
```

**See [API Reference](./docs/API.md) for complete props documentation.**

### LetterBlock

Content section component for rendering markdown.

```tsx
<LetterBlock
  content="# Heading\n\nParagraph text"   // Markdown content
  allowPagebreak={true}                    // Allow page breaks
  textAlign="left"                         // Override alignment
/>
```

**Supported Markdown**:
- Headings: `#`, `##`, `###`
- Bold: `**text**`
- Italic: `*text*`
- Lists: `- item` or `1. item`

### SeparatorLine

Horizontal line for visual separation.

```tsx
<SeparatorLine />
```

## Examples

### Basic Letter

```tsx
<GcLetter fileName="basic" deptSignature="https://...">
  <LetterBlock content="Simple letter content." />
</GcLetter>
```

### Multi-Page with Page Numbers

```tsx
<GcLetter
  fileName="multi-page"
  deptSignature="https://..."
  showPageNumbers="skip-first"
  pageNumberFormat="Page #"
  showNextPage={true}
>
  <LetterBlock content={longContent} />
</GcLetter>
```

### Custom Formatting

```tsx
<GcLetter
  fileName="formatted"
  deptSignature="https://..."
  fontFace="Times"
  textSizeNormal="12pt"
  paragraphSpacing="15mm"
>
  <LetterBlock content="# Title" textAlign="center" />
  <LetterBlock content="Body text" />
  <LetterBlock content="Signature" textAlign="right" />
</GcLetter>
```

**More examples**: See [examples/](./examples/) directory

## Documentation

- 📖 [API Reference](./docs/API.md) - Complete component and prop documentation
- 📘 [Usage Guide](./docs/USAGE_GUIDE.md) - Practical examples and patterns
- 🍁 [FIP Compliance Guide](./docs/FIP_COMPLIANCE.md) - Federal Identity Program standards
- 🔧 [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

## FIP Compliance

This package helps create letters that comply with the Government of Canada's Federal Identity Program:

**Requirements**:
- ✅ Helvetica typeface (default)
- ✅ Department signature with flag symbol
- ✅ Appropriate margins (38mm × 13mm default)
- ✅ Bilingual support
- ✅ Canada wordmark (in department signature)

**Read the [FIP Compliance Guide](./docs/FIP_COMPLIANCE.md) for detailed requirements.**

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- **Not supported**: Internet Explorer

## TypeScript

Fully typed with TypeScript. Import types:

```tsx
import type { GcLetterProps, LetterBlockProps, PageType, Alignment } from 'gc-letters';
```

## Testing

The package includes comprehensive tests:

```bash
npm test              # Run all tests
npm test -- --coverage  # Run with coverage report
```

**Test Coverage**:
- 124 tests passing
- 87%+ coverage on utility functions
- Visual test samples for manual verification

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Type check
npm run typecheck

# Lint
npm run lint
```

## Important Notes

### Component Nesting

⚠️ **LetterBlock components cannot be nested**. Each must be a direct child of GcLetter:

```tsx
// ✅ Correct
<GcLetter {...props}>
  <LetterBlock content="First" />
  <LetterBlock content="Second" />
</GcLetter>

// ❌ Incorrect
<GcLetter {...props}>
  <LetterBlock>
    <LetterBlock /> {/* Will throw error */}
  </LetterBlock>
</GcLetter>
```

### Image Loading

**Supported image formats**: PNG, JPG/JPEG only

⚠️ **SVG is not supported** by the underlying jsPDF library. Convert SVG files to PNG before use.

Department signatures must be accessible:
- Same domain: Works automatically
- External domain: Requires CORS configuration
- For testing: Use data URLs

```tsx
// ✅ Supported
deptSignature="signature.png"
deptSignature="signature.jpg"

// ❌ Not supported
deptSignature="signature.svg"  // Convert to PNG first
```

## Roadmap

Future enhancements being considered:

- [ ] Image embedding in markdown
- [ ] Table support
- [ ] Server-side rendering option
- [ ] Additional fonts
- [ ] Custom templates

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

## License

MIT © [Your Organization]

See [LICENSE](./LICENSE) file for details.

## Support

- 📖 [Documentation](./docs/)
- 🐛 [Report Issues](https://github.com/yourusername/gc-letters/issues)
- 💬 [Discussions](https://github.com/yourusername/gc-letters/discussions)

## Acknowledgments

Built with:
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
- [marked](https://github.com/markedjs/marked) - Markdown parsing
- [React](https://reactjs.org/) - Component framework

## Related Resources

- [Government of Canada Design System](https://design.canada.ca/)
- [FIP Design Standard](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/design-standard.html)
- [FIP Technical Specifications](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/federal-identity-program/technical-specifications.html)

---

Made with 🍁 for the Government of Canada
