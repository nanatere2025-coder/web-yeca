/* =====================================================
   LA PROFE YECA - AGENDAS DOCENTES
   JavaScript Interactivity
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // =====================================================
    // SMOOTH SCROLLING
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // SCROLL ANIMATIONS
    // =====================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .content-item, .process-step, .gallery-item, .testimonial-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
    document.head.appendChild(style);

    // =====================================================
    // FORM HANDLING
    // =====================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const profession = document.getElementById('profession').value;
            const message = document.getElementById('message').value;

            // Create WhatsApp message
            let whatsappMessage = `¡Hola! Soy ${name} y me interesa una agenda personalizada.\n\n`;

            if (profession) {
                whatsappMessage += `Profesión: ${profession}\n`;
            }

            if (message) {
                whatsappMessage += `Mensaje: ${message}\n`;
            }

            whatsappMessage += `\nMi contacto: ${phone}`;

            // Encode and redirect to WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/56912345678?text=${encodedMessage}`;

            // Show success message
            showNotification('¡Gracias por tu interés! Te redirigimos a WhatsApp...');

            // Redirect after a short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1500);

            // Reset form
            contactForm.reset();
        });
    }

    // =====================================================
    // NOTIFICATION SYSTEM
    // =====================================================
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
      <span class="notification-icon">✨</span>
      <span class="notification-text">${message}</span>
    `;

        // Add styles
        notification.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
      color: white;
      padding: 16px 28px;
      border-radius: 50px;
      box-shadow: 0 8px 30px rgba(255, 107, 107, 0.4);
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      z-index: 10000;
      opacity: 0;
      transition: all 0.4s ease;
    `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // =====================================================
    // PLACEHOLDER IMAGES
    // =====================================================
    // Generate placeholder images for demo
    const placeholderColors = [
        'FFE8E8', // Light pink
        'E8FFF9', // Light mint
        'FFF5E8', // Light cream
        'E8F0FF', // Light blue
    ];

    function setPlaceholderImage(element, text, bgColor = 'FFE8E8') {
        if (element && !element.complete || (element && element.naturalWidth === 0)) {
            element.src = `https://via.placeholder.com/600x400/${bgColor}/FF6B6B?text=${encodeURIComponent(text)}`;
            element.alt = text;
        }
    }

    // Set placeholders for images that fail to load
    document.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener('error', function () {
            const color = placeholderColors[index % placeholderColors.length];
            const text = this.alt || 'Imagen';
            this.src = `https://via.placeholder.com/600x400/${color}/FF6B6B?text=${encodeURIComponent(text)}`;
        });
    });

    // =====================================================
    // PARALLAX EFFECT ON HERO
    // =====================================================
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-wrapper');

    if (hero && heroImage) {
        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

    // =====================================================
    // ACTIVE NAV LINK HIGHLIGHT
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Add active link styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
    .nav-links a.active {
      color: var(--primary);
    }
    .nav-links a.active::after {
      width: 100%;
    }
  `;
    document.head.appendChild(navStyle);

    // =====================================================
    // GALLERY LIGHTBOX (Simple)
    // =====================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-title')?.textContent || '';

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
          <p class="lightbox-caption">${title}</p>
        </div>
      `;

            lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      `;

            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      `;

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
      `;

            const caption = lightbox.querySelector('.lightbox-caption');
            caption.style.cssText = `
        color: white;
        font-size: 1.2rem;
        margin-top: 16px;
        font-family: var(--font-primary);
      `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
                lightboxContent.style.transform = 'scale(1)';
            });

            // Close handlers
            function closeLightbox() {
                lightbox.style.opacity = '0';
                lightboxContent.style.transform = 'scale(0.9)';
                document.body.style.overflow = '';
                setTimeout(() => lightbox.remove(), 300);
            }

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeLightbox();
            }, { once: true });
        });
    });

    console.log('🎨 La Profe Yeca - Sitio cargado correctamente');
});
