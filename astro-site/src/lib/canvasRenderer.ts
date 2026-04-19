export type ImageFormat = 'png' | 'jpg' | 'webp';

export interface RenderOptions {
  svgContent: string;
  sourceWidth: number;
  sourceHeight: number;
  scale: number;
  format: ImageFormat;
  /** Quality 0-1 (only used for jpg/webp) */
  quality: number;
}

export interface RenderResult {
  dataUrl: string;
  width: number;
  height: number;
  size: number;
  format: ImageFormat;
  mimeType: string;
}

const DANGEROUS_ATTRIBUTES = [
  'onload', 'onerror', 'onabort', 'onactivate', 'onafterprint', 'onafterupdate',
  'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate',
  'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload',
  'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick',
  'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable',
  'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate',
  'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover',
  'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange',
  'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown',
  'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture',
  'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout',
  'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend',
  'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange',
  'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter',
  'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect',
  'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit',
  'onunload',
];

// Pre-compile regexes once at module load time
const DANGEROUS_ATTRIBUTE_REGEXES = DANGEROUS_ATTRIBUTES.map(
  attr => new RegExp(`\\s${attr}\\s*=\\s*(['"])(.*?)\\1`, 'gi')
);

/** Remove script tags and dangerous event handler attributes from SVG */
export function sanitizeSvgContent(svgContent: string): string {
  if (!svgContent || typeof svgContent !== 'string' || !svgContent.includes('<svg')) {
    throw new Error('Invalid SVG content');
  }

  let cleaned = svgContent;

  // Remove all <script> tags
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove dangerous event handler attributes
  for (const regex of DANGEROUS_ATTRIBUTE_REGEXES) {
    cleaned = cleaned.replace(regex, '');
  }

  // Ensure viewBox exists if no dimensions
  if (!cleaned.includes('width=') && !cleaned.includes('height=') && !cleaned.includes('viewBox=')) {
    cleaned = cleaned.replace('<svg', '<svg viewBox="0 0 300 150"');
  }

  return cleaned;
}

export function getMimeType(format: ImageFormat): string {
  const map: Record<ImageFormat, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    webp: 'image/webp',
  };
  return map[format];
}

/** Render SVG to Canvas and export as data URL */
export async function renderSvgToImage(options: RenderOptions): Promise<RenderResult> {
  const { svgContent, sourceWidth, sourceHeight, scale, format, quality } = options;

  const sanitized = sanitizeSvgContent(svgContent);
  const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sanitized);

  const outputWidth = Math.round(sourceWidth * scale);
  const outputHeight = Math.round(sourceHeight * scale);

  // Load SVG as image
  const image = new Image();
  image.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Image loading timed out')), 30000);
    image.onload = () => { clearTimeout(timeout); resolve(); };
    image.onerror = () => { clearTimeout(timeout); reject(new Error('Failed to load SVG')); };
    image.src = svgDataUrl;
  });

  // Create canvas and draw
  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create canvas context');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, outputWidth, outputHeight);
  ctx.drawImage(image, 0, 0, outputWidth, outputHeight);

  // Export
  const mimeType = getMimeType(format);
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const blob = await fetch(dataUrl).then(res => res.blob());

  // Release canvas GPU/memory resources
  canvas.width = 0;
  canvas.height = 0;

  return {
    dataUrl,
    width: outputWidth,
    height: outputHeight,
    size: blob.size,
    format,
    mimeType,
  };
}
