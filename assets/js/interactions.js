/* ==========================================================================
   AZZA TOUATI PORTFOLIO - UI INTERACTIONS, MAGNETIC BUTTONS & CUSTOM CURSOR
   ========================================================================== */

export function initInteractions() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Sticky Navbar & Scrollspy
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 2. Custom Dual Reactive Cursor
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover elements expand ring cursor
    const hoverables = document.querySelectorAll('a, button, .project-card, .pillar-card, .stat-card-cyber, .contact-card-sleek');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
  }

  // 3. Magnetic Buttons Effect
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .contact-card-sleek');
  if (window.innerWidth > 768) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // 4. Scroll Reveal Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-init').forEach(el => observer.observe(el));

  // 5. One-Click Copy Email & Toast Notification
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'touatiazza4@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard: touatiazza4@gmail.com');
      }).catch(() => {
        showToast('Contact Azza at: touatiazza4@gmail.com');
      });
    });
  }

  // 6. Stacked Carousel Physics & Logic
  const carouselWrapper = document.querySelector('.experience-3d-wrapper');
  const cards = document.querySelectorAll('.carousel-card');
  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');
  const dots = document.querySelectorAll('.indicator-dot');
  const currentLabel = document.getElementById('carousel-current');

  if (carouselWrapper && cards.length > 0) {
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const dragThreshold = 60;

    const updateIndicators = () => {
      if (dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[currentIndex]) dots[currentIndex].classList.add('active');
      }
      if (currentLabel) {
        currentLabel.textContent = `0${currentIndex + 1}`;
      }
    };

    const updateCarousel = () => {
      cards.forEach((card, index) => {
        card.className = 'carousel-card';
        card.style.transform = ''; 
        card.style.transition = ''; 
        
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === cards.length - 1)) {
          card.classList.add('prev');
        } else if (index === currentIndex + 1 || (currentIndex === cards.length - 1 && index === 0)) {
          card.classList.add('next');
        }
      });
      updateIndicators();
    };

    const goNext = () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    };

    const goPrev = () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    };

    if (btnNext) btnNext.addEventListener('click', goNext);
    if (btnPrev) btnPrev.addEventListener('click', goPrev);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (!isDragging) {
          if (card.classList.contains('prev')) goPrev();
          if (card.classList.contains('next')) goNext();
        }
      });
    });

    // Touch & Mouse Physics
    const handleDragStart = (x) => {
      isDragging = true;
      startX = x;
      cards.forEach(c => c.style.transition = 'none');
      carouselWrapper.style.cursor = 'grabbing';
    };

    const handleDragMove = (x) => {
      if (!isDragging) return;
      currentX = x;
      const diff = currentX - startX;
      
      const activeCard = cards[currentIndex];
      if (activeCard) {
        const tilt = diff * 0.05; // parallax tilt
        activeCard.style.transform = `translateX(${diff}px) rotateY(${tilt}deg) scale(1)`;
      }
    };

    const handleDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      carouselWrapper.style.cursor = 'default';
      const diff = currentX - startX;
      
      // Restore CSS transition for snap/spring back
      cards.forEach(c => {
        c.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease';
      });

      if (Math.abs(diff) > dragThreshold) {
        if (diff < 0) {
          goNext();
        } else {
          goPrev();
        }
      } else {
        updateCarousel(); // snap back if threshold not met
      }
      startX = 0;
      currentX = 0;
    };

    // Touch Events
    carouselWrapper.addEventListener('touchstart', e => handleDragStart(e.touches[0].clientX), {passive: true});
    carouselWrapper.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 10 && e.cancelable) {
        e.preventDefault(); // prevent vertical scroll while swiping
      }
      handleDragMove(e.touches[0].clientX);
    }, {passive: false});
    carouselWrapper.addEventListener('touchend', handleDragEnd);

    // Mouse Events
    carouselWrapper.addEventListener('mousedown', e => {
      // Ignore clicks on buttons/links for drag start
      if (e.target.closest('button') || e.target.closest('a')) return;
      handleDragStart(e.clientX);
    });
    window.addEventListener('mousemove', e => handleDragMove(e.clientX));
    window.addEventListener('mouseup', handleDragEnd);

    // Keyboard Events
    window.addEventListener('keydown', (e) => {
      const rect = carouselWrapper.getBoundingClientRect();
      const isVisible = rect.top >= -rect.height && rect.bottom <= window.innerHeight + rect.height;
      if (isVisible) {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }
    });

    updateCarousel();
  }
}

export function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = '<i class="fa-solid fa-circle-check" style="color: #38bdf8;"></i>';
  toast.innerHTML = `${icon} <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}
