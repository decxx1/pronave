import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'about' | 'services' | 'contact';

export const defaultLocale: Locale = 'es';

const pageSlugs: Record<PageKey, string> = {
  home: '',
  about: 'about',
  services: 'services',
  contact: 'contact',
};

export const getLocalizedPath = (locale: Locale, page: PageKey, hash = '') => {
  const pathname = getRelativeLocaleUrl(locale, pageSlugs[page]);

  return `${pathname}${hash}`;
};

export const getOpenGraphLocale = (locale: Locale) => (locale === 'es' ? 'es_AR' : 'en_US');
