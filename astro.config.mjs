import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to the live domain at launch (used for the sitemap and canonical URLs).
export default defineConfig({
  site: 'https://aarvaaerospace.com',
  integrations: [sitemap()],
});
