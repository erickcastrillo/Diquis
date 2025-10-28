class SliceGenerator < Rails::Generators::Base
  source_root File.expand_path("templates", __dir__)

  argument :name, type: :string, required: true
  argument :attribute_pairs, type: :array, default: [], desc: "Model attributes (format: name:type)"

  class_option :skip_academy, type: :boolean, default: false, desc: "Skip Academy references (useful for creating Academy itself)"

  def generate_slice_structure
    create_directories
    generate_migration
    generate_model
    generate_service
    generate_controller
    generate_serializer
    generate_policy
    generate_react_components
    generate_tests
    generate_routes
  end

  private

  def create_directories
    # Create model-specific directory structure within the slice
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/controllers"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/services"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/models"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/serializers"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/policies"
    empty_directory "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/specs"

    # Create frontend directories with module hierarchy
    empty_directory "app/frontend/pages/#{frontend_path}"
    empty_directory "app/frontend/pages/#{frontend_path}/__tests__"
  end

  def generate_migration
    # Generate migration using Rails' built-in migration generator
    migration_attributes = attributes.map { |attr| "#{attr[:name]}:#{attr[:type]}" }.join(" ")

    # Create table name based on module structure
    table_name = if module_name
      "#{module_name.underscore.gsub('/', '_')}_#{model_name.underscore.pluralize}"
    else
      model_name.underscore.pluralize
    end

    migration_name = "Create#{table_name.camelize}"

    # Add standard fields
    standard_fields = "slug:string:uniq:index"
    standard_fields = "academy:references #{standard_fields}" unless skip_academy?

    generate "migration", "#{migration_name} #{migration_attributes} #{standard_fields}"
  end

  def generate_model
    template "model.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/models/#{model_file_path}.rb"
  end

  def generate_service
    template "service.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/services/#{service_file_path}.rb"
  end

  def generate_controller
    # Create controller in slice structure for organization
    slice_controller_path = "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/controllers/#{controller_file_path}.rb"
    template "controller.rb.erb", slice_controller_path

    # Also create controller in standard Rails location for routing
    if module_name
      empty_directory "app/controllers/#{module_name.underscore}"
      rails_controller_path = "app/controllers/#{module_name.underscore}/#{controller_file_path}.rb"
    else
      rails_controller_path = "app/controllers/#{controller_file_path}.rb"
    end

    # Only copy if not in pretend mode
    unless options[:pretend]
      create_file rails_controller_path, File.read(slice_controller_path)
    else
      create_file rails_controller_path, "# Controller will be copied from slice"
    end
  end

  def generate_serializer
    template "serializer.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/serializers/#{serializer_file_path}.rb"
  end

  def generate_policy
    template "policy.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/policies/#{policy_file_path}.rb"
  end

  def generate_react_components
    template "Index.tsx.erb", "app/frontend/pages/#{frontend_path}/Index.tsx"
    template "Show.tsx.erb", "app/frontend/pages/#{frontend_path}/Show.tsx"
    template "Form.tsx.erb", "app/frontend/pages/#{frontend_path}/Form.tsx"
    template "types.ts.erb", "app/frontend/pages/#{frontend_path}/types.ts"
  end

  def generate_tests
    # Backend RSpec tests - now co-located within the slice
    template "model_spec.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/specs/#{model_name.underscore}_spec.rb"
    template "service_spec.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/specs/#{model_name.underscore}_service_spec.rb"
    template "controller_spec.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/specs/#{model_name.underscore.pluralize}_controller_spec.rb"
    template "policy_spec.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/specs/#{model_name.underscore}_policy_spec.rb"

    # Frontend Vitest tests
    template "Index.test.tsx.erb", "app/frontend/pages/#{frontend_path}/__tests__/Index.test.tsx"
    template "Show.test.tsx.erb", "app/frontend/pages/#{frontend_path}/__tests__/Show.test.tsx"
    template "Form.test.tsx.erb", "app/frontend/pages/#{frontend_path}/__tests__/Form.test.tsx"
  end

  def generate_routes
    if module_name
      # Use lowercase namespace for routes (Rails convention)
      namespace_name = module_name.split("::").first.underscore
      namespace_route = "namespace :#{namespace_name} do"
      routes_content = File.read("config/routes.rb")

      if routes_content.include?(namespace_route)
        # Add resource to existing namespace
        inject_into_file "config/routes.rb", after: namespace_route do
          "\n    resources :#{model_name.underscore.pluralize}"
        end
      else
        # Create new namespace
        route_content = <<~ROUTE
          namespace :#{namespace_name} do
            resources :#{model_name.underscore.pluralize}
          end
        ROUTE
        route route_content
      end
    else
      route "resources :#{model_name.underscore.pluralize}"
    end
  end

  def attributes
    @attributes ||= attribute_pairs.map do |attr|
      name, type = attr.split(":")
      { name: name, type: type || "string" }
    end
  end

  # Parse the name argument to extract module and model components
  def parse_name
    @parsed_name ||= if name.include?("::")
      parts = name.split("::")
      {
        module_name: parts[0..-2].join("::"),
        model_name: parts.last,
        slice_name: parts[0].underscore
      }
    else
      {
        module_name: nil,
        model_name: name,
        slice_name: name.underscore
      }
    end
  end

  def module_name
    parse_name[:module_name]
  end

  def model_name
    parse_name[:model_name]
  end

  def slice_name
    parse_name[:slice_name]
  end

  def full_model_name
    if module_name
      "#{module_name}::#{model_name.camelize}"
    else
      model_name.camelize
    end
  end

  def model_file_path
    model_name.underscore
  end

  def service_file_path
    "#{model_name.underscore}_service"
  end

  def controller_file_path
    "#{model_name.underscore.pluralize}_controller"
  end

  def serializer_file_path
    "#{model_name.underscore}_serializer"
  end

  def policy_file_path
    "#{model_name.underscore}_policy"
  end

  def module_path
    module_name ? module_name.split("::").map(&:underscore).join("/") : ""
  end

  def frontend_path
    if module_name
      "#{module_name.split("::").join("/")}/#{model_name.camelize.pluralize}"
    else
      model_name.camelize.pluralize
    end
  end

  def skip_academy?
    options[:skip_academy]
  end
end
