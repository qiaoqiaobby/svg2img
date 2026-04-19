export interface DownloadOptions {
  dataUrl: string;
  fileName: string;
  scale: number;
  format: string;
}

/** Trigger browser download of a data URL */
export function downloadImage(options: DownloadOptions): void {
  const { dataUrl, fileName, scale, format } = options;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${fileName}-${scale}x.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** Copy image to clipboard. Returns true on success. */
export async function copyImageToClipboard(dataUrl: string, mimeType: string): Promise<boolean> {
  if (!navigator.clipboard || !navigator.clipboard.write) {
    return false;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ [mimeType]: blob }),
    ]);
    return true;
  } catch {
    return false;
  }
}
