// LISIS Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar state on scroll (toggle .scrolled)
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-column').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Hero background slider
    (function initHeroSlider() {
        const hero = document.querySelector('.hero');
        const slides = document.querySelectorAll('.hero-slide');
        if (!hero || slides.length <= 1) return;

        let index = 0;
        const intervalMs = 6000;
        let timer = null;

        // Create arrows
        const arrows = document.createElement('div');
        arrows.className = 'hero-arrows';
        const prevBtn = document.createElement('button');
        prevBtn.className = 'hero-arrow prev';
        prevBtn.type = 'button';
        prevBtn.setAttribute('aria-label', 'Slide anterior');
        prevBtn.innerHTML = '<span aria-hidden="true">&#8249;</span>';
        const nextBtn = document.createElement('button');
        nextBtn.className = 'hero-arrow next';
        nextBtn.type = 'button';
        nextBtn.setAttribute('aria-label', 'Próximo slide');
        nextBtn.innerHTML = '<span aria-hidden="true">&#8250;</span>';
        arrows.appendChild(prevBtn);
        arrows.appendChild(nextBtn);
        hero.appendChild(arrows);

        function goTo(i, user = false) {
            slides[index].classList.remove('active');
            index = (i + slides.length) % slides.length;
            slides[index].classList.add('active');
            if (user) restart();
        }

        function next() { goTo(index + 1); }
        function prev() { goTo(index - 1); }
        function start() { if (!timer) timer = setInterval(next, intervalMs); }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }
        function restart() { stop(); start(); }

        // Click arrows
        prevBtn.addEventListener('click', () => prev());
        nextBtn.addEventListener('click', () => next());

        // Pause on hover
        hero.addEventListener('mouseenter', stop);
        hero.addEventListener('mouseleave', start);

        // Respect reduced motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) start();

        // Keyboard navigation (left/right when hero is focused or on page)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { prev(); }
            else if (e.key === 'ArrowRight') { next(); }
        });
    })();
});

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
