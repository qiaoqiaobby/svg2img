// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://svg2img.shanqiao.app',
  output: 'static',
  integrations: [
    vue(),
    sitemap({
      filter: (page) => page !== 'https://svg2img.shanqiao.app/',
      lastmod: new Date(),
    }),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
