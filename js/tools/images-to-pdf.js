/* ── Images to PDF (uses pdf-lib) ── */
(function () {
  const fileInput = document.getElementById('i2pFile');
  const dropZone  = document.getElementById('i2pDrop');
  const fileList  = document.getElementById('i2pList');
  const pageSel   = document.getElementById('i2pPage');
  const orientSel = document.getElementById('i2pOrient');
  const btnConv   = document.getElementById('i2pConvert');
  const progWrap  = document.getElementById('i2pProgress');
  const progFill  = document.getElementById('i2pFill');
  let files = [];

  const PAGE_SIZES = {
    A4:     [595.28, 841.89],
    Letter: [612, 792],
    A3:     [841.89, 1190.55],
  };

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone?.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('dragover'); addFiles([...e.dataTransfer.files]); });
  fileInput?.addEventListener('change', () => addFiles([...fileInput.files]));

  function addFiles(newFiles) {
    newFiles.forEach(f => {
      if (!f.type.startsWith('image/')) { showToast(`${f.name}: ليست صورة`, 'error'); return; }
      if (!validateFile(f, 50)) return;
      files.push(f);
    });
    renderList();
  }

  function renderList() {
    fileList.innerHTML = files.map((f, i) => `
      <div class="file-item">
        <span>🖼️</span>
        <span class="file-name">${f.name}</span>
        <span class="file-size">${formatSize(f.size)}</span>
        <button class="file-remove" onclick="i2pRemove(${i})">✕</button>
      </div>`).join('');
    btnConv.disabled = files.length === 0;
  }

  window.i2pRemove = i => { files.splice(i, 1); renderList(); };

  btnConv?.addEventListener('click', async () => {
    if (typeof PDFLib === 'undefined') { showToast('جاري تحميل مكتبة PDF...', 'info'); return; }
    btnConv.disabled = true;
    progWrap.hidden  = false;

    try {
      const pdf = await PDFLib.PDFDocument.create();
      let [pw, ph] = PAGE_SIZES[pageSel?.value || 'A4'];
      if (orientSel?.value === 'landscape') [pw, ph] = [ph, pw];

      for (let i = 0; i < files.length; i++) {
        progFill.style.width = ((i / files.length) * 90) + '%';
        const bytes = await files[i].arrayBuffer();
        let img;
        try {
          img = files[i].type === 'image/png'
            ? await pdf.embedPng(bytes)
            : await pdf.embedJpg(bytes);
        } catch { showToast(`تخطي ${files[i].name}: صيغة غير مدعومة`, 'error'); continue; }

        const page = pdf.addPage([pw, ph]);
        const { width: iw, height: ih } = img;
        const scale = Math.min(pw / iw, ph / ih);
        const sw = iw * scale, sh = ih * scale;
        page.drawImage(img, { x: (pw - sw) / 2, y: (ph - sh) / 2, width: sw, height: sh });
      }

      progFill.style.width = '100%';
      const bytes = await pdf.save();
      const blob  = new Blob([bytes], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'images-adawix.pdf';
      a.click();
      showToast('تم التحويل بنجاح!', 'success');
    } catch (e) {
      showToast('خطأ: ' + e.message, 'error');
    } finally {
      btnConv.disabled = false;
      setTimeout(() => { progWrap.hidden = true; progFill.style.width = '0'; }, 2000);
    }
  });
})();
