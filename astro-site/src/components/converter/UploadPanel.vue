<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Translations } from '@/i18n/types';
import { sanitizeSvgContent } from '@/lib/canvasRenderer';
import { createRipple } from '@/lib/animations';
import type { useConverter } from './useConverter';
import PasteDialog from './PasteDialog.vue';

const props = defineProps<{
  t: Translations;
  converter: ReturnType<typeof useConverter>;
}>();

const isDragOver = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const dragTargets = new Set<EventTarget>();

const svgPreviewUrl = computed(() => {
  if (!props.converter.svgFile.value) return '';
  try {
    const sanitized = sanitizeSvgContent(props.converter.svgFile.value.content);
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(sanitized);
  } catch {
    return '';
  }
});

function onSelectFile(e: MouseEvent) {
  createRipple(e);
  fileInputRef.value?.click();
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    props.converter.handleFileUpload(file);
  }
}

function onDragEnter(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (e.target) dragTargets.add(e.target);
  isDragOver.value = dragTargets.size > 0;
}

function onDragOver(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

function onDragLeave(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (e.target) dragTargets.delete(e.target);
  isDragOver.value = dragTargets.size > 0;
}

function onDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragTargets.clear();
  isDragOver.value = false;

  const files = e.dataTransfer?.files;
  if (files?.length) {
    props.converter.handleFileUpload(files[0]);
  }
}

function onPasteClick(e: MouseEvent) {
  createRipple(e);
  props.converter.showPasteArea.value = true;
}

function onChangeFile(e: MouseEvent) {
  createRipple(e);
  props.converter.resetUpload();
}
</script>

<template>
  <div
    class="upload-container"
    :class="{ 'drag-over': isDragOver }"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- Upload prompt -->
    <div v-if="!converter.svgFile.value && !converter.showPasteArea.value" class="upload-prompt">
      <img src="/icons/upload.svg" alt="" class="upload-icon" />
      <p>{{ t.dropSvgHere }}</p>
      <input ref="fileInputRef" type="file" accept=".svg" hidden @change="onFileChange" />
      <div class="upload-buttons">
        <button class="btn primary" @click="onSelectFile">{{ t.selectFile }}</button>
        <div class="upload-separator"><span>{{ t.or }}</span></div>
        <button class="btn secondary" @click="onPasteClick">{{ t.pasteSvgCode }}</button>
      </div>
    </div>

    <!-- Paste area -->
    <PasteDialog
      v-if="converter.showPasteArea.value"
      :t="t"
      :converter="converter"
    />

    <!-- SVG preview (after upload) -->
    <div v-if="converter.svgFile.value" class="upload-preview">
      <div class="preview-container">
        <div class="svg-container">
          <img v-if="svgPreviewUrl" :src="svgPreviewUrl" alt="SVG Preview" />
        </div>
        <div class="file-info">
          <p>{{ t.fileName }}{{ converter.svgFile.value.name }}</p>
          <p>{{ t.fileSize }}{{ converter.formatFileSize(converter.svgFile.value.size) }}</p>
          <p>{{ t.dimensions }}{{ converter.svgFile.value.width }} × {{ converter.svgFile.value.height }}</p>
        </div>
      </div>
      <button class="btn secondary change-file-btn" @click="onChangeFile">{{ t.changeFile }}</button>
    </div>
  </div>
</template>
