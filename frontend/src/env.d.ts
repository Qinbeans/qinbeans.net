/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly API_HTTP: string;
    readonly API: string;
    readonly API_WS: string;
    readonly API_PORT: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
declare module 'svelte-icons-pack/fa/FaBrandsGithub';
declare module 'svelte-icons-pack/fa/FaBrandsLinkedin';