/* ── Image Format Converter ── */
(function () {
  const fileInput = document.getElementById('convFile');
  const dropZone  = document.getElementById('convDrop');
  const fmtSel    = document.getElementById('convFormat');
  const qualSlider= document.getElementById('convQuality');
  const qualVal   = document.getElementById('convQualVal');
  const qualRow   = document.getElementById('convQualRow');
  const btnConv   = document.getElementById('convRun');
  const btnDL     = document.getElementById('convDownload');
  const preview   = document.getElementById('convPreview');
  const result    = document.getElementById('convResult');

  let origFile = null; let convertedBlob = null;

  fmtSel?.addEventListener('change', () => {
    qualRow.hidden = ['image/png', 'image/bmp'].includes(fmtSel.value);
  });
  qualSlider?.addEventListener('input', () => { qualVal.textContent = qualSlider.value + '%'; });

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone?.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if (f) loadFile(f); });
  fileInput?.addEventListener('change', () => { if (fileInput.files[0]) loadFile(fileInput.files[0]); });

  function loadFile(file) {
    if (!file.type.startsWith('image/')) { showToast('الرجاء رفع صورة', 'error'); return; }
    if (!validateFile(file, 50)) return;
    origFile = file;
    btnConv.disabled = false;
    showToast('تم تحميل الصورة', 'info');
  }

  btnConv?.addEventListener('click', () => {
    if (!origFile) { showToast('الرجاء رفع صورة أولاً', 'error'); return; }
    const url = URL.createObjectURL(origFile);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (fmtSel.value === 'image/jpeg' || fmtSel.value === 'image/webp') {
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const quality = parseInt(qualSlider.value) / 100;
      canvas.toBlob(blob => {
        convertedBlob = blob;
        preview.src = URL.createObjectURL(blob);
        result.hidden = false;
        btnDL.disabled = false;
        URL.revokeObjectURL(url);
        showToast('تم التحويل!', 'success');
      }, fmtSel.value, quality);
    };
    img.src = url;
  });

  btnDL?.addEventListener('click', () => {
    if (!convertedBlob) return;
    const ext = fmtSel.value.split('/')[1].replace('jpeg', 'jpg');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(convertedBlob);
    a.download = `converted-adawix.${ext}`;
    a.click();
  });
})();
