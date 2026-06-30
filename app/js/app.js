window.App = {
   render() {
     const app = document.getElementById('app');
     const page = window.AppState.currentPage;

     if (page === 'generate') {
       app.innerHTML = window.GeneratePage.render();
       window.GeneratePage.init();
       this._hideProposalNav();
       this._hideMobileNav();
       return;
     }

     const proposal = window.AppState.proposal;
     if (!proposal) { window.Router.navigate('generate'); return; }

     if (page === 'export') {
       app.innerHTML = this._renderShell('export');
       window.ExportPage.init();
       this._initShell();
       this._showProposalNav();
       this._hideMobileNav();
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
     window.StyleDirectionSection.init();
     window.StyleDirectionSection.init();
     window.BudgetLayerSection.init();
     window.DecisionPanelSection.init();
     window.ReferencesSection.init();
     window.ReferencesSection.init();
     this._observeSections();
     this._showProposalNav();
     this._showMobileNav();
   },

   _renderShell(page) {
     const p = window.AppState.proposal;
     const navLinks = [
       { id: 'overview', label: '\u6982\u89c8' },
       { id: 'style', label: '\u98ce\u683c' },
       { id: 'design-system', label: '\u4f53\u7cfb' },
       { id: 'space', label: '\u7a7a\u95f4' },
       { id: 'budget', label: '\u9884\u7b97' },
       { id: 'references', label: '\u53c2\u8003' },
       { id: 'decision', label: '\u51b3\u7b56' }
     ];

     return `
       <div class="proposal-site">
         <nav class="proposal-nav" id="proposalNav">
           <div class="nav-inner">
             <div class="nav-brand">\u63d0\u6848 OS <span>v1</span></div>
             <div class="nav-links" id="navLinks">
               ${navLinks.map(l => '<div class="nav-link" data-section="section-' + l.id + '">' + l.label + '</div>').join('')}
             </div>
             <div class="nav-actions">
               <button class="btn-outline" id="btnNewProposal">\u65b0\u5efa</button>
               <button class="btn-primary" id="btnExport">\u5bfc\u51fa</button>
             </div>
             <button class="nav-hamburger" id="navHamburger" aria-label="\u83dc\u5355">\u2630</button>
           </div>
         </nav>
         <div class="proposal-content" id="proposalSections"></div>
       </div>
     `;
   },

   _initShell() {
     document.querySelectorAll('.nav-link').forEach(link => {
       link.addEventListener('click', (e) => {
         const sectionId = e.target.dataset.section;
         const el = document.getElementById(sectionId);
         if (el) el.scrollIntoView({ behavior: 'smooth' });
         document.getElementById('navLinks').classList.remove('open');
       });
     });

     const sections = document.querySelectorAll('.section');
     const navLinks = document.querySelectorAll('.nav-link');
     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           navLinks.forEach(l => l.classList.remove('active'));
           const id = entry.target.id;
           const activeLink = document.querySelector('.nav-link[data-section="' + id + '"]');
           if (activeLink) activeLink.classList.add('active');
           const mobileItem = document.querySelector('.mobile-bottom-nav-item[data-section="' + id + '"]');
           if (mobileItem) {
             document.querySelectorAll('.mobile-bottom-nav-item').forEach(i => i.classList.remove('active'));
             mobileItem.classList.add('active');
           }
         }
       });
     }, { threshold: 0.3 });
     sections.forEach(s => observer.observe(s));

     const hamburger = document.getElementById('navHamburger');
     if (hamburger) hamburger.addEventListener('click', () => {
       document.getElementById('navLinks').classList.toggle('open');
     });

     const newBtn = document.getElementById('btnNewProposal');
     if (newBtn) newBtn.addEventListener('click', () => window.Router.navigate('generate'));
     const exportBtn = document.getElementById('btnExport');
     if (exportBtn) exportBtn.addEventListener('click', () => window.Router.navigate('export'));

     const lockedBtn = document.getElementById('lockedContinueBtn');
     if (lockedBtn) lockedBtn.addEventListener('click', () => {
       document.getElementById('lockedOverlay').classList.remove('active');
       window.Router.navigate('export');
     });

     this._initMobileNav();
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

   _showProposalNav() {
     const shareBar = document.getElementById('shareBar');
     if (shareBar) shareBar.classList.add('visible');
     this._initShareBar();
   },

   _hideProposalNav() {
     const shareBar = document.getElementById('shareBar');
     if (shareBar) shareBar.classList.remove('visible');
   },

   _initShareBar() {
     const shareUrl = document.getElementById('shareUrl');
     const copyBtn = document.getElementById('shareCopyBtn');
     const qrBtn = document.getElementById('shareQrBtn');
     const nativeBtn = document.getElementById('shareNativeBtn');
     const qrModal = document.getElementById('qrModal');
     const qrModalClose = document.getElementById('qrModalClose');
     const qrCanvas = document.getElementById('qrCanvas');
     const networkHint = document.getElementById('shareNetworkHint');
     const qrNetworkUrl = document.getElementById('qrNetworkUrl');

     const shareUrlValue = this._getShareUrl();
     if (shareUrl) shareUrl.textContent = shareUrlValue;
     if (networkHint) {
       if (shareUrlValue !== window.location.href) {
         networkHint.textContent = '\u5c40\u57df\u7f51\u5730\u5740\uff0c\u540c\u7f51\u7edc\u53ef\u8bbf\u95ee';
       }
     }

     if (copyBtn && !copyBtn._bound) {
       copyBtn._bound = true;
       copyBtn.addEventListener('click', () => {
         navigator.clipboard.writeText(shareUrlValue).then(() => {
           copyBtn.textContent = '\u5df2\u590d\u5236!';
           setTimeout(() => { copyBtn.textContent = '\u590d\u5236\u94fe\u63a5'; }, 2000);
         }).catch(() => {
           const ta = document.createElement('textarea');
           ta.value = shareUrlValue;
           document.body.appendChild(ta);
           ta.select();
           document.execCommand('copy');
           document.body.removeChild(ta);
           copyBtn.textContent = '\u5df2\u590d\u5236!';
           setTimeout(() => { copyBtn.textContent = '\u590d\u5236\u94fe\u63a5'; }, 2000);
         });
       });
     }

     if (qrBtn && !qrBtn._bound) {
       qrBtn._bound = true;
       qrBtn.addEventListener('click', () => {
         if (qrCanvas) {
           qrCanvas.innerHTML = '';
           new QRCode(qrCanvas, { text: shareUrlValue, width: 200, height: 200, colorDark: '#2C2926', colorLight: '#FFFFFF' });
         }
         if (qrNetworkUrl) qrNetworkUrl.textContent = shareUrlValue;
         if (qrModal) qrModal.classList.add('active');
       });
     }

     if (qrModalClose && !qrModalClose._bound) {
       qrModalClose._bound = true;
       qrModalClose.addEventListener('click', () => {
         if (qrModal) qrModal.classList.remove('active');
       });
     }

     if (qrModal && !qrModal._bound) {
       qrModal._bound = true;
       qrModal.addEventListener('click', (e) => {
         if (e.target === qrModal) qrModal.classList.remove('active');
       });
     }

     if (nativeBtn && !nativeBtn._bound) {
       nativeBtn._bound = true;
       nativeBtn.addEventListener('click', () => {
         if (navigator.share) {
           navigator.share({ title: '\u8bbe\u8ba1\u63d0\u6848', text: '\u67e5\u770b\u6211\u7684\u8bbe\u8ba1\u63d0\u6848', url: shareUrlValue }).catch(() => {});
         }
       });
     }
   },

   _getShareUrl() {
     const href = window.location.href;
     if (href.includes('localhost') || href.includes('127.0.0.1')) {
       const interfaces = window._localIPs || [];
       if (interfaces.length > 0) {
         return href.replace(/localhost|127\.0\.0\.1/, interfaces[0]);
       }
     }
     return href;
   },

   _initMobileNav() {
     const navItems = document.getElementById('mobileNavItems');
     if (!navItems || navItems._initialized) return;
     navItems._initialized = true;

     const items = [
       { id: 'section-overview', label: '\u6982\u89c8', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
       { id: 'section-style', label: '\u98ce\u683c', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>' },
       { id: 'section-design-system', label: '\u4f53\u7cfb', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>' },
       { id: 'section-space', label: '\u7a7a\u95f4', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' },
       { id: 'section-budget', label: '\u9884\u7b97', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
       { id: 'section-references', label: '\u53c2\u8003', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
       { id: 'section-decision', label: '\u51b3\u7b56', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' }
     ];

     navItems.innerHTML = items.map(item =>
       '<button class="mobile-bottom-nav-item" data-section="' + item.id + '">' + item.icon + '<span>' + item.label + '</span></button>'
     ).join('');

     navItems.addEventListener('click', (e) => {
       const btn = e.target.closest('.mobile-bottom-nav-item');
       if (!btn) return;
       const sectionId = btn.dataset.section;
       const el = document.getElementById(sectionId);
       if (el) el.scrollIntoView({ behavior: 'smooth' });
     });
   },

   _showMobileNav() {
     const nav = document.getElementById('mobileBottomNav');
     if (nav) nav.style.display = '';
   },

   _hideMobileNav() {
     const nav = document.getElementById('mobileBottomNav');
     if (nav && window.innerWidth <= 768) nav.style.display = 'none';
   },

   showToast(msg) {
     const toast = document.getElementById('toast');
     toast.textContent = msg;
     toast.classList.add('show');
     setTimeout(() => toast.classList.remove('show'), 2500);
   }
};

// Detect local IP for LAN sharing
window._localIPs = [];
(function() {
   try {
     const pc = new RTCPeerConnection({ iceServers: [] });
     pc.createDataChannel('');
     pc.createOffer().then(d => pc.setLocalDescription(d));
     pc.onicecandidate = function(e) {
       if (!e.candidate) return;
       const m = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
       if (m && !m[1].startsWith('0.') && m[1] !== '127.0.0.1') {
         if (window._localIPs.indexOf(m[1]) === -1) window._localIPs.push(m[1]);
       }
     };
   } catch(e) {}
})();

// Image upload helper
window.ImageUpload = {
   handleFile(inputEl, targetEl) {
     const file = inputEl.files[0];
     if (!file) return;
     const reader = new FileReader();
     reader.onload = function(e) {
       const img = document.createElement('img');
       img.src = e.target.result;
       img.className = 'uploaded-img';
       targetEl.innerHTML = '';
       targetEl.appendChild(img);
       targetEl.classList.add('has-image');
     };
     reader.readAsDataURL(file);
   },
   createZone(targetEl, hintText) {
     const zone = document.createElement('div');
     zone.className = 'img-upload-zone';
     zone.innerHTML = '<input type="file" accept="image/*"><div class="upload-icon">\u{1F4F7}</div><div class="upload-text">\u70b9\u51fb\u4e0a\u4f20\u56fe\u7247</div><div class="upload-hint">' + (hintText || '\u652f\u6301 JPG/PNG') + '</div>';
     const fileInput = zone.querySelector('input[type="file"]');
     fileInput.addEventListener('change', () => this.handleFile(fileInput, targetEl));
     return zone;
   }
};

document.addEventListener('DOMContentLoaded', () => {
   window.App.render();
});
