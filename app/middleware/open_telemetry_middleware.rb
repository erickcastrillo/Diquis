# frozen_string_literal: true

# Middleware to add custom attributes to OpenTelemetry spans
# This enriches traces with application-specific context

class OpenTelemetryMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    return @app.call(env) unless otel_enabled?

    request = ActionDispatch::Request.new(env)
    span = OpenTelemetry::Trace.current_span

    # Add custom attributes to the span
    add_request_attributes(span, request)
    add_user_attributes(span, request)
    add_academy_attributes(span, request)

    @app.call(env)
  rescue => e
    # Record exception if it occurs
    span.record_exception(e) if span
    span.status = OpenTelemetry::Trace::Status.error("Request failed: #{e.class}") if span
    raise
  end

  private

  def otel_enabled?
    ENV["OTEL_ENABLED"] == "true"
  end

  def add_request_attributes(span, request)
    span.set_attribute("http.request_id", request.request_id)
    span.set_attribute("http.user_agent", request.user_agent) if request.user_agent
    span.set_attribute("http.remote_ip", request.remote_ip)
    span.set_attribute("http.accept", request.accept) if request.accept
  end

  def add_user_attributes(span, request)
    # Add user context if available (assumes Devise)
    if request.env["warden"]&.user
      user = request.env["warden"].user
      span.set_attribute("user.id", user.id.to_s)
      span.set_attribute("user.email", user.email) if user.respond_to?(:email)
    end
  rescue => e
    Rails.logger.debug("Failed to add user attributes to span: #{e.message}")
  end

  def add_academy_attributes(span, request)
    # Add academy/tenant context if available
    # This assumes you have a current_academy method or similar
    if request.env["academy_id"]
      span.set_attribute("academy.id", request.env["academy_id"].to_s)
    end
  rescue => e
    Rails.logger.debug("Failed to add academy attributes to span: #{e.message}")
  end
end
