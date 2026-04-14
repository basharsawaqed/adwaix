/* ── URL Shortener ── uses is.gd / v.gd free APIs (no key required) ── */
(function () {
  const input      = document.getElementById('urlInput');
  const btnShorten = document.getElementById('urlShorten');
  const btnPaste   = document.getElementById('urlPaste');
  const resultBox  = document.getElementById('urlResult');
  const shortLink  = document.getElementById('urlShort');
  const btnCopy    = document.getElementById('urlCopy');
  const btnOpen    = document.getElementById('urlOpen');
  const origEl     = document.getElementById('urlOriginal');
  const qrEl       = document.getElementById('urlQR');
  const btnDLQR    = document.getElementById('urlDLQR');
  const histWrap   = document.getElementById('urlHistory');
  const histList   = document.getElementById('urlHistoryList');
  const btnClearH  = document.getElementById('urlClearHistory');

  const HISTORY_KEY = 'adawix_url_history';
  let currentShort  = '';

  // ── Provider radio styling ──
  document.querySelectorAll('.provider-opt').forEach(lbl => {
    lbl.querySelector('input').addEventListener('change', () => {
      document.querySelectorAll('.provider-opt').forEach(l => l.classList.remove('active'));
      lbl.classList.add('active');
    });
  });

  // ── Paste button ──
  btnPaste?.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) { input.value = text; input.focus(); }
    } catch { showToast('تعذّر الوصول للحافظة', 'error'); }
  });

  // ── Shorten ──
  btnShorten?.addEventListener('click', shorten);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') shorten(); });

  async function shorten() {
    const url = input.value.trim();
    if (!url) { showToast('الصق رابطاً أولاً', 'error'); return; }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      showToast('يجب أن يبدأ الرابط بـ https://', 'error'); return;
    }

    const provider = document.querySelector('input[name="provider"]:checked')?.value || 'isgd';
    const domain   = provider === 'vgd' ? 'v.gd' : 'is.gd';
    const apiUrl   = `https://${domain}/create.php?format=json&url=${encodeURIComponent(url)}`;

    btnShorten.textContent = '⏳ جاري الاختصار...';
    btnShorten.disabled    = true;

    try {
      const res  = await fetch(apiUrl);
      const data = await res.json();

      if (data.shorturl) {
        currentShort = data.shorturl;
        showResult(url, currentShort);
        saveToHistory(url, currentShort);
        showToast('تم اختصار الرابط!', 'success');
      } else {
        const msg = data.errormessage || 'تعذّر اختصار الرابط';
        showToast(msg, 'error');
      }
    } catch {
      showToast('تعذّر الاتصال بخدمة الاختصار، تحقق من اتصالك', 'error');
    } finally {
      btnShorten.textContent = '✂️ اختصر الرابط';
      btnShorten.disabled    = false;
    }
  }

  function showResult(original, short) {
    shortLink.textContent = short;
    shortLink.href        = short;
    origEl.textContent    = '← ' + original;
    resultBox.style.display = 'block';

    // Generate QR
    qrEl.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(qrEl, {
        text: short,
        width: 140, height: 140,
        colorDark: '#0d1b2e',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    }
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Copy ──
  btnCopy?.addEventListener('click', () => {
    if (!currentShort) return;
    navigator.clipboard.writeText(currentShort)
      .then(() => showToast('تم النسخ!', 'success'))
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = currentShort;
        document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('تم النسخ!', 'success');
      });
  });

  // ── Open ──
  btnOpen?.addEventListener('click', () => {
    if (currentShort) window.open(currentShort, '_blank', 'noopener');
  });

  // ── Download QR ──
  btnDLQR?.addEventListener('click', () => {
    const canvas = qrEl.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href     = canvas.toDataURL('image/png');
    a.download = 'short-link-qr.png';
    a.click();
  });

  // ── History ──
  function saveToHistory(original, short) {
    const history = getHistory();
    // Avoid duplicates
    const filtered = history.filter(h => h.short !== short);
    filtered.unshift({ original, short, ts: Date.now() });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, 10)));
    renderHistory();
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch { return []; }
  }

  function renderHistory() {
    const history = getHistory();
    if (!history.length) { histWrap.style.display = 'none'; return; }
    histWrap.style.display = 'block';
    histList.innerHTML = history.map(h => `
      <div class="history-item">
        <div style="flex:1;min-width:0">
          <a href="${h.short}" target="_blank" rel="noopener">${h.short}</a>
          <div class="hist-orig" title="${h.original}">${h.original}</div>
        </div>
        <button class="btn btn-secondary btn-sm hist-copy" data-url="${h.short}" title="نسخ">📋</button>
      </div>`).join('');

    histList.querySelectorAll('.hist-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.url)
          .then(() => showToast('تم النسخ!', 'success'))
          .catch(() => {});
      });
    });
  }

  btnClearH?.addEventListener('click', () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    showToast('تم مسح السجل', 'info');
  });

  // Init
  renderHistory();
})();
