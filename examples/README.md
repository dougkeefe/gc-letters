# gc-letters Examples

This directory contains practical examples demonstrating how to use the gc-letters package.

## Running the Examples

These examples are React components that can be integrated into your application.

### Quick Start

1. **Install the package**:
   ```bash
   npm install gc-letters
   ```

2. **Import an example**:
   ```tsx
   import BasicExample from './examples/BasicExample';

   function App() {
     return <BasicExample />;
   }
   ```

3. **Run your application**:
   ```bash
   npm start
   ```

## Example Files

### BasicExample.tsx

**Purpose**: Minimal setup for generating a simple letter

**Demonstrates**:
- Required props (fileName, deptSignature)
- Basic markdown content
- Download button integration
- onReady callback usage

**Use this when**:
- Getting started with the package
- Creating simple, single-page letters
- Learning the basic API

### MultiPageExample.tsx

**Purpose**: Multi-page letter with page numbering

**Demonstrates**:
- Page numbering (skip-first option)
- Next page indicators
- Letter tracking numbers
- Multi-section content
- SeparatorLine usage

**Use this when**:
- Creating official correspondence
- Generating reports that span multiple pages
- Needing page numbers and metadata
- Working with structured, sectioned content

### CustomFormattingExample.tsx

**Purpose**: Advanced typography and formatting

**Demonstrates**:
- Custom font selection
- Custom text sizes
- Custom margins and spacing
- Block-level typography overrides
- Different text alignments (left, center, right, full)

**Use this when**:
- Customizing visual appearance
- Creating formatted documents
- Needing special layouts
- Working with mixed alignment requirements

## Using in Your Project

### Create React App

```bash
npx create-react-app my-letters-app
cd my-letters-app
npm install gc-letters
```

Copy an example file:
```bash
cp node_modules/gc-letters/examples/BasicExample.tsx src/
```

Update `src/App.tsx`:
```tsx
import React from 'react';
import BasicExample from './BasicExample';

function App() {
  return (
    <div className="App">
      <BasicExample />
    </div>
  );
}

export default App;
```

### Next.js

```bash
npx create-next-app my-letters-app
cd my-letters-app
npm install gc-letters
```

Create `pages/index.tsx`:
```tsx
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with jsPDF
const BasicExample = dynamic(
  () => import('../examples/BasicExample'),
  { ssr: false }
);

export default function Home() {
  return <BasicExample />;
}
```

### Vite

```bash
npm create vite@latest my-letters-app -- --template react-ts
cd my-letters-app
npm install gc-letters
```

Use examples as shown in Create React App section.

## Customizing Examples

### Change Department Signature

Replace the signature URL with your department's:

```tsx
<GcLetter
  deptSignature="https://your-department.gc.ca/signature.png"
  {...props}
>
```

### Modify Content

Update the markdown content in LetterBlock:

```tsx
<LetterBlock content={`# Your Title

Your content here with **formatting**.`} />
```

### Add Dynamic Data

```tsx
function DynamicLetter({ recipientName, data }) {
  return (
    <GcLetter {...props}>
      <LetterBlock content={`Dear ${recipientName},

${data.message}

Reference: ${data.refNumber}`} />
    </GcLetter>
  );
}
```

## Common Patterns

### Auto-Download on Mount

```tsx
<GcLetter
  onReady={(download) => download()}  // Downloads immediately
  {...props}
>
```

### User-Triggered Download

```tsx
const [downloadFn, setDownloadFn] = useState(null);

return (
  <>
    <button onClick={() => downloadFn?.()}>
      Download
    </button>
    <GcLetter onReady={setDownloadFn} {...props} />
  </>
);
```

### Generate Multiple PDFs

```tsx
{letters.map((letter, index) => (
  <GcLetter
    key={index}
    fileName={`letter-${index}`}
    onReady={(download) => {
      // Stagger downloads to avoid browser blocking
      setTimeout(download, index * 1000);
    }}
    {...props}
  >
    <LetterBlock content={letter.content} />
  </GcLetter>
))}
```

## Testing Examples

### Local Testing

1. Use data URLs for signatures:
   ```tsx
   deptSignature="data:image/png;base64,iVBORw0KG..."
   ```

2. Test with minimal content first:
   ```tsx
   <LetterBlock content="Test" />
   ```

3. Check browser console for errors

### Production Checklist

- [ ] Department signature URL is accessible
- [ ] File names are valid and descriptive
- [ ] Content is properly formatted
- [ ] CORS is configured for external images
- [ ] Tested in target browsers
- [ ] Download works as expected
- [ ] Multi-page content breaks correctly
- [ ] Typography is appropriate

## Additional Resources

- [API Reference](../docs/API.md) - Complete prop documentation
- [Usage Guide](../docs/USAGE_GUIDE.md) - Detailed usage patterns
- [FIP Compliance](../docs/FIP_COMPLIANCE.md) - Federal Identity Program standards
- [Troubleshooting](../docs/TROUBLESHOOTING.md) - Common issues and solutions

## Need More Help?

- Review the [visual test samples](../src/__tests__/visual/sampleLetters.tsx)
- Check the [troubleshooting guide](../docs/TROUBLESHOOTING.md)
- Refer to the [API documentation](../docs/API.md)

## Contributing Examples

Have a useful example? Consider contributing:

1. Create a new example file
2. Follow the existing pattern
3. Add documentation
4. Update this README
5. Submit a pull request
