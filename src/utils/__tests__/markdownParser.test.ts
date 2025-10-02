import { jsPDF } from 'jspdf';
import {
  parseMarkdown,
  renderParagraph,
  renderHeading,
  renderListItem,
  RenderContext,
} from '../markdownParser';
import { Tokens } from 'marked';

describe('markdownParser', () => {
  let mockPdf: jsPDF;
  let mockContext: RenderContext;

  beforeEach(() => {
    mockPdf = new jsPDF();
    mockContext = {
      pdf: mockPdf,
      x: 10,
      y: 20,
      maxWidth: 180,
      fontSizeNormal: 11,
      fontSizeH1: 16,
      fontSizeH2: 14,
      fontSizeH3: 12,
      lineSpacing: 7,
      paragraphSpacing: 11,
      textAlign: 'left',
    };
  });

  describe('parseMarkdown', () => {
    it('should parse paragraph markdown', () => {
      const markdown = 'This is a paragraph.';
      const tokens = parseMarkdown(markdown);
      expect(tokens.length).toBeGreaterThan(0);
      expect(tokens[0].type).toBe('paragraph');
    });

    it('should parse heading markdown', () => {
      const markdown = '# Heading 1';
      const tokens = parseMarkdown(markdown);
      expect(tokens.length).toBeGreaterThan(0);
      expect(tokens[0].type).toBe('heading');
      expect((tokens[0] as Tokens.Heading).depth).toBe(1);
    });

    it('should parse list markdown', () => {
      const markdown = '- Item 1\n- Item 2';
      const tokens = parseMarkdown(markdown);
      expect(tokens.length).toBeGreaterThan(0);
      expect(tokens[0].type).toBe('list');
    });

    it('should parse multiple markdown elements', () => {
      const markdown = '# Heading\n\nParagraph text.\n\n- List item';
      const tokens = parseMarkdown(markdown);
      expect(tokens.length).toBeGreaterThanOrEqual(3);
    });

    it('should handle empty markdown', () => {
      const tokens = parseMarkdown('');
      expect(Array.isArray(tokens)).toBe(true);
    });
  });

  describe('renderParagraph', () => {
    it('should return updated Y position', () => {
      const text = 'This is a test paragraph.';
      const newY = renderParagraph(mockContext, text);
      // Y should increase by at least line spacing + paragraph spacing
      expect(newY).toBeGreaterThan(mockContext.y);
    });

    it('should set normal font size', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderParagraph(mockContext, 'Test');
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeNormal);
    });

    it('should handle long text with wrapping', () => {
      const longText = 'This is a very long paragraph that will definitely need to be wrapped across multiple lines to fit within the maximum width constraint.';
      const newY = renderParagraph(mockContext, longText);
      // Should span multiple lines
      expect(newY).toBeGreaterThan(mockContext.y + mockContext.lineSpacing);
    });

    it('should respect left alignment', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      mockContext.textAlign = 'left';
      renderParagraph(mockContext, 'Test');
      // First call should be at the original x position
      expect(textSpy).toHaveBeenCalledWith(
        expect.any(String),
        mockContext.x,
        expect.any(Number)
      );
    });

    it('should handle center alignment', () => {
      mockContext.textAlign = 'center';
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderParagraph(mockContext, 'Test');
      // Text should be rendered (x position will be calculated)
      expect(textSpy).toHaveBeenCalled();
    });

    it('should handle right alignment', () => {
      mockContext.textAlign = 'right';
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderParagraph(mockContext, 'Test');
      expect(textSpy).toHaveBeenCalled();
    });

    it('should handle full justification', () => {
      mockContext.textAlign = 'full';
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderParagraph(mockContext, 'This is a longer text that needs justification');
      expect(textSpy).toHaveBeenCalled();
    });
  });

  describe('renderHeading', () => {
    it('should render H1 with correct font size', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderHeading(mockContext, 'Heading 1', 1);
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeH1);
    });

    it('should render H2 with correct font size', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderHeading(mockContext, 'Heading 2', 2);
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeH2);
    });

    it('should render H3 with correct font size', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderHeading(mockContext, 'Heading 3', 3);
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeH3);
    });

    it('should use H2 size for unknown heading levels', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderHeading(mockContext, 'Heading', 5);
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeH2);
    });

    it('should set bold font style', () => {
      const setFontSpy = jest.spyOn(mockPdf, 'setFont');
      renderHeading(mockContext, 'Heading', 1);
      expect(setFontSpy).toHaveBeenCalledWith(expect.any(String), 'bold');
    });

    it('should return updated Y position', () => {
      const newY = renderHeading(mockContext, 'Test Heading', 1);
      expect(newY).toBeGreaterThan(mockContext.y);
    });

    it('should handle long headings with wrapping', () => {
      const longHeading = 'This is a very long heading that will need to wrap across multiple lines';
      const newY = renderHeading(mockContext, longHeading, 1);
      expect(newY).toBeGreaterThan(mockContext.y);
    });

    it('should respect text alignment', () => {
      mockContext.textAlign = 'center';
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderHeading(mockContext, 'Centered Heading', 1);
      expect(textSpy).toHaveBeenCalled();
    });
  });

  describe('renderListItem', () => {
    it('should render unordered list item with bullet', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderListItem(mockContext, 'List item', false, 0);
      // Should render bullet
      expect(textSpy).toHaveBeenCalledWith('•', expect.any(Number), expect.any(Number));
    });

    it('should render ordered list item with number', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderListItem(mockContext, 'List item', true, 0);
      // Should render "1."
      expect(textSpy).toHaveBeenCalledWith('1.', expect.any(Number), expect.any(Number));
    });

    it('should increment ordered list numbers', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderListItem(mockContext, 'Second item', true, 1);
      // Should render "2."
      expect(textSpy).toHaveBeenCalledWith('2.', expect.any(Number), expect.any(Number));
    });

    it('should return updated Y position', () => {
      const newY = renderListItem(mockContext, 'Test item', false, 0);
      expect(newY).toBeGreaterThan(mockContext.y);
    });

    it('should handle long list items with wrapping', () => {
      const longItem = 'This is a very long list item that will need to wrap across multiple lines to fit within the available space';
      const newY = renderListItem(mockContext, longItem, false, 0);
      // Should at least move Y position by line spacing
      expect(newY).toBeGreaterThanOrEqual(mockContext.y + mockContext.lineSpacing);
    });

    it('should set normal font size', () => {
      const setFontSizeSpy = jest.spyOn(mockPdf, 'setFontSize');
      renderListItem(mockContext, 'Item', false, 0);
      expect(setFontSizeSpy).toHaveBeenCalledWith(mockContext.fontSizeNormal);
    });

    it('should indent list items', () => {
      const textSpy = jest.spyOn(mockPdf, 'text');
      renderListItem(mockContext, 'Item', false, 0);
      // Text should be rendered with indent (x > original x)
      const calls = textSpy.mock.calls;
      expect(calls.some(call => call[1] > mockContext.x)).toBe(true);
    });
  });
});
