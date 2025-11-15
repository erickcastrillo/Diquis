# frozen_string_literal: true

class Users::UnlocksController < Devise::UnlocksController
  # GET /resource/unlock/new
  def new
    render inertia: "Auth/Unlock", props: {
      errors: flash[:alert] ? { base: [ flash[:alert] ] } : {}
    }
  end

  # POST /resource/unlock
  def create
    self.resource = resource_class.send_unlock_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      set_flash_message!(:notice, :send_instructions)
      redirect_to new_user_session_path
    else
      render inertia: "Auth/Unlock", props: {
        errors: resource.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # GET /resource/unlock?unlock_token=abcdef
  def show
    super
  end

  protected

  # The path used after sending unlock password instructions
  # def after_sending_unlock_instructions_path_for(resource)
  #   super(resource)
  # end

  # The path used after unlocking the resource
  # def after_unlock_path_for(resource)
  #   super(resource)
  # end
end
