namespace :generate do
  desc "Generate background jobs and/or cron jobs"
  task :job, [ :name ] => :environment do |_task, args|
    if args[:name].blank?
      puts "❌ Job name is required"
      puts "Usage examples:"
      puts "  rails generate background_job user_notification"
      puts "  rails generate background_job player_stats --slice=Football --type=background --queue=reports"
      puts "  rails generate background_job daily_cleanup --type=cron --cron='0 2 * * *' --description='Daily cleanup'"
      puts "  rails generate background_job academy_report --slice=Academy --type=both --cron='0 9 * * 1'"
      exit 1
    end

    job_name = args[:name]

    # Get environment variables for options
    slice = ENV["SLICE"]
    job_type = ENV["TYPE"] || "background"
    queue = ENV["QUEUE"] || "default"
    cron = ENV["CRON"]
    description = ENV["DESCRIPTION"]

    # Build generator command
    generator_args = [ job_name ]
    generator_args << "--slice=#{slice}" if slice
    generator_args << "--type=#{job_type}"
    generator_args << "--queue=#{queue}"
    generator_args << "--cron=#{cron}" if cron
    generator_args << "--description=#{description}" if description

    puts "🚀 Generating job: #{job_name}"
    puts "Options: #{generator_args.join(' ')}"
    puts ""

    # Run the generator
    Rails::Generators.invoke("background_job", generator_args)
  end
end

namespace :job do
  desc "List available job queues and their purposes"
  task queues: :environment do
    puts "📋 Available Job Queues"
    puts "=" * 50

    queues = {
      "critical" => "Urgent jobs (user-facing operations)",
      "default" => "Standard background tasks",
      "low" => "Non-urgent maintenance tasks",
      "mailers" => "Email sending jobs",
      "reports" => "Analytics and reporting jobs",
      "maintenance" => "System maintenance and cleanup",
      "monitoring" => "Health checks and system monitoring"
    }

    queues.each do |queue, description|
      puts "#{queue.ljust(12)} - #{description}"
    end

    puts ""
    puts "💡 Usage: --queue=QUEUE_NAME"
  end

  desc "Show job generator examples"
  task examples: :environment do
    puts "🎯 Job Generator Examples"
    puts "=" * 50
    puts ""

    examples = [
      {
        title: "Basic Background Job",
        command: "rails generate background_job user_notification",
        description: "Creates a simple background job in app/jobs/"
      },
      {
        title: "Slice Background Job",
        command: "rails generate background_job player_stats --slice=Football --queue=reports",
        description: "Creates a job in app/slices/football/jobs/ for reports queue"
      },
      {
        title: "Cron Job Only",
        command: "rails generate background_job daily_cleanup --type=cron --cron='0 2 * * *' --description='Daily system cleanup'",
        description: "Adds only a cron schedule entry (no job file)"
      },
      {
        title: "Background + Cron Job",
        command: "rails generate background_job academy_report --slice=Academy --type=both --cron='0 9 * * 1' --queue=reports",
        description: "Creates job file AND adds cron schedule"
      },
      {
        title: "High Priority Job",
        command: "rails generate background_job urgent_notification --queue=critical --type=background",
        description: "Creates a high-priority background job"
      },
      {
        title: "Monitoring Job",
        command: "rails generate background_job system_health --type=both --cron='*/5 * * * *' --queue=monitoring",
        description: "Creates a monitoring job that runs every 5 minutes"
      }
    ]

    examples.each_with_index do |example, index|
      puts "#{index + 1}. #{example[:title]}"
      puts "   Command: #{example[:command]}"
      puts "   Description: #{example[:description]}"
      puts ""
    end

    puts "📚 Options:"
    puts "  --slice=MODULE      Place job in slice directory (e.g., Football, Academy)"
    puts "  --type=TYPE         Job type: background, cron, or both (default: background)"
    puts "  --queue=QUEUE       Queue name (default: default)"
    puts "  --cron=EXPRESSION   Cron expression for scheduled jobs"
    puts "  --description=DESC  Job description for schedule"
    puts ""
    puts "⏰ Common Cron Expressions:"
    puts "  '0 2 * * *'     - Daily at 2:00 AM"
    puts "  '0 */6 * * *'   - Every 6 hours"
    puts "  '0 9 * * 1'     - Every Monday at 9:00 AM"
    puts "  '*/15 * * * *'  - Every 15 minutes"
    puts "  '0 0 1 * *'     - First day of every month at midnight"
  end
end
