export interface SvgDimensions {
  width: number;
  height: number;
}

const SUSPICIOUS_PATTERNS = [
  'javascript:', 'onerror=', 'onload=', '<script>',
  'eval(', 'function(', 'onclick=',
];

/** Check for suspicious JS patterns in SVG content */
export function containsJavascriptCode(svgContent: string): boolean {
  const lowerContent = svgContent.toLowerCase();
  return SUSPICIOUS_PATTERNS.some(pattern => lowerContent.includes(pattern));
}

/** Parse SVG string and extract dimensions. Throws on invalid SVG. */
export function parseSvgDimensions(svgString: string): SvgDimensions {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

  const parserError = svgDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Invalid SVG format');
  }

  const svgElement = svgDoc.documentElement;

  let width: number | null = parseDimensionValue(svgElement.getAttribute('width'));
  let height: number | null = parseDimensionValue(svgElement.getAttribute('height'));
  const viewBox = svgElement.getAttribute('viewBox');

  if ((!width || !height) && viewBox) {
    const viewBoxValues = viewBox.split(/[\s,;]+/).filter(val => val.trim() !== '');
    if (viewBoxValues.length >= 4) {
      const viewBoxWidth = parseFloat(viewBoxValues[2]);
      const viewBoxHeight = parseFloat(viewBoxValues[3]);
      width = width || viewBoxWidth || 300;
      height = height || viewBoxHeight || 150;
    }
  }

  if (!width || !height || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    width = 300;
    height = 150;
  }

  return { width, height };
}

/** Strip units from dimension string, e.g. "100px" -> 100 */
function parseDimensionValue(value: string | null): number | null {
  if (!value) return null;
  const num = parseFloat(value.replace(/[^-\d.]/g, ''));
  return isNaN(num) ? null : num;
}

/** Validate that a string looks like valid SVG */
export function validateSvgString(content: string): boolean {
  if (typeof content !== 'string' || !content.includes('<svg')) return false;
  if (containsJavascriptCode(content)) return false;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'image/svg+xml');
    return !doc.querySelector('parsererror');
  } catch {
    return false;
  }
}

/** Format file size in human-readable form */
export function formatFileSize(bytes: number): string {
  if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
