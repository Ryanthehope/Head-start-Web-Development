document.addEventListener("DOMContentLoaded", function () {
    // ===== COPYRIGHT YEAR =====
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.textContent = new Date().getFullYear();
    }

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    highlightActiveNavLink();

    // ===== SCROLL ANIMATIONS =====
    observeElements();

    // ===== FORM VALIDATION & FEEDBACK =====
    setupFormValidation();

    // ===== SEO: ADD STRUCTURED DATA =====
    // Moved to HTML <head> tags for better crawlability
    // addStructuredData();

    // ===== SMOOTH SCROLLING =====
    enableSmoothScroll();
    
    // ===== PERFORMANCE: OPTIMIZE FONT LOADING =====
    optimizeFontLoading();
    
    // ===== COOKIE CONSENT =====
    checkCookieConsent();
    setupCookieButtons();
});

const TRACKING_CONFIG = {
    ga4MeasurementIds: ['G-N6MKJ0LSHL', 'G-HND1DBBSSD'],
    gtmContainerId: ''
};

// ===== PERFORMANCE UTILITIES =====

/**
 * Optimize font loading with font-display: swap
 * Ensures text is visible during font loading
 */
function optimizeFontLoading() {
    // Add font-display: swap to Google Fonts link if not already present
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('display=')) {
            link.setAttribute('href', href + '&display=swap');
        }
    });
}

// ===== HIGHLIGHT ACTIVE NAV LINK =====
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href.includes('index.html'))) {
            link.classList.add('active');
            link.style.color = '#fdcf4c';
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


// ===== COOKIE CONSENT & GDPR COMPLIANCE =====

/**
 * Setup event listeners for cookie consent buttons
 */
function setupCookieButtons() {
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const rejectBtn = document.getElementById('cookie-reject-btn');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectCookies);
    }
}

/**
 * Check if user has previously given/rejected cookie consent
 * Show banner if no consent recorded
 */
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const banner = document.getElementById('cookie-banner');

    if (!consent) {
        if (banner) {
            banner.style.display = 'block';
        }
    } else if (consent === 'accepted') {
        loadTracking();
    }
}

/**
 * User accepts cookies - store consent and load analytics
 */
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
    loadTracking();
}

/**
 * User rejects cookies - store rejection and hide banner
 */
function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
    // Do not load analytics
}

/**
 * Load tracking after user consent.
 * Prefer GTM when a container ID is configured, otherwise fall back to direct GA4.
 */
function loadTracking() {
    if (TRACKING_CONFIG.gtmContainerId) {
        loadGoogleTagManager(TRACKING_CONFIG.gtmContainerId);
        return;
    }

    if (TRACKING_CONFIG.ga4MeasurementIds && TRACKING_CONFIG.ga4MeasurementIds.length > 0) {
        TRACKING_CONFIG.ga4MeasurementIds.forEach(id => loadGoogleAnalytics(id));
    }
}

function loadGoogleAnalytics(measurementId) {
    if (document.querySelector(`script[data-ga-measurement="${measurementId}"]`)) {
        return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.dataset.gaMeasurement = measurementId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    const gtag = window.gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
}

function loadGoogleTagManager(containerId) {
    if (document.querySelector(`script[data-gtm-container="${containerId}"]`)) {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });

    const script = document.createElement('script');
    script.async = true;
    script.dataset.gtmContainer = containerId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);
}
