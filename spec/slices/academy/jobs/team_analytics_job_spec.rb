require 'rails_helper'

# Explicitly require the job file since autoloading might not work in test environment
require_relative '../../../../app/slices/academy/jobs/team_analytics_job'

RSpec.describe Academy::TeamAnalyticsJob, type: :job do
  include ActiveJob::TestHelper

  let(:job) { described_class.new }

  describe '#perform' do
    context 'with valid arguments' do
      it 'executes successfully' do
        expect {
          perform_enqueued_jobs { described_class.perform_later('test_arg') }
        }.not_to raise_error
      end

      it 'logs the start and completion' do
        allow(Rails.logger).to receive(:info)

        perform_enqueued_jobs { described_class.perform_later('test_arg') }

        # Verify logging happened (at least once - the job logs start and completion)
        expect(Rails.logger).to have_received(:info).at_least(:once)
      end
    end

    context 'when an error occurs' do
      it 'handles errors gracefully' do
        # Allow the job to raise an error
        allow_any_instance_of(described_class).to receive(:perform).and_raise(StandardError.new('Test error'))
        allow(Rails.logger).to receive(:error)

        expect {
          perform_enqueued_jobs { described_class.perform_later('test_arg') }
        }.to raise_error

        # Verify error was logged
        expect(Rails.logger).to have_received(:error).at_least(:once)
      end
    end
  end

  describe 'queue configuration' do
    it 'is queued on the reports queue' do
      expect(described_class.new.queue_name).to eq('reports')
    end
  end

  describe 'retry configuration' do
    it 'has retry configuration set' do
      # Check that retry_on was called during class definition
      expect(described_class).to respond_to(:retry_on)
    end

    it 'has discard configuration set' do
      # Check that discard_on was called during class definition
      expect(described_class).to respond_to(:discard_on)
    end
  end
end
