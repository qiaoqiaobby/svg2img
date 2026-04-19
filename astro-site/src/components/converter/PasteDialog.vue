<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Translations } from '@/i18n/types';
import { createRipple } from '@/lib/animations';
import type { useConverter } from './useConverter';

const props = defineProps<{
  t: Translations;
  converter: ReturnType<typeof useConverter>;
}>();

const svgCode = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  textareaRef.value?.focus();

  // Try to read clipboard if it contains SVG
  if (navigator.clipboard?.readText) {
    navigator.clipboard.readText()
      .then(text => {
        if (text?.trim().includes('<svg')) {
          svgCode.value = text;
        }
      })
      .catch(() => {});
  }
});

function onConfirm(e: MouseEvent) {
  createRipple(e);
  props.converter.handleSvgPaste(svgCode.value);
}

function onCancel(e: MouseEvent) {
  createRipple(e);
  svgCode.value = '';
  props.converter.showPasteArea.value = false;
}
</script>

<template>
  <div class="paste-container paste-slide-in">
    <textarea
      ref="textareaRef"
      v-model="svgCode"
      class="svg-code-input"
      :placeholder="t.pastePlaceholder"
    ></textarea>
    <div class="button-group">
      <button class="btn primary" @click="onConfirm">{{ t.confirm }}</button>
      <button class="btn secondary" @click="onCancel">{{ t.cancel }}</button>
    </div>
  </div>
</template>
