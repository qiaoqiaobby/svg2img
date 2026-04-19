<script setup lang="ts">
import type { Translations } from '@/i18n/types';
import { createRipple } from '@/lib/animations';
import type { useConverter } from './useConverter';

const props = defineProps<{
  t: Translations;
  converter: ReturnType<typeof useConverter>;
}>();

function onGeneratePreview(e: MouseEvent) {
  createRipple(e);
  props.converter.generatePreview();
}
</script>

<template>
  <div class="settings-container">
    <h2>{{ t.settingsTitle }}</h2>

    <div class="setting-group">
      <label>{{ t.scale }}</label>
      <select v-model.number="converter.settings.value.scale" class="select-control">
        <option :value="1">1.0x</option>
        <option :value="1.5">1.5x</option>
        <option :value="2">2.0x</option>
        <option :value="2.5">2.5x</option>
        <option :value="3">3.0x</option>
      </select>
    </div>

    <div class="setting-group">
      <label>{{ t.format }}</label>
      <select v-model="converter.settings.value.format" class="select-control">
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WebP</option>
      </select>
    </div>

    <div v-show="converter.showQualitySlider.value" class="setting-group quality-container">
      <label>{{ t.quality }}</label>
      <input
        v-model.number="converter.settings.value.quality"
        type="range"
        min="1"
        max="100"
        class="slider"
      />
      <span class="quality-value">{{ converter.settings.value.quality }}%</span>
    </div>

    <div class="button-group">
      <button
        class="btn primary"
        :disabled="!converter.canGeneratePreview.value"
        @click="onGeneratePreview"
      >
        {{ t.generatePreview }}
      </button>
    </div>
  </div>
</template>
