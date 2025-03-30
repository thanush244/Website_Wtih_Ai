document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 50,
    });

    // Hide preloader when page loads
    window.addEventListener('load', () => {
        document.querySelector('.preloader').style.display = 'none';
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Initialize Swiper for banner slider
    new Swiper('.banner-slider', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Initialize Swiper for hero slider
    new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Initialize Swiper for products
    new Swiper('.products-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });

    // Cart functionality
    const cartTrigger = document.querySelector('.cart-trigger');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    let cartCount = 0;

    if (cartTrigger && cartSidebar && closeCart) {
        cartTrigger.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            updateCartCount();
            showNotification('success', 'Product added to cart');
        });
    });

    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-trigger .count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });
    }

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    let wishlistCount = 0;

    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                wishlistCount++;
                showNotification('success', 'Product added to wishlist');
            } else {
                wishlistCount--;
                showNotification('success', 'Product removed from wishlist');
            }
            updateWishlistCount();
        });
    });

    function updateWishlistCount() {
        const wishlistCountElements = document.querySelectorAll('.wishlist-trigger .count');
        wishlistCountElements.forEach(element => {
            element.textContent = wishlistCount;
        });
    }

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quickview-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            showNotification('info', 'Quick view feature coming soon');
        });
    });

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('info', 'Search feature coming soon');
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('success', 'Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // Notification system
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Close overlays when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            if (!cartSidebar.contains(e.target) && !cartTrigger.contains(e.target)) {
                cartSidebar.classList.remove('active');
            }
        }
    });
}); 