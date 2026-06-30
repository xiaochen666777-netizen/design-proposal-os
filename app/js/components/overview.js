window.OverviewSection = {
   render(proposal) {
     const budgetLabels = { low: '低', mid: '中', high: '高' };
     return `
       <div class="section" id="section-overview">
         <div class="container-wide">
           <div class="overview-hero">
             <div class="hero-label">设计提案</div>
             <h1 class="hero-title">为您空间定制的设计提案</h1>
             <div class="hero-subtitle">${this._tagline(proposal)}</div>
             <div class="hero-conclusion">
               <span class="dot"></span>
               ${this._conclusion(proposal)}
             </div>
             <div class="project-info-grid">
               <div class="info-card"><div class="label">项目类型</div><div class="value">${proposal.projectType}</div></div>
               <div class="info-card"><div class="label">面积</div><div class="value">${proposal.area}</div></div>
               <div class="info-card"><div class="label">风格方向</div><div class="value">${proposal.styleMix[0].name}</div></div>
               <div class="info-card"><div class="label">预算级别</div><div class="value">${budgetLabels[proposal.budgetLevel] || proposal.budgetLevel}</div></div>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   _tagline(p) {
     const tags = { minimal: '无声之处，形式自显', luxury: '材质化为情感', natural: '自然书写设计' };
     return tags[p.stylePreference] || tags.luxury;
   },
   _conclusion(p) {
     const concs = { minimal: '纯粹形态与天然材质体系', luxury: '宁静奢华与天然材质体系', natural: '有机设计与天然材质体系' };
     return concs[p.stylePreference] || concs.luxury;
   }
};
