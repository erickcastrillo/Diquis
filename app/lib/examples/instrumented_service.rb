# frozen_string_literal: true

# Example service demonstrating OpenTelemetry instrumentation
# This shows best practices for adding custom tracing to your services

module Examples
  class InstrumentedService
    include OpenTelemetryHelper

    # Example 1: Manual span creation
    def process_with_manual_span(data)
      trace_span("InstrumentedService#process_with_manual_span") do
        # Add attributes to provide context
        trace_attribute("data.size", data.size)
        trace_attribute("data.type", data.class.name)

        # Simulate processing
        result = perform_complex_operation(data)

        # Record significant events
        trace_event("processing.completed", attributes: {
          "result.success" => result[:success],
          "items.processed" => result[:count]
        })

        result
      end
    rescue => e
      # Always record exceptions for debugging
      trace_exception(e)
      raise
    end

    # Example 2: Automatic method tracing
    def process_automatically_traced(data)
      # Method implementation
      validate_data(data)
      transform_data(data)
      save_results(data)
    end

    # Automatically instrument this method
    trace_method :process_automatically_traced

    # Example 3: Nested spans for complex operations
    def complex_workflow(params)
      trace_span("InstrumentedService#complex_workflow") do
        trace_attribute("workflow.type", params[:type])

        # Step 1: Validation (creates a child span)
        validated_params = trace_span("validate_params") do
          trace_attribute("validation.rules", "strict")
          validate_params(params)
        end

        # Step 2: Processing (creates another child span)
        processed_data = trace_span("process_data") do
          trace_attribute("processor.version", "2.0")
          process_data(validated_params)
        end

        # Step 3: Storage (creates another child span)
        trace_span("save_to_database") do
          trace_attribute("database.table", "results")
          save_to_database(processed_data)
        end

        trace_event("workflow.completed")
        processed_data
      end
    end

    # Example 4: Background job instrumentation
    class ExampleJob
      include Sidekiq::Job
      include OpenTelemetryHelper

      def perform(user_id, action)
        trace_span("ExampleJob#perform") do
          trace_attribute("user.id", user_id)
          trace_attribute("job.action", action)

          user = User.find(user_id)

          case action
          when "send_email"
            trace_span("send_email") do
              send_notification_email(user)
            end
          when "update_stats"
            trace_span("update_statistics") do
              update_user_statistics(user)
            end
          end

          trace_event("job.completed", attributes: {
            "job.duration_ms" => (Time.current - job_started_at) * 1000
          })
        end
      end

      private

      def send_notification_email(user)
        # Email sending logic
        trace_attribute("email.recipient", user.email)
      end

      def update_user_statistics(user)
        # Statistics update logic
        trace_attribute("stats.updated_fields", user.changed.join(","))
      end

      def job_started_at
        @job_started_at ||= Time.current
      end
    end

    private

    def perform_complex_operation(data)
      # Simulated complex operation
      sleep(0.1) # Simulate work
      { success: true, count: data.size }
    end

    def validate_data(data)
      # Validation logic
    end

    def transform_data(data)
      # Transformation logic
    end

    def save_results(data)
      # Save logic
    end

    def validate_params(params)
      # Validation logic
      params
    end

    def process_data(params)
      # Processing logic
      params
    end

    def save_to_database(data)
      # Database save logic
      data
    end
  end
end
