# frozen_string_literal: true

module UserManagement
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user, only: [ :show, :edit, :update, :destroy ]

    def index
      authorize User
      @users = policy_scope(User).order(created_at: :desc)

      render inertia: "UserManagement/Users/Index", props: {
        users: @users.as_json(
          only: [ :id, :email, :first_name, :last_name, :role, :phone, :created_at ],
          methods: [ :full_name ]
        )
      }
    end

    def show
      authorize @user

      render inertia: "UserManagement/Users/Show", props: {
        user: @user.as_json(
          only: [ :id, :email, :first_name, :last_name, :role, :phone, :created_at, :updated_at,
                 :confirmed_at, :locked_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at ],
          methods: [ :full_name ]
        )
      }
    end

    def new
      authorize User

      render inertia: "UserManagement/Users/New", props: {
        roles: User::ROLES
      }
    end

    def create
      @user = User.new(user_params)
      authorize @user

      if @user.save
        redirect_to admin_user_path(@user),
          notice: I18n.t("user_management.users.create.success")
      else
        redirect_to new_admin_user_path,
          inertia: { errors: @user.errors.messages }
      end
    end

    def edit
      authorize @user

      render inertia: "UserManagement/Users/Edit", props: {
        user: @user.as_json(
          only: [ :id, :email, :first_name, :last_name, :role, :phone ],
          methods: [ :full_name ]
        ),
        roles: User::ROLES
      }
    end

    def update
      authorize @user

      if @user.update(user_params)
        redirect_to admin_user_path(@user),
          notice: I18n.t("user_management.users.update.success")
      else
        redirect_to edit_admin_user_path(@user),
          inertia: { errors: @user.errors.messages }
      end
    end

    def destroy
      authorize @user

      if @user.destroy
        redirect_to admin_users_path,
          notice: I18n.t("user_management.users.destroy.success")
      else
        redirect_to admin_users_path,
          alert: I18n.t("user_management.users.destroy.error")
      end
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :role, :phone, :password, :password_confirmation)
    end
  end
end
