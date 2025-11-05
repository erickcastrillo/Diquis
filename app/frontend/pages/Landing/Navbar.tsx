import React from "react";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  return (
    <header className="bg-base-100/80 backdrop-blur-sm fixed top-0 z-10 w-full border-b border-base-content/10">
      <nav className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <a
            className="text-base-content flex items-center gap-3 text-xl font-bold"
            href="#"
          >
            <img
              src="https://cdn.flyonui.com/fy-assets/logo/logo.png"
              className="size-8"
              alt="brand-logo"
            />
            Diquis
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              API Reference
            </a>
            <a
              href="#"
              className="text-base-content/80 hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <a href="#" className="btn btn-sm btn-ghost lg:hidden">
            <span className="icon-[tabler--menu-2] size-5"></span>
          </a>
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Search"
            >
              <span className="icon-[tabler--search] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="GitHub"
            >
              <span className="icon-[tabler--brand-github] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Twitter"
            >
              <span className="icon-[tabler--brand-twitter] size-5"></span>
            </a>
            <a
              href="#"
              className="btn btn-circle btn-text btn-sm"
              aria-label="Discord"
            >
              <span className="icon-[tabler--brand-discord] size-5"></span>
            </a>
            <button
              onClick={onToggleTheme}
              className="btn btn-circle btn-text btn-sm"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <span className="icon-[tabler--sun] size-5"></span>
              ) : (
                <span className="icon-[tabler--moon] size-5"></span>
              )}
            </button>
            <div className="divider divider-horizontal mx-2"></div>
            <a href="#" className="btn btn-primary btn-sm">
              Login
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
