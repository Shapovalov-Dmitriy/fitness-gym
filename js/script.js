
// === MOBILE NAV ===
// ===== МОБИЛЬНОЕ МЕНЮ =====
const burger = document.querySelector('#burger-menu');
const mobileNav = document.querySelector('#mobile-nav');
const overlay = document.querySelector('#overlay');
const closeBtn = document.querySelector('#close-btn');
let lastFocusedElement = null;

// Получаем все фокусируемые элементы внутри меню
const getFocusableElements = () => {
  return mobileNav.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
};

// ===== ОТКРЫТИЕ МЕНЮ =====
const openMenu = () => {
  lastFocusedElement = document.activeElement;

  burger.classList.add('active');
  mobileNav.classList.add('active');
  overlay.classList.add('active');

  burger.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';

  // Переносим фокус на кнопку закрытия
  setTimeout(() => {
    closeBtn?.focus();
  }, 100);
};

// ===== ЗАКРЫТИЕ МЕНЮ =====
const closeMenu = () => {
  burger.classList.remove('active');
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');

  burger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

  // Возвращаем фокус на бургер
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

// ===== ЛОВУШКА ФОКУСА (Focus Trap) =====
const trapFocus = (e) => {
  if (!mobileNav.classList.contains('active')) return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key !== 'Tab') return;

  // Shift + Tab на первом элементе → переход на последний
  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement.focus();
  }
  // Tab на последнем элементе → переход на первый
  else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement.focus();
  }
};

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('active');
  isOpen ? closeMenu() : openMenu();
});

closeBtn?.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
    closeMenu();
  }
});

// Ловушка фокуса
document.addEventListener('keydown', trapFocus);

// Закрытие при клике на ссылку меню
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Добавляем класс scrolled после 50px прокрутки
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
}, { passive: true });
// --------------------------------------------------------------------
// ===== ПЛАВНЫЙ СКРОЛЛ С УЧЁТОМ HEADER =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});