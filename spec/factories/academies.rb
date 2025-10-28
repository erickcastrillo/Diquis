FactoryBot.define do
  factory :academy do
    name { Faker::Company.name }
    slug { Faker::Internet.unique.slug }
    description { Faker::Lorem.paragraph }

    # Add any other academy attributes based on your model
    # created_at and updated_at will be automatically handled
  end
end
