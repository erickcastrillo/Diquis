# frozen_string_literal: true

class DashboardPolicy < ApplicationPolicy
  # Dashboard is accessible to all authenticated users
  # Each role may see different data based on their permissions
  def index?
    # All authenticated users can access the dashboard
    # The content shown will vary by role
    user.present?
  end

  # Alias for consistency
  def show?
    index?
  end
end
