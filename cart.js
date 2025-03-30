// Cart State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartOverlay = document.getElementById('cartOverlay');
const emptyCartOverlay = document.getElementById('emptyCartOverlay');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartSummary = document.querySelector('.cart-summary');

// Show/Hide Cart
function toggleCart(show) {
    if (cart.length === 0) {
        emptyCartOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    } else {
        cartOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    }
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

// Calculate Cart Totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total
    };
}

// Update Cart Summary
function updateCartSummary() {
    const { subtotal, tax, total } = calculateTotals();
    
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>Free</span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>
        <button class="checkout-btn">
            <i class="fas fa-lock"></i>
            Proceed to Checkout
        </button>
    `;
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-variant">${item.variant}</p>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" max="10" onchange="updateQuantityInput(${index}, this.value)">
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(product) {
    const existingItem = cart.find(item => 
        item.id === product.id && item.variant === product.variant
    );

    if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, 10);
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`Added ${product.name} to cart`);
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Item removed from cart');
}

// Update Quantity
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
        cart[index].quantity = newQuantity;
        updateCart();
    }
}

// Update Quantity Input
function updateQuantityInput(index, value) {
    const quantity = parseInt(value);
    if (quantity >= 1 && quantity <= 10) {
        cart[index].quantity = quantity;
        updateCart();
    }
}

// Update Cart
function updateCart() {
    renderCartItems();
    updateCartSummary();
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show Notification
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    updateCart();

    // Cart toggle buttons
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.getElementById('closeCart');
    const closeEmptyCart = document.getElementById('closeEmptyCart');

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart(true);
    });

    closeCart.addEventListener('click', () => {
        toggleCart(false);
    });

    closeEmptyCart.addEventListener('click', () => {
        toggleCart(false);
    });

    // Close cart when clicking outside
    [cartOverlay, emptyCartOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                toggleCart(false);
            }
        });
    });

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            const product = {
                id: productCard.dataset.productId,
                name: productCard.querySelector('.product-title').textContent,
                price: parseInt(productCard.querySelector('.current-price').textContent.replace(/[^0-9]/g, '')),
                image: productCard.querySelector('.product-image img').src,
                variant: productCard.querySelector('.product-category').textContent
            };
            addToCart(product);
        });
    });
}); 