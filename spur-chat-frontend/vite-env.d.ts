/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Add your backend URL here
  // you can add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
