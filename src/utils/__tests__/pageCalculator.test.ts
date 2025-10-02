import {
  convertToMm,
  convertPtToMm,
  convertMmToPt,
  calculateAvailableHeight,
  calculateAvailableWidth,
  shouldBreakPage,
  getLineHeight,
} from '../pageCalculator';

describe('pageCalculator', () => {
  describe('convertToMm', () => {
    it('should convert mm values', () => {
      expect(convertToMm('10mm')).toBe(10);
      expect(convertToMm('25.5mm')).toBe(25.5);
    });

    it('should convert pt values', () => {
      expect(convertToMm('10pt')).toBeCloseTo(3.528, 2);
      expect(convertToMm('12pt')).toBeCloseTo(4.2336, 2);
    });

    it('should convert in values', () => {
      expect(convertToMm('1in')).toBe(25.4);
      expect(convertToMm('2.5in')).toBe(63.5);
    });

    it('should convert px values', () => {
      expect(convertToMm('96px')).toBeCloseTo(25.4, 1);
      expect(convertToMm('100px')).toBeCloseTo(26.46, 1);
    });

    it('should assume mm for unitless values', () => {
      expect(convertToMm('10')).toBe(10);
      expect(convertToMm('25.5')).toBe(25.5);
    });
  });

  describe('convertPtToMm', () => {
    it('should convert points to millimeters', () => {
      expect(convertPtToMm(10)).toBeCloseTo(3.528, 2);
      expect(convertPtToMm(12)).toBeCloseTo(4.2336, 2);
      expect(convertPtToMm(0)).toBe(0);
    });
  });

  describe('convertMmToPt', () => {
    it('should convert millimeters to points', () => {
      expect(convertMmToPt(3.528)).toBeCloseTo(10, 1);
      expect(convertMmToPt(25.4)).toBeCloseTo(72, 0);
      expect(convertMmToPt(0)).toBe(0);
    });
  });

  describe('calculateAvailableHeight', () => {
    it('should calculate available height', () => {
      expect(calculateAvailableHeight(279.4, 13, 13)).toBeCloseTo(253.4, 1);
      expect(calculateAvailableHeight(297, 20, 20)).toBe(257);
    });

    it('should handle zero margins', () => {
      expect(calculateAvailableHeight(279.4, 0, 0)).toBeCloseTo(279.4, 1);
    });

    it('should handle different top and bottom margins', () => {
      expect(calculateAvailableHeight(279.4, 10, 20)).toBeCloseTo(249.4, 1);
    });
  });

  describe('calculateAvailableWidth', () => {
    it('should calculate available width', () => {
      expect(calculateAvailableWidth(215.9, 38, 38)).toBe(139.9);
      expect(calculateAvailableWidth(210, 20, 20)).toBe(170);
    });

    it('should handle zero margins', () => {
      expect(calculateAvailableWidth(215.9, 0, 0)).toBe(215.9);
    });

    it('should handle different left and right margins', () => {
      expect(calculateAvailableWidth(215.9, 30, 40)).toBe(145.9);
    });
  });

  describe('shouldBreakPage', () => {
    it('should return true when content exceeds page', () => {
      // currentY: 250mm, contentHeight: 20mm, pageHeight: 279.4mm, bottomMargin: 13mm
      // 250 + 20 = 270 > 279.4 - 13 (266.4) = true
      expect(shouldBreakPage(250, 20, 279.4, 13)).toBe(true);
    });

    it('should return false when content fits on page', () => {
      // currentY: 200mm, contentHeight: 50mm, pageHeight: 279.4mm, bottomMargin: 13mm
      // 200 + 50 = 250 < 279.4 - 13 (266.4) = false
      expect(shouldBreakPage(200, 50, 279.4, 13)).toBe(false);
    });

    it('should return false when content exactly fits', () => {
      // currentY: 246.4mm, contentHeight: 20mm, pageHeight: 279.4mm, bottomMargin: 13mm
      // 246.4 + 20 = 266.4 = 279.4 - 13 (266.4) = false
      expect(shouldBreakPage(246.4, 20, 279.4, 13)).toBe(false);
    });

    it('should handle edge case at top of page', () => {
      expect(shouldBreakPage(13, 240, 279.4, 13)).toBe(false);
      expect(shouldBreakPage(13, 260, 279.4, 13)).toBe(true);
    });
  });

  describe('getLineHeight', () => {
    it('should use provided line spacing', () => {
      expect(getLineHeight('11pt', '7mm')).toBe(7);
      expect(getLineHeight('12pt', '10mm')).toBe(10);
    });

    it('should calculate default line height as 1.5x font size', () => {
      // 11pt = 3.88mm, 1.5x = 5.82mm
      expect(getLineHeight('11pt')).toBeCloseTo(5.82, 1);
      // 12pt = 4.23mm, 1.5x = 6.35mm
      expect(getLineHeight('12pt')).toBeCloseTo(6.35, 1);
    });

    it('should handle mm font sizes', () => {
      expect(getLineHeight('10mm')).toBe(15);
      expect(getLineHeight('5mm', '8mm')).toBe(8);
    });

    it('should handle various units for line spacing', () => {
      expect(getLineHeight('11pt', '20pt')).toBeCloseTo(7.056, 2);
      expect(getLineHeight('12pt', '0.3in')).toBeCloseTo(7.62, 1);
    });
  });
});
