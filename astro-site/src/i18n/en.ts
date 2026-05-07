import type { Translations } from './types';

export const en: Translations = {
  title: 'SVG to Image Converter',
  seoTitle: 'SVG to PNG / JPG / WebP — Free Online Converter | SVG2Img',
  h1: 'Online SVG to Image Converter',
  metaDescription: 'Free online SVG to PNG, JPG, WebP converter — processed locally in your browser, no file upload, supports 1x-3x scaling. Convert instantly, no signup required.',
  heroSubtitle: 'Free, secure, no upload — convert SVG to high-quality PNG / JPG / WebP in your browser',

  // Features
  featuresTitle: 'Key Features',
  features: [
    { title: 'Privacy First', desc: 'All conversions happen locally in your browser. SVG files are never uploaded to any server. Source code is fully open-source and auditable.' },
    { title: 'Multiple Formats', desc: 'Export to PNG (lossless), JPG (high compression), and WebP (modern format) — three formats to fit every use case.' },
    { title: 'HD Scaling', desc: 'Choose from 1x, 1.5x, 2x, and 3x scaling options, perfect for Retina displays and high-resolution icon exports.' },
    { title: 'Quality Control', desc: 'JPG and WebP formats support 1-100% quality adjustment, helping you find the perfect balance between image quality and file size.' },
  ],

  // How to
  howToTitle: 'How to Use',
  howToSteps: [
    { name: 'Upload SVG File', text: 'Click "Select File" or drag and drop your SVG file into the upload area. You can also paste SVG code directly.' },
    { name: 'Choose Output Settings', text: 'Select the output format (PNG, JPG, or WebP), set the scale ratio (1x-3x), and adjust output quality.' },
    { name: 'Generate Preview', text: 'Click "Generate Preview" — your browser will render and display the conversion result locally.' },
    { name: 'Download or Copy', text: 'Once satisfied, click "Download Image" to save locally, or "Copy to Clipboard" to paste directly.' },
  ],

  // Format comparison
  formatComparisonTitle: 'Output Format Comparison',
  formatComparisonHeaders: { format: 'Format', type: 'Compression', transparency: 'Transparency', bestFor: 'Best For' },
  formatComparison: [
    { format: 'PNG', type: 'Lossless', transparency: 'Supported', bestFor: 'Icons, logos, images requiring transparent backgrounds' },
    { format: 'JPG', type: 'Lossy', transparency: 'Not supported', bestFor: 'Photographs, file-size-sensitive scenarios' },
    { format: 'WebP', type: 'Lossless/Lossy', transparency: 'Supported', bestFor: 'Web optimization, modern browsers, balancing quality and size' },
  ],

  // FAQ (expanded to 10)
  faqTitle: 'Frequently Asked Questions',
  faq: [
    { q: 'Is this tool safe to use?', a: 'Completely safe. All conversions happen locally in your browser — SVG files are never uploaded to any server. The tool uses the Canvas API for rendering and automatically strips script tags and 39 dangerous event handler attributes from SVGs to prevent XSS attacks. The source code is fully open-source and auditable on GitHub.' },
    { q: 'What output formats are supported?', a: 'PNG, JPG, and WebP are supported. PNG is a lossless format ideal for icons and images requiring transparency. JPG is best for photographic content with smaller file sizes. WebP is a modern format offering excellent compression while maintaining high quality, ideal for web use.' },
    { q: 'Can I batch convert files?', a: 'Currently single-file conversion is supported. You can upload a file or paste SVG code directly. For batch processing, consider command-line tools like ImageMagick or Sharp.' },
    { q: 'What about output image quality?', a: 'Supports 1x to 3x scaling. 1x preserves original dimensions, while 2x and 3x are ideal for Retina high-resolution displays. JPG and WebP support 1-100% quality adjustment. PNG is lossless — the output quality is identical to the original SVG.' },
    { q: 'What is SVG format and why convert it?', a: 'SVG (Scalable Vector Graphics) is an XML-based vector image format commonly used for web icons and illustrations. Some applications and platforms cannot display SVG files directly. Converting them to bitmap formats like PNG or JPG ensures compatibility across all devices and applications.' },
    { q: 'Which browsers are supported?', a: 'All modern browsers are supported, including the latest versions of Chrome, Firefox, Safari, and Edge. The tool relies on the Canvas API, which is available in all major browsers since IE11.' },
    { q: 'What is the maximum SVG file size?', a: 'There is no hard file size limit. Since conversion happens locally in your browser, the actual limit depends on your device memory. Most SVG files, including complex vector illustrations, can be converted without issues. Very large files may require more processing time.' },
    { q: 'What resolution will the output image be?', a: 'Output resolution = SVG original size x scale ratio. For example, a 200x200 SVG exported at 3x scaling produces a 600x600 pixel image. This is particularly useful for Retina displays and print-quality assets.' },
    { q: 'Can SVG gradients and filters be converted correctly?', a: 'Yes. The tool uses your browser\'s native Canvas rendering engine, which supports SVG gradients (linear/radial), filters (blur, shadow, etc.), clip paths, and masks.' },
    { q: 'How do I use the paste SVG code feature?', a: 'Click the "Paste SVG Code" button, paste your complete SVG code (starting with &lt;svg) in the text area, then click confirm. This is ideal for developers copying SVG code directly from editors or browser developer tools.' },
  ],

  // Privacy
  privacyTitle: 'Privacy Policy',
  privacyContent: 'SVG2Img is a tool that runs entirely in your browser. SVG files you upload or paste are never sent to any server — all conversion processing happens locally on your device. This website does not collect personal information, does not use cookies to track users, and contains no third-party analytics or advertising scripts.',

  // Footer
  footerPrivacy: 'Privacy Policy',
  footerOpenSource: 'Open Source',

  // Steps
  upload: 'Upload',
  settings: 'Settings',
  preview: 'Preview',
  export: 'Export',

  // Upload
  dropSvgHere: 'Click or drop SVG file here',
  selectFile: 'Select File',
  changeFile: 'Change File',
  pasteSvgCode: 'Paste SVG Code',
  pastePlaceholder: 'Paste SVG code here...',
  or: 'or',

  // Settings
  scale: 'Scale',
  format: 'Output Format',
  quality: 'Quality',
  settingsTitle: 'Conversion Settings',

  // Preview & Export
  generatePreview: 'Generate Preview',
  download: 'Download Image',
  copyToClipboard: 'Copy to Clipboard',
  previewTitle: 'Preview Result',

  // File info
  fileName: 'File name: ',
  fileSize: 'File size: ',
  dimensions: 'Dimensions: ',

  // Status
  processing: 'Processing...',
  uploadSuccess: 'SVG file uploaded successfully',
  previewSuccess: 'Preview generated successfully',
  downloadSuccess: 'Image downloaded',
  copySuccess: 'Image copied to clipboard',
  pasteSvgSuccess: 'SVG code pasted successfully',

  // Errors
  errorInvalidFile: 'Error: Invalid SVG file',
  errorConversion: 'Error: Problem during conversion',
  errorCopy: 'Error: Could not copy to clipboard',
  errorCanvasCreation: 'Error: Could not create canvas',
  errorInvalidSvgCode: 'Error: Invalid SVG code',
  unsupportedBrowser: 'Your browser does not support this feature',
  fallbackCopyMessage: 'Automatic copy failed. Please right-click on the image and select "Copy Image"',

  // Actions
  confirm: 'Confirm',
  cancel: 'Cancel',
};
