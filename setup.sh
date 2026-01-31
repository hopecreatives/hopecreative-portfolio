#!/bin/bash

# HopeCreative Portfolio - Installation & Setup Script
# This script helps set up the portfolio project

set -e

echo "🎬 HopeCreative Portfolio Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "   Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"
echo "📁 Working directory: $(pwd)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env.local from example if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created (update with your values)"
fi

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "📸 Next Steps:"
echo "1. Add 54 images to: public/assets/images/"
echo "   Name them: photo-01.jpg to photo-54.jpg"
echo ""
echo "2. Update brand info in: src/data/gallery.ts"
echo "   - Website name"
echo "   - Founder name"
echo "   - Contact info"
echo "   - Instagram URL"
echo ""
echo "3. Start development:"
echo "   npm run dev"
echo ""
echo "4. Visit: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - QUICKSTART.md - Quick setup guide"
echo "   - IMAGE_SETUP.md - Image management"
echo "   - DEPLOYMENT.md - Deployment instructions"
echo ""
echo "Happy coding! 🚀"
