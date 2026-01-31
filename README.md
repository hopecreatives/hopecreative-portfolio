# HopeCreative - Premium Photography & Filmmaking Portfolio

A premium editorial-style portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion.

## 🎬 Features

- **Responsive Design** - Mobile-first approach with smooth breakpoints
- **Cinematic Animations** - Smooth page transitions and scroll animations using Framer Motion
- **Dynamic Image Gallery** - Automatically generate image paths for all 54 portfolio images
- **Optimized Performance** - Next.js Image component with lazy loading and optimization
- **SEO Ready** - Metadata per page, semantic HTML, and optimized headings
- **Dark Minimalist Design** - Premium black & white color palette with serif typography
- **Interactive Components** - Hover effects, keyboard navigation, and smooth transitions
- **Keyboard Navigation** - Arrow keys and Escape support on project pages

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── works/
│   │   │   ├── page.tsx          # Portfolio page
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Project detail viewer
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   ├── components/
│   │   ├── Navigation.tsx        # Top navigation bar
│   │   ├── Footer.tsx            # Footer component
│   │   ├── OptimizedImage.tsx    # Next.js Image wrapper
│   │   ├── GalleryGrid.tsx       # Reusable gallery grid
│   │   └── Section.tsx           # Section wrapper with animations
│   └── data/
│       └── gallery.ts            # Gallery configuration & image paths
├── public/
│   └── assets/
│       └── images/
│           ├── photo-01.jpg
│           ├── photo-02.jpg
│           └── ... (photo-01.jpg through photo-54.jpg)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🖼️ Image Management

All portfolio images are dynamically managed through the gallery configuration system. 

### How It Works

1. **Image Storage**: Place all images in `/public/assets/images/`
2. **Naming Convention**: Images must follow the pattern `photo-01.jpg` through `photo-54.jpg`
3. **Dynamic Generation**: The `gallery.ts` file automatically generates paths and groupings

### Adding More Images

To add more images to the portfolio:

1. Add new images to `/public/assets/images/` with names following the pattern:
   - `photo-55.jpg`
   - `photo-56.jpg`
   - etc.

2. Update `TOTAL_IMAGES` in `src/data/gallery.ts`:
   ```typescript
   export const TOTAL_IMAGES = 56; // Change from 54 to 56
   ```

3. That's it! The system automatically generates all image paths and project groupings.

### Image Configuration Functions

In `src/data/gallery.ts`:

- `getImagePath(num)` - Get path for a specific image number
- `getAllImagePaths()` - Get array of all image paths
- `getFeaturedGallery()` - Get first 12 images for homepage
- `getProjectWorks()` - Get all projects (grouped by 6 images)
- `getProjectBySlug(slug)` - Get specific project
- `getAllProjectSlugs()` - Get all project slugs for static generation

## 🚀 Getting Started

### Installation

```bash
cd Portfolio
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📝 Brand Information

**Website**: HopeCreative  
**Founder**: Felix Byiringiro  
**Phone**: 0782487331  
**Email**: byiringirofelix5@gmail.com  
**Instagram**: https://www.instagram.com/hopecreative_official/

All brand information can be updated in `src/data/gallery.ts` under the `BRAND` object.

## 🎨 Design System

### Colors

- **Primary**: Black (#000000)
- **Background**: Black (#000000)
- **Text**: White (#ffffff)
- **Accents**: Gray scale (50-900)

### Typography

- **Headings**: Playfair Display (serif) - Premium editorial feel
- **Body**: Inter (sans-serif) - Modern and clean

### Spacing

Uses Tailwind CSS spacing scale with custom additions for generous white space.

## 🔗 Page Structure

### Home Page (/)
- Fullscreen hero section with featured image
- Editorial headline and intro text
- Scroll indicator animation
- Featured gallery (12 images)
- About preview
- Call-to-action section

### Portfolio Page (/works)
- All projects with thumbnail grids
- Individual project cards
- Hover animations and interactions
- Links to project detail pages

### Project Detail (/works/[slug])
- Fullscreen image viewer
- Keyboard navigation (← → arrows, Esc)
- Image counter
- Thumbnail navigation
- Next/Previous buttons
- Smooth page transitions

### About Page (/about)
- Founder information
- Brand story and description
- Service offerings
- Details grid with key information
- Portrait image

### Contact Page (/contact)
- Contact form with validation
- Direct contact information
- Phone and email links
- Instagram link
- Success message feedback

## 🎯 SEO Configuration

Update SEO metadata in `src/data/gallery.ts`:

```typescript
export const SEO = {
  title: 'Your Title',
  description: 'Your description',
  keywords: 'your, keywords',
  author: 'Your Name',
  twitterHandle: '@yourhandle',
}
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimized (768px breakpoint)
- Desktop optimized (1024px+ breakpoint)
- Tested on various screen sizes

## ⌨️ Keyboard Shortcuts

On project detail pages:
- **Right Arrow** - Next image
- **Left Arrow** - Previous image
- **Escape** - Go back to portfolio

## 🎬 Animation Framework

Uses **Framer Motion** for:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Image loading states
- Modal and form animations

## 📊 Performance

- Image optimization with Next.js Image component
- Lazy loading for below-the-fold content
- CSS-in-JS (Tailwind) for minimal bundle size
- Static generation for project pages
- Incremental Static Regeneration ready

## 🔧 Customization Guide

### Update Brand Information
Edit `src/data/gallery.ts`:
```typescript
export const BRAND = {
  name: 'Your Brand',
  founder: 'Your Name',
  phone: 'Your Phone',
  email: 'your@email.com',
  instagram: 'Your Instagram URL',
  tagline: 'Your Tagline',
  description: 'Your Description',
}
```

### Change Color Scheme
Edit `tailwind.config.ts` theme colors:
```typescript
colors: {
  // Customize colors here
}
```

### Modify Typography
Update fonts in `src/app/layout.tsx`:
```typescript
// Update Google Fonts link
```

### Add New Pages
1. Create new folder in `src/app/`
2. Add `page.tsx` file
3. Use existing components like `Section`, `OptimizedImage`, etc.

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

Works with any Node.js hosting:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku

## 📄 License

All rights reserved. © 2025 HopeCreative

## 📞 Support

For questions or issues, contact:
- **Email**: byiringirofelix5@gmail.com
- **Phone**: 0782487331
- **Instagram**: @hopecreative_official

---

**Built with ❤️ by Felix Byiringiro**
