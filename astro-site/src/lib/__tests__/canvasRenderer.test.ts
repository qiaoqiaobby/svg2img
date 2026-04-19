import { describe, it, expect } from 'vitest';
import { sanitizeSvgContent, getMimeType } from '../canvasRenderer';

// ======================== sanitizeSvgContent ========================

describe('sanitizeSvgContent', () => {
  it('returns cleaned SVG for valid input', () => {
    const svg = '<svg width="100" height="100"><rect fill="red"/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).toContain('<svg');
    expect(result).toContain('<rect');
  });

  it('removes script tags', () => {
    const svg = '<svg><script>alert(1)</script><rect/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('<script');
    expect(result).not.toContain('alert');
    expect(result).toContain('<rect');
  });

  it('removes onload attribute', () => {
    const svg = '<svg onload="alert(1)"><rect/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('onload');
    expect(result).not.toContain('alert');
  });

  it('removes onerror attribute', () => {
    const svg = '<svg><image onerror="alert(1)"/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('onerror');
  });

  it('removes onclick attribute', () => {
    const svg = '<svg><rect onclick="alert(1)"/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('onclick');
  });

  it('removes multiple dangerous attributes', () => {
    const svg = '<svg onload="a"><rect onclick="b" onmouseover="c"/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('onload');
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onmouseover');
  });

  it('injects default viewBox when no dimensions exist', () => {
    const svg = '<svg><rect/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).toContain('viewBox="0 0 300 150"');
  });

  it('does not inject viewBox when width exists', () => {
    const svg = '<svg width="100"><rect/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).not.toContain('viewBox="0 0 300 150"');
  });

  it('does not inject viewBox when viewBox exists', () => {
    const svg = '<svg viewBox="0 0 200 100"><rect/></svg>';
    const result = sanitizeSvgContent(svg);
    expect(result).toContain('viewBox="0 0 200 100"');
    // Should not have a second viewBox injected
    expect(result.match(/viewBox/g)?.length).toBe(1);
  });

  it('throws on empty input', () => {
    expect(() => sanitizeSvgContent('')).toThrow('Invalid SVG content');
  });

  it('throws on non-SVG input', () => {
    expect(() => sanitizeSvgContent('<div>not svg</div>')).toThrow('Invalid SVG content');
  });

  it('throws on null/undefined input', () => {
    // @ts-expect-error testing invalid input
    expect(() => sanitizeSvgContent(null)).toThrow('Invalid SVG content');
    // @ts-expect-error testing invalid input
    expect(() => sanitizeSvgContent(undefined)).toThrow('Invalid SVG content');
  });
});

// ======================== getMimeType ========================

describe('getMimeType', () => {
  it('returns image/png for png', () => {
    expect(getMimeType('png')).toBe('image/png');
  });

  it('returns image/jpeg for jpg', () => {
    expect(getMimeType('jpg')).toBe('image/jpeg');
  });

  it('returns image/webp for webp', () => {
    expect(getMimeType('webp')).toBe('image/webp');
  });
});
