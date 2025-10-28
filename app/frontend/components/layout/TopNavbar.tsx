import React from 'react';
import { usePhoenix } from '../../hooks/usePhoenix';

const TopNavbar: React.FC = () => {
  const { config, updateConfig } = usePhoenix();

  const toggleSidebar = () => {
    updateConfig({ 
      phoenixIsNavbarVerticalCollapsed: !config.phoenixIsNavbarVerticalCollapsed 
    });
  };

  const toggleTheme = () => {
    updateConfig({ 
      phoenixTheme: config.phoenixTheme === 'light' ? 'dark' : 'light' 
    });
  };

  return (
    <nav className="navbar navbar-top fixed-top navbar-expand">
      <div className="navbar-logo">
        <button 
          className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" 
          type="button" 
          onClick={toggleSidebar}
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line"></span>
          </span>
        </button>
        <a className="navbar-brand me-1 me-sm-3" href="/">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <span className="font-sans-serif fs-4 fw-bolder text-primary d-inline-block">Phoenix</span>
            </div>
          </div>
        </a>
      </div>

      <div className="search-box navbar-top-search-box d-none d-lg-block" style={{ width: '25rem' }}>
        <form className="position-relative">
          <input 
            className="form-control search-input fuzzy-search rounded-pill form-control-sm" 
            type="search" 
            placeholder="Search..." 
            aria-label="Search" 
          />
          <span className="fas fa-search search-box-icon"></span>
        </form>
      </div>

      <ul className="navbar-nav navbar-nav-icons flex-row">
        <li className="nav-item">
          <div className="theme-control-toggle fa-icon-wait px-2">
            <input 
              className="form-check-input ms-0 theme-control-toggle-input" 
              type="checkbox" 
              checked={config.phoenixTheme === 'dark'}
              onChange={toggleTheme}
            />
            <label className="mb-0 theme-control-toggle-label theme-control-toggle-light">
              <span className="fas fa-sun fs-9"></span>
            </label>
            <label className="mb-0 theme-control-toggle-label theme-control-toggle-dark">
              <span className="fas fa-moon fs-9"></span>
            </label>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="fas fa-bell fs-9"></span>
          </a>
          <div className="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border">
            <div className="card position-relative border-0">
              <div className="card-header p-2">
                <div className="d-flex justify-content-between">
                  <h5 className="text-body-emphasis mb-0">Notifications</h5>
                  <button className="btn btn-link p-0 fs-9 fw-normal">Mark all as read</button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="scrollbar-overlay" style={{ height: '27rem' }}>
                  <div className="px-2 px-sm-3 py-3 notification-card position-relative">
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div className="d-flex">
                        <div className="avatar avatar-m status-online me-3">
                          <div className="avatar-name rounded-pill">
                            <span className="fs-9 text-dark">J</span>
                          </div>
                        </div>
                        <div className="flex-1 me-sm-3">
                          <h4 className="fs-9 text-black">Jessie Samson</h4>
                          <p className="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal">
                            <span className="me-1 fs-10">💬</span>
                            Mentioned you in a comment.
                          </p>
                          <p className="text-body-quaternary fs-10 mb-0">
                            <span className="fas fa-clock me-1"></span>
                            <span className="fw-bold">10m</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link lh-1 pe-0" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="avatar avatar-l">
              <div className="avatar-name rounded-circle">
                <span className="fs-9 text-dark">A</span>
              </div>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border">
            <div className="card position-relative border-0">
              <div className="card-body p-0">
                <div className="text-center pt-4 pb-3">
                  <div className="avatar avatar-xl">
                    <div className="avatar-name rounded-circle">
                      <span className="fs-4 text-dark">A</span>
                    </div>
                  </div>
                  <h6 className="mt-2 text-black">Admin User</h6>
                </div>
              </div>
              <div className="overflow-auto scrollbar">
                <ul className="nav d-flex flex-column mb-2 pb-1">
                  <li className="nav-item">
                    <a className="nav-link px-3 d-block" href="/profile">
                      <span className="me-2 text-body" data-feather="user"></span>
                      <span>Profile</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-3 d-block" href="/settings">
                      <span className="me-2 text-body" data-feather="settings"></span>
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
                <hr />
                <div className="px-3">
                  <a className="btn btn-phoenix-secondary d-flex flex-center w-100" href="/logout">
                    <span className="me-2" data-feather="log-out"></span>
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;