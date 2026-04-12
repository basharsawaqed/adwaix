/* ── Loan Calculator ── */
(function () {
  const amountEl = document.getElementById('lcAmount');
  const rateEl   = document.getElementById('lcRate');
  const termEl   = document.getElementById('lcTerm');
  const termUnit = document.getElementById('lcTermUnit');
  const btnCalc  = document.getElementById('lcCalc');
  const resArea  = document.getElementById('lcResult');
  const monthly  = document.getElementById('lcMonthly');
  const total    = document.getElementById('lcTotal');
  const interest = document.getElementById('lcInterest');
  const tbody    = document.getElementById('lcBody');

  btnCalc?.addEventListener('click', () => {
    const P  = parseFloat(amountEl.value);
    const r  = parseFloat(rateEl.value) / 100 / 12;
    let n    = parseInt(termEl.value);
    if (termUnit.value === 'years') n *= 12;

    if (!P || !r || !n || P <= 0 || n <= 0) { showToast('أدخل بيانات صحيحة', 'error'); return; }

    const M   = r === 0 ? P / n : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const T   = M * n;
    const I   = T - P;

    monthly.textContent  = M.toFixed(2) + ' د.أ';
    total.textContent    = T.toFixed(2) + ' د.أ';
    interest.textContent = I.toFixed(2) + ' د.أ';
    resArea.hidden = false;

    // Amortization table
    let balance = P;
    const rows = [];
    for (let i = 1; i <= Math.min(n, 120); i++) {
      const intPay  = balance * r;
      const prinPay = M - intPay;
      balance -= prinPay;
      rows.push(`<tr>
        <td>${i}</td>
        <td>${M.toFixed(2)}</td>
        <td>${prinPay.toFixed(2)}</td>
        <td>${intPay.toFixed(2)}</td>
        <td>${Math.max(balance, 0).toFixed(2)}</td>
      </tr>`);
    }
    if (n > 120) rows.push(`<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">... (${n - 120} أشهر إضافية)</td></tr>`);
    tbody.innerHTML = rows.join('');
  });
})();
