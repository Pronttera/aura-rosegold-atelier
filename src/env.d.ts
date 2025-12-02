/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  
  // Prismic CMS
  readonly VITE_PRISMIC_REPOSITORY_NAME: string;
  readonly VITE_PRISMIC_ACCESS_TOKEN: string;
  readonly VITE_PRISMIC_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
