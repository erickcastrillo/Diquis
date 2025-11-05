# Landing Page Setup Guide

## Quick Setup

To make the landing page accessible in your Rails app, follow these steps:

### 1. Create the Controller (if it doesn't exist)

```ruby
# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:landing] # If using Devise

  def landing
    render inertia: 'landing/index'
  end
end
```

### 2. Add the Route

```ruby
# config/routes.rb
Rails.application.routes.draw do
  # ... other routes ...

  # Landing page route
  get 'landing', to: 'pages#landing'

  # Or set it as root if you want it as the homepage
  # root 'pages#landing'
end
```

### 3. Access the Landing Page

Visit: `http://localhost:3000/landing`

## Making it the Homepage

If you want this landing page to be your homepage, update `config/routes.rb`:

```ruby
root 'pages#landing'
```

## Next Steps

1. **Customize the content** in `Hero.tsx`
2. **Add more sections** (Features, Pricing, etc.)
3. **Connect navigation links** to actual routes using Inertia's `<Link>` component
4. **Replace placeholder images** with your own assets

## Troubleshooting

### Icons not showing?

- Verify `@iconify/tailwind4` and `@iconify-json/tabler` are installed
- Check that `@plugin "@iconify/tailwind4"` is in `tailwind.css`
- Run `npm install` if needed

### Styles not applying?

- Ensure Vite dev server is running: `docker compose up -d vite`
- Check that FlyonUI plugin is configured in `tailwind.css`
- Verify `flyonui` is installed: `npm list flyonui`

### Mobile menu not toggling?

- FlyonUI JavaScript should be auto-initialized via `inertia.ts`
- Check browser console for errors
- Ensure `HSStaticMethods.autoInit()` is running
