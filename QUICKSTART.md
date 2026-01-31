# HopeCreative Portfolio - Quick Start

## 🚀 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd /Users/admin/Coding/Portfolio
npm install
```

### Step 2: Add Your Images
1. Copy 54 images to `/public/assets/images/`
2. Name them: `photo-01.jpg`, `photo-02.jpg`, ... `photo-54.jpg`
3. Done! No code changes needed.

### Step 3: Update Brand Information (Optional)
Edit `src/data/gallery.ts`:
```typescript
export const BRAND = {
  name: 'HopeCreative',           // Your brand name
  founder: 'Felix Byiringiro',    // Your name
  phone: '0782487331',             // Your phone
  email: 'byiringirofelix5@gmail.com', // Your email
  instagram: 'https://www.instagram.com/hopecreative_official/', // Your Instagram
  tagline: 'Cinematic Visual Storytelling', // Your tagline
  description: 'Your brand description...', // Your description
}
```

### Step 4: Start Development
```bash
npm run dev
```
Visit: http://localhost:3000

## 📁 What's Included

✅ **5 Complete Pages**
- Home with hero and featured gallery
- Portfolio with project showcase
- Project viewer with keyboard navigation
- About page with founder info
- Contact page with form

✅ **Modern Tech Stack**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion animations
- TypeScript

✅ **Premium Design**
- Dark minimalist aesthetic
- Responsive mobile-first layout
- Smooth animations and transitions
- Cinematic photography focus
- Editorial typography

✅ **Performance**
- Image optimization
- Lazy loading
- SEO ready
- Fast page load
- Static generation

## 🎨 Customize Color Scheme

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#667eea',      // Change primary color
  secondary: '#764ba2',    // Change secondary color
}
```

## 🔤 Change Fonts

Edit `src/app/layout.tsx`:
```typescript
// Change Google Fonts link
href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap"
```

Then update `tailwind.config.ts`:
```typescript
fontFamily: {
  serif: ['Your Serif Font', 'serif'],
  sans: ['Your Sans Font', 'sans-serif'],
}
```

## 📱 Mobile Preview

Test on mobile:
```bash
npm run dev
# Then open http://localhost:3000 on your phone
```

All pages are fully responsive!

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Connect your GitHub repository
4. Deploy with one click

Images will be optimized automatically!

## 📚 Documentation

- **Full Setup**: See `README.md`
- **Image Guide**: See `IMAGE_SETUP.md`
- **Advanced**: See individual component files

## 🆘 Troubleshooting

**Images not showing?**
- Check names: `photo-01.jpg` (not `photo-1.jpg`)
- Verify folder: `/public/assets/images/`
- Restart: `npm run dev`

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Need to add more images?**
1. Add images to `/public/assets/images/`
2. Update `TOTAL_IMAGES` in `src/data/gallery.ts`
3. Restart dev server

## 📞 Support

**Website**: HopeCreative  
**Email**: byiringirofelix5@gmail.com  
**Phone**: 0782487331  
**Instagram**: https://www.instagram.com/hopecreative_official/

---

**Ready to go live? You're just one `npm run build` away!** 🎬
