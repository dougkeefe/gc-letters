# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] - 2024-10-06

### Fixed

- **Runtime Error: `endsWith is not a function`** - Added defensive type checking
  - Added type guard in `convertToMm` to handle non-string inputs gracefully
  - Improved component type detection with explicit string type checks
  - Prevents runtime errors when unexpected values are passed
  - Logs warnings to help debug configuration issues

## [1.1.3] - 2024-10-06

### Fixed

- **Critical Bug: LetterBlock Content Not Rendering** - Fixed component type detection
  - Added `displayName` to `LetterBlock` and `SeparatorLine` components
  - Updated GcLetter to use `displayName` instead of function `name` for component identification
  - Fixes issue where content would not appear in generated PDFs, especially with React 19
  - **This was a critical bug affecting all users** - upgrade immediately if on 1.1.0-1.1.2

### Technical Details

The previous implementation used `child.type.name` to identify components, which:
- Fails in production builds where function names are minified
- Is unreliable across React versions (especially React 19)
- Is not the recommended approach for component type checking

The fix uses `displayName` (with fallback to `name`) which is:
- Reliable in all build environments
- Compatible with all React versions (17, 18, 19)
- The recommended React pattern for component identification

## [1.1.2] - 2024-10-06

### Security

- **Dependency Updates** - Updated dependencies to fix security vulnerabilities
  - Updated `jspdf` from ^2.5.1 to ^3.0.3 (fixes XSS vulnerability via dompurify)
  - Updated `jspdf-autotable` from ^3.8.4 to ^5.0.2 (compatible with jspdf 3.x)
  - Added TextEncoder/TextDecoder polyfills for jsPDF 3.x in test environment
  - **No breaking changes** - API remains fully compatible

## [1.1.1] - 2024-10-06

### Changed

- **React 19 Support** - Added React 19.x to peer dependencies
  - Package now supports React 17.x, 18.x, and 19.x
  - No breaking changes to API or functionality

## [0.1.0] - 2024-10-06

### 🎉 Initial Release

First release of gc-letters - an npm package for Government of Canada departments to generate Federal Identity Program (FIP) compliant letters as PDFs directly in the browser.

### ✨ Features

#### Core Components

- **GcLetter Component** - Main document wrapper with comprehensive configuration options
  - Support for multiple page types: Letter (8.5" × 11"), Legal (8.5" × 14"), and A4 formats
  - Configurable margins (default: 38mm × 13mm for FIP compliance)
  - Custom typography settings at document and block levels
  - Automatic PDF generation using jsPDF
  - Download callback via `onReady` prop

- **LetterBlock Component** - Content sections with markdown support
  - Inline markdown rendering (headings, bold, italic, lists, tables)
  - Block-level typography overrides
  - Page break control with `allowPagebreak` prop
  - Text alignment options (left, center, right, full)
  - Support for both `children` and `content` prop patterns

- **SeparatorLine Component** - Visual separators
  - Customizable top and bottom margins
  - Automatic spacing based on paragraph settings

#### FIP Compliance Features

- ✅ **Canada Wordmark** - Automatically included on first page (bottom left)
  - Embedded base64 image (no external dependencies)
  - Proper positioning per FIP specifications (38mm from left, 13mm from bottom)
  - Automatic clear space calculation to prevent content overlap

- ✅ **Department Signature** - PNG/JPG support with automatic scaling
  - Maximum width: 60mm with aspect ratio preservation
  - CORS-compatible image loading

- ✅ **Typography Standards**
  - Default Helvetica font (FIP recommended)
  - Configurable font sizes for normal text and headings (H1, H2, H3)
  - Line and paragraph spacing controls

- ✅ **Letter Metadata**
  - Letter number display with customizable location and alignment
  - Optional letter version tracking

#### Page Management

- **Page Numbering**
  - Display options: `true`, `false`, or `'skip-first'`
  - Customizable format (e.g., "Page #", "-#-")
  - Configurable location (header/footer) and alignment (left/center/right)

- **Next Page Indicators**
  - Display ".../#" style indicators
  - Default location: footer right
  - Skip first page option
  - Accurate multi-page detection (only shows when next page exists)

- **Smart Page Breaks**
  - Automatic page overflow detection
  - Content-aware breaks (accounting for Canada wordmark on first page)
  - Block-level page break control with `allowPagebreak={false}`

#### Markdown Support

- **Text Formatting**
  - Headings: `#`, `##`, `###`
  - Bold: `**text**`
  - Italic: `*text*`
  - Combined formatting

- **Lists**
  - Unordered lists with `-` or `*`
  - Ordered lists with numbers
  - Automatic indentation

- **Tables** (via jsPDF-AutoTable)
  - Standard markdown table syntax
  - Column alignment support (left, center, right via `:`)
  - Customizable themes: 'grid' (default), 'striped', 'plain'
  - Header styling options (bold, fill color)
  - Border color customization
  - Automatic page breaks for large tables

### 🌍 Bilingual Support

- Full support for French and English content
- Date formatting with locale support
- Example letters in both official languages

### 📚 Documentation

- Comprehensive README with quick start guide
- Detailed API documentation
- Usage examples for common patterns
- FIP compliance guide
- Template literal syntax documentation for multi-line markdown
- Test application with 4 example letters:
  - FIP-Compliant Letter (English)
  - French Language Letter
  - Custom Formatting Example
  - Markdown Table Example

### 🧪 Testing

- 124+ test cases
- 87%+ code coverage
- Visual test samples included
- Jest configuration with jsdom environment

### 🛠️ Developer Experience

- Full TypeScript support with type definitions
- ESLint configuration
- Prettier code formatting
- Husky pre-commit hooks
- Rollup build system
- CommonJS and ESM module outputs

### 📦 Package Details

- **Dependencies**:
  - jsPDF 2.5.1 - PDF generation
  - jsPDF-AutoTable 3.8.4 - Table rendering
  - marked 9.1.6 - Markdown parsing

- **Peer Dependencies**:
  - React 17.x or 18.x
  - React DOM 17.x or 18.x

- **Bundle Size**: Optimized for browser use

### ⚠️ Important Notes

#### Template Literal Syntax

Multi-line markdown content requires template literals to preserve newlines:

```tsx
// ✅ Correct
<LetterBlock>{`
  Line 1

  Line 2
`}</LetterBlock>

// ❌ Wrong - JSX collapses whitespace
<LetterBlock>
  Line 1

  Line 2
</LetterBlock>
```

#### Component Nesting

LetterBlock components cannot be nested - each must be a direct child of GcLetter.

#### Image Support

- Supported: PNG, JPG/JPEG
- Not supported: SVG (convert to PNG first)
- CORS must be configured for external images

### 🔧 Configuration Defaults

- Page type: `letter` (8.5" × 11")
- X margin: `38mm`
- Y margin: `13mm`
- Font face: `Helvetica`
- Text size normal: `11pt`
- Text size H1: `16pt`
- Text size H2: `14pt`
- Text size H3: `12pt`
- Line spacing: `5mm`
- Paragraph spacing: `5mm`
- Text alignment: `left`
- Page numbers: `false`
- Next page indicator location: `footer`
- Next page indicator alignment: `right`
- Canada wordmark: `true` (shown on first page)

### 📄 License

MIT License - See LICENSE file for details

### 🙏 Acknowledgments

Built with:
- [jsPDF](https://github.com/parallax/jsPDF)
- [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- [marked](https://github.com/markedjs/marked)
- [React](https://reactjs.org/)

### 🔗 Links

- [GitHub Repository](https://github.com/dougkeefe/gc-letters)
- [Issue Tracker](https://github.com/dougkeefe/gc-letters/issues)
- [npm Package](https://www.npmjs.com/package/gc-letters)

---

## Disclaimer

This project is currently a proof of concept and is not officially endorsed as a Government of Canada tool. While it aims to help generate FIP-compliant letters, it should be used for development and testing purposes only. Organizations should conduct their own compliance reviews before using this package in production environments.
