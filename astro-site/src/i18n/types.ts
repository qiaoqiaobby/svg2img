export interface Translations {
  // Page & SEO
  title: string;
  seoTitle: string;
  h1: string;
  metaDescription: string;
  heroSubtitle: string;

  // Content sections
  featuresTitle: string;
  features: Array<{ title: string; desc: string }>;
  howToTitle: string;
  howToSteps: Array<{ name: string; text: string }>;
  formatComparisonTitle: string;
  formatComparison: Array<{ format: string; type: string; transparency: string; bestFor: string }>;
  formatComparisonHeaders: { format: string; type: string; transparency: string; bestFor: string };

  // FAQ
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;

  // Privacy
  privacyTitle: string;
  privacyContent: string;

  // Footer
  footerPrivacy: string;
  footerOpenSource: string;

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
