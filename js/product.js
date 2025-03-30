document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initImageGallery();
    initZoomFeature();
    initQuantityControls();
    initColorAndSizeSelection();
    initCountdownTimer();
    initAddToCart();
    initTabs();
});

// Image Gallery
function initImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.querySelector('img').src;
            
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Reset zoom
            if (window.innerWidth > 992) {
                initZoomFeature();
            }
        });
    });
}

// Image Zoom Feature
function initZoomFeature() {
    const mainImage = document.getElementById('mainImage');
    const zoomLens = document.querySelector('.zoom-lens');
    const zoomResult = document.querySelector('.zoom-result');
    
    if (window.innerWidth <= 992) return; // Disable on mobile
    
    let cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
    let cy = zoomResult.offsetHeight / zoomLens.offsetHeight;
    
    // Set background
    zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    zoomResult.style.backgroundSize = `${mainImage.width * cx}px ${mainImage.height * cy}px`;
    
    // Mouse events
    mainImage.addEventListener('mousemove', moveLens);
    mainImage.addEventListener('mouseenter', () => {
        zoomLens.style.display = 'block';
        zoomResult.style.display = 'block';
    });
    mainImage.addEventListener('mouseleave', () => {
        zoomLens.style.display = 'none';
        zoomResult.style.display = 'none';
    });
    
    function moveLens(e) {
        let pos = getCursorPos(e);
        let x = pos.x - (zoomLens.offsetWidth / 2);
        let y = pos.y - (zoomLens.offsetHeight / 2);
        
        // Prevent lens from going outside image
        if (x > mainImage.width - zoomLens.offsetWidth) {x = mainImage.width - zoomLens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > mainImage.height - zoomLens.offsetHeight) {y = mainImage.height - zoomLens.offsetHeight;}
        if (y < 0) {y = 0;}
        
        // Set lens position
        zoomLens.style.left = x + "px";
        zoomLens.style.top = y + "px";
        
        // Set result background position
        zoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }
    
    function getCursorPos(e) {
        let rect = mainImage.getBoundingClientRect();
        let x = e.pageX - rect.left - window.pageXOffset;
        let y = e.pageY - rect.top - window.pageYOffset;
        return {x, y};
    }
}

// Quantity Controls
function initQuantityControls() {
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.quantity-selector input');
    const maxQty = parseInt(qtyInput.getAttribute('max')) || 10;
    
    minusBtn.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;
            updateAddToCartState();
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty < maxQty) {
            qtyInput.value = currentQty + 1;
            updateAddToCartState();
        }
    });
    
    qtyInput.addEventListener('change', () => {
        let value = parseInt(qtyInput.value);
        if (value < 1) qtyInput.value = 1;
        if (value > maxQty) qtyInput.value = maxQty;
        updateAddToCartState();
    });
}

// Color and Size Selection
function initColorAndSizeSelection() {
    const colorBtns = document.querySelectorAll('.color-btn');
    const sizeBtns = document.querySelectorAll('.size-btn:not(.disabled)');
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateAddToCartState();
        });
    });
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateAddToCartState();
        });
    });
}

// Countdown Timer
function initCountdownTimer() {
    const countdown = document.querySelector('.countdown');
    const endDate = new Date(countdown.dataset.end).getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            countdown.innerHTML = 'Offer Expired';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdown.querySelector('.days').textContent = String(days).padStart(2, '0');
        countdown.querySelector('.hours').textContent = String(hours).padStart(2, '0');
        countdown.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
        countdown.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Add to Cart Functionality
function initAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    
    addToCartBtn.addEventListener('click', () => {
        if (validateSelection()) {
            const product = getSelectedProduct();
            addProductToCart(product);
            updateCartCount();
            showNotification('Product added to cart!');
        }
    });
    
    buyNowBtn.addEventListener('click', () => {
        if (validateSelection()) {
            const product = getSelectedProduct();
            addProductToCart(product);
            window.location.href = '/checkout.html';
        }
    });
}

function validateSelection() {
    const color = document.querySelector('.color-btn.active');
    const size = document.querySelector('.size-btn.active');
    
    if (!color || !size) {
        showNotification('Please select color and size', 'error');
        return false;
    }
    return true;
}

function getSelectedProduct() {
    return {
        id: '1',
        name: document.querySelector('.product-header h1').textContent,
        price: document.querySelector('.current-price').textContent,
        color: document.querySelector('.color-btn.active').dataset.color,
        size: document.querySelector('.size-btn.active').dataset.size,
        quantity: parseInt(document.querySelector('.quantity-selector input').value),
        image: document.getElementById('mainImage').src
    };
}

function updateAddToCartState() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const isValid = validateSelection();
    
    addToCartBtn.disabled = !isValid;
    buyNowBtn.disabled = !isValid;
}

// Product Tabs
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent) || 0;
    cartCount.textContent = count + 1;
}

// Add this to your CSS for notifications
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: #2ecc71;
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.notification.error {
    background: #e74c3c;
}

.notification.show {
    transform: translateX(0);
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 