/* ── Word Frequency Counter ── */
(function () {
  const input   = document.getElementById('wfInput');
  const btnRun  = document.getElementById('wfRun');
  const btnCSV  = document.getElementById('wfCSV');
  const sortSel = document.getElementById('wfSort');
  const tbody   = document.getElementById('wfBody');
  const chartEl = document.getElementById('wfChart');
  let freqData  = [];

  btnRun?.addEventListener('click', () => {
    const text  = input.value.trim();
    if (!text) { showToast('أدخل نصاً أولاً', 'error'); return; }

    const words = text.toLowerCase()
      .replace(/[^\u0600-\u06FF\u0750-\u077Fa-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const map = {};
    words.forEach(w => { map[w] = (map[w] || 0) + 1; });
    freqData = Object.entries(map).map(([word, count]) => ({ word, count, pct: ((count / words.length) * 100).toFixed(1) }));

    renderTable();
    renderChart();
  });

  sortSel?.addEventListener('change', () => { if (freqData.length) renderTable(); });

  function renderTable() {
    const sorted = [...freqData].sort((a, b) =>
      sortSel.value === 'alpha' ? a.word.localeCompare(b.word, 'ar') : b.count - a.count
    );
    tbody.innerHTML = sorted.slice(0, 100).map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${r.word}</strong></td>
        <td>${r.count}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:var(--border);border-radius:3px">
              <div style="width:${r.pct}%;height:100%;background:var(--primary);border-radius:3px"></div>
            </div>
            <span style="font-size:.8rem;color:var(--text-muted);min-width:36px">${r.pct}%</span>
          </div>
        </td>
      </tr>`).join('');
  }

  function renderChart() {
    const top10 = [...freqData].sort((a, b) => b.count - a.count).slice(0, 10);
    const max   = top10[0]?.count || 1;
    chartEl.innerHTML = top10.map(r => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="min-width:80px;font-size:.85rem;text-align:right">${r.word}</div>
        <div style="flex:1;height:24px;background:var(--border);border-radius:4px;overflow:hidden">
          <div style="width:${(r.count/max)*100}%;height:100%;background:linear-gradient(90deg,var(--primary),var(--secondary));border-radius:4px"></div>
        </div>
        <div style="min-width:24px;font-size:.85rem;font-weight:700;color:var(--primary)">${r.count}</div>
      </div>`).join('');
  }

  btnCSV?.addEventListener('click', () => {
    if (!freqData.length) { showToast('لا توجد بيانات', 'error'); return; }
    const csv = 'الكلمة,العدد,النسبة\n' + freqData.map(r => `${r.word},${r.count},${r.pct}%`).join('\n');
    const a   = document.createElement('a');
    a.href    = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
    a.download= 'word-frequency.csv';
    a.click();
  });
})();
