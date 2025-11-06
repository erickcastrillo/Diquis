# frozen_string_literal: true

# Global User factory - available to all specs
FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { "password123" }
    password_confirmation { "password123" }
    role { :player } # Default role
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    phone { "+1#{Faker::Number.number(digits: 10)}" } # Valid US phone format

    # Skip email confirmation for tests
    after(:build) do |user|
      user.skip_confirmation! if user.respond_to?(:skip_confirmation!)
    end

    # Traits for each role in the hierarchy
    trait :player do
      role { :player }
    end

    trait :parent do
      role { :parent }
    end

    trait :staff do
      role { :staff }
    end

    trait :coach do
      role { :coach }
    end

    trait :academy_admin do
      role { :academy_admin }
    end

    trait :academy_owner do
      role { :academy_owner }
    end

    trait :super_admin do
      role { :super_admin }
    end
  end
end
