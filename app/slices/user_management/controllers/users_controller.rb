# frozen_string_literal: true

module UserManagement
  # Controller for managing users (CRUD operations)
  # Requires authentication and proper authorization based on user roles
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user, only: %i[show edit update destroy]

    # GET /admin/users
    # Lists all users the current user is authorized to see
    def index
      authorize User
      @users = policy_scope(User).order(created_at: :desc)

      render inertia: "UserManagement/Users/Index",
             props: {
               users: serialize_users(@users),
               current_user_role: current_user.role,
               can_create: policy(User).create?,
               can_view: policy(User).index?
             }
    end

    # GET /admin/users/:id
    # Shows a specific user's details
    def show
      authorize @user

      render inertia: "UserManagement/Users/Show",
             props: {
               user: serialize_user(@user),
               can_edit: policy(@user).update?,
               can_delete: policy(@user).destroy?,
               can_manage_roles: policy(@user).manage_roles?
             }
    end

    # GET /admin/users/new
    # Form for creating a new user
    def new
      @user = User.new
      authorize @user

      render inertia: "UserManagement/Users/New",
             props: {
               user: serialize_user(@user),
               available_roles: available_roles_for_creation,
               errors: {}
             }
    end

    # POST /admin/users
    # Creates a new user
    def create
      @user = User.new(user_params)
      authorize @user

      if @user.save
        redirect_to user_management_user_path(@user),
                    notice: t("user_management.users.create.success")
      else
        render inertia: "UserManagement/Users/New",
               props: {
                 user: serialize_user(@user),
                 available_roles: available_roles_for_creation,
                 errors: @user.errors.to_hash
               },
               status: :unprocessable_entity
      end
    end

    # GET /admin/users/:id/edit
    # Form for editing a user
    def edit
      authorize @user

      render inertia: "UserManagement/Users/Edit",
             props: {
               user: serialize_user(@user),
               available_roles: available_roles_for_update(@user),
               can_manage_roles: policy(@user).manage_roles?,
               errors: {}
             }
    end

    # PATCH/PUT /admin/users/:id
    # Updates a user
    def update
      authorize @user

      if @user.update(user_params)
        redirect_to user_management_user_path(@user),
                    notice: t("user_management.users.update.success")
      else
        render inertia: "UserManagement/Users/Edit",
               props: {
                 user: serialize_user(@user),
                 available_roles: available_roles_for_update(@user),
                 can_manage_roles: policy(@user).manage_roles?,
                 errors: @user.errors.to_hash
               },
               status: :unprocessable_entity
      end
    end

    # DELETE /admin/users/:id
    # Deletes a user
    def destroy
      authorize @user

      if @user.destroy
        redirect_to user_management_users_path,
                    notice: t("user_management.users.destroy.success")
      else
        redirect_to user_management_user_path(@user),
                    alert: t("user_management.users.destroy.error")
      end
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      # Base parameters available to all users
      permitted_params = params.permit(
        :email,
        :first_name,
        :last_name,
        :phone,
        :password,
        :password_confirmation
      )

      # Only users with manage_roles permission can update roles
      # brakeman:ignore:PermitAttributes - Role assignment is protected by Pundit policy authorization
      if policy(@user || User).manage_roles?
        permitted_params.merge!(params.permit(:role))
      end

      permitted_params
    end

    def serialize_users(users)
      users.map { |user| serialize_user(user) }
    end

    def serialize_user(user)
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        full_name: user.full_name,
        phone: user.phone,
        role: user.role,
        role_display: user.display_role,
        created_at: user.created_at&.iso8601,
        updated_at: user.updated_at&.iso8601,
        confirmed_at: user.confirmed_at&.iso8601,
        locked_at: user.locked_at&.iso8601,
        sign_in_count: user.sign_in_count,
        current_sign_in_at: user.current_sign_in_at&.iso8601,
        last_sign_in_at: user.last_sign_in_at&.iso8601,
        can_edit: policy(user).update?,
        can_delete: policy(user).destroy?
      }
    end

    def available_roles_for_creation
      return [] unless policy(User).create?

      User.roles.keys.select do |role|
        test_user = User.new(role: role)
        policy(test_user).create?
      end
    end

    def available_roles_for_update(user)
      return [] unless policy(user).manage_roles?

      User.roles.keys.select do |role|
        # Don't allow changing to a role the current user can't manage
        test_user = User.new(role: role)
        policy(test_user).update?
      end
    end
  end
end
