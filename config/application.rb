require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Diquis
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Internationalization (i18n) configuration
    config.i18n.available_locales = [ :en, :es ]
    config.i18n.default_locale = :en
    config.i18n.fallbacks = true

    # Add slice directories to autoload paths
    config.autoload_paths += Dir.glob("#{Rails.root}/app/slices/*/")
    config.eager_load_paths += Dir.glob("#{Rails.root}/app/slices/*/") if Rails.env.production?

    # Configure generators for slice-based architecture
    config.generators do |g|
      # Generate specs in slice directories instead of central spec folder
      g.test_framework :rspec,
        fixtures: false,
        view_specs: false,
        helper_specs: false,
        routing_specs: false,
        controller_specs: false,
        request_specs: true

      # Configure Factory Bot to generate factories in slice directories
      g.factory_bot dir: "spec/factories"

      # This will be overridden by slice-specific configuration when needed
    end
  end
end
