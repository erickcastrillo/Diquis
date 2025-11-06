# frozen_string_literal: true

# Rack Attack Configuration for Rate Limiting
# Protects the application from abuse by limiting request rates

class Rack::Attack
  ### Configure Cache ###
  # Use Rails cache for storing rate limit counters
  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  ### Throttle Configuration ###

  # Throttle login attempts by IP address
  # 5 requests per 20 seconds for /users/sign_in
  throttle("logins/ip", limit: 5, period: 20.seconds) do |req|
    if req.path == "/users/sign_in" && req.post?
      req.ip
    end
  end

  # Throttle login attempts by email
  # 5 requests per 20 seconds per email to prevent credential stuffing
  throttle("logins/email", limit: 5, period: 20.seconds) do |req|
    if req.path == "/users/sign_in" && req.post?
      # Return the email parameter for the throttle key
      req.params["user"]&.dig("email")&.downcase&.presence
    end
  end

  # Throttle password reset requests by IP
  # 3 requests per hour to prevent abuse
  throttle("password_resets/ip", limit: 3, period: 1.hour) do |req|
    if req.path == "/users/password" && req.post?
      req.ip
    end
  end

  # Throttle password reset requests by email
  # 3 requests per hour per email
  throttle("password_resets/email", limit: 3, period: 1.hour) do |req|
    if req.path == "/users/password" && req.post?
      req.params["user"]&.dig("email")&.downcase&.presence
    end
  end

  # Throttle registration attempts by IP
  # 3 new registrations per hour from the same IP
  throttle("registrations/ip", limit: 3, period: 1.hour) do |req|
    if req.path == "/users" && req.post?
      req.ip
    end
  end

  # General API request throttling by IP
  # 100 requests per minute from the same IP for general API usage
  throttle("api/ip", limit: 100, period: 1.minute) do |req|
    req.ip unless req.path.start_with?("/assets") || req.path.start_with?("/vite")
  end

  ### Custom Response for Throttled Requests ###
  # When rate limit is exceeded, return 429 status
  self.throttled_responder = lambda do |env|
    retry_after = (env["rack.attack.match_data"] || {})[:period]
    [
      429,
      {
        "Content-Type" => "application/json",
        "Retry-After" => retry_after.to_s
      },
      [ {
        error: "Rate limit exceeded. Please try again later.",
        retry_after: retry_after
      }.to_json ]
    ]
  end

  ### Blocklisting ###
  # Block specific IPs or IP ranges if needed
  # Example: Rack::Attack.blocklist_ip("1.2.3.4")
  # Example: Rack::Attack.blocklist_ip("1.2.3.0/24")

  ### Safelisting ###
  # Always allow requests from localhost in development
  safelist("allow-localhost") do |req|
    req.ip == "127.0.0.1" || req.ip == "::1" if Rails.env.development?
  end

  ### Logging ###
  # Log blocked requests for monitoring
  ActiveSupport::Notifications.subscribe("rack.attack") do |name, start, finish, request_id, payload|
    req = payload[:request]
    Rails.logger.warn "[Rack::Attack][#{name}] #{req.ip} #{req.request_method} #{req.fullpath}" if payload[:request].env["rack.attack.matched"]
  end
end
