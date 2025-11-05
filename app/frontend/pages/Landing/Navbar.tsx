import { router } from "@inertiajs/react";
import React from "react";
import { useTranslations } from "../../lib/i18n";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const { locale, available_locales, t } = useTranslations();

  const switchLocale = (newLocale: string) => {
    router.reload({
      data: { locale: newLocale },
    });
  };

  return (
    <header className="bg-base-100/80 backdrop-blur-sm fixed top-0 z-10 w-full border-b border-base-content/10">
      <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <a
            className="text-base-content flex items-center gap-3 text-xl font-bold"
            href="#"
          >
            <img
              src="https://cdn.flyonui.com/fy-assets/logo/logo.png"
              className="size-8"
              alt="brand-logo"
            />
            Diquis
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              {t("app.landing.nav.features")}
            </a>
            <a
              href="#pricing"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              {t("app.landing.nav.pricing")}
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              {t("app.landing.nav.documentation")}
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              {t("app.landing.nav.api_reference")}
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              {t("app.landing.nav.github")}
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <a href="#" className="btn btn-sm btn-ghost lg:hidden">
            <span className="icon-[tabler--menu-2] size-5"></span>
          </a>
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Search"
            >
              <span className="icon-[tabler--search] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="GitHub"
            >
              <span className="icon-[tabler--brand-github] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Twitter"
            >
              <span className="icon-[tabler--brand-twitter] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Discord"
            >
              <span className="icon-[tabler--brand-discord] size-5"></span>
            </a>
            {/* Language Switcher */}
            <div className="dropdown relative inline-flex [--offset:8]">
              <button
                type="button"
                className="dropdown-toggle btn btn-circle btn-text btn-sm"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Language"
              >
                <span className="icon-[tabler--language] size-5"></span>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden min-w-32"
                role="menu"
              >
                {available_locales.map(
                  (loc: { code: string; name: string; flag: string }) => (
                    <li key={loc.code}>
                      <button
                        className={`dropdown-item ${
                          locale === loc.code ? "active" : ""
                        }`}
                        onClick={() => switchLocale(loc.code)}
                      >
                        <span className="mr-2">{loc.flag}</span>
                        {loc.name}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
            <button
              onClick={onToggleTheme}
              className="btn btn-circle btn-text btn-sm"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <span className="icon-[tabler--sun] size-5"></span>
              ) : (
                <span className="icon-[tabler--moon] size-5"></span>
              )}
            </button>
            <div className="divider divider-horizontal mx-2"></div>
            <a href="#" className="btn btn-primary btn-sm">
              {t("app.landing.nav.login")}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
