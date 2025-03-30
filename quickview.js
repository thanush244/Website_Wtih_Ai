// Quick View Modal Functionality
const modal = document.getElementById('quickviewModal');
const quickViewBtns = document.querySelectorAll('.quickview-btn');
const closeModal = document.querySelector('.close-modal');
const modalImage = modal.querySelector('.quickview-image img');
const modalThumbnails = modal.querySelectorAll('.thumbnail');
const modalTitle = modal.querySelector('.quickview-details h2');
const modalPrice = modal.querySelector('.quickview-details .price');
const modalRating = modal.querySelector('.quickview-details .product-rating');
const modalDescription = modal.querySelector('.quickview-details .description');
const modalColorOptions = modal.querySelector('.color-options');
const modalSizeOptions = modal.querySelector('.size-options');
const modalQuantity = modal.querySelector('.quantity input');
const modalAddToCart = modal.querySelector('.add-to-cart-btn');
const modalWishlist = modal.querySelector('.wishlist-btn');

// Show Quick View Modal
function showQuickView(product) {
    // Update modal content
    modalImage.src = product.image;
    modalTitle.textContent = product.name;
    modalPrice.innerHTML = `
        <span class="current-price">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
    `;
    modalRating.innerHTML = generateRatingStars(product.rating);
    modalDescription.textContent = product.description;

    // Update thumbnails
    updateThumbnails(product.images);

    // Update color options
    updateColorOptions(product.colors);

    // Update size options
    updateSizeOptions(product.sizes);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update Thumbnails
function updateThumbnails(images) {
    modalThumbnails.forEach((thumb, index) => {
        if (images[index]) {
            thumb.querySelector('img').src = images[index];
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    });
}

// Update Color Options
function updateColorOptions(colors) {
    modalColorOptions.innerHTML = colors.map(color => `
        <span class="color-option" style="background: ${color};"></span>
    `).join('');
}

// Update Size Options
function updateSizeOptions(sizes) {
    modalSizeOptions.innerHTML = sizes.map(size => `
        <span class="size-option">${size}</span>
    `).join('');
}

// Generate Rating Stars
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    stars += `<span>(${rating})</span>`;

    return stars;
}

// Format Price
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Quick view buttons
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            const product = {
                id: productCard.dataset.productId,
                name: productCard.querySelector('.product-title').textContent,
                price: parseInt(productCard.querySelector('.current-price').textContent.replace(/[^0-9]/g, '')),
                originalPrice: parseInt(productCard.querySelector('.original-price')?.textContent.replace(/[^0-9]/g, '') || '0'),
                discount: productCard.querySelector('.discount')?.textContent.replace('% OFF', ''),
                rating: parseFloat(productCard.querySelector('.product-rating span').textContent.replace(/[()]/g, '')),
                description: 'Experience the future of smart wearables with this cutting-edge device. This product combines style and functionality, offering advanced features and seamless connectivity.',
                image: productCard.querySelector('.product-image img').src,
                images: [
                    productCard.querySelector('.product-image img').src,
                    'images/product-1-2.jpg',
                    'images/product-1-3.jpg'
                ],
                colors: ['#2c3e50', '#e74c3c', '#3498db'],
                sizes: ['Small', 'Medium', 'Large']
            };
            showQuickView(product);
        });
    });

    // Close modal button
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Thumbnail click
    modalThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            modalThumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            modalImage.src = thumb.querySelector('img').src;
        });
    });

    // Color options
    modalColorOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-option')) {
            modalColorOptions.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // Size options
    modalSizeOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-option')) {
            modalSizeOptions.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // Quantity controls
    const quantityInput = modalQuantity;
    const minusBtn = modal.querySelector('.qty-btn.minus');
    const plusBtn = modal.querySelector('.qty-btn.plus');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        quantityInput.value = value;
    });

    // Add to cart from modal
    modalAddToCart.addEventListener('click', () => {
        const selectedColor = modalColorOptions.querySelector('.color-option.active')?.style.background;
        const selectedSize = modalSizeOptions.querySelector('.size-option.active')?.textContent;
        const quantity = parseInt(quantityInput.value);

        // Here you would typically add the product to cart with the selected options
        showNotification(`Added ${quantity} item(s) to cart`);
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Wishlist toggle
    modalWishlist.addEventListener('click', () => {
        modalWishlist.classList.toggle('active');
        const isActive = modalWishlist.classList.contains('active');
        modalWishlist.querySelector('i').className = isActive ? 'fas fa-heart' : 'far fa-heart';
        showNotification(isActive ? 'Added to wishlist' : 'Removed from wishlist');
    });
}); 