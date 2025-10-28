import React from 'react';
import { usePhoenix } from '../../hooks/usePhoenix';

const ThemeSettings: React.FC = () => {
  const { config, updateConfig, resetConfig } = usePhoenix();

  return (
    <div className="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabIndex={-1}>
      <div className="offcanvas-header align-items-start border-bottom flex-column border-translucent">
        <div className="pt-1 w-100 mb-6 d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-2 me-2 lh-sm">
              <span className="fas fa-palette me-2 fs-8"></span>
              Theme Customizer
            </h5>
            <p className="mb-0 fs-9">Explore different styles according to your preferences</p>
          </div>
          <button className="btn p-1 fw-bolder" type="button" data-bs-dismiss="offcanvas">
            <span className="fas fa-times fs-8"></span>
          </button>
        </div>
        <button className="btn btn-phoenix-secondary w-100" onClick={resetConfig}>
          <span className="fas fa-arrows-rotate me-2 fs-10"></span>
          Reset to default
        </button>
      </div>
      
      <div className="offcanvas-body scrollbar px-card">
        {/* Color Scheme */}
        <div className="setting-panel-item mt-0">
          <h5 className="setting-panel-item-title">Color Scheme</h5>
          <div className="row gx-2">
            <div className="col-4">
              <input 
                className="btn-check" 
                id="themeSwitcherLight" 
                name="theme-color" 
                type="radio" 
                value="light"
                checked={config.phoenixTheme === 'light'}
                onChange={() => updateConfig({ phoenixTheme: 'light' })}
              />
              <label className="btn d-inline-block btn-navbar-style fs-9" htmlFor="themeSwitcherLight">
                <span className="mb-2 rounded d-block">
                  <img className="img-fluid img-prototype mb-0" src="/assets/images/theme/generic/default-light.png" alt="Light theme" />
                </span>
                <span className="label-text">Light</span>
              </label>
            </div>
            <div className="col-4">
              <input 
                className="btn-check" 
                id="themeSwitcherDark" 
                name="theme-color" 
                type="radio" 
                value="dark"
                checked={config.phoenixTheme === 'dark'}
                onChange={() => updateConfig({ phoenixTheme: 'dark' })}
              />
              <label className="btn d-inline-block btn-navbar-style fs-9" htmlFor="themeSwitcherDark">
                <span className="mb-2 rounded d-block">
                  <img className="img-fluid img-prototype mb-0" src="/assets/images/theme/generic/default-dark.png" alt="Dark theme" />
                </span>
                <span className="label-text">Dark</span>
              </label>
            </div>
          </div>
        </div>

        {/* RTL Toggle */}
        <div className="border border-translucent rounded-3 p-4 setting-panel-item bg-body-emphasis">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="setting-panel-item-title mb-1">RTL</h5>
            <div className="form-check form-switch mb-0">
              <input 
                className="form-check-input ms-auto" 
                type="checkbox"
                checked={config.phoenixIsRTL}
                onChange={(e) => updateConfig({ phoenixIsRTL: e.target.checked })}
              />
            </div>
          </div>
          <p className="mb-0 text-body-tertiary">Change text direction</p>
        </div>

        {/* Support Chat Toggle */}
        <div className="border border-translucent rounded-3 p-4 setting-panel-item bg-body-emphasis">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="setting-panel-item-title mb-1">Support Chat</h5>
            <div className="form-check form-switch mb-0">
              <input 
                className="form-check-input ms-auto" 
                type="checkbox"
                checked={config.phoenixSupportChat}
                onChange={(e) => updateConfig({ phoenixSupportChat: e.target.checked })}
              />
            </div>
          </div>
          <p className="mb-0 text-body-tertiary">Toggle support chat</p>
        </div>

        {/* Navigation Type */}
        <div className="setting-panel-item">
          <h5 className="setting-panel-item-title">Navigation Type</h5>
          <div className="row gx-2">
            <div className="col-6">
              <input 
                className="btn-check" 
                id="navbarPositionVertical" 
                name="navigation-type" 
                type="radio" 
                value="vertical"
                checked={config.phoenixNavbarPosition === 'vertical'}
                onChange={() => updateConfig({ phoenixNavbarPosition: 'vertical' })}
              />
              <label className="btn d-inline-block btn-navbar-style fs-9" htmlFor="navbarPositionVertical">
                <span className="rounded d-block">
                  <img className="img-fluid img-prototype d-dark-none" src="/assets/images/theme/generic/default-light.png" alt="Vertical nav" />
                  <img className="img-fluid img-prototype d-light-none" src="/assets/images/theme/generic/default-dark.png" alt="Vertical nav" />
                </span>
                <span className="label-text">Vertical</span>
              </label>
            </div>
            <div className="col-6">
              <input 
                className="btn-check" 
                id="navbarPositionHorizontal" 
                name="navigation-type" 
                type="radio" 
                value="horizontal"
                checked={config.phoenixNavbarPosition === 'horizontal'}
                onChange={() => updateConfig({ phoenixNavbarPosition: 'horizontal' })}
              />
              <label className="btn d-inline-block btn-navbar-style fs-9" htmlFor="navbarPositionHorizontal">
                <span className="rounded d-block">
                  <img className="img-fluid img-prototype d-dark-none" src="/assets/images/theme/generic/top-default.png" alt="Horizontal nav" />
                  <img className="img-fluid img-prototype d-light-none" src="/assets/images/theme/generic/top-default-dark.png" alt="Horizontal nav" />
                </span>
                <span className="label-text">Horizontal</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;