window.DecisionPanelSection = {
   render(proposal) {
     const s = window.AppState;
     return `
       <div class="section" id="section-decision">
         <div class="container-wide">
           <div class="decision-container">
             <div class="section-header" style="text-align:center;">
               <div class="section-label">07 / 决策</div>
               <h2 class="section-title">您的决策</h2>
               <p class="section-desc" style="margin-left:auto;margin-right:auto;">确认方向，微调体系，锁定设计</p>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">第 1 步</div>
               <div class="decision-step-title">确认风格方向</div>
               <div class="decision-actions">
                 <button class="btn-decision primary ${s.styleAccepted ? 'selected' : ''}" id="acceptDirection">接受方向</button>
                 <button class="btn-decision ${!s.styleAccepted ? 'selected' : ''}" id="requestAdjust">需要调整</button>
               </div>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">第 2 步</div>
               <div class="decision-step-title">微调体系</div>
               <div class="slider-group">
                 <div class="slider-label"><span>更奢华</span><span>更自然</span></div>
                 <input type="range" class="slider-track" id="sliderLuxury" min="0" max="100" value="${s.sliders.luxury}">
               </div>
               <div class="slider-group">
                 <div class="slider-label"><span>更极简</span><span>更表现</span></div>
                 <input type="range" class="slider-track" id="sliderMinimal" min="0" max="100" value="${s.sliders.minimal}">
               </div>
             </div>
             <div class="decision-step">
               <div class="decision-step-number">第 3 步</div>
               <div class="decision-step-title">锁定设计方向</div>
               <button class="btn-lock" id="lockDirection" ${s.decisionStatus === 'locked' ? 'disabled' : ''}>
                 ${s.decisionStatus === 'locked' ? '\u{1F512} 方向已锁定' : '锁定设计方向'}
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
       window.App.showToast('风格方向已确认');
     });

     if (adjustBtn) adjustBtn.addEventListener('click', () => {
       window.AppState.styleAccepted = false;
       adjustBtn.classList.add('selected');
       acceptBtn.classList.remove('selected');
       window.App.showToast('已请求调整');
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
