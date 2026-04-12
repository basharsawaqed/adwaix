/* ── Lorem Ipsum Arabic Generator ── */
(function () {
  const AR_PARAGRAPHS = [
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.',
    'إن كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربي زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاءً لغوية، مولد النص العربي مفيد لمصممي المواقع على وجه الخصوص.',
    'هذه الجملة وضعت هنا عمداً لتُبين كيف يبدو النص الوهمي أثناء تصميم المواقع الإلكترونية. النص الوهمي مفيد لإظهار التصميم بشكل واقعي قبل إدراج المحتوى الحقيقي.',
    'يستخدم المصممون ومطورو الويب النصوص الوهمية لملء التصاميم قبل أن يكون المحتوى الفعلي جاهزاً. هذا يساعد في تقييم التخطيط البصري ومدى ملاءمة الخطوط والألوان.',
    'تُعدّ النصوص الوهمية جزءاً أساسياً من عملية تصميم الويب الحديثة، إذ تتيح للمصمم التركيز على الشكل والتخطيط دون أن تشتت انتباهه تفاصيل المحتوى الفعلي.',
    'الجماليات البصرية للموقع تعتمد بشكل كبير على اختيار الخطوط وأحجامها وتباعدها. استخدام نص عربي وهمي حقيقي يعطي صورة أدق عن الشكل النهائي مقارنةً بالنص اللاتيني.',
    'في عالم التصميم الرقمي، يحتاج كل مصمم إلى أدوات تساعده على محاكاة المحتوى الحقيقي. مولد النص العربي الوهمي يوفر هذه الأداة بشكل مثالي للمشاريع العربية.',
  ];

  const EN_PARAGRAPHS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.',
  ];

  const countSlider = document.getElementById('liCount');
  const countVal    = document.getElementById('liCountVal');
  const langSel     = document.getElementById('liLang');
  const btnGen      = document.getElementById('liGenerate');
  const output      = document.getElementById('liOutput');
  const btnCopy     = document.getElementById('liCopy');

  countSlider?.addEventListener('input', () => { countVal.textContent = countSlider.value; });

  btnGen?.addEventListener('click', () => {
    const n    = parseInt(countSlider.value) || 3;
    const lang = langSel?.value || 'ar';
    const pool = lang === 'en' ? EN_PARAGRAPHS : AR_PARAGRAPHS;
    let result = [];
    for (let i = 0; i < n; i++) result.push(pool[i % pool.length]);
    output.value = result.join('\n\n');
    showToast('تم توليد النص!', 'success');
  });

  btnCopy?.addEventListener('click', () => copyText(output.value, 'النص'));
})();
