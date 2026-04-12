/* ── JSON Formatter ── */
(function () {
  const input  = document.getElementById('jfInput');
  const output = document.getElementById('jfOutput');
  const errEl  = document.getElementById('jfError');

  function syntaxHighlight(json) {
    return json
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
        let cls = 'json-number';
        if (/^"/.test(match)) cls = /:$/.test(match) ? 'json-key' : 'json-string';
        else if (/true|false/.test(match)) cls = 'json-bool';
        else if (/null/.test(match)) cls = 'json-null';
        return `<span class="${cls}">${match}</span>`;
      });
  }

  function tryParse() {
    try {
      return { ok: true, obj: JSON.parse(input.value) };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }

  document.getElementById('jfFormat')?.addEventListener('click', () => {
    const { ok, obj, err } = tryParse();
    if (!ok) { errEl.textContent = '❌ خطأ: ' + err; errEl.hidden = false; output.innerHTML = ''; return; }
    errEl.hidden = true;
    output.innerHTML = syntaxHighlight(JSON.stringify(obj, null, 2));
    showToast('تم التنسيق!', 'success');
  });

  document.getElementById('jfMinify')?.addEventListener('click', () => {
    const { ok, obj, err } = tryParse();
    if (!ok) { errEl.textContent = '❌ خطأ: ' + err; errEl.hidden = false; return; }
    errEl.hidden = true;
    output.textContent = JSON.stringify(obj);
    showToast('تم التصغير!', 'success');
  });

  document.getElementById('jfValidate')?.addEventListener('click', () => {
    const { ok, err } = tryParse();
    if (ok) { showToast('✅ JSON صحيح!', 'success'); errEl.hidden = true; }
    else { errEl.textContent = '❌ ' + err; errEl.hidden = false; showToast('JSON غير صحيح', 'error'); }
  });

  document.getElementById('jfCopy')?.addEventListener('click', () => copyText(output.textContent, 'JSON'));
  document.getElementById('jfClear')?.addEventListener('click', () => { input.value = ''; output.innerHTML = ''; errEl.hidden = true; });
})();
