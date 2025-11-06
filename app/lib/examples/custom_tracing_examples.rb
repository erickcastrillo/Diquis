# frozen_string_literal: true

# Examples of custom OpenTelemetry tracing in the Diquis application
# These examples show how to track business-specific metrics and properties

module Examples
  # Example 1: Track user registration with custom properties
  class UserRegistrationService
    include OpenTelemetryHelper

    def register(email:, academy_id:, role:)
      trace_span("UserRegistration.register") do
        # Track input parameters
        trace_attribute("user.email_domain", email.split("@").last)
        trace_attribute("user.role", role)
        trace_attribute("academy.id", academy_id)

        academy = Academy.find(academy_id)
        trace_attribute("academy.name", academy.name)
        trace_attribute("academy.plan", academy.subscription_plan)

        user = User.create!(email: email, academy: academy, role: role)

        # Track success metrics
        trace_attribute("user.id", user.id)
        trace_attribute("registration.success", true)
        trace_event("user.registered", {
          "user_id" => user.id,
          "academy_id" => academy_id
        })

        user
      rescue ActiveRecord::RecordInvalid => e
        trace_attribute("registration.success", false)
        trace_attribute("validation_errors", e.record.errors.full_messages.join(", "))
        trace_exception(e)
        raise
      end
    end
  end

  # Example 2: Track player performance calculation
  class PlayerStatsService
    include OpenTelemetryHelper

    def calculate_season_stats(player_id, season)
      trace_span("PlayerStats.calculate_season") do
        trace_attribute("player.id", player_id)
        trace_attribute("season.year", season)

        player = Player.find(player_id)
        trace_attribute("player.name", player.full_name)
        trace_attribute("player.position", player.position)

        # Nested span for database queries
        stats = trace_span("fetch_player_stats") do
          matches = player.matches.where(season: season)
          trace_attribute("matches.count", matches.count)

          {
            goals: matches.sum(:goals),
            assists: matches.sum(:assists),
            minutes_played: matches.sum(:minutes_played)
          }
        end

        # Track calculated metrics
        trace_attribute("stats.goals", stats[:goals])
        trace_attribute("stats.assists", stats[:assists])
        trace_attribute("stats.minutes", stats[:minutes_played])

        # Calculate average
        average_rating = (stats[:goals] + stats[:assists]) / stats[:matches].to_f
        trace_attribute("stats.average_rating", average_rating.round(2))

        trace_event("stats.calculated")
        stats
      end
    end
  end

  # Example 3: Track payment processing with detailed attributes
  class PaymentProcessor
    include OpenTelemetryHelper

    def process_subscription_payment(academy_id, plan, amount)
      trace_span("Payment.process_subscription") do
        trace_attribute("academy.id", academy_id)
        trace_attribute("payment.plan", plan)
        trace_attribute("payment.amount", amount)
        trace_attribute("payment.currency", "USD")
        trace_attribute("payment.processor", "stripe")

        academy = Academy.find(academy_id)
        trace_attribute("academy.current_plan", academy.subscription_plan)
        trace_attribute("payment.is_upgrade", plan_upgrade?(academy.subscription_plan, plan))

        # Track the payment attempt
        trace_event("payment.initiated")

        result = charge_stripe(academy.stripe_customer_id, amount)

        # Track success/failure
        trace_attribute("payment.success", result.paid?)
        trace_attribute("payment.transaction_id", result.id)

        if result.paid?
          trace_attribute("payment.status", "completed")
          trace_event("payment.succeeded")

          # Update subscription
          academy.update!(subscription_plan: plan)
          trace_event("subscription.updated")
        else
          trace_attribute("payment.status", "failed")
          trace_attribute("payment.failure_code", result.failure_code)
          trace_attribute("payment.failure_message", result.failure_message)
          trace_event("payment.failed")
        end

        result
      rescue Stripe::CardError => e
        trace_attribute("payment.error_type", "card_error")
        trace_attribute("payment.error_code", e.code)
        trace_exception(e)
        raise
      rescue => e
        trace_attribute("payment.error_type", "unknown")
        trace_exception(e)
        raise
      end
    end

    private

    def plan_upgrade?(current_plan, new_plan)
      plans = [ "free", "basic", "premium", "enterprise" ]
      plans.index(new_plan) > plans.index(current_plan)
    end

    def charge_stripe(customer_id, amount)
      # Stripe API call would go here
      OpenStruct.new(paid?: true, id: "ch_#{SecureRandom.hex(12)}")
    end
  end

  # Example 4: Track batch operations with progress
  class BulkPlayerImportService
    include OpenTelemetryHelper

    def import_from_csv(file_path, academy_id)
      trace_span("BulkImport.import_players") do
        trace_attribute("academy.id", academy_id)
        trace_attribute("file.path", File.basename(file_path))
        trace_attribute("file.size_kb", File.size(file_path) / 1024)

        rows = CSV.read(file_path, headers: true)
        trace_attribute("import.total_rows", rows.size)

        successful = 0
        failed = 0
        errors = []

        rows.each_with_index do |row, index|
          trace_span("import_single_player") do
            trace_attribute("player.row_number", index + 1)
            trace_attribute("player.name", row["name"])

            begin
              Player.create!(
                name: row["name"],
                position: row["position"],
                academy_id: academy_id
              )
              successful += 1
            rescue => e
              failed += 1
              errors << "Row #{index + 1}: #{e.message}"
              trace_attribute("import.error", e.message)
            end
          end
        end

        # Track final results
        trace_attribute("import.successful", successful)
        trace_attribute("import.failed", failed)
        trace_attribute("import.success_rate", (successful.to_f / rows.size * 100).round(2))

        if errors.any?
          trace_attribute("import.errors", errors.first(5).join("; "))
          trace_event("import.completed_with_errors")
        else
          trace_event("import.completed_successfully")
        end

        { successful: successful, failed: failed, errors: errors }
      end
    end
  end

  # Example 5: Auto-trace methods with class-level macro
  class ReportGenerator
    extend OpenTelemetryHelper::ClassMethods

    # Simple auto-trace
    trace_method :generate_monthly_report
    def generate_monthly_report(academy_id, month)
      # Automatically creates a span named "ReportGenerator#generate_monthly_report"
      academy = Academy.find(academy_id)
      # ... report generation logic ...
      "Report for #{academy.name} - #{month}"
    end

    # Auto-trace with custom attributes
    trace_method :generate_player_report, attributes: ->(player_id, format) {
      {
        "player.id" => player_id,
        "report.format" => format,
        "report.type" => "player_stats"
      }
    }
    def generate_player_report(player_id, format)
      # Automatically traced with custom attributes
      player = Player.find(player_id)
      # ... report generation logic ...
      "Player report for #{player.name}"
    end
  end

  # Example 6: Track API calls to external services
  class ExternalApiService
    include OpenTelemetryHelper

    def fetch_weather_data(location)
      trace_span("ExternalAPI.fetch_weather") do
        trace_attribute("api.provider", "weather_api")
        trace_attribute("api.location", location)
        trace_attribute("api.endpoint", "https://api.weather.com/v1/current")

        start_time = Time.current

        response = HTTP.get("https://api.weather.com/v1/current", params: { location: location })

        # Track API performance
        duration_ms = ((Time.current - start_time) * 1000).round(2)
        trace_attribute("api.response_time_ms", duration_ms)
        trace_attribute("api.status_code", response.code)
        trace_attribute("api.success", response.success?)

        if response.success?
          data = JSON.parse(response.body)
          trace_attribute("weather.temperature", data["temperature"])
          trace_attribute("weather.condition", data["condition"])
          trace_event("api.call_succeeded")
        else
          trace_attribute("api.error", response.status.reason)
          trace_event("api.call_failed")
        end

        response
      end
    end
  end
end

# USAGE EXAMPLES:
#
# In a controller:
#   service = Examples::UserRegistrationService.new
#   user = service.register(email: "player@academy.com", academy_id: 1, role: "player")
#
# In a background job:
#   stats = Examples::PlayerStatsService.new.calculate_season_stats(player_id, 2024)
#
# In a payment flow:
#   result = Examples::PaymentProcessor.new.process_subscription_payment(academy_id, "premium", 99.00)
#
# All of these will automatically create rich traces with custom attributes in Honeycomb!
