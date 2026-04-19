import { ref, computed, watch, type Ref } from 'vue';
import type { Translations } from '@/i18n/types';
import type { ImageFormat, RenderResult } from '@/lib/canvasRenderer';
import { parseSvgDimensions, containsJavascriptCode, formatFileSize } from '@/lib/svgParser';
import { renderSvgToImage } from '@/lib/canvasRenderer';
import { downloadImage as downloadImageUtil, copyImageToClipboard } from '@/lib/fileUtils';

export interface SvgFile {
  name: string;
  size: number;
  content: string;
  width: number;
  height: number;
}

export interface ConversionSettings {
  scale: number;
  format: ImageFormat;
  quality: number; // 1-100
}

export interface StatusMessage {
  text: string;
  type: 'success' | 'error' | 'info' | '';
}

export function useConverter(t: Translations) {
  // ---- State ----
  const currentStep = ref(1);
  const svgFile: Ref<SvgFile | null> = ref(null);
  const image: Ref<RenderResult | null> = ref(null);
  const isLoading = ref(false);
  const statusMessage = ref<StatusMessage>({ text: '', type: '' });
  const settings = ref<ConversionSettings>({ scale: 1.5, format: 'png', quality: 90 });
  const showPasteArea = ref(false);

  // ---- Computed ----
  const showQualitySlider = computed(() => settings.value.format !== 'png');
  const canGeneratePreview = computed(() => svgFile.value !== null && !isLoading.value);
  const canExport = computed(() => image.value !== null && !isLoading.value);

  // ---- Status ----
  let statusTimer: ReturnType<typeof setTimeout> | null = null;

  function showStatus(text: string, type: StatusMessage['type']) {
    if (statusTimer) clearTimeout(statusTimer);
    statusMessage.value = { text, type };

    if (type === 'success') {
      statusTimer = setTimeout(() => {
        statusMessage.value = { text: '', type: '' };
        statusTimer = null;
      }, 3000);
    }
  }

  function clearStatus() {
    if (statusTimer) clearTimeout(statusTimer);
    statusMessage.value = { text: '', type: '' };
  }

  // ---- Settings persistence ----
  function loadSettingsFromStorage() {
    try {
      const saved = localStorage.getItem('svg2img_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        settings.value = {
          scale: parsed.scale ?? 1.5,
          format: parsed.format ?? 'png',
          quality: parsed.quality ?? 90,
        };
      }
    } catch {
      // ignore
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem('svg2img_settings', JSON.stringify(settings.value));
    } catch {
      // ignore
    }
  }

  // ---- Actions ----
  function handleFileUpload(file: File) {
    const isSvgMimeType = file.type === 'image/svg+xml';
    const isSvgExtension = file.name.toLowerCase().endsWith('.svg');

    if (!isSvgMimeType && !isSvgExtension) {
      showStatus(t.errorInvalidFile, 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string' || !content.includes('<svg')) {
          showStatus(t.errorInvalidFile, 'error');
          return;
        }

        if (containsJavascriptCode(content)) {
          showStatus(t.errorInvalidFile, 'error');
          return;
        }

        const dimensions = parseSvgDimensions(content);
        svgFile.value = {
          name: file.name,
          size: file.size,
          content,
          width: dimensions.width,
          height: dimensions.height,
        };

        showPasteArea.value = false;
        currentStep.value = 2;
        showStatus(t.uploadSuccess, 'success');
      } catch {
        showStatus(t.errorInvalidFile, 'error');
      }
    };

    reader.onerror = () => {
      showStatus(t.errorInvalidFile, 'error');
    };

    reader.readAsText(file);
  }

  function handleSvgPaste(code: string) {
    const trimmed = code.trim();
    if (!trimmed || !trimmed.includes('<svg')) {
      showStatus(t.errorInvalidSvgCode, 'error');
      return;
    }

    if (containsJavascriptCode(trimmed)) {
      showStatus(t.errorInvalidSvgCode, 'error');
      return;
    }

    try {
      const dimensions = parseSvgDimensions(trimmed);
      svgFile.value = {
        name: 'pasted-svg.svg',
        size: new Blob([trimmed]).size,
        content: trimmed,
        width: dimensions.width,
        height: dimensions.height,
      };

      showPasteArea.value = false;
      currentStep.value = 2;
      showStatus(t.pasteSvgSuccess, 'success');
    } catch {
      showStatus(t.errorInvalidSvgCode, 'error');
    }
  }

  async function generatePreview() {
    if (!svgFile.value) {
      showStatus(t.errorInvalidFile, 'error');
      return;
    }

    isLoading.value = true;

    const loadingTimeout = setTimeout(() => {
      isLoading.value = false;
    }, 10000);

    try {
      const result = await renderSvgToImage({
        svgContent: svgFile.value.content,
        sourceWidth: svgFile.value.width,
        sourceHeight: svgFile.value.height,
        scale: settings.value.scale,
        format: settings.value.format,
        quality: settings.value.quality / 100,
      });

      image.value = result;
      currentStep.value = 3;
      showStatus(t.previewSuccess, 'success');
    } catch (err) {
      console.error('Preview generation failed:', err);
      showStatus(t.errorConversion, 'error');
    } finally {
      isLoading.value = false;
      clearTimeout(loadingTimeout);
    }
  }

  function download() {
    if (!image.value || !svgFile.value) return;

    try {
      const fileName = svgFile.value.name.replace(/\.svg$/i, '') || 'image';
      downloadImageUtil({
        dataUrl: image.value.dataUrl,
        fileName,
        scale: settings.value.scale,
        format: image.value.format,
      });
      currentStep.value = 4;
      showStatus(t.downloadSuccess, 'success');
    } catch {
      showStatus(t.errorConversion, 'error');
    }
  }

  async function copyToClipboard() {
    if (!image.value) return;

    try {
      const success = await copyImageToClipboard(image.value.dataUrl, image.value.mimeType);
      if (success) {
        currentStep.value = 4;
        showStatus(t.copySuccess, 'success');
      } else {
        showStatus(t.fallbackCopyMessage, 'info');
      }
    } catch {
      showStatus(t.fallbackCopyMessage, 'info');
    }
  }

  function resetUpload() {
    svgFile.value = null;
    image.value = null;
    showPasteArea.value = false;
    currentStep.value = 1;
    clearStatus();
  }

  // ---- Lifecycle ----
  loadSettingsFromStorage();
  watch(settings, saveSettings, { deep: true });

  return {
    currentStep,
    svgFile,
    image,
    isLoading,
    statusMessage,
    settings,
    showPasteArea,
    showQualitySlider,
    canGeneratePreview,
    canExport,
    handleFileUpload,
    handleSvgPaste,
    generatePreview,
    download,
    copyToClipboard,
    resetUpload,
    showStatus,
    formatFileSize,
  };
}
