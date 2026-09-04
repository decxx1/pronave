import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SECRET_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      ENDPOINT: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
