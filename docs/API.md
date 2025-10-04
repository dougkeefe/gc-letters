# API Reference

Complete API documentation for the gc-letters package.

## Table of Contents

- [Components](#components)
  - [GcLetter](#gcletter)
  - [LetterBlock](#letterblock)
  - [SeparatorLine](#separatorline)
- [Types](#types)
- [Utilities](#utilities)

---

## Components

### GcLetter

Main wrapper component for FIP-compliant letters. Handles document-level settings and coordinates PDF generation using jsPDF.

#### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `fileName` | `string` | Name for the downloaded PDF file (`.pdf` extension added automatically) |
| `deptSignature` | `string` | URL or path to the department signature image. **Supported formats: PNG, JPG/JPEG only.** SVG is not supported. |
| `children` | `React.ReactNode` | Letter content (typically LetterBlock and SeparatorLine components) |

#### Optional Props - Page Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageType` | `'letter' \| 'legal' \| 'a4'` | `'letter'` | Page size format |
| `xMargin` | `string` | `'38mm'` | Horizontal margins (supports mm, pt, in, px) |
| `yMargin` | `string` | `'13mm'` | Vertical margins (supports mm, pt, in, px) |

#### Optional Props - Typography

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fontFace` | `string` | `'Helvetica'` | Font family (jsPDF built-in fonts: Helvetica, Times, Courier) |
| `textSizeNormal` | `string` | `'11pt'` | Normal text size |
| `textSizeHeading1` | `string` | `'16pt'` | H1 heading size |
| `textSizeHeading2` | `string` | `'14pt'` | H2 heading size |
| `textSizeHeading3` | `string` | `'12pt'` | H3 heading size |
| `textAlign` | `'left' \| 'right' \| 'center' \| 'full'` | `'left'` | Default text alignment |
| `paragraphSpacing` | `string` | `'11mm'` | Space between paragraphs |
| `lineSpacing` | `string` | `'7mm'` | Space between lines within paragraphs |

#### Optional Props - Page Numbering

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showPageNumbers` | `boolean \| 'skip-first'` | `false` | Display page numbers (true, false, or 'skip-first') |
| `pageNumberFormat` | `string` | `'-#-'` | Page number format (# is replaced with page number) |
| `pageNumberLocation` | `'header' \| 'footer'` | `'header'` | Where to place page numbers |
| `pageNumberAlignment` | `'left' \| 'center' \| 'right'` | `'center'` | Page number alignment |

#### Optional Props - Next Page Indicators

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showNextPage` | `boolean \| 'skip-first'` | `false` | Display next page indicators |
| `nextPageNumberFormat` | `string` | `'.../#'` | Next page format (# is replaced with next page number) |
| `nextPageNumberLocation` | `'header' \| 'footer'` | `'header'` | Where to place next page indicators |
| `nextPageNumberAlignment` | `'left' \| 'center' \| 'right'` | `'center'` | Next page indicator alignment |

#### Optional Props - Metadata

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLetterNumber` | `boolean` | `false` | Display letter tracking number |
| `letterNumber` | `string` | `undefined` | Letter tracking number (e.g., "DPT-2024-001") |
| `letterNumberLocation` | `'header' \| 'footer'` | `'footer'` | Where to place letter number |
| `letterNumberAlignment` | `'left' \| 'center' \| 'right'` | `'right'` | Letter number alignment |
| `letterVersion` | `string` | `undefined` | Letter version (for tracking, not rendered) |

#### Optional Props - FIP Compliance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCanadaWordmark` | `boolean` | `true` | Display Canada wordmark on first page (FIP requirement). The official wordmark is **included automatically** - no configuration needed. |
| `canadaWordmarkPath` | `string` | Embedded base64 PNG | Path to Canada wordmark image. The package includes the official wordmark by default. Override only if you need a custom wordmark. **Supported formats: PNG, JPG/JPEG only.** |

#### Optional Props - Callbacks

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onReady` | `(downloadFn: () => void) => void` | `undefined` | Callback when PDF is ready, receives download function |

#### Example

```tsx
import { GcLetter, LetterBlock } from 'gc-letters';

function MyLetter() {
  const handleReady = (download) => {
    // Auto-download when ready
    download();
  };

  return (
    <GcLetter
      fileName="my-letter"
      deptSignature="https://example.com/signature.png"
      pageType="letter"
      showPageNumbers={true}
      onReady={handleReady}
    >
      <LetterBlock content="# Letter Content\n\nYour letter text here." />
    </GcLetter>
  );
}
```

---

### LetterBlock

Content section component for letters. Renders markdown content with optional page break control and typography overrides.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Markdown content (alternative to children) |
| `children` | `string` | `undefined` | Markdown content as children (alternative to content prop) |
| `allowPagebreak` | `boolean` | `true` | Allow automatic page breaks within this block |

#### Optional Typography Overrides

All typography props from GcLetter can be overridden at the block level:

| Prop | Type | Description |
|------|------|-------------|
| `fontFace` | `string` | Override font for this block |
| `textSizeNormal` | `string` | Override normal text size |
| `textSizeHeading1` | `string` | Override H1 size |
| `textSizeHeading2` | `string` | Override H2 size |
| `textSizeHeading3` | `string` | Override H3 size |
| `textAlign` | `'left' \| 'right' \| 'center' \| 'full'` | Override text alignment |
| `paragraphSpacing` | `string` | Override paragraph spacing |
| `lineSpacing` | `string` | Override line spacing |

#### Optional Table Styling

When the block contains markdown tables, these props control table appearance:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tableTheme` | `'striped' \| 'grid' \| 'plain'` | `'grid'` | Table visual style |
| `tableHeaderBold` | `boolean` | `true` | Bold text in header row |
| `tableHeaderFillColor` | `[number, number, number] \| false` | `[240, 240, 240]` | Header background RGB color (0-255) or false for no fill |
| `tableBorderColor` | `[number, number, number]` | `[200, 200, 200]` | Border color as RGB array (0-255) |

#### Markdown Support

LetterBlock supports the following markdown features:

- **Paragraphs**: Regular text separated by blank lines
- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Unordered lists**: `- item` or `* item`
- **Ordered lists**: `1. item`, `2. item`
- **Tables**: Standard markdown table syntax with column alignment

##### Table Syntax

Tables use standard markdown syntax with pipe-separated columns:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Column Alignment**:
- Left: `|:---------|` (default)
- Center: `|:--------:|`
- Right: `|---------:|`

Example with alignment:

```markdown
| Item | Quantity | Price |
|:-----|:--------:|------:|
| Apples | 10 | $1.50 |
| Oranges | 5 | $2.00 |
```

#### Nesting Restrictions

⚠️ **Important**: LetterBlock components cannot be nested. Each LetterBlock must be a direct child of GcLetter.

```tsx
// ✅ Correct
<GcLetter {...props}>
  <LetterBlock content="First block" />
  <LetterBlock content="Second block" />
</GcLetter>

// ❌ Incorrect - will throw error
<GcLetter {...props}>
  <LetterBlock content="Outer">
    <LetterBlock content="Inner" />
  </LetterBlock>
</GcLetter>
```

#### Examples

**Text Content:**
```tsx
<LetterBlock
  content="# Important Notice

This section uses **bold** and *italic* text.

## Key Points

- First point
- Second point
- Third point"
  textAlign="left"
  allowPagebreak={true}
/>
```

**Table Content:**
```tsx
<LetterBlock
  content={`
## Budget Summary

| Quarter | Revenue | Expenses | Net |
|:--------|--------:|---------:|----:|
| Q1 | $2.5M | $1.8M | $0.7M |
| Q2 | $2.8M | $2.1M | $0.7M |
| Q3 | $3.1M | $2.3M | $0.8M |
| **Total** | **$8.4M** | **$6.2M** | **$2.2M** |
  `}
  tableTheme="grid"
  tableHeaderBold={true}
/>
```

---

### SeparatorLine

Simple horizontal line component for visual separation between sections.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `topMargin` | `string` | `paragraphSpacing` | Spacing before the line (supports mm, pt, in, px) |
| `bottomMargin` | `string` | `paragraphSpacing * 2` | Spacing after the line (supports mm, pt, in, px) |

The component:
- Renders a 0.5mm thick horizontal line
- Spans the full width minus margins
- Uses document-level paragraph spacing by default

#### Examples

**Default spacing:**
```tsx
<GcLetter {...props}>
  <LetterBlock content="Section 1" />
  <SeparatorLine />
  <LetterBlock content="Section 2" />
</GcLetter>
```

**Custom spacing:**
```tsx
<GcLetter {...props}>
  <LetterBlock content="Section 1" />
  <SeparatorLine topMargin="5mm" bottomMargin="15mm" />
  <LetterBlock content="Section 2" />
</GcLetter>
```

---

## Types

### PageType

```typescript
type PageType = 'letter' | 'legal' | 'a4';
```

- `letter`: 8.5" × 11" (215.9mm × 279.4mm) - North American standard
- `legal`: 8.5" × 14" (215.9mm × 355.6mm) - North American legal size
- `a4`: 210mm × 297mm - International standard

### Alignment

```typescript
type Alignment = 'left' | 'right' | 'center' | 'full';
```

- `left`: Align text to left margin
- `right`: Align text to right margin
- `center`: Center text horizontally
- `full`: Justify text with even left and right edges

### HeaderFooterLocation

```typescript
type HeaderFooterLocation = 'header' | 'footer';
```

- `header`: Place element at top of page (y-margin / 2)
- `footer`: Place element at bottom of page (pageHeight - y-margin / 2)

### Unit Values

Many props accept unit values as strings. Supported units:

- `mm`: Millimeters (e.g., `'38mm'`)
- `pt`: Points (e.g., `'11pt'`)
- `in`: Inches (e.g., `'1.5in'`)
- `px`: Pixels at 96 DPI (e.g., `'100px'`)
- Unitless numbers are treated as millimeters

---

## Utilities

While utilities are primarily for internal use, they are exported for advanced use cases.

### Page Calculations

```typescript
import { convertToMm, shouldBreakPage, calculateAvailableHeight } from 'gc-letters';

// Convert various units to millimeters
const mm = convertToMm('11pt'); // Returns ~3.88mm

// Check if content will fit on current page
const needsBreak = shouldBreakPage(currentY, contentHeight, pageHeight, bottomMargin);

// Calculate usable height
const available = calculateAvailableHeight(pageHeight, topMargin, bottomMargin);
```

### Validation

```typescript
import { validateFileName, validateDeptSignature, validateUnitValue } from 'gc-letters';

// Validate inputs (throws error if invalid)
validateFileName('my-letter'); // ✅
validateDeptSignature('https://example.com/sig.png'); // ✅
validateUnitValue('38mm', 'xMargin'); // ✅
```

### PDF Generation

```typescript
import { createPDF, downloadPDF, getPageDimensions } from 'gc-letters';

// Create a new PDF
const pdf = createPDF('letter');

// Get page dimensions for a format
const dims = getPageDimensions('a4'); // { width: 210, height: 297 }

// Trigger download
downloadPDF(pdf, 'my-document');
```

---

## Best Practices

### Typography

1. Use Helvetica for FIP compliance
2. Stick to default sizes for consistency
3. Use text alignment sparingly (left-align is standard)
4. Override typography at block level only when necessary

### Page Management

1. Let automatic page breaks handle long content
2. Use `allowPagebreak={false}` only for critical content that must stay together
3. Consider `skip-first` for page numbers on multi-page letters

### Content Organization

1. Use LetterBlock for logical content sections
2. Use SeparatorLine to visually separate major sections
3. Keep related content in a single LetterBlock
4. Use markdown tables for structured data presentation
5. Apply table styling props consistently across the document

### File Naming

1. Use descriptive file names (e.g., `'approval-letter-2024'`)
2. Avoid special characters
3. Extension `.pdf` is added automatically

### Department Signatures

1. Use high-resolution PNG images
2. Host images on accessible URLs or use relative paths
3. Ensure CORS is configured if loading from external domains
4. Test image loading before production use

---

## Error Handling

The package validates inputs and throws descriptive errors:

```typescript
// Missing required prop
<GcLetter fileName="" deptSignature="...">
// Error: fileName is required

// Invalid page number format
<GcLetter {...props} pageNumberFormat="Page">
// Error: pageNumberFormat must contain # as placeholder

// Nested LetterBlocks
<LetterBlock>
  <LetterBlock>...</LetterBlock>
</LetterBlock>
// Error: LetterBlock components cannot be nested

// Negative margin
<GcLetter {...props} xMargin="-10mm">
// Error: xMargin value must be positive
```

Always wrap letter generation in try-catch blocks for production use:

```tsx
try {
  const handleReady = (download) => download();
  return <GcLetter {...props} onReady={handleReady} />;
} catch (error) {
  console.error('Letter generation failed:', error);
  return <ErrorDisplay message={error.message} />;
}
```
