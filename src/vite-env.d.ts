/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_APP_TITLE: string;
    // Add more environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }