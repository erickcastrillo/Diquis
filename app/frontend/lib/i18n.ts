import { usePage } from "@inertiajs/react";

/**
 * Type definitions for translations structure
 */
export type Translations = {
  app: any;
  common?: any;
  errors?: any;
};

export type LocaleInfo = {
  code: string;
  name: string;
  flag: string;
};

export type I18nPageProps = {
  translations: Translations;
  locale: string;
  available_locales: LocaleInfo[];
};

/**
 * React hook for accessing translations in components
 *
 * @example
 * const { t, locale, available_locales } = useTranslations();
 *
 * return (
 *   <div>
 *     <h1>{t('app.dashboard.title')}</h1>
 *     <p>{t('app.dashboard.welcome', { name: 'User' })}</p>
 *   </div>
 * );
 */
export function useTranslations() {
  const { translations, locale, available_locales } =
    usePage<I18nPageProps>().props;

  /**
   * Translate a key with optional interpolations
   * @param key - Dot-notation path to translation (e.g., 'app.dashboard.title')
   * @param interpolations - Object with values to replace in %{key} placeholders
   */
  const t = (key: string, interpolations?: Record<string, any>): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }

    // Handle interpolations like %{name}
    if (typeof value === "string" && interpolations) {
      return value.replace(/%\{(\w+)\}/g, (_, key) => {
        return interpolations[key]?.toString() ?? `%{${key}}`;
      });
    }

    return typeof value === "string" ? value : key;
  };

  return {
    t,
    locale,
    available_locales,
    translations,
  };
}

/**
 * Standalone translate function for non-hook contexts
 * @param translations - Translations object from page props
 * @param key - Dot-notation path to translation
 * @param interpolations - Object with values to replace in %{key} placeholders
 */
export function t(
  translations: Translations,
  key: string,
  interpolations?: Record<string, any>
): string {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
  }

  if (typeof value === "string" && interpolations) {
    return value.replace(/%\{(\w+)\}/g, (_, key) => {
      return interpolations[key]?.toString() ?? `%{${key}}`;
    });
  }

  return typeof value === "string" ? value : key;
}
