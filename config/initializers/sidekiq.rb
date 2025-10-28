# Sidekiq Configuration
require "sidekiq"
require "sidekiq-cron"

# Redis configuration
redis_config = {
  url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0"),
  network_timeout: 5
}

# Configure Sidekiq server (when running as sidekiq process)
Sidekiq.configure_server do |config|
  config.redis = redis_config

  # Enable dead job retention
  config[:dead_timeout_in_seconds] = 180.days.to_i

  # Configure error handling
  config.death_handlers << lambda do |job, ex|
    Rails.logger.error "Job #{job['jid']} died: #{ex.message}"
  end

  # Middleware for job tracking and debugging
  config.server_middleware do |chain|
    chain.add Sidekiq::Middleware::Server::Logging
  end

  # Load cron jobs from schedule file after Rails loads
  Rails.application.config.after_initialize do
    schedule_file = Rails.root.join("config", "schedule.yml")
    if File.exist?(schedule_file)
      Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
      Rails.logger.info "Sidekiq-cron jobs loaded from #{schedule_file}"
    end
  end
end

# Configure Sidekiq client (for enqueuing jobs)
Sidekiq.configure_client do |config|
  config.redis = redis_config
end

# Configure logger in development
if Rails.env.development?
  Sidekiq.logger.level = Logger::DEBUG
end

# Configure Sidekiq web UI authentication in production
if Rails.env.production?
  require "sidekiq/web"

  Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
    [ user, password ] == [ ENV["SIDEKIQ_USERNAME"], ENV["SIDEKIQ_PASSWORD"] ]
  end
end
