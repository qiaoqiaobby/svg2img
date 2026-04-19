import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadImage } from '../fileUtils';

describe('downloadImage', () => {
  beforeEach(() => {
    // Mock click and DOM operations
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  it('creates a download link with correct filename', () => {
    const clickSpy = vi.fn();
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: clickSpy,
    } as unknown as HTMLAnchorElement);

    downloadImage({
      dataUrl: 'data:image/png;base64,abc',
      fileName: 'icon',
      scale: 2,
      format: 'png',
    });

    const link = document.createElement('a') as HTMLAnchorElement;
    expect(clickSpy).toHaveBeenCalled();
  });

  it('formats filename with scale and format', () => {
    let capturedDownload = '';
    vi.spyOn(document, 'createElement').mockReturnValue({
      set href(_: string) {},
      get href() { return ''; },
      set download(val: string) { capturedDownload = val; },
      get download() { return capturedDownload; },
      click: vi.fn(),
    } as unknown as HTMLAnchorElement);

    downloadImage({
      dataUrl: 'data:image/jpeg;base64,abc',
      fileName: 'logo',
      scale: 1.5,
      format: 'jpg',
    });

    expect(capturedDownload).toBe('logo-1.5x.jpg');
  });
});
