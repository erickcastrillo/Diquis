# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # Render login page with Inertia
  def new
    render inertia: "Auth/Login", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      redirect_to after_sign_in_path_for(resource)
    else
      render inertia: "Auth/Login", props: {
        errors: { base: [t('devise.failure.invalid', authentication_keys: 'Email')] }
      }, status: :unprocessable_entity
    end
  end

  # Handle logout
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?

    redirect_to new_user_session_path
  end

  protected

  # The path used after sign in
  def after_sign_in_path_for(resource)
    stored_location_for(resource) || "/app/dashboard"
  end
end
