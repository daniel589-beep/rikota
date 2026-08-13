/* ==========================================================================
   LA RIKOTA — script.js
   Vanilla JS: sin dependencias externas.
   ========================================================================== */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '573176601733';

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('is-hidden'), 350);
  });

  /* ---------- Navbar: fondo dinámico al hacer scroll ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('is-scrolled', scrolled);
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menú móvil ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  burgerBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver, sin librerías) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Pestañas de categorías del menú ---------- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      menuTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      menuPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.id === targetId);
      });

      // Re-observar tarjetas recién visibles para que también animen
      document.querySelectorAll(`#${targetId} .reveal:not(.is-visible)`).forEach((el) => {
        el.classList.add('is-visible');
      });
    });
  });

  /* ---------- Widget de firma: Pan vs Patacón ---------- */
  const bunButtons = document.querySelectorAll('.bun-toggle__btn');
  const bunToggleBlock = document.querySelector('.bun-toggle');

  bunButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      bunButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const isPatacon = btn.getAttribute('data-bun') === 'patacon';
      bunToggleBlock.classList.toggle('is-patacon', isPatacon);
    });
  });

  /* ---------- Pedido por WhatsApp desde cada tarjeta del menú ---------- */
  document.querySelectorAll('.menu-card__order').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-name') || 'este producto';
      const message = `Hola, quiero pedir: ${productName}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
