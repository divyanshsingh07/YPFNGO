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
    try { if (window.emailjs && emailjs.init) { emailjs.init({ publicKey: 'N7nwjrzlvj9HeRlFZ' }); } } catch (_) {}
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
    setupBlogPages();
    setupScrollAnimations();
    setupParallaxAnimations();
    setupWhatsAppFloat();
    setupBlogAPI();
    setupJoinMissionModal();
    setupShareWorkButtons();
    setupEmergencyHelp();
    setupMarriageProgramModal();
    setupMVCardsSlider();
    setupBlogCardsSlider();
}

// Helper: check if animations are disabled via HTML class
function isAnimationsDisabled() {
    return document.documentElement.classList.contains('disable-animations');
}

// (Removed) certificate image modal utilities

// Wire Activity CTA buttons to existing modals
function setupActivityCtaWiring() {
    const volunteerCTA = document.getElementById('volunteerCTA');
    const donateCTA = document.getElementById('donateCTA');
    const joinBtn = document.getElementById('joinUsBtn');
    const donateBtn = document.getElementById('donateBtn');
    const donateBtnTop = document.getElementById('donateBtnTop');
    const marriageApplyBtn = document.getElementById('marriageApplyBtn');
    const joinMissionHeader = document.getElementById('joinMissionHeader');
    const massMarriageCard = document.getElementById('massMarriageCard');

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

    // Topbar donate mirrors primary donate behavior
    if (donateBtnTop && donateBtn) {
        donateBtnTop.addEventListener('click', (e) => {
            e.preventDefault();
            donateBtn.click();
        });
    }

    // Open Collective Marriage Program form from CTA header and button
    const openMarriageModal = () => {
        const modal = document.getElementById('marriageProgramModal');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    if (marriageApplyBtn) {
        marriageApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMarriageModal();
        });
    }

    if (joinMissionHeader) {
        joinMissionHeader.addEventListener('click', (e) => {
            e.preventDefault();
            openMarriageModal();
        });
    }

    if (massMarriageCard) {
        massMarriageCard.addEventListener('click', (e) => {
            e.preventDefault();
            openMarriageModal();
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
            "assets/images.optimized/p2.jpeg",
            "assets/images.optimized/p3.jpeg",
            "assets/images.optimized/p4.jpeg",
            "assets/images.optimized/p5.jpeg"
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
            "assets/images.optimized/an1.png",
            "assets/images.optimized/Screenshot 2025-09-10 at 7.10.43 PM.png",
            "assets/images.optimized/Screenshot 2025-09-10 at 7.10.52 PM.png",
            "assets/images.optimized/Screenshot 2025-09-10 at 7.11.05 PM.png"
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
            "assets/images.optimized/fd1.png",
            "assets/images.optimized/fd2.png",
            "assets/images.optimized/fd3.png",
            "assets/images.optimized/fd4.jpeg"
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
            "assets/images.optimized/p6.jpeg",
            "assets/images.optimized/p7.jpeg",
            "assets/images.optimized/p10.jpeg",
            "assets/images.optimized/p11.jpeg"
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

// Image r Functionality using w3.CSS with Manual Navigation
function setupImageGallery() {
    const sliderContainer = document.querySelector('.w3-content.w3-section');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!sliderContainer) return;
    
    // Build list of local images from all available folders
    const plantationImages = ['p2.jpeg','p3.jpeg','p4.jpeg','p5.jpeg','p6.jpeg','p7.jpeg','p10.jpeg','p11.jpeg','p12.jpeg','p13.jpeg','p14.jpeg'].map(f => `assets/images.optimized/${f}`);
    const foodDistributionImages = ['fd1.png','fd2.png','fd3.png','fd4.jpeg'].map(f => `assets/images.optimized/${f}`);
    const animalImages = ['an1.png','Screenshot 2025-09-10 at 7.10.43 PM.png','Screenshot 2025-09-10 at 7.10.52 PM.png','Screenshot 2025-09-10 at 7.11.05 PM.png'].map(f => `assets/images.optimized/${f}`);
    const newspaperImages = ['n1.jpeg','n2.jpeg','n3.jpeg','n4.jpeg','n5.jpeg','n6.jpeg'].map(f => `assets/images.optimized/${f}`);
    const achievementImages = ['Ach2.png','Ach3.png','Ach4.png'].map(f => `assets/images.optimized/${f}`);
    const generalImages = ['Ach1.png','qr.jpeg'].map(f => `assets/images/general/${f}`);
    
    const allImages = [
        ...plantationImages,
        ...foodDistributionImages,
        ...animalImages,
        ...achievementImages,
        ...newspaperImages,
        ...generalImages,
    ];
    
    // Limit to first 16 images only
    const imageSources = allImages.slice(0, 16);
    
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
        autoSlideInterval = setInterval(autoCarousel, 3000); // Reduced from 5000ms to 3000ms for faster transitions
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
    const closeJoinModal = document.getElementById('closeJoinFormModal');
    const cancelJoinBtn = document.getElementById('cancelJoinBtn');
    const joinForm = document.getElementById('joinForm');
    
    if (!joinBtn || !joinModal) return;
    
    // Open Google Form in new tab
    joinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://forms.gle/o4p9sZwVBh13cu8m9', '_blank', 'noopener,noreferrer');
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
            "assets/images.optimized/Ach2.png",
            "assets/images.optimized/Ach3.png",
            "assets/images.optimized/Ach4.png"
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
            "assets/images/activities/an1.png",
            
            "assets/images.optimized/an2.png",
            "assets/images.optimized/an3.png",
            "assets/images.optimized/an4.png"
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
            "assets/images/activities/fd1.png",
            "assets/images/activities/fd2.png",
            "assets/images/activities/fd3.png",
            "assets/images/activities/fd4.jpeg",
       
           
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
            "assets/images/activities/p2.jpeg",
            "assets/images/activities/p3.jpeg",
            "assets/images/activities/p4.jpeg",
            "assets/images/activities/p5.jpeg",
            "assets/images/activities/p6.jpeg",
            "assets/images/activities/p7.jpeg",
            "assets/images/activities/p10.jpeg",
            "assets/images/activities/p11.jpeg",
            "assets/images/activities/p12.jpeg",
            "assets/images/activities/p13.jpeg",
            "assets/images/activities/p14.jpeg"
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

    // Developer Contact - open website
    if (footerSupport) {
        footerSupport.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://divyansh.codes/';
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

// (Removed) certificates gallery logic

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
            title: 'Building Hope and Empowering Lives – Yuva Prerna Foundation',
            subtitle: 'आशा और सशक्त जीवन की ओर – युवा प्रेरणा फाउंडेशन',
            hero: './assets/images.optimized/p5.jpeg',
            paragraphs: [
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">Our Mission: Creating Positive Change in Every Life</h3>',
                'At Yuva Prerna Foundation, our mission is to bring long-term positive change in the lives of people through coordinated efforts in education, healthcare, food distribution, disaster relief, and social welfare. We aim to ensure that every individual can live with dignity and hope.',
                'We are currently focusing our efforts in Gonda, Uttar Pradesh, reaching out to families and individuals who need support the most. Our work includes:',
                '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Education:</strong> Supporting children and youth with learning resources, scholarships, and skill development programs.</li><li><strong>Health:</strong> Organizing medical camps, awareness programs, and healthcare support for underprivileged communities.</li><li><strong>Food and Nutrition:</strong> Providing meals, ration kits, and nutrition support to families in need.</li><li><strong>Disaster Relief:</strong> Extending quick aid and assistance during natural calamities and emergencies.</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">Collective Marriage Program:</h4>',
                'One of our upcoming initiatives is a Collective Marriage Program, where we will help 10–15 couples at a time celebrate their weddings with dignity and joy. Many families struggle to arrange weddings due to financial difficulties, and this program aims to ease their burden while fostering community spirit.',
                'Through all our initiatives, we believe in empowering lives, spreading hope, and creating a lasting positive impact. Together, with volunteers, donors, and well-wishers, we can make a meaningful difference in the lives of many.',
                '<hr class="my-6 border-gray-300">',
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">हमारा मिशन: हर जीवन में सकारात्मक बदलाव लाना</h3>',
                'युवा प्रेरणा फाउंडेशन का मिशन है शिक्षा, स्वास्थ्य, भोजन, आपदा राहत और सामाजिक कल्याण के माध्यम से लोगों के जीवन में दीर्घकालिक सकारात्मक बदलाव लाना। हमारा उद्देश्य है कि हर व्यक्ति गरिमा और आशा के साथ जीवन जी सके।',
                'हमारा मुख्य ध्यान वर्तमान में गोंडा, उत्तर प्रदेश में उन परिवारों और व्यक्तियों तक सहायता पहुंचाना है जिन्हें इसकी सबसे अधिक जरूरत है। हमारे कार्यों में शामिल हैं:',
                '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>शिक्षा:</strong> बच्चों और युवाओं को शिक्षण संसाधन, छात्रवृत्ति और कौशल विकास कार्यक्रमों के माध्यम से सहायता देना।</li><li><strong>स्वास्थ्य:</strong> चिकित्सकीय शिविर, जागरूकता कार्यक्रम और स्वास्थ्य सहायता प्रदान करना।</li><li><strong>भोजन और पोषण:</strong> जरूरतमंद परिवारों को भोजन, राशन किट और पोषण सहायता देना।</li><li><strong>आपदा राहत:</strong> प्राकृतिक आपदाओं और आपात स्थितियों में त्वरित सहायता और मदद प्रदान करना।</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">सामूहिक विवाह कार्यक्रम:</h4>',
                'हमारी अगली पहल सामूहिक विवाह कार्यक्रम है, जिसमें हम एक बार में 10–15 जोड़ों की शादी समारोह में सहायता करेंगे, ताकि वे गरिमा और खुशी के साथ अपने जीवन का यह महत्वपूर्ण अवसर मना सकें। कई परिवार वित्तीय कठिनाइयों के कारण शादी का आयोजन नहीं कर पाते, और यह कार्यक्रम उनके बोझ को कम करने और सामुदायिक भावना बढ़ाने का प्रयास है।',
                'हमारे सभी प्रयासों का उद्देश्य है जीवन सशक्त करना, आशा फैलाना और स्थायी सकारात्मक प्रभाव बनाना। स्वयंसेवकों, दानदाताओं और शुभचिंतकों के साथ मिलकर, हम कई लोगों के जीवन में वास्तविक बदलाव ला सकते हैं।'
            ]
        },
        vision: {
            title: 'Envisioning a Compassionate Future – Yuva Prerna Foundation',
            subtitle: 'एक करुणामय भविष्य की कल्पना – युवा प्रेरणा फाउंडेशन',
            hero: './assets/images.optimized/n4.jpeg',
            paragraphs: [
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">Our Vision: A Compassionate Society for Every Human and Animal</h3>',
                'At Yuva Prerna Foundation, we envision a world where every individual, regardless of their background, has equal opportunities to thrive. Our vision extends beyond immediate assistance to creating lasting, systemic change that empowers communities and builds a more just society.',
                'We dream of a future where:',
                '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>Education:</strong> Every child has access to quality education and the tools to achieve their dreams</li><li><strong>Healthcare:</strong> No one is denied medical care due to financial constraints</li><li><strong>Social Justice:</strong> Equal opportunities and dignity for all members of society</li><li><strong>Environmental Protection:</strong> A clean, green India for future generations</li><li><strong>Community Empowerment:</strong> Self-reliant communities that support each other</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">Our Long-term Goals:</h4>',
                'Through our work in Gonda, Uttar Pradesh, and beyond, we aim to create a model of community development that can be replicated across India. We believe that by empowering individuals and strengthening communities, we can build a nation where compassion, cooperation, and collective responsibility form the foundation of society.',
                'Our vision includes not just human welfare, but also the protection and care of animals, recognizing that a truly compassionate society extends its care to all living beings.',
                '<hr class="my-6 border-gray-300">',
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">हमारा विज़न: हर मनुष्य और पशु के लिए करुणामय समाज</h3>',
                'युवा प्रेरणा फाउंडेशन में, हम एक ऐसे विश्व की कल्पना करते हैं जहाँ हर व्यक्ति, उनकी पृष्ठभूमि के बावजूद, समान अवसरों के साथ फल-फूल सके। हमारा विज़न तत्कालिक सहायता से आगे बढ़कर स्थायी, व्यवस्थागत परिवर्तन लाने का है जो समुदायों को सशक्त बनाता है और एक अधिक न्यायपूर्ण समाज का निर्माण करता है।',
                'हम एक ऐसे भविष्य की कल्पना करते हैं जहाँ:',
                '<ul class="list-disc list-inside space-y-2 mb-4"><li><strong>शिक्षा:</strong> हर बच्चे को गुणवत्तापूर्ण शिक्षा और अपने सपनों को साकार करने के साधन मिलें</li><li><strong>स्वास्थ्य:</strong> आर्थिक कठिनाइयों के कारण किसी को भी चिकित्सा सुविधा से वंचित न रखा जाए</li><li><strong>सामाजिक न्याय:</strong> समाज के सभी सदस्यों के लिए समान अवसर और गरिमा</li><li><strong>पर्यावरण संरक्षण:</strong> आने वाली पीढ़ियों के लिए स्वच्छ, हरित भारत</li><li><strong>समुदाय सशक्तिकरण:</strong> आत्मनिर्भर समुदाय जो एक-दूसरे का समर्थन करते हैं</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">हमारे दीर्घकालिक लक्ष्य:</h4>',
                'गोंडा, उत्तर प्रदेश और उससे आगे के अपने कार्य के माध्यम से, हम समुदाय विकास का एक मॉडल बनाना चाहते हैं जिसे पूरे भारत में दोहराया जा सके। हमारा मानना है कि व्यक्तियों को सशक्त बनाकर और समुदायों को मजबूत करके, हम एक ऐसे राष्ट्र का निर्माण कर सकते हैं जहाँ करुणा, सहयोग और सामूहिक जिम्मेदारी समाज की नींव बनती है।',
                'हमारे विज़न में न केवल मानव कल्याण शामिल है, बल्कि पशुओं की सुरक्षा और देखभाल भी है, यह मानते हुए कि एक वास्तव में करुणामय समाज अपनी देखभाल सभी जीवित प्राणियों तक विस्तारित करता है।'
            ]
        },
        values: {
            title: 'Our Core Values – Yuva Prerna Foundation',
            subtitle: 'हमारे मूल मूल्य – युवा प्रेरणा फाउंडेशन',
            hero: './assets/images.optimized/p2.jpeg',
            paragraphs: [
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">Our Core Values: Compassion, Integrity, Service, and Unity</h3>',
                'At Yuva Prerna Foundation, our values are the fundamental principles that guide every decision we make and every action we take. These core values shape our approach to social work and ensure that we remain true to our mission of creating positive change in society.',
                'Our values are:',
                '<ul class="list-disc list-inside space-y-3 mb-4"><li><strong>Compassion (करुणा):</strong> We approach every individual with empathy and understanding, recognizing the inherent dignity of all human beings and animals.</li><li><strong>Integrity (ईमानदारी):</strong> We maintain the highest standards of honesty, transparency, and ethical conduct in all our activities.</li><li><strong>Service (सेवा):</strong> We are committed to selfless service, putting the needs of the community above personal interests.</li><li><strong>Unity (एकता):</strong> We believe in the power of collective action and work to build bridges between different communities and stakeholders.</li><li><strong>Equality (समानता):</strong> We treat every person with equal respect and dignity, regardless of their background or circumstances.</li><li><strong>Empowerment (सशक्तिकरण):</strong> We focus on building the capacity of individuals and communities to become self-reliant.</li><li><strong>Sustainability (सततता):</strong> We promote practices that ensure long-term positive impact and environmental responsibility.</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">How We Live Our Values:</h4>',
                'These values are not just words on paper – they are actively practiced in our daily work. From our medical camps in Gonda to our educational programs, every initiative reflects our commitment to these core principles. We believe that by staying true to these values, we can create lasting change that benefits the entire community.',
                '<hr class="my-6 border-gray-300">',
                '<h3 class="text-2xl font-bold text-gray-800 mb-4">हमारे मूल मूल्य: करुणा, ईमानदारी, सेवा और एकता</h3>',
                'युवा प्रेरणा फाउंडेशन में, हमारे मूल्य वे मौलिक सिद्धांत हैं जो हमारे हर निर्णय और हर कार्य को निर्देशित करते हैं। ये मूल मूल्य सामाजिक कार्य के प्रति हमारे दृष्टिकोण को आकार देते हैं और यह सुनिश्चित करते हैं कि हम समाज में सकारात्मक बदलाव लाने के अपने मिशन के प्रति सच्चे रहें।',
                'हमारे मूल्य हैं:',
                '<ul class="list-disc list-inside space-y-3 mb-4"><li><strong>करुणा (Compassion):</strong> हम हर व्यक्ति के साथ सहानुभूति और समझ के साथ पेश आते हैं, सभी मनुष्यों और पशुओं की अंतर्निहित गरिमा को पहचानते हैं।</li><li><strong>ईमानदारी (Integrity):</strong> हम अपनी सभी गतिविधियों में ईमानदारी, पारदर्शिता और नैतिक आचरण के उच्चतम मानकों को बनाए रखते हैं।</li><li><strong>सेवा (Service):</strong> हम निःस्वार्थ सेवा के लिए प्रतिबद्ध हैं, व्यक्तिगत हितों से ऊपर समुदाय की जरूरतों को रखते हैं।</li><li><strong>एकता (Unity):</strong> हम सामूहिक कार्य की शक्ति में विश्वास करते हैं और विभिन्न समुदायों और हितधारकों के बीच पुल बनाने का काम करते हैं।</li><li><strong>समानता (Equality):</strong> हम हर व्यक्ति के साथ समान सम्मान और गरिमा के साथ व्यवहार करते हैं, उनकी पृष्ठभूमि या परिस्थितियों की परवाह किए बिना।</li><li><strong>सशक्तिकरण (Empowerment):</strong> हम व्यक्तियों और समुदायों की क्षमता निर्माण पर ध्यान केंद्रित करते हैं ताकि वे आत्मनिर्भर बन सकें।</li><li><strong>सततता (Sustainability):</strong> हम ऐसी प्रथाओं को बढ़ावा देते हैं जो दीर्घकालिक सकारात्मक प्रभाव और पर्यावरणीय जिम्मेदारी सुनिश्चित करती हैं।</li></ul>',
                '<h4 class="text-xl font-bold text-gray-800 mb-3">हम अपने मूल्यों को कैसे जीते हैं:</h4>',
                'ये मूल्य केवल कागज पर शब्द नहीं हैं – ये हमारे दैनिक कार्य में सक्रिय रूप से अभ्यास किए जाते हैं। गोंडा में हमारे चिकित्सा शिविरों से लेकर हमारे शैक्षिक कार्यक्रमों तक, हर पहल इन मूल सिद्धांतों के प्रति हमारी प्रतिबद्धता को दर्शाती है। हम मानते हैं कि इन मूल्यों के प्रति सच्चे रहकर, हम स्थायी बदलाव ला सकते हैं जो पूरे समुदाय को लाभ पहुंचाता है।'
            ]
        }
    };

    function openBlog(key) {
        const data = blogs[key];
        if (!data) return;
        blogTitle.textContent = data.title;
        blogSubtitle.textContent = data.subtitle;
        blogContent.innerHTML = '';
        blogContent.setAttribute('data-blog', key); // Add data attribute for icon styling
        if (data.hero) {
            blogHeroImage.src = data.hero;
            blogHeroImage.alt = data.title;
            blogHero.classList.remove('hidden');
        } else {
            blogHero.classList.add('hidden');
        }
        data.paragraphs.forEach(p => {
            const para = document.createElement('div');
            para.innerHTML = p;
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

// Blog API Integration: support static dev on :5500 and same-origin prod
const IS_STATIC_DEV = window.location.port === '5500';
const BACKEND_ORIGIN = IS_STATIC_DEV ? 'http://localhost:3000' : '';
const API_BASE_URL = `${BACKEND_ORIGIN}/api`;

// Setup Blog API functionality
function setupBlogAPI() {
    // Show static blog cards instead of loading from API
    showStaticBlogCards();
}

// Show static blog cards
function showStaticBlogCards() {
    const loadingElement = document.getElementById('blogLoading');
    const errorElement = document.getElementById('blogError');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    const viewAllElement = document.getElementById('viewAllBlogs');

    // Hide all other states
    hideElement(loadingElement);
    hideElement(errorElement);
    hideElement(emptyElement);
    hideElement(viewAllElement);
    
    // Show the grid with our static cards
    showElement(gridElement);
}

// Emergency Help Button Setup
function setupEmergencyHelp() {
    const emergencyBtn = document.getElementById('emergencyHelpBtn');
    
    if (!emergencyBtn) return;
    
    // Add click event listener
    emergencyBtn.addEventListener('click', function(e) {
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Optional: Add analytics or tracking here
        console.log('Emergency help button clicked');
        
        // The tel: link will handle the actual phone call
        // No need to prevent default as we want the phone to dial
    });
    
    // Add keyboard accessibility
    emergencyBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add focus management for better accessibility
    emergencyBtn.addEventListener('focus', function() {
        this.style.outline = '2px solid #fbbf24';
        this.style.outlineOffset = '2px';
    });
    
    emergencyBtn.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
}

// Load blogs from backend API
async function loadBlogs() {
    const loadingElement = document.getElementById('blogLoading');
    const errorElement = document.getElementById('blogError');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    const viewAllElement = document.getElementById('viewAllBlogs');

    // Show loading state
    showElement(loadingElement);
    hideElement(errorElement);
    hideElement(gridElement);
    hideElement(emptyElement);
    hideElement(viewAllElement);

    try {
        const response = await fetch(`${API_BASE_URL}/blogs?limit=50&page=1`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const blogs = Array.isArray(data?.data) ? data.data : [];
        if (data?.success && blogs.length > 0) {
            displayBlogs(blogs);
            hideElement(viewAllElement);
        } else {
            showEmptyState();
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
        showErrorState();
    } finally {
        hideElement(loadingElement);
    }
}

// Load all blogs (for "View All" button)
async function loadAllBlogs() {
    const loadingElement = document.getElementById('blogLoading');
    const errorElement = document.getElementById('blogError');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    const viewAllElement = document.getElementById('viewAllBlogs');

    // Show loading state
    showElement(loadingElement);
    hideElement(errorElement);
    hideElement(gridElement);
    hideElement(emptyElement);
    hideElement(viewAllElement);

    try {
        const response = await fetch(`${API_BASE_URL}/blogs?page=1&limit=100`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const blogs = Array.isArray(data?.data) ? data.data : [];
        if (data?.success && blogs.length > 0) {
            displayBlogs(blogs);
        } else {
            showEmptyState();
        }
    } catch (error) {
        console.error('Error loading all blogs:', error);
        showErrorState();
    } finally {
        hideElement(loadingElement);
    }
}

// Display blogs in the grid
function displayBlogs(blogs) {
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');

    if (!blogs || blogs.length === 0) {
        showEmptyState();
        return;
    }

    gridElement.innerHTML = '';

    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        gridElement.appendChild(blogCard);
    });

    showElement(gridElement);
    hideElement(emptyElement);
}

// Create a blog card element
function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 flex flex-col h-[520px]';
    
    // Format date
    const date = new Date(blog.created_at || blog.date || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Image URL served by backend endpoint (absolute in static dev)
    const imageUrl = blog.image_url ? `${BACKEND_ORIGIN}${blog.image_url}` : 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

    // Create tags HTML
    const tagsHtml = blog.tags && blog.tags.length > 0 
        ? blog.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${tag}</span>`).join('')
        : '';

    card.innerHTML = `
        <div class="relative overflow-hidden h-[40%]">
            <img src="${imageUrl}" alt="${blog.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">${blog.category || 'Update'}</span>
            </div>
            <div class="absolute top-4 right-4"><span class="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium shadow-lg"><i class="fas fa-calendar-alt mr-1"></i>${date}</span></div>
            <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-white text-lg font-bold mb-1 line-clamp-2 drop-shadow-lg">${blog.title}</h3>
            </div>
        </div>
        <div class="p-6 flex flex-col h-[60%]">
            <div class="flex items-center text-sm text-gray-500 mb-2">
                <i class="fas fa-calendar-alt mr-2 text-orange-500"></i>
                <span class="font-medium">${date}</span>
            </div>
            <p class="text-gray-600 mb-2 line-clamp-1 font-medium">${blog.category || ''}</p>
            <p class="text-gray-700 text-sm mb-4 line-clamp-4 leading-relaxed">${stripHtmlToText(blog.description || '')}</p>
            ${tagsHtml ? `<div class="mb-6">${tagsHtml}</div>` : ''}
            <button onclick="openBlogInSameTab('${blog.slug || blog._id}')" class="mt-auto w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                <i class="fas fa-book-open mr-2"></i>Read Full Story
            </button>
        </div>
    `;

    return card;
}

// View individual blog
async function viewBlog(blogId) {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`);
        const data = await response.json();

        if (data.success) {
            showBlogModal(data.data.blog);
        } else {
            showNotification('Blog not found', 'error');
        }
    } catch (error) {
        console.error('Error loading blog:', error);
        showNotification('Error loading blog', 'error');
    }
}

// Open blog in same tab
function openBlogInSameTab(slugOrId) {
    const isDevStatic = window.location.port === '5500';
    window.location.href = `${isDevStatic ? 'http://localhost:3000' : ''}/blog/${slugOrId}`;
}

// Create blog page content for new tab
function createBlogPageContent(blog) {
    const date = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const imageFile2 = blog.image || blog.coverImage;
    const imageUrl = imageFile2 ? `${API_BASE_URL.replace('/api', '')}/uploads/${imageFile2}` : 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

    const tagsHtml = blog.tags && blog.tags.length > 0 
        ? blog.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">${tag}</span>`).join('')
        : '';

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${blog.title} - NGO Shivam</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                }
                .blog-content {
                    line-height: 1.8;
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                }
            </style>
        </head>
        <body>
            <div class="min-h-screen py-8">
                <div class="max-w-4xl mx-auto px-4">
                    <!-- Header -->
                    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                        <!-- Hero Image -->
                        <div class="relative h-64 md:h-80">
                            <img src="${imageUrl}" alt="${blog.title}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black bg-opacity-30"></div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${blog.title}</h1>
                                <p class="text-lg text-gray-200">${blog.subtitle}</p>
                            </div>
                        </div>
                        
                        <!-- Blog Meta -->
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                                <span class="mr-6"><i class="fas fa-calendar-alt mr-2"></i>${date}</span>
                                <span class="mr-6"><i class="fas fa-user mr-2"></i>${blog.author}</span>
                                <span><i class="fas fa-eye mr-2"></i>${blog.views || 0} views</span>
                            </div>
                            ${tagsHtml ? `<div class="mb-4">${tagsHtml}</div>` : ''}
                        </div>
                        
                        <!-- Blog Content -->
                        <div class="p-6">
                            <div class="blog-content text-gray-700 text-lg">
                                ${blog.description.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div class="p-6 bg-gray-50 border-t border-gray-200">
                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-500">
                                    <i class="fas fa-building mr-2"></i>NGO Shivam
                                </div>
                                <button onclick="window.close()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <i class="fas fa-times mr-2"></i>Close
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Back to Main Site -->
                    <div class="text-center">
                        <a href="${window.location.origin}/frontend/index.html" target="_parent" class="inline-flex items-center bg-white text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Main Site
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Show blog modal
function showBlogModal(blog) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('blogModal');
    if (!modal) {
        modal = createBlogModal();
        document.body.appendChild(modal);
    }

    // Format date
    const date = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create image URL
    const imageFile2 = blog.image || blog.coverImage;
    const imageUrl = imageFile2 ? `${API_BASE_URL.replace('/api', '')}/uploads/${imageFile2}` : 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

    // Create tags HTML
    const tagsHtml = blog.tags && blog.tags.length > 0 
        ? blog.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">${tag}</span>`).join('')
        : '';

    // Update modal content
    modal.querySelector('#blogModalTitle').textContent = blog.title;
    modal.querySelector('#blogModalSubtitle').textContent = blog.subtitle;
    modal.querySelector('#blogModalImage').src = imageUrl;
    modal.querySelector('#blogModalImage').alt = blog.title;
    modal.querySelector('#blogModalDate').textContent = date;
    modal.querySelector('#blogModalAuthor').textContent = blog.author;
    modal.querySelector('#blogModalViews').textContent = blog.views || 0;
    modal.querySelector('#blogModalContent').innerHTML = (blog.content || blog.description || '').replace(/\n/g, '<br>');
    modal.querySelector('#blogModalTags').innerHTML = tagsHtml;

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Create blog modal
function createBlogModal() {
    const modal = document.createElement('div');
    modal.id = 'blogModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <div class="flex justify-between items-start">
                    <h2 id="blogModalTitle" class="text-2xl font-bold text-gray-800 pr-4"></h2>
                    <button onclick="closeBlogModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <img id="blogModalImage" src="" alt="" class="w-full h-64 md:h-80 object-cover rounded-lg mb-6">
                <div class="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                    <span class="mr-4"><i class="fas fa-calendar-alt mr-1"></i><span id="blogModalDate"></span></span>
                    <span class="mr-4"><i class="fas fa-user mr-1"></i><span id="blogModalAuthor"></span></span>
                    <span><i class="fas fa-eye mr-1"></i><span id="blogModalViews"></span> views</span>
                </div>
                <h3 id="blogModalSubtitle" class="text-xl text-gray-600 mb-4 font-medium"></h3>
                <div id="blogModalContent" class="text-gray-700 leading-relaxed mb-6"></div>
                <div id="blogModalTags" class="mb-6"></div>
            </div>
        </div>
    `;

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBlogModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeBlogModal();
        }
    });

    return modal;
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Show empty state
function showEmptyState() {
    const emptyElement = document.getElementById('blogEmpty');
    const gridElement = document.getElementById('blogGrid');
    const viewAllElement = document.getElementById('viewAllBlogs');

    showElement(emptyElement);
    hideElement(gridElement);
    hideElement(viewAllElement);
}

// Show error state
function showErrorState() {
    const errorElement = document.getElementById('blogError');
    const gridElement = document.getElementById('blogGrid');
    const emptyElement = document.getElementById('blogEmpty');
    const viewAllElement = document.getElementById('viewAllBlogs');

    showElement(errorElement);
    hideElement(gridElement);
    hideElement(emptyElement);
    hideElement(viewAllElement);
}

// Helper functions to show/hide elements
function showElement(element) {
    if (element) {
        element.classList.remove('hidden');
    }
}

function hideElement(element) {
    if (element) {
        element.classList.add('hidden');
    }
}

// Utility: Strip HTML tags to plain text for safe excerpts
function stripHtmlToText(htmlString) {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlString || '';
    const text = tmp.textContent || tmp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
}

// Setup Join Mission Modal functionality
function setupJoinMissionModal() {
    const modal = document.getElementById('joinMissionModal');
    const modalContent = document.getElementById('joinMissionModalContent');
    const closeBtn = document.getElementById('closeJoinModal');
    const volunteerBtns = document.querySelectorAll('#volunteerBtn1, #volunteerBtn2');
    
    if (!modal || !modalContent) {
        console.log('Modal elements not found');
        return;
    }
    
    // Open modal function
    function openModal() {
        console.log('Opening modal');
        modal.classList.remove('hidden');
        // Trigger animation
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        console.log('Closing modal');
        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Event listeners for volunteer buttons
    volunteerBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    // Close button event listener
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    } else {
        console.log('Close button not found');
    }
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Collective Marriage Program Modal
function setupMarriageProgramModal() {
    const modal = document.getElementById('marriageProgramModal');
    const closeBtn = document.getElementById('closeMarriageProgramModal');
    const cancelBtn = document.getElementById('cancelMarriageProgram');
    const fileBtn = document.getElementById('marriageFilesBtn');
    const fileInput = document.getElementById('marriageFiles');
    const fileList = document.getElementById('marriageFilesList');
    const form = document.getElementById('marriageProgramForm');

    if (!modal || !form) return;

    // Attachment limits to avoid EmailJS 413 (payload too large)
    const MAX_FILES = 2;                // allow up to 2 files
    const MAX_FILE_BYTES = 300_000;     // ~300 KB per file (to avoid base64 overhead hitting limits)
    const MAX_TOTAL_BYTES = 600_000;    // ~600 KB total

    async function compressImageFile(originalFile, options = {}) {
        const { maxDimension = 1280, quality = 0.6 } = options;
        if (!originalFile || !originalFile.type || !originalFile.type.startsWith('image/')) return originalFile;

        const fileDataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(originalFile);
        });

        const img = await new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = fileDataUrl;
        });

        let { width, height } = img;
        const scale = Math.min(1, maxDimension / Math.max(width, height));
        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Use JPEG for broad compatibility and size
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
        if (!blob) return originalFile;
        return new File([blob], originalFile.name.replace(/\.(png|webp|heic|jpeg|jpg)$/i, '.jpg'), { type: 'image/jpeg' });
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close on backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    // File button
    if (fileBtn && fileInput) {
        fileBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
            const picked = Array.from(fileInput.files || []);
            // Compress images, keep non-images as-is
            const processed = [];
            for (const f of picked.slice(0, MAX_FILES)) {
                if (f.type && f.type.startsWith('image/')) {
                    const compressed = await compressImageFile(f, { maxDimension: 1280, quality: 0.6 });
                    processed.push(compressed);
                } else {
                    processed.push(f);
                }
            }

            // Validate sizes
            const total = processed.reduce((sum, f) => sum + (f.size || 0), 0);
            const tooMany = processed.length > MAX_FILES;
            const tooLargeOne = processed.some(f => (f.size || 0) > MAX_FILE_BYTES);
            const tooLargeTotal = total > MAX_TOTAL_BYTES;
            if (tooMany || tooLargeOne || tooLargeTotal) {
                showNotification('Max 2 files, ~300 KB each, ~600 KB total. Please compress and try again.', 'error');
                fileInput.value = '';
                if (fileList) fileList.innerHTML = '';
                return;
            }

            // Replace input files using DataTransfer
            const dt = new DataTransfer();
            processed.forEach(f => dt.items.add(f));
            fileInput.files = dt.files;

            if (fileList) {
                const items = processed.map(f => `• ${f.name} (${Math.ceil((f.size||0)/1024)} KB)`).join('<br>');
                fileList.innerHTML = items || '';
            }
        });
    }

    // Submit handler via EmailJS
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation (phone)
        const coupleName = (form.coupleName?.value || '').trim();
        const contact = (form.contact?.value || '').trim();
        const address = (form.address?.value || '').trim();
        const supportType = (form.supportType?.value || '').trim();
        const phoneOk = /^\+?\d[\d\s-]{7,}$/.test(contact);
        if (!coupleName || !address || !supportType || !phoneOk) {
            showNotification('Please fill all required fields with valid details. / कृपया सभी आवश्यक फ़ील्ड सही भरें।', 'error');
            return;
        }

        // Enforce file constraints again before submit
        if (fileInput) {
            const files = Array.from(fileInput.files || []);
            const total = files.reduce((sum, f) => sum + (f.size || 0), 0);
            const tooMany = files.length > MAX_FILES;
            const tooLargeOne = files.some(f => (f.size || 0) > MAX_FILE_BYTES);
            const tooLargeTotal = total > MAX_TOTAL_BYTES;
            if (tooMany || tooLargeOne || tooLargeTotal) {
                showNotification('Max 2 files, ~300 KB each, ~600 KB total. Please compress and try again.', 'error');
                return;
            }
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
        }

        try {
            // Map form fields to EmailJS template vars using name attributes
            // Ensure your EmailJS template has variables: coupleName, contact, address, supportType
            const serviceId = 'service_iated1v';
            const templateId = 'template_dj5to49';

            if (!(window.emailjs && emailjs.sendForm)) throw new Error('EmailJS not loaded');

            await emailjs.sendForm(serviceId, templateId, form);

            showNotification('Submitted successfully. We will contact you soon. / सफलतापूर्वक जमा हो गया।', 'success');
            form.reset();
            if (fileList) fileList.innerHTML = '';
            closeModal();
        } catch (err) {
            showNotification('Unable to submit right now. Please try again later. / अभी सबमिट नहीं हो सका, बाद में पुनः प्रयास करें।', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    });
}

// Global function for close button (inline onclick)
function closeJoinModal() {
    const modal = document.getElementById('joinMissionModal');
    const modalContent = document.getElementById('joinMissionModalContent');
    
    if (modal && modalContent) {
        console.log('Closing modal via global function');
        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Setup Share Work buttons to redirect to Instagram
function setupShareWorkButtons() {
    const shareBtns = document.querySelectorAll('#shareWorkBtn1, #shareWorkBtn2');
    const driveUrl = 'https://drive.google.com/drive/folders/1rc8qvqcQqQZgFogQXjJvXFEBk5LttMYg?usp=sharing';
    
    shareBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(driveUrl, '_blank', 'noopener,noreferrer');
            });
        }
    });
}

// Mission, Vision, Values Cards Slider for Mobile
function setupMVCardsSlider() {
    const track = document.getElementById('mvCardsTrack');
    const prevBtn = document.getElementById('mvCardsPrev');
    const nextBtn = document.getElementById('mvCardsNext');
    const dots = document.querySelectorAll('.mvCardsDot');
    
    if (!track || !prevBtn || !nextBtn || dots.length === 0) {
        console.log('MV Cards slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const totalCards = 3;
    
    // Update slider position
    function updateSlider() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600');
            } else {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '0.8';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.3' : '0.8';
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Touch/Swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < totalCards - 1) {
                nextSlide();
            } else if (diffX < 0 && currentIndex > 0) {
                prevSlide();
            }
        }
    });
    
    // Mouse drag support
    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isMouseDragging = false;
    
    track.addEventListener('mousedown', (e) => {
        isMouseDragging = true;
        mouseStartX = e.clientX;
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        mouseCurrentX = e.clientX;
    });
    
    track.addEventListener('mouseup', () => {
        if (!isMouseDragging) return;
        isMouseDragging = false;
        
        const diffX = mouseStartX - mouseCurrentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < totalCards - 1) {
                nextSlide();
            } else if (diffX < 0 && currentIndex > 0) {
                prevSlide();
            }
        }
    });
    
    // Auto-play (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < totalCards - 1) {
                nextSlide();
            } else {
                currentIndex = 0;
                updateSlider();
            }
        }, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover/interaction
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    track.addEventListener('touchstart', stopAutoSlide);
    
    // Initialize
    updateSlider();
}

// Blog Cards Slider for Mobile
function setupBlogCardsSlider() {
    const track = document.getElementById('blogCardsTrack');
    const prevBtn = document.getElementById('blogCardsPrev');
    const nextBtn = document.getElementById('blogCardsNext');
    const dots = document.querySelectorAll('.blogCardsDot');
    
    if (!track || !prevBtn || !nextBtn || dots.length === 0) {
        console.log('Blog Cards slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const totalCards = 3;
    
    // Update slider position
    function updateSlider() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600');
            } else {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '0.8';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.3' : '0.8';
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlider();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Touch/Swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < totalCards - 1) {
                nextSlide();
            } else if (diffX < 0 && currentIndex > 0) {
                prevSlide();
            }
        }
    });
    
    // Mouse drag support
    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isMouseDragging = false;
    
    track.addEventListener('mousedown', (e) => {
        isMouseDragging = true;
        mouseStartX = e.clientX;
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        mouseCurrentX = e.clientX;
    });
    
    track.addEventListener('mouseup', () => {
        if (!isMouseDragging) return;
        isMouseDragging = false;
        
        const diffX = mouseStartX - mouseCurrentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < totalCards - 1) {
                nextSlide();
            } else if (diffX < 0 && currentIndex > 0) {
                prevSlide();
            }
        }
    });
    
    // Auto-play (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < totalCards - 1) {
                nextSlide();
            } else {
                currentIndex = 0;
                updateSlider();
            }
        }, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover/interaction
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    track.addEventListener('touchstart', stopAutoSlide);
    
    // Initialize
    updateSlider();
}
