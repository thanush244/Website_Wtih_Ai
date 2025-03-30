// Initialize AOS
AOS.init({
    duration: 800,
    offset: 50,
    once: true
});

// DOM Elements
const preloader = document.querySelector('.preloader');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartTrigger = document.querySelector('.cart-trigger');
const closeCart = document.querySelector('.close-cart');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
const quickViewBtns = document.querySelectorAll('.quickview-btn');
const newsletterForm = document.querySelector('.newsletter-form');

// Cart state
let cartCount = 0;

// Hide preloader when page loads
window.addEventListener('load', () => {
    preloader.style.display = 'none';
});

// Initialize Swiper sliders
const bannerSlider = new Swiper('.banner-slider', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    }
});

const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// Cart functionality
const cartCountElements = document.querySelectorAll('.cart-trigger .count');

function updateCartCount() {
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

cartTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

closeCart.addEventListener('click', () => {
    toggleCart();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartSidebar.classList.contains('active') && 
        !cartSidebar.contains(e.target) && 
        !cartTrigger.contains(e.target)) {
        toggleCart();
    }
});

// Add to cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
        showNotification('Product added to cart successfully!');
    });
});

// Wishlist functionality
let wishlistCount = 0;
const wishlistCountElements = document.querySelectorAll('.action-item .count');

function updateWishlistCount() {
    wishlistCountElements[1].textContent = wishlistCount;
}

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
            wishlistCount++;
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            wishlistCount--;
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
        updateWishlistCount();
        showNotification(btn.classList.contains('active') ? 
            'Product added to wishlist!' : 
            'Product removed from wishlist!');
    });
});

// Search functionality
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) {
        showNotification('Search functionality will be implemented soon!');
    }
});

// Newsletter subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles if not already in CSS
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = '#fff';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';

    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);

    // Remove notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Handle dropdowns on mobile
const dropdownItems = document.querySelectorAll('.has-mega-menu');

dropdownItems.forEach(item => {
    if (window.innerWidth <= 768) {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('active');
        });
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Products Slider
new Swiper('.products-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 4
        }
    }
});

// Quick View Modal
const quickViewModal = document.getElementById('quickviewModal');
const closeModal = document.querySelector('.close-modal');

quickViewBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = button.closest('.product-card');
        const productInfo = {
            name: product.querySelector('.product-title').textContent,
            price: product.querySelector('.current-price').textContent,
            image: product.querySelector('img').src,
            category: product.querySelector('.product-category').textContent,
            rating: product.querySelector('.product-rating').innerHTML
        };
        
        showQuickView(productInfo);
    });
});

function showQuickView(product) {
    const quickViewContent = document.querySelector('.product-quickview');
    quickViewContent.innerHTML = `
        <div class="quickview-grid">
            <div class="quickview-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quickview-details">
                <span class="category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="rating">${product.rating}</div>
                <div class="price">${product.price}</div>
                <div class="description">
                    <p>Premium quality product with elegant design and superior comfort.</p>
                </div>
                <div class="quickview-actions">
                    <div class="quantity">
                        <button class="qty-btn minus">-</button>
                        <input type="number" value="1" min="1">
                        <button class="qty-btn plus">+</button>
                    </div>
                    <button class="btn-add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Search Functionality
const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.querySelector('.close-search');

searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Product Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.tab;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle Outside Clicks
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-overlay') && !e.target.closest('.search-icon')) {
        searchOverlay.classList.remove('active');
    }
    if (!e.target.closest('.cart-sidebar') && !e.target.closest('.cart-icon')) {
        cartSidebar.classList.remove('active');
    }
    if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navIcons = document.querySelector('.nav-icons');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navIcons.style.display = navIcons.style.display === 'flex' ? 'none' : 'flex';
});

// Shopping Cart Functionality
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Show notification
        showNotification('Item added to cart!');
        // Create cart animation
        createCartAnimation(button);
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add to Cart Animation
function createCartAnimation(button) {
    const circle = document.createElement('div');
    const buttonRect = button.getBoundingClientRect();
    const cartIcon = document.querySelector('.cart-icon');
    const cartRect = cartIcon.getBoundingClientRect();
    
    circle.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        top: ${buttonRect.top + buttonRect.height/2}px;
        left: ${buttonRect.left + buttonRect.width/2}px;
        transform: translate(-50%, -50%);
        transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(circle);
    
    requestAnimationFrame(() => {
        circle.style.transform = 'translate(-50%, -50%) scale(0.5)';
        circle.style.top = `${cartRect.top + cartRect.height/2}px`;
        circle.style.left = `${cartRect.left + cartRect.width/2}px`;
    });
    
    setTimeout(() => {
        cartIcon.classList.add('animate');
        circle.remove();
        setTimeout(() => cartIcon.classList.remove('animate'), 500);
    }, 600);
}

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let isSliding = false;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index, direction = 'right') {
        if (isSliding) return;
        isSliding = true;

        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Add appropriate classes based on direction
        if (direction === 'right') {
            slides[currentSlide].classList.add('prev');
            slides[index].style.transform = 'translateX(100%)';
        } else {
            slides[currentSlide].style.transform = 'translateX(100%)';
            slides[index].classList.add('prev');
        }

        // Force reflow
        slides[index].offsetHeight;

        // Add active class to new slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Trigger transition
        if (direction === 'right') {
            slides[index].style.transform = 'translateX(0)';
            slides[currentSlide].style.transform = 'translateX(-100%)';
        } else {
            slides[index].style.transform = 'translateX(0)';
            slides[currentSlide].style.transform = 'translateX(100%)';
        }

        // Update current slide
        currentSlide = index;

        // Reset after transition
        setTimeout(() => {
            slides.forEach(slide => {
                slide.classList.remove('prev');
                if (!slide.classList.contains('active')) {
                    slide.style.transform = 'translateX(100%)';
                }
            });
            isSliding = false;
        }, 500);
    }

    // Function to go to next slide
    function nextSlide() {
        if (isSliding) return;
        const next = (currentSlide + 1) % slides.length;
        showSlide(next, 'right');
    }

    // Function to go to previous slide
    function prevSlide() {
        if (isSliding) return;
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev, 'left');
    }

    // Start auto sliding
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
    }

    // Stop auto sliding
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for arrow buttons
    nextButton.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    prevButton.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isSliding || index === currentSlide) return;
            stopSlideShow();
            const direction = index > currentSlide ? 'right' : 'left';
            showSlide(index, direction);
            startSlideShow();
        });
    });

    // Start the slideshow
    startSlideShow();

    // Pause slideshow when hovering over the slider
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopSlideShow);
    heroSlider.addEventListener('mouseleave', startSlideShow);
});

// Add smooth scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Add animation classes to elements
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', `${index * 100}`);
    });

    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.setAttribute('data-aos', 'zoom-in');
        feature.setAttribute('data-aos-delay', `${index * 200}`);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.8}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.003);
    }
});

// Magnetic button effect
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.transform = `translate(
            ${(x - rect.width/2) / 10}px,
            ${(y - rect.height/2) / 10}px
        )`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

/* Updated Location Button styles */
.location-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.location-btn i,
.location-btn span {
    color: #ffffff;  /* Changed to pure white */
    font-weight: 400;  /* Added for better visibility */
    font-size: 14px;
}

.location-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.location-btn .fa-chevron-down {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.location-btn:hover .fa-chevron-down {
    transform: rotate(180deg);
}

// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.bindEvents();
        this.updateCartCount();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                const productInfo = {
                    id: productId,
                    name: productCard.querySelector('.product-title').textContent,
                    price: productCard.querySelector('.current-price').textContent,
                    image: productCard.querySelector('.product-image img').src,
                    quantity: 1
                };
                this.addToCart(productInfo);
            });
        });

        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.closest('.wishlist-btn').classList.toggle('active');
            });
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showNotification() {
        const notification = document.getElementById('cartNotification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
});

// Authentication
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked button and corresponding form
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}Form`).classList.add('active');
        });
    });

    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showErrorMessage('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                showErrorMessage('Please enter a valid email address');
                return;
            }

            // Simulate login
            simulateLogin(email, password, rememberMe);
        });
    }

    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Basic validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showErrorMessage('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                showErrorMessage('Please enter a valid email address');
                return;
            }

            if (!isValidPassword(password)) {
                showErrorMessage('Password does not meet requirements');
                return;
            }

            if (password !== confirmPassword) {
                showErrorMessage('Passwords do not match');
                return;
            }

            if (!terms) {
                showErrorMessage('Please accept the terms and conditions');
                return;
            }

            // Simulate registration
            simulateRegistration(firstName, lastName, email, password);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
            simulateSocialLogin(platform);
        });
    });
});

// Utility functions for authentication
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function simulateLogin(email, password, rememberMe) {
    // Show loading state
    const loginBtn = document.querySelector('#loginForm .auth-btn');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;

        // Show success message
        showSuccessMessage('Login successful! Redirecting...');

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1500);
}

function simulateRegistration(firstName, lastName, email, password) {
    // Show loading state
    const registerBtn = document.querySelector('#registerForm .auth-btn');
    const originalText = registerBtn.textContent;
    registerBtn.textContent = 'Creating Account...';
    registerBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;

        // Show success message
        showSuccessMessage('Account created successfully! Please login.');

        // Switch to login tab after 2 seconds
        setTimeout(() => {
            document.querySelector('[data-tab="login"]').click();
        }, 2000);
    }, 1500);
}

function simulateSocialLogin(platform) {
    // Show loading state
    const button = document.querySelector(`.btn-social.${platform.toLowerCase()}`);
    const originalText = button.textContent;
    button.textContent = `Connecting to ${platform}...`;
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;

        // Show success message
        showSuccessMessage(`Successfully logged in with ${platform}! Redirecting...`);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1500);
}

// Add styles for error and success messages
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background-color: #fee2e2;
        color: #dc2626;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 20px;
        display: none;
    }

    .success-message {
        background-color: #dcfce7;
        color: #16a34a;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 20px;
        display: none;
    }
`;
document.head.appendChild(style);