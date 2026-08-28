/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 measurement id, e.g. G-XXXXXXXXXX. Empty disables GA4. */
  readonly VITE_GA4_ID?: string;
  /** Microsoft Clarity project id, e.g. abcd1234ef. Empty disables Clarity. */
  readonly VITE_CLARITY_ID?: string;
  /** Meta (Facebook) Pixel id, digits only. Empty disables the pixel. */
  readonly VITE_META_PIXEL_ID?: string;
  /** Public site origin, used for canonical URLs and the sitemap. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
