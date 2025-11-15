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
      @academies = Academy.all

      render inertia: "UserManagement/Users/New",
             props: {
               user: serialize_user(@user),
               academies: @academies.as_json(only: %i[id name]),
               available_roles: available_roles_for_creation,
               errors: {}
             }
    end

    # POST /admin/users
    # Creates a new user
    def create
      authorize User
      result = UserService.new(current_user).create_user(user_params)

      if result[:success]
        redirect_to user_management_user_path(result[:user]),
                    notice: t("user_management.users.create.success")
      else
        @user = result[:user] || User.new(user_params)
        @academies = Academy.all
        render inertia: "UserManagement/Users/New",
               props: {
                 user: serialize_user(@user),
                 academies: @academies.as_json(only: %i[id name]),
                 available_roles: available_roles_for_creation,
                 errors: result[:errors].to_hash
               },
               status: :unprocessable_entity
      end
    end

    # GET /admin/users/:id/edit
    # Form for editing a user
    def edit
      authorize @user
      @academies = Academy.all

      render inertia: "UserManagement/Users/Edit",
             props: {
               user: serialize_user(@user),
               academies: @academies.as_json(only: %i[id name]),
               available_roles: available_roles_for_update(@user),
               can_manage_roles: policy(@user).manage_roles?,
               errors: {}
             }
    end

    # PATCH/PUT /admin/users/:id
    # Updates a user
    def update
      authorize @user
      result = UserService.new(current_user).update_user(@user, user_params)

      if result[:success]
        redirect_to user_management_user_path(result[:user]),
                    notice: t("user_management.users.update.success")
      else
        @academies = Academy.all
        render inertia: "UserManagement/Users/Edit",
               props: {
                 user: serialize_user(@user),
                 academies: @academies.as_json(only: %i[id name]),
                 available_roles: available_roles_for_update(@user),
                 can_manage_roles: policy(@user).manage_roles?,
                 errors: result[:errors].to_hash
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
      permitted_params = params.require(:user).permit(
        :email,
        :first_name,
        :last_name,
        :phone,
        :password,
        :password_confirmation,
        :academy_id
      )

      # Securely handle role assignment based on user's policy
      if params[:user][:role].present? && policy(@user || User).manage_roles?
        assignable_roles = if @user.nil? # Create action
          available_roles_for_creation
        else # Update action
          available_roles_for_update(@user)
        end

        if assignable_roles.include?(params[:user][:role])
          permitted_params[:role] = params[:user][:role]
        end
      end

      permitted_params
    end

    def serialize_users(users)
      users.map { |user| UserSerializer.new(user, policy: policy(user)).as_json }
    end

    def serialize_user(user)
      UserSerializer.new(user, policy: policy(user)).as_json
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
