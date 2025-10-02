---
name: Bug Report
about: Report a bug or unexpected behavior
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description

A clear and concise description of what the bug is.

## Steps to Reproduce

1. Install the package with `npm install gc-letters`
2. Create a component with...
3. Render with...
4. Observe error...

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Code Example

```tsx
// Minimal code example that reproduces the issue
import { GcLetter, LetterBlock } from 'gc-letters';

function MyLetter() {
  return (
    <GcLetter fileName="test" deptSignature="...">
      <LetterBlock content="..." />
    </GcLetter>
  );
}
```

## Error Messages

```
Paste any error messages or console output here
```

## Environment

- **gc-letters version**: [e.g., 1.0.0]
- **React version**: [e.g., 18.2.0]
- **Browser**: [e.g., Chrome 120, Firefox 121]
- **Operating System**: [e.g., macOS 14, Windows 11, Ubuntu 22.04]
- **Node version** (if relevant): [e.g., 18.19.0]

## Additional Context

Add any other context about the problem here. Screenshots, PDF outputs, or network logs can be helpful.

## Possible Solution

If you have suggestions on how to fix this, please share them here.
