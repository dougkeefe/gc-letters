# Release Notes - gc-letters v0.1.0

**Release Date:** October 6, 2024

## 🎉 Welcome to gc-letters v0.1.0!

We're excited to announce the first release of **gc-letters** - a browser-based PDF letter generator designed specifically for Government of Canada departments to create Federal Identity Program (FIP) compliant letters.

## 🌟 What's New

### Zero-Config FIP Compliance

Generate FIP-compliant letters with minimal setup:

```tsx
<GcLetter
  fileName="my-letter"
  deptSignature="https://example.com/signature.png"
>
  <LetterBlock>{`
    # Letter Title

    Your content here...
  `}</LetterBlock>
</GcLetter>
```

The package automatically includes:
- ✅ Canada wordmark (positioned per FIP specs)
- ✅ Proper margins (38mm × 13mm)
- ✅ Helvetica typography
- ✅ Professional layout

### Powerful Markdown Support

Write your letters in clean, readable markdown:

- **Headings** - `#`, `##`, `###`
- **Text formatting** - `**bold**`, `*italic*`
- **Lists** - Numbered and bulleted
- **Tables** - Full markdown table support with alignment

### Smart Page Management

- Automatic page breaks
- Configurable page numbering (skip first page option)
- Next page indicators (".../2" style)
- Content-aware breaks that respect the Canada wordmark

### Bilingual Ready

Full support for both official languages with proper formatting and date localization.

## 🚀 Key Features

### Components

1. **`<GcLetter>`** - Document wrapper with FIP defaults
2. **`<LetterBlock>`** - Markdown content sections
3. **`<SeparatorLine>`** - Visual dividers

### Page Formats

- Letter (8.5" × 11")
- Legal (8.5" × 14")
- A4 (210mm × 297mm)

### Typography Control

Configure fonts and spacing at both document and block levels:

```tsx
<GcLetter
  fontFace="Helvetica"
  textSizeNormal="11pt"
  lineSpacing="5mm"
  paragraphSpacing="5mm"
>
  <LetterBlock textSizeNormal="14pt">
    Larger text for this block
  </LetterBlock>
</GcLetter>
```

### Table Rendering

Create professional tables with markdown:

```tsx
<LetterBlock>{`
| Quarter | Revenue | Expenses | Net |
|---------|--------:|---------:|----:|
| Q1      | $2.5M   | $1.8M    | $0.7M |
| Q2      | $2.8M   | $2.1M    | $0.7M |
`}</LetterBlock>
```

## 📖 Getting Started

### Installation

```bash
npm install gc-letters react react-dom
```

### Quick Example

```tsx
import { GcLetter, LetterBlock } from 'gc-letters';

function MyLetter() {
  const [download, setDownload] = useState(null);

  return (
    <>
      <button onClick={() => download?.()}>Download PDF</button>

      <GcLetter
        fileName="my-letter"
        deptSignature="/dept-signature.png"
        onReady={setDownload}
      >
        <LetterBlock>{`
          # Official Notice

          This letter demonstrates gc-letters.

          ## Benefits

          - Browser-based (no server required)
          - FIP compliant by default
          - Markdown-powered content
        `}</LetterBlock>
      </GcLetter>
    </>
  );
}
```

## 💡 Pro Tips

### Template Literal Syntax

For multi-line markdown, use template literals `{`...`}` to preserve newlines:

```tsx
<LetterBlock>{`
  Line 1

  Line 2
`}</LetterBlock>
```

### Page Break Control

Force content to stay together:

```tsx
<LetterBlock allowPagebreak={false}>
  This entire block will move to the next page
  if it doesn't fit on the current one.
</LetterBlock>
```

### Letter Metadata

Add tracking numbers and page indicators:

```tsx
<GcLetter
  letterNumber="GC-2024-001"
  showLetterNumber={true}
  showPageNumbers="skip-first"
  showNextPage={true}
  // ... other props
>
```

## 📚 Resources

- **Documentation**: See `/docs` folder
- **Examples**: Check out the test-app for 4 complete examples
- **API Reference**: Full prop documentation in README.md
- **Issues**: Report bugs on GitHub

## 🧪 Quality Assurance

- ✅ 124+ test cases
- ✅ 87%+ code coverage
- ✅ TypeScript support
- ✅ ESLint + Prettier configured
- ✅ Pre-commit hooks enabled

## ⚠️ Important Notes

### Component Nesting

`<LetterBlock>` components must be direct children of `<GcLetter>`. Nesting is not supported.

### Image Requirements

- **Supported formats**: PNG, JPG/JPEG
- **Not supported**: SVG (convert to PNG first)
- **External images**: Require CORS configuration

### Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ❌ Internet Explorer (not supported)

## 🔮 What's Next

We're considering these enhancements for future releases:

- Image embedding in markdown content
- Server-side rendering option
- Additional font support
- Custom templates
- Advanced table features (merged cells, etc.)

## 🙋 Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/dougkeefe/gc-letters/issues)
- **Documentation**: Check the `/docs` folder
- **Examples**: Run the test-app locally

## 📝 Disclaimer

This project is currently a proof of concept and is not officially endorsed as a Government of Canada tool. Organizations should conduct their own compliance reviews before using this package in production environments.

---

**Made with 🍁 for the Government of Canada**

Thank you for using gc-letters! We hope this package simplifies your FIP-compliant letter generation workflow.
