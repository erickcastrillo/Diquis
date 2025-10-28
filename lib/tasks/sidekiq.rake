namespace :sidekiq do
  desc "Test Sidekiq setup by enqueuing an example job"
  task test: :environment do
    puts "🔄 Testing Sidekiq setup..."

    # Check if Redis is available
    begin
      Sidekiq.redis { |conn| conn.ping }
      puts "✅ Redis connection successful"
    rescue => e
      puts "❌ Redis connection failed: #{e.message}"
      exit 1
    end

    # Enqueue a test job
    begin
      job = ExampleJob.perform_later(1, "Test from rake task")
      puts "✅ Job enqueued successfully: #{job.job_id}"
      puts "📊 Queue stats:"
      require "sidekiq/api"
      stats = Sidekiq::Stats.new
      puts "  - Processed: #{stats.processed}"
      puts "  - Failed: #{stats.failed}"
      puts "  - Enqueued: #{stats.enqueued}"
      puts "  - Scheduled: #{stats.scheduled_size}"
      puts "  - Retry: #{stats.retry_size}"
      puts "  - Dead: #{stats.dead_size}"
    rescue => e
      puts "❌ Failed to enqueue job: #{e.message}"
      exit 1
    end

    puts "🎉 Sidekiq test completed successfully!"
    puts "💡 Check the Sidekiq web UI at http://localhost:3000/sidekiq"
  end

  desc "Show Sidekiq queue statistics"
  task stats: :environment do
    require "sidekiq/api"
    stats = Sidekiq::Stats.new

    puts "📊 Sidekiq Statistics"
    puts "=" * 40
    puts "Processed: #{stats.processed}"
    puts "Failed: #{stats.failed}"
    puts "Enqueued: #{stats.enqueued}"
    puts "Scheduled: #{stats.scheduled_size}"
    puts "Retry: #{stats.retry_size}"
    puts "Dead: #{stats.dead_size}"
    puts "Workers: #{stats.workers_size}"
    puts "Default Queue: #{Sidekiq::Queue.new.size} jobs"

    # Show queue breakdown
    Sidekiq::Queue.all.each do |queue|
      puts "#{queue.name.capitalize} Queue: #{queue.size} jobs" if queue.size > 0
    end
  end

  desc "Clear all Sidekiq queues and statistics"
  task clear: :environment do
    puts "🧹 Clearing Sidekiq queues and statistics..."

    # Clear all queues
    Sidekiq::Queue.all.each(&:clear)

    # Clear retry and dead sets
    Sidekiq::RetrySet.new.clear
    Sidekiq::DeadSet.new.clear

    # Clear scheduled jobs
    Sidekiq::ScheduledSet.new.clear

    puts "✅ All queues cleared!"
  end

  desc "Enqueue multiple test jobs for load testing"
  task load_test: :environment do
    count = ENV["COUNT"]&.to_i || 10

    puts "🚀 Enqueuing #{count} test jobs..."

    count.times do |i|
      ExampleJob.perform_later(i + 1, "Load test job ##{i + 1}")
    end

    puts "✅ #{count} jobs enqueued!"
    require "sidekiq/api"
    puts "📊 Current queue size: #{Sidekiq::Queue.new.size}"
  end

  namespace :cron do
    desc "Load cron jobs from schedule.yml"
    task load: :environment do
      puts "📅 Loading cron jobs from schedule.yml..."

      schedule_file = Rails.root.join("config", "schedule.yml")
      unless File.exist?(schedule_file)
        puts "❌ Schedule file not found: #{schedule_file}"
        exit 1
      end

      begin
        schedule = YAML.load_file(schedule_file)
        Sidekiq::Cron::Job.load_from_hash(schedule)

        puts "✅ Cron jobs loaded successfully!"
        puts "📋 Loaded jobs:"
        Sidekiq::Cron::Job.all.each do |job|
          puts "  - #{job.name}: #{job.cron} (#{job.status})"
        end
      rescue => e
        puts "❌ Failed to load cron jobs: #{e.message}"
        exit 1
      end
    end

    desc "List all cron jobs"
    task list: :environment do
      puts "📋 Sidekiq-Cron Jobs"
      puts "=" * 50

      if Sidekiq::Cron::Job.all.empty?
        puts "No cron jobs configured"
        puts "💡 Run 'rails sidekiq:cron:load' to load jobs from schedule.yml"
      else
        Sidekiq::Cron::Job.all.each do |job|
          puts "Name: #{job.name}"
          puts "Cron: #{job.cron}"
          puts "Class: #{job.klass}"
          puts "Status: #{job.status}"
          puts "Last Run: #{job.last_enqueue_time || 'Never'}"
          # Calculate next run time from cron expression
          cron_job = Fugit::Cron.parse(job.cron)
          next_time = cron_job ? cron_job.next_time : "Unknown"
          puts "Next Run: #{next_time}"
          puts "-" * 30
        end
      end
    end

    desc "Enable a cron job"
    task :enable, [ :job_name ] => :environment do |_task, args|
      job_name = args[:job_name]

      if job_name.nil?
        puts "❌ Please provide a job name: rails sidekiq:cron:enable[job_name]"
        exit 1
      end

      job = Sidekiq::Cron::Job.find(job_name)
      if job
        job.enable!
        puts "✅ Enabled cron job: #{job_name}"
      else
        puts "❌ Cron job not found: #{job_name}"
        exit 1
      end
    end

    desc "Disable a cron job"
    task :disable, [ :job_name ] => :environment do |_task, args|
      job_name = args[:job_name]

      if job_name.nil?
        puts "❌ Please provide a job name: rails sidekiq:cron:disable[job_name]"
        exit 1
      end

      job = Sidekiq::Cron::Job.find(job_name)
      if job
        job.disable!
        puts "✅ Disabled cron job: #{job_name}"
      else
        puts "❌ Cron job not found: #{job_name}"
        exit 1
      end
    end

    desc "Delete all cron jobs"
    task clear: :environment do
      puts "🧹 Deleting all cron jobs..."

      Sidekiq::Cron::Job.destroy_all!

      puts "✅ All cron jobs deleted!"
    end

    desc "Test cron job configuration"
    task test: :environment do
      puts "🧪 Testing cron job configuration..."

      # Test schedule file syntax
      schedule_file = Rails.root.join("config", "schedule.yml")
      unless File.exist?(schedule_file)
        puts "❌ Schedule file not found: #{schedule_file}"
        exit 1
      end

      begin
        schedule = YAML.load_file(schedule_file)
        puts "✅ Schedule file syntax: OK"

        # Test each job configuration
        schedule.each do |job_name, config|
          puts "Testing job: #{job_name}"

          # Check required fields
          %w[cron class].each do |field|
            unless config[field]
              puts "❌ Missing required field '#{field}' for job '#{job_name}'"
              exit 1
            end
          end

          # Validate cron expression
          begin
            Fugit::Cron.parse(config["cron"])
            puts "  ✅ Cron expression valid: #{config['cron']}"
          rescue => e
            puts "  ❌ Invalid cron expression: #{config['cron']} - #{e.message}"
            exit 1
          end

          # Check if job class exists
          begin
            config["class"].constantize
            puts "  ✅ Job class exists: #{config['class']}"
          rescue => e
            puts "  ❌ Job class not found: #{config['class']} - #{e.message}"
            exit 1
          end
        end

        puts "🎉 All cron job configurations are valid!"
      rescue => e
        puts "❌ Configuration test failed: #{e.message}"
        exit 1
      end
    end
  end
end
