# frozen_string_literal: true

# OpenTelemetry helper module for custom instrumentation
# Usage:
#   class MyService
#     include OpenTelemetryHelper
#
#     def perform
#       trace_span("MyService#perform") do
#         # Your code here
#       end
#     end
#   end

module OpenTelemetryHelper
  extend ActiveSupport::Concern

  # Get the current tracer
  def tracer
    @tracer ||= OpenTelemetry.tracer_provider.tracer(
      self.class.name,
      ENV.fetch("APP_VERSION", "1.0.0")
    )
  end

  # Create a span for tracing
  # @param span_name [String] Name of the span
  # @param attributes [Hash] Additional attributes to add to the span
  # @yield Block to execute within the span
  def trace_span(span_name, attributes: {}, &block)
    return yield unless otel_enabled?

    tracer.in_span(span_name, attributes: attributes, &block)
  end

  # Add an event to the current span
  # @param event_name [String] Name of the event
  # @param attributes [Hash] Event attributes
  def trace_event(event_name, attributes: {})
    return unless otel_enabled?

    current_span = OpenTelemetry::Trace.current_span
    current_span.add_event(event_name, attributes: attributes)
  end

  # Set an attribute on the current span
  # @param key [String] Attribute key
  # @param value [String, Integer, Boolean, Array] Attribute value
  def trace_attribute(key, value)
    return unless otel_enabled?

    current_span = OpenTelemetry::Trace.current_span
    current_span.set_attribute(key, value)
  end

  # Record an exception in the current span
  # @param exception [Exception] The exception to record
  def trace_exception(exception)
    return unless otel_enabled?

    current_span = OpenTelemetry::Trace.current_span
    current_span.record_exception(exception)
    current_span.status = OpenTelemetry::Trace::Status.error("Exception: #{exception.class}")
  end

  # Check if OpenTelemetry is enabled
  def otel_enabled?
    ENV["OTEL_ENABLED"] == "true"
  end

  class_methods do
    # Wrap a method with automatic tracing
    # @param method_name [Symbol] Name of the method to trace
    # @param span_name [String] Optional custom span name
    # @param attributes [Proc, Hash] Optional attributes to add to the span
    #   - If a Proc, it will be called with the method arguments to generate dynamic attributes
    #   - If a Hash, it will be used directly as static attributes
    def trace_method(method_name, span_name: nil, attributes: nil)
      original_method = instance_method(method_name)
      span_name ||= "#{name}##{method_name}"

      define_method(method_name) do |*args, **kwargs, &block|
        # Build the attributes hash
        span_attributes = { "method.name" => method_name.to_s }

        # Add custom attributes if provided
        if attributes.is_a?(Proc)
          # Call the proc with method arguments to generate dynamic attributes
          custom_attrs = instance_exec(*args, **kwargs, &attributes)
          span_attributes.merge!(custom_attrs) if custom_attrs.is_a?(Hash)
        elsif attributes.is_a?(Hash)
          # Use static attributes directly
          span_attributes.merge!(attributes)
        end

        trace_span(span_name, attributes: span_attributes) do
          original_method.bind(self).call(*args, **kwargs, &block)
        end
      end
    end
  end
end
