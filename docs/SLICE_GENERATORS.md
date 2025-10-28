# Slice Generators - Quick Reference

## Commands

### Generate New Slice

```bash
rails slice:generate[slice_name]
```

Creates complete slice structure + route namespace under `/app/slice_name`

### Generate Factory

```bash
rails slice:factory[slice_name,model_name]
```

Creates FactoryBot factory in `app/slices/slice_name/spec/factories/`

### Add Resource Route

```bash
rails slice:add_resource[slice_name,resource_name]
```

Adds `resources :resource_names` to slice's route namespace

### List Slices

```bash
rails slice:list
```

Shows all available slices

## Examples

```bash
# Create a user management slice
rails slice:generate[user_management]

# Add routes for profiles and settings
rails slice:add_resource[user_management,profile]
rails slice:add_resource[user_management,setting]

# Create factories
rails slice:factory[user_management,profile]
rails slice:factory[user_management,setting]

# Verify setup
rails slice:list
rails routes | grep user_management
```

## Directory Structure Created

```txt
app/slices/slice_name/
├── controllers/
├── models/
├── services/
├── views/
└── spec/
    ├── controllers/
    ├── models/
    ├── services/
    ├── factories/
    └── support/
```

## Route Structure

- All routes: `/app/slice_name/resource`
- Example: `/app/user_management/profiles`

## Key Features

- ✅ Automatic route namespace creation under `app`
- ✅ Factory Bot integration with slice directories
- ✅ RSpec configuration for slice-based tests
- ✅ Complete MVC structure per slice
- ✅ Git-friendly with `.keep` files
