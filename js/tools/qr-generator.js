/* ── QR Code Generator (uses qrcode.js from CDN) ── */
(function () {
  const input    = document.getElementById('qrInput');
  const typeSel  = document.getElementById('qrType');
  const sizeSel  = document.getElementById('qrSize');
  const fgColor  = document.getElementById('qrFG');
  const bgColor  = document.getElementById('qrBG');
  const ecSel    = document.getElementById('qrEC');
  const btnGen   = document.getElementById('qrGenerate');
  const btnDLPNG = document.getElementById('qrDownloadPNG');
  const output   = document.getElementById('qrOutput');
  const fields   = document.getElementById('qrFields');

  const TYPE_FIELDS = {
    url:   [{ id:'qrURL',   label:'الرابط (URL)',  placeholder:'https://example.com', type:'url' }],
    text:  [{ id:'qrText2', label:'النص',           placeholder:'اكتب نصاً هنا...', type:'text' }],
    email: [{ id:'qrEmail', label:'البريد الإلكتروني', placeholder:'email@example.com', type:'email' },
            { id:'qrSubj',  label:'الموضوع',        placeholder:'موضوع الرسالة', type:'text' }],
    phone: [{ id:'qrPhone', label:'رقم الهاتف',     placeholder:'+962791234567', type:'tel' }],
    wifi:  [{ id:'qrSSID',  label:'اسم الشبكة (SSID)', placeholder:'MyWiFi', type:'text' },
            { id:'qrPass',  label:'كلمة المرور',    placeholder:'password123', type:'password' }],
  };

  typeSel?.addEventListener('change', renderFields);
  function renderFields() {
    const defs = TYPE_FIELDS[typeSel.value] || [];
    fields.innerHTML = defs.map(f => `
      <div style="margin-bottom:12px">
        <label class="tool-label" for="${f.id}">${f.label}</label>
        <input id="${f.id}" class="tool-input" type="${f.type}" placeholder="${f.placeholder}">
      </div>`).join('');
  }
  renderFields();

  function buildContent() {
    const get = id => document.getElementById(id)?.value.trim() || '';
    switch (typeSel.value) {
      case 'url':   return get('qrURL');
      case 'text':  return get('qrText2');
      case 'email': return `mailto:${get('qrEmail')}?subject=${encodeURIComponent(get('qrSubj'))}`;
      case 'phone': return `tel:${get('qrPhone')}`;
      case 'wifi':  return `WIFI:T:WPA;S:${get('qrSSID')};P:${get('qrPass')};;`;
      default:      return input?.value.trim() || '';
    }
  }

  btnGen?.addEventListener('click', () => {
    const content = buildContent();
    if (!content) { showToast('أدخل المحتوى أولاً', 'error'); return; }

    if (typeof QRCode === 'undefined') { showToast('جاري تحميل مكتبة QR...', 'info'); return; }

    output.innerHTML = '';
    const size = parseInt(sizeSel?.value || 256);
    new QRCode(output, {
      text: content,
      width: size, height: size,
      colorDark: fgColor?.value || '#000000',
      colorLight: bgColor?.value || '#ffffff',
      correctLevel: QRCode.CorrectLevel[ecSel?.value || 'M'],
    });
    btnDLPNG.disabled = false;
    showToast('تم توليد رمز QR!', 'success');
  });

  btnDLPNG?.addEventListener('click', () => {
    const canvas = output.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'qr-adawix.png';
    a.click();
  });
})();
