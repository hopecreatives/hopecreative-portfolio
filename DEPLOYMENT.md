# HopeCreative Portfolio - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is optimized for Next.js and offers the easiest deployment.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/hopecreative.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add variables from `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Your site is live! 🎉

#### Custom Domain
- In Vercel Project Settings → Domains
- Add your custom domain (e.g., hopecreative.com)
- Update DNS records at your domain registrar

---

### Option 2: Netlify

Quick and easy deployment alternative.

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build Your Project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure**
   - Follow CLI prompts to link your site
   - Set environment variables in Netlify dashboard

---

### Option 3: Traditional Node.js Hosting

For DigitalOcean, AWS, Heroku, etc.

#### Requirements:
- Node.js 18+ installed
- npm or yarn

#### Steps:

1. **Build Your Project**
   ```bash
   npm install
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Process Manager (Recommended)**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start server
   pm2 start npm --name "hopecreative" -- start
   
   # Restart on reboot
   pm2 startup
   pm2 save
   ```

4. **Nginx Reverse Proxy** (Optional but recommended)
   ```nginx
   server {
       listen 80;
       server_name hopecreative.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Option 4: Docker Containerization

Deploy anywhere Docker runs.

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY .next ./.next
COPY public ./public

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

#### Build and Run:
```bash
# Build image
docker build -t hopecreative .

# Run container
docker run -p 3000:3000 hopecreative
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Environment variables configured correctly
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] HTTPS enabled (all platforms support this)
- [ ] Security headers configured
- [ ] Form submissions handled safely
- [ ] No sensitive data in frontend code
- [ ] Images optimized for performance
- [ ] SEO metadata updated with your information

## ⚡ Performance Optimization

### Image Optimization
- ✅ Already handled by Next.js Image component
- ✅ Automatic WebP/AVIF conversion
- ✅ Responsive sizing
- ✅ Lazy loading enabled

### Caching Strategy
```javascript
// next.config.js
images: {
  unoptimized: false,
  formats: ['image/avif', 'image/webp'],
}
```

### Build Size
```bash
# Check build size
npm run build
# Next.js will show:
# - Page size (client-side JavaScript)
# - Static assets
# - Server assets
```

### Monitor Performance
- **Vercel Analytics** (built-in)
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **WebPageTest**: https://www.webpagetest.org

## 🔄 Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📊 Monitoring & Analytics

### Essential Tools:
1. **Google Analytics**
   - Add GA tracking ID to `.env.local`
   - Track user behavior and traffic

2. **Sentry** (Error Tracking)
   - Monitor JavaScript errors
   - Get alerts on issues

3. **Uptime Monitor**
   - UptimeRobot (free)
   - Monitor site availability 24/7

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Images Not Loading
- Verify images in `/public/assets/images/`
- Check image paths in `src/data/gallery.ts`
- Ensure TOTAL_IMAGES matches actual count

### Performance Issues
- Check build size: `npm run build`
- Optimize images further
- Enable HTTP/2 on server
- Use CDN for static assets

### SSL/HTTPS Certificate Issues
- On Vercel/Netlify: automatic
- On custom hosting: use Let's Encrypt
  ```bash
  # Using Certbot
  sudo certbot certonly --standalone -d hopecreative.com
  ```

## 📈 Post-Launch Checklist

After deploying:

- [ ] Test all pages on desktop and mobile
- [ ] Check all images load correctly
- [ ] Test contact form submissions
- [ ] Verify links work
- [ ] Check SEO metadata with Google Search Console
- [ ] Test keyboard navigation (arrow keys, escape)
- [ ] Check animation performance
- [ ] Monitor error logs
- [ ] Set up analytics tracking
- [ ] Create sitemap: auto-generated by Next.js

## 🎯 Custom Domain Setup

### Using Vercel:
1. Go to Project Settings → Domains
2. Enter your domain
3. Add DNS records (Vercel provides them)

### Using other registrar:
1. Point domain to hosting provider's nameservers
2. Or add CNAME/A records to domain registrar

### Email Configuration:
- Use email service like SendGrid for contact forms
- Or use Formspree for serverless forms

## 📞 Get Help

If you encounter issues:

1. Check **Next.js Documentation**: https://nextjs.org/docs
2. **Vercel Support**: https://vercel.com/support
3. **Contact**: byiringirofelix5@gmail.com

---

**You're all set to deploy!** 🚀
