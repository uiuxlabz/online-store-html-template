/* ESHOPPER - Online Store Template JavaScript */

(function () {
  'use strict';

  // ===== prefers-reduced-motion =====
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // ===== Scroll Reveal (IntersectionObserver) =====
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    if (prefersReducedMotion) {
      // Skip animation: make all .reveal elements visible immediately
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  } else if (revealEls.length) {
    // Fallback: show everything
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===== Sticky Header with Scroll Shadow =====
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ===== Burger Menu Toggle =====
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var isOpen = burger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      if (navOverlay) navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('open')) closeNav();
    });
    function closeNav() {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ===== Categories Dropdown =====
  var catTrigger = document.getElementById('catTrigger');
  var catMenu = document.getElementById('catMenu');
  if (catTrigger && catMenu) {
    catTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      catMenu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!catMenu.contains(e.target) && e.target !== catTrigger) {
        catMenu.classList.remove('open');
      }
    });
  }

  // ===== Active Nav Highlight (via location.pathname) =====
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinksAll = document.querySelectorAll('.nav-links a');
  navLinksAll.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== [data-year] (Footer Year) =====
  var yearEls = document.querySelectorAll('[data-year]');
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = String(currentYear);
  });

  // ===== [data-form] with .form-ok / .form-err =====
  var forms = document.querySelectorAll('[data-form]');
  forms.forEach(function (form) {
    // Create feedback elements if they don't exist
    var okEl = form.querySelector('.form-ok');
    var errEl = form.querySelector('.form-err');
    if (!okEl) {
      okEl = document.createElement('div');
      okEl.className = 'form-ok';
      okEl.setAttribute('role', 'status');
      okEl.setAttribute('aria-live', 'polite');
      form.appendChild(okEl);
    }
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.className = 'form-err';
      errEl.setAttribute('role', 'alert');
      errEl.setAttribute('aria-live', 'assertive');
      form.appendChild(errEl);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      var inputs = form.querySelectorAll('input[required], textarea[required]');
      inputs.forEach(function (input) {
        if (!input.value.trim()) {
          isValid = false;
        }
        if (input.type === 'email' && input.value) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value)) {
            isValid = false;
          }
        }
      });

      // Hide both, then show the appropriate one
      okEl.style.display = 'none';
      errEl.style.display = 'none';

      if (isValid) {
        okEl.textContent = 'Message sent successfully!';
        okEl.style.display = 'block';
        form.reset();
        showToast('Message sent successfully!');
        setTimeout(function () { okEl.style.display = 'none'; }, 3000);
      } else {
        errEl.textContent = 'Please fill in all required fields correctly.';
        errEl.style.display = 'block';
        setTimeout(function () { errEl.style.display = 'none'; }, 3000);
      }
    });
  });

  // ===== [data-add] Cart Demo with [data-cart-count] =====
  var cartCount = 0;
  var cartBtns = document.querySelectorAll('[data-add]');
  cartBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      cartCount++;
      // Update the cart count display in the header
      var cartBtn = document.querySelector('.header-action-btn[aria-label="Cart"] .count');
      if (cartBtn) {
        cartBtn.textContent = String(cartCount);
      }
      // Also update any [data-cart-count] element
      var countEls = document.querySelectorAll('[data-cart-count]');
      countEls.forEach(function (el) {
        el.textContent = String(cartCount);
      });
      showToast('Added to cart!');
    });
  });

  // ===== Toast Notification =====
  var toastEl = document.getElementById('toast');
  var toastTimeout;
  function showToast(msg) {
    if (!toastEl) return;
    clearTimeout(toastTimeout);
    toastEl.textContent = '';
    var icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.innerHTML = '<i class="fas fa-check-circle"></i> ';
    toastEl.appendChild(icon);
    toastEl.appendChild(document.createTextNode(msg));
    toastEl.classList.add('show');
    toastTimeout = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // ===== Back to Top =====
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // ===== Sidebar Accordion ([data-accordion]) =====
  var accordionTriggers = document.querySelectorAll('[data-accordion]');
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var content = trigger.nextElementSibling;
      if (!content) return;
      var isOpen = trigger.classList.contains('open');
      // Close all in same sidebar section
      var section = trigger.closest('.shop-sidebar-section');
      if (section) {
        var allTriggers = section.querySelectorAll('[data-accordion]');
        var allContents = section.querySelectorAll('[data-accordion-content]');
        allTriggers.forEach(function (t) { t.classList.remove('open'); });
        allContents.forEach(function (c) { c.style.maxHeight = null; });
      }
      if (!isOpen) {
        trigger.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion by default
  var firstAcc = document.querySelector('[data-accordion]');
  if (firstAcc) {
    firstAcc.click();
  }

})();
