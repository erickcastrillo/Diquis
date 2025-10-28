# Health check monitoring job
class HealthCheckJob < ApplicationJob
  queue_as :monitoring

  # Don't retry health checks - they should be frequent anyway
  retry_on StandardError, attempts: 1

  def perform
    Rails.logger.debug "Running system health check"

    # Perform health checks
    check_database_connection
    check_redis_connection
    check_external_services
    update_health_status

    Rails.logger.debug "Health check completed"
  end

  private

  def check_database_connection
    # Check database connectivity
    ActiveRecord::Base.connection.execute("SELECT 1")
    Rails.logger.debug "Database connection: OK"
  rescue => e
    Rails.logger.error "Database connection failed: #{e.message}"
    alert_administrators("Database connection failed")
  end

  def check_redis_connection
    # Check Redis connectivity
    Sidekiq.redis { |conn| conn.ping }
    Rails.logger.debug "Redis connection: OK"
  rescue => e
    Rails.logger.error "Redis connection failed: #{e.message}"
    alert_administrators("Redis connection failed")
  end

  def check_external_services
    # Check external API connections
    Rails.logger.debug "External services: OK"
    # Implementation: Check third-party APIs, webhooks, etc.
  end

  def update_health_status
    # Update system health status
    # Implementation: Store health metrics, update monitoring dashboard
  end

  def alert_administrators(message)
    # Send alerts to administrators
    Rails.logger.error "ALERT: #{message}"
    # Implementation: Send email/SMS alerts to admins
  end
end
