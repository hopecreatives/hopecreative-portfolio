# Deploy to Vercel

## Steps:

1. **Create GitHub account** (if not already done):
   - Go to https://github.com/signup
   - Sign up with email

2. **Create a new GitHub repo**:
   - Go to https://github.com/new
   - Name: `hopecreative-portfolio`
   - Description: `Premium photography portfolio with admin panel`
   - Make it **Public** (free tier)
   - Click "Create repository"

3. **Push code to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hopecreative-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Vercel**:
   - Go to https://vercel.com/signup
   - Sign up with GitHub
   - Click "New Project"
   - Import the GitHub repo: `hopecreative-portfolio`
   - Environment Variables:
     ```
     CLOUDINARY_CLOUD_NAME = your_cloud_name
     CLOUDINARY_API_KEY = your_api_key
     CLOUDINARY_API_SECRET = your_api_secret
     CLOUDINARY_FOLDER = portfolio
     ADMIN_PASSWORD = your_password
     ```
   - Click "Deploy"

5. **After deployment**:
   - You'll get a Vercel URL: `https://hopecreative-portfolio.vercel.app`
   - Go to `/admin` and login with your password
   - Start uploading images!

## Free tier limits:
- Vercel: Unlimited deployments, 100 GB/month bandwidth
- Cloudinary: 25 GB/month storage, 25 M transformations (free)

Done!
