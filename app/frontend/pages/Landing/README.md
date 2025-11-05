# Landing Page Components

This folder contains the landing page components built with FlyonUI and Tailwind CSS v4.

## File Structure

```txt
app/frontend/pages/landing/
├── index.tsx    # Main landing page component with header/navigation
├── Hero.tsx     # Hero section component
└── README.md    # This file
```

## Components

### `index.tsx` - Main Landing Page

The main landing page component that includes:

- **Fixed Header**: Sticky navigation bar with logo and menu
- **Responsive Navigation**: Mobile hamburger menu with toggle functionality
- **Hero Section**: Imported from `Hero.tsx`

**Props**: None (standalone page component)

**Usage**:

```tsx
import LandingPage from '@/pages/landing';

// In your Inertia routes
<LandingPage />
```

### `Hero.tsx` - Hero Section

A reusable hero section component featuring:

- **Badge with AI-Powered tag**
- **Headline with decorative SVG underline**
- **Description text**
- **Call-to-action button** with Tabler arrow icon
- **Hero image** (from FlyonUI CDN)

**Props**: None (currently static, can be extended)

**Future Extensibility**:

```tsx
// You can add props to make it dynamic:
interface HeroProps {
  badge?: string;
  badgeText?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}
```

## Adding More Components

To add more landing page sections (e.g., Features, Pricing, Testimonials):

1. **Create a new component file**:

   ```bash
   touch app/frontend/pages/landing/Features.tsx
   ```

2. **Build the component**:

   ```tsx
   import React from 'react';
   
   const Features: React.FC = () => {
     return (
       <section className="py-20">
         {/* Your features content */}
       </section>
     );
   };
   
   export default Features;
   ```

3. **Import and use in `index.tsx`**:

   ```tsx
   import Hero from './Hero';
   import Features from './Features';
   
   const LandingPage: React.FC = () => {
     return (
       <>
         <Head title="Welcome" />
         <div className="bg-base-100">
           <header>{/* ... */}</header>
           <main>
             <Hero />
             <Features />
             {/* More sections... */}
           </main>
         </div>
       </>
     );
   };
   ```

## Icons

This landing page uses **Tabler icons** via Iconify. The syntax is:

```tsx
<span className="icon-[tabler--icon-name] size-5"></span>
```

**Currently used icons**:

- `icon-[tabler--menu-2]` - Hamburger menu
- `icon-[tabler--x]` - Close icon
- `icon-[tabler--arrow-right]` - CTA button arrow

**Find more icons**: https://icon-sets.iconify.design/tabler/

## FlyonUI Components Used

- `navbar`, `navbar-start`, `navbar-center`, `navbar-end`
- `btn`, `btn-primary`, `btn-gradient`, `btn-lg`, `btn-outline`, `btn-secondary`, `btn-square`
- `badge`, `badge-primary`
- `collapse-toggle` (for mobile menu)

**Documentation**: https://flyonui.com/docs/

## Routing Setup

To use this landing page, you'll need to set up an Inertia route in Rails:

```ruby
# config/routes.rb
get 'landing', to: 'pages#landing'
```

```ruby
# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  def landing
    render inertia: 'landing/index'
  end
end
```

## Customization

### Theme

The page uses FlyonUI's theme system. You can customize colors in `tailwind.css`:

```css
@theme {
  --color-primary: #3b82f6;
  --color-primary-content: #ffffff;
}
```

### Content

Replace the placeholder content in `Hero.tsx`:

- Change badge text
- Update headline
- Modify description
- Replace hero image URL
- Update CTA button text and link

### Navigation

Update the menu items in `index.tsx`:

```tsx
<a href="/products" className="hover:text-primary">Products</a>
<a href="/about" className="hover:text-primary">About Us</a>
```

## Next Steps

1. **Add more sections**: Features, Pricing, Testimonials, FAQ, Footer
2. **Make components dynamic**: Add props for content customization
3. **Connect to backend**: Replace static links with Inertia `<Link>` components
4. **Add animations**: Use Tailwind transitions or libraries like Framer Motion
5. **Optimize images**: Replace CDN images with local assets
