document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });
    
    // Handle form submissions that should navigate
    const navForms = document.querySelectorAll('form[data-navigate]');
    
    navForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-navigate');
            if (targetPage) {
                navigateTo(targetPage);
            }
        });
    });
    
    // Product cards navigation
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a button inside the card
            if (e.target.closest('button')) return;
            
            navigateTo('../pages/product.html');
        });
    });
    
    // Navigation function
    function navigateTo(path) {
        // In a real application, this would use history.pushState
        // For now, we'll just redirect
        window.location.href = path;
    }
    
    // Handle multi-step forms (like in registration)
    setupMultiStepForms();
});

function setupMultiStepForms() {
    const multiStepForms = document.querySelectorAll('.multi-step-form');
    
    multiStepForms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const nextBtns = form.querySelectorAll('.next-step');
        const prevBtns = form.querySelectorAll('.prev-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        
        let currentStep = 0;
        
        // Initialize
        showStep(currentStep);
        
        // Next button handlers
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
        
        // Previous button handlers
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentStep--;
                showStep(currentStep);
            });
        });
        
        function showStep(stepIndex) {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
            
            if (progressSteps) {
                progressSteps.forEach((step, index) => {
                    step.classList.toggle('active', index <= stepIndex);
                });
            }
        }
        
        function validateStep(stepIndex) {
            const currentStepEl = steps[stepIndex];
            const requiredFields = currentStepEl.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            return valid;
        }
    });
} 