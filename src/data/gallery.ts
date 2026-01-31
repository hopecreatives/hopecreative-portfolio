/**
 * Gallery Data Structure
 * 
 * Dynamically generates image paths for all portfolio images.
 * Images follow the naming pattern: photo-01.jpg through photo-54.jpg
 * 
 * To add more images:
 * 1. Add new images to /public/assets/images/ with naming pattern
 * 2. Update the TOTAL_IMAGES constant below
 * 3. No other changes needed - paths are generated dynamically
 */

export const TOTAL_IMAGES = 54;

/**
 * Generate padded image number (01-54)
 */
function padImageNumber(num: number): string {
  return String(num).padStart(2, '0');
}

/**
 * Generate image path for a given number
 */
export function getImagePath(num: number): string {
  return `/assets/images/photo-${padImageNumber(num)}.jpg`;
}

/**
 * Get all image paths as an array
 */
export function getAllImagePaths(): string[] {
  return Array.from({ length: TOTAL_IMAGES }, (_, i) => 
    getImagePath(i + 1)
  );
}

/**
 * Generate featured gallery items (first 12 images + custom swaps)
 * Custom: Replace photos 8,9 with photos 40,41,44,45,46
 */
export function getFeaturedGallery() {
  const baseGallery = getAllImagePaths().slice(0, 12).map((path, index) => ({
    id: index + 1,
    src: path,
    alt: `HopeCreative Portfolio - Image ${index + 1}`,
  }));
  
  // Remove photos 8 and 9, add photos 40, 41, 44, 45, 46
  const filtered = baseGallery.filter((img, index) => index !== 7 && index !== 8);
  
  const replacements = [40, 41, 44, 45, 46].map((num, idx) => ({
    id: num,
    src: getImagePath(num),
    alt: `HopeCreative Portfolio - Image ${num}`,
  }));
  
  return [...filtered, ...replacements];
}

/**
 * Generate project works (all images grouped into 2 galleries)
 */
export function getProjectWorks() {
  const works = [];
  
  // Split 54 images into 2 galleries (27 images each)
  const imagesPerGallery = Math.ceil(TOTAL_IMAGES / 2);
  
  for (let galleryIndex = 0; galleryIndex < 2; galleryIndex++) {
    const startIdx = galleryIndex * imagesPerGallery;
    const endIdx = Math.min((galleryIndex + 1) * imagesPerGallery, TOTAL_IMAGES);
    
    const images = Array.from({ length: endIdx - startIdx }, (_, j) => {
      const imageNum = startIdx + j + 1;
      return {
        id: imageNum,
        src: getImagePath(imageNum),
        alt: `Gallery ${galleryIndex + 1} - Image ${j + 1}`,
      };
    });

    if (images.length > 0) {
      works.push({
        id: galleryIndex + 1,
        slug: `project-${String(galleryIndex + 1).padStart(2, '0')}`,
        title: `Gallery ${galleryIndex + 1}`,
        images,
      });
    }
  }
  
  return works;
}

/**
 * Get single project by slug
 */
export function getProjectBySlug(slug: string) {
  const works = getProjectWorks();
  return works.find(work => work.slug === slug);
}

/**
 * Get all project slugs for static generation
 */
export function getAllProjectSlugs() {
  return getProjectWorks().map(work => ({ slug: work.slug }));
}

/**
 * Brand Information
 */
export const BRAND = {
  name: 'HopeCreative',
  founder: 'Felix Byiringiro',
  phone: '0782487331',
  email: 'byiringirofelix5@gmail.com',
  instagram: 'https://www.instagram.com/hopecreative_official/',
  tagline: 'Cinematic Visual Storytelling',
  description: 'HopeCreative is a visual storytelling brand focused on photography and filmmaking. Founded by Felix Byiringiro, the brand captures authentic moments with a cinematic and emotional approach. From weddings to creative portraits and films, each project is crafted with intention, detail, and storytelling at its core.',
};

/**
 * SEO Metadata
 */
export const SEO = {
  title: 'HopeCreative | Premium Photography & Filmmaking Portfolio',
  description: 'Cinematic visual storytelling by Felix Byiringiro. Premium photography and filmmaking portfolios, weddings, and creative projects.',
  keywords: 'photography, filmmaking, portfolio, cinematic, visual storytelling, weddings',
  author: 'Felix Byiringiro',
  twitterHandle: '@hopecreative',
};
