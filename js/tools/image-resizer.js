/* ── Image Resizer ── */
(function () {
  const fileInput = document.getElementById('irFile');
  const dropZone  = document.getElementById('irDrop');
  const wInput    = document.getElementById('irWidth');
  const hInput    = document.getElementById('irHeight');
  const lockAR    = document.getElementById('irLock');
  const btnResize = document.getElementById('irResize');
  const btnDL     = document.getElementById('irDownload');
  const preview   = document.getElementById('irPreview');
  const result    = document.getElementById('irResult');
  const info      = document.getElementById('irInfo');

  let origImg = null;
  let resizedBlob = null;
  let origW = 0, origH = 0;

  const PRESETS = {
    'instagram-post':    [1080, 1080],
    'facebook-cover':    [820,  312],
    'twitter-header':    [1500, 500],
    'youtube-thumbnail': [1280, 720],
    'whatsapp-dp':       [500,  500],
  };

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone?.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if (f) loadFile(f); });
  fileInput?.addEventListener('change', () => { if (fileInput.files[0]) loadFile(fileInput.files[0]); });

  function loadFile(file) {
    if (!file.type.startsWith('image/')) { showToast('الرجاء رفع صورة', 'error'); return; }
    if (!validateFile(file, 50)) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      origImg = img; origW = img.width; origH = img.height;
      wInput.value = origW; hInput.value = origH;
      info.textContent = `الحجم الأصلي: ${origW} × ${origH} px`;
      btnResize.disabled = false;
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  wInput?.addEventListener('input', () => {
    if (lockAR.checked && origW) hInput.value = Math.round(parseInt(wInput.value) * origH / origW) || '';
  });
  hInput?.addEventListener('input', () => {
    if (lockAR.checked && origH) wInput.value = Math.round(parseInt(hInput.value) * origW / origH) || '';
  });

  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [w, h] = PRESETS[btn.dataset.preset] || [];
      if (w) { wInput.value = w; hInput.value = h; }
    });
  });

  btnResize?.addEventListener('click', () => {
    if (!origImg) { showToast('الرجاء رفع صورة أولاً', 'error'); return; }
    const w = parseInt(wInput.value); const h = parseInt(hInput.value);
    if (!w || !h) { showToast('أدخل الأبعاد', 'error'); return; }
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(origImg, 0, 0, w, h);
    canvas.toBlob(blob => {
      resizedBlob = blob;
      preview.src = URL.createObjectURL(blob);
      result.hidden = false;
      btnDL.disabled = false;
      showToast(`تم تغيير الحجم إلى ${w}×${h}`, 'success');
    }, 'image/jpeg', 0.92);
  });

  btnDL?.addEventListener('click', () => {
    if (!resizedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(resizedBlob);
    a.download = `resized-${wInput.value}x${hInput.value}-adawix.jpg`;
    a.click();
  });
})();
