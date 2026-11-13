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
        title: 'Multi-Tenant & Multi-Branch POS System 🏪',
        description:
            'Team-built cloud POS and restaurant management platform featuring multi-tenancy, multi-branch operations, real-time online order pipeline, live table occupancy, sales, expenses, and branch administration.',
        tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Multi-Tenant', 'Team'],
        liveUrl: 'https://aljannatapp.com/#/online-order',
        liveLabel: 'Live Demo',
    },
    {
        title: 'Online Banking App for Online Clients 🏦',
        description:
            'Team-built online banking platform for digital clients — Angular frontend with a separate ASP.NET Web API backend for secure banking workflows.',
        tags: ['Angular', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/cxp_api',
        frontendRepo: 'https://github.com/risingqasim/alpha_bank_client',
        backendPrivate: true,
        frontendPrivate: true,
    },
    {
        title: 'J Ticket — Ticket Creating System 🎫',
        description:
            'Team-built ticketing platform for creating and managing support tickets — React frontend with a separate ASP.NET Web API backend.',
        tags: ['React', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/Jtickets_API',
        frontendRepo: 'https://github.com/risingqasim/Jtickets_Client',
        backendPrivate: true,
        frontendPrivate: true,
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
        backendPrivate: true,
        frontendPrivate: true,
    },
    {
        title: 'MedBook 📚',
        description:
            'Team-built medical booking platform — Angular frontend with a separate ASP.NET Web API backend for appointments and healthcare workflows.',
        tags: ['Angular', 'ASP.NET Web API', 'C#', 'Team'],
        backendRepo: 'https://github.com/risingqasim/medbook_api',
        frontendRepo: 'https://github.com/risingqasim/medbook_app',
        backendPrivate: true,
        frontendPrivate: true,
    },
];

function buildRepoAction(label, url, isPrivate, projectTitle) {
    if (isPrivate) {
        const safeTitle = (projectTitle || 'Team Project').replace(/"/g, '&quot;');
        const safeLabel = (label || 'Repository').replace(/"/g, '&quot;');
        return `
            <button type="button" class="prepo-btn prepo-btn--private js-nda-trigger" data-project="${safeTitle}" data-repo="${safeLabel}" aria-label="View private repository details for ${safeTitle}">
                <span class="prepo-label-wrap">
                    <span>${label}</span>
                    <span class="prepo-nda-badge">Private / NDA</span>
                </span>
                <span class="prepo-lock" aria-hidden="true">🔒</span>
            </button>
        `;
    }

    if (!url) return '';

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
            const liveLabel = project.liveLabel || 'Live Demo';

            const repos = [
                project.liveUrl ? buildRepoAction(liveLabel, project.liveUrl, false, project.title) : '',
                buildRepoAction(backendLabel, project.backendRepo, project.backendPrivate, project.title),
                buildRepoAction(frontendLabel, project.frontendRepo, project.frontendPrivate, project.title),
            ]
                .filter(Boolean)
                .join('');

            const legacyRepo =
                !project.backendRepo && !project.frontendRepo && !project.liveUrl && project.github
                    ? buildRepoAction('GitHub Repository', project.github, project.private, project.title)
                    : '';

            const actions = repos || legacyRepo;
            const titleHtml = project.liveUrl
                ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none">${project.title}</a>`
                : project.title;

            return `
                <div class="prow prow--multi">
                    <div class="pnum">${num}</div>
                    <div>
                        <div class="ptitle">${titleHtml}</div>
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

// ============================================
// NDA Code Walkthrough Modal Logic
// ============================================
function initNDAModal() {
    const modal = document.getElementById('ndaModal');
    if (!modal) return;

    const backdrop = document.getElementById('ndaModalBackdrop');
    const closeBtn = document.getElementById('ndaModalClose');
    const cancelBtn = document.getElementById('ndaCancelBtn');
    const projectEl = document.getElementById('ndaModalProject');
    const walkthroughBtn = document.getElementById('ndaWalkthroughBtn');

    function openModal(projectTitle, repoName) {
        const cleanProject = projectTitle || 'Team Project';
        const cleanRepo = repoName || 'Private Repository';

        if (projectEl) {
            projectEl.textContent = `${cleanProject} · ${cleanRepo}`;
        }

        if (walkthroughBtn) {
            const subject = encodeURIComponent(`Code Walkthrough Request: ${cleanProject}`);
            const body = encodeURIComponent(
                `Hi Muhammad Qasim,\n\nI would like to request an architecture discussion and code walkthrough for your project: "${cleanProject}" (${cleanRepo}).\n\nLooking forward to speaking with you.\n\nBest regards,`
            );
            walkthroughBtn.href = `mailto:qasimmughal7244@gmail.com?subject=${subject}&body=${body}`;
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.js-nda-trigger');
        if (trigger) {
            e.preventDefault();
            const project = trigger.getAttribute('data-project');
            const repo = trigger.getAttribute('data-repo');
            openModal(project, repo);
        }
    });

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

initNDAModal();
