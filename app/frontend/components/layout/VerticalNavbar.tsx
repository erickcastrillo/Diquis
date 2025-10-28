import React from "react";
import { usePhoenix } from "../../hooks/usePhoenix";

const VerticalNavbar: React.FC = () => {
  const { config } = usePhoenix();

  return (
    <nav
      className={`navbar navbar-vertical navbar-expand-lg ${
        config.phoenixIsNavbarVerticalCollapsed ? "navbar-collapsed" : ""
      }`}
    >
      <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div className="navbar-vertical-content">
          <ul className="navbar-nav flex-column" id="navbarVerticalNav">
            {/* Brand/Logo */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="navbar-brand" href="/">
                  <div className="d-flex align-items-center py-3">
                    <span className="font-sans-serif fs-4 fw-bolder text-primary">
                      Phoenix
                    </span>
                  </div>
                </a>
              </div>
            </li>

            {/* Dashboard */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a
                  className="nav-link dropdown-indicator label-1"
                  href="#nv-home"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="nv-home"
                >
                  <div className="d-flex align-items-center">
                    <div className="dropdown-indicator-icon-wrapper">
                      <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                    </div>
                    <span className="nav-link-icon">
                      <i className="fas fa-chart-pie"></i>
                    </span>
                    <span className="nav-link-text">Dashboard</span>
                  </div>
                </a>
                <div className="parent-wrapper label-1">
                  <ul
                    className="nav collapse parent show"
                    data-bs-parent="#navbarVerticalCollapse"
                    id="nv-home"
                  >
                    <li className="collapsed-nav-item-title d-none">
                      Dashboard
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="/">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Overview</span>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/analytics">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Analytics</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Apps Section */}
            <li className="nav-item">
              <p className="navbar-vertical-label">Apps</p>
              <hr className="navbar-vertical-line" />
            </li>

            {/* Users */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link" href="/users">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <i className="fas fa-users"></i>
                    </span>
                    <span className="nav-link-text">Users</span>
                  </div>
                </a>
              </div>
            </li>

            {/* Settings */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link" href="/settings">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <i className="fas fa-cog"></i>
                    </span>
                    <span className="nav-link-text">Settings</span>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
