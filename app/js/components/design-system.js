window.DesignSystemSection = {
   render(proposal) {
     const ds = proposal.designSystem;
     return `
       <div class="section" id="section-design-system">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">03 / 设计体系</div>
             <h2 class="section-title">设计规范手册</h2>
             <p class="section-desc">完整的材质、色彩与灯光规格</p>
           </div>
           ${this._category('\u{1FA9A}', '材质体系', ds.materials)}
           ${this._category('\u{1F3A8}', '色彩体系', ds.colors)}
           ${this._category('\u{1F4A1}', '灯光体系', ds.lighting)}
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
