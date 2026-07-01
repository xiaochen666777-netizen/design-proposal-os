import os, json

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")
os.makedirs(BASE, exist_ok=True)

def w(rel, content):
     p = os.path.join(BASE, rel.replace("/", os.sep))
     os.makedirs(os.path.dirname(p), exist_ok=True)
     with open(p, "w", encoding="utf-8") as f:
         f.write(content)
     print(f"  wrote {rel}")

print("Building Design Proposal OS...")

# ===== CSS =====
w("css/style.css", """:root {
   --color-bg: #F5F2ED;
   --color-bg-alt: #EDE9E3;
   --color-bg-card: #FFFFFF;
   --color-bg-dark: #2C2926;
   --color-bg-dark-alt: #3A3633;
   --color-text: #2C2926;
   --color-text-light: #8B8680;
   --color-text-lighter: #A39E99;
   --color-text-inverse: #F5F2ED;
   --color-accent: #8B7355;
   --color-accent-light: #B5A48C;
   --color-beige: #D4CFC9;
   --color-beige-light: #E8E3DD;
   --color-warm-gray: #9C9590;
   --color-border: #D4CFC9;
   --color-border-light: #E8E3DD;
   --color-success: #7A8B6F;
   --color-gold: #C4A86B;
   --font-display: 'Cormorant Garamond', Georgia, serif;
   --font-body: 'Inter', -apple-system, sans-serif;
   --font-mono: 'JetBrains Mono', monospace;
   --space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px;
   --space-xl: 40px; --space-2xl: 64px; --space-3xl: 96px; --space-4xl: 128px;
   --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-xl: 16px;
   --shadow-sm: 0 1px 3px rgba(44,41,38,0.06);
   --shadow-md: 0 4px 16px rgba(44,41,38,0.08);
   --shadow-lg: 0 8px 32px rgba(44,41,38,0.1);
   --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
   --duration-fast: 150ms; --duration-normal: 300ms; --duration-slow: 500ms; --duration-slower: 800ms;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: var(--font-body); color: var(--color-text); background: var(--color-bg); line-height: 1.6; min-height: 100vh; }
img { max-width: 100%; display: block; }
button { cursor: pointer; font-family: inherit; }
input, textarea, select { font-family: inherit; }
a { color: inherit; text-decoration: none; }
.display-xl { font-family: var(--font-display); font-size: clamp(2.5rem,5vw,4.5rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; }
.display-lg { font-family: var(--font-display); font-size: clamp(2rem,4vw,3.5rem); font-weight: 300; line-height: 1.15; letter-spacing: -0.01em; }
.display-md { font-family: var(--font-display); font-size: clamp(1.5rem,3vw,2.25rem); font-weight: 400; line-height: 1.2; }
.heading-sm { font-family: var(--font-body); font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
.body-lg { font-size: 1.0625rem; line-height: 1.7; }
.body-md { font-size: 0.9375rem; line-height: 1.6; }
.mono { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.02em; }
.text-light { color: var(--color-text-light); }
.text-lighter { color: var(--color-text-lighter); }
.text-accent { color: var(--color-accent); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-xl); }
.container-wide { max-width: 1440px; margin: 0 auto; padding: 0 var(--space-xl); }
.grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-lg); }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-lg); }
@media (max-width: 1024px) { .grid-3 { grid-template-columns: repeat(2,1fr); } .grid-4 { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 768px) { .grid-3,.grid-4 { grid-template-columns: 1fr; } .container,.container-wide { padding: 0 var(--space-md); } }

.generate-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.generate-page::before { content: ''; position: absolute; top: -50%; right: -30%; width: 80vw; height: 80vw; border-radius: 50%; background: radial-gradient(circle, rgba(139,115,85,0.04) 0%, transparent 70%); pointer-events: none; }
.generate-page::after { content: ''; position: absolute; bottom: -40%; left: -20%; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, rgba(196,168,107,0.03) 0%, transparent 70%); pointer-events: none; }
.generate-card { width: 100%; max-width: 560px; padding: var(--space-3xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); position: relative; z-index: 1; }
.generate-card .brand { text-align: center; margin-bottom: var(--space-2xl); }
.generate-card .brand-label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-text-lighter); margin-bottom: var(--space-sm); }
.generate-card .brand-title { font-family: var(--font-display); font-size: 2.5rem; font-weight: 300; color: var(--color-text); letter-spacing: -0.02em; }
.generate-card .brand-sub { font-size: 0.875rem; color: var(--color-text-light); margin-top: var(--space-sm); }
.form-group { margin-bottom: var(--space-lg); }
.form-label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-light); margin-bottom: var(--space-sm); }
.form-input { width: 100%; padding: 14px 16px; font-size: 0.9375rem; color: var(--color-text); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); outline: none; transition: border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out); }
.form-input:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(139,115,85,0.1); }
.form-input::placeholder { color: var(--color-text-lighter); }
textarea.form-input { min-height: 100px; resize: vertical; line-height: 1.6; }
.form-row { display: flex; gap: var(--space-md); }
.form-row .form-group { flex: 1; }
.form-select { width: 100%; padding: 14px 16px; font-size: 0.9375rem; color: var(--color-text); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); outline: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B8680' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; cursor: pointer; transition: border-color var(--duration-fast) var(--ease-out); }
.form-select:focus { border-color: var(--color-accent); }
.btn-generate { width: 100%; padding: 18px 32px; font-size: 0.9375rem; font-weight: 500; letter-spacing: 0.04em; color: var(--color-text-inverse); background: var(--color-bg-dark); border: none; border-radius: var(--radius-md); transition: all var(--duration-normal) var(--ease-out); position: relative; overflow: hidden; }
.btn-generate:hover { background: var(--color-bg-dark-alt); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn-generate.loading { pointer-events: none; color: transparent; }
.btn-generate.loading::after { content: ''; position: absolute; top: 50%; left: 50%; width: 20px; height: 20px; margin: -10px 0 0 -10px; border: 2px solid rgba(245,242,237,0.3); border-top-color: var(--color-text-inverse); border-radius: 50%; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.proposal-site { min-height: 100vh; }
.proposal-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(245,242,237,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border-light); }
.nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1440px; margin: 0 auto; padding: 0 var(--space-xl); height: 64px; }
.nav-brand { font-family: var(--font-display); font-size: 1.25rem; font-weight: 400; white-space: nowrap; }
.nav-brand span { font-size: 0.6875rem; font-family: var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-lighter); margin-left: var(--space-sm); }
.nav-links { display: flex; align-items: center; gap: var(--space-xs); }
.nav-link { padding: 8px 14px; font-size: 0.8125rem; font-weight: 400; color: var(--color-text-light); border-radius: var(--radius-sm); transition: all var(--duration-fast) var(--ease-out); white-space: nowrap; cursor: pointer; }
.nav-link:hover { color: var(--color-text); background: rgba(44,41,38,0.04); }
.nav-link.active { color: var(--color-text); background: rgba(44,41,38,0.06); font-weight: 500; }
.nav-actions { display: flex; align-items: center; gap: var(--space-sm); }
.btn-outline { padding: 8px 18px; font-size: 0.8125rem; font-weight: 500; color: var(--color-text); background: transparent; border: 1px solid var(--color-border); border-radius: var(--radius-sm); transition: all var(--duration-fast) var(--ease-out); }
.btn-outline:hover { border-color: var(--color-text); background: rgba(44,41,38,0.03); }
.btn-primary { padding: 8px 18px; font-size: 0.8125rem; font-weight: 500; color: var(--color-text-inverse); background: var(--color-bg-dark); border: none; border-radius: var(--radius-sm); transition: all var(--duration-fast) var(--ease-out); }
.btn-primary:hover { background: var(--color-bg-dark-alt); }
.nav-hamburger { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; font-size: 1.25rem; }
@media (max-width: 1024px) { .nav-links { display: none; } .nav-hamburger { display: flex; } .nav-links.open { display: flex; flex-direction: column; position: absolute; top: 64px; left: 0; right: 0; background: rgba(245,242,237,0.98); backdrop-filter: blur(12px); padding: var(--space-md); border-bottom: 1px solid var(--color-border-light); box-shadow: var(--shadow-md); } }
.proposal-content { padding-top: 64px; }

.section { padding: var(--space-4xl) 0; opacity: 0; transform: translateY(20px); transition: opacity var(--duration-slower) var(--ease-out), transform var(--duration-slower) var(--ease-out); }
.section.visible { opacity: 1; transform: translateY(0); }
.section-header { margin-bottom: var(--space-3xl); }
.section-label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-text-lighter); margin-bottom: var(--space-sm); }
.section-title { font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem); font-weight: 300; line-height: 1.15; }
.section-desc { font-size: 1.0625rem; color: var(--color-text-light); margin-top: var(--space-md); max-width: 600px; line-height: 1.7; }

.overview-hero { min-height: 70vh; display: flex; flex-direction: column; justify-content: center; padding: var(--space-4xl) 0; position: relative; }
.overview-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(139,115,85,0.03) 0%, transparent 50%, rgba(196,168,107,0.02) 100%); pointer-events: none; }
.hero-label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-accent); margin-bottom: var(--space-lg); }
.hero-title { font-family: var(--font-display); font-size: clamp(2.5rem,6vw,5rem); font-weight: 300; line-height: 1.05; max-width: 800px; margin-bottom: var(--space-xl); }
.hero-subtitle { font-family: var(--font-display); font-size: clamp(1.25rem,2.5vw,1.75rem); font-weight: 300; font-style: italic; color: var(--color-text-light); margin-bottom: var(--space-2xl); }
.hero-conclusion { display: inline-flex; align-items: center; gap: var(--space-md); padding: 14px 28px; background: var(--color-bg-dark); color: var(--color-text-inverse); border-radius: var(--radius-lg); font-size: 0.9375rem; }
.hero-conclusion .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-gold); }
.project-info-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: var(--space-lg); margin-top: var(--space-3xl); }
.info-card { padding: var(--space-lg); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); transition: all var(--duration-normal) var(--ease-out); }
.info-card:hover { border-color: var(--color-border); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.info-card .label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-lighter); margin-bottom: var(--space-sm); }
.info-card .value { font-family: var(--font-display); font-size: 1.25rem; font-weight: 400; }
@media (max-width: 768px) { .project-info-grid { grid-template-columns: repeat(2,1fr); } }

.style-mix-bar { display: flex; height: 48px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: var(--space-2xl); box-shadow: var(--shadow-sm); }
.style-mix-segment { display: flex; align-items: center; justify-content: center; font-size: 0.8125rem; font-weight: 500; color: var(--color-text-inverse); }
.style-pillars { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-xl); }
.style-pillar { padding: var(--space-xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); transition: all var(--duration-normal) var(--ease-out); }
.style-pillar:hover { border-color: var(--color-accent-light); box-shadow: var(--shadow-md); }
.pillar-icon { width: 48px; height: 48px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: var(--space-lg); background: var(--color-bg); }
.pillar-title { font-family: var(--font-display); font-size: 1.25rem; font-weight: 400; margin-bottom: var(--space-md); }
.pillar-items { list-style: none; }
.pillar-items li { padding: var(--space-sm) 0; font-size: 0.875rem; color: var(--color-text-light); border-bottom: 1px solid var(--color-border-light); }
.pillar-items li:last-child { border-bottom: none; }
.pillar-items li::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent-light); margin-right: var(--space-sm); vertical-align: middle; }
@media (max-width: 768px) { .style-pillars { grid-template-columns: 1fr; } }
.mood-board { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 200px 200px; gap: var(--space-md); margin-top: var(--space-2xl); }
.mood-board-item { background: var(--color-bg-alt); border-radius: var(--radius-md); overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.125rem; font-style: italic; color: var(--color-text-lighter); position: relative; }
.mood-board-item:first-child { grid-row: span 2; }
@media (max-width: 768px) { .mood-board { grid-template-columns: 1fr 1fr; grid-template-rows: auto; } .mood-board-item:first-child { grid-row: span 1; grid-column: span 2; } }

.ds-category { margin-bottom: var(--space-3xl); }
.ds-category-header { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl); padding-bottom: var(--space-md); border-bottom: 1px solid var(--color-border-light); }
.ds-category-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.125rem; background: var(--color-bg-alt); }
.ds-category-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; }
.ds-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-lg); }
.ds-item { padding: var(--space-lg); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); transition: all var(--duration-normal) var(--ease-out); }
.ds-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--color-border); }
.ds-item-swatch { width: 100%; height: 80px; border-radius: var(--radius-sm); margin-bottom: var(--space-md); }
.ds-item-name { font-weight: 500; font-size: 0.9375rem; margin-bottom: 4px; }
.ds-item-desc { font-size: 0.8125rem; color: var(--color-text-light); line-height: 1.5; }
.ds-item-tag { display: inline-block; margin-top: var(--space-sm); padding: 3px 10px; font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; background: var(--color-bg); border-radius: 100px; color: var(--color-text-light); }
@media (max-width: 768px) { .ds-grid { grid-template-columns: 1fr; } }

.space-cards { display: flex; flex-direction: column; gap: var(--space-xl); }
.space-card { padding: var(--space-2xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); transition: all var(--duration-normal) var(--ease-out); }
.space-card:hover { box-shadow: var(--shadow-md); border-color: var(--color-border); }
.space-card-header { display: flex; align-items: center; gap: var(--space-lg); margin-bottom: var(--space-xl); }
.space-card-icon { width: 56px; height: 56px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; background: var(--color-bg); flex-shrink: 0; }
.space-card-title { font-family: var(--font-display); font-size: 1.75rem; font-weight: 400; }
.space-card-subtitle { font-size: 0.8125rem; color: var(--color-text-light); margin-top: 2px; }
.space-card-details { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-lg); }
.space-detail { padding: var(--space-md); background: var(--color-bg); border-radius: var(--radius-sm); }
.space-detail-label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-lighter); margin-bottom: 4px; }
.space-detail-value { font-size: 0.9375rem; font-weight: 500; }
@media (max-width: 768px) { .space-card-details { grid-template-columns: 1fr; } .space-card { padding: var(--space-lg); } }

.budget-tiers { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-lg); }
.budget-tier { padding: var(--space-xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); position: relative; transition: all var(--duration-normal) var(--ease-out); }
.budget-tier:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.budget-tier.recommended { border-color: var(--color-accent); box-shadow: 0 0 0 1px var(--color-accent); }
.budget-tier.recommended::before { content: 'Recommended'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); padding: 4px 16px; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-inverse); background: var(--color-accent); border-radius: 100px; }
.tier-label { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-lighter); margin-bottom: var(--space-sm); }
.tier-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; margin-bottom: var(--space-md); }
.tier-price { font-size: 2rem; font-weight: 300; color: var(--color-accent); margin-bottom: var(--space-lg); }
.tier-price span { font-size: 0.875rem; color: var(--color-text-lighter); }
.tier-features { list-style: none; margin-bottom: var(--space-xl); }
.tier-features li { padding: var(--space-sm) 0; font-size: 0.875rem; color: var(--color-text-light); border-bottom: 1px solid var(--color-border-light); display: flex; align-items: center; gap: var(--space-sm); }
.tier-features li:last-child { border-bottom: none; }
.tier-features li .check { color: var(--color-success); font-size: 0.75rem; }
.btn-tier { width: 100%; padding: 12px; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: transparent; color: var(--color-text); transition: all var(--duration-fast) var(--ease-out); }
.btn-tier:hover { background: var(--color-bg-dark); color: var(--color-text-inverse); border-color: var(--color-bg-dark); }
.budget-tier.recommended .btn-tier { background: var(--color-bg-dark); color: var(--color-text-inverse); border-color: var(--color-bg-dark); }
@media (max-width: 768px) { .budget-tiers { grid-template-columns: 1fr; } }

.ref-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-lg); }
.ref-card { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); overflow: hidden; transition: all var(--duration-normal) var(--ease-out); }
.ref-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.ref-card-image { height: 200px; background: var(--color-bg-alt); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-style: italic; color: var(--color-text-lighter); font-size: 0.9375rem; position: relative; overflow: hidden; }
.ref-card-body { padding: var(--space-lg); }
.ref-card-title { font-weight: 500; font-size: 0.9375rem; margin-bottom: 4px; }
.ref-card-desc { font-size: 0.8125rem; color: var(--color-text-light); line-height: 1.5; }
.ref-prompt-section { margin-top: var(--space-2xl); padding: var(--space-xl); background: var(--color-bg-dark); border-radius: var(--radius-lg); }
.ref-prompt-title { font-family: var(--font-display); font-size: 1.25rem; color: var(--color-text-inverse); margin-bottom: var(--space-md); }
.ref-prompt-code { padding: var(--space-md); background: rgba(245,242,237,0.06); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-beige); line-height: 1.7; white-space: pre-wrap; }
@media (max-width: 768px) { .ref-grid { grid-template-columns: 1fr; } }

.decision-container { max-width: 800px; margin: 0 auto; }
.decision-step { margin-bottom: var(--space-2xl); padding: var(--space-xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); }
.decision-step-number { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); margin-bottom: var(--space-sm); }
.decision-step-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400; margin-bottom: var(--space-lg); }
.decision-actions { display: flex; gap: var(--space-md); }
.btn-decision { flex: 1; padding: 14px 20px; font-size: 0.9375rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); background: transparent; color: var(--color-text); transition: all var(--duration-fast) var(--ease-out); text-align: center; }
.btn-decision:hover { background: var(--color-bg-alt); }
.btn-decision.primary { background: var(--color-bg-dark); color: var(--color-text-inverse); border-color: var(--color-bg-dark); }
.btn-decision.primary:hover { background: var(--color-bg-dark-alt); }
.btn-decision.selected { border-color: var(--color-accent); background: rgba(139,115,85,0.06); }
.slider-group { margin-bottom: var(--space-xl); }
.slider-label { display: flex; justify-content: space-between; font-size: 0.8125rem; color: var(--color-text-light); margin-bottom: var(--space-sm); }
.slider-track { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--color-border-light); border-radius: 3px; outline: none; }
.slider-track::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--color-bg-dark); cursor: pointer; border: 3px solid var(--color-bg-card); box-shadow: var(--shadow-sm); }
.btn-lock { width: 100%; padding: 20px; font-size: 1rem; font-weight: 500; letter-spacing: 0.04em; color: var(--color-text-inverse); background: var(--color-accent); border: none; border-radius: var(--radius-md); transition: all var(--duration-normal) var(--ease-out); }
.btn-lock:hover { background: #7A6348; transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn-lock:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.export-page { min-height: calc(100vh - 64px); display: flex; align-items: center; justify-content: center; padding: var(--space-3xl); }
.export-card { max-width: 640px; width: 100%; padding: var(--space-3xl); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); text-align: center; box-shadow: var(--shadow-lg); }
.export-icon { width: 64px; height: 64px; margin: 0 auto var(--space-xl); border-radius: var(--radius-lg); background: var(--color-bg); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; }
.export-title { font-family: var(--font-display); font-size: 2rem; font-weight: 300; margin-bottom: var(--space-md); }
.export-desc { font-size: 0.9375rem; color: var(--color-text-light); margin-bottom: var(--space-2xl); }
.export-options { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-md); }
.export-option { padding: var(--space-lg); background: var(--color-bg); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); transition: all var(--duration-normal) var(--ease-out); cursor: pointer; text-align: left; }
.export-option:hover { border-color: var(--color-accent-light); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
.export-option .opt-icon { font-size: 1.25rem; margin-bottom: var(--space-sm); }
.export-option .opt-title { font-weight: 500; font-size: 0.9375rem; margin-bottom: 4px; }
.export-option .opt-desc { font-size: 0.75rem; color: var(--color-text-lighter); }

.gen-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(44,41,38,0.95); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity var(--duration-slow) var(--ease-out); }
.gen-overlay.active { opacity: 1; pointer-events: all; }
.gen-progress { text-align: center; color: var(--color-text-inverse); }
.gen-progress-title { font-family: var(--font-display); font-size: 2rem; font-weight: 300; margin-bottom: var(--space-xl); }
.gen-steps { text-align: left; max-width: 360px; margin: 0 auto; }
.gen-step { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) 0; font-size: 0.875rem; color: rgba(245,242,237,0.3); transition: color var(--duration-normal) var(--ease-out); }
.gen-step.active { color: rgba(245,242,237,0.9); }
.gen-step.done { color: rgba(245,242,237,0.5); }
.gen-step .step-ind { width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(245,242,237,0.2); display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; flex-shrink: 0; transition: all var(--duration-normal) var(--ease-out); }
.gen-step.active .step-ind { border-color: var(--color-gold); color: var(--color-gold); }
.gen-step.done .step-ind { border-color: var(--color-success); background: var(--color-success); color: var(--color-text-inverse); }

.locked-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(44,41,38,0.9); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity var(--duration-slow) var(--ease-out); }
.locked-overlay.active { opacity: 1; pointer-events: all; }
.locked-card { max-width: 480px; width: 90%; padding: var(--space-3xl); background: var(--color-bg-card); border-radius: var(--radius-xl); text-align: center; }
.locked-icon { width: 72px; height: 72px; margin: 0 auto var(--space-xl); border-radius: 50%; background: var(--color-success); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; }
.locked-title { font-family: var(--font-display); font-size: 2rem; font-weight: 300; margin-bottom: var(--space-md); }
.locked-desc { font-size: 0.9375rem; color: var(--color-text-light); margin-bottom: var(--space-2xl); line-height: 1.7; }
.toast { position: fixed; bottom: var(--space-xl); left: 50%; transform: translateX(-50%) translateY(100px); padding: 14px 28px; background: var(--color-bg-dark); color: var(--color-text-inverse); border-radius: var(--radius-md); font-size: 0.875rem; box-shadow: var(--shadow-lg); z-index: 300; transition: transform var(--duration-normal) var(--ease-out); }
.toast.show { transform: translateX(-50%) translateY(0); }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-in { animation: slideUp var(--duration-slower) var(--ease-out) forwards; opacity: 0; }
.stagger-1 { animation-delay: 100ms; }
.stagger-2 { animation-delay: 200ms; }
.stagger-3 { animation-delay: 300ms; }
.stagger-4 { animation-delay: 400ms; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-beige); border-radius: 3px; }
""")

print("CSS done, writing JS files...")

# ===== JS: State =====
w("js/state.js", """
// Global application state
window.AppState = {
   currentPage: 'generate',
   proposal: null,
   decisionStatus: 'pending',
   selectedTier: null,
   styleAccepted: false,
   sliders: { luxury: 50, minimal: 50 }
};
""")

# ===== JS: Generator =====
w("js/generator.js", """
// AI Proposal Generation Engine
window.Generator = {
   templates: {
     minimal: {
       styles: [
         { name: 'Modern Minimalist', weight: 70, color: '#2C2926', bg: '#3A3633' },
         { name: 'Japandi', weight: 30, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: 'White Oak', desc: 'Clean grain, light finish, natural warmth', tag: 'Wood', swatch: '#C4B49A' },
         { name: 'White Microcement', desc: 'Seamless walls, matte surface, pure aesthetic', tag: 'Surface', swatch: '#E8E3DD' },
         { name: 'Brushed Brass', desc: 'Subtle hardware accents, refined detail', tag: 'Metal', swatch: '#C4A86B' }
       ],
       colors: [
         { name: 'Soft White', desc: 'Primary wall and ceiling tone', tag: 'Base', swatch: '#F5F2ED' },
         { name: 'Warm Gray', desc: 'Furniture and textile primary', tag: 'Primary', swatch: '#9C9590' },
         { name: 'Charcoal', desc: 'Accent and contrast element', tag: 'Accent', swatch: '#4A4744' }
       ],
       lighting: [
         { name: 'Ambient Layer', desc: 'Indirect ceiling wash, even diffusion', tag: 'Base', swatch: '#F5F2ED' },
         { name: 'Task Focus', desc: 'Directional downlights at work surfaces', tag: 'Functional', swatch: '#E8E3DD' },
         { name: 'Natural Priority', desc: 'Maximize daylight, sheer filtration', tag: 'Strategy', swatch: '#D4CFC9' }
       ],
       spatialLogic: ['Clean lines', 'Negative space', 'Functional flow', 'Visual quiet'],
       mood: 'serene simplicity'
     },
     luxury: {
       styles: [
         { name: 'Modern Luxury', weight: 60, color: '#2C2926', bg: '#3A3633' },
         { name: 'Wabi Sabi', weight: 40, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: 'Calacatta Marble', desc: 'Bold veining, polished finish, statement surfaces', tag: 'Stone', swatch: '#E8E3DD' },
         { name: 'Walnut', desc: 'Rich dark grain, oil finish, warm depth', tag: 'Wood', swatch: '#6B5B4A' },
         { name: 'Microcement', desc: 'Seamless matte walls, contemporary texture', tag: 'Surface', swatch: '#9C9590' }
       ],
       colors: [
         { name: 'Warm Gray', desc: 'Primary wall tone, sophisticated base', tag: 'Base', swatch: '#9C9590' },
         { name: 'Beige', desc: 'Textile and accent surfaces', tag: 'Primary', swatch: '#D4CFC9' },
         { name: 'Soft White', desc: 'Ceiling and highlight contrast', tag: 'Accent', swatch: '#F5F2ED' }
       ],
       lighting: [
         { name: 'Ambient Layer', desc: 'Indirect warm wash, ceiling perimeter', tag: 'Base', swatch: '#D4CFC9' },
         { name: 'Accent Light', desc: 'Art and feature wall highlights', tag: 'Feature', swatch: '#C4A86B' },
         { name: 'Natural Diffusion', desc: 'Sheer curtains, soft shadow play', tag: 'Strategy', swatch: '#E8E3DD' }
       ],
       spatialLogic: ['Asymmetry', 'Flow', 'Visual hierarchy', 'Calm luxury'],
       mood: 'calm luxury with natural imperfection'
     },
     natural: {
       styles: [
         { name: 'Organic Modern', weight: 65, color: '#7A8B6F', bg: '#5C6B52' },
         { name: 'Scandinavian', weight: 35, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: 'Reclaimed Timber', desc: 'Character grain, natural patina, sustainable', tag: 'Wood', swatch: '#8B7355' },
         { name: 'Lime Plaster', desc: 'Breathable walls, soft texture, living finish', tag: 'Surface', swatch: '#E8E3DD' },
         { name: 'Travertine', desc: 'Honed stone, warm tones, timeless', tag: 'Stone', swatch: '#D4CFC9' }
       ],
       colors: [
         { name: 'Sage', desc: 'Primary accent, natural harmony', tag: 'Accent', swatch: '#9CA895' },
         { name: 'Sand', desc: 'Base wall and textile tone', tag: 'Base', swatch: '#D4CFC9' },
         { name: 'Cream', desc: 'Ceiling and light surface', tag: 'Primary', swatch: '#F5F2ED' }
       ],
       lighting: [
         { name: 'Daylight Harvest', desc: 'Maximize windows, minimal obstruction', tag: 'Strategy', swatch: '#F5F2ED' },
         { name: 'Warm Glow', desc: 'Low kelvin pendants, intimate zones', tag: 'Ambient', swatch: '#C4A86B' },
         { name: 'Shadow Play', desc: 'Linen filters, dappled natural light', tag: 'Feature', swatch: '#9C9590' }
       ],
       spatialLogic: ['Organic flow', 'Biophilic', 'Material honesty', 'Soft transitions'],
       mood: 'grounded natural warmth'
     }
   },

   spaces: {
     living: {
       icon: '\\u{1F3E0}',
       title: 'Living Room',
       subtitle: 'Primary social and relaxation space',
       strategies: {
         minimal: { layout: 'Open plan + clean axis', focus: 'Negative space as feature', materials: 'White oak + white microcement' },
         luxury: { layout: 'Open + axis flow', focus: 'Central visual anchor', materials: 'Marble wall + walnut base' },
         natural: { layout: 'Organic zoning + flow', focus: 'Nature connection point', materials: 'Timber + lime plaster' }
       }
     },
     bedroom: {
       icon: '\\u{1F6CF}',
       title: 'Bedroom',
       subtitle: 'Private rest and recovery space',
       strategies: {
         minimal: { layout: 'Minimal footprint, floating elements', focus: 'Bed as sole focal point', materials: 'Light oak + linen' },
         luxury: { layout: 'Soft / private / calm', focus: 'Layered texture canopy', materials: 'Walnut + silk + marble' },
         natural: { layout: 'Gentle enclosure, grounded', focus: 'Window-nature alignment', materials: 'Reclaimed timber + cotton' }
       }
     },
     kitchen: {
       icon: '\\u{1F37D}',
       title: 'Kitchen',
       subtitle: 'Function-first culinary space',
       strategies: {
         minimal: { layout: 'Hidden storage, flush surfaces', focus: 'Island as sculptural form', materials: 'White quartz + oak' },
         luxury: { layout: 'Function-first modular design', focus: 'Material showcase island', materials: 'Marble + walnut + brass' },
         natural: { layout: 'Open shelving, honest storage', focus: 'Herb garden integration', materials: 'Travertine + timber' }
       }
     }
   },

   budgetMultipliers: { low: 0.6, mid: 1.0, high: 1.6 },

   generate(input) {
     const style = input.style || 'luxury';
     const budget = input.budget || 'mid';
     const tmpl = this.templates[style];
     const baseBudget = budget === 'low' ? 180 : budget === 'mid' ? 320 : 520;

     return {
       projectName: input.description || 'Untitled Project',
       projectType: this._inferType(input.description),
       area: this._inferArea(input.description),
       stylePreference: style,
       budgetLevel: budget,
       styleMix: tmpl.styles,
       designSystem: {
         materials: tmpl.materials,
         colors: tmpl.colors,
         lighting: tmpl.lighting,
         spatialLogic: tmpl.spatialLogic
       },
       mood: tmpl.mood,
       spaces: Object.keys(this.spaces).map(key => {
         const sp = this.spaces[key];
         const strat = sp.strategies[style];
         return { ...sp, strategies: undefined, ...strat, key };
       }),
       budgetTiers: [
         {
           id: 'luxury',
           label: 'Luxury Tier',
           name: 'Full Vision',
           price: Math.round(baseBudget * 1.6),
           features: ['Premium materials throughout', 'Custom fabrication', 'Full lighting design', 'Art curation', 'Bespoke furniture'],
           recommended: budget === 'high'
         },
         {
           id: 'mid',
           label: 'Mid Tier',
           name: 'Refined Balance',
           price: baseBudget,
           features: ['Quality materials, selective premium', 'Semi-custom solutions', 'Core lighting design', 'Key statement pieces', 'Curated selections'],
           recommended: budget === 'mid'
         },
         {
           id: 'optimized',
           label: 'Optimized Tier',
           name: 'Smart Essential',
           price: Math.round(baseBudget * 0.6),
           features: ['Smart material alternatives', 'Off-the-shelf + custom mix', 'Functional lighting', 'Strategic accents only', 'Value-engineered design'],
           recommended: budget === 'low'
         }
       ],
       references: this._generateReferences(style),
       aiPrompt: this._generatePrompt(style, input.description)
     };
   },

   _inferType(desc) {
     if (!desc) return 'Residential';
     const d = desc.toLowerCase();
     if (d.includes('office') || d.includes('commercial')) return 'Commercial';
     if (d.includes('restaurant') || d.includes('retail')) return 'Hospitality';
     if (d.includes('apartment') || d.includes('house') || d.includes('bedroom')) return 'Residential';
     return 'Residential';
   },

   _inferArea(desc) {
     if (!desc) return '120-180 sqm';
     const d = desc.toLowerCase();
     if (d.includes('large') || d.includes('villa')) return '250+ sqm';
     if (d.includes('small') || d.includes('studio')) return '50-80 sqm';
     return '120-180 sqm';
   },

   _generateReferences(style) {
     const refs = {
       minimal: [
         { title: 'MUJI Hotel', desc: 'Minimalist hospitality with material restraint' },
         { title: 'John Pawson Residence', desc: 'Architectural minimalism, pure volume' },
         { title: 'Noma Interior', desc: 'Scandinavian natural material palette' }
       ],
       luxury: [
         { title: 'Aman Tokyo', desc: 'Calm luxury with Japanese sensibility' },
         { title: 'Kelly Wearstler', desc: 'Material-rich contemporary luxury' },
         { title: 'Axel Vervoordt', desc: 'Wabi-sabi meets European refinement' }
       ],
       natural: [
         { title: 'Soori Bali', desc: 'Volcanic stone and tropical modernism' },
         { title: 'Studio MK27', desc: 'Brazilian modernism with raw materiality' },
         { title: 'Stiness Arkitektur', desc: 'Nordic timber and landscape integration' }
       ]
     };
     return refs[style] || refs.luxury;
   },

   _generatePrompt(style, desc) {
     const prompts = {
       minimal: `Interior design render, ${desc || 'modern minimalist apartment'}, clean white walls, white oak floors, microcement surfaces, negative space, soft natural light through sheer curtains, brushed brass hardware, Japandi aesthetic, serene atmosphere, architectural photography, 8K`,
       luxury: `Interior design render, ${desc || 'luxury apartment'}, calacatta marble walls, dark walnut, warm microcement, layered soft lighting, natural material imperfection, wabi-sabi meets modern luxury, warm gray palette, aspirational, architectural digest quality, 8K`,
       natural: `Interior design render, ${desc || 'natural modern home'}, reclaimed timber, lime plaster walls, travertine stone, sage green accents, biophilic design, organic flow, dappled daylight, linen textures, scandinavian warmth, 8K`
     };
     return prompts[style] || prompts.luxury;
   }
};
""")

# ===== JS: Router =====
w("js/router.js", """
window.Router = {
   navigate(page) {
     window.AppState.currentPage = page;
     window.App.render();
     window.scrollTo(0, 0);
   }
};
""")

# ===== JS: Generate Page =====
w("js/components/generate.js", """
window.GeneratePage = {
   render() {
     return `
       <div class="generate-page">
         <div class="generate-card">
           <div class="brand">
             <div class="brand-label">Design Proposal OS</div>
             <div class="brand-title">Proposal Generator</div>
             <div class="brand-sub">Input your project, generate a complete design proposal website</div>
           </div>
           <div class="form-group">
             <label class="form-label">Project Description</label>
             <textarea class="form-input" id="projectDesc" placeholder="3 bedroom luxury apartment, calm, modern, natural materials">3 bedroom luxury apartment, calm, modern, natural materials</textarea>
           </div>
           <div class="form-row">
             <div class="form-group">
               <label class="form-label">Budget</label>
               <select class="form-select" id="budgetLevel">
                 <option value="low">Low</option>
                 <option value="mid" selected>Mid</option>
                 <option value="high">High</option>
               </select>
             </div>
             <div class="form-group">
               <label class="form-label">Style Preference</label>
               <select class="form-select" id="stylePref">
                 <option value="minimal">Minimal</option>
                 <option value="luxury" selected>Luxury</option>
                 <option value="natural">Natural</option>
               </select>
             </div>
           </div>
           <div class="form-group">
             <label class="form-label">Region</label>
             <select class="form-select" id="regionSelect">
               <option value="local">Local</option>
               <option value="international">International</option>
             </select>
           </div>
           <button class="btn-generate" id="generateBtn">Generate Proposal</button>
         </div>
       </div>
     `;
   },
   init() {
     document.getElementById('generateBtn').addEventListener('click', () => this.handleGenerate());
   },
   async handleGenerate() {
     const btn = document.getElementById('generateBtn');
     btn.classList.add('loading');

     const input = {
       description: document.getElementById('projectDesc').value,
       budget: document.getElementById('budgetLevel').value,
       style: document.getElementById('stylePref').value,
       region: document.getElementById('regionSelect').value
     };

     await this.showGenerationProgress();

     window.AppState.proposal = window.Generator.generate(input);
     window.AppState.decisionStatus = 'pending';
     window.AppState.selectedTier = null;
     window.AppState.styleAccepted = false;

     btn.classList.remove('loading');
     document.getElementById('genOverlay').classList.remove('active');
     window.Router.navigate('proposal');
   },
   async showGenerationProgress() {
     const overlay = document.getElementById('genOverlay');
     const stepsEl = document.getElementById('genSteps');
     const steps = [
       'Analyzing project requirements',
       'Matching style direction',
       'Generating design system',
       'Building space strategy',
       'Creating budget structure',
       'Compiling references'
     ];

     stepsEl.innerHTML = steps.map((s, i) =>
       '<div class="gen-step" data-step="' + i + '">' +
         '<div class="step-ind">' + (i + 1) + '</div>' +
         '<span>' + s + '</span>' +
       '</div>'
     ).join('');

     overlay.classList.add('active');

     for (let i = 0; i < steps.length; i++) {
       const el = stepsEl.querySelector('[data-step="' + i + '"]');
       el.classList.add('active');
       await new Promise(r => setTimeout(r, 400));
       el.classList.remove('active');
       el.classList.add('done');
       el.querySelector('.step-ind').textContent = '\\u2713';
     }

     await new Promise(r => setTimeout(r, 300));
     overlay.classList.remove('active');
   }
};
""")

# ===== JS: Overview =====
w("js/components/overview.js", """
window.OverviewSection = {
   render(proposal) {
     return `
       <div class="section" id="section-overview">
         <div class="container-wide">
           <div class="overview-hero">
             <div class="hero-label">Design Proposal</div>
             <h1 class="hero-title">Design Proposal for Your Space</h1>
             <div class="hero-subtitle">${this._tagline(proposal)}</div>
             <div class="hero-conclusion">
               <span class="dot"></span>
               ${this._conclusion(proposal)}
             </div>
             <div class="project-info-grid">
               <div class="info-card"><div class="label">Project Type</div><div class="value">${proposal.projectType}</div></div>
               <div class="info-card"><div class="label">Area</div><div class="value">${proposal.area}</div></div>
               <div class="info-card"><div class="label">Style Direction</div><div class="value">${proposal.styleMix[0].name}</div></div>
               <div class="info-card"><div class="label">Budget Level</div><div class="value">${proposal.budgetLevel.charAt(0).toUpperCase() + proposal.budgetLevel.slice(1)}</div></div>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   _tagline(p) {
     const tags = { minimal: 'Where silence speaks louder than form', luxury: 'Where material becomes emotion', natural: 'Where nature writes the design' };
     return tags[p.stylePreference] || tags.luxury;
   },
   _conclusion(p) {
     const concs = { minimal: 'Pure Form with Natural Material System', luxury: 'Calm Luxury with Natural Material System', natural: 'Living Design with Organic Material System' };
     return concs[p.stylePreference] || concs.luxury;
   }
};
""")

# ===== JS: Style Direction =====
w("js/components/style-direction.js", """
window.StyleDirectionSection = {
   render(proposal) {
     const mix = proposal.styleMix;
     return `
       <div class="section" id="section-style">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">02 / Style Direction</div>
             <h2 class="section-title">Style DNA</h2>
             <p class="section-desc">A curated blend of influences that defines the spatial character</p>
           </div>
           <div class="style-mix-bar">
             ${mix.map(s => '<div class="style-mix-segment" style="flex:' + s.weight + ';background:' + s.bg + '">' + s.name + ' (' + s.weight + '%)</div>').join('')}
           </div>
           <div class="style-pillars">
             <div class="style-pillar">
               <div class="pillar-icon">\\u{1F3A8}</div>
               <div class="pillar-title">Visual Mood</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.spatialLogic.map(l => '<li>' + l + '</li>').join('')}
               </ul>
             </div>
             <div class="style-pillar">
               <div class="pillar-icon">\\u{1FA9A}</div>
               <div class="pillar-title">Material Direction</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.materials.map(m => '<li>' + m.name + '</li>').join('')}
               </ul>
             </div>
             <div class="style-pillar">
               <div class="pillar-icon">\\u{1F4A1}</div>
               <div class="pillar-title">Lighting Strategy</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.lighting.map(l => '<li>' + l.name + '</li>').join('')}
               </ul>
             </div>
           </div>
           <div class="mood-board">
             <div class="mood-board-item" style="background:linear-gradient(135deg,#E8E3DD,#D4CFC9)">${mix[0].name} Mood</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#9C9590,#8B8680)">Texture</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#8B7355,#6B5B4A)">Material</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#B5A48C,#9C9590)">Light</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#7A8B6F,#5C6B52)">${mix.length > 1 ? mix[1].name : 'Accent'}</div>
           </div>
         </div>
       </div>
     `;
   }
};
""")

# ===== JS: Design System =====
w("js/components/design-system.js", """
window.DesignSystemSection = {
   render(proposal) {
     const ds = proposal.designSystem;
     return `
       <div class="section" id="section-design-system">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">03 / Design System</div>
             <h2 class="section-title">Design Standard Book</h2>
             <p class="section-desc">The complete material, color, and lighting specification</p>
           </div>
           ${this._category('\\u{1FA9A}', 'Material System', ds.materials)}
           ${this._category('\\u{1F3A8}', 'Color System', ds.colors)}
           ${this._category('\\u{1F4A1}', 'Lighting System', ds.lighting)}
         </div>
       </div>
     `;
   },
   _category(icon, title, items) {
     return `
       <div class="ds-category">
         <div class="ds-category-header">
           <div class="ds-category-icon">${icon}</div>
           <div class="ds-category-title">${title}</div>
         </div>
         <div class="ds-grid">
           ${items.map(item => `
             <div class="ds-item">
               <div class="ds-item-swatch" style="background:${item.swatch}"></div>
               <div class="ds-item-name">${item.name}</div>
               <div class="ds-item-desc">${item.desc}</div>
               <div class="ds-item-tag">${item.tag}</div>
             </div>
           `).join('')}
         </div>
       </div>
     `;
   }
};
""")

# ===== JS: Space Strategy =====
w("js/components/space-strategy.js", """
window.SpaceStrategySection = {
   render(proposal) {
     return `
       <div class="section" id="section-space">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">04 / Space Strategy</div>
             <h2 class="section-title">Spatial Planning</h2>
             <p class="section-desc">Each space receives a tailored design strategy</p>
           </div>
           <div class="space-cards">
             ${proposal.spaces.map(sp => `
               <div class="space-card">
                 <div class="space-card-header">
                   <div class="space-card-icon">${sp.icon}</div>
                   <div>
                     <div class="space-card-title">${sp.title}</div>
                     <div class="space-card-subtitle">${sp.subtitle}</div>
                   </div>
                 </div>
                 <div class="space-card-details">
                   <div class="space-detail">
                     <div class="space-detail-label">Layout</div>
                     <div class="space-detail-value">${sp.layout}</div>
                   </div>
                   <div class="space-detail">
                     <div class="space-detail-label">Focus</div>
                     <div class="space-detail-value">${sp.focus}</div>
                   </div>
                   <div class="space-detail">
                     <div class="space-detail-label">Materials</div>
                     <div class="space-detail-value">${sp.materials}</div>
                   </div>
                 </div>
               </div>
             `).join('')}
           </div>
         </div>
       </div>
     `;
   }
};
""")

# ===== JS: Budget Layer =====
w("js/components/budget-layer.js", """
window.BudgetLayerSection = {
   render(proposal) {
     return `
       <div class="section" id="section-budget">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">05 / Budget Layer</div>
             <h2 class="section-title">Investment Tiers</h2>
             <p class="section-desc">Choose the level of refinement that matches your vision</p>
           </div>
           <div class="budget-tiers">
             ${proposal.budgetTiers.map(tier => `
               <div class="budget-tier ${tier.recommended ? 'recommended' : ''}" data-tier="${tier.id}">
                 <div class="tier-label">${tier.label}</div>
                 <div class="tier-name">${tier.name}</div>
                 <div class="tier-price">$${tier.price}K <span>estimated</span></div>
                 <ul class="tier-features">
                   ${tier.features.map(f => '<li><span class="check">\\u2713</span> ' + f + '</li>').join('')}
                 </ul>
                 <button class="btn-tier" data-tier-id="${tier.id}">Select Tier</button>
               </div>
             `).join('')}
           </div>
         </div>
       </div>
     `;
   },
   init() {
     document.querySelectorAll('.btn-tier').forEach(btn => {
       btn.addEventListener('click', (e) => {
         const tierId = e.target.dataset.tierId;
         window.AppState.selectedTier = tierId;
         document.querySelectorAll('.budget-tier').forEach(t => t.classList.remove('recommended'));
         e.target.closest('.budget-tier').classList.add('recommended');
         window.App.showToast('Selected ' + tierId + ' tier');
       });
     });
   }
};
""")

# ===== JS: References =====
w("js/components/references.js", """
window.ReferencesSection = {
   render(proposal) {
     return `
       <div class="section" id="section-references">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">06 / References</div>
             <h2 class="section-title">Visual References</h2>
             <p class="section-desc">Curated inspirations and AI rendering prompts</p>
           </div>
           <div class="ref-grid">
             ${proposal.references.map((ref, i) => {
               const gradients = [
                 'linear-gradient(135deg, #E8E3DD 0%, #D4CFC9 50%, #9C9590 100%)',
                 'linear-gradient(135deg, #D4CFC9 0%, #8B7355 50%, #6B5B4A 100%)',
                 'linear-gradient(135deg, #B5A48C 0%, #7A8B6F 50%, #5C6B52 100%)'
               ];
               return `
                 <div class="ref-card">
                   <div class="ref-card-image" style="background:${gradients[i % gradients.length]}">
                     ${ref.title}
                   </div>
                   <div class="ref-card-body">
                     <div class="ref-card-title">${ref.title}</div>
                     <div class="ref-card-desc">${ref.desc}</div>
                   </div>
                 </div>
               `;
             }).join('')}
           </div>
           <div class="ref-prompt-section">
             <div class="ref-prompt-title">AI Rendering Prompt</div>
             <div class="ref-prompt-code">${proposal.aiPrompt}</div>
           </div>
         </div>
       </div>
     `;
   }
};
""")

# ===== JS: Decision Panel =====
w("js/components/decision-panel.js", """
window.DecisionPanelSection = {
   render(proposal) {
     const s = window.AppState;
     return `
       <div class="section" id="section-decision">
         <div class="container-wide">
           <div class="decision-container">
             <div class="section-header" style="text-align:center;">
               <div class="section-label">07 / Decision</div>
               <h2 class="section-title">Your Decision</h2>
               <p class="section-desc" style="margin-left:auto;margin-right:auto;">Confirm your direction, fine-tune the system, and lock your design</p>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">Step 1</div>
               <div class="decision-step-title">Confirm Style Direction</div>
               <div class="decision-actions">
                 <button class="btn-decision primary ${s.styleAccepted ? 'selected' : ''}" id="acceptDirection">Accept Direction</button>
                 <button class="btn-decision ${!s.styleAccepted ? 'selected' : ''}" id="requestAdjust">Request Adjustment</button>
               </div>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">Step 2</div>
               <div class="decision-step-title">Fine-tune the System</div>
               <div class="slider-group">
                 <div class="slider-label"><span>More Luxury</span><span>More Natural</span></div>
                 <input type="range" class="slider-track" id="sliderLuxury" min="0" max="100" value="${s.sliders.luxury}">
               </div>
               <div class="slider-group">
                 <div class="slider-label"><span>More Minimal</span><span>More Expressive</span></div>
                 <input type="range" class="slider-track" id="sliderMinimal" min="0" max="100" value="${s.sliders.minimal}">
               </div>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">Step 3</div>
               <div class="decision-step-title">Lock Design Direction</div>
               <button class="btn-lock" id="lockDirection" ${s.decisionStatus === 'locked' ? 'disabled' : ''}>
                 ${s.decisionStatus === 'locked' ? '\\u{1F512} Direction Locked' : 'Lock Design Direction'}
               </button>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   init() {
     const acceptBtn = document.getElementById('acceptDirection');
     const adjustBtn = document.getElementById('requestAdjust');
     const lockBtn = document.getElementById('lockDirection');

     if (acceptBtn) acceptBtn.addEventListener('click', () => {
       window.AppState.styleAccepted = true;
       acceptBtn.classList.add('selected');
       adjustBtn.classList.remove('selected');
       window.App.showToast('Style direction accepted');
     });

     if (adjustBtn) adjustBtn.addEventListener('click', () => {
       window.AppState.styleAccepted = false;
       adjustBtn.classList.add('selected');
       acceptBtn.classList.remove('selected');
       window.App.showToast('Adjustment requested');
     });

     const sliderLuxury = document.getElementById('sliderLuxury');
     const sliderMinimal = document.getElementById('sliderMinimal');
     if (sliderLuxury) sliderLuxury.addEventListener('input', (e) => { window.AppState.sliders.luxury = parseInt(e.target.value); });
     if (sliderMinimal) sliderMinimal.addEventListener('input', (e) => { window.AppState.sliders.minimal = parseInt(e.target.value); });

     if (lockBtn && window.AppState.decisionStatus !== 'locked') {
       lockBtn.addEventListener('click', () => {
         window.AppState.decisionStatus = 'locked';
         document.getElementById('lockedOverlay').classList.add('active');
       });
     }
   }
};
""")

# ===== JS: Export =====
w("js/components/export.js", """
window.ExportPage = {
   render() {
     return `
       <div class="export-page">
         <div class="export-card">
           <div class="export-icon">\\u{1F4E6}</div>
           <div class="export-title">Export Proposal</div>
           <div class="export-desc">Choose your export format to share or archive the proposal</div>
           <div class="export-options">
             <div class="export-option" data-export="pdf">
               <div class="opt-icon">\\u{1F4C4}</div>
               <div class="opt-title">Proposal PDF</div>
               <div class="opt-desc">Print-ready document with all sections</div>
             </div>
             <div class="export-option" data-export="website">
               <div class="opt-icon">\\u{1F310}</div>
               <div class="opt-title">Proposal Website</div>
               <div class="opt-desc">Shareable link with interactive browsing</div>
             </div>
             <div class="export-option" data-export="prompts">
               <div class="opt-icon">\\u{1F9E0}</div>
               <div class="opt-title">AI Prompt Pack</div>
               <div class="opt-desc">Rendering prompts for Midjourney / DALL-E</div>
             </div>
             <div class="export-option" data-export="materials">
               <div class="opt-icon">\\u{1F4CA}</div>
               <div class="opt-title">Material List</div>
               <div class="opt-desc">Complete specification with quantities</div>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   init() {
     document.querySelectorAll('.export-option').forEach(opt => {
       opt.addEventListener('click', (e) => {
         const type = e.currentTarget.dataset.export;
         const labels = { pdf: 'PDF', website: 'Website', prompts: 'AI Prompt Pack', materials: 'Material List' };
         window.App.showToast('Preparing ' + labels[type] + ' export...');
         if (type === 'prompts') {
           setTimeout(() => {
             const p = window.AppState.proposal;
             if (p) {
               const blob = new Blob([p.aiPrompt], { type: 'text/plain' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url; a.download = 'ai-prompts.txt'; a.click();
               URL.revokeObjectURL(url);
             }
           }, 800);
         }
       });
     });
   }
};
""")

# ===== JS: App (main) =====
w("js/app.js", """
window.App = {
   render() {
     const app = document.getElementById('app');
     const page = window.AppState.currentPage;

     if (page === 'generate') {
       app.innerHTML = window.GeneratePage.render();
       window.GeneratePage.init();
       return;
     }

     const proposal = window.AppState.proposal;
     if (!proposal) { window.Router.navigate('generate'); return; }

     if (page === 'export') {
       app.innerHTML = this._renderShell('export');
       window.ExportPage.init();
       this._initShell();
       return;
     }

     // Proposal page
     app.innerHTML = this._renderShell('proposal');
     const content = document.getElementById('proposalSections');
     content.innerHTML =
       window.OverviewSection.render(proposal) +
       window.StyleDirectionSection.render(proposal) +
       window.DesignSystemSection.render(proposal) +
       window.SpaceStrategySection.render(proposal) +
       window.BudgetLayerSection.render(proposal) +
       window.ReferencesSection.render(proposal) +
       window.DecisionPanelSection.render(proposal);

     this._initShell();
     window.BudgetLayerSection.init();
     window.DecisionPanelSection.init();
     this._observeSections();
   },

   _renderShell(page) {
     const p = window.AppState.proposal;
     const navLinks = [
       { id: 'overview', label: 'Overview' },
       { id: 'style', label: 'Style' },
       { id: 'design-system', label: 'System' },
       { id: 'space', label: 'Spaces' },
       { id: 'budget', label: 'Budget' },
       { id: 'references', label: 'References' },
       { id: 'decision', label: 'Decision' }
     ];

     return `
       <div class="proposal-site">
         <nav class="proposal-nav" id="proposalNav">
           <div class="nav-inner">
             <div class="nav-brand">Proposal OS <span>v1</span></div>
             <div class="nav-links" id="navLinks">
               ${navLinks.map(l => '<div class="nav-link" data-section="section-' + l.id + '">' + l.label + '</div>').join('')}
             </div>
             <div class="nav-actions">
               <button class="btn-outline" id="btnNewProposal">New</button>
               <button class="btn-primary" id="btnExport">Export</button>
             </div>
             <button class="nav-hamburger" id="navHamburger">\\u2630</button>
           </div>
         </nav>
         <div class="proposal-content" id="proposalSections"></div>
       </div>
     `;
   },

   _initShell() {
     // Nav scroll links
     document.querySelectorAll('.nav-link').forEach(link => {
       link.addEventListener('click', (e) => {
         const sectionId = e.target.dataset.section;
         const el = document.getElementById(sectionId);
         if (el) el.scrollIntoView({ behavior: 'smooth' });
         document.getElementById('navLinks').classList.remove('open');
       });
     });

     // Nav active state on scroll
     const sections = document.querySelectorAll('.section');
     const navLinks = document.querySelectorAll('.nav-link');
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           navLinks.forEach(l => l.classList.remove('active'));
           const id = entry.target.id;
           const activeLink = document.querySelector('.nav-link[data-section="' + id + '"]');
           if (activeLink) activeLink.classList.add('active');
         }
       });
     }, { threshold: 0.3 });
     sections.forEach(s => observer.observe(s));

     // Nav hamburger
     const hamburger = document.getElementById('navHamburger');
     if (hamburger) hamburger.addEventListener('click', () => {
       document.getElementById('navLinks').classList.toggle('open');
     });

     // Top buttons
     const newBtn = document.getElementById('btnNewProposal');
     if (newBtn) newBtn.addEventListener('click', () => window.Router.navigate('generate'));
     const exportBtn = document.getElementById('btnExport');
     if (exportBtn) exportBtn.addEventListener('click', () => window.Router.navigate('export'));

     // Locked overlay close
     const lockedBtn = document.getElementById('lockedContinueBtn');
     if (lockedBtn) lockedBtn.addEventListener('click', () => {
       document.getElementById('lockedOverlay').classList.remove('active');
       window.Router.navigate('export');
     });
   },

   _observeSections() {
     const sections = document.querySelectorAll('.section');
     const obs = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) entry.target.classList.add('visible');
       });
     }, { threshold: 0.1 });
     sections.forEach(s => obs.observe(s));
   },

   showToast(msg) {
     const toast = document.getElementById('toast');
     toast.textContent = msg;
     toast.classList.add('show');
     setTimeout(() => toast.classList.remove('show'), 2500);
   }
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
   window.App.render();
});
""")

# ===== Server script =====
w("../serve.py", """import http.server, socketserver, os, webbrowser, threading

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))
PORT = 8080
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), handler) as httpd:
     url = "http://localhost:" + str(PORT)
     print("Design Proposal OS running at " + url)
     threading.Timer(1.0, lambda: webbrowser.open(url)).start()
     try:
         httpd.serve_forever()
     except KeyboardInterrupt:
         print("\\nServer stopped.")
""")

print("\\nAll files built! Run: python serve.py")
