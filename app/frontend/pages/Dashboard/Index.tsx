import { Head } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../components/layout/FlyonUILayout";

const DashboardPage: React.FC = () => {
  return (
    <FlyonUILayout>
      <Head title="Diquis Football | Dashboard" />
      <div className="grid grid-cols-1 gap-6">
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {/* Total Customers - Bar Chart */}
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-sm font-semibold">
                Total Customers
              </h3>
              <p className="text-base-content/50 mb-4 text-xs">
                New 1,336 last week
              </p>

              {/* Bar Chart */}
              <div className="flex h-32 items-end justify-between gap-2">
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary/20 h-3/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary h-4/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary/20 h-3/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary/20 h-3/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary/20 h-2/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary/20 h-3/5 w-full rounded-t"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                  <div className="bg-primary h-full w-full rounded-t"></div>
                </div>
              </div>
              <div className="text-base-content/50 mt-2 flex justify-between text-xs">
                <span>Sat</span>
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wen</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-sm font-semibold">Revenue</h3>
              <h2 className="text-3xl font-bold">425k</h2>
              <div className="mt-4 flex gap-1">
                <div className="size-2 bg-primary rounded-full"></div>
                <div className="size-2 bg-primary/80 rounded-full"></div>
                <div className="size-2 bg-primary rounded-full"></div>
                <div className="size-2 bg-primary/50 rounded-full"></div>
                <div className="size-2 bg-primary/80 rounded-full"></div>
                <div className="size-2 bg-primary rounded-full"></div>
                <div className="size-2 bg-primary/60 rounded-full"></div>
              </div>
              <div className="text-base-content/50 mt-2 flex justify-between text-xs">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-sm font-semibold">Sessions</h3>
              <h2 className="text-3xl font-bold">2845</h2>
              <div className="mt-4">
                <div className="h-16 w-full">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <polyline
                      points="0,30 20,25 40,28 60,20 80,15 100,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-warning"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="card-title text-sm font-semibold">
                    Transactions
                  </h3>
                  <h2 className="text-2xl font-bold">$14,854</h2>
                  <p className="text-success text-sm">↑ 62%</p>
                </div>
                <div className="bg-primary/10 rounded-box p-2">
                  <span className="icon-[tabler--credit-card] text-primary size-5"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Order */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="card-title text-sm font-semibold">Order</h3>
                  <h2 className="text-2xl font-bold">$1,286</h2>
                  <p className="text-error text-sm">↓ 13.24%</p>
                </div>
                <div className="bg-primary/10 rounded-box p-2">
                  <span className="icon-[tabler--package] text-primary size-5"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Sales Report & Delivery Performance */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sales Report */}
          <div className="card">
            <div className="card-body">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="card-title">Sales Report</h3>
                  <p className="text-base-content/50 text-sm">
                    until your daily purchase target
                  </p>
                </div>
                <button className="btn btn-text btn-sm btn-square">
                  <span className="icon-[tabler--dots-vertical] size-4"></span>
                </button>
              </div>

              {/* Area Chart Visualization */}
              <div className="relative h-48 w-full">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity="0.3"
                        className="text-success"
                      />
                      <stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity="0"
                        className="text-success"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,80 Q 50,60 100,70 T 200,50 T 300,60 T 400,40 L 400,150 L 0,150 Z"
                    fill="url(#areaGradient)"
                  />
                  <path
                    d="M 0,80 Q 50,60 100,70 T 200,50 T 300,60 T 400,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-success"
                  />
                </svg>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="icon-[tabler--calendar] size-4"></span>
                    <span className="text-sm">Monthly</span>
                  </div>
                  <h3 className="text-2xl font-bold">$4,698</h3>
                  <p className="text-success text-sm">
                    ↑ 25.6% <span className="text-base-content/50">77 USD</span>
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="icon-[tabler--calendar-stats] size-4"></span>
                    <span className="text-sm">Yearly</span>
                  </div>
                  <h3 className="text-2xl font-bold">$14,698</h3>
                  <p className="text-success text-sm">
                    ↑ 5.6% <span className="text-base-content/50">77 USD</span>
                  </p>
                </div>
              </div>

              {/* Locations */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Los Angeles</span>
                  <span className="font-semibold">201, 168</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>New York</span>
                  <span className="font-semibold">478, 365</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Canada</span>
                  <span className="font-semibold">487, 214</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Performance */}
          <div className="card">
            <div className="card-body">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="card-title">Delivery Performance</h3>
                  <p className="text-base-content/50 text-sm">
                    12% increase in this month
                  </p>
                </div>
                <button className="btn btn-text btn-sm btn-square">
                  <span className="icon-[tabler--dots-vertical] size-4"></span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Package in transit */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-success/10 rounded-box p-2">
                      <span className="icon-[tabler--package] text-success size-5"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Package in transit</h4>
                      <p className="text-success text-sm">↑ 25.8%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">10k</span>
                </div>

                {/* Package out for delivery */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-box p-2">
                      <span className="icon-[tabler--truck-delivery] text-primary size-5"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Package out for delivery
                      </h4>
                      <p className="text-success text-sm">↑ 4.3%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">5k</span>
                </div>

                {/* Package delivered */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-error/10 rounded-box p-2">
                      <span className="icon-[tabler--checkbox] text-error size-5"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Package delivered</h4>
                      <p className="text-error text-sm">↓ 12.5%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">15k</span>
                </div>

                {/* Delivery success rate */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-info/10 rounded-box p-2">
                      <span className="icon-[tabler--percentage] size-5 text-info"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Delivery success rate</h4>
                      <p className="text-success text-sm">↑ 34.3%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">95%</span>
                </div>

                {/* Average delivery time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-warning/10 rounded-box p-2">
                      <span className="icon-[tabler--clock] text-warning size-5"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Average delivery time</h4>
                      <p className="text-error text-sm">↓ 4.6%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">2.5 Days</span>
                </div>

                {/* Customer satisfaction */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-warning/10 rounded-box p-2">
                      <span className="icon-[tabler--users] text-warning size-5"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Customer satisfaction</h4>
                      <p className="text-success text-sm">↑ 5.8%</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">4.5/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Order Statistics & Invoice Table */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Statistics */}
          <div className="card">
            <div className="card-body">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="card-title">Order Statistics</h3>
                  <p className="text-base-content/50 text-sm">
                    42.82K Total Sales
                  </p>
                </div>
                <button className="btn btn-text btn-sm btn-square">
                  <span className="icon-[tabler--dots-vertical] size-4"></span>
                </button>
              </div>

              {/* Circular Progress */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative size-32">
                  <svg className="size-full" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-base-200"
                      strokeWidth="2"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-primary"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="62"
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm">Weekly</span>
                    <span className="text-lg font-bold">38%</span>
                  </div>
                </div>
                <h2 className="mt-4 text-3xl font-bold">13,478</h2>
                <p className="text-base-content/50 text-sm">Total Orders</p>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-box p-2">
                      <span className="icon-[tabler--device-laptop] text-primary size-4"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Electronic</h4>
                      <p className="text-base-content/50 text-xs">
                        Mobile, Earbuds, TV
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">82.5k</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/10 rounded-box p-2">
                      <span className="icon-[tabler--hanger] text-secondary size-4"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Fashion</h4>
                      <p className="text-base-content/50 text-xs">
                        Shirts, Jeans, Shoes
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">23.8k</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-warning/10 rounded-box p-2">
                      <span className="icon-[tabler--shopping-bag] text-warning size-4"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Total Expenses</h4>
                      <p className="text-base-content/50 text-xs">
                        ADVT, Marketing
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">849k</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-success/10 rounded-box p-2">
                      <span className="icon-[tabler--ball-football] text-success size-4"></span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Sports</h4>
                      <p className="text-base-content/50 text-xs">
                        Football, Cricket Kit
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">10.9k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="card lg:col-span-2">
            <div className="card-body">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm">Show</span>
                  <select className="select select-sm max-w-20">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
                <button className="btn btn-primary btn-sm">
                  <span className="icon-[tabler--plus] size-4"></span>
                  Create Invoice
                </button>
              </div>

              <div className="mb-4 flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search User"
                  className="input input-sm grow"
                />
                <select className="select select-sm">
                  <option>Invoice Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </th>
                      <th>#</th>
                      <th>STATUS</th>
                      <th>CLIENT</th>
                      <th>TOTAL</th>
                      <th>ISSUED DATE</th>
                      <th>BALANCE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </td>
                      <td className="text-primary font-semibold">#6542</td>
                      <td>
                        <span className="icon-[tabler--check] text-success size-5"></span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="size-8 rounded-full">
                              <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                                alt="Jordan"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">
                              Jordan Stevenson
                            </div>
                            <div className="text-base-content/50 text-xs">
                              jordanstevenson10@yahoo.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>$4520</td>
                      <td>22 Jan 2025</td>
                      <td>
                        <span className="badge badge-success">PAID</span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--trash] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--eye] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--dots-vertical] size-4"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </td>
                      <td className="text-primary font-semibold">#9473</td>
                      <td>
                        <span className="icon-[tabler--mail] text-warning size-5"></span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="size-8 rounded-full">
                              <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                                alt="Olivia"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">Olivia Peterson</div>
                            <div className="text-base-content/50 text-xs">
                              olivia.peterson@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>$120</td>
                      <td>25 Jan 2025</td>
                      <td>
                        <span className="text-error">-$205</span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--trash] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--eye] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--dots-vertical] size-4"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </td>
                      <td className="text-primary font-semibold">#5631</td>
                      <td>
                        <span className="icon-[tabler--alert-triangle] text-error size-5"></span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="size-8 rounded-full">
                              <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                                alt="Liam"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">Liam Johnson</div>
                            <div className="text-base-content/50 text-xs">
                              liam.johnson@mail.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>$1850</td>
                      <td>01 Feb 2025</td>
                      <td>
                        <span className="text-error">-$205</span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--trash] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--eye] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--dots-vertical] size-4"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </td>
                      <td className="text-primary font-semibold">#2571</td>
                      <td>
                        <span className="icon-[tabler--check] text-success size-5"></span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="size-8 rounded-full">
                              <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-4.png"
                                alt="Sophia"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">Sophia Lee</div>
                            <div className="text-base-content/50 text-xs">
                              sophia.lee@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>$755</td>
                      <td>26 Jan 2025</td>
                      <td>
                        <span className="badge badge-success">PAID</span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--trash] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--eye] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--dots-vertical] size-4"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                      </td>
                      <td className="text-primary font-semibold">#9921</td>
                      <td>
                        <span className="icon-[tabler--clock] text-warning size-5"></span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="size-8 rounded-full">
                              <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-5.png"
                                alt="Ethan"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">Ethan Harris</div>
                            <div className="text-base-content/50 text-xs">
                              ethan.harris@example.com
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>$430</td>
                      <td>30 Jan 2025</td>
                      <td>$666</td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--trash] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--eye] size-4"></span>
                          </button>
                          <button className="btn btn-text btn-sm btn-square">
                            <span className="icon-[tabler--dots-vertical] size-4"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-base-content/50 text-sm">
                  Showing 1 to 5 of 17 entries
                </p>
                <div className="join">
                  <button className="join-item btn btn-sm">«</button>
                  <button className="join-item btn btn-sm btn-active">1</button>
                  <button className="join-item btn btn-sm">2</button>
                  <button className="join-item btn btn-sm">3</button>
                  <button className="join-item btn btn-sm">4</button>
                  <button className="join-item btn btn-sm">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default DashboardPage;
