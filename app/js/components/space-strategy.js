window.SpaceStrategySection = {
   render(proposal) {
     return `
       <div class="section" id="section-space">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">04 / 空间策略</div>
             <h2 class="section-title">空间规划</h2>
             <p class="section-desc">每个空间都有量身定制的设计策略</p>
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
                     <div class="space-detail-label">布局</div>
                     <div class="space-detail-value">${sp.layout}</div>
                   </div>
                   <div class="space-detail">
                     <div class="space-detail-label">焦点</div>
                     <div class="space-detail-value">${sp.focus}</div>
                   </div>
                   <div class="space-detail">
                     <div class="space-detail-label">材质</div>
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
