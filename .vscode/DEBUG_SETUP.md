# VS Code Debug Configuration

Add these configurations to enable debugging with breakpoints in your Rails application.

## Setup for Ruby Debugging

### 1. Install Required Gems

Add to your Gemfile (in development group):

```ruby
group :development, :test do
  gem 'debug', platforms: %i[ mri windows ], require: "debug/prelude"
  # Note: rdbg command is included with the debug gem
end
```

### 2. Environment Variables (Pre-configured)

The launch configurations now include the required environment variables:

- `RUBY_DEBUG_OPEN=true` - Enables remote debugging
- `RUBY_DEBUG_HOST=127.0.0.1` - Debug server host
- `RUBY_DEBUG_PORT=12345` - Debug server port  
- `RAILS_ENV=development|test` - Appropriate Rails environment

### 3. Manual Remote Debugging (Optional)

If you need to start debugging manually outside VS Code:

```bash
# Start Rails with remote debugging
bundle exec rdbg --open --host=127.0.0.1 --port=12345 -- bundle exec rails server

# Or start bin/dev with debugging environment variables
RUBY_DEBUG_OPEN=true RUBY_DEBUG_HOST=127.0.0.1 RUBY_DEBUG_PORT=12345 ./bin/dev
```

### 4. Set Breakpoints

- Click in the gutter next to line numbers to set breakpoints
- Or add `debugger` statements in your Ruby code
- Use `binding.break` for more control

## Available Debug Configurations

### 🚀 Start bin/dev (Full Stack)

- Launches the complete development environment
- Runs both Rails server and Vite dev server via bin/dev
- Best for general development
- Environment variables pre-configured for debugging

### 🚀 Debug bin/dev with Remote Attach

- Starts bin/dev with remote debugging enabled
- Allows VS Code to attach to the running process
- Use "📎 Attach to Rails Server" after starting this

### 🔧 Debug Rails Server  

- Starts Rails server with debugging enabled
- Set breakpoints in controllers, models, services
- Inspect variables and call stack

### 📎 Attach to Rails Server

- Connects to an already running Rails server
- Useful when Rails is started outside VS Code
- Requires server to be started with `rdbg --open`

### ⚛️ Debug Vite Dev Server

- Starts Vite development server with debugging
- Debug frontend build process
- Monitor asset compilation

### 🌐 Debug in Chrome

- Opens Chrome with debugging enabled
- Debug React/TypeScript code in browser
- Set breakpoints in frontend components

### 🔗 Attach to Chrome

- Connects to existing Chrome instance
- Chrome must be started with `--remote-debugging-port=9222`

### 🧪 Debug RSpec Tests

- Run and debug individual test files
- Set breakpoints in test code and application code
- Use `${file}` to debug currently open test file

### 🧪 Debug Current RSpec Test

- Debug specific test at cursor position
- Uses `${file}:${lineNumber}` for precise testing
- Perfect for debugging failing tests

### ⚡ Debug Vitest Tests

- Debug frontend JavaScript/TypeScript tests
- Set breakpoints in React component tests
- Monitor test execution flow

### 📋 Rails Console

- Interactive Rails console with debugging
- Execute Rails commands with full debugging support
- Inspect application state

### 🔄 Debug Sidekiq

- Start Sidekiq with debugging enabled
- Set breakpoints in background jobs
- Monitor job execution and failures

### 📎 Attach to Sidekiq

- Connect to a running Sidekiq process
- Useful when Sidekiq is started outside VS Code
- Port 12346 for Sidekiq debugging

## Compound Configurations

### 🚀 Full Stack Debug

- Launches both Rails and Vite servers with debugging
- Complete development environment
- Debug both backend and frontend simultaneously

### 🔍 Full Stack + Browser Debug  

- Rails server + Vite + Chrome debugging
- Ultimate debugging setup
- Debug the entire request/response cycle

### 🚀 Debug bin/dev + Attach

- Launches bin/dev with remote debugging enabled
- Single configuration for full-stack development with debugging
- Ready for VS Code debugger attachment

### 🔄 Full Stack + Sidekiq Debug

- Rails server + Vite + Sidekiq with debugging
- Complete development environment with job processing
- Debug web requests and background jobs simultaneously

## Usage Examples

### Debugging a Controller Action

1. Open your controller file
2. Set a breakpoint by clicking in the gutter
3. Press `F5` and select "🔧 Debug Rails Server"
4. Make a request to your application
5. VS Code will pause at your breakpoint

### Debugging a React Component

1. Open your React component file
2. Set a breakpoint in the component code
3. Press `F5` and select "🌐 Debug in Chrome"  
4. Interact with your component in the browser
5. VS Code will pause at your breakpoint

### Debugging a Failing Test

1. Open your test file
2. Place cursor on the failing test line
3. Press `F5` and select "🧪 Debug Current RSpec Test"
4. Step through test execution to find the issue

### Debugging Background Jobs

1. Open your job file (e.g., `app/jobs/example_job.rb`)
2. Set breakpoints in the `perform` method
3. Press `F5` and select "🔄 Debug Sidekiq"
4. Enqueue a job: `ExampleJob.perform_later(1, "test")`
5. VS Code will pause at your breakpoints when the job runs

### Attaching to Running Process

If you prefer to start your server manually:

```bash
# Terminal 1: Start Rails with debugging
rdbg --open --host=127.0.0.1 --port=12345 -- bundle exec rails server

# Terminal 2: Start Vite
npm run dev
```

Then in VS Code:

1. Press `F5` and select "📎 Attach to Rails Server"
2. VS Code connects to the running Rails server
3. Set breakpoints and debug normally

## Troubleshooting

### Ruby Debugger Not Working

- Ensure `debug` gem is installed: `bundle install`
- Check Ruby version compatibility (3.0+)
- Verify debugger is enabled in development environment

### Chrome Debugging Not Working  

- Install "JavaScript Debugger" VS Code extension
- Ensure Chrome is launched with debugging port
- Check that source maps are enabled in Vite config

### Breakpoints Not Hitting

- Verify file paths match between VS Code and running process
- Check that code is actually being executed  
- Ensure debugger is properly attached

### Port Conflicts

- Rails default: 3000
- Vite default: 5173  
- Ruby debugger default: 12345
- Chrome debugging default: 9222

Change ports in launch configurations if needed.

## Advanced Debugging

### Environment Variables

Set debugging environment variables in launch configurations:

```json
{
  "name": "Debug with Custom ENV",
  "type": "rdbg", 
  "request": "launch",
  "script": "${workspaceFolder}/bin/rails",
  "args": ["server"],
  "env": {
    "RUBY_DEBUG_OPEN": "true",
    "RAILS_ENV": "development",
    "LOG_LEVEL": "debug"
  }
}
```

### Conditional Breakpoints

- Right-click on a breakpoint to set conditions
- Only pause when condition is true
- Useful for debugging loops or specific scenarios

### Logpoints

- Add logging without modifying code
- Right-click in gutter and select "Add Logpoint"
- Expressions are evaluated and logged to Debug Console

## Sidekiq Management

### Testing Sidekiq Setup

```bash
# Test Sidekiq configuration
bundle exec rake sidekiq:test

# Check queue statistics
bundle exec rake sidekiq:stats

# Clear all queues
bundle exec rake sidekiq:clear

# Load test with multiple jobs
COUNT=50 bundle exec rake sidekiq:load_test
```

### Sidekiq Web UI

Access the Sidekiq dashboard at: http://localhost:3000/sidekiq

- Monitor queues and job processing
- View failed jobs and retry them
- See real-time statistics
- Manage scheduled jobs

### Common Sidekiq Tasks

```ruby
# In Rails console
ExampleJob.perform_later(1, "test message")  # Enqueue job
Sidekiq::Queue.new.clear                     # Clear default queue  
Sidekiq::Stats.new.processed                 # Get processed count
Sidekiq::RetrySet.new.clear                  # Clear retry queue
```

This setup provides comprehensive debugging capabilities for Ruby backend, JavaScript/TypeScript frontend, and background job processing in your Rails + Inertia.js + React + Sidekiq application.
