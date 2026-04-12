/* ── Image Compressor (client-side Canvas) ── */
(function () {
  const dropZone   = document.getElementById('icDrop');
  const fileInput  = document.getElementById('icFile');
  const qualSlider = document.getElementById('icQuality');
  const qualVal    = document.getElementById('icQualVal');
  const btnCompress= document.getElementById('icCompress');
  const btnDownload= document.getElementById('icDownload');
  const preview    = document.getElementById('icPreview');
  const origSize   = document.getElementById('icOrigSize');
  const compSize   = document.getElementById('icCompSize');
  const saved      = document.getElementById('icSaved');
  const resultArea = document.getElementById('icResult');

  let origFile = null;
  let compressedBlob = null;

  qualSlider?.addEventListener('input', () => { qualVal.textContent = qualSlider.value + '%'; });

  // Drag and drop
  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone?.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  });
  fileInput?.addEventListener('change', () => { if (fileInput.files[0]) loadFile(fileInput.files[0]); });

  function loadFile(file) {
    if (!file.type.startsWith('image/')) { showToast('الرجاء رفع صورة صحيحة', 'error'); return; }
    if (!validateFile(file, 50)) return;
    origFile = file;
    origSize.textContent = formatSize(file.size);
    showToast('تم تحميل الصورة. اضغط "ضغط"', 'info');
    btnCompress.disabled = false;
  }

  btnCompress?.addEventListener('click', () => {
    if (!origFile) { showToast('الرجاء رفع صورة أولاً', 'error'); return; }
    const quality = parseInt(qualSlider.value) / 100;
    const img = new Image();
    const url = URL.createObjectURL(origFile);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        compressedBlob = blob;
        compSize.textContent = formatSize(blob.size);
        const pct = ((1 - blob.size / origFile.size) * 100).toFixed(1);
        saved.textContent = pct + '%';
        const outUrl = URL.createObjectURL(blob);
        preview.src = outUrl;
        resultArea.hidden = false;
        btnDownload.disabled = false;
        URL.revokeObjectURL(url);
        showToast(`تم الضغط! وفّرت ${pct}%`, 'success');
      }, origFile.type === 'image/png' ? 'image/png' : 'image/jpeg', quality);
    };
    img.src = url;
  });

  btnDownload?.addEventListener('click', () => {
    if (!compressedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(compressedBlob);
    a.download = 'compressed-adawix.' + (origFile.type === 'image/png' ? 'png' : 'jpg');
    a.click();
  });
})();
