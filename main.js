document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Load Animations
    const hiddenElements = document.querySelectorAll('.hidden-onload');
    setTimeout(() => {
        hiddenElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transition = 'opacity 1.5s ease-out';
        });
    }, 100);

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has appeared
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Navbar background color on scroll
    const navbar = document.querySelector('.navbar');
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        // Navbar effect
        if (scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.85)';
            navbar.style.backdropFilter = 'blur(12px)';
            navbar.style.mixBlendMode = 'normal';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.mixBlendMode = 'difference';
            navbar.style.boxShadow = 'none';
        }
        
        // Parallax effect for hero background
        if (heroBg && scrollY < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
        }
    });
});
