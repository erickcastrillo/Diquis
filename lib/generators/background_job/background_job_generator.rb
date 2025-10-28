class BackgroundJobGenerator < Rails::Generators::Base
  source_root File.expand_path("templates", __dir__)

  argument :name, type: :string, desc: "Job name (e.g., user_notification, player_stats)"

  class_option :slice, type: :string, desc: "Slice module (e.g., Football, Academy)"
  class_option :type, type: :string, default: "background",
               desc: "Job type: background, cron, or both", enum: %w[background cron both]
  class_option :queue, type: :string, default: "default",
               desc: "Queue name (default, critical, low, mailers, reports, maintenance, monitoring)"
  class_option :cron, type: :string, desc: "Cron expression for scheduled jobs"
  class_option :description, type: :string, desc: "Job description for cron schedule"

  def validate_options
    if options[:type] == "cron" && options[:cron].blank?
      raise Thor::Error, "Cron expression is required for cron jobs. Use --cron='0 2 * * *'"
    end
  end

  def generate_background_job
    return unless generate_background_job?

    @job_class_name = job_class_name
    @job_file_path = job_file_path
    @queue_name = options[:queue]
    @slice_module = slice_module

    # Ensure directory exists for slice jobs
    if slice_module
      directory_path = File.dirname(@job_file_path)
      empty_directory directory_path unless File.directory?(File.join(destination_root, directory_path))
    end

    template "background_job.rb.erb", @job_file_path
    create_job_spec
  end

  def generate_cron_job_config
    return unless generate_cron_job?

    add_to_schedule_file
  end

  def show_usage_instructions
    say_status :info, "Job generator completed!", :green
    say ""

    if generate_background_job?
      say_status :created, "Background job: #{@job_class_name}", :green
      say_status :location, "File: #{@job_file_path}", :blue
      say_status :usage, "#{job_class_name}.perform_later(args)", :yellow
    end

    if generate_cron_job?
      say_status :created, "Cron job configuration added to schedule.yml", :green
      say_status :cron, "Expression: #{options[:cron]}", :blue
      say_status :next, "Run: bundle exec rake sidekiq:cron:load", :yellow
    end

    say ""
    say_status :test, "Run tests: bundle exec rspec #{spec_file_path}", :cyan
    say_status :monitor, "Monitor: http://localhost:3000/sidekiq", :cyan
  end

  private

  def generate_background_job?
    %w[background both].include?(options[:type])
  end

  def generate_cron_job?
    %w[cron both].include?(options[:type])
  end

  def slice_module
    options[:slice]
  end

  def job_class_name
    if slice_module
      "#{slice_module}::#{name.camelize}Job"
    else
      "#{name.camelize}Job"
    end
  end

  def job_file_path
    if slice_module
      "app/slices/#{slice_module.underscore}/jobs/#{name.underscore}_job.rb"
    else
      "app/jobs/#{name.underscore}_job.rb"
    end
  end

  def spec_file_path
    if slice_module
      "spec/slices/#{slice_module.underscore}/jobs/#{name.underscore}_job_spec.rb"
    else
      "spec/jobs/#{name.underscore}_job_spec.rb"
    end
  end

  def create_job_spec
    @spec_class_name = job_class_name

    # Ensure spec directory exists for slice jobs
    if slice_module
      spec_directory_path = File.dirname(spec_file_path)
      empty_directory spec_directory_path unless File.directory?(File.join(destination_root, spec_directory_path))
    end

    template "job_spec.rb.erb", spec_file_path
  end

  def add_to_schedule_file
    schedule_file_path = "config/schedule.yml"

    # Create schedule file if it doesn't exist
    unless File.exist?(File.join(destination_root, schedule_file_path))
      create_file schedule_file_path, "# Sidekiq-Cron Job Schedule Configuration\n"
    end

    # Prepare cron job entry
    cron_entry = generate_cron_entry

    # Add to schedule file
    append_to_file schedule_file_path, cron_entry

    say_status :update, schedule_file_path, :green
  end

  def generate_cron_entry
    job_name = name.underscore
    job_name = "#{slice_module.underscore}_#{job_name}" if slice_module

    entry = "\n# #{options[:description] || "#{name.humanize} job"}\n"
    entry << "#{job_name}:\n"
    entry << "  cron: \"#{options[:cron]}\"\n"
    entry << "  class: \"#{job_class_name}\"\n"
    entry << "  description: \"#{options[:description] || name.humanize}\"\n"
    entry << "  queue: \"#{options[:queue]}\"\n"

    if slice_module
      entry << "  # Slice: #{slice_module}\n"
    end

    entry << "\n"
    entry
  end
end
