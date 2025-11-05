import React from "react";

const SearchModal: React.FC = () => {
  return (
    <div
      id="search-modal"
      className="overlay modal overlay-open:opacity-100 overlay-open:duration-300 modal-middle hidden"
      role="dialog"
      tabIndex={-1}
    >
      <div className="modal-dialog w-full max-w-145">
        <div className="modal-content overflow-auto shadow-none">
          {/* SearchBox */}
          <div className="modal-header border-base-content/20 border-b px-3 py-2">
            <div className="input no-focus border-0 px-0">
              <span className="icon-[tabler--search] text-base-content/80 my-auto me-2 size-5 shrink-0"></span>
              <input
                type="search"
                className="grow"
                placeholder="Search here..."
                id="kbdInput"
              />
              <label className="sr-only" htmlFor="kbdInput">
                Search
              </label>
            </div>
          </div>

          {/* Tabs */}
          <nav
            className="tabs tabs-bordered py-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="tab active-tab:tab-active active w-full font-medium"
              id="search-tabs-item-1"
              data-tab="#search-tabs-1"
              aria-controls="search-tabs-1"
              role="tab"
              aria-selected="true"
            >
              All
            </button>
            <button
              type="button"
              className="tab active-tab:tab-active w-full font-medium"
              id="search-tabs-item-2"
              data-tab="#search-tabs-2"
              aria-controls="search-tabs-2"
              role="tab"
              aria-selected="false"
            >
              Pages
            </button>
            <button
              type="button"
              className="tab active-tab:tab-active w-full font-medium"
              id="search-tabs-item-3"
              data-tab="#search-tabs-3"
              aria-controls="search-tabs-3"
              role="tab"
              aria-selected="false"
            >
              Integration
            </button>
            <button
              type="button"
              className="tab active-tab:tab-active w-full font-medium"
              id="search-tabs-item-4"
              data-tab="#search-tabs-4"
              aria-controls="search-tabs-4"
              role="tab"
              aria-selected="false"
            >
              Users
            </button>
          </nav>

          {/* SearchBox Modal Body */}
          <div className="max-h-90 overflow-y-auto lg:max-h-121">
            {/* All Tab */}
            <div
              id="search-tabs-1"
              role="tabpanel"
              aria-labelledby="search-tabs-item-1"
            >
              {/* Pages Section */}
              <div className="modal-body">
                <div className="text-base-content/50 mb-1.5 text-sm uppercase">
                  Pages
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      className="hover:bg-base-200 rounded-field flex items-center gap-2 px-1 py-1.5"
                      href="#"
                    >
                      <span className="icon-[tabler--users] size-6 shrink-0"></span>
                      <h6 className="font-medium">Marketing UI Page</h6>
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:bg-base-200 rounded-field flex items-center gap-2 px-1 py-1.5"
                      href="#"
                    >
                      <span className="icon-[tabler--shopping-cart] size-6 shrink-0"></span>
                      <h6 className="font-medium">e-commerce UI Page</h6>
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:bg-base-200 rounded-field flex items-center gap-2 px-1 py-1.5"
                      href="#"
                    >
                      <span className="icon-[tabler--device-desktop-analytics] size-6 shrink-0"></span>
                      <h6 className="font-medium">Dashboard UI Page</h6>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Other tabs can be added similarly - simplified for brevity */}
            <div
              id="search-tabs-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="search-tabs-item-2"
            >
              <div className="modal-body">
                <p className="text-sm text-base-content/50">Pages content</p>
              </div>
            </div>
            <div
              id="search-tabs-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="search-tabs-item-3"
            >
              <div className="modal-body">
                <p className="text-sm text-base-content/50">
                  Integration content
                </p>
              </div>
            </div>
            <div
              id="search-tabs-4"
              className="hidden"
              role="tabpanel"
              aria-labelledby="search-tabs-item-4"
            >
              <div className="modal-body">
                <p className="text-sm text-base-content/50">Users content</p>
              </div>
            </div>
          </div>

          {/* Footer Commands */}
          <div className="modal-footer border-base-content/20 text-base-content/50 gap-4 border-t py-4 max-sm:hidden">
            <div className="flex grow items-center gap-2 text-sm">
              <kbd className="kbd kbd-sm">esc</kbd>
              <span>To close</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <kbd className="kbd kbd-sm p-0">
                <span className="icon-[tabler--arrow-back] size-4"></span>
              </kbd>
              <span>To Select</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <kbd className="kbd kbd-sm p-0">
                <span className="icon-[tabler--arrow-up] size-4"></span>
              </kbd>
              <kbd className="kbd kbd-sm p-0">
                <span className="icon-[tabler--arrow-down] size-4"></span>
              </kbd>
              <span>To Navigate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
