document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}Form`).classList.add('active');
        });
    });

    // Password visibility toggle
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            const icon = button.querySelector('i');
            
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

    // Password validation
    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return minLength && hasUpperCase && hasNumber && hasSpecial;
    }

    // Mobile number validation
    function validateMobile(mobile) {
        return /^[6-9]\d{9}$/.test(mobile);
    }

    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Here you would typically make an API call to your backend
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Store auth token
                localStorage.setItem('authToken', data.token);
                // Redirect to dashboard or home
                window.location.href = '/';
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            showNotification('error', error.message || 'Login failed. Please try again.');
        }
    });

    // Sign up form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const mobile = document.getElementById('signupMobile').value;
        const password = document.getElementById('signupPassword').value;
        const termsAgreed = document.getElementById('termsAgree').checked;

        // Validate inputs
        if (!validateEmail(email)) {
            showNotification('error', 'Please enter a valid email address');
            return;
        }

        if (!validateMobile(mobile)) {
            showNotification('error', 'Please enter a valid 10-digit mobile number');
            return;
        }

        if (!validatePassword(password)) {
            showNotification('error', 'Password does not meet the requirements');
            return;
        }

        if (!termsAgreed) {
            showNotification('error', 'Please agree to the Terms & Conditions');
            return;
        }

        try {
            // Here you would typically make an API call to your backend
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Store auth token
                localStorage.setItem('authToken', data.token);
                // Show success message and redirect
                showNotification('success', 'Account created successfully!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            showNotification('error', error.message || 'Registration failed. Please try again.');
        }
    });

    // Social auth buttons
    document.querySelectorAll('.btn-social').forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'google' : 'facebook';
            // Here you would typically redirect to your OAuth provider
            window.location.href = `/api/auth/${provider}`;
        });
    });

    // Notification system
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}); 