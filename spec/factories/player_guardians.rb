# frozen_string_literal: true

FactoryBot.define do
  factory :player_guardian do
    # Associations
    association :player, factory: [ :user, :player ]
    association :guardian, factory: [ :user, :parent ]

    # Attributes
    relationship_type { 'mother' }
    status { :pending }
    invited_at { Time.current }
    notes { nil }

    # Traits for different relationship types
    trait :mother do
      relationship_type { 'mother' }
    end

    trait :father do
      relationship_type { 'father' }
    end

    trait :legal_guardian do
      relationship_type { 'legal_guardian' }
    end

    trait :stepmother do
      relationship_type { 'stepmother' }
    end

    trait :stepfather do
      relationship_type { 'stepfather' }
    end

    trait :grandparent do
      relationship_type { 'grandparent' }
    end

    trait :other do
      relationship_type { 'other' }
      notes { 'Family friend' }
    end

    # Traits for different statuses
    trait :pending do
      status { :pending }
      invited_at { Time.current }
      accepted_at { nil }
    end

    trait :accepted do
      status { :accepted }
      invited_at { 1.week.ago }
      accepted_at { 1.day.ago }
    end

    trait :declined do
      status { :declined }
      invited_at { 1.week.ago }
      accepted_at { nil }
    end

    trait :revoked do
      status { :revoked }
      invited_at { 1.month.ago }
      accepted_at { 3.weeks.ago }
    end

    # Combined traits for common scenarios
    trait :active do
      accepted
      relationship_type { 'mother' }
    end

    trait :with_notes do
      notes { Faker::Lorem.sentence }
    end
  end
end
