# frozen_string_literal: true

module UserManagement
  class UserSerializer
    def initialize(user, policy: nil)
      @user = user
      @policy = policy
    end

    def as_json
      return nil unless @user

      data = {
        id: @user.id,
        email: @user.email,
        first_name: @user.first_name,
        last_name: @user.last_name,
        full_name: @user.full_name,
        phone: @user.phone,
        role: @user.role,
        role_display: @user.display_role,
        academy_id: @user.academy_id,
        created_at: @user.created_at&.iso8601,
        updated_at: @user.updated_at&.iso8601,
        confirmed_at: @user.confirmed_at&.iso8601,
        locked_at: @user.locked_at&.iso8601,
        sign_in_count: @user.sign_in_count,
        current_sign_in_at: @user.current_sign_in_at&.iso8601,
        last_sign_in_at: @user.last_sign_in_at&.iso8601
      }

      if @policy
        data[:can_edit] = @policy.update?
        data[:can_delete] = @policy.destroy?
      end

      data
    end
  end
end
