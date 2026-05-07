import type { Translations } from './types';

export const zh: Translations = {
  title: 'SVG 转图像转换器',
  seoTitle: 'SVG 转 PNG / JPG / WebP — 免费在线转换器 | SVG2Img',
  h1: '在线 SVG 转图片工具',
  metaDescription: '免费在线 SVG 转 PNG、JPG、WebP — 浏览器本地处理，文件不上传，支持 1x-3x 缩放。立即转换，无需注册。',
  heroSubtitle: '免费、安全、无需上传 — 在浏览器中将 SVG 转为高清 PNG / JPG / WebP',

  // Features
  featuresTitle: '核心特性',
  features: [
    { title: '隐私安全', desc: '所有转换在浏览器本地完成，SVG 文件不会上传到任何服务器，源代码完全开源可审计。' },
    { title: '多格式支持', desc: '支持导出 PNG（无损）、JPG（高压缩）和 WebP（现代格式）三种格式，满足不同使用场景。' },
    { title: '高清缩放', desc: '提供 1x、1.5x、2x、3x 四种缩放比例，适合 Retina 屏幕和高分辨率图标导出。' },
    { title: '质量可调', desc: 'JPG 和 WebP 格式支持 1-100% 质量调节，帮助您在画质和文件大小之间找到最佳平衡。' },
  ],

  // How to
  howToTitle: '如何使用',
  howToSteps: [
    { name: '上传 SVG 文件', text: '点击"选择文件"按钮或将 SVG 文件拖入上传区域。也可以直接粘贴 SVG 代码。' },
    { name: '选择输出设置', text: '选择输出格式（PNG、JPG 或 WebP），设置缩放比例（1x-3x）和输出质量。' },
    { name: '生成预览', text: '点击"生成预览"按钮，浏览器会在本地渲染并显示转换结果。' },
    { name: '下载或复制', text: '确认效果后，点击"下载图像"保存到本地，或"复制到剪贴板"直接粘贴使用。' },
  ],

  // Format comparison
  formatComparisonTitle: '输出格式对比',
  formatComparisonHeaders: { format: '格式', type: '压缩类型', transparency: '透明背景', bestFor: '最适用场景' },
  formatComparison: [
    { format: 'PNG', type: '无损', transparency: '支持', bestFor: '图标、Logo、需要透明背景的图片' },
    { format: 'JPG', type: '有损', transparency: '不支持', bestFor: '照片类内容、文件大小敏感的场景' },
    { format: 'WebP', type: '无损/有损', transparency: '支持', bestFor: '网页优化、现代浏览器、兼顾质量与大小' },
  ],

  // FAQ (expanded to 10)
  faqTitle: '常见问题',
  faq: [
    { q: '这个工具安全吗？', a: '完全安全。所有转换在浏览器本地完成，SVG 文件不会上传到任何服务器。工具使用 Canvas API 进行渲染，并会自动清除 SVG 中的脚本标签和 39 种危险事件处理属性，防止 XSS 攻击。源代码完全开源，可在 GitHub 上审计。' },
    { q: '支持哪些输出格式？', a: '支持 PNG、JPG 和 WebP 三种格式。PNG 是无损格式，适合图标和需要透明背景的图片；JPG 适合照片类内容，文件更小；WebP 是现代格式，在保持高画质的同时提供出色的压缩率，适合网页使用。' },
    { q: '可以批量转换吗？', a: '目前支持单文件转换。您可以通过上传文件或粘贴 SVG 代码进行转换。如需批量处理，建议使用命令行工具如 ImageMagick 或 Sharp。' },
    { q: '转换后的图片质量如何？', a: '支持 1x 到 3x 缩放。1x 保持原始尺寸，2x 和 3x 适合 Retina 高分辨率屏幕。JPG 和 WebP 格式支持 1-100% 质量调节，PNG 为无损格式，转换后画质与原始 SVG 完全一致。' },
    { q: 'SVG 是什么格式？为什么需要转换？', a: 'SVG（可缩放矢量图形）是一种基于 XML 的矢量图片格式，常用于网页图标和插图。部分应用和平台不支持直接显示 SVG，将其转换为 PNG 或 JPG 等位图格式可以确保在所有设备和应用中正常显示。' },
    { q: '支持哪些浏览器？', a: '支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 的最新版本。工具依赖 Canvas API，该 API 在 IE11 之后的所有主流浏览器中均可使用。' },
    { q: '最大支持多大的 SVG 文件？', a: '没有硬性文件大小限制。由于转换在浏览器本地进行，实际限制取决于设备内存。一般来说，大多数 SVG 文件（包括复杂的矢量插图）都可以正常转换。超大文件可能需要较长处理时间。' },
    { q: '转换后的图片分辨率是多少？', a: '输出分辨率 = SVG 原始尺寸 × 缩放比例。例如，一个 200×200 的 SVG 以 3x 缩放导出，输出图片为 600×600 像素。这对于需要高分辨率资源的 Retina 屏幕和印刷品非常实用。' },
    { q: 'SVG 中的渐变和滤镜能正确转换吗？', a: '是的。工具使用浏览器的原生 Canvas 渲染引擎，支持 SVG 中的渐变（linear/radial gradient）、滤镜（blur、shadow 等）、剪切路径和遮罩等高级特性。' },
    { q: '粘贴 SVG 代码功能怎么使用？', a: '点击"粘贴SVG代码"按钮，在弹出的文本框中粘贴完整的 SVG 代码（以 &lt;svg 开头），然后点击确认。适合开发者直接从编辑器或浏览器开发工具中复制 SVG 代码进行转换。' },
  ],

  // Privacy
  privacyTitle: '隐私政策',
  privacyContent: 'SVG2Img 是一个完全在浏览器端运行的工具。您上传或粘贴的 SVG 文件不会发送到任何服务器，所有转换处理均在您的设备上本地完成。本网站不收集个人信息，不使用 Cookie 追踪用户，不包含任何第三方分析或广告脚本。',

  // Footer
  footerPrivacy: '隐私政策',
  footerOpenSource: '开源项目',

  // Steps
  upload: '上传',
  settings: '设置',
  preview: '预览',
  export: '导出',

  // Upload
  dropSvgHere: '点击或拖放SVG文件到此处',
  selectFile: '选择文件',
  changeFile: '更换文件',
  pasteSvgCode: '粘贴SVG代码',
  pastePlaceholder: '在此粘贴SVG代码...',
  or: '或',

  // Settings
  scale: '缩放比例',
  format: '输出格式',
  quality: '质量',
  settingsTitle: '转换设置',

  // Preview & Export
  generatePreview: '生成预览',
  download: '下载图像',
  copyToClipboard: '复制到剪贴板',
  previewTitle: '预览结果',

  // File info
  fileName: '文件名：',
  fileSize: '文件大小：',
  dimensions: '尺寸：',

  // Status
  processing: '处理中...',
  uploadSuccess: 'SVG文件上传成功',
  previewSuccess: '预览生成成功',
  downloadSuccess: '图像已下载',
  copySuccess: '图像已复制到剪贴板',
  pasteSvgSuccess: 'SVG代码粘贴成功',

  // Errors
  errorInvalidFile: '错误：无效的SVG文件',
  errorConversion: '错误：转换过程中出现问题',
  errorCopy: '错误：无法复制到剪贴板',
  errorCanvasCreation: '错误：无法创建画布',
  errorInvalidSvgCode: '错误：无效的SVG代码',
  unsupportedBrowser: '您的浏览器不支持此功能',
  fallbackCopyMessage: '无法自动复制图像。请右键点击图像并选择"复制图像"',

  // Actions
  confirm: '确认',
  cancel: '取消',
};
