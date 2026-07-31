// GSAP & Native IntersectionObserver Luxury Animations
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Entrance Page Load Animations (GSAP)
  if (typeof gsap !== 'undefined') {
    // Hero Title
    gsap.from('.hero-content h1', {
      duration: 1.5,
      y: 60,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.3
    });

    // Hero Description
    gsap.from('.hero-content p', {
      duration: 1.5,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.6
    });

    // Hero Button
    gsap.from('.hero-content .btn-luxury', {
      duration: 1.5,
      y: 20,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.9
    });

    // Sticky Navigation Header Slide-down
    gsap.from('header.sticky-header', {
      duration: 1,
      y: -80,
      opacity: 0,
      ease: 'power3.out',
      clearProps: "all"
    });
  }

  // 2. High-Performance Scroll-Driven Animations (Native IntersectionObserver)
  // Highly robust against layout shifts, asset loading delays, and dynamic viewport resizes.
  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before entering screen
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // If it's a staggered product grid
        if (target.classList.contains('gsap-products-grid')) {
          const cards = target.querySelectorAll('.product-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-up-active');
            }, index * 120); // 120ms staggered delay
          });
        } 
        // Single fade-up item
        else {
          target.classList.add('fade-up-active');
        }

        // Image reveal swipe
        if (target.classList.contains('reveal-img-container')) {
          target.classList.add('revealed');
        }

        // Unobserve to run animation only once
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Initialize and observe single fade-up items
  document.querySelectorAll('.gsap-fade-up, .reveal-img-container').forEach(el => {
    el.classList.add('fade-up-init');
    animationObserver.observe(el);
  });

  // Initialize and observe product cards inside grid structures
  document.querySelectorAll('.gsap-products-grid').forEach(grid => {
    animationObserver.observe(grid);
    // Hide cards initially, wait for observer to trigger stagger
    grid.querySelectorAll('.product-card').forEach(card => {
      card.classList.add('fade-up-init');
    });
  });

});
