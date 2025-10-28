import React from 'react';

const HorizontalNavbar: React.FC = () => {
  return (
    <nav className="navbar navbar-horizontal navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className="font-sans-serif fs-4 fw-bolder text-primary">Phoenix</span>
        </a>
        
        <div className="collapse navbar-collapse" id="navbarHorizontal">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Dashboard
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Overview</a></li>
                <li><a className="dropdown-item" href="/analytics">Analytics</a></li>
              </ul>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/settings">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;