FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { "password123" }
    password_confirmation { "password123" }

    trait :admin do
      # Add admin attributes based on your user model
      # role { :admin }
    end

    trait :manager do
      # Add manager attributes based on your user model
      # role { :manager }
    end

    trait :member do
      # Add member attributes based on your user model
      # role { :member }
    end
  end
end
