// Scroll effect for header and banner - بهبود یافته
window.addEventListener('scroll', function () {
    const header = document.getElementById('mainHeader');
    const banner = document.querySelector('.top-banner');
    const mobileNav = document.getElementById('mobileNav');
    
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
        banner.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        banner.classList.remove('scrolled');
    }
    
    // Update mobile nav position when header is scrolled
    if (mobileNav && mobileNav.classList.contains('active')) {
        // Mobile nav will automatically adjust via CSS
    }
});

// Mobile menu toggle - بهبود یافته
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    if (!mobileNav || !mobileMenuToggle) return;
    
    const isClickInsideMenu = mobileNav.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && mobileNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Contact Form Submission - بهبود یافته
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>در حال ارسال...</span>';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            const formWrapper = document.querySelector('.contact-form-wrapper');
            formWrapper.innerHTML = `
                <div class="form-success" style="text-align: center; padding: 60px 40px;">
                    <div class="form-success-icon" style="font-size: 70px; margin-bottom: 25px;">✅</div>
                    <h3 class="form-success-title" style="font-size: 26px; font-weight: 800; color: #26de81; margin-bottom: 15px;">
                        درخواست شما با موفقیت ثبت شد!
                    </h3>
                    <p class="form-success-text" style="font-size: 16px; color: #636e72; line-height: 1.8;">
                        کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.<br>
                        از صبر و شکیبایی شما سپاسگزاریم.
                    </p>
                </div>
            `;
            
            // Scroll to success message smoothly
            formWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2000);
    });
    
    // Form validation enhancement
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const bannerHeight = document.querySelector('.top-banner').offsetHeight;
                const offset = headerHeight + bannerHeight + 20;
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add animation on scroll for service and pricing cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    observer.observe(card);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 991 && mobileNav && mobileNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Console log for debugging
console.log('🎉 ژاکت سرویس - نسخه بهبود یافته بارگذاری شد!');
console.log('✅ مشکلات رسپانسیو برطرف شد');
console.log('✅ فاصله‌گذاری منوی موبایل اصلاح شد');
console.log('✅ اسکرول بهینه‌سازی شد');