window.BudgetLayerSection = {
  render(proposal) {
    return `
      <section class="section" id="section-budget">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">预算层级</div>
              <div class="section-label-en">Budget Layer</div>
            </div>
            <div>
              <h2 class="section-title">用精度区分投入，而不是只报总价</h2>
              <p class="section-desc">新版预算区改成更有展示感的三栏卡片，让推荐档更醒目，也更适合客户快速理解“多花的钱，具体换来了什么”。</p>
            </div>
          </div>
          <div class="budget-tiers">
            ${proposal.budgetTiers.map(tier => `
              <div class="budget-tier ${tier.recommended ? 'recommended' : ''}" data-tier="${tier.id}">
                <div class="tier-label">${tier.label}</div>
                <div class="tier-name">${tier.name}</div>
                <div class="tier-price">$${tier.price}K <span>预估区间</span></div>
                <ul class="tier-features">
                  ${tier.features.map(feature => `<li><span class="check">✓</span>${feature}</li>`).join('')}
                </ul>
                <button class="btn-tier" data-tier-id="${tier.id}">选择这档方案</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  init() {
    document.querySelectorAll('.btn-tier').forEach(btn => {
      btn.addEventListener('click', event => {
        const tierId = event.currentTarget.dataset.tierId;
        window.AppState.selectedTier = tierId;
        document.querySelectorAll('.budget-tier').forEach(card => card.classList.remove('recommended'));
        event.currentTarget.closest('.budget-tier').classList.add('recommended');
        window.App.showToast('已切换到 ' + tierId + ' 档方案');
      });
    });
  }
};
