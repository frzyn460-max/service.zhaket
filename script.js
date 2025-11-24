        // Scroll effect for header
        window.addEventListener('scroll', function () {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');

        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = mobileNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && mobileNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<span>در حال ارسال...</span>';

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');

                    // Show success message
                    const formWrapper = document.querySelector('.contact-form-wrapper');
                    formWrapper.innerHTML = `
                <div class="form-success">
                    <div class="form-success-icon">✅</div>
                    <h3 class="form-success-title">درخواست شما با موفقیت ثبت شد!</h3>
                    <p class="form-success-text">
                        کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.<br>
                        از صبر و شکیبایی شما سپاسگزاریم.
                    </p>
                </div>
            `;
                }, 2000);
            });
        }