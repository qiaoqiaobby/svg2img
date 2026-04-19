<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { Translations } from '@/i18n/types';
import { createRipple } from '@/lib/animations';
import type { useConverter } from './useConverter';

const props = defineProps<{
  t: Translations;
  converter: ReturnType<typeof useConverter>;
}>();

const previewAreaRef = ref<HTMLElement | null>(null);
const downloadBtnRef = ref<HTMLElement | null>(null);
const copyBtnRef = ref<HTMLElement | null>(null);
const revealActive = ref(false);

// Trigger reveal animation when image changes
watch(() => props.converter.image.value, async (newVal) => {
  if (newVal) {
    revealActive.value = false;
    await nextTick();
    revealActive.value = true;

    // Scroll into view
    nextTick(() => {
      previewAreaRef.value?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

function onDownload(e: MouseEvent) {
  createRipple(e);
  props.converter.download();

  // Success flash
  if (downloadBtnRef.value) {
    downloadBtnRef.value.classList.add('btn-success-flash');
    setTimeout(() => downloadBtnRef.value?.classList.remove('btn-success-flash'), 1200);
  }
}

function onCopy(e: MouseEvent) {
  createRipple(e);
  props.converter.copyToClipboard();

  // Success flash
  if (copyBtnRef.value) {
    copyBtnRef.value.classList.add('btn-success-flash');
    setTimeout(() => copyBtnRef.value?.classList.remove('btn-success-flash'), 1200);
  }
}
</script>

<template>
  <div
    v-if="converter.image.value"
    ref="previewAreaRef"
    class="preview-area"
    :class="{ 'reveal-active': revealActive }"
  >
    <h2>{{ t.previewTitle }}</h2>
    <div class="image-preview">
      <img
        :src="converter.image.value.dataUrl"
        alt="Preview"
        class="preview-image"
      />
      <div class="image-info">
        <p>{{ t.dimensions }}{{ converter.image.value.width }} × {{ converter.image.value.height }}</p>
        <p>{{ t.fileSize }}{{ converter.formatFileSize(converter.image.value.size) }}</p>
      </div>
    </div>
    <div class="button-group">
      <button
        ref="downloadBtnRef"
        class="btn primary"
        :disabled="!converter.canExport.value"
        @click="onDownload"
      >
        {{ t.download }}
      </button>
      <button
        ref="copyBtnRef"
        class="btn secondary"
        :disabled="!converter.canExport.value"
        @click="onCopy"
      >
        {{ t.copyToClipboard }}
      </button>
    </div>
  </div>
</template>
