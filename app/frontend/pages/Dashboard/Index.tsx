import React from "react";
import MainLayout from "../../components/layout/MainLayout";

interface DashboardPageProps {
  stats?: {
    totalUsers: number;
    totalRevenue: number;
    totalOrders: number;
    conversionRate: number;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  stats = {
    totalUsers: 1240,
    totalRevenue: 87540,
    totalOrders: 456,
    conversionRate: 2.1,
  },
}) => {
  return (
    <MainLayout>
      <div className="pb-5">
        <div className="row g-4">
          <div className="col-12 col-xxl-6">
            <div className="mb-8">
              <h2 className="mb-2">E-commerce dashboard</h2>
              <h5 className="text-body-tertiary fw-semibold">
                Here's what's going on at your business right now
              </h5>
            </div>

            {/* Stats Cards */}
            <div className="row align-items-center g-4">
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <span
                    className="fas fa-circle me-3 text-primary"
                    data-fa-transform="shrink-2"
                  ></span>
                  <div className="flex-1">
                    <h4 className="mb-0">
                      {stats.totalUsers.toLocaleString()}
                    </h4>
                    <p className="fs-9 text-body-tertiary mb-0">Total Users</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <span
                    className="fas fa-circle me-3 text-info"
                    data-fa-transform="shrink-2"
                  ></span>
                  <div className="flex-1">
                    <h4 className="mb-0">
                      ${stats.totalRevenue.toLocaleString()}
                    </h4>
                    <p className="fs-9 text-body-tertiary mb-0">
                      Total Revenue
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <span
                    className="fas fa-circle me-3 text-success"
                    data-fa-transform="shrink-2"
                  ></span>
                  <div className="flex-1">
                    <h4 className="mb-0">
                      {stats.totalOrders.toLocaleString()}
                    </h4>
                    <p className="fs-9 text-body-tertiary mb-0">Total Orders</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                  <span
                    className="fas fa-circle me-3 text-warning"
                    data-fa-transform="shrink-2"
                  ></span>
                  <div className="flex-1">
                    <h4 className="mb-0">{stats.conversionRate}%</h4>
                    <p className="fs-9 text-body-tertiary mb-0">
                      Conversion Rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xxl-6">
            <div className="row g-3">
              <div className="col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="mb-1">Recent Activity</h5>
                        <h6 className="text-body-tertiary">
                          Latest user interactions
                        </h6>
                      </div>
                      <div className="btn-reveal-trigger">
                        <button
                          className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal"
                          type="button"
                          data-bs-toggle="dropdown"
                          data-boundary="window"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-bs-reference="parent"
                        >
                          <span className="fas fa-ellipsis-h fs-10"></span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end py-2">
                          <a className="dropdown-item" href="#!">
                            View Details
                          </a>
                          <a className="dropdown-item" href="#!">
                            Export
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="timeline-simple">
                        <div className="timeline-item">
                          <div className="timeline-icon">
                            <span className="fas fa-circle text-primary"></span>
                          </div>
                          <div className="timeline-content">
                            <h6 className="fs-9 mb-0">New user registered</h6>
                            <p className="fs-10 text-body-tertiary mb-0">
                              2 minutes ago
                            </p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-icon">
                            <span className="fas fa-circle text-success"></span>
                          </div>
                          <div className="timeline-content">
                            <h6 className="fs-9 mb-0">Order completed</h6>
                            <p className="fs-10 text-body-tertiary mb-0">
                              5 minutes ago
                            </p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-icon">
                            <span className="fas fa-circle text-info"></span>
                          </div>
                          <div className="timeline-content">
                            <h6 className="fs-9 mb-0">Payment received</h6>
                            <p className="fs-10 text-body-tertiary mb-0">
                              8 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row g-4 mt-6">
          <div className="col-12">
            <h4 className="mb-4">Quick Actions</h4>
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <div className="card h-100 hover-actions-trigger">
                  <div className="card-body text-center">
                    <div className="avatar avatar-3xl mx-auto mb-3">
                      <div className="avatar-name rounded-circle bg-primary-subtle">
                        <span className="fs-2 text-primary fas fa-plus"></span>
                      </div>
                    </div>
                    <h5 className="mb-2">Add User</h5>
                    <p className="text-body-tertiary fs-9 mb-0">
                      Create new user account
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 hover-actions-trigger">
                  <div className="card-body text-center">
                    <div className="avatar avatar-3xl mx-auto mb-3">
                      <div className="avatar-name rounded-circle bg-success-subtle">
                        <span className="fs-2 text-success fas fa-shopping-cart"></span>
                      </div>
                    </div>
                    <h5 className="mb-2">New Order</h5>
                    <p className="text-body-tertiary fs-9 mb-0">
                      Create new order
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 hover-actions-trigger">
                  <div className="card-body text-center">
                    <div className="avatar avatar-3xl mx-auto mb-3">
                      <div className="avatar-name rounded-circle bg-info-subtle">
                        <span className="fs-2 text-info fas fa-chart-bar"></span>
                      </div>
                    </div>
                    <h5 className="mb-2">View Reports</h5>
                    <p className="text-body-tertiary fs-9 mb-0">
                      Check analytics
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 hover-actions-trigger">
                  <div className="card-body text-center">
                    <div className="avatar avatar-3xl mx-auto mb-3">
                      <div className="avatar-name rounded-circle bg-warning-subtle">
                        <span className="fs-2 text-warning fas fa-cog"></span>
                      </div>
                    </div>
                    <h5 className="mb-2">Settings</h5>
                    <p className="text-body-tertiary fs-9 mb-0">
                      Configure system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
