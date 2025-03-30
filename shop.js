// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const productGrid = document.querySelector('.product-grid');
const priceSlider = document.querySelector('.price-slider');
const priceInputs = document.querySelectorAll('.price-inputs input');
const colorOptions = document.querySelectorAll('.color-option');
const brandCheckboxes = document.querySelectorAll('.brand-filters input[type="checkbox"]');
const sortSelect = document.querySelector('.shop-sort select');

// Grid/List View Toggle
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.filter === 'grid') {
            productGrid.classList.remove('list-view');
        } else {
            productGrid.classList.add('list-view');
        }
    });
});

// Price Range Slider
if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        priceInputs[1].value = value;
    });

    priceInputs.forEach(input => {
        input.addEventListener('change', () => {
            const min = parseInt(priceInputs[0].value);
            const max = parseInt(priceInputs[1].value);
            
            if (min > max) {
                priceInputs[0].value = max;
            }
            if (max < min) {
                priceInputs[1].value = min;
            }
            
            priceSlider.value = max;
            filterProducts();
        });
    });
}

// Color Filter
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        filterProducts();
    });
});

// Brand Filter
brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

// Sort Products
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const products = Array.from(productGrid.children);
        const sortBy = sortSelect.value;
        
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.current-price').textContent.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.querySelector('.current-price').textContent.replace(/[^0-9]/g, ''));
            
            switch(sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    const dateA = new Date(a.dataset.date);
                    const dateB = new Date(b.dataset.date);
                    return dateB - dateA;
                default:
                    return 0;
            }
        });
        
        products.forEach(product => productGrid.appendChild(product));
    });
}

// Filter Products Function
function filterProducts() {
    const products = Array.from(productGrid.children);
    const selectedBrands = Array.from(brandCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.nextElementSibling.textContent);
    
    const selectedColor = document.querySelector('.color-option.active')?.style.background;
    const minPrice = parseInt(priceInputs[0].value);
    const maxPrice = parseInt(priceInputs[1].value);
    
    products.forEach(product => {
        const productPrice = parseInt(product.querySelector('.current-price').textContent.replace(/[^0-9]/g, ''));
        const productBrand = product.dataset.brand;
        const productColors = Array.from(product.querySelectorAll('.product-colors .color-option'))
            .map(opt => opt.style.background);
        
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
        const colorMatch = !selectedColor || productColors.includes(selectedColor);
        const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
        
        product.style.display = brandMatch && colorMatch && priceMatch ? 'block' : 'none';
    });
}

// Quick View Modal
const quickViewBtns = document.querySelectorAll('.action-btn[title="Quick View"]');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productId = productCard.dataset.productId;
        
        // Here you would typically fetch product details from an API
        // For now, we'll just show the modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add to Cart Functionality
const addToCartBtns = document.querySelectorAll('.action-btn.add-to-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productId = productCard.dataset.productId;
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        // Here you would typically add the product to the cart
        // For now, we'll just show a notification
        showNotification(`Added ${productName} to cart`);
    });
});

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
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

// Wishlist Functionality
const wishlistBtns = document.querySelectorAll('.action-btn.wishlist-btn');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            showNotification('Added to wishlist');
        } else {
            showNotification('Removed from wishlist');
        }
    });
}); 