// JavaScript for Yuva Prerna Foundation Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Configure this with your deployed Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0Qu8MTk61Iz9x-r0mjLfK4WEhmvYLiFnAcmWoJ1wndw0mAtfPmLsiJdtzAQImHBk/exec';

// Test helper removed in production

// Initialize all website functionality
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormHandling();
    setupNavbarScrollEffect();
    setupActiveNavLinks();
    setupImageGallery();
    setupJoinUsModal();
    setupDonateModal();
    setupAutoDonatePopup();
    setupActivityGallery();
    setupActivityCtaWiring();
    setupFooterLinks();
    setupCertificatesGallery();
    setupBlogPages();
    setupScrollAnimations();
    setupParallaxAnimations();
    setupWhatsAppFloat();
}

// Helper: check if animations are disabled via HTML class
function isAnimationsDisabled() {
    return document.documentElement.classList.contains('disable-animations');
}

// Wire Activity CTA buttons to existing modals
function setupActivityCtaWiring() {
    const volunteerCTA = document.getElementById('volunteerCTA');
    const donateCTA = document.getElementById('donateCTA');
    const joinBtn = document.getElementById('joinUsBtn');
    const donateBtn = document.getElementById('donateBtn');

    if (volunteerCTA && joinBtn) {
        volunteerCTA.addEventListener('click', (e) => {
            e.preventDefault();
            joinBtn.click();
        });
    }

    if (donateCTA && donateBtn) {
        donateCTA.addEventListener('click', (e) => {
            e.preventDefault();
            donateBtn.click();
        });
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
                
                // Reset hamburger icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const disabled = isAnimationsDisabled();
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: disabled ? 'auto' : 'smooth'
                });
            }
        });
    });
}

// Removed setupScrollAnimations

// Form Handling
function setupFormHandling() {
  
    const form = document.querySelector('#contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields / कृपया सभी आवश्यक फ़ील्ड भरें', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address / कृपया एक वैध ईमेल पता दर्ज करें', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon. / आपके संदेश के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification style based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span class="text-sm">${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Navbar Scroll Effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar', 'scrolled');
            } else {
                navbar.classList.remove('navbar', 'scrolled');
            }
        });
    }
}

// Counter Animations
function setupCounterAnimations() {
    if (isAnimationsDisabled()) return; // no-op when disabled
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Removed setupLoadingAnimations

// Removed debounce/throttle utilities

// Removed reveal animations

// Active navbar link on scroll and click
function setupActiveNavLinks() {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    if (!navLinks.length) return;
    const sectionIds = ['home', 'about', 'activities', 'gallery', 'contact'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const sectionToHrefId = {
        home: 'home',
        about: 'about',
        // Due to label swap in HTML: href="#activities" shows "Gallery"
        activities: 'activities',
        // href="#gallery" shows "Activities"
        gallery: 'gallery',
        contact: 'contact'
    };

    function setActiveById(activeId) {
        const hrefId = sectionToHrefId[activeId] || activeId;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${hrefId}`;
            link.classList.toggle('text-blue-600', isActive);
            link.classList.toggle('text-gray-700', !isActive);
            link.classList.toggle('font-semibold', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Click sets active immediately
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = (link.getAttribute('href') || '').replace('#', '');
            if (targetId) setActiveById(targetId);
        });
    });

    // Observe sections in viewport
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
            const id = visible[0].target.id;
            setActiveById(id);
        }
    }, { threshold: [0.3, 0.6], rootMargin: '-20% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));

    // Set initial active based on hash or first section
    const initial = (location.hash || '#home').replace('#', '');
    setActiveById(initial);
}

// Removed back to top button

// Image Gallery Data
const galleryData = {
    medical: {
        title: "Medical Care / चिकित्सा सहायता",
        subtitle: "Providing free healthcare services",
        mainTitle: "Free Medical Treatment Program",
        description: "Our medical care initiative provides comprehensive healthcare services to underprivileged communities. We operate mobile clinics, organize health camps, and ensure access to essential medicines and treatments for those who cannot afford them. Our team of qualified doctors and medical professionals volunteer their time to serve the community.",
        images: [
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        stats: [
            { number: "500+", label: "Patients Treated" },
            { number: "50+", label: "Health Camps" },
            { number: "25+", label: "Doctors" },
            { number: "15+", label: "Locations" }
        ]
    },
    animal: {
        title: "Animal Care / पशु सेवा",
        subtitle: "Rescuing and caring for animals",
        mainTitle: "Animal Rescue & Care Program",
        description: "Our animal care program focuses on rescuing stray, injured, and abandoned animals. We provide medical treatment, shelter, and rehabilitation services. Our team works tirelessly to ensure every animal receives the care and love they deserve, promoting animal welfare in our communities.",
        images: [
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1596492784531-6e6eb4ea4b4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        stats: [
            { number: "200+", label: "Animals Rescued" },
            { number: "150+", label: "Animals Treated" },
            { number: "30+", label: "Adoptions" },
            { number: "10+", label: "Volunteers" }
        ]
    },
    food: {
        title: "Food Distribution / भोजन वितरण",
        subtitle: "Emergency food during disasters",
        mainTitle: "Emergency Food Distribution",
        description: "During natural disasters and emergencies, we provide essential food supplies to affected communities. Our food distribution program ensures that no one goes hungry during difficult times. We work with local authorities and volunteers to reach the most vulnerable populations.",
        images: [
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        stats: [
            { number: "1000+", label: "Meals Served" },
            { number: "25+", label: "Distribution Points" },
            { number: "500+", label: "Families Helped" },
            { number: "15+", label: "Emergency Events" }
        ]
    },
    community: {
        title: "Community Service / सामुदायिक सेवा",
        subtitle: "Building stronger communities",
        mainTitle: "Community Development Program",
        description: "Our community service initiatives focus on education, skill development, and social welfare. We organize workshops, provide educational support, and work towards creating sustainable development in rural and urban communities. Our goal is to empower individuals and strengthen community bonds.",
        images: [
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        stats: [
            { number: "50+", label: "Communities Served" },
            { number: "200+", label: "Workshops Conducted" },
            { number: "1000+", label: "People Trained" },
            { number: "25+", label: "Projects Completed" }
        ]
    },
    volunteer: {
        title: "Volunteer Work / स्वयंसेवक कार्य",
        subtitle: "Dedicated volunteers making a difference",
        mainTitle: "Volunteer Network Program",
        description: "Our volunteer program brings together passionate individuals who want to make a positive impact in society. Volunteers participate in various activities including medical camps, animal rescue, food distribution, and community development projects. We provide training and support to help volunteers contribute effectively.",
        images: [
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        stats: [
            { number: "100+", label: "Active Volunteers" },
            { number: "500+", label: "Volunteer Hours" },
            { number: "20+", label: "Training Sessions" },
            { number: "15+", label: "Volunteer Events" }
        ]
    }
};

// Image Slider Functionality using w3.CSS with Manual Navigation
function setupImageGallery() {
    const sliderContainer = document.querySelector('.w3-content.w3-section');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!sliderContainer) return;
    
    // Build list of local images from known folders
    const plantationImages = ['p2.jpeg','p3.jpeg','p4.jpeg','p5.jpeg','p6.jpeg','p7.jpeg'].map(f => `plantation/${f}`);
    const newspaperImages = ['n1.jpeg','n2.jpeg','n3.jpeg','n4.jpeg','n5.jpeg','n6.jpeg'].map(f => `newspaper/${f}`);
    const achievementImages = ['Ach2.png','Ach3.png','Ach4.png'].map(f => `acchivment/${f}`);
    
    const imageSources = [
        ...plantationImages,
        ...achievementImages,
        ...newspaperImages,
    ];
    
    // Clear any existing content
    sliderContainer.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';
    
    // Create images with w3.CSS classes
    imageSources.forEach((src, index) => {
        const img = document.createElement('img');
        img.className = 'mySlides w3-animate-fading';
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        sliderContainer.appendChild(img);
        
        // Create dots
        if (dotsContainer) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', index);
            dotsContainer.appendChild(dot);
        }
    });
    
    // Carousel state
    let myIndex = 0;
    let autoSlideInterval;
    let isUserInteracting = false;
    
    // Get slides and dots
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = slides.length;
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        for (let i = 0; i < totalSlides; i++) {
            slides[i].style.display = "none";
            if (dots[i]) dots[i].classList.remove('active');
        }
        
        // Show current slide
        if (slides[index]) {
            slides[index].style.display = "block";
            if (dots[index]) dots[index].classList.add('active');
        }
        
        myIndex = index;
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (myIndex + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (myIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Auto carousel function
    function autoCarousel() {
        if (!isUserInteracting) {
            nextSlide();
        }
    }
    
    // Start auto slide
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(autoCarousel, 5000);
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Pause auto slide temporarily
    function pauseAutoSlide() {
        isUserInteracting = true;
        stopAutoSlide();
        setTimeout(() => {
            isUserInteracting = false;
            startAutoSlide();
        }, 10000); // Resume after 10 seconds
    }
    
    // Manual navigation event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            pauseAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            pauseAutoSlide();
        });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            pauseAutoSlide();
        });
    });
    
    // Touch/Swipe support
    let startX = 0;
    let endX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        pauseAutoSlide();
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            pauseAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            pauseAutoSlide();
        }
    });
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopAutoSlide();
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        startAutoSlide();
    });
    
    // Initialize
    showSlide(0);
    startAutoSlide();
    
    // Pause when not visible
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isUserInteracting) startAutoSlide();
            } else {
                stopAutoSlide();
            }
        });
    }, { threshold: 0.0 });
    sliderObserver.observe(sliderContainer);
}

// Get slide type based on index
function getSlideType(index) {
    const types = ['medical', 'animal', 'food', 'community', 'volunteer', 'medical'];
    return types[index] || 'medical';
}

// Show image modal
function showImageModal(slideType) {
    const modal = document.getElementById('imageModal');
    const data = galleryData[slideType];
    
    if (!modal || !data) return;
    
    // Update modal content
    document.getElementById('modalImage').src = data.images[0];
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalMainTitle').textContent = data.mainTitle;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Update gallery images
    const galleryContainer = document.getElementById('modalGallery');
    galleryContainer.innerHTML = '';
    data.images.forEach((imageUrl, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'modal-gallery-item';
        galleryItem.innerHTML = `<img src="${imageUrl}" alt="Gallery image ${index + 1}" loading="lazy">`;
        galleryContainer.appendChild(galleryItem);
    });
    
    // Update statistics
    const statsContainer = document.getElementById('modalStats');
    statsContainer.innerHTML = '';
    data.stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statCard);
    });
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('modal-enter');
    document.body.style.overflow = 'hidden';
    
    // Add click handlers to gallery images
    const galleryItems = modal.querySelectorAll('.modal-gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            document.getElementById('modalImage').src = data.images[index];
        });
    });
}

// Hide image modal
function hideImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('modal-enter');
        document.body.style.overflow = 'auto';
    }
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (!modal || !closeBtn) return;
    
    // Close modal on close button click
    closeBtn.addEventListener('click', hideImageModal);
    
    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideImageModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideImageModal();
        }
    });
}

// Join Us Modal Functionality
function setupJoinUsModal() {
    const joinBtn = document.getElementById('joinUsBtn');
    const joinModal = document.getElementById('joinModal');
    const closeJoinModal = document.getElementById('closeJoinModal');
    const cancelJoinBtn = document.getElementById('cancelJoinBtn');
    const joinForm = document.getElementById('joinForm');
    
    if (!joinBtn || !joinModal) return;
    
    // Open modal
    joinBtn.addEventListener('click', () => {
        joinModal.classList.remove('hidden');
        joinModal.classList.add('modal-enter');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    function closeJoinModalFunc() {
        joinModal.classList.add('hidden');
        joinModal.classList.remove('modal-enter');
        document.body.style.overflow = 'auto';
    }
    
    if (closeJoinModal) {
        closeJoinModal.addEventListener('click', closeJoinModalFunc);
    }
    
    if (cancelJoinBtn) {
        cancelJoinBtn.addEventListener('click', closeJoinModalFunc);
    }
    
    // Close on backdrop click
    joinModal.addEventListener('click', (e) => {
        if (e.target === joinModal) {
            closeJoinModalFunc();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !joinModal.classList.contains('hidden')) {
            closeJoinModalFunc();
        }
    });
    
    // Form submission
    // Helper to show thank-you popup modal
    function showThankYouModal(fullName) {
        const modal = document.getElementById('thankYouModal');
        const userInitial = document.getElementById('userInitial');
        const userName = document.getElementById('userName');
        const name = (fullName || 'Friend').trim();
        
        if (!modal || !userInitial || !userName) return;
        
        // Update modal content
        userInitial.textContent = (name[0] || 'Y').toUpperCase();
        userName.textContent = name;
        
        // Show modal with animation
        modal.classList.remove('hidden');
        modal.classList.add('show');
        
        // Trigger animation after a small delay
        setTimeout(() => {
            const card = document.getElementById('thankYouCard');
            if (card) {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            }
        }, 10);
    }
    
    // Helper to hide thank-you popup modal
    function hideThankYouModal() {
        const modal = document.getElementById('thankYouModal');
        const card = document.getElementById('thankYouCard');
        
        if (!modal || !card) return;
        
        // Animate out
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';
        
        // Hide modal after animation
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }, 300);
    }

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(joinForm);
            const data = Object.fromEntries(formData.entries());
            
            // Get selected interests
            const interests = Array.from(joinForm.querySelectorAll('input[name="interests"]:checked'))
                .map(input => input.value);
            
            // Validation
            if (!data.fullName || !data.email || !data.phone || !data.city) {
                showNotification('Please fill in all required fields / कृपया सभी आवश्यक फ़ील्ड भरें', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address / कृपया एक वैध ईमेल पता दर्ज करें', 'error');
                return;
            }
            
            // Interests optional for submission
            
            // Payload for Google Apps Script / Email
            const payload = {
                full_name: data.fullName,
                email: data.email,
                // Prefix apostrophe to keep "+" phone numbers as text in Sheets
                phone: (data.phone || '').startsWith('+') ? ('\'' + data.phone) : data.phone,
                age: data.age || '-',
                city: data.city,
                availability: data.availability || '-',
                interests: interests.join(', '),
                motivation: data.motivation || '-'
            };

            // Prefer Google Apps Script if URL is configured
            if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
                showNotification('Submitting application...', 'info');
                fetch(GOOGLE_APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(() => {
                    showNotification('Application submitted! / आवेदन सफलतापूर्वक जमा किया गया!', 'success');
                    showThankYouModal(data.fullName);
                    joinForm.reset();
                    closeJoinModalFunc();
                })
                .catch(() => {
                    showNotification('Submission failed. Please try again. / सबमिशन असफल रहा।', 'error');
                });
                return;
            }

            // Fallback: EmailJS (optional). Configure if you prefer EmailJS.
            const SERVICE_ID = 'YOUR_SERVICE_ID';
            const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
            if (window.emailjs && typeof emailjs.send === 'function' && SERVICE_ID !== 'YOUR_SERVICE_ID') {
                emailjs.send(SERVICE_ID, TEMPLATE_ID, payload)
                    .then(() => {
                        showNotification('Application sent successfully! / आवेदन सफलतापूर्वक भेजा गया!', 'success');
                        showThankYouModal(data.fullName);
                        joinForm.reset();
                        closeJoinModalFunc();
                    })
                    .catch(() => {
                        showNotification('Could not send email. / ईमेल नहीं भेजा जा सका।', 'error');
                    });
                return;
            }

            // Final fallback
            showNotification('Thank you! We will contact you soon. / धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।', 'success');
            showThankYouModal(data.fullName);
            joinForm.reset();
            closeJoinModalFunc();
        });
    }
    
    // Add event listeners for thank-you modal close buttons
    const closeThankYouModal = document.getElementById('closeThankYouModal');
    const closeThankYouBtn = document.getElementById('closeThankYouBtn');
    
    if (closeThankYouModal) {
        closeThankYouModal.addEventListener('click', hideThankYouModal);
    }
    
    if (closeThankYouBtn) {
        closeThankYouBtn.addEventListener('click', hideThankYouModal);
    }
    
    // Close modal when clicking outside
    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
        thankYouModal.addEventListener('click', (e) => {
            if (e.target === thankYouModal) {
                hideThankYouModal();
            }
        });
    }
}

// Random Quotes for Donate Modal
const donateQuotes = [
    {
        quote: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi"
    },
    {
        quote: "No one has ever become poor by giving.",
        author: "Anne Frank"
    },
    {
        quote: "We make a living by what we get, but we make a life by what we give.",
        author: "Winston Churchill"
    },
    {
        quote: "The meaning of life is to find your gift. The purpose of life is to give it away.",
        author: "Pablo Picasso"
    },
    {
        quote: "Service to others is the rent you pay for your room here on earth.",
        author: "Muhammad Ali"
    },
    {
        quote: "The smallest act of kindness is worth more than the greatest intention.",
        author: "Oscar Wilde"
    },
    {
        quote: "We rise by lifting others.",
        author: "Robert Ingersoll"
    },
    {
        quote: "Kindness is a language which the deaf can hear and the blind can see.",
        author: "Mark Twain"
    },
    {
        quote: "The purpose of human life is to serve, and to show compassion and the will to help others.",
        author: "Albert Schweitzer"
    },
    {
        quote: "Giving is not just about making a donation. It is about making a difference.",
        author: "Kathy Calvin"
    },
    {
        quote: "The best way to not feel hopeless is to get up and do something. Don't wait for good things to happen to you.",
        author: "Barack Obama"
    },
    {
        quote: "Life's most persistent and urgent question is, 'What are you doing for others?'",
        author: "Martin Luther King Jr."
    }
];

// Donate Modal Functionality
function setupDonateModal() {
    const donateBtn = document.getElementById('donateBtn');
    const donateModal = document.getElementById('donateModal');
    const closeDonateModal = document.getElementById('closeDonateModal');
    const quoteElement = document.getElementById('donateQuote');
    const authorElement = document.getElementById('donateAuthor');
    
    if (!donateBtn || !donateModal) return;
    
    // Function to show random quote
    function showRandomQuote() {
        if (quoteElement && authorElement) {
            const randomIndex = Math.floor(Math.random() * donateQuotes.length);
            const randomQuote = donateQuotes[randomIndex];
            quoteElement.textContent = randomQuote.quote;
            authorElement.textContent = `- ${randomQuote.author}`;
        }
    }
    
    // Open modal
    donateBtn.addEventListener('click', () => {
        showRandomQuote(); // Show random quote when opening
        donateModal.classList.remove('hidden');
        donateModal.classList.add('modal-enter');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal function
    function closeDonateModalFunc() {
        donateModal.classList.add('hidden');
        donateModal.classList.remove('modal-enter');
        document.body.style.overflow = 'auto';
    }
    
    if (closeDonateModal) {
        closeDonateModal.addEventListener('click', (e) => {
            e.preventDefault();
            closeDonateModalFunc();
        });
    }
    
    // Close on backdrop click
    donateModal.addEventListener('click', (e) => {
        if (e.target === donateModal) {
            closeDonateModalFunc();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !donateModal.classList.contains('hidden')) {
            closeDonateModalFunc();
        }
    });
    
    // Copy functionality for all buttons
    const copyAccountBtn = donateModal.querySelector('.copy-account-btn');
    const copyIfscBtn = donateModal.querySelector('.copy-ifsc-btn');
    const copyUpiBtn = donateModal.querySelector('button[class*="text-blue-600"]:not(.copy-account-btn):not(.copy-ifsc-btn)');
    
    // Copy Account Number
    if (copyAccountBtn) {
        copyAccountBtn.addEventListener('click', async () => {
            const accountNumber = '701801010050235';
            try {
                await navigator.clipboard.writeText(accountNumber);
                showNotification('Account Number copied to clipboard! / खाता संख्या क्लिपबोर्ड में कॉपी हो गई!', 'success');
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = accountNumber;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Account Number copied to clipboard! / खाता संख्या क्लिपबोर्ड में कॉपी हो गई!', 'success');
            }
        });
    }
    
    // Copy IFSC Code
    if (copyIfscBtn) {
        copyIfscBtn.addEventListener('click', async () => {
            const ifscCode = 'UBIN0570184';
            try {
                await navigator.clipboard.writeText(ifscCode);
                showNotification('IFSC Code copied to clipboard! / आईएफएससी कोड क्लिपबोर्ड में कॉपी हो गया!', 'success');
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = ifscCode;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('IFSC Code copied to clipboard! / आईएफएससी कोड क्लिपबोर्ड में कॉपी हो गया!', 'success');
            }
        });
    }
    
    // Copy UPI ID
    if (copyUpiBtn) {
        copyUpiBtn.addEventListener('click', async () => {
            const upiId = 'QR919453309686-0235@unionbankofindia';
            try {
                await navigator.clipboard.writeText(upiId);
                showNotification('UPI ID copied to clipboard! / यूपीआई आईडी क्लिपबोर्ड में कॉपी हो गई!', 'success');
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = upiId;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('UPI ID copied to clipboard! / यूपीआई आईडी क्लिपबोर्ड में कॉपी हो गई!', 'success');
            }
        });
    }
}

// Auto Donate Popup Functionality
function setupAutoDonatePopup() {
    const donateModal = document.getElementById('donateModal');
    const quoteElement = document.getElementById('donateQuote');
    const authorElement = document.getElementById('donateAuthor');
    
    if (!donateModal) return;
    
    // Show popup after 3 seconds on every page load/refresh
    setTimeout(() => {
        // Check if no other modal is open
        const imageModal = document.getElementById('imageModal');
        const joinModal = document.getElementById('joinModal');
        
        if (imageModal && !imageModal.classList.contains('hidden')) return;
        if (joinModal && !joinModal.classList.contains('hidden')) return;
        
        // Show random quote for auto popup
        if (quoteElement && authorElement) {
            const randomIndex = Math.floor(Math.random() * donateQuotes.length);
            const randomQuote = donateQuotes[randomIndex];
            quoteElement.textContent = randomQuote.quote;
            authorElement.textContent = `- ${randomQuote.author}`;
        }
        
        // Show donate modal
        donateModal.classList.remove('hidden');
        donateModal.classList.add('modal-enter');
        document.body.style.overflow = 'hidden';
        
        // Add a subtle notification
        showNotification('Support our cause with a donation / हमारे कारण का समर्थन करें', 'info');
        
    }, 1000000); // 3 seconds
}

// Activity Gallery Data
const activityPhotos = {
    medical: {
        title: "Medical Care / चिकित्सा सहायता",
        subtitle: "Free treatment camps and medicine support",
        infoTitle: "Medical Care Program / चिकित्सा सहायता कार्यक्रम",
        description: "हम नि:शुल्क स्वास्थ्य शिविर, मोबाइल क्लिनिक और दवा वितरण के माध्यम से जरूरतमंदों तक चिकित्सा सेवाएँ पहुँचाते हैं। अनुभवी डॉक्टर्स और स्वयंसेवक मिलकर समुदाय की सेवा करते हैं।",
        category: "Healthcare / स्वास्थ्य सेवा",
        icon: "fas fa-stethoscope",
        iconColor: "text-red-600",
        iconBg: "bg-red-100",
        stats1: "500+",
        stats1Label: "Patients Treated",
        stats2: "25+",
        stats2Label: "Medical Camps",
        photos: [
            "acchivment/Ach2.png",
            "acchivment/Ach3.png",
            "acchivment/Ach4.png"
        ]
    },
    animal: {
        title: "Animal Care Gallery / पशु सेवा गैलरी",
        subtitle: "Rescue, treatment and compassionate care",
        infoTitle: "Animal Rescue & Care Program / पशु बचाव और देखभाल कार्यक्रम",
        description: "घायल और आवारा पशुओं को बचाकर उनकी चिकित्सा, देखभाल और पुनर्वास सुनिश्चित करना—यही हमारा उद्देश्य है।",
        category: "Animal Welfare / पशु कल्याण",
        icon: "fas fa-paw",
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        stats1: "200+",
        stats1Label: "Animals Rescued",
        stats2: "150+",
        stats2Label: "Animals Treated",
        photos: [
            "animal/an1.png",
            
            "animal/Screenshot 2025-09-10 at 7.10.43 PM.png",
            "animal/Screenshot 2025-09-10 at 7.10.52 PM.png",
            "animal/Screenshot 2025-09-10 at 7.11.05 PM.png"
        ]
    },
    food: {
        title: "Food Distribution Gallery / भोजन वितरण गैलरी",
        subtitle: "Emergency food support to families",
        infoTitle: "Emergency Food Distribution Program / आपातकालीन भोजन वितरण कार्यक्रम",
        description: "आपदा और संकट के समय प्रभावित परिवारों तक पौष्टिक भोजन पहुँचाना—स्वयंसेवकों के साथ तेज़ और पारदर्शी सहायता।",
        category: "Disaster Relief / आपदा राहत",
        icon: "fas fa-utensils",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-100",
        stats1: "1000+",
        stats1Label: "Meals Served",
        stats2: "25+",
        stats2Label: "Distribution Points",
        photos: [
            "food/fd1.png",
            "food/fd2.png",
            "food/fd3.png",
            "food/fd4.jpeg",
       
           
        ]
    },
    community: {
        title: "Social Welfare / सामाजिक कल्याण",
        subtitle: "Plantation drives and community engagement",
        infoTitle: "Community Development Program / सामुदायिक विकास कार्यक्रम",
        description: "शिक्षा, स्वास्थ्य व हरित अभियान के माध्यम से समुदायों को जोड़ना और सशक्त बनाना—वृक्षारोपण हमारे सतत विकास का प्रमुख कदम है।",
        category: "Social Development / सामाजिक विकास",
        icon: "fas fa-users",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        stats1: "50+",
        stats1Label: "Communities Served",
        stats2: "200+",
        stats2Label: "Workshops Conducted",
        photos: [
            "plantation/p2.jpeg",
            "plantation/p3.jpeg",
            "plantation/p4.jpeg",
            "plantation/p5.jpeg",
            "plantation/p6.jpeg",
            "plantation/p7.jpeg",
            "plantation/p8.jpeg",
            "plantation/p9.jpeg",
            "plantation/p10.jpeg",
            "plantation/p11.jpeg",
            "plantation/p12.jpeg",
            "plantation/p13.jpeg",
            "plantation/p14.jpeg",
        

        ]
    }
};

// Activity Gallery Functionality
function setupActivityGallery() {
    const activityCards = document.querySelectorAll('.activity-card');
    const activityGalleryPage = document.getElementById('activityGalleryPage');
    const closeActivityGallery = document.getElementById('closeActivityGallery');
    const backToActivities = document.getElementById('backToActivities');
    const activityGalleryTitle = document.getElementById('activityGalleryTitle');
    const activityGallerySubtitle = document.getElementById('activityGallerySubtitle');
    const activityInfoTitle = document.getElementById('activityInfoTitle');
    const activityInfoDescription = document.getElementById('activityInfoDescription');
    const activityCategory = document.getElementById('activityCategory');
    const activityIcon = document.getElementById('activityIcon');
    const activityStats1 = document.getElementById('activityStats1');
    const activityStats1Label = document.getElementById('activityStats1Label');
    const activityStats2 = document.getElementById('activityStats2');
    const activityStats2Label = document.getElementById('activityStats2Label');
    const activityPhotoGrid = document.getElementById('activityPhotoGrid');
    
    if (!activityCards.length || !activityGalleryPage) {
        return;
    }
    
    // Add click handlers to activity cards
    activityCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const activityType = card.getAttribute('data-activity');
            showActivityGallery(activityType);
        });
    });
    
    // Close gallery function
    function closeActivityGalleryFunc() {
        activityGalleryPage.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    if (closeActivityGallery) {
        closeActivityGallery.addEventListener('click', closeActivityGalleryFunc);
    }
    
    if (backToActivities) {
        backToActivities.addEventListener('click', closeActivityGalleryFunc);
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !activityGalleryPage.classList.contains('hidden')) {
            closeActivityGalleryFunc();
        }
    });
    
    // Show activity gallery
    function showActivityGallery(activityType) {
        const activityData = activityPhotos[activityType];
        
        if (!activityData) {
            return;
        }
        
        // Update page content
        activityGalleryTitle.textContent = activityData.title;
        activityGallerySubtitle.textContent = activityData.subtitle;
        activityInfoTitle.textContent = activityData.infoTitle;
        activityInfoDescription.textContent = activityData.description;
        activityCategory.textContent = activityData.category;
        
        // Update icon
        activityIcon.className = `w-32 h-32 ${activityData.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`;
        activityIcon.innerHTML = `<i class="${activityData.icon} text-5xl ${activityData.iconColor}"></i>`;
        
        // Update stats
        activityStats1.textContent = activityData.stats1;
        activityStats1Label.textContent = activityData.stats1Label;
        activityStats2.textContent = activityData.stats2;
        activityStats2Label.textContent = activityData.stats2Label;
        
        // Clear and populate photo grid
        activityPhotoGrid.innerHTML = '';
        activityData.photos.forEach((photoUrl, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'activity-photo-item';
            photoItem.innerHTML = `
                <img src="${photoUrl}" alt="Activity photo ${index + 1}" loading="lazy">
                <div class="activity-photo-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            activityPhotoGrid.appendChild(photoItem);
        });
        
        // Show gallery page
        activityGalleryPage.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Scroll to top
        activityGalleryPage.scrollTop = 0;
        
        // Force a reflow to ensure the element is visible
        activityGalleryPage.offsetHeight;
    }
}

// Test function for gallery
function testGallery() {
    const activityGalleryPage = document.getElementById('activityGalleryPage');
    if (activityGalleryPage) {
        activityGalleryPage.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log('Gallery page should now be visible');
    } else {
        console.log('Gallery page element not found');
    }
}

// Footer Links Functionality
function setupFooterLinks() {
    const footerSupport = document.getElementById('footerSupport');
    const footerDonate = document.getElementById('footerDonate');
    const footerVolunteer = document.getElementById('footerVolunteer');
    const footerEmergency = document.getElementById('footerEmergency');
    const footerReport = document.getElementById('footerReport');
    
    const joinBtn = document.getElementById('joinUsBtn');
    const donateBtn = document.getElementById('donateBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeEmergency = document.getElementById('closeEmergency');
    const callEmergency = document.getElementById('callEmergency');

    // Developer Contact - open Gmail
    if (footerSupport) {
        footerSupport.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:divyanshsingharsh@gmail.com';
        });
    }

    // Donate - open donate modal
    if (footerDonate && donateBtn) {
        footerDonate.addEventListener('click', (e) => {
            e.preventDefault();
            donateBtn.click();
        });
    }

    // Volunteer - open join form
    if (footerVolunteer && joinBtn) {
        footerVolunteer.addEventListener('click', (e) => {
            e.preventDefault();
            joinBtn.click();
        });
    }

    // Emergency Help - show phone number modal
    if (footerEmergency && emergencyModal) {
        footerEmergency.addEventListener('click', (e) => {
            e.preventDefault();
            emergencyModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Report Issue - scroll to contact section
    if (footerReport) {
        footerReport.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Emergency modal controls
    if (closeEmergency) {
        closeEmergency.addEventListener('click', () => {
            emergencyModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    if (callEmergency) {
        callEmergency.addEventListener('click', () => {
            window.location.href = 'tel:+919876543210';
        });
    }

    // Close emergency modal on backdrop click
    if (emergencyModal) {
        emergencyModal.addEventListener('click', (e) => {
            if (e.target === emergencyModal) {
                emergencyModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close emergency modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !emergencyModal.classList.contains('hidden')) {
            emergencyModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Certificates Gallery (photos-only)
function setupCertificatesGallery() {
    const openBtn = document.getElementById('viewAllCertificatesBtn');
    const page = document.getElementById('certificatesPage');
    const closeBtn = document.getElementById('closeCertificates');
    const backBtn = document.getElementById('backFromCertificates');
    const grid = document.getElementById('certificatesGrid');

    if (!openBtn || !page || !grid) return;

    // Reuse award images from the cards in the contact section if present; otherwise use fallbacks
    function getCertificateImages() {
        // Strictly use local certificate and newspaper images
        return [
            'certificate.jpeg',
            'newspaper/n1.jpeg',
            'newspaper/n2.jpeg',
            'newspaper/n3.jpeg',
            'newspaper/n4.jpeg',
            'newspaper/n5.jpeg',
            'newspaper/n6.jpeg'
        ];
    }

    function populateGrid() {
        const images = getCertificateImages();
        grid.innerHTML = '';
        images.forEach((src, i) => {
            const item = document.createElement('div');
            item.className = 'overflow-hidden rounded-lg bg-white shadow';
            item.innerHTML = `<img src="${src}" alt="Certificate ${i + 1}" class="w-full h-40 sm:h-48 md:h-56 object-cover" loading="lazy">`;
            grid.appendChild(item);
        });
    }

    function openPage() {
        populateGrid();
        page.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closePage() {
        page.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    openBtn.addEventListener('click', openPage);
    if (closeBtn) closeBtn.addEventListener('click', closePage);
    if (backBtn) backBtn.addEventListener('click', closePage);

    // Close on backdrop click
    page.addEventListener('click', (e) => {
        if (e.target === page) closePage();
    });

    // Escape key close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !page.classList.contains('hidden')) closePage();
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .image-slide.active {
        transform: scale(1.02);
        z-index: 10;
    }
    
    .image-slide.active .gallery-image {
        filter: brightness(0.7);
    }
    
    .image-slide.active .image-overlay {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Scroll-triggered animations - Run once per session
function setupScrollAnimations() {
    // Check if animations have already been triggered in this session
    const animationKey = 'yuvaPrernaAnimationsTriggered';
    const hasAnimated = sessionStorage.getItem(animationKey);
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Check if this element has already been animated
                if (element.dataset.animated === 'true') {
                    observer.unobserve(element);
                    return;
                }
                
                // Mark as animated
                element.dataset.animated = 'true';
                
                // Calculate delay based on element type and position
                let delay = 0;
                if (element.classList.contains('activity-card-left')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    delay = index * 200; // 0.2s delay between cards
                } else if (element.classList.contains('activity-card-right')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    delay = index * 200;
                } else if (element.classList.contains('impact-card-up')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    delay = index * 200;
                } else if (element.classList.contains('impact-card-down')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    delay = index * 200;
                }
                
                // Add animation with delay
                setTimeout(() => {
                    if (element.classList.contains('hero-text-animate')) {
                        element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
                    } else if (element.classList.contains('hero-image-animate')) {
                        element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
                    } else if (element.classList.contains('activity-card-left')) {
                        element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
                    } else if (element.classList.contains('activity-card-right')) {
                        element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
                    } else if (element.classList.contains('impact-card-up')) {
                        element.style.animation = 'slideInFromTop 0.8s ease-out forwards';
                    } else if (element.classList.contains('impact-card-down')) {
                        element.style.animation = 'slideInFromBottom 0.8s ease-out forwards';
                    }
                }, delay);
                
                // Unobserve after animation starts
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // If animations have already been triggered, apply them immediately
    if (hasAnimated) {
        const animatedElements = document.querySelectorAll(`
            .hero-text-animate,
            .hero-image-animate,
            .activity-card-left,
            .activity-card-right,
            .impact-card-up,
            .impact-card-down
        `);
        
        animatedElements.forEach(element => {
            element.dataset.animated = 'true';
            if (element.classList.contains('hero-text-animate')) {
                element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
            } else if (element.classList.contains('hero-image-animate')) {
                element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
            } else if (element.classList.contains('activity-card-left')) {
                element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
            } else if (element.classList.contains('activity-card-right')) {
                element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
            } else if (element.classList.contains('impact-card-up')) {
                element.style.animation = 'slideInFromTop 0.8s ease-out forwards';
            } else if (element.classList.contains('impact-card-down')) {
                element.style.animation = 'slideInFromBottom 0.8s ease-out forwards';
            }
        });
        return;
    }

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .hero-text-animate,
        .hero-image-animate,
        .activity-card-left,
        .activity-card-right,
        .impact-card-up,
        .impact-card-down
    `);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Mark animations as triggered for this session
    sessionStorage.setItem(animationKey, 'true');
}

// Parallax Animations
function setupParallaxAnimations() {
    if (isAnimationsDisabled()) return;
    
    // Parallax background elements
    const parallaxElements = document.querySelectorAll('.hero-parallax-bg, .about-parallax-bg, .activities-parallax-bg, .gallery-parallax-bg, .contact-parallax-bg, .footer-parallax-bg');
    
    // Scroll-triggered animation elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up');
    
    // Parallax scroll handler
    function handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Scroll-triggered animation handler
    function handleScrollAnimations() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallaxScroll();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateOnScroll);
    
    // Initial check for elements already in view
    handleScrollAnimations();
}

// WhatsApp Float Functionality
function setupWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappLink = document.querySelector('.whatsapp-link');
    
    if (!whatsappFloat || !whatsappLink) return;
    
    // Show/hide WhatsApp float based on scroll position
    let lastScrollTop = 0;
    let isScrollingDown = false;
    
    function handleWhatsAppScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show WhatsApp float after scrolling down 300px
        if (scrollTop > 300) {
            whatsappFloat.style.display = 'block';
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'translateY(0)';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.transform = 'translateY(20px)';
        }
        
        // Hide WhatsApp float when scrolling up (optional)
        if (scrollTop < lastScrollTop && scrollTop > 100) {
            // Scrolling up - keep visible
            isScrollingDown = false;
        } else if (scrollTop > lastScrollTop) {
            // Scrolling down
            isScrollingDown = true;
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleWhatsAppScroll, 10);
    });
    
    // Initial state - hidden
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.transform = 'translateY(20px)';
    whatsappFloat.style.transition = 'all 0.3s ease';
    
    // Add click tracking (optional)
    whatsappLink.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp contact clicked');
        
        // Optional: Add a small delay to show the click effect
        whatsappFloat.style.transform = 'scale(0.95)';
        setTimeout(() => {
            whatsappFloat.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add keyboard accessibility
    whatsappLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            whatsappLink.click();
        }
    });
    
    // Add focus styles for accessibility
    whatsappLink.addEventListener('focus', () => {
        whatsappFloat.style.outline = '2px solid #25D366';
        whatsappFloat.style.outlineOffset = '2px';
    });
    
    whatsappLink.addEventListener('blur', () => {
        whatsappFloat.style.outline = 'none';
    });
}

// Blog Data and Handlers
function setupBlogPages() {
    const blogCards = document.querySelectorAll('.blog-card');
    const blogPage = document.getElementById('blogPage');
    const closeBlogPage = document.getElementById('closeBlogPage');
    const backToHomeFromBlog = document.getElementById('backToHomeFromBlog');
    const blogTitle = document.getElementById('blogTitle');
    const blogSubtitle = document.getElementById('blogSubtitle');
    const blogContent = document.getElementById('blogContent');
    const blogHero = document.getElementById('blogHero');
    const blogHeroImage = document.getElementById('blogHeroImage');

    if (!blogPage || !blogCards.length) return;

    const blogs = {
        mission: {
            title: 'Mission / मिशन',
            subtitle: 'Dedicated actions for health, animals, food relief, and welfare',
            hero: './plantation/p5.jpeg',
            paragraphs: [
                'युवा प्रेरणा फाउंडेशन का मिशन समाज के प्रत्येक तबके तक मदद पहुँचाना और सतत विकास की दिशा में ठोस योगदान देना है। संस्था का मानना है कि शिक्षा, स्वास्थ्य, पशु संरक्षण, आपदा राहत और सामाजिक कल्याण जैसे क्षेत्रों में समन्वित प्रयास ही समाज को आत्मनिर्भर और सशक्त बना सकते हैं। हमारा लक्ष्य केवल तात्कालिक सहायता प्रदान करना ही नहीं, बल्कि दीर्घकालिक बदलाव लाना है जिससे हर व्यक्ति गरिमा के साथ जीवन जी सके।',
                'विस्तृत मिशन: हमारा मिशन है कि वंचित और जरूरतमंद समुदायों को नि:शुल्क चिकित्सा सेवाएँ उपलब्ध कराई जाएँ। इसके अंतर्गत संस्था नियमित स्वास्थ्य शिविर, मोबाइल क्लिनिक और दवा वितरण कार्यक्रम आयोजित करती है, जहाँ अनुभवी डॉक्टर और समर्पित स्वयंसेवक अपनी सेवाएँ प्रदान करते हैं।',
                'पशु कल्याण हमारी एक अन्य महत्वपूर्ण प्राथमिकता है। हम घायल और आवारा पशुओं को बचाने, उनका उपचार करने और सुरक्षित पुनर्वास हेतु निरंतर प्रयासरत रहते हैं। साथ ही, समाज में पशुओं के प्रति दयालुता और जिम्मेदार व्यवहार की भावना को प्रोत्साहित करते हैं।',
                'आपदाओं जैसे बाढ़ या अन्य संकट की स्थिति में संस्था तेजी से राहत कार्य शुरू करती है और प्रभावित परिवारों तक पौष्टिक भोजन पहुँचाती है। इन अभियानों में स्थानीय समुदाय और स्वयंसेवकों की सक्रिय भागीदारी सुनिश्चित की जाती है, ताकि राहत अधिक से अधिक लोगों तक पहुँच सके।',
                'इसके अतिरिक्त, संस्था शिक्षा, कौशल विकास और महिला सशक्तिकरण जैसे क्षेत्रों में भी निरंतर कार्य कर रही है, जिससे समाज के कमजोर वर्ग आत्मनिर्भर बनकर एक बेहतर भविष्य का निर्माण कर सकें।'
            ]
        },
        vision: {
            title: 'Vision / दृष्टि',
            subtitle: 'A compassionate society for every human and animal',
            hero: './newspaper/n4.jpeg',
            paragraphs: [
                'युवा प्रेरणा फाउंडेशन का विज़न है एक ऐसे समाज का निर्माण करना जहाँ हर व्यक्ति को समान अवसर, सम्मान और सुरक्षित जीवन मिले। हमारा लक्ष्य शिक्षा, स्वास्थ्य, पर्यावरण संरक्षण और सामाजिक न्याय के माध्यम से एक आत्मनिर्भर और जागरूक समाज की स्थापना करना है। हम मानते हैं कि सामूहिक प्रयासों से ही एक सशक्त, स्वच्छ और समृद्ध भारत का निर्माण संभव है।',
                'विस्तृत विज़न: हमारा विज़न है कि कोई भी बच्चा शिक्षा से वंचित न रहे। संस्था एक ऐसे भविष्य की कल्पना करती है जहाँ हर बच्चा गुणवत्तापूर्ण शिक्षा प्राप्त करे और अपने सपनों को साकार करने में सक्षम बने।',
                'स्वास्थ्य के क्षेत्र में, हमारा उद्देश्य है कि समाज के सभी वर्गों को समय पर और उचित चिकित्सा सुविधा उपलब्ध हो। हम ऐसे भारत का निर्माण करना चाहते हैं जहाँ निःशुल्क स्वास्थ्य सेवाएँ हर ज़रूरतमंद तक पहुँचें।',
                'पर्यावरण संरक्षण हमारे विज़न का अभिन्न अंग है। हम हरित और स्वच्छ भारत की दिशा में वृक्षारोपण, जल संरक्षण और स्वच्छता अभियान को बढ़ावा देते हैं ताकि आने वाली पीढ़ियों के लिए सुरक्षित पर्यावरण सुनिश्चित हो।',
                'सामाजिक सशक्तिकरण के क्षेत्र में, हमारा विज़न है कि युवा और महिलाएँ कौशल विकास और रोजगार के अवसरों के माध्यम से आत्मनिर्भर बनें और समाज में सक्रिय भूमिका निभाएँ।',
                'हम एक ऐसे समाज की कल्पना करते हैं जहाँ करुणा, सहयोग और जिम्मेदारी की भावना से सभी नागरिक एक बेहतर और समावेशी भारत के निर्माण में योगदान दें।'
            ]
        },
        values: {
            title: 'Values / मूल्य',
            subtitle: 'Compassion, integrity, service, and unity',
            hero: './plantation/p2.jpeg',
            paragraphs: [
                'युवा प्रेरणा फाउंडेशन के मूल्यों में वह सोच और सिद्धांत निहित हैं, जिनके आधार पर संस्था अपने सभी सामाजिक कार्य करती है। इन्हीं मूल्यों के आधार पर हम शिक्षा, स्वास्थ्य, पर्यावरण और सशक्तिकरण जैसे क्षेत्रों में स्थायी परिवर्तन लाने का प्रयास करते हैं।',
                '1. समानता (Equality): हर व्यक्ति, चाहे उसका सामाजिक या आर्थिक स्तर कुछ भी हो, समान अधिकार और अवसर पाने का हकदार है। हम बिना किसी भेदभाव के सेवाएँ प्रदान करते हैं।',
                '2. सेवा भाव (Service): हमारी टीम निस्वार्थ भाव से कार्य करती है। समाज की सेवा करना ही हमारे सभी प्रयासों की नींव है।',
                '3. करुणा (Compassion): ज़रूरतमंद लोगों और पशुओं के प्रति संवेदनशीलता और दयालुता हमारी प्राथमिकता है।',
                '4. सतत विकास (Sustainability): हम ऐसे कार्यों को बढ़ावा देते हैं जो दीर्घकालिक और पर्यावरण के अनुकूल हों।',
                '5. सशक्तिकरण (Empowerment): संस्था का विश्वास है कि शिक्षा और कौशल विकास से ही समाज के कमजोर वर्ग आत्मनिर्भर बन सकते हैं।',
                '6. पारदर्शिता (Transparency): हमारे सभी कार्यक्रम और पहल पूरी तरह पारदर्शी और जवाबदेह होती हैं।',
                '7. सहयोग (Collaboration): हम मानते हैं कि सरकार, संस्थाओं और नागरिकों के सामूहिक प्रयास से ही स्थायी बदलाव संभव है।'
            ]
        }
    };

    function openBlog(key) {
        const data = blogs[key];
        if (!data) return;
        blogTitle.textContent = data.title;
        blogSubtitle.textContent = data.subtitle;
        blogContent.innerHTML = '';
        if (data.hero) {
            blogHeroImage.src = data.hero;
            blogHeroImage.alt = data.title;
            blogHero.classList.remove('hidden');
        } else {
            blogHero.classList.add('hidden');
        }
        data.paragraphs.forEach(p => {
            const para = document.createElement('p');
            para.textContent = p;
            blogContent.appendChild(para);
        });
        blogPage.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        blogPage.scrollTop = 0;
    }

    function closeBlog() {
        blogPage.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    blogCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-blog');
            openBlog(key);
        });
    });

    if (closeBlogPage) closeBlogPage.addEventListener('click', closeBlog);
    if (backToHomeFromBlog) backToHomeFromBlog.addEventListener('click', closeBlog);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !blogPage.classList.contains('hidden')) {
            closeBlog();
        }
    });
}
