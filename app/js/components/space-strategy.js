window.SpaceStrategySection = {
  render(proposal) {
    return `
      <section class="section" id="section-space">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">空间策略</div>
              <div class="section-label-en">Spatial Plan</div>
            </div>
            <div>
              <h2 class="section-title">关键空间分开陈述</h2>
              <p class="section-desc">每个空间都给出布局、视觉焦点和材质落点，适合在客户沟通时直接逐张解释，也便于后续继续补图或加更多空间页。</p>
            </div>
          </div>
          <div class="space-cards">
            ${proposal.spaces.map(space => `
              <div class="space-card">
                <div class="space-card-header">
                  <div class="space-card-icon">${space.icon}</div>
                  <div>
                    <div class="space-card-title">${space.title}</div>
                    <div class="space-card-subtitle">${space.subtitle}</div>
                  </div>
                </div>
                <div class="space-card-details">
                  <div class="space-detail">
                    <div class="space-detail-label">布局逻辑</div>
                    <div class="space-detail-value">${space.layout}</div>
                  </div>
                  <div class="space-detail">
                    <div class="space-detail-label">主视觉焦点</div>
                    <div class="space-detail-value">${space.focus}</div>
                  </div>
                  <div class="space-detail">
                    <div class="space-detail-label">材质主线</div>
                    <div class="space-detail-value">${space.materials}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
};
