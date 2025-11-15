# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  def new
    render inertia: "Auth/ForgotPassword", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      set_flash_message!(:notice, :send_instructions)
      redirect_to new_user_session_path
    else
      render inertia: "Auth/ForgotPassword", props: {
        errors: resource.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    self.resource = resource_class.new
    resource.reset_password_token = params[:reset_password_token]

    render inertia: "Auth/ResetPassword", props: {
      reset_password_token: params[:reset_password_token],
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      set_flash_message!(:notice, flash_message)
      resource.after_database_authentication
      sign_in(resource_name, resource)
      redirect_to after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      render inertia: "Auth/ResetPassword", props: {
        reset_password_token: params[:user][:reset_password_token],
        errors: resource.errors.messages
      }, status: :unprocessable_entity
    end
  end

  protected

  def after_resetting_password_path_for(resource)
    "/app/dashboard"
  end

  # The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
    new_user_session_path
  end
end
