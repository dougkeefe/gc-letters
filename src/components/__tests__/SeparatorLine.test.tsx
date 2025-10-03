import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GcLetter from '../GcLetter';
import LetterBlock from '../LetterBlock';
import SeparatorLine from '../SeparatorLine';

describe('SeparatorLine', () => {
  const renderInLetter = (component: React.ReactElement) => {
    return render(
      <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
        {component}
      </GcLetter>
    );
  };

  describe('Component Rendering', () => {
    it('should render without errors', () => {
      const { container } = renderInLetter(<SeparatorLine />);
      expect(container).toBeTruthy();
    });

    it('should render with data attribute', () => {
      const { container } = renderInLetter(<SeparatorLine />);
      expect(
        container.querySelector('[data-component="separator-line"]')
      ).toBeTruthy();
    });
  });

  describe('Integration with LetterBlocks', () => {
    it('should render between letter blocks', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <LetterBlock content="First section" />
          <SeparatorLine />
          <LetterBlock content="Second section" />
        </GcLetter>
      );
      expect(
        container.querySelector('[data-component="separator-line"]')
      ).toBeTruthy();
      expect(
        container.querySelectorAll('[data-component="letter-block"]')
      ).toHaveLength(2);
    });

    it('should render multiple separator lines', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <LetterBlock content="Section 1" />
          <SeparatorLine />
          <LetterBlock content="Section 2" />
          <SeparatorLine />
          <LetterBlock content="Section 3" />
        </GcLetter>
      );
      expect(
        container.querySelectorAll('[data-component="separator-line"]')
      ).toHaveLength(2);
    });
  });

  describe('Positioning', () => {
    it('should work at the beginning of a letter', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <SeparatorLine />
          <LetterBlock content="Content after line" />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should work at the end of a letter', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <LetterBlock content="Content before line" />
          <SeparatorLine />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });

    it('should work standalone', () => {
      const { container } = render(
        <GcLetter fileName="test" deptSignature="https://example.com/sig.png">
          <SeparatorLine />
        </GcLetter>
      );
      expect(container).toBeTruthy();
    });
  });
});
