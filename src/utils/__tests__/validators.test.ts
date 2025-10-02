import {
  validateFileName,
  validateDeptSignature,
  validatePageNumberFormat,
  validateNextPageFormat,
  validateUnitValue,
  validateMarginValues,
  validateSpacingValues,
} from '../validators';

describe('validators', () => {
  describe('validateFileName', () => {
    it('should accept valid file names', () => {
      expect(() => validateFileName('letter.pdf')).not.toThrow();
      expect(() => validateFileName('my-letter')).not.toThrow();
      expect(() => validateFileName('letter_2024')).not.toThrow();
    });

    it('should throw error for empty file name', () => {
      expect(() => validateFileName('')).toThrow('fileName is required');
    });

    it('should throw error for whitespace-only file name', () => {
      expect(() => validateFileName('   ')).toThrow('fileName is required');
    });
  });

  describe('validateDeptSignature', () => {
    it('should accept valid absolute URLs', () => {
      expect(() =>
        validateDeptSignature('https://example.com/signature.png')
      ).not.toThrow();
      expect(() =>
        validateDeptSignature('http://example.com/sig.png')
      ).not.toThrow();
    });

    it('should accept valid relative paths', () => {
      expect(() => validateDeptSignature('/images/signature.png')).not.toThrow();
      expect(() => validateDeptSignature('./signature.png')).not.toThrow();
    });

    it('should accept data URLs', () => {
      expect(() =>
        validateDeptSignature('data:image/png;base64,iVBORw0KGgoAAAANS')
      ).not.toThrow();
    });

    it('should throw error for empty signature', () => {
      expect(() => validateDeptSignature('')).toThrow(
        'deptSignature is required'
      );
    });

    it('should throw error for whitespace-only signature', () => {
      expect(() => validateDeptSignature('   ')).toThrow(
        'deptSignature is required'
      );
    });

    it('should warn for invalid-looking signatures', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      validateDeptSignature('not-a-valid-path');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('deptSignature should be a valid URL')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('validatePageNumberFormat', () => {
    it('should accept formats with # placeholder', () => {
      expect(() => validatePageNumberFormat('-#-')).not.toThrow();
      expect(() => validatePageNumberFormat('Page #')).not.toThrow();
      expect(() => validatePageNumberFormat('# of 10')).not.toThrow();
    });

    it('should throw error for format without #', () => {
      expect(() => validatePageNumberFormat('Page 1')).toThrow(
        'pageNumberFormat must contain # as placeholder for page number'
      );
    });
  });

  describe('validateNextPageFormat', () => {
    it('should accept formats with # placeholder', () => {
      expect(() => validateNextPageFormat('.../#')).not.toThrow();
      expect(() => validateNextPageFormat('Next: #')).not.toThrow();
    });

    it('should throw error for format without #', () => {
      expect(() => validateNextPageFormat('...')).toThrow(
        'nextPageNumberFormat must contain # as placeholder for page number'
      );
    });
  });

  describe('validateUnitValue', () => {
    it('should accept valid unit values', () => {
      expect(() => validateUnitValue('10mm')).not.toThrow();
      expect(() => validateUnitValue('12pt')).not.toThrow();
      expect(() => validateUnitValue('1in')).not.toThrow();
      expect(() => validateUnitValue('100px')).not.toThrow();
    });

    it('should accept numeric-only values', () => {
      expect(() => validateUnitValue('10')).not.toThrow();
      expect(() => validateUnitValue('25.5')).not.toThrow();
    });

    it('should accept numeric-only values without units', () => {
      // validateUnitValue accepts any numeric value, even with non-standard units
      // It only validates that it's parseable and positive
      expect(() => validateUnitValue('10cm')).not.toThrow();
    });

    it('should throw error for negative values', () => {
      expect(() => validateUnitValue('-10mm')).toThrow(
        'value must be positive, got: -10mm'
      );
    });

    it('should include field name in error messages', () => {
      expect(() => validateUnitValue('-5mm', 'spacing')).toThrow(
        'spacing value must be positive'
      );
    });
  });

  describe('validateMarginValues', () => {
    it('should accept valid margin values', () => {
      expect(() => validateMarginValues('38mm', '13mm')).not.toThrow();
      expect(() => validateMarginValues('1in', '0.5in')).not.toThrow();
    });

    it('should throw error for invalid x margin', () => {
      expect(() => validateMarginValues('invalid', '13mm')).toThrow();
    });

    it('should throw error for invalid y margin', () => {
      expect(() => validateMarginValues('38mm', '-5mm')).toThrow();
    });

    it('should warn for unusually large margins', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      validateMarginValues('150mm', '120mm');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Large margin values detected')
      );
      consoleSpy.mockRestore();
    });

    it('should not warn for normal margins', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      validateMarginValues('38mm', '13mm');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('validateSpacingValues', () => {
    it('should accept valid spacing values', () => {
      expect(() => validateSpacingValues('11mm', '7mm')).not.toThrow();
      expect(() => validateSpacingValues('10pt', '5pt')).not.toThrow();
    });

    it('should accept undefined values', () => {
      expect(() => validateSpacingValues(undefined, undefined)).not.toThrow();
      expect(() => validateSpacingValues('11mm', undefined)).not.toThrow();
      expect(() => validateSpacingValues(undefined, '7mm')).not.toThrow();
    });

    it('should throw error for invalid paragraph spacing', () => {
      expect(() => validateSpacingValues('invalid', '7mm')).toThrow();
    });

    it('should throw error for invalid line spacing', () => {
      expect(() => validateSpacingValues('11mm', '-5mm')).toThrow();
    });
  });
});
