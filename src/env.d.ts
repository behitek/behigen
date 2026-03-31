/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ZALO_URL: string;
  readonly PUBLIC_TELEGRAM_URL: string;
  readonly PUBLIC_MESSENGER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
