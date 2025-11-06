# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  # Policy for User model authorization
  # Implements the 7-role hierarchy permission matrix:
  # - player (0): No user management access
  # - parent (1): View own profile only
  # - staff (2): View users
  # - coach (3): View users
  # - academy_admin (4): Full CRUD for players, parents, staff, coaches in their academy
  # - academy_owner (5): Full CRUD for players, parents, staff, coaches, academy_admins in their academy
  # - super_admin (6): Full CRUD for all users globally

  # List users - staff and above can view user lists
  def index?
    user.role_staff? || user.role_coach? || user.role_academy_admin? || user.role_academy_owner? || user.role_super_admin?
  end

  # Show users - staff and coaches can view all, academy_admin can view manageable users
  def show?
    return true if user.id == record.id # Users can view themselves

    # Staff and coaches can view any user
    return true if user.role_staff? || user.role_coach?

    # Academy admin can view users they can manage (player, parent, staff, coach)
    return true if user.role_academy_admin? && can_manage_user?(record)

    # Academy owner can view users up to academy_admin
    return true if user.role_academy_owner? && can_manage_user?(record)

    # Super admin can view anyone
    return true if user.role_super_admin?

    false
  end

  # Create users - admins can create users at or below their level
  def create?
    # Academy admin can create player, parent, staff, coach
    return true if user.role_academy_admin? && creatable_by_academy_admin?(record)

    # Academy owner can create any role except super_admin
    return true if user.role_academy_owner? && !record.role_super_admin?

    # Super admin can create any role
    return true if user.role_super_admin?

    false
  end

  # Update users - admins can update users they can manage
  def update?
    # Users can update themselves (except role)
    return true if user.id == record.id

    # Academy admin can update users they can manage
    return true if user.role_academy_admin? && can_manage_user?(record)

    # Academy owner can update users up to academy_admin
    return true if user.role_academy_owner? && can_manage_user?(record)

    # Super admin can update anyone
    return true if user.role_super_admin?

    false
  end

  # Delete users - admins can delete users they can manage
  def destroy?
    # Users cannot delete themselves
    return false if user.id == record.id

    # Academy admin can delete users they can manage
    return true if user.role_academy_admin? && can_manage_user?(record)

    # Academy owner can delete users up to academy_admin
    return true if user.role_academy_owner? && can_manage_user?(record)

    # Super admin can delete anyone (except themselves, checked above)
    return true if user.role_super_admin?

    false
  end

  # Manage roles - only academy_admin and above
  def manage_roles?
    user.role_academy_admin? || user.role_academy_owner? || user.role_super_admin?
  end

  # Scope for index action - returns users the current user can view
  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.role_super_admin?
        # Super admin can see all users
        scope.all
      elsif user.role_academy_owner?
        # Academy owner can see all users up to academy_admin (excluding super_admin and other academy_owners)
        scope.where(role: %w[player parent staff coach academy_admin])
      elsif user.role_academy_admin?
        # Academy admin can see all users up to coach
        scope.where(role: %w[player parent staff coach])
      elsif user.role_staff? || user.role_coach?
        # Staff and coaches can see all users (for coordination purposes)
        scope.all
      else
        # Players and parents can only see themselves
        scope.where(id: user.id)
      end
    end
  end

  private

  # Check if academy_admin can manage this user
  def can_manage_user?(target_user)
    manageable_roles = if user.role_academy_admin?
                         %w[player parent staff coach]
    elsif user.role_academy_owner?
                         %w[player parent staff coach academy_admin]
    elsif user.role_super_admin?
                         User.roles.keys # All roles
    else
                         []
    end

    manageable_roles.include?(target_user.role)
  end

  # Check if academy_admin can create this user
  def creatable_by_academy_admin?(target_user)
    %w[player parent staff coach].include?(target_user.role)
  end

  # Check if academy owner can create user with the given role
  def creatable_by_academy_owner?(target_user)
    target_user.player? || target_user.parent? || target_user.staff? ||
      target_user.coach? || target_user.academy_admin?
  end
end
