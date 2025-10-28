class DashboardController < ApplicationController
  def index
    @stats = {
      total_users: 1240,
      total_revenue: 87540,
      total_orders: 456,
      conversion_rate: 2.1
    }

    respond_to do |format|
      format.html { render inertia: "Dashboard/Index", props: { stats: @stats } }
    end
  end
end
