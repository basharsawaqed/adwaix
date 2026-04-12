/* ── Text Case Converter ── */
(function () {
  const input  = document.getElementById('tcInput');
  const output = document.getElementById('tcOutput');

  function convert(type) {
    const t = input.value;
    let result = t;
    switch (type) {
      case 'upper':    result = t.toUpperCase(); break;
      case 'lower':    result = t.toLowerCase(); break;
      case 'title':    result = t.replace(/\S+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()); break;
      case 'sentence': result = t.toLowerCase().replace(/(^\s*\w|[.!?؟]\s*\w)/g, c => c.toUpperCase()); break;
      case 'invert':   result = [...t].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
      case 'remove-tashkeel': result = t.replace(/[\u064B-\u065F\u0670]/g, ''); break;
    }
    output.value = result;
  }

  document.querySelectorAll('[data-case]').forEach(btn => {
    btn.addEventListener('click', () => convert(btn.dataset.case));
  });

  document.getElementById('tcCopy')?.addEventListener('click', () => copyText(output.value, 'النتيجة'));
  document.getElementById('tcClear')?.addEventListener('click', () => { input.value = ''; output.value = ''; });
})();
