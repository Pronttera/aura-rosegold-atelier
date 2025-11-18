/// <reference types="vite/client" />

/**
 * TypeScript declarations for environment variables
 * This provides type safety and autocomplete for import.meta.env
 */

interface ImportMetaEnv {
  // Prismic CMS Configuration
  readonly VITE_PRISMIC_REPOSITORY_NAME: string;
  readonly VITE_PRISMIC_ACCESS_TOKEN?: string;
  readonly VITE_PRISMIC_ENDPOINT?: string;
  
  // Add other environment variables here as needed
  // readonly VITE_API_URL: string;
  // readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
