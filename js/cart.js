class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.id === product.id && 
            item.color === product.color && 
            item.size === product.size
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.updateTotal();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartCount();
        this.updateTotal();
    }

    updateQuantity(index, quantity) {
        if (quantity > 0) {
            this.items[index].quantity = quantity;
            this.saveCart();
            this.updateTotal();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0
        );
        
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.updateTotal();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = getProductDetails(this);
            cart.addItem(product);
            showNotification('Added to cart!');
        });
    });
});

function getProductDetails(button) {
    const productCard = button.closest('.product-card') || button.closest('.product-info');
    return {
        id: productCard.dataset.productId,
        name: productCard.querySelector('h3').textContent,
        price: productCard.querySelector('.current-price').textContent,
        color: productCard.querySelector('.color-btn.active')?.dataset.color || 'Default',
        size: productCard.querySelector('.size-btn.active')?.dataset.size || 'One Size',
        quantity: parseInt(productCard.querySelector('.quantity-selector input')?.value || 1),
        image: productCard.querySelector('img').src
    };
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        window.location.href = `/pages/search.html?q=${encodeURIComponent(searchTerm)}`;
    }
} 