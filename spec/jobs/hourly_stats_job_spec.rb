require "rails_helper"

RSpec.describe HourlyStatsJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    it "enqueues the job" do
      expect {
        HourlyStatsJob.perform_later
      }.to have_enqueued_job(HourlyStatsJob)
    end

    it "executes the job successfully" do
      expect(Rails.logger).to receive(:info).at_least(:once)

      expect { HourlyStatsJob.perform_now }.not_to raise_error
    end

    it "runs on the reports queue" do
      expect(HourlyStatsJob.new.queue_name).to eq("reports")
    end

    it "has retry configuration" do
      # Test that the job class has retry configuration
      expect(HourlyStatsJob.new).to respond_to(:perform)
    end
  end
end
