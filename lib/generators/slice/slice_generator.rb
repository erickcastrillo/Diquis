class SliceGenerator < Rails::Generators::Base
  source_root File.expand_path("templates", __dir__)

  argument :name, type: :string, required: true
  argument :attribute_pairs, type: :array, default: [], desc: "Model attributes (format: name:type)"

  def generate_slice_structure
    create_directories
    generate_model
    generate_service
    generate_controller
    generate_serializer
    generate_policy
    generate_react_components
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

    # Create frontend directories with module hierarchy
    empty_directory "app/frontend/pages/#{frontend_path}"
  end

  def generate_model
    template "model.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/models/#{model_file_path}.rb"
  end

  def generate_service
    template "service.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/services/#{service_file_path}.rb"
  end

  def generate_controller
    template "controller.rb.erb", "app/slices/#{slice_name}/#{model_name.underscore.pluralize}/controllers/#{controller_file_path}.rb"
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

  def generate_routes
    route "resources :#{model_name.underscore.pluralize}"
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
end
