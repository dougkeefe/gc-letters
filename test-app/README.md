# GC Letters Test App

This is a local testing application for the `gc-letters` package. Use this to test the package before publishing to npm.

## Purpose

This test app allows you to:

1. **Test from source** - Import directly from `../src/index.ts` during development
2. **Test the built package** - Install the tarball created by `npm pack` to verify what will be published
3. **Visually verify PDFs** - See the PDF generation working in a real browser
4. **Test all examples** - Includes all three example configurations (Basic, MultiPage, Custom)

## Quick Start

### Testing from Source (Development)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173 in your browser. The app will import from the source code via the vite alias configured in `vite.config.ts`.

**How it works:** The vite config has an alias that maps `gc-letters` to `../src/index.ts`, so you're testing the actual source code.

### Testing the Built Package (Pre-Publish Verification)

This simulates what users will get when they `npm install gc-letters`:

```bash
# Build the tarball and install it
npm run test:package
```

This script:
1. Runs `npm pack` in the parent directory (creates `gc-letters-1.0.0.tgz`)
2. Installs that tarball in this test app
3. **Important:** After this, you must comment out the alias in `vite.config.ts` to test the installed package instead of source

**Manual steps after running `npm run test:package`:**

1. Open `vite.config.ts`
2. Comment out the alias:
   ```ts
   resolve: {
     alias: {
       // Comment this out when testing the built package
       // 'gc-letters': path.resolve(__dirname, '../src/index.ts'),
     },
   },
   ```
3. Restart the dev server: `npm run dev`
4. Test the examples - you're now using the built package!

To go back to testing source code, uncomment the alias and restart.

## What's Included

The test app includes three example configurations:

### 1. Basic Example
- Minimal setup with required props
- Simple markdown content
- Download button integration

### 2. Multi-Page Example
- Page numbering (skip-first option)
- Next page indicators
- Letter tracking number
- Multi-page content for testing page breaks

### 3. Custom Formatting Example
- Typography customization
- All four alignment types (left, right, center, full)
- Block-level typography overrides
- Custom fonts, sizes, and spacing

## Testing Checklist

Before publishing to npm, verify:

- [ ] All three examples generate PDFs successfully
- [ ] Download buttons work in all examples
- [ ] PDFs open correctly in browser/viewer
- [ ] FIP compliance (Helvetica font, proper margins)
- [ ] Page numbering works correctly
- [ ] Multi-page content flows properly
- [ ] Typography and alignment render correctly
- [ ] No console errors during PDF generation
- [ ] Built package works (tested via `npm run test:package`)

## Switching Between Source and Built Package

**Testing Source Code:**
- Alias enabled in `vite.config.ts`
- Fast development iteration
- Changes to source reflected immediately (after build in parent)

**Testing Built Package:**
1. Run `npm run test:package`
2. Comment out alias in `vite.config.ts`
3. Restart dev server
4. Now testing what will be published to npm

## Project Structure

```
test-app/
├── src/
│   ├── App.tsx          # Main app with all three examples
│   ├── main.tsx         # React entry point
│   └── index.css        # Styles
├── index.html           # HTML entry point
├── vite.config.ts       # Vite config with gc-letters alias
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies and scripts
```

## Troubleshooting

### "Module not found: gc-letters"

**If testing source:**
- Check that the alias in `vite.config.ts` is uncommented
- Verify the path `../src/index.ts` exists

**If testing built package:**
- Run `npm run test:package` first
- Comment out the alias in `vite.config.ts`
- Restart the dev server

### "Cannot find name 'GcLetter'"

TypeScript can't find the types. Ensure:
- You've run `npm install` in the test-app
- The parent package has been built (`npm run build` in parent)

### PDF not generating

- Check browser console for errors
- Verify the department signature URL is accessible
- Ensure all required props are provided (fileName, deptSignature)

### Changes not reflected

**If testing source:**
- You may need to rebuild the parent package: `cd .. && npm run build`
- Vite may need a restart

**If testing built package:**
- You need to re-run `npm run test:package` after making changes
- The tarball is a snapshot; it doesn't auto-update

## Next Steps

After testing is complete:

1. Verify all examples work with the built package
2. Follow the publishing steps in `docs/ACTION_STEPS.md`
3. Publish to npm
4. Test installation from npm in a fresh project

## Notes

- This test app is excluded from the published npm package (via `.npmignore`)
- The examples here mirror the standalone examples in `/examples`
- This is for **local testing only** - not meant to be deployed
