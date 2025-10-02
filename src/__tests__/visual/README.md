# Visual Testing Guide

This directory contains sample letter configurations for visual verification and FIP compliance testing.

## Sample Letters

The `sampleLetters.tsx` file contains pre-configured letter examples that cover various use cases:

### Basic Samples
- **BasicLetter**: Minimal content for basic rendering verification
- **MinimalLetter**: Edge case with very short content (single line)

### Page Management
- **LongLetter**: Multi-page content with page numbers and next-page indicators
- **LongParagraphLetter**: Edge case with extremely long continuous paragraph

### Typography
- **CustomTypographyLetter**: Custom font (Times) with adjusted spacing
- **AlignmentLetter**: Demonstrates all four alignment options (left, center, right, full)

### Formatting
- **FormattedLetter**: Lists, bold, italic, and mixed content
- **SeparatorLetter**: Multiple sections divided by horizontal lines

### Metadata
- **MetadataLetter**: Page numbers and letter tracking number

### Page Types
- **PageTypeLetter**: Letter, Legal, and A4 page formats

## How to Generate Visual Test PDFs

Since this is a library package, you'll need a small React application to render and download the PDFs:

### Option 1: Create a Test App (Recommended)

1. Create a new React app:
   ```bash
   npx create-react-app visual-test-app
   cd visual-test-app
   npm install ../gc-letters
   ```

2. Create a test component:
   ```tsx
   import React, { useEffect } from 'react';
   import { BasicLetter, LongLetter } from 'gc-letters/dist/__tests__/visual/sampleLetters';

   function App() {
     return (
       <div>
         <BasicLetter onReady={(download) => {
           // Auto-download or provide a button
           console.log('BasicLetter ready');
         }} />
         <LongLetter onReady={(download) => {
           console.log('LongLetter ready');
         }} />
       </div>
     );
   }
   ```

3. Run the app and use browser dev tools to trigger downloads

### Option 2: Manual Testing

You can also import these configurations into your own application and test them in context.

## FIP Compliance Checklist

When visually inspecting generated PDFs, verify:

### Layout
- [ ] Margins are correct (default: 38mm horizontal, 13mm vertical)
- [ ] Content stays within margins
- [ ] Page breaks occur at appropriate locations
- [ ] Multi-page documents maintain consistent formatting

### Typography
- [ ] Font is readable and appropriate (Helvetica default)
- [ ] Heading hierarchy is visually clear (H1 > H2 > H3)
- [ ] Line spacing provides good readability
- [ ] Paragraph spacing creates clear separation

### Alignment
- [ ] Left-aligned text starts at left margin
- [ ] Center-aligned text is centered on page
- [ ] Right-aligned text ends at right margin
- [ ] Fully-justified text has even left and right edges

### Markdown Rendering
- [ ] Headings render with correct size and weight
- [ ] Lists have proper indentation
- [ ] Ordered lists use sequential numbers
- [ ] Unordered lists use consistent bullets
- [ ] Text formatting (bold, italic) renders correctly

### Page Management
- [ ] Page numbers appear in correct location (if enabled)
- [ ] Page numbers use specified format
- [ ] Next page indicators appear on all but last page (if enabled)
- [ ] Letter numbers appear in correct location (if enabled)
- [ ] Page 1 skipping works correctly (if using skip-first)

### Edge Cases
- [ ] Very short letters render without issues
- [ ] Very long paragraphs wrap correctly
- [ ] Content near page boundaries breaks appropriately
- [ ] Empty or minimal content doesn't cause errors

### Government of Canada FIP Standards
- [ ] Official signature/wordmark positioned correctly
- [ ] Bilingual requirements met (if applicable)
- [ ] Color usage follows FIP guidelines
- [ ] Overall appearance is professional and consistent

## Test Coverage

The `visualTests.test.ts` file contains:
- Configuration verification tests (10 sample letter types)
- FIP compliance requirement documentation
- Visual verification checklists
- Test scenario documentation

These tests ensure all sample configurations are properly defined and document what should be manually verified in generated PDFs.

## Notes

- Visual tests are semi-automated: configurations are verified programmatically, but PDF output requires manual inspection
- FIP compliance cannot be fully automated and requires human review
- Sample letters serve as both test cases and usage examples
- Update this directory when adding new visual test scenarios
