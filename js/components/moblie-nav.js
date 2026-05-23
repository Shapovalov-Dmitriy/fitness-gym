export const initMobileNav = () => {
  // ===== MOBILE MENU =====
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('overlay');
  const close = document.getElementById('close-btn');
  const navLinks = nav.querySelectorAll('a');
  let lastFocusedElement = null;

  const openMenu = () => {
    lastFocusedElement = document.activeElement;
    nav.classList.add('active');
    overlay.classList.add('active');
    nav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    document.body.style.overflow = 'hidden';
    navLinks[0]?.focus();
    trapFocus(nav);
  };

  const closeMenu = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    nav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const trapFocus = (element) => {
    const focusable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  };

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
};
