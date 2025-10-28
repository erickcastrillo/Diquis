# Example background job for testing Sidekiq setup
class ExampleJob < ApplicationJob
  queue_as :default

  # Retry configuration
  retry_on StandardError, wait: :exponentially_longer, attempts: 5

  def perform(user_id, message = "Hello from Sidekiq!")
    Rails.logger.info "Processing ExampleJob for user #{user_id}"

    # Simulate some work
    sleep(2)

    Rails.logger.info "ExampleJob completed: #{message}"

    # You can add your actual job logic here
    # For example: send email, process data, generate reports, etc.
  end
end
