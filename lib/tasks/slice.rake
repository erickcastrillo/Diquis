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

    # Add route namespace to routes.rb
    add_route_namespace(slice_name)

    puts "Generated slice: #{slice_name}"
    puts "Location: #{slice_path}"
    puts "\nTo generate a model in this slice:"
    puts "  rails generate model ModelName --slice=#{slice_name}"
    puts "\nTo generate a factory in this slice:"
    puts "  rails slice:factory[#{slice_name},model_name]"
    puts "\nRoute namespace added: /app/#{slice_name}"
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

  desc "Add a resource route to a slice namespace"
  task :add_resource, [ :slice_name, :resource_name ] => :environment do |task, args|
    slice_name = args[:slice_name]
    resource_name = args[:resource_name]

    if slice_name.blank? || resource_name.blank?
      puts "Usage: rails slice:add_resource[slice_name,resource_name]"
      exit 1
    end

    add_resource_to_slice(slice_name, resource_name)
    puts "Added resource :#{resource_name} to /app/#{slice_name} namespace"
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

  private

  def add_route_namespace(slice_name)
    routes_file = Rails.root.join("config", "routes.rb")
    routes_content = File.read(routes_file)

    # Check if app namespace already exists
    if routes_content.include?("namespace :app do")
      # Find the app namespace and add the new slice namespace inside it
      # Look for the pattern that includes nested namespaces
      app_namespace_pattern = /(namespace :app do\s*\n)((?:.*\n)*?)(\s*end)/m

      if routes_content.match(app_namespace_pattern)
        new_namespace = "    \n    namespace :#{slice_name} do\n      # Add resources here\n      # Example: resources :models\n    end"

        # Insert the new namespace before the closing 'end' of the app namespace
        routes_content.gsub!(app_namespace_pattern) do |match|
          opening = $1
          content = $2
          closing = $3
          "#{opening}#{content}#{new_namespace}\n#{closing}"
        end
      end
    else
      # Create the app namespace with the slice namespace inside
      new_content = <<~RUBY

        namespace :app do
          namespace :#{slice_name} do
            # Add resources here
            # Example: resources :models
          end
        end
      RUBY

      # Find a good place to insert the namespace (after devise_for but before root)
      if routes_content.include?("root ")
        routes_content.gsub!(/(\n\s*# Define your application routes.*?\n)/, "\\1#{new_content}\n")
      else
        # Insert before the final 'end'
        routes_content.gsub!(/(\nend\s*$)/, "#{new_content}\\1")
      end
    end

    File.write(routes_file, routes_content)
  end

  def add_resource_to_slice(slice_name, resource_name)
    routes_file = Rails.root.join("config", "routes.rb")
    routes_content = File.read(routes_file)

    # Find the slice namespace and add the resource
    slice_namespace_pattern = /(namespace :#{slice_name} do\s*\n)((?:.*\n)*?)(\s*end)/m

    if routes_content.match(slice_namespace_pattern)
      routes_content.gsub!(slice_namespace_pattern) do |match|
        opening = $1
        content = $2
        closing = $3

        # Clean up existing content and add the new resource
        lines = content.split("\n")
        clean_lines = lines.reject { |line| line.strip.start_with?("#") || line.strip.empty? }
        clean_lines << "      resources :#{resource_name.pluralize}"

        new_content = clean_lines.join("\n") + "\n"
        "#{opening}#{new_content}#{closing}"
      end
    else
      puts "Error: Slice namespace :#{slice_name} not found in routes.rb"
      return
    end

    File.write(routes_file, routes_content)
  end
end
