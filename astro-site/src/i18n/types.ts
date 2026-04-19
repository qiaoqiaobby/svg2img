export interface Translations {
  // Page & SEO
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;

  // Steps
  upload: string;
  settings: string;
  preview: string;
  export: string;

  // Upload
  dropSvgHere: string;
  selectFile: string;
  changeFile: string;
  pasteSvgCode: string;
  pastePlaceholder: string;
  or: string;

  // Settings
  scale: string;
  format: string;
  quality: string;
  settingsTitle: string;

  // Preview & Export
  generatePreview: string;
  download: string;
  copyToClipboard: string;
  previewTitle: string;

  // File info
  fileName: string;
  fileSize: string;
  dimensions: string;

  // Status
  processing: string;
  uploadSuccess: string;
  previewSuccess: string;
  downloadSuccess: string;
  copySuccess: string;
  pasteSvgSuccess: string;

  // Errors
  errorInvalidFile: string;
  errorConversion: string;
  errorCopy: string;
  errorCanvasCreation: string;
  errorInvalidSvgCode: string;
  unsupportedBrowser: string;
  fallbackCopyMessage: string;

  // Actions
  confirm: string;
  cancel: string;
}
