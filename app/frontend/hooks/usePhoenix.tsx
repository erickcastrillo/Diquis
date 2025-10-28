import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  PhoenixConfig,
  getStoredConfig,
  initialConfig,
  setStoredConfig,
} from "../utils/config.ts";

interface PhoenixContextType {
  config: PhoenixConfig;
  updateConfig: (updates: Partial<PhoenixConfig>) => void;
  resetConfig: () => void;
}

const PhoenixContext = createContext<PhoenixContextType | undefined>(undefined);

type ConfigAction =
  | { type: "UPDATE_CONFIG"; payload: Partial<PhoenixConfig> }
  | { type: "RESET_CONFIG" }
  | { type: "LOAD_CONFIG"; payload: PhoenixConfig };

const configReducer = (
  state: PhoenixConfig,
  action: ConfigAction
): PhoenixConfig => {
  switch (action.type) {
    case "UPDATE_CONFIG":
      return { ...state, ...action.payload };
    case "RESET_CONFIG":
      return { ...initialConfig };
    case "LOAD_CONFIG":
      return action.payload;
    default:
      return state;
  }
};

interface PhoenixProviderProps {
  children: ReactNode;
}

export const PhoenixProvider: React.FC<PhoenixProviderProps> = ({
  children,
}) => {
  const [config, dispatch] = useReducer(configReducer, initialConfig);

  useEffect(() => {
    // Load stored config on mount
    const storedConfig = getStoredConfig();
    const mergedConfig = { ...initialConfig, ...storedConfig };
    dispatch({ type: "LOAD_CONFIG", payload: mergedConfig });
  }, []);

  useEffect(() => {
    // Apply theme classes to HTML element
    const html = document.documentElement;

    // Theme
    html.setAttribute("data-bs-theme", config.phoenixTheme);

    // Navigation type
    html.setAttribute("data-navigation-type", config.phoenixNavbarPosition);

    // RTL
    if (config.phoenixIsRTL) {
      html.setAttribute("dir", "rtl");
    } else {
      html.removeAttribute("dir");
    }

    // Navbar styles
    html.setAttribute(
      "data-navbar-horizontal-shape",
      config.phoenixNavbarTopShape
    );

    // Collapsed navbar
    if (config.phoenixIsNavbarVerticalCollapsed) {
      html.setAttribute("data-navbar-vertical-collapsed", "true");
    } else {
      html.removeAttribute("data-navbar-vertical-collapsed");
    }
  }, [config]);

  const updateConfig = (updates: Partial<PhoenixConfig>) => {
    dispatch({ type: "UPDATE_CONFIG", payload: updates });
    setStoredConfig(updates);
  };

  const resetConfig = () => {
    dispatch({ type: "RESET_CONFIG" });
    setStoredConfig(initialConfig);
  };

  const value: PhoenixContextType = {
    config,
    updateConfig,
    resetConfig,
  };

  return (
    <PhoenixContext.Provider value={value}>{children}</PhoenixContext.Provider>
  );
};

export const usePhoenix = (): PhoenixContextType => {
  const context = useContext(PhoenixContext);
  if (context === undefined) {
    throw new Error("usePhoenix must be used within a PhoenixProvider");
  }
  return context;
};
