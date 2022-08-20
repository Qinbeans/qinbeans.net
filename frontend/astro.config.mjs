import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
  //disable ssr.noExternal
  vite: {
    ssr: {
      noExternal: undefined,
      external: []
    }
  },
  integrations: [svelte(), tailwind()],
  output: 'server',
  adapter: deno(),
});