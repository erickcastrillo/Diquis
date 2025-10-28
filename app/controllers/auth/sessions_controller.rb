class Auth::SessionsController < Devise::SessionsController
  # Override Devise's sessions controller to work with Inertia.js

  def new
    render inertia: "Auth/Login"
  end

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?

    # Redirect using Inertia instead of regular redirect
    redirect_to after_sign_in_path_for(resource)
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?

    # Redirect using Inertia instead of regular redirect
    redirect_to after_sign_out_path_for(resource_name)
  end

  private

  def auth_options
    { scope: resource_name, recall: "#{controller_path}#new" }
  end
end
