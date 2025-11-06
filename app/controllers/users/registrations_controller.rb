# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [ :create ]

  # GET /resource/sign_up
  def new
    build_resource
    render inertia: "Auth/Register", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        redirect_to after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      redirect_to new_user_registration_path,
        inertia: { errors: resource.errors.messages }
    end
  end

  # GET /resource/edit
  def edit
    render inertia: "Auth/EditProfile", props: {
      user: resource.as_json(only: [ :id, :email, :first_name, :last_name ])
    }
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :role ])
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    "/app/dashboard"
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    new_user_session_path
  end
end
