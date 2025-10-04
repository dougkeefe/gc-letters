# Troubleshooting Guide

Common issues and solutions when using gc-letters.

## Table of Contents

- [Installation Issues](#installation-issues)
- [PDF Generation Issues](#pdf-generation-issues)
- [Image Loading Issues](#image-loading-issues)
- [Typography & Layout Issues](#typography--layout-issues)
- [Table Issues](#table-issues)
- [Component Errors](#component-errors)
- [Browser Compatibility](#browser-compatibility)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### Module not found: 'gc-letters'

**Problem**: Import statement fails after installation

```
Error: Cannot find module 'gc-letters'
```

**Solutions**:

1. Verify installation:
   ```bash
   npm list gc-letters
   ```

2. Reinstall the package:
   ```bash
   npm uninstall gc-letters
   npm install gc-letters
   ```

3. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. Check import statement:
   ```tsx
   // ✅ Correct
   import { GcLetter, LetterBlock } from 'gc-letters';

   // ❌ Incorrect
   import GcLetter from 'gc-letters';
   ```

### Peer dependency warnings

**Problem**: Warnings about React peer dependencies

**Solution**: Ensure React is installed:

```bash
npm install react@^17.0.0 react-dom@^17.0.0
# or
npm install react@^18.0.0 react-dom@^18.0.0
```

---

## PDF Generation Issues

### PDF doesn't download

**Problem**: Letter renders but PDF doesn't download

**Causes & Solutions**:

1. **onReady callback not called**
   ```tsx
   // ✅ Make sure to call the download function
   <GcLetter
     onReady={(download) => download()}
     {...props}
   >
   ```

2. **Browser blocking downloads**
   ```tsx
   // Add user interaction (button click)
   function LetterWithButton() {
     const [downloadFn, setDownloadFn] = useState(null);

     return (
       <>
         <button onClick={() => downloadFn?.()}>
           Download Letter
         </button>
         <GcLetter onReady={setDownloadFn} {...props} />
       </>
     );
   }
   ```

3. **Pop-up blocker active**
   - Check browser console for blocked download messages
   - Allow downloads from your site in browser settings

### Empty or blank PDF

**Problem**: PDF downloads but has no content

**Causes & Solutions**:

1. **Missing LetterBlock children**
   ```tsx
   // ❌ No content
   <GcLetter {...props} />

   // ✅ Has content
   <GcLetter {...props}>
     <LetterBlock content="Hello" />
   </GcLetter>
   ```

2. **Conditional rendering issues**
   ```tsx
   // ❌ May not render
   {someCondition && <LetterBlock content="..." />}

   // ✅ Always renders something
   <LetterBlock content={someCondition ? "Content" : "Default"} />
   ```

### PDF file name issues

**Problem**: Downloaded file has wrong name

**Solution**: Check fileName prop:

```tsx
// .pdf extension is added automatically
<GcLetter
  fileName="my-letter"  // Downloads as "my-letter.pdf"
  {...props}
>

// Don't add .pdf yourself
<GcLetter
  fileName="my-letter.pdf"  // Downloads as "my-letter.pdf.pdf"
  {...props}
>
```

---

## Image Loading Issues

### Department signature not appearing

**Problem**: Signature image doesn't show in PDF

**Causes & Solutions**:

1. **CORS issues**
   ```
   Error: Failed to load department signature image
   ```

   Solutions:
   - Host image on same domain
   - Configure CORS headers on image server
   - Use data URL for testing:
     ```tsx
     deptSignature="data:image/png;base64,iVBORw0KG..."
     ```

2. **Invalid URL**
   ```tsx
   // ✅ Valid URLs
   deptSignature="https://example.com/sig.png"
   deptSignature="/images/signature.png"
   deptSignature="./signature.png"
   deptSignature="data:image/png;base64,..."

   // ❌ Invalid
   deptSignature="signature"  // No path or extension
   ```

3. **Image format not supported**
   ```
   Error: Failed to add image to PDF
   ```

   **Supported formats**: PNG, JPG/JPEG only

   **Not supported**: SVG, WebP, GIF, TIFF

   ```tsx
   // ✅ Supported
   deptSignature="signature.png"
   deptSignature="signature.jpg"

   // ❌ Not supported
   deptSignature="signature.svg"  // SVG not supported by jsPDF
   deptSignature="signature.webp" // WebP not supported
   ```

   **Solution**: Convert SVG to PNG before use:
   - Use online converter (e.g., CloudConvert, Convertio)
   - Use command line: `convert signature.svg signature.png`
   - Export from design tool as PNG

4. **Image file too large**
   - Optimize images before use
   - Recommended: < 500KB
   - Use image compression tools

### Testing image loading

```tsx
// Test with a data URL first
const testSignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

<GcLetter deptSignature={testSignature} {...props}>
```

---

## Typography & Layout Issues

### Text cut off or not visible

**Problem**: Content appears cut off at edges

**Causes & Solutions**:

1. **Margins too large**
   ```tsx
   // ❌ Typo: 380mm instead of 38mm
   <GcLetter xMargin="380mm" {...props}>

   // ✅ Correct margins
   <GcLetter xMargin="38mm" yMargin="13mm" {...props}>
   ```

2. **Content too wide for page**
   - Let text wrap naturally
   - Avoid very long unbreakable strings
   - Check page size vs margin settings

3. **Font size too large**
   ```tsx
   // ✅ Reasonable sizes
   textSizeNormal="11pt"    // Good
   textSizeNormal="110pt"   // Too large!
   ```

### Spacing issues

**Problem**: Text too cramped or too spread out

**Solutions**:

1. **Adjust line spacing**
   ```tsx
   lineSpacing="7mm"     // Default
   lineSpacing="5mm"     // Tighter
   lineSpacing="10mm"    // Looser
   ```

2. **Adjust paragraph spacing**
   ```tsx
   paragraphSpacing="11mm"   // Default
   paragraphSpacing="8mm"    // Less space
   paragraphSpacing="15mm"   // More space
   ```

3. **Use block-level overrides**
   ```tsx
   <LetterBlock
     content="Tight section"
     lineSpacing="5mm"
     paragraphSpacing="8mm"
   />
   ```

### Font not applying

**Problem**: Custom font doesn't appear

**Cause**: jsPDF only supports built-in fonts

**Solution**: Use supported fonts:

```tsx
// ✅ Supported
fontFace="Helvetica"  // Default
fontFace="Times"
fontFace="Courier"

// ❌ Not supported
fontFace="Arial"
fontFace="Comic Sans"
fontFace="Custom Font"
```

For custom fonts, you need to add them to jsPDF (advanced topic, not recommended).

---

## Table Issues

### Table not rendering

**Problem**: Markdown table doesn't appear in PDF

**Causes & Solutions**:

1. **Invalid markdown table syntax**
   ```tsx
   // ❌ Invalid - missing pipes
   Header 1 | Header 2
   Cell 1 | Cell 2

   // ✅ Valid - complete table syntax
   <LetterBlock content={`
   | Header 1 | Header 2 |
   |----------|----------|
   | Cell 1   | Cell 2   |
   `} />
   ```

2. **Missing separator row**
   ```tsx
   // ❌ Missing separator
   | Header 1 | Header 2 |
   | Cell 1   | Cell 2   |

   // ✅ Has separator
   | Header 1 | Header 2 |
   |----------|----------|
   | Cell 1   | Cell 2   |
   ```

### Table extends beyond page width

**Problem**: Table is too wide and gets cut off

**Solutions**:

1. **Reduce number of columns**
   - Limit to 5-6 columns for optimal readability
   - Split large tables into multiple smaller tables

2. **Use shorter header/cell text**
   - Abbreviate column names
   - Use line breaks in cells if needed

3. **Adjust margins**
   ```tsx
   // Use smaller margins for wide tables
   <GcLetter xMargin="25mm" {...props}>
   ```

### Table alignment not working

**Problem**: Column alignment doesn't match markdown syntax

**Check alignment syntax**:

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |
```

- Left: `:-------` or `--------` (default)
- Center: `:------:`
- Right: `-------:`

### Table styling issues

**Problem**: Table colors or borders don't look right

**Solutions**:

```tsx
// Use RGB values 0-255
<LetterBlock
  content={tableMarkdown}
  tableTheme="grid"  // or 'striped', 'plain'
  tableHeaderBold={true}
  tableHeaderFillColor={[240, 240, 240]}  // Light gray
  tableBorderColor={[200, 200, 200]}      // Medium gray
/>
```

### Table breaks across pages unexpectedly

**Problem**: Table split in awkward places

**Solutions**:

1. **For small tables - prevent breaking**
   ```tsx
   <LetterBlock
     content={tableMarkdown}
     allowPagebreak={false}
   />
   ```

2. **For large tables - allow natural breaks**
   ```tsx
   // Let jsPDF-AutoTable handle pagination automatically
   <LetterBlock
     content={largeTableMarkdown}
     allowPagebreak={true}  // Default
   />
   ```

---

## Component Errors

### "LetterBlock components cannot be nested"

**Problem**:
```
Error: LetterBlock components cannot be nested.
Each LetterBlock must be a direct child of GcLetter.
```

**Cause**: LetterBlock inside another LetterBlock

**Solution**:

```tsx
// ❌ Nested - causes error
<GcLetter {...props}>
  <LetterBlock content="Outer">
    <LetterBlock content="Inner" />
  </LetterBlock>
</GcLetter>

// ✅ Siblings - works correctly
<GcLetter {...props}>
  <LetterBlock content="First" />
  <LetterBlock content="Second" />
</GcLetter>
```

### "fileName is required"

**Problem**: Missing or empty fileName prop

**Solution**:

```tsx
// ❌ Missing or empty
<GcLetter fileName="" {...props}>
<GcLetter fileName={undefined} {...props}>

// ✅ Valid
<GcLetter fileName="my-letter" {...props}>
```

### "pageNumberFormat must contain #"

**Problem**: Invalid page number format

**Solution**:

```tsx
// ❌ Missing # placeholder
<GcLetter pageNumberFormat="Page" {...props}>

// ✅ Contains # placeholder
<GcLetter pageNumberFormat="Page #" {...props}>
<GcLetter pageNumberFormat="-#-" {...props}>
<GcLetter pageNumberFormat="# of 10" {...props}>
```

### React key warnings

**Problem**: Warning about missing keys in lists

**Solution**:

```tsx
// ✅ Add keys when mapping
{items.map((item, index) => (
  <LetterBlock key={item.id || index} content={item.content} />
))}
```

---

## Browser Compatibility

### PDF doesn't work in Internet Explorer

**Problem**: Package not working in IE11

**Cause**: Package uses modern JavaScript (ES6+)

**Solution**:
- IE11 is not supported
- Recommend modern browsers: Chrome, Firefox, Safari, Edge
- If IE11 support is required, consider transpiling dependencies

### Mobile browser issues

**Problem**: Download doesn't work on mobile

**Solutions**:

1. **Use browser-native save**
   - Some mobile browsers handle downloads differently
   - Test on actual devices

2. **Provide alternative**
   ```tsx
   // Show PDF in new tab instead of downloading
   const handleReady = (download) => {
     if (isMobileDevice()) {
       // Generate blob URL and open in new tab
       // (requires additional implementation)
     } else {
       download();
     }
   };
   ```

---

## Performance Issues

### Slow PDF generation

**Problem**: Letter takes long time to generate

**Causes & Solutions**:

1. **Large images**
   - Compress department signature image
   - Use appropriate resolution (72-150 DPI for screen, 300 DPI for print)
   - Recommended size: < 500KB

2. **Very long content**
   - Break into multiple documents
   - Use pagination
   - Consider incremental generation

3. **Multiple letters at once**
   ```tsx
   // ❌ All at once - browser may hang
   {letters.map(letter => <GcLetter {...letter} />)}

   // ✅ Stagger generation
   {letters.map((letter, i) => (
     <GcLetter
       key={i}
       onReady={(download) => {
         setTimeout(download, i * 1000);  // 1 second delay each
       }}
       {...letter}
     />
   ))}
   ```

### Memory issues

**Problem**: Browser runs out of memory with many letters

**Solutions**:

1. **Generate one at a time**
   ```tsx
   const [currentIndex, setCurrentIndex] = useState(0);

   return (
     <>
       {currentIndex < letters.length && (
         <GcLetter
           {...letters[currentIndex]}
           onReady={(download) => {
             download();
             setCurrentIndex(i => i + 1);
           }}
         />
       )}
     </>
   );
   ```

2. **Clean up between generations**
   - Unmount components after download
   - Clear state between generations

---

## Debugging Tips

### Enable console logging

Add logging to trace issues:

```tsx
<GcLetter
  onReady={(download) => {
    console.log('PDF ready for download');
    console.log('File name:', fileName);
    try {
      download();
      console.log('Download initiated');
    } catch (error) {
      console.error('Download failed:', error);
    }
  }}
  {...props}
>
```

### Check component rendering

```tsx
// Add data attributes to track rendering
<LetterBlock
  content="Test"
  data-debug="block-1"
/>

// Check in DevTools that components rendered
```

### Validate props

```tsx
// Log props to verify they're correct
useEffect(() => {
  console.log('GcLetter props:', {
    fileName,
    deptSignature,
    pageType,
    // ...
  });
}, []);
```

---

## Getting Help

If you're still experiencing issues:

1. **Check the documentation**
   - [API Reference](./API.md)
   - [Usage Guide](./USAGE_GUIDE.md)
   - [FIP Compliance](./FIP_COMPLIANCE.md)

2. **Review examples**
   - [Visual test samples](../src/__tests__/visual/sampleLetters.tsx)
   - [Visual testing README](../src/__tests__/visual/README.md)

3. **Check for known issues**
   - Review GitHub issues
   - Search for similar problems

4. **Create a minimal reproduction**
   - Isolate the problem
   - Remove unnecessary code
   - Test with minimal example

5. **Report the issue**
   - Include error messages
   - Provide code example
   - Describe expected vs actual behavior
   - Include browser and package versions
