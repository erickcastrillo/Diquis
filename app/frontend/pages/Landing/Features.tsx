import React from "react";

const Features: React.FC = () => {
  return (
    <div
      id="features"
      className="relative bg-base-100 py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 size-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 size-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            FEATURES
          </p>
          <h2 className="text-base-content text-3xl font-bold md:text-4xl lg:text-5xl mb-4">
            Everything you need to manage your football academy
          </h2>
          <p className="text-base-content/70 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive tools for player management, team organization,
            training scheduling, and performance analytics - all in one
            platform.
          </p>
        </div>

        {/* Features with Phone Mockup */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Features */}
          <div className="space-y-8">
            {/* Player Management */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--users] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Player Management
                </h3>
                <p className="text-base-content/70">
                  Complete player profiles with registration, skill tracking,
                  and performance analytics across all age categories.
                </p>
              </div>
            </div>

            {/* Team Organization */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--users-group] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Team Organization
                </h3>
                <p className="text-base-content/70">
                  Build and manage teams with roster assignments, formations,
                  and squad management tools.
                </p>
              </div>
            </div>

            {/* Training Sessions */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--calendar-event] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Training Sessions
                </h3>
                <p className="text-base-content/70">
                  Schedule training sessions with automated attendance tracking
                  and conflict detection.
                </p>
              </div>
            </div>
          </div>

          {/* Center Phone Mockup */}
          <div className="flex justify-center order-first lg:order-2">
            <img
              src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/features/features-15.png"
              alt="Phone Mockup"
              className="w-full max-w-sm h-auto"
            />
          </div>

          {/* Right Features */}
          <div className="space-y-8">
            {/* Multi-Tenancy */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--building] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Multi-Tenancy
                </h3>
                <p className="text-base-content/70">
                  Complete data isolation for each academy with secure,
                  academy-based tenant management.
                </p>
              </div>
            </div>

            {/* Analytics & Reports */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--chart-line] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Analytics & Reports
                </h3>
                <p className="text-base-content/70">
                  Comprehensive dashboards to track player performance,
                  attendance, and academy metrics.
                </p>
              </div>
            </div>

            {/* Asset Management */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 text-primary rounded-2xl size-14 flex items-center justify-center">
                  <span className="icon-[tabler--package] size-7"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base-content font-semibold text-lg mb-2">
                  Asset Management
                </h3>
                <p className="text-base-content/70">
                  Track equipment, uniforms, and inventory with comprehensive
                  asset management tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
