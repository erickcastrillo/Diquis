# frozen_string_literal: true

module Academy
  class AcademySerializer
    def initialize(academy, policy: nil)
      @academy = academy
      @policy = policy
    end

    def as_json
      return nil unless @academy

      data = {
        id: @academy.id,
        name: @academy.name,
        address: @academy.address,
        phone: @academy.phone,
        email: @academy.email,
        subdomain: @academy.subdomain,
        status: @academy.status,
        created_at: @academy.created_at,
        updated_at: @academy.updated_at
      }

      if @policy
        data[:can_edit] = @policy.update?
        data[:can_delete] = @policy.destroy?
      end

      data
    end
  end
end
