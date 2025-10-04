# Federal Identity Program (FIP) Compliance Guide

This guide explains how to use gc-letters to create letters that comply with the Government of Canada's Federal Identity Program standards.

## Table of Contents

- [What is FIP?](#what-is-fip)
- [Core Requirements](#core-requirements)
- [Typography Standards](#typography-standards)
- [Layout Requirements](#layout-requirements)
- [Official Symbols](#official-symbols)
- [Bilingual Requirements](#bilingual-requirements)
- [Compliance Checklist](#compliance-checklist)
- [Examples](#examples)

---

## What is FIP?

The Federal Identity Program (FIP) is the Government of Canada's corporate identity program. It ensures that all federal government communications present a unified, professional, and recognizable image to Canadians.

### Key Objectives

- Project the government as a coherent, unified administration
- Enable Canadians to recognize government institutions and services at a glance
- Maintain consistency across all platforms and media
- Support both official languages equally

### Official Resources

- [FIP Design Standard](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/design-standard.html)
- [FIP Manual](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/federal-identity-program/manual.html)
- [FIP Technical Specifications](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/federal-identity-program/technical-specifications.html)

---

## Core Requirements

### 1. Typeface

**Requirement**: Use Helvetica typeface

```tsx
<GcLetter
  fontFace="Helvetica"  // Default - FIP compliant
  {...otherProps}
>
```

**Acceptable Variations**:
- Helvetica (standard)
- Helvetica Neue
- Helvetica Now

**Weight Guidelines**:
- Light: stationery products
- Regular: most communications (recommended for letters)
- Medium: signage and vehicle markings
- Bold: may be used for headings

### 2. Official Symbols

**Requirement**: Include department signature with flag symbol

```tsx
<GcLetter
  deptSignature="https://your-department.gc.ca/signature.png"
  {...otherProps}
>
```

Your department signature image should include:
- Government of Canada flag symbol
- Department name in both official languages
- Proper spacing and proportions (1:1.7 ratio between type size and flag symbol height)

### 3. Canada Wordmark

The Canada wordmark must appear on all government applications. **This package includes the official Canada wordmark automatically** - it will appear on the bottom left of the first page by default. No configuration is required.

---

## Typography Standards

### Font Sizes

FIP doesn't mandate specific sizes, but these defaults align with common practices:

```tsx
<GcLetter
  textSizeNormal="11pt"      // Body text
  textSizeHeading1="16pt"    // Main headings
  textSizeHeading2="14pt"    // Sub-headings
  textSizeHeading3="12pt"    // Minor headings
  {...otherProps}
>
```

### Text Formatting

- Use **upper and lowercase** characters (not all capitals)
- Include **accents** for both uppercase and lowercase French text
- Avoid ampersands (&) in institutional titles
- Break lines logically for visual balance

```tsx
// ✅ Correct
<LetterBlock content="## Important Notice" />

// ❌ Avoid
<LetterBlock content="## IMPORTANT NOTICE" />
```

### Spacing

Standard spacing for readability:

```tsx
<GcLetter
  lineSpacing="7mm"          // Between lines
  paragraphSpacing="11mm"    // Between paragraphs
  {...otherProps}
>
```

---

## Layout Requirements

### Page Margins

Recommended margins for FIP compliance:

```tsx
<GcLetter
  xMargin="38mm"    // Horizontal margins (1.5 inches)
  yMargin="13mm"    // Vertical margins (0.5 inches)
  {...otherProps}
>
```

These are the package defaults and comply with FIP standards.

### Page Sizes

Acceptable page formats:

```tsx
// North American standard (recommended)
<GcLetter pageType="letter" {...props}>  // 8.5" × 11"

// Legal size (when needed)
<GcLetter pageType="legal" {...props}>   // 8.5" × 14"

// International standard
<GcLetter pageType="a4" {...props}>      // 210mm × 297mm
```

### Alignment

Standard alignment is left-aligned:

```tsx
<GcLetter
  textAlign="left"    // Default and recommended
  {...otherProps}
>
```

Use other alignments sparingly and only when appropriate:
- `center`: For titles or special emphasis
- `right`: For signature blocks
- `full`: For formal documents (use cautiously)

---

## Official Symbols

### Department Signature

Your department signature should:

1. **Include the flag symbol** and department name
2. **Be bilingual** (English and French)
3. **Maintain proper proportions** (1:1.7 ratio)
4. **Use appropriate file format** (PNG with transparency recommended)
5. **Be high resolution** for clear printing

### Signature Placement

```tsx
<GcLetter
  deptSignature="https://your-dept.gc.ca/assets/signature-bilingual.png"
  {...otherProps}
>
```

The signature typically appears at the top of the letter (handled automatically by the package).

### Image Requirements

- **Format**: PNG (recommended) or JPG
- **Resolution**: High resolution (300 DPI for printing)
- **Background**: Transparent (for PNG) or white
- **Colors**: Follow FIP color guidelines
- **CORS**: Ensure images are accessible (configure CORS if hosted externally)

---

## Bilingual Requirements

### Institutional Names

Department names must appear in both official languages:

```tsx
// Your signature image should include both:
// Department of Example | Ministère de l'exemple
```

### Content Language

For letter content, you can:

1. **Create separate letters** for each language
2. **Include both languages** in the same document

#### Separate Letters (Recommended)

```tsx
// English version
<GcLetter fileName="letter-en" deptSignature={signatureEN}>
  <LetterBlock content="Dear Sir or Madam..." />
</GcLetter>

// French version
<GcLetter fileName="letter-fr" deptSignature={signatureFR}>
  <LetterBlock content="Madame, Monsieur..." />
</GcLetter>
```

#### Bilingual Document

```tsx
<GcLetter fileName="letter-bilingual" deptSignature={signatureBilingual}>
  <LetterBlock content="# English Section

[English content]" />

  <SeparatorLine />

  <LetterBlock content="# Section française

[Contenu français]" />
</GcLetter>
```

### Accents in French

Always include proper accents:

```tsx
// ✅ Correct
<LetterBlock content="Ministère de l'Éducation" />

// ❌ Incorrect
<LetterBlock content="Ministere de l'Education" />
```

---

## Compliance Checklist

Use this checklist to ensure FIP compliance:

### Visual Identity
- [ ] Department signature includes flag symbol
- [ ] Institutional name is bilingual
- [ ] Canada wordmark is present (automatically included by package)
- [ ] Signature maintains 1:1.7 proportion ratio

### Typography
- [ ] Uses Helvetica typeface
- [ ] Appropriate weight (regular for letters)
- [ ] Upper and lowercase (not all capitals)
- [ ] French accents included correctly
- [ ] No ampersands (&) in institutional names

### Layout
- [ ] Appropriate page size (letter, legal, or A4)
- [ ] Margins are appropriate (38mm × 13mm default)
- [ ] Content stays within margins
- [ ] Spacing provides good readability

### Language
- [ ] Meets bilingual requirements
- [ ] Proper accents in French text
- [ ] Both official languages represented equally

### Professional Standards
- [ ] Clear and readable formatting
- [ ] Logical content organization
- [ ] Appropriate use of headings
- [ ] Consistent styling throughout

---

## Examples

### Minimal FIP-Compliant Letter

```tsx
import { GcLetter, LetterBlock } from 'gc-letters';

function FIPLetter() {
  return (
    <GcLetter
      fileName="fip-compliant"
      deptSignature="https://dept.gc.ca/signature-bilingual.png"
      fontFace="Helvetica"
      pageType="letter"
      xMargin="38mm"
      yMargin="13mm"
    >
      <LetterBlock content="[Date]

[Recipient Name]
[Address]

Dear [Recipient],

[Letter content]

Sincerely,

[Name]
[Title]
[Department]" />
    </GcLetter>
  );
}
```

### Multi-Page FIP Letter

```tsx
<GcLetter
  fileName="multi-page-fip"
  deptSignature="https://dept.gc.ca/signature.png"
  fontFace="Helvetica"
  showPageNumbers="skip-first"
  pageNumberFormat="-#-"
  pageNumberLocation="footer"
  showLetterNumber={true}
  letterNumber="DEPT-2024-001"
  letterNumberAlignment="right"
>
  <LetterBlock content="# Official Correspondence

[Content spanning multiple pages]" />
</GcLetter>
```

### Bilingual FIP Letter

```tsx
<GcLetter
  fileName="bilingual-fip"
  deptSignature="https://dept.gc.ca/signature-bilingual.png"
  fontFace="Helvetica"
>
  <LetterBlock content="**English**

Dear Recipient,

[English content]

Sincerely," />

  <SeparatorLine />

  <LetterBlock content="**Français**

Madame, Monsieur,

[Contenu français]

Cordialement," />
</GcLetter>
```

---

## Additional Resources

### Official FIP Resources

- [Design Standard for FIP](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/design-standard.html)
- [FIP Typography Guidelines](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/design-standard/typography-design-standard-fip.html)
- [Official Symbols Guide](https://www.canada.ca/en/treasury-board-secretariat/services/government-communications/design-standard/official-symbols-design-standard-fip.html)

### Package Documentation

- [API Reference](./API.md) - Complete prop documentation
- [Usage Guide](./USAGE_GUIDE.md) - Practical examples
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues

### Getting Help

If you have specific FIP compliance questions:

1. Contact your department's FIP coordinator
2. Refer to the official FIP Design Standard
3. Consult the Treasury Board Secretariat guidelines

---

## Notes

⚠️ **Important**: This package provides tools to help create FIP-compliant letters, but final compliance responsibility rests with your department. Always:

- Verify your department signature meets FIP standards
- Consult your FIP coordinator for department-specific requirements
- Review official FIP guidelines for the most current standards
- Test generated PDFs before official use

The FIP is managed by the Treasury Board of Canada Secretariat. For official guidance, refer to their published standards and contact your departmental communications team.
