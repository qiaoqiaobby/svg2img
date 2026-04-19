<script setup lang="ts">
import { computed, onErrorCaptured } from 'vue';
import { t } from '@/i18n';
import { useConverter } from './useConverter';
import UploadPanel from './UploadPanel.vue';
import SettingsPanel from './SettingsPanel.vue';
import PreviewPanel from './PreviewPanel.vue';

const props = defineProps<{ lang: string }>();
const translations = t(props.lang);
const converter = useConverter(translations);

onErrorCaptured((err) => {
  converter.showStatus(translations.errorConversion, 'error');
  console.error('Converter error:', err);
  return false;
});

const stepLabels = computed(() => [
  translations.upload,
  translations.settings,
  translations.preview,
  translations.export,
]);

const progressPercent = computed(() => {
  return ((converter.currentStep.value - 1) / 3) * 100 + '%';
});
</script>

<template>
  <div class="converter-root">
    <!-- Step indicator -->
    <div
      class="step-indicator animate-entry"
      :style="{ '--entry-order': 1, '--progress': progressPercent } as any"
    >
      <div
        v-for="(label, index) in stepLabels"
        :key="index"
        class="step"
        :class="{
          active: converter.currentStep.value === index + 1,
          completed: index + 1 < converter.currentStep.value,
        }"
        :data-step="label"
      ></div>
    </div>

    <!-- Main layout -->
    <div class="sidepanel-layout">
      <UploadPanel :t="translations" :converter="converter" />
      <SettingsPanel :t="translations" :converter="converter" />
    </div>

    <!-- Preview -->
    <PreviewPanel :t="translations" :converter="converter" />

    <!-- Status & Loading -->
    <div class="status-container">
      <div
        v-if="converter.statusMessage.value.text"
        class="status-message status-slide-in"
        :class="converter.statusMessage.value.type"
      >
        {{ converter.statusMessage.value.text }}
      </div>
      <div v-if="converter.isLoading.value" class="loading-indicator">
        <div class="spinner"></div>
        <span>{{ translations.processing }}</span>
      </div>
    </div>
  </div>
</template>
