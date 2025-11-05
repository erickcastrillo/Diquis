import React from "react";
import { useTranslations } from "../../lib/i18n";

const Pricing: React.FC = () => {
  const { t } = useTranslations();
  return (
    <section
      id="pricing"
      className="relative bg-base-100 py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 size-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 size-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            {t("app.landing.pricing.section_label")}
          </p>
          <h2 className="text-base-content text-3xl lg:text-4xl font-bold mb-4">
            {t("app.landing.pricing.title")}
          </h2>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            {t("app.landing.pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Standard Plan */}
          <div className="card bg-base-100 border border-base-content/10 p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="icon-[tabler--trophy] size-6 text-primary"></span>
              </div>
              <span className="badge badge-soft badge-primary mb-4">
                {t("app.landing.pricing.starter.name")}
              </span>
              <div className="mb-4">
                <span className="text-base-content/70 text-lg">$</span>
                <span className="text-base-content text-5xl font-bold">
                  {t("app.landing.pricing.starter.price")}
                </span>
                <span className="text-base-content/70 text-sm">/month</span>
              </div>
              <p className="text-base-content/70 text-sm">
                {t("app.landing.pricing.starter.description")}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.starter.feature_1")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.starter.feature_2")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.starter.feature_3")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.starter.feature_4")}
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <button className="btn btn-primary btn-outline btn-block">
              {t("app.landing.pricing.starter.cta")}
              <span className="icon-[tabler--arrow-right] size-5"></span>
            </button>
          </div>

          {/* Professional Plan (Featured) */}
          <div className="card bg-primary text-primary-content p-8 lg:scale-110 shadow-xl">
            <div className="mb-6">
              <div className="size-12 rounded-full bg-primary-content/20 flex items-center justify-center mb-4">
                <span className="icon-[tabler--crown] size-6 text-primary-content"></span>
              </div>
              <span className="badge bg-primary-content/90 text-primary border-0 mb-4 font-semibold">
                {t("app.landing.pricing.professional.name")}
              </span>
              <div className="mb-4">
                <span className="text-xl">$</span>
                <span className="text-5xl font-bold">
                  {t("app.landing.pricing.professional.price")}
                </span>
                <span className="text-primary-content/80">/month</span>
              </div>
              <p className="text-primary-content/90 text-sm">
                {t("app.landing.pricing.professional.description")}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_1")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_2")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_3")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_4")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_5")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 shrink-0 mt-0.5"></span>
                <span className="text-sm">
                  {t("app.landing.pricing.professional.feature_6")}
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <button className="btn bg-primary-content text-primary border-0 hover:bg-primary-content/90 btn-block font-semibold shadow-lg">
              {t("app.landing.pricing.professional.cta")}
              <span className="icon-[tabler--arrow-right] size-5"></span>
            </button>
          </div>

          {/* Premium Plan */}
          <div className="card bg-base-100 border border-base-content/10 p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="icon-[tabler--star] size-6 text-primary"></span>
              </div>
              <span className="badge badge-soft badge-primary mb-4">
                {t("app.landing.pricing.growth.name")}
              </span>
              <div className="mb-4">
                <span className="text-base-content/70 text-lg">$</span>
                <span className="text-base-content text-5xl font-bold">
                  {t("app.landing.pricing.growth.price")}
                </span>
                <span className="text-base-content/70 text-sm">/month</span>
              </div>
              <p className="text-base-content/70 text-sm">
                {t("app.landing.pricing.growth.description")}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.growth.feature_1")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.growth.feature_2")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.growth.feature_3")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-[tabler--circle-check-filled] size-5 text-primary shrink-0 mt-0.5"></span>
                <span className="text-base-content/70 text-sm">
                  {t("app.landing.pricing.growth.feature_4")}
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <button className="btn btn-primary btn-outline btn-block">
              {t("app.landing.pricing.growth.cta")}
              <span className="icon-[tabler--arrow-right] size-5"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
