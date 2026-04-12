/* ── PDF Merger (uses pdf-lib from CDN) ── */
(function () {
  const dropZone  = document.getElementById('pmDrop');
  const fileInput = document.getElementById('pmFile');
  const fileList  = document.getElementById('pmList');
  const btnMerge  = document.getElementById('pmMerge');
  const progress  = document.getElementById('pmProgress');
  const progFill  = document.getElementById('pmFill');
  let files = [];

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone?.addEventListener('drop', e => {
    e.preventDefault(); dropZone.classList.remove('dragover');
    addFiles([...e.dataTransfer.files]);
  });
  fileInput?.addEventListener('change', () => addFiles([...fileInput.files]));

  function addFiles(newFiles) {
    newFiles.forEach(f => {
      if (f.type !== 'application/pdf') { showToast(`${f.name} ليس ملف PDF`, 'error'); return; }
      if (!validateFile(f, 50)) return;
      files.push(f);
    });
    renderList();
  }

  function renderList() {
    fileList.innerHTML = files.map((f, i) => `
      <div class="file-item" draggable="true" data-idx="${i}">
        <span style="color:var(--error)">📄</span>
        <span class="file-name">${f.name}</span>
        <span class="file-size">${formatSize(f.size)}</span>
        <button class="file-remove" onclick="removeFile(${i})" aria-label="حذف">✕</button>
      </div>`).join('');
    btnMerge.disabled = files.length < 2;
  }

  window.removeFile = i => { files.splice(i, 1); renderList(); };

  btnMerge?.addEventListener('click', async () => {
    if (typeof PDFLib === 'undefined') { showToast('جاري تحميل مكتبة PDF...', 'info'); return; }
    btnMerge.disabled = true;
    progress.hidden   = false;

    try {
      const merged = await PDFLib.PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        progFill.style.width = ((i / files.length) * 80) + '%';
        const buf = await files[i].arrayBuffer();
        const doc = await PDFLib.PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      progFill.style.width = '100%';
      const bytes = await merged.save();
      const blob  = new Blob([bytes], { type: 'application/pdf' });
      const a     = document.createElement('a');
      a.href      = URL.createObjectURL(blob);
      a.download  = 'merged-adawix.pdf';
      a.click();
      showToast('تم دمج الملفات بنجاح!', 'success');
    } catch (e) {
      showToast('حدث خطأ أثناء الدمج: ' + e.message, 'error');
    } finally {
      btnMerge.disabled = false;
      setTimeout(() => { progress.hidden = true; progFill.style.width = '0'; }, 2000);
    }
  });
})();
