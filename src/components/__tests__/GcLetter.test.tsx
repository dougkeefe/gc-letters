import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GcLetter from '../GcLetter';
import LetterBlock from '../LetterBlock';

describe('GcLetter', () => {
  const mockOnReady = jest.fn();

  beforeEach(() => {
    mockOnReady.mockClear();
  });

  describe('Component Rendering', () => {
    it('should render without errors', () => {
      const { container } = render(
        <GcLetter
          fileName="test-letter"
          deptSignature="https://example.com/sig.png"
        >
          <LetterBlock content="Test content" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should render with children', () => {
      const { container } = render(
        <GcLetter
          fileName="test-letter"
          deptSignature="https://example.com/sig.png"
        >
          <div data-testid="child-component">Child</div>
        </GcLetter>
      );
      expect(
        container.querySelector('[data-testid="child-component"]')
      ).toBeTruthy();
    });
  });

  describe('Prop Validation', () => {
    it('should throw error for missing fileName', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(
          <GcLetter fileName="" deptSignature="https://example.com/sig.png">
            <LetterBlock content="Test" />
          </GcLetter>
        );
      }).toThrow();

      consoleSpy.mockRestore();
    });

    it('should throw error for missing deptSignature', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(
          <GcLetter fileName="test" deptSignature="">
            <LetterBlock content="Test" />
          </GcLetter>
        );
      }).toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Page Types', () => {
    it('should accept letter page type', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          pageType="letter"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept legal page type', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          pageType="legal"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept a4 page type', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          pageType="a4"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Typography Settings', () => {
    it('should accept custom font face', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          fontFace="Times"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept custom text sizes', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          textSizeNormal="12pt"
          textSizeHeading1="18pt"
          textSizeHeading2="15pt"
          textSizeHeading3="13pt"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept custom spacing', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          paragraphSpacing="15mm"
          lineSpacing="8mm"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Page Numbering', () => {
    it('should accept page numbering configuration', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          showPageNumbers={true}
          pageNumberFormat="Page #"
          pageNumberLocation="footer"
          pageNumberAlignment="right"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept skip-first page numbering', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          showPageNumbers="skip-first"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Next Page Indicators', () => {
    it('should accept next page configuration', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          showNextPage={true}
          nextPageNumberFormat="Continued on #"
          nextPageNumberLocation="footer"
          nextPageNumberAlignment="center"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Letter Metadata', () => {
    it('should accept letter number', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          showLetterNumber={true}
          letterNumber="ABC-123-2024"
          letterNumberLocation="footer"
          letterNumberAlignment="right"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept letter version', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          letterVersion="v2.1"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });

  describe('Download Callback', () => {
    it('should call onReady with download function', () => {
      render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          onReady={mockOnReady}
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );

      expect(mockOnReady).toHaveBeenCalledTimes(1);
      expect(typeof mockOnReady.mock.calls[0][0]).toBe('function');
    });
  });

  describe('Margins', () => {
    it('should accept custom margins in mm', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          xMargin="50mm"
          yMargin="20mm"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should accept custom margins in different units', () => {
      const { container } = render(
        <GcLetter
          fileName="test"
          deptSignature="https://example.com/sig.png"
          xMargin="1.5in"
          yMargin="0.5in"
        >
          <LetterBlock content="Test" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });
});
