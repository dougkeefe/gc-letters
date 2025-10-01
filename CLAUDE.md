# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GC Letters is an npm package for Canadian Government of Canada departments to generate Federal Identity Program (FIP) compliant letters as PDFs. The package generates letters in-browser using jsPDF, requiring no server-side dependencies.

## Core Architecture

The package provides three main React components that work together:

1. **`<GcLetter>`** - The wrapper component that handles document-level settings (margins, page numbers, fonts, department signature). This is the required parent component.

2. **`<LetterBlock />`** - Content sections within a letter. Each block can have independent formatting and page-break controls. Content is provided as markdown (either as children or via the `content` parameter).

3. **`<SeparatorLine />`** - A convenience component for adding visual separators.

**Critical constraints:**
- Do NOT nest `<LetterBlock>` components - this will cause errors
- All markdown content goes inside `<LetterBlock>` components
- The package uses jsPDF under the hood for PDF generation

## Component Parameters

### GcLetter (Document-level)
**Required:**
- `file-name` - Output PDF filename
- `dept-signature` - PNG link for department letterhead

**Layout:** `page-type` (letter/legal/a4), `x-margin` (38mm), `y-margin` (13mm)

**Typography:** `font-face` (Helvetica Light), `text-size-*`, `text-align`, `paragraph-spacing` (11mm), `line-spacing` (7mm)

**Page Numbers:** `show-page-numbers` (false/true/skip-first), `page-number-format` (uses # as placeholder), `page-number-location` (header/footer), `page-number-alignment`

**Letter Metadata:** `letter-version`, `letter-number`, `show-letter-number`, `letter-number-location`, `letter-number-alignment`

**Next Page Indicators:** `show-next-page`, `next-page-number-format` (.../#), `next-page-number-location`, `next-page-number-alignment`

### LetterBlock (Content-level)
- `content` - Markdown content (alternative to children)
- `allow-pagebreak` (true) - If false, forces entire block to new page if it would break
- Block-level overrides for typography settings (defers to document-level if not set)

## Development Status

This is an early-stage project. The codebase currently contains:
- Project requirements documentation
- Empty src/ directory (implementation pending)
- Basic package.json scaffold

## Future Considerations
- Image handling in markdown
- Table rendering
- Server-side rendering option for API-based generation
- Letter versioning persistence strategy
