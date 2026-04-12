/* ============================================================
   Adawix — main.js  |  Header, Footer, Dark Mode, Toast, Cookie
   ============================================================ */

/* ── Header HTML ── */
const HEADER_HTML = `
<a class="skip-link" href="#main-content">تخطى إلى المحتوى</a>
<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="أداويكس - الصفحة الرئيسية">
        <span class="logo-text">Adawix</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="فتح القائمة" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="siteNav" aria-label="القائمة الرئيسية">
        <ul>
          <li><a href="/text-tools/" data-nav="text">أدوات النصوص</a></li>
          <li><a href="/image-tools/" data-nav="image">أدوات الصور</a></li>
          <li><a href="/pdf-tools/" data-nav="pdf">أدوات PDF</a></li>
          <li><a href="/financial-tools/" data-nav="financial">أدوات مالية</a></li>
          <li><a href="/developer-tools/" data-nav="dev">أدوات المطورين</a></li>
          <li><a href="/pages/contact.html" data-nav="contact">اتصل بنا</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="dark-toggle" id="darkToggle" aria-label="تبديل الوضع الليلي">
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
          </svg>
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>`;

/* ── Footer HTML ── */
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text">Adawix</span>
        <p>أدوات مجانية ومتنوعة تعمل مباشرة في متصفحك، بدون تسجيل وبدون رفع ملفاتك إلى أي خادم. سريعة، آمنة، وسهلة الاستخدام.</p>
      </div>
      <div class="footer-col">
        <h4>أدوات</h4>
        <ul>
          <li><a href="/text-tools/">أدوات النصوص</a></li>
          <li><a href="/image-tools/">أدوات الصور</a></li>
          <li><a href="/pdf-tools/">أدوات PDF</a></li>
          <li><a href="/financial-tools/">أدوات مالية</a></li>
          <li><a href="/developer-tools/">أدوات المطورين</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>الشركة</h4>
        <ul>
          <li><a href="/pages/about.html">من نحن</a></li>
          <li><a href="/pages/contact.html">اتصل بنا</a></li>
          <li><a href="/pages/sitemap-page.html">خريطة الموقع</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>قانوني</h4>
        <ul>
          <li><a href="/pages/privacy.html">سياسة الخصوصية</a></li>
          <li><a href="/pages/terms.html">اتفاقية الاستخدام</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Adawix. جميع الحقوق محفوظة.</p>
      <p>مصنوع بـ ❤️ للمستخدم العربي</p>
    </div>
  </div>
</footer>
<div class="toast-container" id="toastContainer"></div>`;

/* ── Cookie Banner ── */
const COOKIE_HTML = `
<div class="cookie-banner" id="cookieBanner">
  <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك وعرض إعلانات مخصصة. <a href="/pages/privacy.html">سياسة الخصوصية</a></p>
  <div class="cookie-actions">
    <button class="btn btn-accept" id="cookieAccept">قبول الكل</button>
    <button class="btn btn-reject" id="cookieReject">رفض غير الضرورية</button>
  </div>
</div>`;

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initDarkMode();
  initNav();
  initCookieBanner();
  initScrollReveal();
  initFAQ();
  highlightActiveNav();
});

function injectLayout() {
  // Insert header before body content
  document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
}

/* ── Light Mode Toggle (dark is default) ── */
function initDarkMode() {
  const theme = localStorage.getItem('adawix-theme');
  if (theme === 'light') document.documentElement.classList.add('light');

  document.addEventListener('click', e => {
    if (e.target.closest('#darkToggle')) {
      document.documentElement.classList.toggle('light');
      localStorage.setItem('adawix-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }
  });
}

/* ── Mobile Nav ── */
function initNav() {
  document.addEventListener('click', e => {
    const toggle = e.target.closest('#navToggle');
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    if (toggle) {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    } else if (!e.target.closest('.site-nav')) {
      nav.classList.remove('open');
    }
  });
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.site-nav a').forEach(a => {
    if (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/') {
      a.classList.add('active');
    }
  });
}

/* ── Cookie Banner ── */
function initCookieBanner() {
  const consent = localStorage.getItem('adawix-cookie');
  if (!consent) {
    document.body.insertAdjacentHTML('beforeend', COOKIE_HTML);
    document.getElementById('cookieAccept')?.addEventListener('click', () => acceptCookies(true));
    document.getElementById('cookieReject')?.addEventListener('click', () => acceptCookies(false));
  }
}
function acceptCookies(all) {
  localStorage.setItem('adawix-cookie', all ? 'all' : 'essential');
  document.getElementById('cookieBanner')?.remove();
}

/* ── Toast ── */
window.showToast = function(msg, type = 'info', duration = 3000) {
  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
    error:   '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
    info:    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>',
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${msg}</span>`;
  document.getElementById('toastContainer')?.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
};

/* ── Copy to Clipboard ── */
window.copyText = function(text, label = 'النص') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`تم نسخ ${label}!`, 'success');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(`تم نسخ ${label}!`, 'success');
  });
};

/* ── Format File Size ── */
window.formatSize = function(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

/* ── Validate File Size ── */
window.validateFile = function(file, maxMB = 50) {
  if (file.size > maxMB * 1024 * 1024) {
    showToast(`حجم الملف يتجاوز ${maxMB} ميغابايت`, 'error');
    return false;
  }
  return true;
};

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── FAQ ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
    });
  });
}

/* ── Homepage Search ── */
window.initSearch = function() {
  const input = document.getElementById('heroSearch');
  if (!input) return;
  const allCards = document.querySelectorAll('[data-tool-name]');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    allCards.forEach(card => {
      const name = card.dataset.toolName?.toLowerCase() || '';
      card.closest('.tool-card')?.parentElement?.classList.toggle('hidden', q && !name.includes(q));
    });
  });
  document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
  });
};
