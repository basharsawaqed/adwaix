/* ── Password Generator ── */
(function () {
  const lenSlider = document.getElementById('pgLen');
  const lenVal    = document.getElementById('pgLenVal');
  const useUpper  = document.getElementById('pgUpper');
  const useLower  = document.getElementById('pgLower');
  const useNum    = document.getElementById('pgNum');
  const useSym    = document.getElementById('pgSym');
  const exSimilar = document.getElementById('pgExSimilar');
  const countSel  = document.getElementById('pgCount');
  const btnGen    = document.getElementById('pgGenerate');
  const output    = document.getElementById('pgOutput');
  const strengthBar = document.getElementById('pgStrength');
  const strengthLbl = document.getElementById('pgStrengthLabel');

  const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const SIMILAR  = /[0Ol1I]/g;

  lenSlider?.addEventListener('input', () => { lenVal.textContent = lenSlider.value; });

  function generate() {
    let pool = '';
    if (useUpper?.checked) pool += UPPER;
    if (useLower?.checked) pool += LOWER;
    if (useNum?.checked)   pool += NUMBERS;
    if (useSym?.checked)   pool += SYMBOLS;
    if (!pool) { showToast('اختر نوعاً واحداً على الأقل', 'error'); return ''; }
    if (exSimilar?.checked) pool = pool.replace(SIMILAR, '');
    const len = parseInt(lenSlider.value);
    return Array.from({ length: len }, () => pool[Math.floor(Math.random() * pool.length)]).join('');
  }

  function strength(pwd) {
    let score = 0;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { cls: 'strength-weak',   lbl: 'ضعيفة',    color: 'var(--error)' };
    if (score <= 3) return { cls: 'strength-fair',   lbl: 'متوسطة',   color: 'var(--accent)' };
    if (score <= 4) return { cls: 'strength-good',   lbl: 'جيدة',     color: 'var(--secondary)' };
    return                 { cls: 'strength-strong', lbl: 'قوية جداً', color: 'var(--success)' };
  }

  btnGen?.addEventListener('click', () => {
    const count = parseInt(countSel?.value || 1);
    const passwords = Array.from({ length: count }, generate).filter(Boolean);
    if (!passwords.length) return;

    output.innerHTML = passwords.map((p, i) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <code style="flex:1;background:var(--bg-section);padding:8px 12px;border-radius:8px;font-family:var(--font-mono);font-size:.9rem;direction:ltr;word-break:break-all">${p}</code>
        <button class="btn btn-secondary btn-sm" onclick="copyText('${p.replace(/'/g,"\\'")}','كلمة المرور')">نسخ</button>
      </div>`).join('');

    // Strength of first password
    const s = strength(passwords[0]);
    strengthBar.className = 'strength-bar ' + s.cls;
    strengthLbl.textContent = 'قوة كلمة المرور: ' + s.lbl;
    strengthLbl.style.color = s.color;
  });

  // Generate on load
  btnGen?.click();
})();
