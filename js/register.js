document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.register-steps .step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 0;

    // Next button click
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateSteps();
            }
        });
    });

    // Previous button click
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateSteps();
        });
    });

    // Update steps visibility
    function updateSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            stepIndicators[index].classList.remove('active');
        });
        steps[currentStep].classList.add('active');
        stepIndicators[currentStep].classList.add('active');
    }

    // Validate each step
    function validateStep(step) {
        const currentStepEl = steps[step];
        const inputs = currentStepEl.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
            }
        });

        // Additional validations
        if (step === 0) {
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');

            if (!validateEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            }

            if (password.value !== confirmPassword.value) {
                isValid = false;
                showError(confirmPassword, 'Passwords do not match');
            }
        }

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
        input.classList.remove('error');
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Password strength
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', () => {
        const strength = checkPasswordStrength(passwordInput.value);
        updatePasswordStrength(strength);
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    }

    function updatePasswordStrength(strength) {
        const colors = ['#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d'];
        const messages = ['Weak', 'Fair', 'Good', 'Strong'];
        
        strengthBar.style.width = `${(strength / 4) * 100}%`;
        strengthBar.style.background = colors[strength - 1] || '#e1e1e1';
        strengthText.textContent = messages[strength - 1] || 'Password strength';
    }
}); 