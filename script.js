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

    // Image Switcher — Product Card
    const productImg = document.getElementById('productImg');
    const toggleBtns = document.querySelectorAll('.product-img-toggle .toggle-btn');

    if (toggleBtns.length && productImg) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                productImg.src = btn.dataset.target;
            });
        });
    }

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