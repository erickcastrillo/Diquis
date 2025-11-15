# frozen_string_literal: true


# Academy Model
# This model represents academies in the academy domain.
# Namespaced to avoid conflict with the Academy module.
module Academies
  class Academy < ApplicationRecord
    # Set this model as the tenant for the application.
    # acts_as_tenant(:academy) # Removed: should not be used on the tenant model itself


    # Callbacks
    before_validation :downcase_email
    before_validation :downcase_subdomain

    # Validations
    validates :name, presence: true
    validates :email, presence: true, uniqueness: { case_sensitive: false }
    validates :subdomain, presence: true, uniqueness: { case_sensitive: false },
                          format: { with: /\A[a-z0-9]+(-[a-z0-9]+)*\z/, message: "can only contain lowercase letters, numbers, and hyphens" }
    validates :status, presence: true

    # Scopes
    scope :active, -> { where(status: "active") }
    scope :inactive, -> { where(status: "inactive") }

    has_many :users

    # Instance Methods
    def display_name
      name
    end

    private

    def downcase_email
      self.email = email.downcase if email.present?
    end

    def downcase_subdomain
      self.subdomain = subdomain.downcase if subdomain.present?
    end
  end
end
