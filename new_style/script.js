// Jekyll Academic Theme - Navigation & Interactions
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const contactForm = document.getElementById('contactForm');

    // Initialize
    init();

    function init() {
        setupNavigation();
        setupMobileMenu();
        setupContactForm();
        setupScrollEffects();
        setupAccessibility();
        
        // Show initial section
        showSection('about');
        
        console.log('Jekyll Academic Theme loaded successfully! 🎓');
    }

    // Navigation System
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                showSection(sectionId);
                
                // Close mobile menu if open
                if (sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }

    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to top of main content
            document.querySelector('.main-content').scrollTop = 0;
        }
        
        // Update active navigation link
        updateActiveNavLink(sectionId);
        
        // Update document title
        updateDocumentTitle(sectionId);
        
        // Track analytics (if needed)
        trackSectionView(sectionId);
    }

    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    function updateDocumentTitle(sectionId) {
        const sectionTitles = {
            'about': 'About - Shashank Dammalapati',
            'news': 'News - Shashank Dammalapati',
            'publications': 'Publications - Shashank Dammalapati',
            'experience': 'Experience - Shashank Dammalapati',
            'projects': 'Projects - Shashank Dammalapati',
            'contact': 'Contact - Shashank Dammalapati'
        };
        
        document.title = sectionTitles[sectionId] || 'Shashank Dammalapati';
    }

    // Mobile Menu
    function setupMobileMenu() {
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                
                // Update aria attributes for accessibility
                const isOpen = sidebar.classList.contains('open');
                this.setAttribute('aria-expanded', isOpen);
                
                // Update icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
                }
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Contact Form
    function setupContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleContactFormSubmission();
            });
        }
    }

    function handleContactFormSubmission() {
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validation
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Create mailto link
        const mailtoSubject = encodeURIComponent(subject || `Message from ${name}`);
        const mailtoBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from shashankyld.github.io`
        );
        const mailtoLink = `mailto:shashank.dammalapati@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success feedback
        showFormFeedback('success', 'Thank you! Your email client should open now.');
        
        // Reset form
        contactForm.reset();
    }

    function validateForm(name, email, subject, message) {
        if (!name || !email || !message) {
            showFormFeedback('error', 'Please fill in all required fields.');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showFormFeedback('error', 'Please enter a valid email address.');
            return false;
        }
        
        if (message.length < 10) {
            showFormFeedback('error', 'Please enter a longer message (at least 10 characters).');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormFeedback(type, message) {
        // Remove existing feedback
        const existingFeedback = contactForm.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            padding: 0.75rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert feedback
        contactForm.insertBefore(feedback, contactForm.firstChild);
        
        // Remove feedback after 5 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 5000);
    }

    // Scroll Effects and Animations
    function setupScrollEffects() {
        // Smooth hover effects for cards
        const hoverElements = document.querySelectorAll('.project-item, .publication-item, .experience-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Accessibility Features
    function setupAccessibility() {
        // Keyboard navigation
        navLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Focus management
        setupFocusManagement();
        
        // Screen reader announcements
        setupScreenReaderAnnouncements();
    }

    function setupFocusManagement() {
        // When section changes, focus the main heading
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' &&
                    mutation.target.classList.contains('active')) {
                    
                    const heading = mutation.target.querySelector('h2');
                    if (heading) {
                        heading.setAttribute('tabindex', '-1');
                        heading.focus();
                    }
                }
            });
        });
        
        contentSections.forEach(section => {
            observer.observe(section, { attributes: true });
        });
    }

    function setupScreenReaderAnnouncements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
        
        // Announce section changes
        window.announceToScreenReader = function(message) {
            liveRegion.textContent = message;
        };
    }

    // Utility Functions
    function trackSectionView(sectionId) {
        // Analytics tracking (implement as needed)
        console.log(`Section viewed: ${sectionId}`);
        
        // Google Analytics example (uncomment if using GA)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'page_view', {
        //         page_title: sectionId,
        //         page_location: window.location.href + '#' + sectionId
        //     });
        // }
    }

    // Social link tracking
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'Unknown';
            console.log(`Social link clicked: ${platform}`);
            
            // Analytics tracking (implement as needed)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         event_category: 'Social',
            //         event_label: platform
            //     });
            // }
        });
    });

    // External link tracking
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            console.log(`External link clicked: ${url}`);
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Error handling for images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
            
            // Add fallback text
            const fallback = document.createElement('div');
            fallback.textContent = 'Image not available';
            fallback.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 150px;
                background: #f8f9fa;
                color: #6c757d;
                border: 1px solid #e9ecef;
                border-radius: 4px;
            `;
            this.parentNode.insertBefore(fallback, this.nextSibling);
        });
    });

    // Responsive handling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        }, 250);
    });

    // Print functionality
    window.addEventListener('beforeprint', function() {
        // Show all sections for printing
        contentSections.forEach(section => {
            section.style.display = 'block';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore section visibility
        contentSections.forEach(section => {
            section.style.display = section.classList.contains('active') ? 'block' : 'none';
        });
    });

    // Expose global functions for external use
    window.showSection = showSection;
    window.updateActiveNavLink = updateActiveNavLink;
});
