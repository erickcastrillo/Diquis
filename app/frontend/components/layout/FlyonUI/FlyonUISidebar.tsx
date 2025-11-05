import React from "react";

const FlyonUISidebar: React.FC = () => {
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
                      FlyonUI
                    </div>
                    <div className="text-base-content/50 text-xs">
                      Workspace
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
                        FlyonUI
                      </div>
                      <div className="text-base-content/50 text-xs">
                        Workspace
                      </div>
                    </div>
                    <span className="icon-[tabler--check] text-primary size-5"></span>
                  </a>
                </li>

                {/* Other Workspaces */}
                <li>
                  <a
                    href="#"
                    className="dropdown-item flex items-center gap-3 px-3 py-2"
                  >
                    <div className="bg-base-content flex size-10 items-center justify-center rounded-lg">
                      <span className="icon-[tabler--affiliate] size-6 text-white"></span>
                    </div>
                    <div className="flex-1">
                      <div className="text-base-content text-sm font-semibold">
                        Shaden/Studio
                      </div>
                      <div className="text-base-content/50 text-xs">
                        Workspace
                      </div>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="dropdown-item flex items-center gap-3 px-3 py-2"
                  >
                    <div className="bg-info flex size-10 items-center justify-center rounded-lg">
                      <span className="icon-[tabler--checkup-list] size-6 text-white"></span>
                    </div>
                    <div className="flex-1">
                      <div className="text-base-content text-sm font-semibold">
                        Themeselection
                      </div>
                      <div className="text-base-content/50 text-xs">
                        Workspace
                      </div>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="dropdown-item flex items-center gap-3 px-3 py-2"
                  >
                    <div className="bg-warning flex size-10 items-center justify-center rounded-lg">
                      <span className="icon-[tabler--flame] size-6 text-white"></span>
                    </div>
                    <div className="flex-1">
                      <div className="text-base-content text-sm font-semibold">
                        Pixinvent
                      </div>
                      <div className="text-base-content/50 text-xs">
                        Workspace
                      </div>
                    </div>
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
                      Add New Workspace
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
              <a
                href="#"
                className="bg-primary/10 text-primary flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium"
              >
                <span className="icon-[tabler--dashboard] size-5"></span>
                Dashboard
              </a>

              {/* Pages Section */}
              <div className="text-base-content/50 px-2 pb-2 pt-4 text-xs font-semibold uppercase">
                Pages
              </div>

              {/* Backlog */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--list-check] size-5"></span>
                Backlog
              </a>

              {/* Iterations */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--refresh] size-5"></span>
                Iterations
              </a>

              {/* Milestones */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--flag] size-5"></span>
                Milestones
              </a>

              {/* Bug Tracker */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--bug] size-5"></span>
                Bug Tracker
              </a>

              {/* Design Assets */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--palette] size-5"></span>
                Design Assets
              </a>

              {/* Release Notes */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--notes] size-5"></span>
                Release Notes
              </a>

              {/* Campaign Calendar */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--calendar] size-5"></span>
                Campaign Calendar
              </a>

              {/* Ad Performance */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--chart-bar] size-5"></span>
                Ad Performance
              </a>

              {/* Supporting Features Section */}
              <div className="text-base-content/50 px-2 pb-2 pt-4 text-xs font-semibold uppercase">
                Supporting Features
              </div>

              {/* Real-Time Monitoring */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--activity] size-5"></span>
                Real-Time Monitoring
              </a>

              {/* Scheduled Posts */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--clock] size-5"></span>
                Scheduled Posts
              </a>

              {/* Reports & Export */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--file-export] size-5"></span>
                Reports & Export
              </a>

              {/* Settings & Integrations */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--settings] size-5"></span>
                Settings & Integrations
              </a>

              {/* Management */}
              <a
                href="#"
                className="text-base-content hover:bg-base-200 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <span className="icon-[tabler--users] size-5"></span>
                Management
              </a>
            </div>
          </div>

          {/* Upgrade Plan Section */}
          <div className="mt-auto p-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="text-base-content mb-2 text-sm font-semibold">
                Upgrade Your Plan
              </h4>
              <p className="text-base-content/60 mb-3 text-xs">
                Your trial plan ends in 12 days. Upgrade your plan and unlock
                full potential!
              </p>
              <div className="bg-base-200 mb-3 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <button className="btn btn-primary btn-block btn-sm">
                See All Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FlyonUISidebar;
