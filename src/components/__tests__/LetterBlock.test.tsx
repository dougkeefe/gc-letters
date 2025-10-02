import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GcLetter from '../GcLetter';
import LetterBlock from '../LetterBlock';

describe('LetterBlock', () => {
  const renderInLetter = (component: React.ReactElement) => {
    return render(
      <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
        {component}
      </GcLetter>
    );
  };

  describe('Component Rendering', () => {
    it('should render with content prop', () => {
      const { container } = renderInLetter(
        <LetterBlock content="Test content" />
      );
      expect(container).toBeTruthy();
    });

    it('should render with children', () => {
      const { container } = renderInLetter(
        <LetterBlock>Test content as children</LetterBlock>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Markdown Rendering', () => {
    it('should accept markdown paragraphs', () => {
      const { container } = renderInLetter(
        <LetterBlock content="This is a paragraph with **bold** and *italic* text." />
      );
      expect(container).toBeTruthy();
    });

    it('should accept markdown headings', () => {
      const markdown = `
# Heading 1
## Heading 2
### Heading 3
Regular text
      `;
      const { container } = renderInLetter(<LetterBlock content={markdown} />);
      expect(container).toBeTruthy();
    });

    it('should accept markdown lists', () => {
      const markdown = `
Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First
2. Second
3. Third
      `;
      const { container } = renderInLetter(<LetterBlock content={markdown} />);
      expect(container).toBeTruthy();
    });

    it('should accept mixed markdown content', () => {
      const markdown = `
# Introduction

This is a **bold** statement with *italic* emphasis.

## Key Points

- First point
- Second point
- Third point

### Conclusion

Final paragraph text.
      `;
      const { container } = renderInLetter(<LetterBlock content={markdown} />);
      expect(container).toBeTruthy();
    });
  });

  describe('Typography Overrides', () => {
    it('should accept custom font face override', () => {
      const { container } = renderInLetter(
        <LetterBlock content="Test" fontFace="Times" />
      );
      expect(container).toBeTruthy();
    });

    it('should accept custom text size overrides', () => {
      const { container } = renderInLetter(
        <LetterBlock
          content="Test"
          textSizeNormal="12pt"
          textSizeHeading1="18pt"
          textSizeHeading2="15pt"
          textSizeHeading3="13pt"
        />
      );
      expect(container).toBeTruthy();
    });

    it('should accept custom spacing overrides', () => {
      const { container } = renderInLetter(
        <LetterBlock
          content="Test"
          paragraphSpacing="15mm"
          lineSpacing="8mm"
        />
      );
      expect(container).toBeTruthy();
    });

    it('should accept text alignment override', () => {
      const { container } = renderInLetter(
        <LetterBlock content="Test" textAlign="center" />
      );
      expect(container).toBeTruthy();
    });

    it('should accept all alignment options', () => {
      const alignments: Array<'left' | 'right' | 'center' | 'full'> = ['left', 'right', 'center', 'full'];

      alignments.forEach((align) => {
        const { container } = renderInLetter(
          <LetterBlock content="Test" textAlign={align} />
        );
        expect(container).toBeTruthy();
      });
    });
  });

  describe('Page Break Control', () => {
    it('should accept allowPagebreak=true', () => {
      const { container } = renderInLetter(
        <LetterBlock content="Test" allowPagebreak={true} />
      );
      expect(container).toBeTruthy();
    });

    it('should accept allowPagebreak=false', () => {
      const { container } = renderInLetter(
        <LetterBlock content="Test" allowPagebreak={false} />
      );
      expect(container).toBeTruthy();
    });

    it('should default allowPagebreak to true', () => {
      const { container } = renderInLetter(<LetterBlock content="Test" />);
      expect(container.querySelector('[data-allow-pagebreak="true"]')).toBeTruthy();
    });
  });

  describe('Nesting Prevention', () => {
    it('should throw error when LetterBlocks are nested', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderInLetter(
          <LetterBlock content="Outer">
            <LetterBlock content="Inner" />
          </LetterBlock>
        );
      }).toThrow('LetterBlock components cannot be nested');

      consoleSpy.mockRestore();
    });

    it('should provide clear error message for nesting', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      try {
        renderInLetter(
          <LetterBlock content="Outer">
            <LetterBlock content="Inner" />
          </LetterBlock>
        );
      } catch (error: any) {
        expect(error.message).toContain('must be a direct child of GcLetter');
      }

      consoleSpy.mockRestore();
    });
  });

  describe('Multiple LetterBlocks', () => {
    it('should render multiple sibling LetterBlocks', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <LetterBlock content="First block" />
          <LetterBlock content="Second block" />
          <LetterBlock content="Third block" />
        </GcLetter>
      );
      expect(container.querySelectorAll('[data-component="letter-block"]')).toHaveLength(3);
    });

    it('should render LetterBlocks with different typography', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <LetterBlock content="Left aligned" textAlign="left" />
          <LetterBlock content="Centered" textAlign="center" />
          <LetterBlock content="Right aligned" textAlign="right" />
        </GcLetter>
      );
      expect(container.querySelectorAll('[data-component="letter-block"]')).toHaveLength(3);
    });
  });

  describe('Long Content', () => {
    it('should handle very long content', () => {
      const longContent = Array(100)
        .fill('This is a long paragraph that will span multiple lines.')
        .join(' ');

      const { container } = renderInLetter(
        <LetterBlock content={longContent} />
      );
      expect(container).toBeTruthy();
    });

    it('should handle content with many paragraphs', () => {
      const manyParagraphs = Array(50)
        .fill('Paragraph content.')
        .join('\n\n');

      const { container } = renderInLetter(
        <LetterBlock content={manyParagraphs} />
      );
      expect(container).toBeTruthy();
    });
  });
});
