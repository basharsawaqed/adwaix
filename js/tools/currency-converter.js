/* ── Currency Converter ── */
(function () {
  const fromSel  = document.getElementById('ccFrom');
  const toSel    = document.getElementById('ccTo');
  const amtInput = document.getElementById('ccAmount');
  const btnConv  = document.getElementById('ccConvert');
  const btnSwap  = document.getElementById('ccSwap');
  const resEl    = document.getElementById('ccResult');
  const rateEl   = document.getElementById('ccRate');
  const updEl    = document.getElementById('ccUpdated');

  // Free API – no key needed for basic rates
  const API_URL = 'https://open.er-api.com/v6/latest/';
  let ratesCache = {};

  async function fetchRates(base) {
    if (ratesCache[base]) return ratesCache[base];
    try {
      const res  = await fetch(API_URL + base);
      const data = await res.json();
      if (data.result === 'success') {
        ratesCache[base] = data;
        return data;
      }
    } catch { showToast('تعذّر جلب أسعار الصرف، تحقق من اتصالك', 'error'); }
    return null;
  }

  btnConv?.addEventListener('click', async () => {
    const from = fromSel.value;
    const to   = toSel.value;
    const amt  = parseFloat(amtInput.value);
    if (!amt || amt <= 0) { showToast('أدخل مبلغاً صحيحاً', 'error'); return; }

    btnConv.textContent = '...';
    btnConv.disabled    = true;
    const data = await fetchRates(from);
    btnConv.textContent = 'تحويل';
    btnConv.disabled    = false;

    if (!data) return;
    const rate    = data.rates[to];
    const result  = (amt * rate).toFixed(4);
    resEl.textContent  = `${amt} ${from} = ${result} ${to}`;
    rateEl.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
    updEl.textContent  = 'آخر تحديث: ' + new Date(data.time_last_update_utc).toLocaleDateString('ar-EG');
  });

  btnSwap?.addEventListener('click', () => {
    [fromSel.value, toSel.value] = [toSel.value, fromSel.value];
  });

  // Quick pairs
  document.querySelectorAll('[data-pair]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [f, t] = btn.dataset.pair.split('-');
      fromSel.value = f; toSel.value = t;
    });
  });
})();
