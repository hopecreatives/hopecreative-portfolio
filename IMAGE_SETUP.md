# HopeCreative Portfolio - Image Setup Guide

## Quick Start

### 1. Prepare Your Images

Place all portfolio images in: `/public/assets/images/`

### 2. Name Your Images Correctly

Use the exact naming pattern:
```
photo-01.jpg
photo-02.jpg
photo-03.jpg
...
photo-54.jpg
```

Images MUST be numbered from 01 to 54 with zero-padding.

### 3. Update Image Count (if different)

If you have more or fewer than 54 images:

1. Open `src/data/gallery.ts`
2. Find this line:
   ```typescript
   export const TOTAL_IMAGES = 54;
   ```
3. Change `54` to your actual number
4. Save the file

That's it! All image paths, galleries, and projects will automatically update.

## Image Format Recommendations

- **Format**: JPG or WebP for best compression
- **Resolution**: Minimum 1920x1080 for full-width displays
- **Size**: Optimize before uploading (aim for <500KB per image)
- **Aspect Ratio**: Consistent aspect ratios for better grid appearance

## Dynamic Image Usage

### How Images Are Used

**Homepage Gallery**: First 12 images (photo-01 through photo-12)

**Project Pages**: Images grouped by 6
- Project 1: photo-01 to photo-06
- Project 2: photo-07 to photo-12
- Project 3: photo-13 to photo-18
- etc.

### Customizing Image Usage

Edit functions in `src/data/gallery.ts`:

```typescript
// Change how many images appear on home page
export function getFeaturedGallery() {
  return getAllImagePaths().slice(0, 12) // Change 12 to any number
}

// Change how images are grouped per project
export function getProjectWorks() {
  // Current: 6 images per project
  // Change the loop interval to modify
}
```

## Image Optimization

### Using Next.js Image Component

All images use the `OptimizedImage` component which:
- ✅ Automatic WebP conversion
- ✅ Responsive sizing
- ✅ Lazy loading
- ✅ Blur-up effect during loading
- ✅ AVIF format support

No additional optimization needed!

### Manual Image Optimization (Optional)

For best performance, optimize images before uploading:

```bash
# Using ImageMagick
mogrify -resize 1920x1080 -quality 80 *.jpg

# Using ffmpeg
for f in *.jpg; do 
  ffmpeg -i "$f" -c:v libjpeg -q:v 80 "optimized-$f"
done
```

## Troubleshooting

### Images Not Showing

1. Check naming pattern: `photo-01.jpg` not `photo-1.jpg`
2. Verify images are in `/public/assets/images/` folder
3. Check file extensions match (all JPG or all WebP)
4. Restart development server: `npm run dev`

### Gallery Looking Empty

1. Verify `TOTAL_IMAGES` matches your actual image count
2. Check that image numbers are sequential (no gaps)
3. Clear Next.js cache: `rm -rf .next && npm run dev`

### Images Load Slowly

1. Reduce image file sizes (<500KB recommended)
2. Use JPG format instead of PNG
3. Ensure Next.js Image optimization is enabled
4. Check your internet connection

## Advanced Customization

### Create Custom Gallery Functions

Add to `src/data/gallery.ts`:

```typescript
// Get specific range of images
export function getImageRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => 
    getImagePath(start + i)
  )
}

// Get images by criteria
export function getRandomImages(count: number) {
  const all = getAllImagePaths()
  return all.sort(() => Math.random() - 0.5).slice(0, count)
}
```

### Use Images in Custom Components

```typescript
import { getImagePath, getAllImagePaths } from '@/data/gallery'

// Get single image
const image = getImagePath(5) // photo-05.jpg

// Get all images
const images = getAllImagePaths() // [photo-01.jpg, photo-02.jpg, ...]
```

## Image Cache Control

Images are cached by Next.js. To clear cache:

```bash
# Clear Next.js build cache
rm -rf .next

# Restart development server
npm run dev
```

## Production Deployment

When deploying to production:

1. Ensure all images are in `/public/assets/images/`
2. Image paths are relative to public folder
3. CDN will automatically serve images efficiently
4. No additional configuration needed

## FAQ

**Q: Can I use PNG instead of JPG?**  
A: Yes, but JPG is smaller. WebP is best for modern browsers.

**Q: How many images can I have?**  
A: Unlimited! Just update `TOTAL_IMAGES` and follow naming pattern.

**Q: Can I reorder images?**  
A: Yes! Rename files to change order. Images are sorted by number.

**Q: Can I have missing numbers (e.g., photo-01, photo-03, photo-05)?**  
A: No, use sequential numbers. If you want to skip, update `TOTAL_IMAGES`.

**Q: How do I change which images are featured?**  
A: Edit the `getFeaturedGallery()` function in `src/data/gallery.ts`

---

**For more help**: byiringirofelix5@gmail.com
