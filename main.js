document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Load Animations
    const hiddenElements = document.querySelectorAll('.hidden-onload');
    setTimeout(() => {
        hiddenElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transition = 'opacity 1.5s ease-out';
            el.classList.remove('hidden-onload');
        });
    }, 100);

    // Trigger Ken Burns
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        heroBg.classList.add('animate-bg');
    }

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Timeline nodes observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    const htPoints = document.querySelectorAll('.ht-point');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Also light up the horizontal point if it exists
                const phaseIndex = Array.from(timelineItems).indexOf(entry.target);
                if(phaseIndex >= 0 && htPoints[phaseIndex]) {
                    htPoints[phaseIndex].classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));

    // 3. Scroll Events
    const navbar = document.querySelector('.navbar');
    const htLineFill = document.getElementById('htLineFill');
    const horizontalTimeline = document.querySelector('.horizontal-timeline');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        // Navbar floating pill effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.mixBlendMode = 'normal';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.mixBlendMode = 'difference';
        }
        
        // Horizontal Timeline Fill
        if (horizontalTimeline && htLineFill) {
            const rect = horizontalTimeline.getBoundingClientRect();
            // Calculate how far we scrolled past the timeline
            const windowHeight = window.innerHeight;
            
            // Start filling when timeline enters bottom third of screen
            const startFill = rect.top - windowHeight + 100;
            const endFill = rect.top - windowHeight / 2;
            
            if (startFill < 0) {
                let progress = Math.min(100, Math.max(0, (Math.abs(startFill) / (Math.abs(startFill) - startFill + (windowHeight / 2))) * 100));
                // Simple approximation for demo, a smoother way:
                const distance = windowHeight - rect.top;
                let percentage = (distance / (windowHeight / 1.5)) * 100;
                percentage = Math.min(100, Math.max(0, percentage));
                
                if(window.innerWidth > 900) {
                    htLineFill.style.width = `${percentage}%`;
                } else {
                    htLineFill.style.height = `${percentage}%`;
                    htLineFill.style.width = '2px';
                }
            } else {
                htLineFill.style.width = '0%';
                htLineFill.style.height = '0%';
            }
        }
    });
});
