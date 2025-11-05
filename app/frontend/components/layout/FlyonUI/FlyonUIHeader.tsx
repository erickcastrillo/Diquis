import { router } from "@inertiajs/react";
import React from "react";
import { useTranslations } from "../../../lib/i18n";

const FlyonUIHeader: React.FC = () => {
  const { t, locale, available_locales } = useTranslations();

  const switchLocale = (newLocale: string) => {
    router.reload({
      data: { locale: newLocale },
    });
  };
  return (
    <div className="sticky top-0 z-50 w-full py-4">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="bg-base-100 rounded-box flex items-center justify-between gap-4 px-4 py-3 shadow-sm">
          {/* Left Side - Search */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="btn btn-text btn-square btn-sm lg:hidden"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="layout-toggle"
              data-overlay="#layout-toggle"
            >
              <span className="icon-[tabler--menu-2] size-5"></span>
            </button>

            {/* Search Input */}
            <div className="relative">
              <span className="icon-[tabler--search] text-base-content/50 pointer-events-none absolute start-3 top-1/2 size-4.5 -translate-y-1/2"></span>
              <input
                type="text"
                placeholder={t("app.layout.header.search_placeholder")}
                className="h-9 w-64 rounded-lg border-0 bg-transparent ps-10 text-sm outline-none placeholder:text-base-content/50 max-md:hidden"
                data-overlay="#search-modal"
                readOnly
              />
            </div>
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              type="button"
              className="btn btn-text btn-square btn-sm"
              aria-label={t("app.layout.header.theme_toggle")}
              onClick={() => {
                const html = document.documentElement;
                const currentTheme = html.getAttribute("data-theme");
                html.setAttribute(
                  "data-theme",
                  currentTheme === "dark" ? "light" : "dark"
                );
              }}
            >
              <span className="icon-[tabler--moon] size-5"></span>
            </button>

            {/* Language Dropdown */}
            <div className="dropdown relative inline-flex [--offset:8]">
              <button
                type="button"
                className="dropdown-toggle btn btn-text btn-square btn-sm"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label={t("app.layout.header.language")}
              >
                <span className="icon-[tabler--language] size-5"></span>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden min-w-40"
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

            {/* Activity/Charts */}
            <button
              type="button"
              className="btn btn-text btn-square btn-sm"
              aria-label="Activity"
              data-overlay="#activity-drawer"
            >
              <span className="icon-[tabler--chart-line] size-5"></span>
            </button>

            {/* Notification Dropdown */}
            <div className="dropdown relative inline-flex [--offset:8]">
              <button
                type="button"
                className="dropdown-toggle btn btn-text btn-square btn-sm"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label={t("app.layout.header.notifications")}
              >
                <span className="relative">
                  <span className="bg-error absolute -end-0.5 -top-0.5 size-2 rounded-full"></span>
                  <span className="icon-[tabler--bell] size-5"></span>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden w-80"
                role="menu"
              >
                <li className="dropdown-header">
                  <div className="flex items-center justify-between">
                    <h6 className="text-base-content text-sm font-semibold">
                      {t("app.layout.header.notifications_title")}
                    </h6>
                    <span className="badge badge-primary badge-sm">
                      {t("app.layout.header.notifications_new", { count: "3" })}
                    </span>
                  </div>
                </li>
                <li>
                  <hr className="border-base-content/20 my-1" />
                </li>
                <li>
                  <a className="dropdown-item gap-3 px-3 py-2" href="#">
                    <div className="avatar">
                      <div className="size-10 rounded-full">
                        <img
                          src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New order received</p>
                      <p className="text-base-content/60 text-xs">
                        2 minutes ago
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item gap-3 px-3 py-2" href="#">
                    <div className="avatar">
                      <div className="size-10 rounded-full">
                        <img
                          src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment confirmed</p>
                      <p className="text-base-content/60 text-xs">1 hour ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item gap-3 px-3 py-2" href="#">
                    <div className="avatar">
                      <div className="size-10 rounded-full">
                        <img
                          src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New message</p>
                      <p className="text-base-content/60 text-xs">
                        3 hours ago
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="border-base-content/20 my-1" />
                </li>
                <li>
                  <a
                    className="dropdown-item justify-center text-primary"
                    href="#"
                  >
                    {t("app.layout.header.notifications_view_all")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Profile Avatar */}
            <div className="dropdown relative inline-flex [--offset:8] ms-1">
              <button
                type="button"
                className="dropdown-toggle"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label={t("app.layout.header.profile")}
              >
                <div className="avatar">
                  <div className="size-8 rounded-full">
                    <img
                      src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden w-full max-w-60 space-y-0.5"
                role="menu"
              >
                <li className="dropdown-header gap-3 px-4 py-3">
                  <div className="avatar">
                    <div className="size-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <h6 className="text-base-content text-sm font-semibold">
                      Mitchell Johnson
                    </h6>
                    <p className="text-base-content/60 text-xs">
                      admin@flyonui.com
                    </p>
                  </div>
                </li>
                <li>
                  <hr className="border-base-content/20 my-1" />
                </li>
                <li>
                  <a className="dropdown-item px-3 py-2" href="#">
                    <span className="icon-[tabler--user] size-4.5"></span>
                    {t("app.layout.header.my_profile")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item px-3 py-2" href="#">
                    <span className="icon-[tabler--settings] size-4.5"></span>
                    {t("app.layout.header.settings")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item px-3 py-2" href="#">
                    <span className="icon-[tabler--help] size-4.5"></span>
                    {t("app.layout.header.help")}
                  </a>
                </li>
                <li>
                  <hr className="border-base-content/20 my-1" />
                </li>
                <li>
                  <a className="dropdown-item px-3 py-2 text-error" href="#">
                    <span className="icon-[tabler--logout] size-4.5"></span>
                    {t("app.layout.header.logout")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyonUIHeader;
