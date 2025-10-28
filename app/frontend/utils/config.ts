export interface PhoenixConfig {
  phoenixIsNavbarVerticalCollapsed: boolean;
  phoenixTheme: "light" | "dark";
  phoenixNavbarTopStyle: "default" | "darker" | "vibrant";
  phoenixNavbarVerticalStyle: "default" | "darker" | "vibrant";
  phoenixNavbarPosition: "vertical" | "horizontal" | "dual-nav";
  phoenixNavbarTopShape: "default" | "slim" | "standout";
  phoenixIsRTL: boolean;
  phoenixSupportChat: boolean;
}

export const configQueryMap = {
  "navbar-vertical-collapsed": "phoenixIsNavbarVerticalCollapsed",
  "color-scheme": "phoenixTheme",
  "navigation-type": "phoenixNavbarPosition",
  "vertical-navbar-appearance": "phoenixNavbarVerticalStyle",
  "horizontal-navbar-shape": "phoenixNavbarTopShape",
  "horizontal-navbar-appearance": "phoenixNavbarTopStyle",
} as const;

export const initialConfig: PhoenixConfig = {
  phoenixIsNavbarVerticalCollapsed: false,
  phoenixTheme: "light",
  phoenixNavbarTopStyle: "default",
  phoenixNavbarVerticalStyle: "default",
  phoenixNavbarPosition: "vertical",
  phoenixNavbarTopShape: "default",
  phoenixIsRTL: false,
  phoenixSupportChat: true,
};

export const getStoredConfig = (): Partial<PhoenixConfig> => {
  const storedConfig: any = {};

  Object.keys(initialConfig).forEach((key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      const configKey = key as keyof PhoenixConfig;
      if (typeof initialConfig[configKey] === "boolean") {
        storedConfig[configKey] = storedValue === "true";
      } else {
        storedConfig[configKey] = storedValue;
      }
    }
  });

  return storedConfig as Partial<PhoenixConfig>;
};

export const setStoredConfig = (payload: Partial<PhoenixConfig>): void => {
  Object.keys(payload).forEach((key) => {
    const configKey = key as keyof PhoenixConfig;
    localStorage.setItem(key, String(payload[configKey]));
  });
};

export const resetStoredConfig = (): void => {
  Object.keys(initialConfig).forEach((key) => {
    localStorage.setItem(
      key,
      String(initialConfig[key as keyof PhoenixConfig])
    );
  });
};
