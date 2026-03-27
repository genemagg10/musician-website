// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 10, 8, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(212, 165, 116, 0.1)';
    } else {
        navbar.style.background = 'rgba(13, 10, 8, 0.92)';
        navbar.style.boxShadow = 'none';
    }
});

// Discography album switching
const albumCards = document.querySelectorAll('.album-card');
const albumPanels = document.querySelectorAll('.album-panel');

albumCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetAlbum = card.dataset.album;

        // Update card active states
        albumCards.forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');

        // Update panel visibility
        albumPanels.forEach(panel => panel.classList.remove('active'));
        const targetPanel = document.getElementById('panel-' + targetAlbum);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Writings tab switching
const writingsTabs = document.querySelectorAll('.writings-tab');
const writingsPanels = document.querySelectorAll('.writings-panel');

writingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        writingsTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        writingsPanels.forEach(panel => panel.classList.remove('active'));
        const targetPanel = document.getElementById('tab-' + targetTab);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.album-grid, .about-content, .tracklist, .screenplay-card, .writing-piece, .reviews-list');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track preview player
const previewPlayer = document.getElementById('preview-player');
const previewIframe = document.getElementById('preview-iframe');
const previewTrackName = previewPlayer.querySelector('.preview-track-name');
const previewAlbumName = previewPlayer.querySelector('.preview-album-name');
const previewNoId = previewPlayer.querySelector('.preview-no-id');
const platformBtns = previewPlayer.querySelectorAll('.platform-btn');

let currentPlatform = 'spotify';
let currentTrack = null;

function getSpotifyEmbedUrl(trackId) {
    return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
}

function getAppleEmbedUrl(albumId, trackId) {
    return `https://embed.music.apple.com/us/album/${albumId}?i=${trackId}`;
}

function loadPreview(trackEl) {
    const trackName = trackEl.dataset.trackName;
    const albumName = trackEl.dataset.albumName;
    const spotifyId = trackEl.dataset.spotify;
    const appleAlbum = trackEl.dataset.appleAlbum;
    const appleTrack = trackEl.dataset.appleTrack;

    // Update display info
    previewTrackName.textContent = trackName;
    previewAlbumName.textContent = albumName;

    // Mark the active track row
    document.querySelectorAll('.tracks li.is-playing').forEach(li => li.classList.remove('is-playing'));
    trackEl.classList.add('is-playing');
    currentTrack = trackEl;

    // Show the player
    previewPlayer.classList.add('visible');
    previewPlayer.setAttribute('aria-hidden', 'false');

    // Load embed for current platform
    const hasSpotify = spotifyId && spotifyId.trim() !== '';
    const hasApple = appleAlbum && appleAlbum.trim() !== '' && appleTrack && appleTrack.trim() !== '';

    if (currentPlatform === 'spotify' && hasSpotify) {
        previewIframe.src = getSpotifyEmbedUrl(spotifyId.trim());
        previewIframe.style.display = 'block';
        previewNoId.style.display = 'none';
    } else if (currentPlatform === 'apple' && hasApple) {
        previewIframe.src = getAppleEmbedUrl(appleAlbum.trim(), appleTrack.trim());
        previewIframe.style.display = 'block';
        previewNoId.style.display = 'none';
    } else {
        previewIframe.src = '';
        previewIframe.style.display = 'none';
        previewNoId.style.display = 'block';
    }
}

// Click any track row to preview it
document.querySelectorAll('.tracks li').forEach(trackEl => {
    trackEl.addEventListener('click', () => loadPreview(trackEl));
});

// Platform toggle
platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPlatform = btn.dataset.platform;
        platformBtns.forEach(b => {
            b.classList.toggle('active', b === btn);
            b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        if (currentTrack) loadPreview(currentTrack);
    });
});

// Close preview player
document.getElementById('preview-close').addEventListener('click', () => {
    previewPlayer.classList.remove('visible');
    previewPlayer.setAttribute('aria-hidden', 'true');
    previewIframe.src = '';
    document.querySelectorAll('.tracks li.is-playing').forEach(li => li.classList.remove('is-playing'));
    currentTrack = null;
});

// Close on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && previewPlayer.classList.contains('visible')) {
        document.getElementById('preview-close').click();
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});
