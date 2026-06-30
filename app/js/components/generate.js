window.GeneratePage = {
   render() {
     return `
       <div class="generate-page">
         <div class="generate-card">
           <div class="brand">
             <div class="brand-label">设计提案 OS</div>
             <div class="brand-title">提案生成器</div>
             <div class="brand-sub">输入项目信息，生成完整设计提案网站</div>
           </div>
           <div class="form-group">
             <label class="form-label">项目描述</label>
             <textarea class="form-input" id="projectDesc" placeholder="三居豪华公寓，宁静，现代，天然材质">三居豪华公寓，宁静，现代，天然材质</textarea>
           </div>
           <div class="form-row">
             <div class="form-group">
               <label class="form-label">预算</label>
               <select class="form-select" id="budgetLevel">
                 <option value="low">低</option>
                 <option value="mid" selected>中</option>
                 <option value="high">高</option>
               </select>
             </div>
             <div class="form-group">
               <label class="form-label">风格偏好</label>
               <select class="form-select" id="stylePref">
                 <option value="minimal">极简</option>
                 <option value="luxury" selected>轻奢</option>
                 <option value="natural">自然</option>
               </select>
             </div>
           </div>
           <div class="form-group">
             <label class="form-label">地区</label>
             <select class="form-select" id="regionSelect">
               <option value="local">国内</option>
               <option value="international">海外</option>
             </select>
           </div>
           <button class="btn-generate" id="generateBtn">生成提案</button>
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
       '分析项目需求',
       '匹配风格方向',
       '生成设计体系',
       '构建空间策略',
       '创建预算结构',
       '整理参考资料'
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
       el.querySelector('.step-ind').textContent = '\u2713';
     }

     await new Promise(r => setTimeout(r, 300));
     overlay.classList.remove('active');
   }
};
