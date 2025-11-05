import React from "react";
import { useTranslations } from "../../lib/i18n";

const Footer: React.FC = () => {
  const { t } = useTranslations();
  return (
    <footer className="relative bg-base-100 border-t border-base-content/10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.flyonui.com/fy-assets/logo/logo.png"
                className="size-8"
                alt="Diquis Logo"
              />
              <span className="text-base-content text-xl font-bold">
                Diquis
              </span>
            </a>
            <p className="text-base-content/70 text-sm mb-6">
              {t("app.landing.footer.description")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
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
                aria-label="Discord"
              >
                <span className="icon-[tabler--brand-discord] size-5"></span>
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
                aria-label="YouTube"
              >
                <span className="icon-[tabler--brand-youtube] size-5"></span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base-content font-semibold mb-4">
              {t("app.landing.footer.product")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.product_features")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.product_pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.product_api")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.product_roadmap")}
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-base-content font-semibold mb-4">
              {t("app.landing.footer.resources")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.resources_docs")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.resources_github")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.resources_support")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base-content/70 hover:text-primary transition-colors text-sm"
                >
                  {t("app.landing.footer.resources_privacy")}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-base-content font-semibold mb-4">
              {t("app.landing.footer.newsletter")}
            </h4>
            <form className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t("app.landing.footer.newsletter_placeholder")}
                  className="input input-sm w-full pr-12 bg-base-200 border-base-content/20 focus:border-primary"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm absolute right-0 top-0 rounded-l-none"
                  aria-label={t("app.landing.footer.newsletter")}
                >
                  <span className="icon-[tabler--arrow-right] size-4"></span>
                </button>
              </div>
            </form>

            {/* Technology Badges */}
            <div className="space-y-2">
              <p className="text-base-content/70 text-xs font-semibold uppercase tracking-wider">
                {t("app.landing.footer.built_with")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-soft badge-primary text-xs">
                  Rails 8.0+
                </span>
                <span className="badge badge-soft badge-primary text-xs">
                  React
                </span>
                <span className="badge badge-soft badge-primary text-xs">
                  PostgreSQL
                </span>
                <span className="badge badge-soft badge-primary text-xs">
                  Redis
                </span>
                <span className="badge badge-soft badge-primary text-xs">
                  Sidekiq
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-content/10 pt-8">
          <p className="text-base-content/70 text-sm text-center">
            {t("app.landing.footer.copyright", { app_name: "Diquis" })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
