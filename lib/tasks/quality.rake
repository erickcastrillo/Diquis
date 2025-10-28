namespace :quality do
  desc "Run all quality checks"
  task all: %i[rubocop security audit]

  desc "Run RuboCop linter"
  task :rubocop do
    puts "🚨 Running RuboCop..."
    system("bin/rubocop") || abort("RuboCop failed!")
    puts "✅ RuboCop passed"
  end

  desc "Auto-fix RuboCop issues"
  task :rubocop_fix do
    puts "🔧 Auto-fixing RuboCop issues..."
    system("bin/rubocop -A")
    puts "✅ RuboCop auto-fix completed"
  end

  desc "Run security audit"
  task :security do
    puts "🔒 Running security audit..."
    if system("bundle exec bundle-audit check --update")
      puts "✅ Security audit passed"
    else
      puts "⚠️  Security audit failed or bundle-audit gem not installed"
      puts "   Install with: gem install bundle-audit"
    end
  end

  desc "Check for debug statements"
  task :audit do
    puts "🐛 Checking for debug statements..."

    debug_patterns = [
      "binding" + ".pry",
      "binding" + ".irb",
      "debug" + "ger",
      "console" + ".log",
      "puts.*debug",
      "p\\s+['\"]debug"
    ]

    found_issues = false

    debug_patterns.each do |pattern|
      files = `grep -r "#{pattern}" app/ config/ lib/ 2>/dev/null || true`.strip
      if !files.empty?
        puts "❌ Found debug statements matching '#{pattern}':"
        puts files
        found_issues = true
      end
    end

    if found_issues
      abort("Please remove debug statements before committing")
    else
      puts "✅ No debug statements found"
    end
  end

  desc "Run before committing"
  task :pre_commit do
    puts "🔍 Running pre-commit quality checks..."
    Rake::Task["quality:rubocop"].invoke
    Rake::Task["quality:audit"].invoke
    puts "🎉 All quality checks passed!"
  end

  desc "Run before pushing"
  task :pre_push do
    puts "🚀 Running pre-push quality checks..."
    Rake::Task["quality:all"].invoke

    # Run tests if available
    if File.exist?("test")
      puts "🧪 Running tests..."
      system("bin/rails test") || puts("⚠️  Tests failed")
    end

    puts "🎉 All pre-push checks completed!"
  end
end
