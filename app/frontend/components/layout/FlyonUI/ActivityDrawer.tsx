import React from "react";

const ActivityDrawer: React.FC = () => {
  return (
    <div
      id="activity-drawer"
      className="overlay overlay-open:translate-x-0 drawer drawer-end hidden sm:max-w-104"
      role="dialog"
      tabIndex={-1}
    >
      <div className="drawer-header border-base-content/20 border-b p-4">
        <h3 className="drawer-title text-base font-semibold">Activity</h3>
        <button
          type="button"
          className="btn btn-text btn-circle btn-xs"
          aria-label="Close"
          data-overlay="#activity-drawer"
        >
          <span className="icon-[tabler--x] size-4"></span>
        </button>
      </div>
      <div className="drawer-body p-0">
        <ul className="space-y-0">
          {/* Joe Lincoln Activity */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">
                  Joe Lincoln
                </span>
                <span className="text-base-content text-sm">
                  {" "}
                  mentioned you in last trends topic
                </span>
              </div>
              <p className="text-base-content/50 mb-3 text-sm">18 Mins ago</p>

              <div className="bg-base-200 rounded-box border-base-content/20 border px-4 py-2.5">
                <p className="text-base-content mb-4 text-sm font-medium">
                  @Flyonui For an expert opinion, check out what Mike has to say
                  on this topic!
                </p>
                <div className="input input-sm">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Reply"
                    id="flyonuiReply"
                  />
                  <span className="icon-[tabler--photo] text-base-content/80 my-auto ms-2 size-4 shrink-0"></span>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Sofia */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                  alt="Sofia"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">Sofia</span>
                <span className="text-base-content text-sm">
                  {" "}
                  requested feedback on her design.
                </span>
              </div>
              <p className="text-base-content/50 text-sm">1 Hour ago</p>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Jane Perez File Review */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                  alt="Jane Perez"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">
                  Jane Perez
                </span>
                <span className="text-base-content text-sm">
                  {" "}
                  invites you to review a file.
                </span>
              </div>
              <p className="text-base-content/50 mb-2.5 text-sm">3 Hours ago</p>
              <span className="badge badge-soft badge-lg">
                <span className="icon-[tabler--file-type-pdf] text-error"></span>
                invoices.pdf
              </span>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Liam */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-11.png"
                  alt="Liam"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">Liam</span>
                <span className="text-base-content text-sm">
                  {" "}
                  has shared a project update.
                </span>
              </div>
              <p className="text-base-content/50 text-sm">5 Hours ago</p>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Tyler Hero Design Project */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-9.png"
                  alt="Tyler Hero"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">
                  Tyler Hero
                </span>
                <span className="text-base-content text-sm">
                  {" "}
                  wants to view your design project
                </span>
              </div>
              <p className="text-base-content/50 mb-3 text-sm">18 Mins ago</p>

              <div className="bg-base-200 rounded-box border-base-content/20 flex items-center gap-4 border px-4 py-2.5">
                <div className="avatar avatar-placeholder">
                  <div className="bg-base-100 text-primary rounded-box size-8 p-2">
                    <img
                      src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/figma-icon.png"
                      alt="avatar"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium">Launcher-UIkit.fig</span>
              </div>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Denial Invite */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-4.png"
                  alt="Denial"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">Denial</span>
                <span className="text-base-content text-sm">
                  {" "}
                  Invite from invite link
                </span>
              </div>
              <p className="text-base-content/50 text-sm">3 Hours ago</p>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Leslie Alexander Tags */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-5.png"
                  alt="Leslie Alexander"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">
                  Leslie Alexander
                </span>
                <span className="text-base-content text-sm">
                  {" "}
                  new tags to Web Redesign
                </span>
              </div>
              <p className="text-base-content/50 mb-3 text-sm">18 Mins ago</p>

              <div className="flex gap-2.5">
                <span className="badge badge-soft badge-primary badge-sm">
                  Client - Request
                </span>
                <span className="badge badge-soft badge-warning badge-sm">
                  Figma
                </span>
                <span className="badge badge-soft badge-info badge-sm">
                  Redesign
                </span>
              </div>
            </div>
          </li>

          <li>
            <div className="divider"></div>
          </li>

          {/* Miya File Review */}
          <li className="flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="size-8 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
                  alt="Miya"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-base-content font-semibold">Miya</span>
                <span className="text-base-content text-sm">
                  {" "}
                  invites you to review a file.
                </span>
              </div>
              <p className="text-base-content/50 text-sm">10 Hours ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityDrawer;
