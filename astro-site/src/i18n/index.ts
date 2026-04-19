import { zh } from './zh';
import { en } from './en';
import type { Translations } from './types';

const translations: Record<string, Translations> = { zh, en };

export function t(lang: string): Translations {
  return translations[lang] ?? translations.zh;
}

export type { Translations };
