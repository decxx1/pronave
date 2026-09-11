import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pronave.com.ar',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SECRET_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      ENDPOINT: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_PHONE: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_WEBSITE: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_HOURS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_ADDRESS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL1_PHONE: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL1_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL1_HOURS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL1_ADDRESS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL2_PHONE: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL2_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL2_HOURS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_TERMINAL2_ADDRESS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_CHILE_PHONE: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_CHILE_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_CHILE_HOURS: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_CHILE_ADDRESS: envField.string({ context: 'client', access: 'public', optional: true }),
      SOCIAL_LINKEDIN_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      SOCIAL_FACEBOOK_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      SOCIAL_INSTAGRAM_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      SOCIAL_WHATSAPP_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      FLOAT_WHATSAPP_URL: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
