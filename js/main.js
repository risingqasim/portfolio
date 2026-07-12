// ============================================
// Theme Toggle (Dark / Light Mode)
// ============================================
(function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');

    if (initial === 'dark') {
        root.setAttribute('data-theme', 'dark');
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) {
            root.removeAttribute('data-theme');
            toggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            toggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
})();

// ============================================
// Navigation
// ============================================
const siteNav = document.getElementById('siteNav');
const siteHamburger = document.getElementById('siteHamburger');
const mobmenu = document.getElementById('mobmenu');
const navLinks = document.querySelectorAll('.navlinks a, .mobmenu a');

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Navbar scroll shadow
if (siteNav) {
    const handleNavScroll = throttle(() => {
        siteNav.classList.toggle('sc', window.scrollY > 50);
    }, 100);
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
}

// Mobile menu toggle
if (siteHamburger && mobmenu) {
    siteHamburger.addEventListener('click', () => {
        mobmenu.classList.toggle('on');
    });

    mobmenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobmenu.classList.remove('on');
        });
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], #contact');

function activateNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.navlinks a').forEach((link) => {
                link.classList.remove('on');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('on');
                }
            });
        }
    });
}

window.addEventListener('scroll', throttle(activateNavLink, 150), { passive: true });

// Smooth scroll for nav links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// Scroll Reveal (.rev elements)
// ============================================
const revEls = document.querySelectorAll('.rev');

if (revEls.length && 'IntersectionObserver' in window) {
    const revObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    revObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revEls.forEach((el) => revObserver.observe(el));
} else {
    revEls.forEach((el) => el.classList.add('in'));
}

// ============================================
// Skill Bar Animation
// ============================================
const skillBars = document.querySelectorAll('.bar-f');

if (skillBars.length && 'IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-w') || '0';
                    bar.style.width = `${width}%`;
                    barObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillBars.forEach((bar) => barObserver.observe(bar));
}

// ============================================
// Service cards → contact scroll
// ============================================
document.querySelectorAll('.svc').forEach((card) => {
    card.addEventListener('click', () => {
        const contact = document.getElementById('contact');
        if (contact) {
            const top = contact.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// Team Projects
// Optional fields per project:
//   backendRepo, frontendRepo (URL strings)
//   backendPrivate, frontendPrivate (true/false)
//   backendLabel, frontendLabel (custom button text)
// Private repos show a badge instead of a GitHub link.
// ============================================
const teamProjects = [
    {
        title: 'Online Banking App for Online Clients 🏦',
        description:
            'Team-built online banking platform for digital clients — Angular frontend with a separate ASP.NET Web API backend for secure banking workflows.',
        tags: ['Angular', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/cxp_api',
        frontendRepo: 'https://github.com/risingqasim/alpha_bank_client',
        backendPrivate: false,
        frontendPrivate: false,
    },
    {
        title: 'J Ticket — Ticket Creating System 🎫',
        description:
            'Team-built ticketing platform for creating and managing support tickets — React frontend with a separate ASP.NET Web API backend.',
        tags: ['React', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/Jtickets_API',
        frontendRepo: 'https://github.com/risingqasim/Jtickets_Client',
        backendPrivate: false,
        frontendPrivate: false,
    },
    {
        title: 'Temperature Management System — Abbott Laboratories 🌡️',
        description:
            'Team-built temperature monitoring system for Abbott Laboratories — PLC and Windows Services for industrial control, with a WinForms app for real-time temperature tracking.',
        tags: ['PLC', 'Windows Services', 'WinForms', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/Abboot_',
        frontendRepo: 'https://github.com/risingqasim/W_sens',
        backendLabel: 'Windows Services & PLC',
        frontendLabel: 'WinForms App',
        backendPrivate: false,
        frontendPrivate: false,
    },
    {
        title: 'MedBook 📚',
        description:
            'Team-built medical booking platform — Angular frontend with a separate ASP.NET Web API backend for appointments and healthcare workflows.',
        tags: ['Angular', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/medbook_api',
        frontendRepo: 'https://github.com/risingqasim/medbook_app',
        backendPrivate: false,
        frontendPrivate: false,
    },
];

function buildRepoAction(label, url, isPrivate) {
    if (!url) return '';

    if (isPrivate) {
        return `<span class="prepo-private" title="Code available on request">${label}: Private Repository</span>`;
    }

    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="prepo-btn"><span>${label}</span><span class="prepo-arr">↗</span></a>`;
}

function renderTeamProjects() {
    const list = document.getElementById('teamProjectsList');
    if (!list || !teamProjects.length) return;

    list.innerHTML = teamProjects
        .map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            const tags = (project.tags || [])
                .map((tag) => `<span class="ptag">${tag}</span>`)
                .join('');

            const backendLabel = project.backendLabel || 'Backend Repository';
            const frontendLabel = project.frontendLabel || 'Frontend Repository';

            const repos = [
                buildRepoAction(backendLabel, project.backendRepo, project.backendPrivate),
                buildRepoAction(frontendLabel, project.frontendRepo, project.frontendPrivate),
            ]
                .filter(Boolean)
                .join('');

            const legacyRepo =
                !project.backendRepo && !project.frontendRepo && project.github
                    ? buildRepoAction('GitHub Repository', project.github, project.private)
                    : '';

            const actions = repos || legacyRepo;

            return `
                <div class="prow prow--multi">
                    <div class="pnum">${num}</div>
                    <div>
                        <div class="ptitle">${project.title}</div>
                        <div class="pdesc">${project.description}</div>
                        ${tags ? `<div class="ptags2">${tags}</div>` : ''}
                        ${actions ? `<div class="prepos prepos--mobile">${actions}</div>` : ''}
                    </div>
                    ${actions ? `<div class="prow-actions">${actions}</div>` : '<div class="parr">↗</div>'}
                </div>
            `;
        })
        .join('');
}

renderTeamProjects();
