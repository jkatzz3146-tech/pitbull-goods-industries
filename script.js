// ============================================
// PITBULL GOODS — STOREFRONT SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Image Switcher — Hero Section
    const heroImg = document.getElementById('heroHoodie');
    const heroBtns = document.querySelectorAll('.hero-image-nav .img-btn');

    if (heroBtns.length && heroImg) {
        heroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                heroBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                heroImg.src = btn.dataset.img;
            });
        });
    }

    // Image Switcher — Product Card (hoodie front/back)
    const hoodieImg = document.getElementById('hoodieImg');
    const toggleBtns = document.querySelectorAll('.product-img-toggle .toggle-btn');

    if (toggleBtns.length && hoodieImg) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                hoodieImg.src = btn.dataset.target;
            });
        });
    }

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn, .tab-link');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = btn.dataset.tab;
            if (!tab) return;

            document.querySelectorAll('.tab-btn, .tab-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
            const targetSection = document.querySelector(`.tab-section[data-tab="${tab}"]`);
            if (targetSection) targetSection.classList.add('active');

            // Smooth scroll to products
            if (!btn.classList.contains('nav-links')) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Helper: Append options to Stripe links
    function updateBuyButton(card) {
        const buyBtn = card.querySelector('.btn-block');
        if (!buyBtn) return;
        const baseLink = buyBtn.dataset.baseLink || buyBtn.href.split('?')[0];
        const size = card.querySelector('.size-select')?.value || '';
        const baseColor = card.querySelector('.base-color-select')?.value || '';
        const graffitiColor = card.querySelector('.color-select')?.value || '';
        const params = new URLSearchParams();
        if (size) params.set('size', size);
        if (baseColor) params.set('base_color', baseColor);
        if (graffitiColor) params.set('graffiti_color', graffitiColor);
        buyBtn.href = baseLink + '?' + params.toString();
    }

    // Size Selectors
    document.querySelectorAll('.size-select').forEach(select => {
        select.addEventListener('change', function() {
            updateBuyButton(this.closest('.product-card'));
        });
    });

    // Base Color Selectors
    document.querySelectorAll('.base-color-select').forEach(select => {
        select.addEventListener('change', function() {
            updateBuyButton(this.closest('.product-card'));
        });
    });

    // Graffiti Color Selectors
    document.querySelectorAll('.color-select').forEach(select => {
        select.addEventListener('change', function() {
            updateBuyButton(this.closest('.product-card'));
        });
    });

    // Initialize all buy buttons with current selections
    document.querySelectorAll('.product-card').forEach(card => {
        updateBuyButton(card);
    });

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(10,10,10,0.98)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--border)';
                navLinks.style.gap = '16px';
            }
        });
    }
});