document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       TYPING EFFECT (Only run if element exists)
    ========================================= */
    const typingTextSpan = document.querySelector(".typing-text");
    if (typingTextSpan) {
        const roles = ["Web Applications.", "Scalable Backends.", "Beautiful UIs.", "Creative Solutions."];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingTextSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? erasingDelay : typingDelay;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex++;
                if (roleIndex >= roles.length) roleIndex = 0;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        if (roles.length) setTimeout(type, newTextDelay + 250);
    }

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            if (isExpanded) {
                hamburger.innerHTML = '<i data-lucide="x"></i>';
            } else {
                hamburger.innerHTML = '<i data-lucide="menu"></i>';
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    /* =========================================
       STICKY NAVBAR & ACTIVE LINK HIGHLIGHT (Multi-page)
    ========================================= */
    const navbar = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Set active link based on current URL path
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop();
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

    navLinksItems.forEach(a => {
        a.classList.remove('active');
        const href = a.getAttribute('href');
        if (href === currentPage) {
            a.classList.add('active');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       SCROLL ANIMATIONS (Intersection Observer)
    ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    /* =========================================
       FORM SUBMISSION
    ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
            btn.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            setTimeout(() => {
                formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
                formStatus.style.color = "#4ade80";
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formStatus.textContent = "";
                }, 5000);
            }, 1500);
        });
    }
});
