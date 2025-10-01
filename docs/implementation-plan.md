# Implementation Plan

## Overview
This document outlines the implementation plan for the GC Letters npm package, which generates FIP-compliant PDF letters in-browser using React components and jsPDF.

## Phase 1: Project Setup & Core Infrastructure ✅ COMPLETED

### 1.1 Development Environment ✅
- [x] Set up TypeScript configuration
  - Created `tsconfig.json` with strict mode enabled
  - Configured for React JSX and ES2020 target
  - Set up declaration files and source maps
- [x] Configure build tooling (Rollup)
  - Created `rollup.config.js` with dual output (CJS + ESM)
  - Configured plugins: node-resolve, commonjs, typescript, terser, peer-deps-external
  - Successfully generates `dist/index.js` and `dist/index.esm.js`
- [x] Set up testing framework (Jest)
  - Created `jest.config.js` with ts-jest preset
  - Configured jsdom test environment for React components
  - Set coverage thresholds at 70%
- [x] Configure ESLint and Prettier
  - Created `.eslintrc.json` with TypeScript and React rules
  - Created `.prettierrc.json` with code style preferences
  - All lint checks passing
- [x] Set up Git hooks for code quality
  - Created `.husky/pre-commit` hook
  - Configured to run lint and format checks before commits

### 1.2 Dependencies ✅
- [x] Install and configure jsPDF
  - Installed jsPDF v2.5.1
  - Created basic utility functions in `src/utils/pdfGenerator.ts`
- [x] Install markdown parser (marked)
  - Installed marked v9.1.6 with @types/marked
  - Created parser utilities in `src/utils/markdownParser.ts`
- [x] Install React as peer dependency
  - Configured React ^17.0.0 || ^18.0.0 as peer dependency
  - Installed React 18.2.0 as dev dependency for development
- [x] Set up TypeScript types for all dependencies
  - Installed @types packages: @types/react, @types/react-dom, @types/jest, @types/marked
  - Installed tslib for TypeScript runtime helpers

### 1.3 Project Structure ✅
```
src/
├── components/
│   ├── GcLetter.tsx         ✅ Created with all props defined
│   ├── LetterBlock.tsx      ✅ Created with prop interfaces
│   └── SeparatorLine.tsx    ✅ Created basic component
├── utils/
│   ├── pdfGenerator.ts      ✅ Created with page dimension utilities
│   ├── markdownParser.ts    ✅ Created with marked integration
│   ├── pageCalculator.ts    ✅ Created with unit conversion utilities
│   └── validators.ts        ✅ Created with basic validators
├── types/
│   └── index.ts             ✅ Created all TypeScript interfaces
└── index.ts                 ✅ Created main export file
```

**Build Verification:**
- ✅ `npm run typecheck` - All TypeScript compilation successful
- ✅ `npm run build` - Rollup build completed successfully
- ✅ `npm run lint` - ESLint passing with no errors
- ✅ `npm run format:check` - Prettier formatting validated

**Package Configuration:**
- ✅ Updated `package.json` with all scripts and dependencies
- ✅ Configured proper entry points (main, module, types)
- ✅ Added keywords for npm discoverability
- ✅ Set MIT license

## Phase 2: Core Component Development ✅ COMPLETED

### 2.1 GcLetter Component ✅
**Priority: High**

- [x] Define TypeScript interfaces for all props
  - Created comprehensive `GcLetterProps` interface in `src/types/index.ts`
  - Includes all document-level settings, page numbering, and metadata options
- [x] Implement required props validation (`file-name`, `dept-signature`)
  - Created validation functions in `src/utils/validators.ts`
  - Validates fileName is not empty
  - Validates deptSignature with URL/path checking
  - Validation runs on component mount via useEffect
- [x] Set up jsPDF document initialization
  - Implemented in `src/components/GcLetter.tsx` using useRef and useEffect
  - PDF instance created with proper lifecycle management
  - Initial Y position set based on top margin
- [x] Implement page type configuration (letter, legal, a4)
  - Created `getPageDimensions()` utility in `src/utils/pdfGenerator.ts`
  - Supports letter (8.5" x 11"), legal (8.5" x 14"), and A4 (210mm x 297mm)
  - Dimensions used for PDF initialization
- [x] Implement margin settings (x-margin, y-margin)
  - Unit conversion utilities in `src/utils/pageCalculator.ts`
  - Supports mm, pt, in, px units
  - Margins applied to PDF context and passed to child components
- [x] Add department signature/letterhead rendering
  - Created `loadImage()` and `addImageToPDF()` functions in `src/utils/pdfGenerator.ts`
  - Handles image loading with promise-based async operations
  - Supports CORS and various image formats
- [x] Create context provider for passing settings to child components
  - Created `LetterContext` in `src/context/LetterContext.tsx`
  - Provides PDF instance, dimensions, margins, typography settings
  - Includes `currentY` state for tracking vertical position
  - Custom `useLetterContext()` hook with validation

### 2.2 LetterBlock Component ✅
**Priority: High**

- [x] Define TypeScript interfaces for props
  - Created `LetterBlockProps` interface in `src/types/index.ts`
  - Supports both `content` prop and children for markdown input
  - Includes all typography override options
- [x] Implement markdown content rendering (children or `content` prop)
  - Fully implemented in `src/components/LetterBlock.tsx`
  - Accepts markdown as either prop or children
  - Renders directly to PDF via context
- [x] Integrate markdown parser
  - Integrated marked library in `src/utils/markdownParser.ts`
  - Created `parseMarkdown()` function using marked.lexer()
  - Renders paragraphs, headings, and lists
- [x] Implement `allow-pagebreak` logic
  - Added page break checking with `shouldBreakPage()` utility
  - Warns when content exceeds page with allowPagebreak=false
  - Foundation for future page break handling
- [x] Support typography overrides at block level
  - Block-level props override document-level settings
  - Fallback logic: block settings → document settings
  - Supports: fontFace, textSize*, lineSpacing, paragraphSpacing, textAlign
- [x] Calculate content height for page break decisions
  - Implemented `shouldBreakPage()` in `src/utils/pageCalculator.ts`
  - Tracks currentY position through context
  - Calculates available height based on page dimensions and margins

### 2.3 SeparatorLine Component ✅
**Priority: Medium**

- [x] Create simple horizontal line component
  - Implemented in `src/components/SeparatorLine.tsx`
  - Uses jsPDF line drawing API
  - Configurable thickness (0.5mm default)
- [x] Ensure proper spacing and positioning
  - 3mm spacing before and after the line
  - Line spans full width minus margins
  - Updates currentY position in context

**Supporting Infrastructure Created:**
- ✅ `src/context/LetterContext.tsx` - React context for component communication
- ✅ Enhanced `src/utils/validators.ts` - URL validation, unit value validation
- ✅ Enhanced `src/utils/pageCalculator.ts` - Unit conversions (mm, pt, in, px), dimension calculations
- ✅ Enhanced `src/utils/pdfGenerator.ts` - Image loading, alignment calculations, page numbering utilities
- ✅ Fully implemented `src/utils/markdownParser.ts` - Paragraph, heading, and list rendering

**Build Verification:**
- ✅ `npm run typecheck` - All TypeScript compilation successful
- ✅ `npm run lint` - ESLint passing with no errors
- ✅ `npm run build` - Rollup build completed (3.7s)
- ✅ Updated rollup.config.js with `inlineDynamicImports: true` for multi-module support

## Phase 3: Typography & Styling ✅ COMPLETED

### 3.1 Document-Level Typography ✅
- [x] Implement font-face loading (Helvetica default)
  - Font loading implemented in `GcLetter.tsx` via `pdf.setFont(fontFace)`
  - Default font set to Helvetica (jsPDF built-in font)
  - Font applied on PDF initialization
- [x] Set up text size hierarchy (normal, h1, h2, h3)
  - All text sizes configurable via props: `textSizeNormal`, `textSizeHeading1`, `textSizeHeading2`, `textSizeHeading3`
  - Defaults: 11pt (normal), 16pt (h1), 14pt (h2), 12pt (h3)
  - Implemented in rendering functions in `src/utils/markdownParser.ts`
- [x] Implement text alignment options (left, right, center, full)
  - Created `getAlignedXPosition()` helper function in `src/utils/markdownParser.ts`
  - Supports left, right, center, and full (justified) alignment
  - Full justification implemented with word spacing calculation
  - Applied to both paragraphs and headings
- [x] Configure paragraph spacing
  - Configurable via `paragraphSpacing` prop (default: 11mm)
  - Applied after each paragraph and heading in rendering
  - Passed through context to all child components
- [x] Configure line spacing
  - Configurable via `lineSpacing` prop (default: 7mm)
  - Applied within paragraphs and lists
  - Used for calculating vertical spacing between lines

### 3.2 Block-Level Typography Overrides ✅
- [x] Allow LetterBlock to override document-level settings
  - All typography props available at LetterBlock level
  - Includes: `fontFace`, `textSize*`, `textAlign`, `paragraphSpacing`, `lineSpacing`
  - Implemented in `src/components/LetterBlock.tsx` with effective* variable pattern
- [x] Implement fallback to document-level defaults
  - Fallback logic: `blockSetting || documentSetting`
  - Implemented for all typography properties
  - Document-level settings retrieved from LetterContext
- [x] Test typography inheritance and override logic
  - Created test suite in `src/utils/__tests__/typography.test.ts`
  - Tests cover font hierarchy, alignment options, and override logic
  - All tests passing ✅

**Enhanced Files:**
- ✅ `src/utils/markdownParser.ts` - Added `textAlign` to RenderContext, implemented alignment for paragraphs and headings
- ✅ `src/components/LetterBlock.tsx` - Added textAlign fallback logic
- ✅ `src/utils/__tests__/typography.test.ts` - Created comprehensive tests

**Build Verification:**
- ✅ `npm run typecheck` - All TypeScript compilation successful
- ✅ `npm run lint` - ESLint passing with no errors
- ✅ `npm run build` - Rollup build completed (3.7s)
- ✅ `npm test` - 3 tests passing

## Phase 4: Page Management

### 4.1 Page Numbering System
- [ ] Implement `show-page-numbers` logic (false, true, skip-first)
- [ ] Create page number format parser (replace # placeholder)
- [ ] Position page numbers (header/footer)
- [ ] Align page numbers (left/center/right)

### 4.2 Next Page Indicators
- [ ] Implement `show-next-page` logic (false, true, skip-first)
- [ ] Create next page format (default: .../#)
- [ ] Position next page indicators
- [ ] Align next page indicators

### 4.3 Letter Metadata
- [ ] Implement letter version tracking
- [ ] Implement letter number display
- [ ] Position letter numbers (header/footer)
- [ ] Align letter numbers

### 4.4 Page Break Logic
- [ ] Calculate available space on current page
- [ ] Implement content measurement utilities
- [ ] Handle `allow-pagebreak: false` for LetterBlocks
- [ ] Ensure content flows correctly across pages

## Phase 5: PDF Generation

### 5.1 jsPDF Integration
- [ ] Configure jsPDF with page dimensions
- [ ] Implement PDF rendering pipeline
- [ ] Handle font loading and embedding
- [ ] Implement image loading for department signatures

### 5.2 Markdown to PDF Rendering
- [ ] Parse markdown content
- [ ] Map markdown elements to PDF primitives
- [ ] Handle lists, bold, italic, headings
- [ ] Maintain proper spacing and formatting

### 5.3 Download Functionality
- [ ] Implement browser-based PDF download
- [ ] Use provided `file-name` parameter
- [ ] Handle download errors gracefully

## Phase 6: Validation & Error Handling

### 6.1 Input Validation
- [ ] Validate required props on GcLetter
- [ ] Validate page-number-format contains # placeholder
- [ ] Validate next-page-number-format if custom
- [ ] Validate margin and spacing values (units, ranges)
- [ ] Validate image URLs for department signatures

### 6.2 Component Nesting Validation
- [ ] Detect and prevent LetterBlock nesting
- [ ] Provide clear error messages for invalid component structure
- [ ] Validate children are allowed component types

### 6.3 Error Handling
- [ ] Handle image loading failures gracefully
- [ ] Handle font loading issues
- [ ] Provide meaningful error messages to developers
- [ ] Implement fallbacks where appropriate

## Phase 7: Testing

### 7.1 Unit Tests
- [ ] Test all utility functions (validators, calculators, parsers)
- [ ] Test component prop validation
- [ ] Test markdown parsing
- [ ] Test page break calculations

### 7.2 Integration Tests
- [ ] Test complete letter generation workflow
- [ ] Test various component combinations
- [ ] Test typography inheritance and overrides
- [ ] Test page numbering scenarios

### 7.3 Visual/Snapshot Tests
- [ ] Generate sample PDFs for visual verification
- [ ] Test FIP compliance of output
- [ ] Test various page layouts and configurations
- [ ] Test edge cases (very long content, minimal content)

## Phase 8: Documentation & Examples

### 8.1 API Documentation
- [ ] Document all component props with examples
- [ ] Create usage guidelines
- [ ] Document FIP compliance requirements
- [ ] Add troubleshooting guide

### 8.2 Example Applications
- [ ] Create basic letter example
- [ ] Create multi-page letter example
- [ ] Create example with custom formatting
- [ ] Create example with metadata (version, letter number)

### 8.3 Developer Documentation
- [ ] Update README with complete API reference
- [ ] Create CONTRIBUTING.md
- [ ] Document build and release process
- [ ] Add architecture documentation

## Phase 9: Package Publishing

### 9.1 Pre-publish Checklist
- [ ] Ensure all tests pass
- [ ] Configure package.json for npm publishing
- [ ] Set up proper entry points (main, module, types)
- [ ] Create .npmignore
- [ ] Add repository, bugs, homepage fields to package.json
- [ ] Add keywords for discoverability

### 9.2 Publishing
- [ ] Publish to npm registry
- [ ] Create GitHub release
- [ ] Tag version in git
- [ ] Update documentation with installation instructions

### 9.3 Post-publish
- [ ] Monitor for issues
- [ ] Set up issue templates in GitHub
- [ ] Create pull request template
- [ ] Establish versioning strategy (semantic versioning)

## Future Enhancements (Post v1.0)

### Image Support
- [ ] Research image embedding in markdown
- [ ] Implement image rendering in PDF
- [ ] Handle image sizing and positioning

### Table Support
- [ ] Research markdown table parsing
- [ ] Implement table rendering in jsPDF
- [ ] Handle table pagination

### Server-Side Rendering
- [ ] Evaluate Node.js compatibility
- [ ] Create API endpoint option for PDF generation
- [ ] Handle headless rendering scenarios

### Additional Features
- [ ] Multi-language support
- [ ] Additional page formats
- [ ] Custom header/footer templates
- [ ] Digital signatures support

## Success Criteria

1. Package successfully generates FIP-compliant PDFs
2. All components work as documented
3. Component nesting validation prevents errors
4. Page breaks work correctly with `allow-pagebreak` setting
5. Typography and layout match FIP standards
6. Package is published to npm
7. Documentation is complete and clear
8. Test coverage is adequate (aim for >80%)

## Timeline Estimates

- **Phase 1-2**: 1-2 weeks (Setup & Core Components)
- **Phase 3-4**: 1-2 weeks (Typography & Page Management)
- **Phase 5-6**: 1-2 weeks (PDF Generation & Validation)
- **Phase 7**: 1 week (Testing)
- **Phase 8**: 3-5 days (Documentation)
- **Phase 9**: 2-3 days (Publishing)

**Total Estimated Time**: 6-8 weeks for v1.0 release
