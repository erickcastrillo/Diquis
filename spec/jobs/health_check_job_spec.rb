require "rails_helper"

RSpec.describe HealthCheckJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    it "enqueues the job" do
      expect {
        HealthCheckJob.perform_later
      }.to have_enqueued_job(HealthCheckJob)
    end

    it "executes the job successfully" do
      # Mock external dependencies
      allow(ActiveRecord::Base.connection).to receive(:execute).with("SELECT 1")
      allow(Sidekiq).to receive(:redis).and_yield(double(ping: "PONG"))

      expect(Rails.logger).to receive(:debug).at_least(:once)

      expect { HealthCheckJob.perform_now }.not_to raise_error
    end

    it "runs on the monitoring queue" do
      expect(HealthCheckJob.new.queue_name).to eq("monitoring")
    end

    it "handles database connection failures" do
      allow(ActiveRecord::Base.connection).to receive(:execute).and_raise(StandardError.new("Connection failed"))
      expect(Rails.logger).to receive(:error).with("Database connection failed: Connection failed")
      expect(Rails.logger).to receive(:error).with("ALERT: Database connection failed")

      expect { HealthCheckJob.perform_now }.not_to raise_error
    end

    it "handles Redis connection failures" do
      allow(Sidekiq).to receive(:redis).and_raise(StandardError.new("Redis down"))
      expect(Rails.logger).to receive(:error).with("Redis connection failed: Redis down")
      expect(Rails.logger).to receive(:error).with("ALERT: Redis connection failed")

      expect { HealthCheckJob.perform_now }.not_to raise_error
    end
  end
end
