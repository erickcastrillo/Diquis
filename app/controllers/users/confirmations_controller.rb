# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  def new
    render inertia: "Auth/Confirmation", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # POST /resource/confirmation
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      set_flash_message!(:notice, :send_instructions)
      redirect_to new_user_session_path
    else
      render inertia: "Auth/Confirmation", props: {
        errors: resource.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    super
  end

  protected

  # The path used after resending confirmation instructions.
  def after_resending_confirmation_instructions_path_for(resource_name)
    new_user_session_path
  end

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    "/app/dashboard"
  end
end
