import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://yourdomain.com',
    server: {
        host: '0.0.0.0',
        port: 4321
    },
    vite: {
        build: {
            rollupOptions: {
                external: ['astro:content']
            }
        }
    },
    integrations: [
        react(),
        tailwind(),
        mdx()
    ]
});
