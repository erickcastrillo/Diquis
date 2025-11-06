# frozen_string_literal: true

# OpenTelemetry configuration for Diquis
# Exports traces and metrics to Honeycomb.io via OTLP

require "opentelemetry/sdk"
require "opentelemetry/exporter/otlp"
require "opentelemetry/instrumentation/all"

# Only configure OpenTelemetry if enabled via environment variable
if ENV["OTEL_ENABLED"] == "true"
  OpenTelemetry::SDK.configure do |c|
    # Service name and version
    c.service_name = ENV.fetch("OTEL_SERVICE_NAME", "diquis")
    c.service_version = ENV.fetch("APP_VERSION", "1.0.0")

    # Resource attributes (additional metadata)
    c.resource = OpenTelemetry::SDK::Resources::Resource.create(
      "service.name" => ENV.fetch("OTEL_SERVICE_NAME", "diquis"),
      "service.version" => ENV.fetch("APP_VERSION", "1.0.0"),
      "deployment.environment" => Rails.env.to_s,
      "service.namespace" => ENV.fetch("OTEL_SERVICE_NAMESPACE", "football-academy")
    )

    # Configure OTLP exporter for Honeycomb.io
    # Use explicit HTTP exporter with Honeycomb configuration
    headers = {}
    if ENV["OTEL_EXPORTER_OTLP_HEADERS"].present?
      ENV["OTEL_EXPORTER_OTLP_HEADERS"].split(",").each do |header|
        key, value = header.split("=", 2)
        headers[key.strip] = value.strip if key && value
      end
    elsif ENV["HONEYCOMB_API_KEY"].present?
      headers["x-honeycomb-team"] = ENV["HONEYCOMB_API_KEY"]
      headers["x-honeycomb-dataset"] = ENV.fetch("HONEYCOMB_DATASET", "diquis-#{Rails.env}")
    end

    # Let the exporter use environment variables for endpoint configuration
    # This allows it to properly construct the full path
    exporter = OpenTelemetry::Exporter::OTLP::Exporter.new(
      headers: headers,
      compression: "gzip"
    )

    c.add_span_processor(
      OpenTelemetry::SDK::Trace::Export::BatchSpanProcessor.new(exporter)
    )

    # Auto-instrument all supported libraries
    c.use_all({
      # Rails instrumentation
      "OpenTelemetry::Instrumentation::Rails" => { enabled: true },
      "OpenTelemetry::Instrumentation::ActiveRecord" => { enabled: true },
      "OpenTelemetry::Instrumentation::ActiveJob" => { enabled: true },
      "OpenTelemetry::Instrumentation::ActionView" => { enabled: true },
      "OpenTelemetry::Instrumentation::ActionPack" => { enabled: true },
      "OpenTelemetry::Instrumentation::ActiveSupport" => { enabled: true },

      # HTTP clients
      "OpenTelemetry::Instrumentation::Net::HTTP" => { enabled: true },
      "OpenTelemetry::Instrumentation::Rack" => { enabled: true },

      # Database
      "OpenTelemetry::Instrumentation::PG" => {
        enabled: true,
        db_statement: :obfuscate # Obfuscate SQL queries for security
      },

      # Background jobs
      "OpenTelemetry::Instrumentation::Sidekiq" => { enabled: true },

      # Redis
      "OpenTelemetry::Instrumentation::Redis" => {
        enabled: true,
        db_statement: :obfuscate
      }
    })
  end

  # Log successful initialization
  Rails.logger.info "OpenTelemetry initialized with Honeycomb.io exporter"
  Rails.logger.info "Service: #{ENV.fetch('OTEL_SERVICE_NAME', 'diquis')}"
  Rails.logger.info "Environment: #{Rails.env}"
  Rails.logger.info "Dataset: #{ENV.fetch('HONEYCOMB_DATASET', "diquis-#{Rails.env}")}"
else
  Rails.logger.info "OpenTelemetry is disabled. Set OTEL_ENABLED=true to enable."
end
