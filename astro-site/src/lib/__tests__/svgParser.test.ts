import { describe, it, expect } from 'vitest';
import {
  containsJavascriptCode,
  parseSvgDimensions,
  validateSvgString,
  formatFileSize,
} from '../svgParser';

// ======================== containsJavascriptCode ========================

describe('containsJavascriptCode', () => {
  it('returns false for clean SVG', () => {
    expect(containsJavascriptCode('<svg><rect width="10" height="10"/></svg>')).toBe(false);
  });

  it('detects javascript: URI', () => {
    expect(containsJavascriptCode('<svg><a href="javascript:alert(1)"><rect/></a></svg>')).toBe(true);
  });

  it('detects onerror attribute', () => {
    expect(containsJavascriptCode('<svg><image onerror="alert(1)"/></svg>')).toBe(true);
  });

  it('detects onload attribute', () => {
    expect(containsJavascriptCode('<svg onload="alert(1)"><rect/></svg>')).toBe(true);
  });

  it('detects script tag', () => {
    expect(containsJavascriptCode('<svg><script>alert(1)</script></svg>')).toBe(true);
  });

  it('detects eval()', () => {
    expect(containsJavascriptCode('<svg><text>eval(something)</text></svg>')).toBe(true);
  });

  it('detects onclick', () => {
    expect(containsJavascriptCode('<svg><rect onclick="alert(1)"/></svg>')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(containsJavascriptCode('<svg><SCRIPT>alert(1)</SCRIPT></svg>')).toBe(true);
    expect(containsJavascriptCode('<svg ONLOAD="alert(1)"><rect/></svg>')).toBe(true);
  });
});

// ======================== parseSvgDimensions ========================

describe('parseSvgDimensions', () => {
  it('extracts explicit width and height', () => {
    const result = parseSvgDimensions('<svg width="200" height="100"></svg>');
    expect(result).toEqual({ width: 200, height: 100 });
  });

  it('extracts dimensions with units (px)', () => {
    const result = parseSvgDimensions('<svg width="200px" height="100px"></svg>');
    expect(result).toEqual({ width: 200, height: 100 });
  });

  it('extracts dimensions with units (pt)', () => {
    const result = parseSvgDimensions('<svg width="150pt" height="75pt"></svg>');
    expect(result).toEqual({ width: 150, height: 75 });
  });

  it('falls back to viewBox when width/height missing', () => {
    const result = parseSvgDimensions('<svg viewBox="0 0 400 300"></svg>');
    expect(result).toEqual({ width: 400, height: 300 });
  });

  it('uses viewBox with comma separators', () => {
    const result = parseSvgDimensions('<svg viewBox="0,0,500,250"></svg>');
    expect(result).toEqual({ width: 500, height: 250 });
  });

  it('prefers explicit width/height over viewBox', () => {
    const result = parseSvgDimensions('<svg width="200" height="100" viewBox="0 0 400 300"></svg>');
    expect(result).toEqual({ width: 200, height: 100 });
  });

  it('fills missing dimension from viewBox', () => {
    const result = parseSvgDimensions('<svg width="200" viewBox="0 0 400 300"></svg>');
    expect(result).toEqual({ width: 200, height: 300 });
  });

  it('defaults to 300x150 when no dimensions available', () => {
    const result = parseSvgDimensions('<svg></svg>');
    expect(result).toEqual({ width: 300, height: 150 });
  });

  it('defaults for negative dimensions', () => {
    const result = parseSvgDimensions('<svg width="-10" height="-5"></svg>');
    expect(result).toEqual({ width: 300, height: 150 });
  });

  it('defaults for zero dimensions', () => {
    const result = parseSvgDimensions('<svg width="0" height="0"></svg>');
    expect(result).toEqual({ width: 300, height: 150 });
  });

  it('returns defaults for non-SVG content', () => {
    // jsdom DOMParser doesn't generate parsererror for non-SVG XML,
    // so it falls through to default dimensions
    const result = parseSvgDimensions('<div>not svg</div>');
    expect(result).toEqual({ width: 300, height: 150 });
  });
});

// ======================== validateSvgString ========================

describe('validateSvgString', () => {
  it('returns true for valid SVG', () => {
    expect(validateSvgString('<svg><rect width="10" height="10"/></svg>')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(validateSvgString('')).toBe(false);
  });

  it('returns false for non-string', () => {
    // @ts-expect-error testing invalid input
    expect(validateSvgString(42)).toBe(false);
  });

  it('returns false for non-SVG content', () => {
    expect(validateSvgString('<html><body>hello</body></html>')).toBe(false);
  });

  it('returns false for SVG with javascript', () => {
    expect(validateSvgString('<svg><script>alert(1)</script></svg>')).toBe(false);
  });

  it('returns false for SVG with event handler', () => {
    expect(validateSvgString('<svg onload="alert(1)"><rect/></svg>')).toBe(false);
  });
});

// ======================== formatFileSize ========================

describe('formatFileSize', () => {
  it('formats zero bytes', () => {
    expect(formatFileSize(0)).toBe('0 B');
  });

  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('formats 1023 bytes (boundary)', () => {
    expect(formatFileSize(1023)).toBe('1023 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1.0 MB');
    expect(formatFileSize(1572864)).toBe('1.5 MB');
  });

  it('handles negative numbers', () => {
    expect(formatFileSize(-1)).toBe('0 B');
  });

  it('handles NaN', () => {
    expect(formatFileSize(NaN)).toBe('0 B');
  });

  it('handles non-number input', () => {
    // @ts-expect-error testing invalid input
    expect(formatFileSize('abc')).toBe('0 B');
  });
});
