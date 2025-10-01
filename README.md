# GC Letters

An npm package that makes it easy for Government of Canada departments to generate Federal Identity Program (FIP) compliant letters as PDFs.

## Features

- **FIP Standards Compliant** - Generates letters following Government of Canada Federal Identity Program guidelines
- **Browser-Based** - No server-side dependencies; PDFs are generated in-browser using jsPDF
- **Markdown Support** - Write letter content in markdown for easy formatting
- **Flexible Layout** - Control page breaks, margins, fonts, and spacing at document and block levels
- **Department Branding** - Include department letterhead signatures
- **Page Numbering** - Multiple options for page numbers and next-page indicators

## Installation

```bash
npm install gc-letters
```

## Quick Start

```jsx
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

function MyLetter() {
  return (
    <GcLetter
      file-name="my-letter.pdf"
      dept-signature="https://example.com/dept-logo.png"
      show-page-numbers={true}
    >
      <LetterBlock>
        # Dear Recipient

        This is the body of my letter written in **markdown**.

        - Point one
        - Point two
      </LetterBlock>

      <SeparatorLine />

      <LetterBlock allow-pagebreak={false}>
        ## Closing Remarks

        This block won't break across pages.
      </LetterBlock>
    </GcLetter>
  );
}
```

## Components

### `<GcLetter>`

The main wrapper component for your letter. Handles document-level settings.

**Required Parameters:**
- `file-name` - The output PDF filename
- `dept-signature` - URL to department letterhead PNG

**Optional Parameters:**

*Layout:*
- `page-type` - Paper size: `letter` (default), `legal`, `a4`
- `x-margin` - Left/right margins (default: `38mm`)
- `y-margin` - Top/bottom margins (default: `13mm`)

*Typography:*
- `font-face` - Font family (default: `Helvetica Light`)
- `text-size-normal` - Body text size (default: `11pt`)
- `text-size-heading-1` - H1 size (default: `16pt`)
- `text-size-heading-2` - H2 size (default: `14pt`)
- `text-size-heading-3` - H3 size (default: `12pt`)
- `text-align` - Text alignment: `left` (default), `right`, `center`, `full`
- `paragraph-spacing` - Space between paragraphs (default: `11mm`)
- `line-spacing` - Space between lines (default: `7mm`)

*Page Numbers:*
- `show-page-numbers` - Display page numbers: `false` (default), `true`, `skip-first`
- `page-number-format` - Format string with `#` as placeholder (default: `-#-`)
- `page-number-location` - Position: `header` (default), `footer`
- `page-number-alignment` - Alignment: `center` (default), `left`, `right`

*Next Page Indicators:*
- `show-next-page` - Show next page indicator: `false` (default), `true`, `skip-first`
- `next-page-number-format` - Format string (default: `.../#`)
- `next-page-number-location` - Position: `header` (default), `footer`
- `next-page-number-alignment` - Alignment: `center` (default), `left`, `right`

*Letter Metadata:*
- `letter-version` - Track letter version
- `letter-number` - Department letter number
- `show-letter-number` - Display letter number: `false` (default), `true`
- `letter-number-location` - Position: `footer` (default), `header`
- `letter-number-alignment` - Alignment: `right` (default), `left`, `center`

### `<LetterBlock>`

A content section within your letter. Use markdown for formatting.

**Optional Parameters:**
- `content` - Markdown content (alternative to using children)
- `allow-pagebreak` - Allow content to break across pages: `true` (default), `false`
- Typography overrides: `paragraph-spacing`, `line-spacing`, `font-face`, `text-size-*`, `text-align`

### `<SeparatorLine>`

Adds a horizontal separator line to your document. No parameters.

## Important Notes

- **Do NOT nest components** - Never place a `<LetterBlock>` inside another `<LetterBlock>`
- **Markdown content only** - All letter content should be markdown inside `<LetterBlock>` components
- **Browser-based** - No additional hosting or server configuration required
- **Security** - Letters are generated client-side with no external dependencies in production

## Future Enhancements

- Image support in markdown
- Table rendering
- Server-side rendering option for API-based generation

## License

MIT

## Contributing

This project is intended to be open source. Contributions are welcome.
