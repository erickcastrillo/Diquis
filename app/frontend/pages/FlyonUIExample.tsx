import React from "react";
import FlyonUILayout from "../components/layout/FlyonUILayout";

const FlyonUIExample: React.FC = () => {
  return (
    <FlyonUILayout>
      <div className="grid grid-cols-1 gap-6">
        {/* Example Card 1 */}
        <div className="card h-120 w-full">
          <div className="card-body border-base-content/20 rounded-box skeleton-striped m-6 border"></div>
        </div>

        {/* Example Card 2 */}
        <div className="card h-120 w-full">
          <div className="card-body border-base-content/20 rounded-box skeleton-striped m-6 border"></div>
        </div>

        {/* Example with Real Content */}
        <div className="card w-full">
          <div className="card-body">
            <h2 className="card-title">Welcome to FlyonUI Layout!</h2>
            <p className="text-base-content/70">
              This is an example page using the FlyonUI application shell. You
              can replace this content with your own components.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-ghost">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default FlyonUIExample;
