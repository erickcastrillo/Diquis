require "rails_helper"

RSpec.describe DailyMaintenanceJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    it "enqueues the job" do
      expect {
        DailyMaintenanceJob.perform_later
      }.to have_enqueued_job(DailyMaintenanceJob)
    end

    it "executes the job successfully" do
      expect(Rails.logger).to receive(:info).at_least(:once)

      expect { DailyMaintenanceJob.perform_now }.not_to raise_error
    end

    it "runs on the maintenance queue" do
      expect(DailyMaintenanceJob.new.queue_name).to eq("maintenance")
    end
  end
end
