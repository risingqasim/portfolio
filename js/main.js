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

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

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
// Typing Animation for Hero Title
// ============================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

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
// Project Cards Parallax Effect
// ============================================
const projectCards = document.querySelectorAll('.project-card');
window.addEventListener('scroll', () => {
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const parallaxValue = scrollProgress * 20;
            card.style.transform = `translateY(${parallaxValue}px)`;
        }
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
// Form Handling (if contact form is added later)
// ============================================
// This can be expanded if a contact form is added

// ============================================
// Console Message (Developer Easter Egg)
// ============================================
console.log('%c👋 Hello! Welcome to my portfolio.', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');
console.log('%cLet\'s connect!', 'color: #ec4899; font-size: 12px;');

