# Slice-Based Architecture Documentation

This document describes the slice-based architecture generators and tools available in the Diquis application.

## Overview

The slice-based architecture organizes code by business domain rather than technical layers. Each slice contains all the components needed for a specific feature or domain area, including models, controllers, services, views, tests, and factories.

## Directory Structure

Each slice follows this structure:

```txt
app/slices/[slice_name]/
├── controllers/          # Controllers specific to this slice
├── models/              # Models specific to this slice
├── services/            # Business logic services
├── views/               # View templates
└── spec/
    ├── controllers/     # Controller specs
    ├── models/          # Model specs
    ├── services/        # Service specs
    ├── factories/       # FactoryBot factories
    └── support/         # Test support files
```

## Available Commands

### 1. Generate a New Slice

Create a complete slice structure with all necessary directories and route namespace.

```bash
rails slice:generate[slice_name]
```

**Example:**

```bash
rails slice:generate[user_management]
```

**What it does:**

- Creates the complete directory structure in `app/slices/user_management/`
- Adds a route namespace in `config/routes.rb` under the `app` namespace
- Creates `.keep` files to ensure empty directories are tracked by Git

**Output:**

```txt
Generated slice: user_management
Location: /home/project/app/slices/user_management

To generate a model in this slice:
  rails generate model ModelName --slice=user_management

To generate a factory in this slice:
  rails slice:factory[user_management,model_name]

Route namespace added: /app/user_management
```

**Routes Created:**
The command automatically adds this structure to `config/routes.rb`:

```ruby
namespace :app do
  namespace :user_management do
    # Add resources here
    # Example: resources :models
  end
end
```

### 2. Generate a Factory in a Slice

Create a FactoryBot factory within a specific slice.

```bash
rails slice:factory[slice_name,model_name]
```

**Example:**

```bash
rails slice:factory[user_management,profile]
```

**What it does:**

- Creates a factory file at `app/slices/user_management/spec/factories/profiles.rb`
- Generates a basic factory template with example attributes

**Generated Factory:**

```ruby
# frozen_string_literal: true

FactoryBot.define do
  factory :profile do
    # Add attributes here
    # Example:
    # name { Faker::Name.name }
    # email { Faker::Internet.email }
  end
end
```

### 3. Add a Resource Route to a Slice

Add a resource route to an existing slice namespace.

```bash
rails slice:add_resource[slice_name,resource_name]
```

**Example:**

```bash
rails slice:add_resource[user_management,profile]
```

**What it does:**

- Adds `resources :profiles` to the slice's route namespace
- Maintains proper indentation and formatting in `routes.rb`

**Before:**

```ruby
namespace :app do
  namespace :user_management do
    # Add resources here
    # Example: resources :models
  end
end
```

**After:**

```ruby
namespace :app do
  namespace :user_management do
    resources :profiles
  end
end
```

### 4. List All Slices

Display all available slices in the application.

```bash
rails slice:list
```

**Example Output:**

```txt
Available slices:
  - user_management
  - football
```

## Route Structure

All slice routes are organized under the `/app` namespace:

- Base URL: `/app/[slice_name]/[resource]`
- Example: `/app/user_management/profiles`

**Full Route Examples:**
For a `profiles` resource in the `user_management` slice:

```txt
GET    /app/user_management/profiles           # Index
POST   /app/user_management/profiles           # Create
GET    /app/user_management/profiles/new       # New
GET    /app/user_management/profiles/:id       # Show
PATCH  /app/user_management/profiles/:id       # Update
PUT    /app/user_management/profiles/:id       # Update
DELETE /app/user_management/profiles/:id       # Destroy
GET    /app/user_management/profiles/:id/edit  # Edit
```

## Factory Bot Configuration

The application is configured to load factories from slice directories automatically:

### Configuration Location

`spec/rails_helper.rb` contains the configuration:

```ruby
# Configure Factory Bot to load factories from slice directories
config.before(:suite) do
  # Load factories from traditional spec/factories
  FactoryBot.definition_file_paths = [Rails.root.join('spec', 'factories')]
  
  # Also load factories from slice directories
  slice_factory_paths = Dir.glob(Rails.root.join('app', 'slices', '*', 'spec', 'factories'))
  FactoryBot.definition_file_paths += slice_factory_paths
  
  # Reload factory definitions
  FactoryBot.reload
end
```

### Using Factories in Tests

Factories work exactly the same regardless of location:

```ruby
# In any spec file
describe Profile do
  let(:profile) { create(:profile) }
  
  it "has a valid factory" do
    expect(build(:profile)).to be_valid
  end
end
```

## RSpec Configuration

The application is configured to run specs from slice directories:

### Spec Pattern

```ruby
# In spec/rails_helper.rb
config.pattern = '{spec,app/slices}/**/*_spec.rb'
```

This allows RSpec to find and run tests in:

- `spec/` (traditional location)
- `app/slices/*/spec/` (slice locations)

### Running Tests

All standard RSpec commands work:

```bash
# Run all tests (including slice tests)
bundle exec rspec

# Run tests for a specific slice
bundle exec rspec app/slices/user_management/spec/

# Run a specific test file
bundle exec rspec app/slices/user_management/spec/models/profile_spec.rb
```

## Best Practices

### 1. Slice Naming

- Use snake_case for slice names
- Choose descriptive, domain-focused names
- Examples: `user_management`, `inventory_control`, `financial_reporting`

### 2. Factory Organization

- Keep factories close to their models within the slice
- Use traits for different factory variations
- Include realistic test data using Faker

### 3. Route Organization

- Use RESTful routes within slice namespaces
- Keep related resources grouped in the same slice
- Use nested routes when appropriate

### 4. Testing Strategy

- Write comprehensive tests within each slice
- Use slice-specific factories
- Test slice boundaries and interactions

## Example: Complete Slice Setup

Here's a complete example of setting up a slice for managing sports teams:

```bash
# 1. Generate the slice
rails slice:generate[sports_management]

# 2. Add resource routes
rails slice:add_resource[sports_management,team]
rails slice:add_resource[sports_management,player]

# 3. Generate factories
rails slice:factory[sports_management,team]
rails slice:factory[sports_management,player]

# 4. Verify setup
rails slice:list
rails routes | grep app_sports_management
```

**Resulting Structure:**

```txt
app/slices/sports_management/
├── controllers/
├── models/
├── services/
├── views/
└── spec/
    ├── controllers/
    ├── models/
    ├── services/
    ├── factories/
    │   ├── teams.rb
    │   └── players.rb
    └── support/
```

**Resulting Routes:**

```txt
/app/sports_management/teams
/app/sports_management/players
```

## Troubleshooting

### Common Issues

1. **Factory not found**: Ensure the factory is in the correct slice directory and RSpec configuration is loaded
2. **Route conflicts**: Check that slice names don't conflict with existing routes
3. **Directory permissions**: Ensure the application has write permissions to create slice directories

### Debugging Commands

```bash
# Check factory load paths
rails runner "puts FactoryBot.definition_file_paths"

# View all routes
rails routes

# Check slice directory structure
tree app/slices/

# Verify factory availability
rails runner "puts FactoryBot.factories.map(&:name)"
```

## Migration Guide

### From Traditional Structure

To migrate existing code to slice-based architecture:

1. **Create the slice:** `rails slice:generate[domain_name]`
2. **Move models:** Copy models to `app/slices/domain_name/models/`
3. **Move controllers:** Copy controllers to `app/slices/domain_name/controllers/`
4. **Move tests:** Copy specs to `app/slices/domain_name/spec/`
5. **Move factories:** Copy factories to `app/slices/domain_name/spec/factories/`
6. **Update routes:** Use `rails slice:add_resource` for each resource
7. **Run tests:** Verify everything works with `bundle exec rspec`

This slice-based architecture provides better organization, clearer boundaries, and improved maintainability for large Rails applications.
