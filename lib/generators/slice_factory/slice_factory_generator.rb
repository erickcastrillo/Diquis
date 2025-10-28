# frozen_string_literal: true

class SliceFactoryGenerator < Rails::Generators::NamedBase
  desc "Generate a factory in the appropriate slice directory"

  argument :slice_name, type: :string, default: nil, banner: "slice_name"

  def create_factory_file
    if slice_name.present?
      # Generate in slice directory
      factory_dir = Rails.root.join("app", "slices", slice_name, "spec", "factories")
      factory_file = factory_dir.join("#{file_name.pluralize}.rb")
    else
      # Generate in traditional spec/factories directory
      factory_dir = Rails.root.join("spec", "factories")
      factory_file = factory_dir.join("#{file_name.pluralize}.rb")
    end

    # Create directory if it doesn't exist
    FileUtils.mkdir_p(factory_dir)

    # Generate factory content
    create_file factory_file, factory_content
  end

  private

  def factory_content
    <<~RUBY
      # frozen_string_literal: true

      FactoryBot.define do
        factory :#{file_name} do
          # Add attributes here
          # Example:
          # name { Faker::Name.name }
          # email { Faker::Internet.email }
        end
      end
    RUBY
  end
end
