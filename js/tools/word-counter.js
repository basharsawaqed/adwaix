/* ── Word Counter ── */
(function () {
  const textarea = document.getElementById('wcInput');
  const btnClear = document.getElementById('wcClear');
  const btnCopy  = document.getElementById('wcCopy');
  const btnPaste = document.getElementById('wcPaste');

  const els = {
    words:    document.getElementById('wcWords'),
    chars:    document.getElementById('wcChars'),
    noSpace:  document.getElementById('wcNoSpace'),
    sentences:document.getElementById('wcSentences'),
    paras:    document.getElementById('wcParas'),
    read:     document.getElementById('wcRead'),
  };

  function count(text) {
    const words     = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars     = text.length;
    const noSpace   = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?؟।]+/).filter(s => s.trim()).length;
    const paras     = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const readMin   = Math.ceil(words / 200);
    return { words, chars, noSpace, sentences, paras, readMin };
  }

  function update() {
    const r = count(textarea.value);
    els.words.textContent     = r.words.toLocaleString('ar-EG');
    els.chars.textContent     = r.chars.toLocaleString('ar-EG');
    els.noSpace.textContent   = r.noSpace.toLocaleString('ar-EG');
    els.sentences.textContent = r.sentences.toLocaleString('ar-EG');
    els.paras.textContent     = r.paras.toLocaleString('ar-EG');
    els.read.textContent      = r.readMin + ' دقيقة';
  }

  textarea.addEventListener('input', update);
  btnClear?.addEventListener('click', () => { textarea.value = ''; update(); });
  btnCopy?.addEventListener('click',  () => copyText(textarea.value, 'النص'));
  btnPaste?.addEventListener('click', async () => {
    try {
      textarea.value = await navigator.clipboard.readText();
      update();
    } catch { showToast('لا يمكن الوصول إلى الحافظة', 'error'); }
  });

  update();
})();
