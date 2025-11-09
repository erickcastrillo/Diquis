import { createInertiaApp, router } from "@inertiajs/react";
import { createElement, ReactNode, useEffect } from "react";
import { createRoot } from "react-dom/client";

// Import FlyonUI JavaScript
import "flyonui/flyonui";

// Import styles (includes Tailwind CSS)
import "../stylesheets/application.scss";

// Temporary type definition, until @inertiajs/react provides one
type ResolvedComponent = {
  default: any;
  layout?: (page: ReactNode) => ReactNode;
};

// FlyonUI wrapper component to reinitialize on page changes
function FlyonUIWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize FlyonUI on component mount and children change
    const initializeFlyonUI = () => {
      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === "function"
      ) {
        window.HSStaticMethods.autoInit();
      }
    };

    // Initial initialization with longer timeout for page load
    const timer = setTimeout(initializeFlyonUI, 300);

    // Listen to Inertia navigation events and reinitialize
    const removeNavigateListener = router.on("navigate", () => {
      setTimeout(initializeFlyonUI, 300);
    });

    return () => {
      clearTimeout(timer);
      removeNavigateListener();
    };
  }, [children]);

  return createElement("div", { style: { display: "contents" } }, children);
}

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.dev/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    // Import all page components except test files
    const pages = import.meta.glob<ResolvedComponent>(
      "../pages/**/!(*.test).tsx",
      {
        eager: true,
      }
    );

    const page = pages[`../pages/${name}.tsx`];
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`);
    }

    // Default layout removed - each page component handles its own layout

    return page;
  },

  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(
        createElement(FlyonUIWrapper, {
          children: createElement(App, props),
        })
      );
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n" +
          'Consider moving <%= vite_typescript_tag "inertia" %> to the Inertia-specific layout instead.'
      );
    }
  },
});
