// Image data - using Dropbox direct links
const images = [
    { id: 1, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ADevRLEdFLWn2ZFVSRTy5qE/Photo-01.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 01' },
    { id: 2, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AAh_I2_bElbpCkJNp3OMAEQ/Photo-02.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 02' },
    { id: 3, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANyxv6tTeCtrFKiJI429LFA/Photo-03.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 03' },
    { id: 4, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AImAl7wMlOQg6X6INknUc4o/Photo-04.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 04' },
    { id: 5, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANMn3PryyA_nVyL2fwhG_Nk/Photo-05.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 05' },
    { id: 6, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AGv-XMs481fRaGSXRz39fq0/Photo-06.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 06' },
    { id: 7, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ADppyRkNt1RlbpJKoFvkYfo/Photo-07.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 07' },
    { id: 8, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/APEu4NIErFniUmZJQud_vqI/Photo-08.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 08' },
    { id: 9, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AMC_y5RX8dYpD9C2E9DLqHc/Photo-09.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 09' },
    { id: 10, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ADqbI0jBexJ_bw2rSxlgm0U/Photo-010.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 10' },
    { id: 11, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AE4hClwfzQksyRtPzrnXbgU/Photo-011.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 11' },
    { id: 12, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AGkpUPuJBdqoqhYpMYD-e94/Photo-012.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 12' },
    { id: 13, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AL43gKhi9MQJCzCOI-lOUdk/Photo-013.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 13' },
    { id: 14, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANjETsPDUadBcPiaLSEG7Ms/Photo-014.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 14' },
    { id: 15, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/AKHdV0oMB-N6ou4sY0NkBxw/Photo-015.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 15' },
    { id: 16, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 16' },
    { id: 17, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 17' },
    { id: 18, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 18' },
    { id: 19, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 19' },
    { id: 20, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 20' },
    { id: 21, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 21' },
    { id: 22, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 22' },
    { id: 23, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 23' },
    { id: 24, src: 'https://www.dropbox.com/scl/fo/u8xxdn01tt6awof7u0hca/ANQgAGQKEwR9ZkP6P0ZcXcM/Photo-016.jpg?rlkey=wtj3m2t2tdqpkq262z5gyhktf&dl=1', title: 'Premium Shot 24' },
];

let currentLightboxIndex = 0;
let currentGalleryImages = [];

// Load gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupEventListeners();
    setupHeroAndAboutImages();
});

function loadGallery() {
    const featuredGallery = document.getElementById('featuredGallery');
    const galleryGrid = document.getElementById('galleryGrid');

    // Featured gallery (first 9 images)
    if (featuredGallery) {
        const featured = images.slice(0, 9);
        currentGalleryImages = featured;
        renderGallery(featuredGallery, featured);
    }

    // Full gallery
    if (galleryGrid) {
        currentGalleryImages = images;
        renderGallery(galleryGrid, images);
    }
}

function getMasonryClass(index) {
    if (index % 5 === 0) return 'masonry-item wide tall';
    if (index % 4 === 2) return 'masonry-item wide';
    return 'masonry-item';
}

function renderGallery(container, galleryImages) {
    container.innerHTML = galleryImages
        .map(
            (img, index) => `
                <div class="${getMasonryClass(index)}" onclick="openLightbox(${index})">
                        <img src="${img.src}" alt="${img.title}" loading="lazy" onerror="handleImageError(this)">
                        <div class="overlay"></div>
                        <div class="caption">${img.title}</div>
                </div>
        `
        )
        .join('');
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

function setupHeroAndAboutImages() {
    const hero = document.getElementById('hero');
    if (hero && images[0]) {
        hero.style.backgroundImage = `url('${images[0].src}')`;
    }

    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage && images[1]) {
        aboutImage.src = images[1].src;
    }

    const aboutPageImage = document.getElementById('aboutPageImage');
    if (aboutPageImage && images[2]) {
        aboutPageImage.src = images[2].src;
    }
}

function handleImageError(img) {
    img.onerror = null;
    img.src = 'https://placehold.co/1200x900/111111/ffffff?text=Image';
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

    console.log({ name, email, subject, message });

    messageDiv.textContent = 'Thank you! We\'ve received your message and will get back to you soon.';
    messageDiv.style.display = 'block';

    form.reset();

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}
