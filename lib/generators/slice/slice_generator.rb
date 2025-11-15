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
    template "service.rb.tt", "app/slices/#{slice_name}/#{plural_name}/services/#{service_file_path}.rb"
  end

  def generate_controller
    template "controller.rb.tt", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/controllers/#{controller_file_path}.rb"
  end

  def generate_serializer
    template "serializer.rb.tt", "app/slices/#{slice_name}/#{plural_name}/serializers/#{serializer_file_path}.rb"
  end

  def generate_policy
    template "policy.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/policies/#{policy_file_path}.rb"
  end

  def generate_react_components
    template "Index.tsx.tt", "app/frontend/pages/#{frontend_path}/Index.tsx"
    template "Show.tsx.tt", "app/frontend/pages/#{frontend_path}/Show.tsx"
    template "New.tsx.tt", "app/frontend/pages/#{frontend_path}/New.tsx"
    template "Edit.tsx.tt", "app/frontend/pages/#{frontend_path}/Edit.tsx"
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
    # Form tests can be added here if needed
  end

  def generate_e2e_test
    template "e2e_spec.ts.tt", "e2e/admin/#{plural_name}.spec.ts"
  end

  def generate_routes
    # Route generation logic remains the same

    # ... (existing code)
  end

  private

  def singular_name
    model_name.underscore
  end

  def plural_name
    model_name.underscore.pluralize
  end

  def route_helper
    if module_name
      "#{module_name.underscore}_#{singular_name}"
    else
      singular_name
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
