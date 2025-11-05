import React from "react";
import ActivityDrawer from "./FlyonUI/ActivityDrawer";
import FlyonUIFooter from "./FlyonUI/FlyonUIFooter";
import FlyonUIHeader from "./FlyonUI/FlyonUIHeader";
import FlyonUISidebar from "./FlyonUI/FlyonUISidebar";
import SearchModal from "./FlyonUI/SearchModal";

interface FlyonUILayoutProps {
  children: React.ReactNode;
}

const FlyonUILayout: React.FC<FlyonUILayoutProps> = ({ children }) => {
  return (
    <div className="bg-base-200 flex min-h-screen flex-col">
      {/* Search Modal */}
      <SearchModal />

      {/* Activity Drawer */}
      <ActivityDrawer />

      {/* Main Sidebar */}
      <FlyonUISidebar />

      {/* Main Content Area */}
      <div className="relative flex grow flex-col lg:ps-75">
        {/* Header */}
        <FlyonUIHeader />

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-6">
          {children}
        </main>

        {/* Footer */}
        <FlyonUIFooter />
      </div>
    </div>
  );
};

export default FlyonUILayout;
