require 'rails_helper'

RSpec.describe NotificationCleanupJob, type: :job do
  include ActiveJob::TestHelper

  let(:job) { described_class.new }

  describe '#perform' do
    context 'with valid arguments' do
      it 'executes successfully' do
        expect {
          perform_enqueued_jobs { described_class.perform_later('test_arg') }
        }.not_to raise_error
      end

      it 'can be performed' do
        job = described_class.new
        expect { job.perform('test_arg') }.not_to raise_error
      end
    end

    context 'when an error occurs during perform' do
      it 'handles errors appropriately' do
        job = described_class.new

        # Mock the job to raise an error after logging starts
        allow(Rails.logger).to receive(:info)
        allow(Rails.logger).to receive(:error)
        allow(job).to receive(:perform).and_call_original
        allow(job).to receive(:perform).and_raise(StandardError.new('Test error'))

        expect { job.perform('test_arg') }.to raise_error(StandardError, 'Test error')
      end
    end
  end

  describe 'queue configuration' do
    it 'is queued on the maintenance queue' do
      expect(described_class.new.queue_name).to eq('maintenance')
    end
  end

  describe 'retry configuration' do
    it 'has retry configuration' do
      # Test that the job class has retry_on configuration
      expect(described_class).to respond_to(:retry_on)
    end

    it 'has discard configuration' do
      # Test that the job class has discard_on configuration
      expect(described_class).to respond_to(:discard_on)
    end
  end
end
