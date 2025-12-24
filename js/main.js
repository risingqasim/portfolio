// ============================================
// Initialize AOS (Animate On Scroll)
// ============================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuToggle = document.getElementById('menuToggle');
const menuDropdown = document.getElementById('menuDropdown');
const bookMeetingBtn = document.getElementById('bookMeetingBtn');
const menuLinks = document.querySelectorAll('.menu-link');
const menuBtnBook = document.querySelector('.menu-btn-book');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Menu dropdown toggle
if (menuToggle && menuDropdown) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuDropdown.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking on menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuDropdown.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking on menu book button
    if (menuBtnBook) {
        menuBtnBook.addEventListener('click', (e) => {
            e.preventDefault();
            menuDropdown.classList.remove('active');
            menuToggle.classList.remove('active');
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Book meeting button - scroll to contact section
if (bookMeetingBtn) {
    bookMeetingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Auto-Changing Typing Animation for Hero Title
// ============================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    // Array of texts to cycle through
    const texts = [
        'Full-Stack .NET Developer',
        'scalable web applications',
        'ASP.NET Core',
        'Modern Frameworks'
    ];
    
    // Attractive color gradients for each text (matching portfolio theme)
    const textColors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient for .NET Developer
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink-red gradient for scalable apps
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue gradient for ASP.NET Core
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'  // Green-teal gradient for Modern Frameworks
    ];
    
    // Cursor colors matching each text color (solid colors from gradients)
    const cursorColors = [
        '#667eea', // Purple for .NET Developer
        '#f093fb', // Pink for scalable apps
        '#4facfe', // Blue for ASP.NET Core
        '#43e97b'  // Green for Modern Frameworks
    ];
    
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Typing speed in milliseconds
    let deletingSpeed = 50; // Deleting speed (faster)
    let pauseTime = 2000; // Pause time after completing a text (in milliseconds)
    
    // Function to apply color to text and cursor
    function applyColor(colorIndex) {
        // Apply gradient to text
        typingText.style.background = textColors[colorIndex];
        typingText.style.webkitBackgroundClip = 'text';
        typingText.style.webkitTextFillColor = 'transparent';
        typingText.style.backgroundClip = 'text';
        
        // Update cursor color to match using CSS variable for smooth animation
        typingText.style.setProperty('--cursor-color', cursorColors[colorIndex]);
        typingText.style.borderRightColor = cursorColors[colorIndex];
    }
    
    function typeWriter() {
        const currentText = texts[currentTextIndex];
        
        if (!isDeleting) {
            // Typing phase
            if (currentCharIndex < currentText.length) {
                // Apply color when starting to type new text
                if (currentCharIndex === 0) {
                    applyColor(currentTextIndex);
                }
                typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Finished typing, wait before deleting
                isDeleting = true;
                setTimeout(typeWriter, pauseTime);
            }
        } else {
            // Deleting phase
            if (currentCharIndex > 0) {
                typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(typeWriter, deletingSpeed);
            } else {
                // Finished deleting, move to next text
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typeWriter, 300); // Small pause before typing next text
            }
        }
    }
    
    // Initialize with empty text
    typingText.textContent = '';
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typeWriter();
    }, 500);
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for custom animations
document.querySelectorAll('.glass-card, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// Skill Cards Hover Effect
// ============================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Project Cards Enhanced Animations
// ============================================
const projectCards = document.querySelectorAll('.project-card');

// Intersection Observer for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Enhanced hover effects with glow
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ============================================
// Statistics Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target, number, 2000);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Gradient Orb Animation Enhancement
// ============================================
const gradientOrbs = document.querySelectorAll('.gradient-orb');
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    gradientOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * 100 * speed;
        const y = (mouseY - 0.5) * 100 * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================
// Cursor Effect (Optional Enhancement)
// ============================================
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
`;
document.body.appendChild(cursor);

// Show cursor on desktop only
if (window.matchMedia('(min-width: 769px)').matches) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Cursor hover effects
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(99, 102, 241, 1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        });
    });
}

// ============================================
// Loading Animation (Optional)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            description: document.getElementById('description').value
        };
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.description}`);
        const mailtoLink = `mailto:qasimmughal7244@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message (optional)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>MESSAGE SENT!</span><i class="fas fa-check"></i>';
        submitBtn.style.borderColor = 'rgba(34, 197, 94, 0.5)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }, 3000);
    });
}

// ============================================
// Circular Rotating Text Animation
// ============================================
(function() {
    // Wait for DOM to be fully loaded before initializing
    function initCircularText() {
        // Get the circular text container
        const circularTextContainer = document.getElementById('circularTextContainer');
        const circularText = document.getElementById('circularText');
        
        if (!circularTextContainer || !circularText) {
            return; // Exit if elements don't exist
        }
        
        if (!circularTextContainer || !circularText) {
            return; // Exit if elements don't exist
        }
        
        // Name to display in circular format
        const name = 'Muhammad Qasim';
        const letters = name.split('');
        
        // Replace spaces with dot separator and add dot after last word
        // Count letters and dots (but not original spaces) for angle calculation
        const items = []; // Will contain letters and dots
        letters.forEach((letter, index) => {
            if (letter === ' ') {
                // Add a dot separator where space occurs
                items.push('•'); // Middle dot character
            } else {
                items.push(letter);
            }
        });
        // Add dot after the last word (after "Qasim")
        items.push('•');
        
        // Initialize container size - get actual size or use default
        // Use requestAnimationFrame to ensure layout is calculated
        let containerSize = 200; // Default base size (matches CSS)
        const computedStyle = window.getComputedStyle(circularTextContainer);
        const width = parseFloat(computedStyle.width);
        if (!isNaN(width) && width > 0) {
            containerSize = width;
        } else if (circularTextContainer.offsetWidth > 0) {
            containerSize = circularTextContainer.offsetWidth;
        }
        
        const radius = containerSize / 2 - (containerSize * 0.12); // 12% padding for better spacing
        
        // Calculate angle increment for each item (letters + dots)
        const angleIncrement = 360 / items.length;
        
        // Create span elements for each letter/dot and position them in a circle
        items.forEach((item, index) => {
            // Create span element for the letter or dot
            const span = document.createElement('span');
            span.textContent = item;
            span.style.position = 'absolute';
            span.style.whiteSpace = 'nowrap';
            
            // Add special class for dots to style them differently
            if (item === '•') {
                span.classList.add('circular-separator');
            }
            
            // Calculate angle for this item (start from top, go clockwise)
            // Adjust starting angle to position first letter at top (-90 degrees)
            const angleRad = (angleIncrement * index - 90) * (Math.PI / 180); // Convert to radians
            const angleDeg = angleIncrement * index - 90; // Angle in degrees
            
            // Calculate x and y positions relative to container center
            // Position at the radius distance from center
            const x = containerSize / 2 + radius * Math.cos(angleRad);
            const y = containerSize / 2 + radius * Math.sin(angleRad);
            
            // Set absolute position - center of the letter/dot will be at this point
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            span.style.transformOrigin = 'center center';
            
            // Rotate each letter/dot to be tangent to the circle (base faces inward toward center)
            // Add 90 degrees to make letter perpendicular to radius (tangent to circle)
            const rotationAngle = angleDeg + 90;
            span.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
            
            // Add letter/dot to the circular text container
            circularText.appendChild(span);
        });
        
        // Rotation speed control
        let isFastRotation = false;
        const skillsSection = document.getElementById('skills');
        const circularTextElement = circularText;
        
        /**
         * Update rotation speed based on Skills section visibility/hover
         */
        function updateRotationSpeed() {
            // Check if Skills section is in viewport or hovered
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                
                // Also check if hovering over skills section
                const isHovered = skillsSection.matches(':hover');
                
                if ((isInViewport || isHovered) && !isFastRotation) {
                    // Enable fast rotation
                    isFastRotation = true;
                    circularTextElement.classList.add('fast-rotation');
                } else if (!isInViewport && !isHovered && isFastRotation) {
                    // Return to normal rotation
                    isFastRotation = false;
                    circularTextElement.classList.remove('fast-rotation');
                }
            }
        }
        
        // Listen for scroll events to check Skills section visibility
        window.addEventListener('scroll', updateRotationSpeed, { passive: true });
        
        // Listen for mouse enter/leave on Skills section
        if (skillsSection) {
            skillsSection.addEventListener('mouseenter', () => {
                isFastRotation = true;
                circularTextElement.classList.add('fast-rotation');
            });
            
            skillsSection.addEventListener('mouseleave', () => {
                // Only remove fast rotation if Skills section is not in viewport
                const rect = skillsSection.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (!isInViewport) {
                    isFastRotation = false;
                    circularTextElement.classList.remove('fast-rotation');
                }
            });
        }
        
        // Initial check
        updateRotationSpeed();
        
        // Handle responsive resize - recalculate positions if container size changes
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Get current container size
                const currentSize = circularTextContainer.offsetWidth || 200;
                const currentRadius = currentSize / 2 - (currentSize * 0.12); // 12% padding
                
                // Update letter positions
                const spans = circularText.querySelectorAll('span');
                spans.forEach((span, index) => {
                    const angleRad = (angleIncrement * index - 90) * (Math.PI / 180);
                    const angleDeg = angleIncrement * index - 90;
                    const x = currentSize / 2 + currentRadius * Math.cos(angleRad);
                    const y = currentSize / 2 + currentRadius * Math.sin(angleRad);
                    
                    span.style.left = x + 'px';
                    span.style.top = y + 'px';
                    
                    // Update rotation to be tangent to circle
                    const rotationAngle = angleDeg + 90;
                    span.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
                });
            }, 250);
        }, { passive: true });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCircularText);
    } else {
        // DOM is already ready, initialize immediately
        initCircularText();
    }
})();

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
function toggleScrollToTop() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// Smooth scroll to top
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide on scroll
    window.addEventListener('scroll', toggleScrollToTop);
    
    // Initial check
    toggleScrollToTop();
}

// ============================================
// Console Message (Developer Easter Egg)
// ============================================
console.log('%c👋 Hello! Welcome to my portfolio.', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');
console.log('%cLet\'s connect!', 'color: #ec4899; font-size: 12px;');

