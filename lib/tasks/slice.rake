# frozen_string_literal: true

namespace :slice do
  desc "Generate a new slice with basic structure"
  task :generate, [ :name ] => :environment do |task, args|
    slice_name = args[:name]

    if slice_name.blank?
      puts "Usage: rails slice:generate[slice_name]"
      exit 1
    end

    slice_path = Rails.root.join("app", "slices", slice_name)

    # Create slice directory structure
    %w[
      controllers
      models
      views
      services
      spec/models
      spec/controllers
      spec/services
      spec/factories
      spec/support
    ].each do |dir|
      FileUtils.mkdir_p(slice_path.join(dir))

      # Add .keep files to ensure directories are tracked
      keep_file = slice_path.join(dir, ".keep")
      File.write(keep_file, "") unless File.exist?(keep_file)
    end

    puts "Generated slice: #{slice_name}"
    puts "Location: #{slice_path}"
    puts "\nTo generate a model in this slice:"
    puts "  rails generate model ModelName --slice=#{slice_name}"
    puts "\nTo generate a factory in this slice:"
    puts "  rails slice:factory[#{slice_name},model_name]"
  end

  desc "Generate a factory in a specific slice"
  task :factory, [ :slice_name, :model_name ] => :environment do |task, args|
    slice_name = args[:slice_name]
    model_name = args[:model_name]

    if slice_name.blank? || model_name.blank?
      puts "Usage: rails slice:factory[slice_name,model_name]"
      exit 1
    end

    factory_dir = Rails.root.join("app", "slices", slice_name, "spec", "factories")
    FileUtils.mkdir_p(factory_dir)

    factory_file = factory_dir.join("#{model_name.pluralize}.rb")

    factory_content = <<~RUBY
      # frozen_string_literal: true

      FactoryBot.define do
        factory :#{model_name.underscore} do
          # Add attributes here
          # Example:
          # name { Faker::Name.name }
          # email { Faker::Internet.email }
        end
      end
    RUBY

    File.write(factory_file, factory_content)
    puts "Generated factory: #{factory_file}"
  end

  desc "List all slices"
  task list: :environment do
    slices_path = Rails.root.join("app", "slices")

    if Dir.exist?(slices_path)
      slices = Dir.entries(slices_path).select { |entry|
        File.directory?(File.join(slices_path, entry)) && entry != "." && entry != ".." && entry != ".keep"
      }

      if slices.any?
        puts "Available slices:"
        slices.each { |slice| puts "  - #{slice}" }
      else
        puts "No slices found."
      end
    else
      puts "No slices directory found."
    end
  end
end
