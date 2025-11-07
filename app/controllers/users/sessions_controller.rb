# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: :create

  # Render login page with Inertia
  def new
    render inertia: "Auth/Login", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # Handle login submission
  def create
    # Authenticate the user
    self.resource = User.find_by(email: params[:email])

    if resource && resource.valid_password?(params[:password])
      # Check if account is confirmed, active, and not locked
      if resource.active_for_authentication?
        sign_in(resource_name, resource)
        set_flash_message!(:notice, :signed_in)
        redirect_to after_sign_in_path_for(resource)
      else
        # Account is inactive
        redirect_to new_user_session_path,
          inertia: {
            errors: {
              base: [ resource.inactive_message.to_s.humanize ]
            }
          }
      end
    else
      # Invalid credentials
      redirect_to new_user_session_path,
        inertia: {
          errors: {
            base: [ "Invalid email or password" ]
          }
        }
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
