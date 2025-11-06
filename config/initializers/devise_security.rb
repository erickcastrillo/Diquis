# frozen_string_literal: true

# Devise Security Configuration
# This file contains security-related configuration for Devise authentication

# Configure strong password requirements
Devise.setup do |config|
  # Require at least 12 characters for passwords
  config.password_length = 12..128

  # Add custom password validation
  # This will be used in the User model
end

# Password strength validator
class StrongPasswordValidator < ActiveModel::EachValidator
  SPECIAL_CHARS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.freeze
  UPPERCASE = /[A-Z]/.freeze
  LOWERCASE = /[a-z]/.freeze
  DIGIT = /\d/.freeze

  def validate_each(record, attribute, value)
    return if value.blank?

    unless value.match?(UPPERCASE)
      record.errors.add(attribute, :weak_password, message: "must contain at least one uppercase letter")
    end

    unless value.match?(LOWERCASE)
      record.errors.add(attribute, :weak_password, message: "must contain at least one lowercase letter")
    end

    unless value.match?(DIGIT)
      record.errors.add(attribute, :weak_password, message: "must contain at least one digit")
    end

    unless value.match?(SPECIAL_CHARS)
      record.errors.add(attribute, :weak_password, message: "must contain at least one special character (!@#$%^&*...)")
    end

    # Check for common passwords
    if weak_password?(value)
      record.errors.add(attribute, :weak_password, message: "is too common. Please choose a stronger password")
    end
  end

  private

  def weak_password?(password)
    # List of common weak passwords and patterns
    common_passwords = %w[
      password password123 123456 12345678 qwerty admin letmein
      welcome monkey dragon master sunshine princess football
      iloveyou trustno1 000000 starwars dragon123
    ]

    # Check for exact match or if password contains common weak patterns
    lower_pass = password.downcase
    common_passwords.any? do |common|
      lower_pass == common || lower_pass.include?(common)
    end
  end
end
