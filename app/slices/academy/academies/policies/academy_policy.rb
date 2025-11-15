# frozen_string_literal: true

# AcademyPolicy
#
# Authorization rules for academies using Pundit.
# Defines who can perform which actions on academies.
#
# This policy operates without academy scoping as it's a foundation model.
#
module Academy
  class AcademyPolicy < ApplicationPolicy
    def index?
      user.super_admin?
    end

    def show?
      user.super_admin?
    end

    def create?
      user.super_admin?
    end

    def update?
      user.super_admin?
    end

    def destroy?
      user.super_admin?
    end

    def permitted_attributes
      %i[name address phone email subdomain status]
    end

    class Scope < ApplicationPolicy::Scope
      def resolve
        if user.super_admin?
          scope.all
        else
          scope.none
        end
      end
    end
  end
end
