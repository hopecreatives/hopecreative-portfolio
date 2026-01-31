# HopeCreative Components Documentation

Complete guide to all reusable components in the portfolio.

## 📦 Component Library

### 1. Navigation Component

**File**: `src/components/Navigation.tsx`

Sticky navigation bar with mobile menu support.

```typescript
import Navigation from '@/components/Navigation'

// Usage (automatic in layout)
// - Desktop: Horizontal menu
// - Mobile: Hamburger menu with animations
// - Features: Active links, smooth scrolling
```

**Features**:
- Sticky positioning
- Mobile hamburger menu
- Smooth animations
- Responsive design
- Logo branding

**Props**: None (uses internal state)

---

### 2. Footer Component

**File**: `src/components/Footer.tsx`

Complete footer with contact info and links.

```typescript
import Footer from '@/components/Footer'

// Usage (automatic in layout)
// - Brand information
// - Contact links
// - Social media
// - Quick navigation
```

**Features**:
- Responsive grid layout
- Contact information
- Social links
- Brand details
- Copyright notice
- Fade-in animations

**Props**: None (uses BRAND data)

---

### 3. OptimizedImage Component

**File**: `src/components/OptimizedImage.tsx`

Next.js Image wrapper with optimization and loading effects.

```typescript
import OptimizedImage from '@/components/OptimizedImage'

// Usage - with fill
<OptimizedImage
  src="/assets/images/photo-01.jpg"
  alt="Description"
  fill
  className="object-cover"
/>

// Usage - with dimensions
<OptimizedImage
  src="/assets/images/photo-02.jpg"
  alt="Description"
  width={1200}
  height={800}
  className="w-full h-auto"
/>
```

**Props**:
```typescript
interface OptimizedImageProps {
  src: string              // Image path
  alt: string              // Alt text (required for accessibility)
  width?: number           // Image width (if not using fill)
  height?: number          // Image height (if not using fill)
  className?: string       // Tailwind classes
  priority?: boolean       // Load priority (default: false)
  fill?: boolean           // Use fill layout (default: false)
}
```

**Features**:
- Automatic format conversion (WebP, AVIF)
- Responsive sizing
- Lazy loading
- Blur-up effect
- Quality optimization (85%)
- Loading animation

---

### 4. GalleryGrid Component

**File**: `src/components/GalleryGrid.tsx`

Responsive grid gallery with hover effects and animations.

```typescript
import GalleryGrid from '@/components/GalleryGrid'
import { getFeaturedGallery } from '@/data/gallery'

const images = getFeaturedGallery()

<GalleryGrid 
  images={images}
  columns={3}
/>
```

**Props**:
```typescript
interface GalleryGridProps {
  images: Array<{
    id: number
    src: string
    alt: string
  }>
  columns?: number  // 1, 2, 3, or 4 (default: 3)
}
```

**Features**:
- Responsive columns
- Staggered animations
- Hover scale effect
- Smooth transitions
- Dark overlay on hover
- Scroll-triggered reveal

**Column Options**:
- `1`: Single column (mobile)
- `2`: 2 columns (tablets)
- `3`: 3 columns (desktop)
- `4`: 4 columns (large screens)

---

### 5. Section Component

**File**: `src/components/Section.tsx`

Container with scroll animations and padding.

```typescript
import Section from '@/components/Section'

<Section className="bg-black" id="featured">
  <div className="max-w-7xl mx-auto px-6">
    {/* Your content */}
  </div>
</Section>
```

**Props**:
```typescript
interface SectionProps {
  children: ReactNode     // Section content
  className?: string      // Additional Tailwind classes
  id?: string            // HTML id for anchoring
}
```

**Features**:
- Fade-in on scroll
- Generous padding (py-20 md:py-32)
- Scroll-triggered animations
- Once-only animation
- Viewport margin detection

---

## 🎨 Styling Patterns

### Spacing
```typescript
// Section padding
<Section className="py-20 md:py-32">

// Container with horizontal padding
<div className="max-w-7xl mx-auto px-6">
```

### Typography
```typescript
// Heading hierarchy
<h1 className="text-5xl md:text-7xl font-serif font-bold">
<h2 className="text-4xl md:text-5xl font-serif font-bold">
<h3 className="text-2xl md:text-3xl font-serif font-bold">

// Body text
<p className="text-lg md:text-xl text-gray-300">
```

### Buttons
```typescript
<button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide">
  Click Me
</button>
```

### Cards
```typescript
<div className="bg-gray-900 border border-gray-800 hover:border-gray-700 transition">
  {/* Content */}
</div>
```

---

## 🎬 Animation Patterns

### Fade In
```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

### Slide Up
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

### Stagger Children
```typescript
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }}
>
```

### Hover Scale
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
```

---

## 🔌 Creating New Components

### Template Structure

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface YourComponentProps {
  title: string
  children: ReactNode
  className?: string
}

export default function YourComponent({
  title,
  children,
  className = ''
}: YourComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`px-6 py-8 ${className}`}
    >
      <h2 className="text-2xl font-serif font-bold mb-4">{title}</h2>
      {children}
    </motion.div>
  )
}
```

### Best Practices

1. **Always use 'use client'** for interactive components
2. **Optimize images** with `OptimizedImage` component
3. **Add animations** with Framer Motion
4. **Use Tailwind CSS** for styling
5. **Make components reusable** with proper props
6. **Add TypeScript types** for all props
7. **Responsive design** with `md:` and `lg:` breakpoints
8. **Accessibility** - alt text, semantic HTML, ARIA labels

---

## 🎯 Usage Examples

### Homepage Hero
```typescript
<section className="relative w-full h-screen">
  <OptimizedImage
    src={heroImage}
    alt="Hero"
    fill
    priority
  />
  <div className="absolute inset-0 bg-black/40" />
</section>
```

### Featured Gallery
```typescript
<Section className="bg-black">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-5xl font-serif font-bold mb-12">
      Featured Works
    </h2>
    <GalleryGrid images={featuredImages} columns={3} />
  </div>
</Section>
```

### Text with Image Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  <motion.div>
    <h2 className="text-4xl font-serif font-bold mb-6">
      Title
    </h2>
    <p className="text-gray-400 leading-relaxed">
      Description
    </p>
  </motion.div>
  <motion.div className="relative aspect-square">
    <OptimizedImage
      src={imagePath}
      alt="Description"
      fill
    />
  </motion.div>
</div>
```

---

## 🐛 Debugging Components

### Check Performance
```bash
# Build and check bundle size
npm run build

# Check for unused CSS
# Use Vercel Analytics or Google PageSpeed
```

### Common Issues

**Images not loading**
- Check src path is correct
- Verify image exists in `/public/assets/images/`
- Check alt text is present

**Animations not smooth**
- Ensure GPU acceleration with `transform` or `opacity`
- Avoid animating layout properties
- Check viewport settings

**Responsive layout broken**
- Use `md:` breakpoint (768px)
- Use `lg:` breakpoint (1024px)
- Test on actual devices

---

## 📚 Related Files

- **Gallery Data**: `src/data/gallery.ts`
- **Global Styles**: `src/app/globals.css`
- **Tailwind Config**: `tailwind.config.ts`
- **TypeScript Config**: `tsconfig.json`

---

**For more help, check the main README.md or contact support.** 📧
