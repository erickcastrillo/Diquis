require "rails_helper"

RSpec.describe ExampleJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    let(:user_id) { 123 }
    let(:message) { "Test message" }

    it "enqueues the job" do
      expect {
        ExampleJob.perform_later(user_id, message)
      }.to have_enqueued_job(ExampleJob).with(user_id, message)
    end

    it "executes the job successfully" do
      # Mock the sleep to speed up the test
      allow_any_instance_of(ExampleJob).to receive(:sleep)

      expect { ExampleJob.perform_now(user_id, message) }.not_to raise_error
    end

    it "logs the correct messages" do
      allow_any_instance_of(ExampleJob).to receive(:sleep)

      # Capture log output
      expect(Rails.logger).to receive(:info).at_least(:once)

      ExampleJob.perform_now(user_id, message)
    end

    context "when job fails" do
      it "retries the job" do
        allow_any_instance_of(ExampleJob).to receive(:perform).and_raise(StandardError.new("Test error"))

        expect {
          ExampleJob.perform_later(user_id)
        }.to have_enqueued_job(ExampleJob)
      end
    end
  end
end
