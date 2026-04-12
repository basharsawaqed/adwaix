/* ── Duplicate Remover ── */
(function () {
  const input  = document.getElementById('drInput');
  const output = document.getElementById('drOutput');
  const mode   = document.getElementById('drMode');
  const caseSens = document.getElementById('drCase');
  const btnRun  = document.getElementById('drRun');
  const btnCopy = document.getElementById('drCopy');
  const btnClear= document.getElementById('drClear');
  const countEl = document.getElementById('drCount');

  function run() {
    const text = input.value;
    const sensitive = caseSens.checked;
    let lines = text.split('\n');
    let result, removed = 0;

    if (mode.value === 'lines') {
      const seen = new Set();
      result = lines.filter(l => {
        const key = sensitive ? l : l.toLowerCase();
        if (seen.has(key)) { removed++; return false; }
        seen.add(key); return true;
      });
      output.value = result.join('\n');
    } else {
      // words
      const words = text.split(/\s+/);
      const seen = new Set();
      result = words.filter(w => {
        const key = sensitive ? w : w.toLowerCase();
        if (seen.has(key)) { removed++; return false; }
        seen.add(key); return true;
      });
      output.value = result.join(' ');
    }
    countEl.textContent = `تمت إزالة ${removed} تكرار`;
  }

  btnRun.addEventListener('click', run);
  btnCopy?.addEventListener('click', () => copyText(output.value, 'النتيجة'));
  btnClear?.addEventListener('click', () => { input.value = ''; output.value = ''; countEl.textContent = ''; });
})();
