window.BudgetLayerSection = {
   render(proposal) {
     return `
       <div class="section" id="section-budget">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">05 / 预算层级</div>
             <h2 class="section-title">投资方案</h2>
             <p class="section-desc">选择与您愿景匹配的精细度级别</p>
           </div>
           <div class="budget-tiers">
             ${proposal.budgetTiers.map(tier => `
               <div class="budget-tier ${tier.recommended ? 'recommended' : ''}" data-tier="${tier.id}">
                 <div class="tier-label">${tier.label}</div>
                 <div class="tier-name">${tier.name}</div>
                 <div class="tier-price">$${tier.price}K <span>预估</span></div>
                 <ul class="tier-features">
                   ${tier.features.map(f => '<li><span class="check">\u2713</span> ' + f + '</li>').join('')}
                 </ul>
                 <button class="btn-tier" data-tier-id="${tier.id}">选择方案</button>
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
         window.App.showToast('已选择 ' + tierId + ' 方案');
       });
     });
   }
};
