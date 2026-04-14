#!/usr/bin/env python3
"""Add hreflang tags + BreadcrumbList schema to all Adawix pages.
Also clears remaining ad placeholder text in tool pages."""

import os, re, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://adawix.com"

# ── Label maps ────────────────────────────────────────────────────────────────
CATEGORY_LABELS = {
    "text-tools":      "أدوات النصوص",
    "image-tools":     "أدوات الصور",
    "pdf-tools":       "أدوات PDF",
    "financial-tools": "أدوات مالية",
    "developer-tools": "أدوات المطورين",
}

TOOL_LABELS = {
    "word-counter":       "عداد الكلمات والحروف",
    "text-case-converter":"محول حالة النص",
    "duplicate-remover":  "مزيل النصوص المكررة",
    "word-frequency":     "عداد تكرار الكلمات",
    "lorem-ipsum-arabic": "مولد النصوص العشوائية",
    "image-compressor":   "ضغط الصور",
    "image-resizer":      "تغيير حجم الصورة",
    "image-converter":    "محول صيغ الصور",
    "pdf-merger":         "دمج ملفات PDF",
    "images-to-pdf":      "تحويل الصور إلى PDF",
    "loan-calculator":    "حاسبة القروض البنكية",
    "currency-converter": "محول العملات",
    "json-formatter":     "منسق JSON",
    "password-generator": "مولد كلمات المرور",
    "qr-generator":       "مولد QR Code",
}

STATIC_LABELS = {
    "about.html":       "من نحن",
    "contact.html":     "اتصل بنا",
    "privacy.html":     "سياسة الخصوصية",
    "terms.html":       "اتفاقية الاستخدام",
    "sitemap-page.html":"خريطة الموقع",
}

# ── Helpers ───────────────────────────────────────────────────────────────────
def hreflang_block(url):
    lines = [
        f'  <link rel="alternate" hreflang="ar"      href="{url}" />',
        f'  <link rel="alternate" hreflang="ar-SA"   href="{url}" />',
        f'  <link rel="alternate" hreflang="ar-AE"   href="{url}" />',
        f'  <link rel="alternate" hreflang="ar-KW"   href="{url}" />',
        f'  <link rel="alternate" hreflang="x-default" href="{url}" />',
    ]
    return "\n".join(lines)

def breadcrumb_schema(items):
    """items = list of (name, url)"""
    elements = []
    for i, (name, url) in enumerate(items, 1):
        elements.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": url,
        })
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": elements,
    }
    return f'  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>'

def get_breadcrumb_items(rel_path):
    """Return breadcrumb items for a relative path from ROOT."""
    parts = rel_path.replace("\\", "/").split("/")
    items = [("الرئيسية", f"{BASE}/")]

    if len(parts) == 1:
        # Static pages/index.html — homepage, no extra crumbs
        return None

    if parts[0] in CATEGORY_LABELS:
        cat_slug = parts[0]
        cat_label = CATEGORY_LABELS[cat_slug]
        if len(parts) == 2:
            # Category index page
            items.append((cat_label, f"{BASE}/{cat_slug}/"))
        elif len(parts) == 3:
            # Tool page
            tool_slug = parts[1]
            tool_label = TOOL_LABELS.get(tool_slug, tool_slug)
            items.append((cat_label, f"{BASE}/{cat_slug}/"))
            items.append((tool_label, f"{BASE}/{cat_slug}/{tool_slug}/"))
        return items

    if parts[0] == "pages":
        filename = parts[1]
        label = STATIC_LABELS.get(filename, filename)
        items.append((label, f"{BASE}/pages/{filename}"))
        return items

    return None

def canonical_from_html(content):
    m = re.search(r'<link rel="canonical" href="([^"]+)"', content)
    return m.group(1) if m else None

def process_file(filepath):
    rel = os.path.relpath(filepath, ROOT).replace("\\", "/")
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    changed = False

    # ── 1. Fix ad placeholder text ─────────────────────────────────────────
    if "مساحة إعلانية" in content:
        content = re.sub(
            r'(<div class="ad-placeholder">)مساحة إعلانية[^<]*(</div>)',
            r'\1\2',
            content
        )
        changed = True

    # ── 2. Skip if hreflang already present ────────────────────────────────
    if 'hreflang' in content:
        if changed:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  [ad-fix only] {rel}")
        else:
            print(f"  [skip] {rel}  (hreflang exists)")
        return

    canonical = canonical_from_html(content)

    # sitemap has no canonical — derive it
    if not canonical:
        if "sitemap-page.html" in filepath:
            canonical = f"{BASE}/pages/sitemap-page.html"
        else:
            print(f"  [warn] no canonical: {rel}")
            return

    # ── 3. Insert hreflang after canonical tag ─────────────────────────────
    hblock = hreflang_block(canonical)
    content = re.sub(
        r'(<link rel="canonical"[^>]+>)',
        rf'\1\n{hblock}',
        content
    )
    changed = True

    # ── 4. Insert BreadcrumbList schema ────────────────────────────────────
    bc_items = get_breadcrumb_items(rel)
    if bc_items and len(bc_items) > 1:
        bc_schema = breadcrumb_schema(bc_items)
        # Insert before first </head> or before first <script type="application/ld+json">
        if '<script type="application/ld+json">' in content:
            content = content.replace(
                '<script type="application/ld+json">',
                f'{bc_schema}\n  <script type="application/ld+json">',
                1
            )
        else:
            content = content.replace("</head>", f"{bc_schema}\n</head>", 1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  [done] {rel}")

# ── Main ──────────────────────────────────────────────────────────────────────
html_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in ('.git', '.claude', '.superpowers', '.gstack', 'scripts', 'libs', 'images', 'css', 'js')]
    for fn in filenames:
        if fn.endswith(".html"):
            html_files.append(os.path.join(dirpath, fn))

html_files.sort()
print(f"Processing {len(html_files)} files...\n")
for f in html_files:
    process_file(f)
print("\nDone.")
