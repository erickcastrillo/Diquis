import React from "react";

const Hero: React.FC = () => {
  return (
    <div
      id="hero"
      className="relative bg-base-100 pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 size-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 size-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl">
            {/* Main Heading with Emoji */}
            <h1 className="text-base-content text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl mb-6">
              <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Football Academy Management
              </span>{" "}
              ⚽
              <br />
              Made Simple and Powerful
            </h1>

            {/* Description */}
            <p className="text-base-content/70 text-lg mb-8">
              Manage players, teams, and training sessions with{" "}
              <span className="text-primary font-semibold">Diquis</span> - the
              complete multi-tenant platform built for football academies
              worldwide.
            </p>

            {/* Avatar Group & Social Proof */}
            <div className="flex items-center gap-4 mb-8">
              <div className="avatar-group -space-x-4">
                <div className="avatar avatar-ring avatar-md">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="avatar"
                  />
                </div>
                <div className="avatar avatar-ring avatar-md">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png"
                    alt="avatar"
                  />
                </div>
                <div className="avatar avatar-ring avatar-md">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-12.png"
                    alt="avatar"
                  />
                </div>
                <div className="avatar avatar-ring avatar-md">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="icon-[tabler--star-filled] text-warning size-4"></span>
                  <span className="icon-[tabler--star-filled] text-warning size-4"></span>
                  <span className="icon-[tabler--star-filled] text-warning size-4"></span>
                  <span className="icon-[tabler--star-filled] text-warning size-4"></span>
                  <span className="icon-[tabler--star-filled] text-warning size-4"></span>
                </div>
                <p className="text-base-content/60 text-sm">
                  Loved by great clients
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
                <span className="icon-[tabler--rocket] size-5"></span>
              </a>
              <a
                href="#"
                className="btn btn-outline btn-primary btn-lg hover:scale-105 transition-transform"
              >
                View Documentation
                <span className="icon-[tabler--arrow-right] size-5"></span>
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:block">
            <div className="relative">
              <img
                src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/hero/hero-3.png"
                alt="Dashboard Preview"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-primary size-16 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <span className="icon-[tabler--rocket] text-primary-content size-8"></span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary size-16 rounded-2xl shadow-lg flex items-center justify-center animate-pulse">
                <span className="icon-[tabler--sparkles] text-secondary-content size-8"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
