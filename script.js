// ============================================
// PITBULL GOODS — STOREFRONT SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // IMAGE SWITCHING — Color changes update product images
    // ============================================
    
    // Maps product cards to their type and available variants
    function getProductType(card) {
        const name = card.querySelector('.product-name')?.textContent || '';
        if (name.includes('Hoodie')) return 'hoodie';
        if (name.includes('Tee')) return 'tee';
        if (name.includes('Jogger') || name.includes('Cargo')) return 'pants';
        if (name.includes('Backpack')) return 'backpack';
        if (name.includes('Sticker')) return 'stickers';
        if (name.includes('Poster')) return 'poster';
        if (name.includes('LED')) return 'led';
        return null;
    }

    // Get the product image element in a card
    function getProductImage(card) {
        // Use the first product-img in the card
        return card.querySelector('.product-img');
    }

    // Update the product image based on current color selections
    function updateProductImage(card) {
        const img = getProductImage(card);
        if (!img) return;
        
        const productType = getProductType(card);
        if (!productType) return;
        
        // Get current selections
        const baseColor = (card.querySelector('.base-color-select')?.value || '').toLowerCase();
        const graffitiColor = (card.querySelector('.color-select')?.value || '').toLowerCase();
        const color = graffitiColor || baseColor || 'green';
        
        // Determine image filename based on product type
        let filename = '';
        let isBack = img.src.includes('back');
        
        switch(productType) {
            case 'hoodie':
                // Hoodie has both base color and graffiti color variants
                if (baseColor && ['black','white','gray','pink','lavender'].includes(baseColor)) {
                    // Try base color image first
                    filename = `${isBack ? 'back' : 'front'}_${baseColor}.png`;
                } else {
                    filename = `${isBack ? 'back' : 'front'}_${color}.png`;
                }
                break;
            case 'tee':
                filename = `${isBack ? 'tee_back' : 'tee_front'}_${color}.png`;
                break;
            case 'pants':
                filename = `pants_${color}.png`;
                break;
            case 'backpack':
                filename = `backpack_${color}.png`;
                break;
            case 'stickers':
                filename = `stickers_${color}.png`;
                break;
            case 'poster':
                filename = `poster_${color}.png`;
                break;
            case 'led':
                filename = 'led_strips_mockup.png'; // No color variants for LED
                break;
        }
        
        if (!filename) return;
        
        // Test if the image exists, fallback to default
        const testImg = new Image();
        const defaultImg = img.dataset.default || img.src;
        
        // Store default if not already stored
        if (!img.dataset.default) {
            img.dataset.default = img.src;
        }
        
        testImg.onload = () => { img.src = filename; };
        testImg.onerror = () => { 
            // Fallback to default
            img.src = img.dataset.default; 
        };
        testImg.src = filename;
    }

    // ============================================
    // HERO IMAGE SWITCHER
    // ============================================
    
    let hoodieView = 'front';
    const heroImg = document.getElementById('heroHoodie');
    const heroBtns = document.querySelectorAll('.hero-image-nav .img-btn');

    if (heroBtns.length && heroImg) {
        heroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                heroBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                hoodieView = btn.dataset.img.includes('back') ? 'back' : 'front';
                heroImg.src = btn.dataset.img;
            });
        });
    }

    // ============================================
    // PRODUCT CARD IMAGE TOGGLES (hoodie front/back)
    // ============================================
    
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

    // ============================================
    // TAB SWITCHING
    // ============================================
    
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

            if (!btn.classList.contains('nav-links')) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // STRIPE LINK UPDATER
    // ============================================
    
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

    // ============================================
    // EVENT LISTENERS — Color changes trigger image + link updates
    // ============================================
    
    // Size Selectors
    document.querySelectorAll('.size-select').forEach(select => {
        select.addEventListener('change', function() {
            updateBuyButton(this.closest('.product-card'));
        });
    });

    // Base Color Selectors
    document.querySelectorAll('.base-color-select').forEach(select => {
        select.addEventListener('change', function() {
            const card = this.closest('.product-card');
            updateBuyButton(card);
            updateProductImage(card);
        });
    });

    // Graffiti Color Selectors
    document.querySelectorAll('.color-select').forEach(select => {
        select.addEventListener('change', function() {
            const card = this.closest('.product-card');
            updateBuyButton(card);
            updateProductImage(card);
        });
    });

    // Initialize all buy buttons with current selections
    document.querySelectorAll('.product-card').forEach(card => {
        updateBuyButton(card);
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    
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