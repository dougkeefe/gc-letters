import { jsPDF } from 'jspdf';
import {
  getPageDimensions,
  createPDF,
  downloadPDF,
  loadImage,
  getAlignedX,
  renderPageNumber,
} from '../pdfGenerator';
import { PageType, Alignment } from '../../types';

describe('pdfGenerator', () => {
  describe('getPageDimensions', () => {
    it('should return letter dimensions', () => {
      const dims = getPageDimensions('letter');
      expect(dims).toEqual({ width: 215.9, height: 279.4 });
    });

    it('should return legal dimensions', () => {
      const dims = getPageDimensions('legal');
      expect(dims).toEqual({ width: 215.9, height: 355.6 });
    });

    it('should return A4 dimensions', () => {
      const dims = getPageDimensions('a4');
      expect(dims).toEqual({ width: 210, height: 297 });
    });

    it('should default to letter for unknown type', () => {
      const dims = getPageDimensions('unknown' as PageType);
      expect(dims).toEqual({ width: 215.9, height: 279.4 });
    });
  });

  describe('createPDF', () => {
    it('should create PDF with letter dimensions', () => {
      const pdf = createPDF('letter');
      expect(pdf).toBeDefined();
      expect(pdf.internal).toBeDefined();
      const pageSize = pdf.internal.pageSize;
      expect(pageSize.width).toBeCloseTo(215.9, 1);
      expect(pageSize.height).toBeCloseTo(279.4, 1);
    });

    it('should create PDF with legal dimensions', () => {
      const pdf = createPDF('legal');
      expect(pdf).toBeDefined();
      const pageSize = pdf.internal.pageSize;
      expect(pageSize.width).toBeCloseTo(215.9, 1);
      expect(pageSize.height).toBeCloseTo(355.6, 1);
    });

    it('should create PDF with A4 dimensions', () => {
      const pdf = createPDF('a4');
      expect(pdf).toBeDefined();
      const pageSize = pdf.internal.pageSize;
      expect(pageSize.width).toBeCloseTo(210, 1);
      expect(pageSize.height).toBeCloseTo(297, 1);
    });

    it('should create PDF in portrait orientation', () => {
      const pdf = createPDF('letter');
      expect(pdf.internal.pageSize.width).toBeLessThan(pdf.internal.pageSize.height);
    });
  });

  describe('downloadPDF', () => {
    let mockPdf: jsPDF;

    beforeEach(() => {
      mockPdf = new jsPDF();
    });

    it('should trigger download with correct filename', () => {
      const saveSpy = jest.spyOn(mockPdf, 'save').mockImplementation();
      downloadPDF(mockPdf, 'test-letter');
      expect(saveSpy).toHaveBeenCalledWith('test-letter.pdf');
    });

    it('should not duplicate .pdf extension', () => {
      const saveSpy = jest.spyOn(mockPdf, 'save').mockImplementation();
      downloadPDF(mockPdf, 'letter.pdf');
      expect(saveSpy).toHaveBeenCalledWith('letter.pdf');
    });

    it('should throw error if save fails', () => {
      jest.spyOn(mockPdf, 'save').mockImplementation(() => {
        throw new Error('Save failed');
      });
      expect(() => downloadPDF(mockPdf, 'test')).toThrow(
        'Failed to download PDF. Please try again.'
      );
    });

    it('should log error to console on failure', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(mockPdf, 'save').mockImplementation(() => {
        throw new Error('Save failed');
      });
      try {
        downloadPDF(mockPdf, 'test');
      } catch (e) {
        // Expected
      }
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('loadImage', () => {
    beforeEach(() => {
      // Clear any previous Image mocks
      jest.clearAllMocks();
    });

    it('should resolve with image on successful load', async () => {
      const mockImage = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
        crossOrigin: '',
      };

      // Mock Image constructor
      global.Image = jest.fn(() => mockImage) as unknown as typeof Image;

      const loadPromise = loadImage('https://example.com/image.png');

      // Trigger onload
      setTimeout(() => {
        if (mockImage.onload) mockImage.onload();
      }, 0);

      const img = await loadPromise;
      expect(img).toBe(mockImage);
      expect(mockImage.crossOrigin).toBe('Anonymous');
    });

    it('should reject with error on failed load', async () => {
      const mockImage = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
        crossOrigin: '',
      };

      global.Image = jest.fn(() => mockImage) as unknown as typeof Image;

      const loadPromise = loadImage('https://example.com/missing.png');

      // Trigger onerror
      setTimeout(() => {
        if (mockImage.onerror) mockImage.onerror();
      }, 0);

      await expect(loadPromise).rejects.toThrow(
        'Failed to load department signature image'
      );
    });

    it('should set crossOrigin to Anonymous', () => {
      const mockImage = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
        crossOrigin: '',
      };

      global.Image = jest.fn(() => mockImage) as unknown as typeof Image;

      loadImage('https://example.com/image.png');

      expect(mockImage.crossOrigin).toBe('Anonymous');
    });
  });

  describe('getAlignedX', () => {
    const pageWidth = 215.9;
    const leftMargin = 38;
    const rightMargin = 38;

    it('should return left margin for left alignment', () => {
      const x = getAlignedX('left', pageWidth, leftMargin, rightMargin);
      expect(x).toBe(leftMargin);
    });

    it('should calculate center position', () => {
      const textWidth = 50;
      const x = getAlignedX('center', pageWidth, leftMargin, rightMargin, textWidth);
      const availableWidth = pageWidth - leftMargin - rightMargin;
      const expected = leftMargin + (availableWidth - textWidth) / 2;
      expect(x).toBeCloseTo(expected, 2);
    });

    it('should calculate right position', () => {
      const textWidth = 50;
      const x = getAlignedX('right', pageWidth, leftMargin, rightMargin, textWidth);
      const expected = pageWidth - rightMargin - textWidth;
      expect(x).toBeCloseTo(expected, 2);
    });

    it('should default to left alignment for unknown alignment', () => {
      const x = getAlignedX('unknown' as Alignment, pageWidth, leftMargin, rightMargin);
      expect(x).toBe(leftMargin);
    });

    it('should handle zero text width', () => {
      const x = getAlignedX('center', pageWidth, leftMargin, rightMargin, 0);
      const availableWidth = pageWidth - leftMargin - rightMargin;
      const expected = leftMargin + availableWidth / 2;
      expect(x).toBeCloseTo(expected, 2);
    });
  });

  describe('renderPageNumber', () => {
    let mockPdf: jsPDF;

    beforeEach(() => {
      mockPdf = new jsPDF();
      jest.spyOn(mockPdf, 'text').mockImplementation();
      jest.spyOn(mockPdf, 'getTextWidth').mockReturnValue(10);
    });

    it('should replace # with page number', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderPageNumber(mockPdf, 3, 'Page #', 'header', 'center', 215.9, 279.4, 38, 13);
      expect(textSpy).toHaveBeenCalledWith('Page 3', expect.any(Number), expect.any(Number));
    });

    it('should render in header location', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      const yMargin = 13;
      renderPageNumber(mockPdf, 1, '-#-', 'header', 'center', 215.9, 279.4, 38, yMargin);
      const yPos = textSpy.mock.calls[0][2];
      expect(yPos).toBe(yMargin / 2);
    });

    it('should render in footer location', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      const pageHeight = 279.4;
      const yMargin = 13;
      renderPageNumber(mockPdf, 1, '-#-', 'footer', 'center', 215.9, pageHeight, 38, yMargin);
      const yPos = textSpy.mock.calls[0][2];
      expect(yPos).toBe(pageHeight - yMargin / 2);
    });

    it('should handle left alignment', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      const xMargin = 38;
      renderPageNumber(mockPdf, 1, '-#-', 'header', 'left', 215.9, 279.4, xMargin, 13);
      const xPos = textSpy.mock.calls[0][1];
      expect(xPos).toBe(xMargin);
    });

    it('should handle center alignment', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderPageNumber(mockPdf, 1, '-#-', 'header', 'center', 215.9, 279.4, 38, 13);
      // X position should be centered (calculated based on page width and text width)
      expect(textSpy).toHaveBeenCalled();
    });

    it('should handle right alignment', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderPageNumber(mockPdf, 1, '-#-', 'header', 'right', 215.9, 279.4, 38, 13);
      // X position should be right-aligned
      expect(textSpy).toHaveBeenCalled();
    });
  });
});
