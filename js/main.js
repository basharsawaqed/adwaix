/* ============================================================
   Adawix — main.js  |  Header, Footer, Dark Mode, Toast, Cookie, i18n
   ============================================================ */

/* ── Cloudflare Web Analytics ──────────────────────────────────
   Get your token: Cloudflare Dashboard → Analytics → Web Analytics → Add site
   Paste the token string below.
   ─────────────────────────────────────────────────────────── */
const CF_ANALYTICS_TOKEN = '';   // ← paste your token here

(function () {
  if (!CF_ANALYTICS_TOKEN) return;
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflare.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.head.appendChild(s);
})();

/* ── Translations ── */
const I18N = {
  ar: {
    'skip.content': 'تخطى إلى المحتوى',
    'cat.text':      'أدوات النصوص',
    'cat.image':     'أدوات الصور',
    'cat.pdf':       'أدوات PDF',
    'cat.financial': 'أدوات مالية',
    'cat.developer': 'أدوات المطورين',
    'nav.contact':   'اتصل بنا',
    'footer.brand':     'أدوات مجانية ومتنوعة تعمل مباشرة في متصفحك، بدون تسجيل وبدون رفع ملفاتك إلى أي خادم. سريعة، آمنة، وسهلة الاستخدام.',
    'footer.tools-h':   'أدوات',
    'footer.company-h': 'الشركة',
    'footer.legal-h':   'قانوني',
    'footer.about':     'من نحن',
    'footer.contact':   'اتصل بنا',
    'footer.sitemap':   'خريطة الموقع',
    'footer.privacy':   'سياسة الخصوصية',
    'footer.terms':     'اتفاقية الاستخدام',
    'footer.rights':    `© ${new Date().getFullYear()} Adawix. جميع الحقوق محفوظة.`,
    'footer.love':      'مصنوع بـ ❤️ للمستخدم العربي',
    'cookie.text':   'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وعرض إعلانات مخصصة.',
    'cookie.privacy':'سياسة الخصوصية',
    'cookie.accept': 'قبول الكل',
    'cookie.reject': 'رفض غير الضرورية',
    'bc.home':             'الرئيسية',
    'bc.text-tools':       'أدوات النصوص',
    'bc.image-tools':      'أدوات الصور',
    'bc.pdf-tools':        'أدوات PDF',
    'bc.financial-tools':  'أدوات مالية',
    'bc.developer-tools':  'أدوات المطورين',
    'tool.word-counter.title':    'عداد الكلمات والحروف',
    'tool.word-counter.desc':     'الصق أو اكتب نصك في الحقل أدناه وسيتم احتساب الكلمات والحروف والجمل والفقرات ووقت القراءة فورياً.',
    'tool.word-counter.bc':       'عداد الكلمات',
    'tool.word-counter.label':    'أدخل النص هنا',
    'tool.word-counter.ph':       'اكتب أو الصق نصك هنا...',
    'tool.word-counter.copy-btn': '📋 نسخ النص',
    'tool.word-counter.paste':    '📌 لصق',
    'tool.word-counter.clear':    '🗑️ مسح',
    'tool.word-counter.words':    'كلمة',
    'tool.word-counter.chars':    'حرف',
    'tool.word-counter.nospace':  'بدون مسافات',
    'tool.word-counter.sents':    'جملة',
    'tool.word-counter.paras':    'فقرة',
    'tool.word-counter.read':     'وقت القراءة',
    'tool.text-case.title':    'محول حالة النص',
    'tool.text-case.desc':     'اختر نوع التحويل وسيتم تطبيقه فورياً على النص المدخل.',
    'tool.text-case.bc':       'محول الحالة',
    'tool.text-case.label-in': 'النص الأصلي',
    'tool.text-case.label-out':'النتيجة',
    'tool.text-case.copy':     '📋 نسخ',
    'tool.text-case.clear':    'مسح',
    'tool.duplicate.title':    'مزيل النصوص المكررة',
    'tool.duplicate.desc':     'الصق نصك وحدد نوع الإزالة ثم اضغط "إزالة التكرار".',
    'tool.duplicate.bc':       'مزيل التكرار',
    'tool.duplicate.label':    'النص الأصلي',
    'tool.duplicate.ph':       'الصق نصك هنا...',
    'tool.duplicate.opt-lines':'إزالة الأسطر المكررة',
    'tool.duplicate.opt-words':'إزالة الكلمات المكررة',
    'tool.duplicate.case':     'حساسية حالة الأحرف',
    'tool.duplicate.btn':      '🔄 إزالة التكرار',
    'tool.duplicate.clear':    'مسح',
    'tool.duplicate.label-out':'النتيجة',
    'tool.duplicate.copy':     '📋 نسخ النتيجة',
    'tool.lorem.title':    'مولد النصوص العشوائية العربية',
    'tool.lorem.desc':     'أنشئ نصوصاً وهمية Lorem Ipsum للمصممين. اختر العدد واللغة واضغط "توليد".',
    'tool.lorem.bc':       'مولد النصوص',
    'tool.lorem.paras':    'عدد الفقرات',
    'tool.lorem.lang':     'اللغة',
    'tool.lorem.opt-ar':   'عربي',
    'tool.lorem.opt-en':   'Lorem Ipsum (إنجليزي)',
    'tool.lorem.btn':      '✨ توليد',
    'tool.lorem.label-out':'النتيجة',
    'tool.lorem.copy':     '📋 نسخ',
    'tool.word-freq.title': 'عداد تكرار الكلمات',
    'tool.word-freq.desc':  'الصق نصك وستحصل على جدول بتكرار كل كلمة ورسم بياني لأكثر 10 كلمات تكراراً.',
    'tool.word-freq.bc':    'تكرار الكلمات',
    'tool.word-freq.label': 'النص',
    'tool.word-freq.ph':    'الصق نصك هنا...',
    'tool.word-freq.btn':   '📊 تحليل',
    'tool.word-freq.opt-freq':  'ترتيب حسب التكرار',
    'tool.word-freq.opt-alpha': 'ترتيب أبجدي',
    'tool.word-freq.csv':   '⬇ تصدير CSV',
    'tool.word-freq.th-num':    '#',
    'tool.word-freq.th-word':   'الكلمة',
    'tool.word-freq.th-count':  'العدد',
    'tool.word-freq.th-pct':    'النسبة',
    'tool.img-compressor.title':   'ضغط الصور',
    'tool.img-compressor.desc':    'ارفع صورتك وحدد مستوى الجودة وسيتم ضغطها فورياً في متصفحك.',
    'tool.img-compressor.bc':      'ضغط الصور',
    'tool.img-compressor.drop-h':  'اسحب الصورة هنا أو اضغط للاختيار',
    'tool.img-compressor.quality': 'جودة الضغط:',
    'tool.img-compressor.btn':     '⚡ ضغط',
    'tool.img-compressor.orig':    'الحجم الأصلي',
    'tool.img-compressor.comp':    'بعد الضغط',
    'tool.img-compressor.saved':   'توفير',
    'tool.img-compressor.dl':      '⬇ تحميل',
    'tool.img-resizer.title':  'تغيير حجم الصورة',
    'tool.img-resizer.desc':   'ارفع صورتك وحدد الأبعاد الجديدة، أو اختر حجماً جاهزاً لمنصات التواصل.',
    'tool.img-resizer.bc':     'تغيير الحجم',
    'tool.img-resizer.presets':'أبعاد جاهزة لمنصات التواصل',
    'tool.img-resizer.width':  'العرض (px)',
    'tool.img-resizer.height': 'الارتفاع (px)',
    'tool.img-resizer.btn':    '🔄 تغيير الحجم',
    'tool.img-resizer.dl':     '⬇ تحميل',
    'tool.img-converter.title':   'محول صيغ الصور',
    'tool.img-converter.desc':    'ارفع صورة وحدد الصيغة المطلوبة وسيتم التحويل فورياً.',
    'tool.img-converter.bc':      'محول الصيغ',
    'tool.img-converter.format':  'تحويل إلى',
    'tool.img-converter.quality': 'جودة الإخراج',
    'tool.img-converter.btn':     '⚡ تحويل',
    'tool.img-converter.dl':      '⬇ تحميل',
    'tool.pdf-merger.title': 'دمج ملفات PDF',
    'tool.pdf-merger.desc':  'ارفع ملفات PDF واضغط "دمج" للحصول على ملف واحد. كل المعالجة في متصفحك.',
    'tool.pdf-merger.bc':    'دمج PDF',
    'tool.pdf-merger.btn':   '🔗 دمج وتحميل',
    'tool.img2pdf.title': 'تحويل الصور إلى PDF',
    'tool.img2pdf.desc':  'ارفع صوراً متعددة وحوّلها إلى ملف PDF واحد بخياراتك.',
    'tool.img2pdf.bc':    'صور إلى PDF',
    'tool.img2pdf.page':  'حجم الصفحة',
    'tool.img2pdf.orient':'الاتجاه',
    'tool.img2pdf.opt-portrait': 'عمودي',
    'tool.img2pdf.opt-landscape':'أفقي',
    'tool.img2pdf.btn':   '📄 تحويل إلى PDF',
    'tool.loan.title':     'حاسبة القروض البنكية',
    'tool.loan.desc':      'أدخل مبلغ القرض وسعر الفائدة والمدة للحصول على القسط الشهري وجدول السداد الكامل.',
    'tool.loan.bc':        'حاسبة القروض',
    'tool.loan.amount':    'مبلغ القرض (د.أ)',
    'tool.loan.rate':      'سعر الفائدة السنوي (%)',
    'tool.loan.term':      'مدة القرض',
    'tool.loan.months':    'شهر',
    'tool.loan.years':     'سنة',
    'tool.loan.btn':       '🔢 احتساب',
    'tool.loan.monthly':   'القسط الشهري',
    'tool.loan.total':     'إجمالي الدفعات',
    'tool.loan.interest':  'إجمالي الفائدة',
    'tool.loan.schedule':  'جدول الإهلاك',
    'tool.loan.th-month':  'الشهر',
    'tool.loan.th-pay':    'القسط',
    'tool.loan.th-princ':  'أصل الدين',
    'tool.loan.th-int':    'الفائدة',
    'tool.loan.th-bal':    'الرصيد',
    'tool.currency.title':  'محول العملات',
    'tool.currency.desc':   'أسعار صرف محدثة يومياً. أدخل المبلغ واختر العملة.',
    'tool.currency.bc':     'محول العملات',
    'tool.currency.common': 'أزواج شائعة',
    'tool.currency.from':   'من',
    'tool.currency.to':     'إلى',
    'tool.currency.amount': 'المبلغ',
    'tool.currency.btn':    '💱 تحويل',
    'tool.currency.prompt': 'أدخل مبلغاً واضغط تحويل',
    'tool.json.title':       'منسق JSON ومدقق',
    'tool.json.desc':        'الصق JSON وحدد العملية: تنسيق، تصغير، أو التحقق من الصحة.',
    'tool.json.bc':          'منسق JSON',
    'tool.json.label-in':    'JSON الأصلي',
    'tool.json.format':      '🎨 تنسيق',
    'tool.json.minify':      '📦 تصغير',
    'tool.json.validate':    '✅ تحقق',
    'tool.json.copy':        '📋 نسخ',
    'tool.json.clear':       '🗑️ مسح',
    'tool.json.label-out':   'النتيجة',
    'tool.password.title':     'مولد كلمات المرور',
    'tool.password.desc':      'اضبط الخيارات واضغط "توليد" للحصول على كلمات مرور آمنة.',
    'tool.password.bc':        'مولد كلمات المرور',
    'tool.password.length':    'طول كلمة المرور',
    'tool.password.uppercase': 'أحرف كبيرة (A-Z)',
    'tool.password.lowercase': 'أحرف صغيرة (a-z)',
    'tool.password.numbers':   'أرقام (0-9)',
    'tool.password.symbols':   'رموز (!@#$)',
    'tool.password.exsimilar': 'استبعاد المتشابهة (0,O,l,1)',
    'tool.password.count':     'عدد كلمات المرور',
    'tool.password.btn':       '🔑 توليد',
    'tool.qr.title':    'مولد QR Code',
    'tool.qr.desc':     'أنشئ رمز QR لأي رابط أو نص أو بيانات. حمّله كصورة PNG.',
    'tool.qr.bc':       'مولد QR Code',
    'tool.qr.type':     'نوع المحتوى',
    'tool.qr.opt-url':  'رابط (URL)',
    'tool.qr.opt-text': 'نص',
    'tool.qr.opt-email':'بريد إلكتروني',
    'tool.qr.opt-phone':'رقم هاتف',
    'tool.qr.opt-wifi': 'شبكة WiFi',
    'tool.qr.size':     'الحجم',
    'tool.qr.size-sm':  'صغير (128)',
    'tool.qr.size-md':  'متوسط (256)',
    'tool.qr.size-lg':  'كبير (512)',
    'tool.qr.fg-color': 'لون الرمز',
    'tool.qr.fg-label': 'اللون الأمامي',
    'tool.qr.bg-color': 'لون الخلفية',
    'tool.qr.bg-label': 'خلفية',
    'tool.qr.ec':       'مستوى تصحيح الخطأ',
    'tool.qr.ec-l':     'منخفض (L)',
    'tool.qr.ec-m':     'متوسط (M)',
    'tool.qr.ec-q':     'عالي (Q)',
    'tool.qr.ec-h':     'مرتفع جداً (H)',
    'tool.qr.btn':      '⚡ توليد QR',
    'tool.qr.download': '⬇ تحميل PNG',
    'tool.shorten.title':        'اختصار الروابط',
    'tool.shorten.desc':         'اختصر أي رابط طويل بضغطة واحدة. مجاني، بدون تسجيل.',
    'tool.shorten.bc':           'اختصار الروابط',
    'tool.shorten.label':        'الرابط الطويل',
    'tool.shorten.ph':           'https://example.com/very-long-url...',
    'tool.shorten.paste':        '📋 لصق',
    'tool.shorten.provider':     'مزود الاختصار',
    'tool.shorten.btn':          '✂️ اختصر الرابط',
    'tool.shorten.result-label': 'الرابط القصير',
    'tool.shorten.copy':         '📋 نسخ',
    'tool.shorten.open':         '↗ فتح',
    'tool.shorten.qr-label':     'رمز QR للرابط القصير',
    'tool.shorten.qr-dl':        '⬇ تحميل QR',
    'tool.shorten.history':      'السجل الأخير',
    'tool.shorten.clear-history':'🗑 مسح',
    'home.hero.title':    'أدوات مجانية،<br><span class="gradient-text">تعمل في متصفحك</span>',
    'home.hero.sub':      'أكثر من 15 أداة عربية مجانية — نصوص، صور، PDF، مالية، ومطورين. بدون تسجيل، بدون رفع ملفاتك.',
    'home.search.ph':     'ابحث عن أداة... مثل: عداد الكلمات',
    'home.search.btn':    'بحث',
    'home.stat.tools':   'أداة مجانية',
    'home.stat.local':   'معالجة محلية',
    'home.stat.cats':    'تصنيفات',
    'home.stat.noreg':   'تسجيل مطلوب',
    'home.cats.badge':   '📂 التصنيفات',
    'home.cats.title':   'جميع الأدوات',
    'home.cats.sub':     'اختر التصنيف الذي يناسب احتياجاتك',
    'home.popular.badge':'🔥 الأكثر استخداماً',
    'home.popular.title':'الأدوات الأكثر استخداماً',
    'home.why.badge':    '✨ لماذا Adawix؟',
    'home.why.title':    'لماذا تختار Adawix؟',
    'home.why.sub':      'صُمم لخدمة المستخدم العربي بشكل أول',
    'home.feat.fast.title':   'سريعة للغاية',
    'home.feat.fast.desc':    'كل الأدوات تعمل مباشرة في المتصفح — لا انتظار، لا تحميل.',
    'home.feat.secure.title': 'آمنة وخاصة',
    'home.feat.secure.desc':  'ملفاتك لا تغادر جهازك أبداً. المعالجة تتم محلياً بالكامل.',
    'home.feat.free.title':   'مجانية تماماً',
    'home.feat.free.desc':    'جميع الأدوات مجانية بلا حدود. لا اشتراك، لا بطاقة ائتمان.',
    'home.feat.device.title': 'تعمل على كل جهاز',
    'home.feat.device.desc':  'مصممة بشكل متجاوب للهاتف والتابلت والكمبيوتر.',
    'home.faq.badge': '❓ أسئلة شائعة',
    'home.faq.title': 'الأسئلة الشائعة',
    'home.faq.q1': 'هل أدوات Adawix مجانية تماماً؟',
    'home.faq.a1': 'نعم، جميع أدوات Adawix مجانية تماماً ولا تتطلب أي تسجيل أو اشتراك أو دفع.',
    'home.faq.q2': 'هل ملفاتي وبياناتي آمنة؟',
    'home.faq.a2': 'نعم بالكامل. جميع عمليات المعالجة تتم مباشرة في متصفحك، ملفاتك لا تُرفع إلى أي خادم ولا تصل إلينا أو لأي طرف ثالث.',
    'home.faq.q3': 'هل تعمل الأدوات على الهاتف المحمول؟',
    'home.faq.a3': 'نعم، صُممت جميع أدوات Adawix بأسلوب متجاوب (Responsive) لتعمل بشكل ممتاز على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر.',
    'home.faq.q4': 'كيف يمكنني اقتراح أداة جديدة؟',
    'home.faq.a4': 'يسعدنا سماع اقتراحاتك! تواصل معنا عبر <a href="/pages/contact.html">صفحة الاتصال</a> وسنأخذ اقتراحك بعين الاعتبار في التحديثات القادمة.',
    'cat.text.h1':      'أدوات النصوص',
    'cat.text.desc':    'أدوات مجانية لتحليل النصوص وتعديلها وتحويلها. جميعها تعمل مباشرة في متصفحك بدون رفع أي بيانات.',
    'cat.image.h1':     'أدوات الصور',
    'cat.image.desc':   'أدوات مجانية لضغط الصور وتغيير حجمها وتحويل صيغتها. تعمل محلياً دون رفع الصور.',
    'cat.pdf.h1':       'أدوات PDF',
    'cat.pdf.desc':     'أدوات مجانية لدمج ملفات PDF وتحويل الصور إلى PDF. بدون خوادم، بدون قيود.',
    'cat.financial.h1': 'أدوات مالية',
    'cat.financial.desc':'حاسبات مالية مجانية: قروض، تحويل عملات، وأكثر. نتائج فورية وموثوقة.',
    'cat.developer.h1': 'أدوات المطورين',
    'cat.developer.desc':'أدوات أساسية للمطورين: تنسيق JSON، مولد كلمات المرور، ومولد QR. مجانية وتعمل في المتصفح.',
  },
  en: {
    'skip.content': 'Skip to content',
    'cat.text':      'Text Tools',
    'cat.image':     'Image Tools',
    'cat.pdf':       'PDF Tools',
    'cat.financial': 'Financial Tools',
    'cat.developer': 'Developer Tools',
    'nav.contact':   'Contact',
    'footer.brand':     'Free, diverse tools that work directly in your browser — no registration, no file uploads to any server. Fast, secure, and easy to use.',
    'footer.tools-h':   'Tools',
    'footer.company-h': 'Company',
    'footer.legal-h':   'Legal',
    'footer.about':     'About Us',
    'footer.contact':   'Contact',
    'footer.sitemap':   'Sitemap',
    'footer.privacy':   'Privacy Policy',
    'footer.terms':     'Terms of Use',
    'footer.rights':    `© ${new Date().getFullYear()} Adawix. All rights reserved.`,
    'footer.love':      'Made with ❤️ for Arabic users',
    'cookie.text':   'We use cookies to improve your experience and show personalized ads.',
    'cookie.privacy':'Privacy Policy',
    'cookie.accept': 'Accept All',
    'cookie.reject': 'Reject Non-Essential',
    'bc.home':             'Home',
    'bc.text-tools':       'Text Tools',
    'bc.image-tools':      'Image Tools',
    'bc.pdf-tools':        'PDF Tools',
    'bc.financial-tools':  'Financial Tools',
    'bc.developer-tools':  'Developer Tools',
    'tool.word-counter.title':    'Word & Character Counter',
    'tool.word-counter.desc':     'Paste or type your text below to instantly count words, characters, sentences, paragraphs, and reading time.',
    'tool.word-counter.bc':       'Word Counter',
    'tool.word-counter.label':    'Enter text here',
    'tool.word-counter.ph':       'Type or paste your text here...',
    'tool.word-counter.copy-btn': '📋 Copy Text',
    'tool.word-counter.paste':    '📌 Paste',
    'tool.word-counter.clear':    '🗑️ Clear',
    'tool.word-counter.words':    'Words',
    'tool.word-counter.chars':    'Characters',
    'tool.word-counter.nospace':  'Without spaces',
    'tool.word-counter.sents':    'Sentences',
    'tool.word-counter.paras':    'Paragraphs',
    'tool.word-counter.read':     'Reading time',
    'tool.text-case.title':    'Text Case Converter',
    'tool.text-case.desc':     'Choose a conversion type and it will be applied instantly to your text.',
    'tool.text-case.bc':       'Case Converter',
    'tool.text-case.label-in': 'Original Text',
    'tool.text-case.label-out':'Result',
    'tool.text-case.copy':     '📋 Copy',
    'tool.text-case.clear':    'Clear',
    'tool.duplicate.title':    'Duplicate Line Remover',
    'tool.duplicate.desc':     'Paste your text, choose the removal type, then click "Remove Duplicates".',
    'tool.duplicate.bc':       'Duplicate Remover',
    'tool.duplicate.label':    'Original Text',
    'tool.duplicate.ph':       'Paste your text here...',
    'tool.duplicate.opt-lines':'Remove Duplicate Lines',
    'tool.duplicate.opt-words':'Remove Duplicate Words',
    'tool.duplicate.case':     'Case Sensitive',
    'tool.duplicate.btn':      '🔄 Remove Duplicates',
    'tool.duplicate.clear':    'Clear',
    'tool.duplicate.label-out':'Result',
    'tool.duplicate.copy':     '📋 Copy Result',
    'tool.lorem.title':    'Arabic Lorem Ipsum Generator',
    'tool.lorem.desc':     'Generate dummy Lorem Ipsum text for designers. Choose count, language, and click "Generate".',
    'tool.lorem.bc':       'Lorem Ipsum Generator',
    'tool.lorem.paras':    'Number of Paragraphs',
    'tool.lorem.lang':     'Language',
    'tool.lorem.opt-ar':   'Arabic',
    'tool.lorem.opt-en':   'Lorem Ipsum (Latin)',
    'tool.lorem.btn':      '✨ Generate',
    'tool.lorem.label-out':'Generated Text',
    'tool.lorem.copy':     '📋 Copy',
    'tool.word-freq.title': 'Word Frequency Counter',
    'tool.word-freq.desc':  'Paste your text to get a frequency table and chart of the top 10 most repeated words.',
    'tool.word-freq.bc':    'Word Frequency',
    'tool.word-freq.label': 'Text',
    'tool.word-freq.ph':    'Paste your text here...',
    'tool.word-freq.btn':   '📊 Analyze',
    'tool.word-freq.opt-freq':  'Sort by Frequency',
    'tool.word-freq.opt-alpha': 'Sort Alphabetically',
    'tool.word-freq.csv':   '⬇ Export CSV',
    'tool.word-freq.th-num':    '#',
    'tool.word-freq.th-word':   'Word',
    'tool.word-freq.th-count':  'Count',
    'tool.word-freq.th-pct':    'Percentage',
    'tool.img-compressor.title':   'Image Compressor',
    'tool.img-compressor.desc':    'Upload your image, set quality level, and it will be compressed instantly in your browser.',
    'tool.img-compressor.bc':      'Image Compressor',
    'tool.img-compressor.drop-h':  'Drag image here or click to select',
    'tool.img-compressor.quality': 'Compression Quality:',
    'tool.img-compressor.btn':     '⚡ Compress',
    'tool.img-compressor.orig':    'Original Size',
    'tool.img-compressor.comp':    'After Compression',
    'tool.img-compressor.saved':   'Saved',
    'tool.img-compressor.dl':      '⬇ Download',
    'tool.img-resizer.title':  'Image Resizer',
    'tool.img-resizer.desc':   'Upload your image and set new dimensions, or choose a preset for social media.',
    'tool.img-resizer.bc':     'Image Resizer',
    'tool.img-resizer.presets':'Social Media Presets',
    'tool.img-resizer.width':  'Width (px)',
    'tool.img-resizer.height': 'Height (px)',
    'tool.img-resizer.btn':    '🔄 Resize',
    'tool.img-resizer.dl':     '⬇ Download',
    'tool.img-converter.title':   'Image Format Converter',
    'tool.img-converter.desc':    'Upload an image, choose the target format, and it converts instantly.',
    'tool.img-converter.bc':      'Format Converter',
    'tool.img-converter.format':  'Convert to',
    'tool.img-converter.quality': 'Output Quality',
    'tool.img-converter.btn':     '⚡ Convert',
    'tool.img-converter.dl':      '⬇ Download',
    'tool.pdf-merger.title': 'PDF Merger',
    'tool.pdf-merger.desc':  'Upload PDF files and click "Merge" to get a single file. All processing in your browser.',
    'tool.pdf-merger.bc':    'PDF Merger',
    'tool.pdf-merger.btn':   '🔗 Merge & Download',
    'tool.img2pdf.title': 'Images to PDF',
    'tool.img2pdf.desc':  'Upload multiple images and convert them into a single PDF file with your options.',
    'tool.img2pdf.bc':    'Images to PDF',
    'tool.img2pdf.page':  'Page Size',
    'tool.img2pdf.orient':'Orientation',
    'tool.img2pdf.opt-portrait': 'Portrait',
    'tool.img2pdf.opt-landscape':'Landscape',
    'tool.img2pdf.btn':   '📄 Convert to PDF',
    'tool.loan.title':     'Loan Calculator',
    'tool.loan.desc':      'Enter the loan amount, interest rate, and term to get the monthly payment and full amortization schedule.',
    'tool.loan.bc':        'Loan Calculator',
    'tool.loan.amount':    'Loan Amount (JOD)',
    'tool.loan.rate':      'Annual Interest Rate (%)',
    'tool.loan.term':      'Loan Term',
    'tool.loan.months':    'months',
    'tool.loan.years':     'years',
    'tool.loan.btn':       '🔢 Calculate',
    'tool.loan.monthly':   'Monthly Payment',
    'tool.loan.total':     'Total Payments',
    'tool.loan.interest':  'Total Interest',
    'tool.loan.schedule':  'Amortization Schedule',
    'tool.loan.th-month':  'Month',
    'tool.loan.th-pay':    'Payment',
    'tool.loan.th-princ':  'Principal',
    'tool.loan.th-int':    'Interest',
    'tool.loan.th-bal':    'Balance',
    'tool.currency.title':  'Currency Converter',
    'tool.currency.desc':   'Daily updated exchange rates. Enter amount and choose currency.',
    'tool.currency.bc':     'Currency Converter',
    'tool.currency.common': 'Common Pairs',
    'tool.currency.from':   'From',
    'tool.currency.to':     'To',
    'tool.currency.amount': 'Amount',
    'tool.currency.btn':    '💱 Convert',
    'tool.currency.prompt': 'Enter amount and click Convert',
    'tool.json.title':       'JSON Formatter & Validator',
    'tool.json.desc':        'Paste JSON and choose the operation: format, minify, or validate.',
    'tool.json.bc':          'JSON Formatter',
    'tool.json.label-in':    'Original JSON',
    'tool.json.format':      '🎨 Format',
    'tool.json.minify':      '📦 Minify',
    'tool.json.validate':    '✅ Validate',
    'tool.json.copy':        '📋 Copy',
    'tool.json.clear':       '🗑️ Clear',
    'tool.json.label-out':   'Result',
    'tool.password.title':     'Password Generator',
    'tool.password.desc':      'Adjust the options and click "Generate" to get secure passwords.',
    'tool.password.bc':        'Password Generator',
    'tool.password.length':    'Password Length',
    'tool.password.uppercase': 'Uppercase (A-Z)',
    'tool.password.lowercase': 'Lowercase (a-z)',
    'tool.password.numbers':   'Numbers (0-9)',
    'tool.password.symbols':   'Symbols (!@#$)',
    'tool.password.exsimilar': 'Exclude similar (0,O,l,1)',
    'tool.password.count':     'Number of passwords',
    'tool.password.btn':       '🔑 Generate',
    'tool.qr.title':    'QR Code Generator',
    'tool.qr.desc':     'Generate a QR code for any URL, text, or data. Download as PNG.',
    'tool.qr.bc':       'QR Code Generator',
    'tool.qr.type':     'Content Type',
    'tool.qr.opt-url':  'URL Link',
    'tool.qr.opt-text': 'Text',
    'tool.qr.opt-email':'Email',
    'tool.qr.opt-phone':'Phone',
    'tool.qr.opt-wifi': 'WiFi Network',
    'tool.qr.size':     'Size',
    'tool.qr.size-sm':  'Small (128)',
    'tool.qr.size-md':  'Medium (256)',
    'tool.qr.size-lg':  'Large (512)',
    'tool.qr.fg-color': 'QR Color',
    'tool.qr.fg-label': 'Foreground',
    'tool.qr.bg-color': 'Background Color',
    'tool.qr.bg-label': 'Background',
    'tool.qr.ec':       'Error Correction',
    'tool.qr.ec-l':     'Low (L)',
    'tool.qr.ec-m':     'Medium (M)',
    'tool.qr.ec-q':     'High (Q)',
    'tool.qr.ec-h':     'Very High (H)',
    'tool.qr.btn':      '⚡ Generate QR',
    'tool.qr.download': '⬇ Download PNG',
    'tool.shorten.title':        'URL Shortener',
    'tool.shorten.desc':         'Shorten any long URL with one click. Free, no sign-up.',
    'tool.shorten.bc':           'URL Shortener',
    'tool.shorten.label':        'Long URL',
    'tool.shorten.ph':           'https://example.com/very-long-url...',
    'tool.shorten.paste':        '📋 Paste',
    'tool.shorten.provider':     'Provider',
    'tool.shorten.btn':          '✂️ Shorten URL',
    'tool.shorten.result-label': 'Short URL',
    'tool.shorten.copy':         '📋 Copy',
    'tool.shorten.open':         '↗ Open',
    'tool.shorten.qr-label':     'QR Code for Short URL',
    'tool.shorten.qr-dl':        '⬇ Download QR',
    'tool.shorten.history':      'Recent History',
    'tool.shorten.clear-history':'🗑 Clear',
    'home.hero.title':    'Free Tools,<br><span class="gradient-text">Right in Your Browser</span>',
    'home.hero.sub':      '15+ free online tools — text, images, PDF, financial, and developer. No registration, no file uploads.',
    'home.search.ph':     'Search for a tool... e.g. Word Counter',
    'home.search.btn':    'Search',
    'home.stat.tools':   'Free Tools',
    'home.stat.local':   'Local Processing',
    'home.stat.cats':    'Categories',
    'home.stat.noreg':   'Registration Required',
    'home.cats.badge':   '📂 Categories',
    'home.cats.title':   'All Tools',
    'home.cats.sub':     'Choose the category that suits your needs',
    'home.popular.badge':'🔥 Most Used',
    'home.popular.title':'Most Used Tools',
    'home.why.badge':    '✨ Why Adawix?',
    'home.why.title':    'Why Choose Adawix?',
    'home.why.sub':      'Designed with the Arabic user in mind',
    'home.feat.fast.title':   'Lightning Fast',
    'home.feat.fast.desc':    'All tools run directly in the browser — no waiting, no loading.',
    'home.feat.secure.title': 'Safe & Private',
    'home.feat.secure.desc':  'Your files never leave your device. All processing is done locally.',
    'home.feat.free.title':   'Completely Free',
    'home.feat.free.desc':    'All tools are free with no limits. No subscription, no credit card.',
    'home.feat.device.title': 'Works on All Devices',
    'home.feat.device.desc':  'Designed responsively for phones, tablets, and computers.',
    'home.faq.badge': '❓ FAQ',
    'home.faq.title': 'Frequently Asked Questions',
    'home.faq.q1': 'Are Adawix tools completely free?',
    'home.faq.a1': 'Yes, all Adawix tools are completely free and require no registration, subscription, or payment.',
    'home.faq.q2': 'Are my files and data safe?',
    'home.faq.a2': 'Absolutely. All processing happens directly in your browser — your files are never uploaded to any server.',
    'home.faq.q3': 'Do the tools work on mobile?',
    'home.faq.a3': 'Yes, all Adawix tools are designed responsively to work perfectly on smartphones, tablets, and computers.',
    'home.faq.q4': 'How can I suggest a new tool?',
    'home.faq.a4': 'We\'d love your suggestions! Contact us via the <a href="/pages/contact.html">Contact page</a> and we\'ll consider your idea in upcoming updates.',
    'cat.text.h1':      'Text Tools',
    'cat.text.desc':    'Free tools for analyzing, editing, and transforming text. All run directly in your browser without uploading any data.',
    'cat.image.h1':     'Image Tools',
    'cat.image.desc':   'Free tools for compressing, resizing, and converting images. Works locally without uploading your images.',
    'cat.pdf.h1':       'PDF Tools',
    'cat.pdf.desc':     'Free tools for merging PDFs and converting images to PDF. No servers, no limits.',
    'cat.financial.h1': 'Financial Tools',
    'cat.financial.desc':'Free financial calculators: loans, currency conversion, and more. Instant and reliable results.',
    'cat.developer.h1': 'Developer Tools',
    'cat.developer.desc':'Essential developer tools: JSON formatter, password generator, and QR code generator. Free and browser-based.',
  }
};

/* ── Header HTML ── */
const HEADER_HTML = `
<a class="skip-link" href="#main-content" data-i18n="skip.content">تخطى إلى المحتوى</a>
<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo" aria-label="أداويكس - الصفحة الرئيسية">
        <span class="logo-text">Adawix</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="فتح القائمة" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="siteNav" aria-label="القائمة الرئيسية">
        <ul>
          <li><a href="/text-tools/"          data-nav="text"      data-i18n="cat.text">أدوات النصوص</a></li>
          <li><a href="/image-tools/"         data-nav="image"     data-i18n="cat.image">أدوات الصور</a></li>
          <li><a href="/pdf-tools/"           data-nav="pdf"       data-i18n="cat.pdf">أدوات PDF</a></li>
          <li><a href="/financial-tools/"     data-nav="financial" data-i18n="cat.financial">أدوات مالية</a></li>
          <li><a href="/developer-tools/"     data-nav="dev"       data-i18n="cat.developer">أدوات المطورين</a></li>
          <li><a href="/pages/contact.html"   data-nav="contact"   data-i18n="nav.contact">اتصل بنا</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="lang-toggle" id="langToggle" aria-label="Switch language / تبديل اللغة">
          <span class="lang-en">EN</span>
          <span class="lang-ar">عر</span>
        </button>
        <button class="dark-toggle" id="darkToggle" aria-label="تبديل الوضع الليلي">
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
          </svg>
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>`;

/* ── Footer HTML ── */
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text">Adawix</span>
        <p data-i18n="footer.brand">أدوات مجانية ومتنوعة تعمل مباشرة في متصفحك، بدون تسجيل وبدون رفع ملفاتك إلى أي خادم. سريعة، آمنة، وسهلة الاستخدام.</p>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.tools-h">أدوات</h4>
        <ul>
          <li><a href="/text-tools/"      data-i18n="cat.text">أدوات النصوص</a></li>
          <li><a href="/image-tools/"     data-i18n="cat.image">أدوات الصور</a></li>
          <li><a href="/pdf-tools/"       data-i18n="cat.pdf">أدوات PDF</a></li>
          <li><a href="/financial-tools/" data-i18n="cat.financial">أدوات مالية</a></li>
          <li><a href="/developer-tools/" data-i18n="cat.developer">أدوات المطورين</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.company-h">الشركة</h4>
        <ul>
          <li><a href="/pages/about.html"       data-i18n="footer.about">من نحن</a></li>
          <li><a href="/pages/contact.html"     data-i18n="footer.contact">اتصل بنا</a></li>
          <li><a href="/pages/sitemap-page.html" data-i18n="footer.sitemap">خريطة الموقع</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.legal-h">قانوني</h4>
        <ul>
          <li><a href="/pages/privacy.html" data-i18n="footer.privacy">سياسة الخصوصية</a></li>
          <li><a href="/pages/terms.html"   data-i18n="footer.terms">اتفاقية الاستخدام</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p data-i18n="footer.rights">© ${new Date().getFullYear()} Adawix. جميع الحقوق محفوظة.</p>
      <p data-i18n="footer.love">مصنوع بـ ❤️ للمستخدم العربي</p>
    </div>
  </div>
</footer>
<div class="toast-container" id="toastContainer"></div>`;

/* ── Cookie Banner ── */
const COOKIE_HTML = `
<div class="cookie-banner" id="cookieBanner">
  <p><span data-i18n="cookie.text">نستخدم ملفات تعريف الارتباط لتحسين تجربتك وعرض إعلانات مخصصة.</span> <a href="/pages/privacy.html" data-i18n="cookie.privacy">سياسة الخصوصية</a></p>
  <div class="cookie-actions">
    <button class="btn btn-accept" id="cookieAccept" data-i18n="cookie.accept">قبول الكل</button>
    <button class="btn btn-reject" id="cookieReject" data-i18n="cookie.reject">رفض غير الضرورية</button>
  </div>
</div>`;

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initDarkMode();
  initNav();
  initCookieBanner();
  initScrollReveal();
  initFAQ();
  highlightActiveNav();
  initLang(); // last — applies translations to all injected + static elements
});

function injectLayout() {
  document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
}

/* ── Language Toggle ── */
function initLang() {
  const lang = localStorage.getItem('adawix-lang') || 'ar';
  applyLang(lang, false);

  document.addEventListener('click', e => {
    if (e.target.closest('#langToggle')) {
      const current = document.documentElement.lang || 'ar';
      applyLang(current === 'ar' ? 'en' : 'ar', true);
    }
  });
}

function applyLang(lang, save) {
  const dict = I18N[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  // Text content translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  // HTML content translations (for elements with links/tags inside)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = dict[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  // Placeholder translations
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = dict[el.dataset.i18nPh];
    if (val !== undefined) el.placeholder = val;
  });

  if (save) localStorage.setItem('adawix-lang', lang);
}

/* ── Light Mode Toggle (dark is default) ── */
function initDarkMode() {
  const theme = localStorage.getItem('adawix-theme');
  if (theme === 'light') document.documentElement.classList.add('light');

  document.addEventListener('click', e => {
    if (e.target.closest('#darkToggle')) {
      document.documentElement.classList.toggle('light');
      localStorage.setItem('adawix-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }
  });
}

/* ── Mobile Nav ── */
function initNav() {
  document.addEventListener('click', e => {
    const toggle = e.target.closest('#navToggle');
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    if (toggle) {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    } else if (!e.target.closest('.site-nav')) {
      nav.classList.remove('open');
    }
  });
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.site-nav a').forEach(a => {
    if (path.startsWith(a.getAttribute('href')) && a.getAttribute('href') !== '/') {
      a.classList.add('active');
    }
  });
}

/* ── Cookie Banner ── */
function initCookieBanner() {
  const consent = localStorage.getItem('adawix-cookie');
  if (!consent) {
    document.body.insertAdjacentHTML('beforeend', COOKIE_HTML);
    document.getElementById('cookieAccept')?.addEventListener('click', () => acceptCookies(true));
    document.getElementById('cookieReject')?.addEventListener('click', () => acceptCookies(false));
  }
}
function acceptCookies(all) {
  localStorage.setItem('adawix-cookie', all ? 'all' : 'essential');
  document.getElementById('cookieBanner')?.remove();
}

/* ── Toast ── */
window.showToast = function(msg, type = 'info', duration = 3000) {
  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
    error:   '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
    info:    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>',
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${msg}</span>`;
  document.getElementById('toastContainer')?.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
};

/* ── Copy to Clipboard ── */
window.copyText = function(text, label = 'النص') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`تم نسخ ${label}!`, 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(`تم نسخ ${label}!`, 'success');
  });
};

/* ── Format File Size ── */
window.formatSize = function(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

/* ── Validate File Size ── */
window.validateFile = function(file, maxMB = 50) {
  if (file.size > maxMB * 1024 * 1024) {
    showToast(`حجم الملف يتجاوز ${maxMB} ميغابايت`, 'error');
    return false;
  }
  return true;
};

/* ── Scroll Reveal ── */
function initScrollReveal() {
  // Mark the document so CSS hides .reveal elements — only when JS is running
  document.documentElement.classList.add('js-reveal-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── FAQ ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
    });
  });
}

/* ── Homepage Search ── */
window.initSearch = function() {
  const input = document.getElementById('heroSearch');
  if (!input) return;
  const allCards = document.querySelectorAll('[data-tool-name]');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    allCards.forEach(card => {
      const name = card.dataset.toolName?.toLowerCase() || '';
      card.closest('.tool-card')?.parentElement?.classList.toggle('hidden', q && !name.includes(q));
    });
  });
  document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' });
  });
};
