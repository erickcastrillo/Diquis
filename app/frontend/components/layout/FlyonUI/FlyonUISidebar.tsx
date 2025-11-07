import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslations } from "../../../lib/i18n";

const FlyonUISidebar: React.FC = () => {
  const { t } = useTranslations();
  return (
    <aside
      id="layout-toggle"
      className="overlay overlay-open:translate-x-0 drawer drawer-start inset-y-0 start-0 hidden h-full [--auto-close:lg] sm:w-75 lg:z-50 lg:block lg:translate-x-0 lg:shadow-none"
      aria-label="Sidebar"
      tabIndex={-1}
    >
      <div className="drawer-body border-base-content/20 h-full border-e p-0">
        <div className="flex h-full max-h-full flex-col">
          <button
            type="button"
            className="btn btn-text btn-circle btn-sm absolute end-3 top-3 lg:hidden"
            aria-label="Close"
            data-overlay="#layout-toggle"
          >
            <span className="icon-[tabler--x] size-5"></span>
          </button>

          {/* Workspace Selector Dropdown */}
          <div className="border-base-content/20 border-b p-4">
            <div className="dropdown w-full">
              <button
                type="button"
                className="btn btn-text hover:bg-base-200 w-full justify-between px-3"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="m22.258 20.467-5.55-6.839a1 1 0 0 0-1.568.02l-5.023 6.521a1 1 0 0 1-.793.39H7.17a1 1 0 0 1-.78-1.626l8.748-10.919a1 1 0 0 1 1.556-.006l9.125 11.198a1 1 0 0 1-.775 1.631h-2.01a1 1 0 0 1-.776-.37m-5.59-1.484 2.59 2.953c.567.646.108 1.659-.751 1.659h-4.922a1 1 0 0 1-.785-1.62l2.331-2.953a1 1 0 0 1 1.537-.04"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-base-content text-sm font-semibold">
                      {t("app.name")}
                    </div>
                    <div className="text-base-content/50 text-xs">
                      {t("app.layout.sidebar.workspace")}
                    </div>
                  </div>
                </div>
                <span className="icon-[tabler--chevron-down] size-4"></span>
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden w-full space-y-0.5"
                role="menu"
              >
                {/* Active Workspace */}
                <li>
                  <a
                    href="#"
                    className="dropdown-item bg-primary/10 flex items-center gap-3 px-3 py-2"
                  >
                    <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="m22.258 20.467-5.55-6.839a1 1 0 0 0-1.568.02l-5.023 6.521a1 1 0 0 1-.793.39H7.17a1 1 0 0 1-.78-1.626l8.748-10.919a1 1 0 0 1 1.556-.006l9.125 11.198a1 1 0 0 1-.775 1.631h-2.01a1 1 0 0 1-.776-.37m-5.59-1.484 2.59 2.953c.567.646.108 1.659-.751 1.659h-4.922a1 1 0 0 1-.785-1.62l2.331-2.953a1 1 0 0 1 1.537-.04"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-base-content text-sm font-semibold">
                        {t("app.name")}
                      </div>
                      <div className="text-base-content/50 text-xs">
                        {t("app.layout.sidebar.workspace")}
                      </div>
                    </div>
                    <span className="icon-[tabler--check] text-primary size-5"></span>
                  </a>
                </li>

                {/* Add New Workspace */}
                <li className="border-base-content/20 border-t pt-1">
                  <a
                    href="#"
                    className="dropdown-item text-primary flex items-center gap-2 px-3 py-2"
                  >
                    <span className="icon-[tabler--plus] size-5"></span>
                    <span className="text-sm font-semibold">
                      {t("app.layout.sidebar.add_workspace")}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-1">
              {/* Dashboard - Active */}
              <Link
                href="/app/dashboard"
                className="bg-primary/10 text-primary flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium"
              >
                <span className="icon-[tabler--dashboard] size-5"></span>
                {t("app.layout.sidebar.dashboard")}
              </Link>

              {/* Core Management Section with Submenu */}
              <details className="group" open>
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--layout-grid] size-5"></span>
                    {t("app.layout.sidebar.core_management")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Players */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--users] size-5"></span>
                    {t("app.layout.sidebar.players")}
                  </a>

                  {/* Teams */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--users-group] size-5"></span>
                    {t("app.layout.sidebar.teams")}
                  </a>

                  {/* Training Sessions */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--calendar-event] size-5"></span>
                    {t("app.layout.sidebar.training")}
                  </a>

                  {/* Competitions */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--trophy] size-5"></span>
                    {t("app.layout.sidebar.competitions")}
                  </a>
                </div>
              </details>

              {/* Events & Calendar Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--calendar-month] size-5"></span>
                    {t("app.layout.sidebar.events_calendar")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Calendar */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--calendar] size-5"></span>
                    {t("app.layout.sidebar.calendar")}
                  </a>

                  {/* Events */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--confetti] size-5"></span>
                    {t("app.layout.sidebar.events")}
                  </a>

                  {/* Tournaments */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--tournament] size-5"></span>
                    {t("app.layout.sidebar.tournaments")}
                  </a>
                </div>
              </details>

              {/* Resources & Assets Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--briefcase] size-5"></span>
                    {t("app.layout.sidebar.resources_assets")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Equipment & Assets */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--package] size-5"></span>
                    {t("app.layout.sidebar.equipment")}
                  </a>

                  {/* Facilities */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--building-stadium] size-5"></span>
                    {t("app.layout.sidebar.facilities")}
                  </a>

                  {/* Inventory */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--box] size-5"></span>
                    {t("app.layout.sidebar.inventory")}
                  </a>
                </div>
              </details>

              {/* Health & Medical Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--medical-cross] size-5"></span>
                    {t("app.layout.sidebar.health_medical")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Medical Records */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--heart-rate-monitor] size-5"></span>
                    {t("app.layout.sidebar.medical_records")}
                  </a>

                  {/* Injuries */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--bandage] size-5"></span>
                    {t("app.layout.sidebar.injuries")}
                  </a>
                </div>
              </details>

              {/* Communications Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--send] size-5"></span>
                    {t("app.layout.sidebar.communications")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Messages */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--message] size-5"></span>
                    {t("app.layout.sidebar.messages")}
                  </a>

                  {/* Notifications */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--bell] size-5"></span>
                    {t("app.layout.sidebar.notifications_menu")}
                  </a>

                  {/* Parent Portal */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--user-heart] size-5"></span>
                    {t("app.layout.sidebar.parent_portal")}
                  </a>
                </div>
              </details>

              {/* Analytics & Reports Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--chart-bar] size-5"></span>
                    {t("app.layout.sidebar.analytics_reports")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Analytics Dashboard */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--chart-line] size-5"></span>
                    {t("app.layout.sidebar.analytics")}
                  </a>

                  {/* Player Analytics */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--chart-dots] size-5"></span>
                    {t("app.layout.sidebar.player_analytics")}
                  </a>

                  {/* Financial Reports */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--report-money] size-5"></span>
                    {t("app.layout.sidebar.financial_reports")}
                  </a>

                  {/* Custom Reports */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--file-report] size-5"></span>
                    {t("app.layout.sidebar.custom_reports")}
                  </a>
                </div>
              </details>

              {/* Administration Section with Submenu */}
              <details className="group">
                <summary className="text-base-content hover:bg-base-200 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <span className="icon-[tabler--shield-lock] size-5"></span>
                    {t("app.layout.sidebar.administration")}
                  </div>
                  <span className="icon-[tabler--chevron-down] size-4 transition-transform group-open:rotate-180"></span>
                </summary>
                <div className="ml-2 mt-1 space-y-1 border-l-2 border-base-content/10 pl-4">
                  {/* Users & Roles */}
                  <Link
                    href="/admin/users"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--user-shield] size-5"></span>
                    {t("app.layout.sidebar.users_roles")}
                  </Link>

                  {/* Academy Settings */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--building] size-5"></span>
                    {t("app.layout.sidebar.academy_settings")}
                  </a>

                  {/* Shared Resources */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--database] size-5"></span>
                    {t("app.layout.sidebar.shared_resources")}
                  </a>

                  {/* Integrations */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--plug] size-5"></span>
                    {t("app.layout.sidebar.integrations")}
                  </a>

                  {/* Settings */}
                  <a
                    href="#"
                    className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="icon-[tabler--settings] size-5"></span>
                    {t("app.layout.sidebar.settings")}
                  </a>
                </div>
              </details>
            </div>
          </div>

          {/* Upgrade Plan Section */}
          <div className="mt-auto p-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="text-base-content mb-2 text-sm font-semibold">
                {t("app.layout.sidebar.upgrade_title")}
              </h4>
              <p className="text-base-content/60 mb-3 text-xs">
                {t("app.layout.sidebar.upgrade_description", { days: "12" })}
              </p>
              <div className="bg-base-200 mb-3 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <button className="btn btn-primary btn-block btn-sm">
                {t("app.layout.sidebar.upgrade_button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FlyonUISidebar;
