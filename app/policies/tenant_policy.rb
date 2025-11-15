# frozen_string_literal: true

class TenantPolicy < ApplicationPolicy
  def switch?
    # A user can switch to an academy if they are a super_admin
    # or if they belong to that academy.
    user.role_super_admin? || user.academy_id == record.id
  end
end
