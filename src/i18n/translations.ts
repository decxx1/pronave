import aboutEn from '@/i18n/locales/en/about.json';
import commonEn from '@/i18n/locales/en/common.json';
import contactEn from '@/i18n/locales/en/contact.json';
import homeEn from '@/i18n/locales/en/home.json';
import servicesEn from '@/i18n/locales/en/services.json';
import aboutEs from '@/i18n/locales/es/about.json';
import commonEs from '@/i18n/locales/es/common.json';
import contactEs from '@/i18n/locales/es/contact.json';
import homeEs from '@/i18n/locales/es/home.json';
import servicesEs from '@/i18n/locales/es/services.json';
import type { Locale } from '@/i18n/config';

const translations = {
  es: {
    common: commonEs,
    home: homeEs,
    about: aboutEs,
    services: servicesEs,
    contact: contactEs,
  },
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    services: servicesEn,
    contact: contactEn,
  },
};

export type CommonTranslations = typeof commonEs;
export type HomeTranslations = typeof homeEs;
export type AboutTranslations = typeof aboutEs;
export type ServicesTranslations = typeof servicesEs;
export type ContactTranslations = typeof contactEs;

export const getTranslations = (locale: Locale) => translations[locale];

