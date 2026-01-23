import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://yannick-thoughts.com', // Update this to your actual domain
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkUnwrapImages],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});