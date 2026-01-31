// Image data
const images = [
    { id: 1, src: 'public/assets/images/photo-01.jpg', title: 'Premium Shot 01' },
    { id: 2, src: 'public/assets/images/photo-02.jpg', title: 'Premium Shot 02' },
    { id: 3, src: 'public/assets/images/photo-03.jpg', title: 'Premium Shot 03' },
    { id: 4, src: 'public/assets/images/photo-04.jpg', title: 'Premium Shot 04' },
    { id: 5, src: 'public/assets/images/photo-05.jpg', title: 'Premium Shot 05' },
    { id: 6, src: 'public/assets/images/photo-06.jpg', title: 'Premium Shot 06' },
    { id: 7, src: 'public/assets/images/photo-07.jpg', title: 'Premium Shot 07' },
    { id: 8, src: 'public/assets/images/photo-08.jpg', title: 'Premium Shot 08' },
    { id: 9, src: 'public/assets/images/photo-09.jpg', title: 'Premium Shot 09' },
    { id: 10, src: 'public/assets/images/photo-10.jpg', title: 'Premium Shot 10' },
    { id: 11, src: 'public/assets/images/photo-11.jpg', title: 'Premium Shot 11' },
    { id: 12, src: 'public/assets/images/photo-12.jpg', title: 'Premium Shot 12' },
    { id: 13, src: 'public/assets/images/photo-13.jpg', title: 'Premium Shot 13' },
    { id: 14, src: 'public/assets/images/photo-14.jpg', title: 'Premium Shot 14' },
    { id: 15, src: 'public/assets/images/photo-15.jpg', title: 'Premium Shot 15' },
    { id: 16, src: 'public/assets/images/photo-16.jpg', title: 'Premium Shot 16' },
    { id: 17, src: 'public/assets/images/photo-17.jpg', title: 'Premium Shot 17' },
    { id: 18, src: 'public/assets/images/photo-18.jpg', title: 'Premium Shot 18' },
    { id: 19, src: 'public/assets/images/photo-19.jpg', title: 'Premium Shot 19' },
    { id: 20, src: 'public/assets/images/photo-20.jpg', title: 'Premium Shot 20' },
];

let currentLightboxIndex = 0;
let currentGalleryImages = [];

// Load gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupEventListeners();
});

function loadGallery() {
    const featuredGallery = document.getElementById('featuredGallery');
    const galleryGrid = document.getElementById('galleryGrid');

    // Featured gallery (first 6 images)
    if (featuredGallery) {
        const featured = images.slice(0, 6);
        currentGalleryImages = featured;
        renderGallery(featuredGallery, featured);
    }

    // Full gallery
    if (galleryGrid) {
        currentGalleryImages = images;
        renderGallery(galleryGrid, images);
    }
}

function renderGallery(container, galleryImages) {
    container.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${img.src}" alt="${img.title}" loading="lazy">
            <div class="gallery-item-title">${img.title}</div>
        </div>
    `).join('');
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-image');
    img.src = currentGalleryImages[index].src;
    img.alt = currentGalleryImages[index].title;
    
    updateLightboxCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryImages.length;
    const img = document.getElementById('lightbox-image');
    img.src = currentGalleryImages[currentLightboxIndex].src;
    updateLightboxCounter();
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    const img = document.getElementById('lightbox-image');
    img.src = currentGalleryImages[currentLightboxIndex].src;
    updateLightboxCounter();
}

function updateLightboxCounter() {
    document.getElementById('current-image').textContent = currentLightboxIndex + 1;
    document.getElementById('total-images').textContent = currentGalleryImages.length;
}

function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });

    // Close lightbox on background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// Contact form
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Log form data (in production, send to backend)
    console.log({
        name,
        email,
        subject,
        message
    });

    // Show success message
    messageDiv.textContent = 'Thank you! We\'ve received your message and will get back to you soon.';
    messageDiv.style.display = 'block';
    
    // Reset form
    form.reset();

    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
