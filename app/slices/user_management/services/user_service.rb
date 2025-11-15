# frozen_string_literal: true

module UserManagement
  # Service for handling business logic related to Users
  class UserService
    def initialize(current_user)
      @current_user = current_user
    end

    def create_user(params)
      user = User.new(params)
      # Pundit authorization should be handled in the controller before calling the service
      if user.save
        { success: true, user: user }
      else
        { success: false, errors: user.errors }
      end
    end

    def update_user(user, params)
      # Pundit authorization should be handled in the controller
      if user.update(params)
        { success: true, user: user }
      else
        { success: false, errors: user.errors }
      end
    end
  end
end
