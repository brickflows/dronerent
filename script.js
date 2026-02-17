// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
// Navbar scroll effect removed to keep consistent style
const navbar = document.querySelector('.navbar');

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            project: formData.get('project'),
            message: formData.get('message')
        };

        // Show success message
        alert(`Thank you, ${data.name}! We've received your message and will get back to you within 24 hours.`);

        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default if it's just "#"
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.feature-card, .fleet-card, .pricing-card, .testimonial-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Dynamic drone image placeholders with gradients
const placeholderImages = document.querySelectorAll('.placeholder-image');

placeholderImages.forEach((img, index) => {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    ];

    img.style.background = gradients[index % gradients.length];

    // Add hover effect
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.4s ease-out';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - navbar.offsetHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate stats counter on scroll
const stats = document.querySelectorAll('.stat h3');
let hasAnimated = false;

const animateStats = () => {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !hasAnimated) {
        stats.forEach(stat => {
            const text = stat.textContent;
            const hasNumber = /\d+/.test(text);

            if (hasNumber) {
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                let current = 0;
                const increment = number / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
        hasAnimated = true;
    }
};

window.addEventListener('scroll', animateStats);
animateStats(); // Check on page load

// Pricing card hover effect - highlight features
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const features = card.querySelectorAll('.pricing-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.color = '#ffffff';
                feature.style.transition = 'color 0.2s ease-out';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', () => {
        const features = card.querySelectorAll('.pricing-features li');
        features.forEach(feature => {
            feature.style.color = '';
        });
    });
});

// Hero Banner Slider logic
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;

if (bannerSlides.length > 0) {
    setInterval(() => {
        bannerSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        bannerSlides[currentSlide].classList.add('active');
    }, 3000); // Changed to 3 seconds for testing
}

// "Perfect For" Tabs Logic
// "Perfect For" Tabs Logic
(function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.perfect-for-content');
    const indicatorContainer = document.querySelector('.tab-indicator');

    if (tabButtons.length === 0) return;

    function updateIndicator(activeBtn) {
        if (!activeBtn || !indicatorContainer) return;

        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const btnTop = activeBtn.offsetTop;
        const btnHeight = activeBtn.offsetHeight;

        indicatorContainer.style.width = `${btnWidth}px`;
        indicatorContainer.style.height = `${btnHeight}px`;
        indicatorContainer.style.left = '0';
        indicatorContainer.style.top = '0';
        indicatorContainer.style.transform = `translate(${btnLeft}px, ${btnTop}px)`;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            console.log('Tab clicked:', btn.getAttribute('data-tab'));

            // Remove active class
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class
            btn.classList.add('active');

            // Show content
            const tabId = btn.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) {
                content.classList.add('active');
            } else {
                console.warn('No content found for tab:', tabId);
            }

            // Update indicator
            updateIndicator(btn);
        });
    });

    // Initialize
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) {
        // Run immediately and after a timeline to catch layout shifts
        updateIndicator(activeBtn);
        setTimeout(() => updateIndicator(activeBtn), 100);
        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.tab-btn.active');
            if (currentActive) updateIndicator(currentActive);
        });
    }
})();
