document.addEventListener("DOMContentLoaded", function () {
    // ===== COPYRIGHT YEAR =====
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.innerHTML = `&copy; ${new Date().getFullYear()}`;
    }

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    highlightActiveNavLink();

    // ===== SCROLL ANIMATIONS =====
    observeElements();

    // ===== FORM VALIDATION & FEEDBACK =====
    setupFormValidation();

    // ===== SEO: ADD STRUCTURED DATA =====
    addStructuredData();

    // ===== SMOOTH SCROLLING =====
    enableSmoothScroll();
});

// ===== HIGHLIGHT ACTIVE NAV LINK =====
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href.includes('index.html'))) {
            link.classList.add('active');
            link.style.color = '#ffb700';
            link.style.fontWeight = 'bold';
        }
    });
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards, images, and text sections
    const elementsToObserve = document.querySelectorAll(
        '.card, .col, img[loading="lazy"], .container > div'
    );
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // Name validation
        if (nameInput && nameInput.value.trim().length < 2) {
            showError(nameInput, 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        } else if (nameInput) {
            clearError(nameInput);
        }

        // Email validation
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput);
            }
        }

        // Message validation
        if (messageInput && messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        } else if (messageInput) {
            clearError(messageInput);
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    // Real-time validation feedback
    document.querySelectorAll('.fs-input, .fs-textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value) && this.value) {
                    showError(this, 'Invalid email format');
                } else {
                    clearError(this);
                }
            } else if (this.id === 'name' && this.value.trim().length > 0) {
                if (this.value.trim().length < 2) {
                    showError(this, 'Name too short');
                } else {
                    clearError(this);
                }
            }
        });
    });
}

function showError(input, message) {
    const errorClass = 'is-invalid';
    input.classList.add(errorClass);
    
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('small');
        errorMsg.className = 'error-message';
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
    }
    errorMsg.textContent = message;
    errorMsg.style.color = '#dc3545';
    errorMsg.style.display = 'block';
}

function clearError(input) {
    input.classList.remove('is-invalid');
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
}

// ===== SEO: STRUCTURED DATA (JSON-LD) =====
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Head-Start Web Development",
        "url": "https://headstartwebdevelopment.com",
        "logo": "https://headstartwebdevelopment.com/Logo/Logo.png",
        "description": "Affordable web design and development services for small businesses",
        "telephone": "07754858861",
        "email": "headstartwebdevelopment@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "UK"
        },
        "sameAs": [
            "https://www.instagram.com/headstart_webdevelopment"
        ],
        "areaServed": "UK",
        "priceRange": "£250-£1000"
    });
    document.head.appendChild(script);
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

