import React from 'react';
import { usePhoenix } from '../../hooks/usePhoenix';
import VerticalNavbar from './VerticalNavbar';
import HorizontalNavbar from './HorizontalNavbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import ThemeSettings from './ThemeSettings';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { config } = usePhoenix();

  const renderNavigation = () => {
    switch (config.phoenixNavbarPosition) {
      case 'horizontal':
        return <HorizontalNavbar />;
      case 'dual-nav':
        return (
          <>
            <TopNavbar />
            <HorizontalNavbar />
          </>
        );
      default:
        return (
          <>
            <VerticalNavbar />
            <TopNavbar />
          </>
        );
    }
  };

  const getMainClasses = () => {
    let classes = 'main';

    if (config.phoenixNavbarPosition === 'horizontal') {
      classes += ' main-horizontal';
    }

    return classes;
  };

  return (
    <div className="phoenix-app">
      {renderNavigation()}
      
      <main className={getMainClasses()} id="top">
        <div className="content">
          {children}
        </div>
        <Footer />
      </main>
      
      <ThemeSettings />
    </div>
  );
};

export default MainLayout;