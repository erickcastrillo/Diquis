class Auth::RegistrationsController < Devise::RegistrationsController
  # Override Devise's registrations controller to work with Inertia.js

  def new
    build_resource
    render inertia: "Auth/Register", props: {
      resource: resource
    }
  end

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
      render inertia: "Auth/Register", props: {
        resource: resource,
        errors: resource.errors.full_messages
      }
    end
  end

  def edit
    render inertia: "Auth/EditProfile", props: {
      resource: resource
    }
  end

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?

    if resource_updated
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?
      redirect_to after_update_path_for(resource)
    else
      clean_up_passwords resource
      render inertia: "Auth/EditProfile", props: {
        resource: resource,
        errors: resource.errors.full_messages
      }
    end
  end

  protected

  def after_update_path_for(resource)
    edit_user_registration_path
  end
end
