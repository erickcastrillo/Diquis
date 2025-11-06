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
    user.staff? || user.coach? || user.academy_admin? || user.academy_owner? || user.super_admin?
  end

  # View user details
  def show?
    # Users can view their own profile
    return true if user.id == record.id

    # Staff and coaches can view all users
    return true if user.staff? || user.coach?

    # Academy admins can view users in their scope
    return true if user.academy_admin? && can_manage_user?(record)

    # Academy owners can view users in their scope
    return true if user.academy_owner? && can_manage_user?(record)

    # Super admins can view all users
    return true if user.super_admin?

    false
  end

  # Create new users
  def create?
    # Academy admins can create players, parents, staff, coaches
    return true if user.academy_admin? && creatable_by_academy_admin?(record)

    # Academy owners can create players, parents, staff, coaches, academy_admins
    return true if user.academy_owner? && creatable_by_academy_owner?(record)

    # Super admins can create anyone
    return true if user.super_admin?

    false
  end

  # Update existing users
  def update?
    # Users can update their own profile
    return true if user.id == record.id

    # Academy admins can update users they can manage
    return true if user.academy_admin? && can_manage_user?(record)

    # Academy owners can update users they can manage
    return true if user.academy_owner? && can_manage_user?(record)

    # Super admins can update anyone
    return true if user.super_admin?

    false
  end

  # Delete users
  def destroy?
    # Users cannot delete themselves
    return false if user.id == record.id

    # Academy admins can delete users they can manage
    return true if user.academy_admin? && can_manage_user?(record)

    # Academy owners can delete users they can manage
    return true if user.academy_owner? && can_manage_user?(record)

    # Super admins can delete anyone
    return true if user.super_admin?

    false
  end

  # Manage user roles - only admins and above
  def manage_roles?
    user.academy_admin? || user.academy_owner? || user.super_admin?
  end

  # Scope for index action - returns users the current user can view
  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.super_admin?
        # Super admins see all users
        scope.all
      elsif user.academy_owner?
        # Academy owners see users up to academy_admin role in their academy
        # TODO: Filter by academy when academy association is implemented
        scope.where(role: [ 0, 1, 2, 3, 4 ]) # player through academy_admin
      elsif user.academy_admin?
        # Academy admins see users up to coach role in their academy
        # TODO: Filter by academy when academy association is implemented
        scope.where(role: [ 0, 1, 2, 3 ]) # player through coach
      elsif user.staff? || user.coach?
        # Staff and coaches see all users (read-only)
        # TODO: Filter by academy when academy association is implemented
        scope.all
      else
        # Players and parents only see themselves
        scope.where(id: user.id)
      end
    end
  end

  private

  # Check if the current user can manage the target user based on role hierarchy
  def can_manage_user?(target_user)
    return false if user.id == target_user.id # Can't manage yourself

    if user.academy_admin?
      # Academy admins can manage players, parents, staff, coaches
      target_user.player? || target_user.parent? || target_user.staff? || target_user.coach?
    elsif user.academy_owner?
      # Academy owners can manage players, parents, staff, coaches, academy_admins
      target_user.player? || target_user.parent? || target_user.staff? ||
        target_user.coach? || target_user.academy_admin?
    else
      false
    end
  end

  # Check if academy admin can create user with the given role
  def creatable_by_academy_admin?(target_user)
    target_user.player? || target_user.parent? || target_user.staff? || target_user.coach?
  end

  # Check if academy owner can create user with the given role
  def creatable_by_academy_owner?(target_user)
    target_user.player? || target_user.parent? || target_user.staff? ||
      target_user.coach? || target_user.academy_admin?
  end
end
