require 'rails_helper'

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
        expect(Rails.logger).to receive(:info).with(/Starting Academy::TeamAnalyticsJob/)
        expect(Rails.logger).to receive(:info).with(/Completed Academy::TeamAnalyticsJob/)

        perform_enqueued_jobs { described_class.perform_later('test_arg') }
      end
    end

    context 'when an error occurs' do
      before do
        allow_any_instance_of(described_class).to receive(:perform).and_raise(StandardError.new('Test error'))
      end

      it 'logs the error and re-raises it' do
        expect(Rails.logger).to receive(:error).with(/Error in Academy::TeamAnalyticsJob/)
        expect(Rails.logger).to receive(:error) # For backtrace

        expect {
          perform_enqueued_jobs { described_class.perform_later('test_arg') }
        }.to raise_error(StandardError, 'Test error')
      end
    end
  end

  describe 'queue configuration' do
    it 'is queued on the reports queue' do
      expect(described_class.new.queue_name).to eq('reports')
    end
  end

  describe 'retry configuration' do
    it 'retries on StandardError' do
      expect(described_class.retry_on_queue).to include(StandardError)
    end

    it 'discards on ActiveJob::DeserializationError' do
      expect(described_class.discard_on_queue).to include(ActiveJob::DeserializationError)
    end
  end
end
