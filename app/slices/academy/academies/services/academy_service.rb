# frozen_string_literal: true

module Academy
  # Service for handling business logic related to Academies
  class AcademyService
    def initialize(current_user)
      @current_user = current_user
    end

    def create_academy(params)
      academy = Academy.new(params)
      if academy.save
        { success: true, academy: academy }
      else
        { success: false, errors: academy.errors }
      end
    end

    def update_academy(academy, params)
      if academy.update(params)
        { success: true, academy: academy }
      else
        { success: false, errors: academy.errors }
      end
    end
  end
end
