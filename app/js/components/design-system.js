window.DesignSystemSection = {
  render(proposal) {
    const ds = proposal.designSystem;
    return `
      <section class="section" id="section-design-system">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">设计体系</div>
              <div class="section-label-en">Design System</div>
            </div>
            <div>
              <h2 class="section-title">把材料语言讲成系统</h2>
              <p class="section-desc">这一段延续新 UI 的杂志语气，把材质、色彩和灯光做成陈列式信息卡，不再像后台表格，而像高端方案册里的规范页。</p>
            </div>
          </div>
          ${this._category('◼', '材质体系', ds.materials)}
          ${this._category('◐', '色彩体系', ds.colors)}
          ${this._category('◎', '灯光体系', ds.lighting)}
        </div>
      </section>
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
