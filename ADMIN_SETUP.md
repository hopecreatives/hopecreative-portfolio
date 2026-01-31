# Admin Panel Setup (Vercel + Cloudinary)

## 1) Create Cloudinary account
1. Sign up at https://cloudinary.com
2. In the dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

## 2) Configure Vercel environment variables
In Vercel Project Settings → Environment Variables, add:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER` (optional, default: `portfolio`)
- `ADMIN_PASSWORD` (your admin login password)

Deploy after adding env vars.

## 3) Use the admin panel
- Go to `/admin`
- Login with `ADMIN_PASSWORD`
- Upload images, edit titles, and mark images as Featured

## 4) How images appear on the site
- The home page “Selected Works” uses Featured images.
- If no Featured images exist, it shows the first 10 uploads.
- The Works page splits all images into 2 galleries.

## 5) Notes
- Images are stored in Cloudinary under the configured folder.
- Titles and featured status are saved in Cloudinary metadata.
- No database is required.
