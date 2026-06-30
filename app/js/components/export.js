window.ExportPage = {
   render() {
     return `
       <div class="export-page">
         <div class="export-card">
           <div class="export-icon">📦</div>
           <div class="export-title">导出提案</div>
           <div class="export-desc">选择导出格式，分享或存档您的提案</div>
           <div class="export-options">
             <div class="export-option" data-export="pdf">
               <div class="opt-icon">📄</div>
               <div class="opt-title">提案 PDF</div>
               <div class="opt-desc">包含所有章节的打印文档</div>
             </div>
             <div class="export-option" data-export="website">
               <div class="opt-icon">🌐</div>
               <div class="opt-title">提案网页</div>
               <div class="opt-desc">可交互浏览的分享链接</div>
             </div>
             <div class="export-option" data-export="prompts">
               <div class="opt-icon">🧠</div>
               <div class="opt-title">AI 提示词包</div>
               <div class="opt-desc">适用于 Midjourney / DALL-E 的渲染提示词</div>
             </div>
             <div class="export-option" data-export="materials">
               <div class="opt-icon">📊</div>
               <div class="opt-title">材料清单</div>
               <div class="opt-desc">含用量的完整规格表</div>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   init() {
     document.querySelectorAll('.export-option').forEach(opt => {
       opt.addEventListener('click', (e) => {
         const type = e.currentTarget.dataset.export;
         const labels = { pdf: 'PDF', website: '网页', prompts: 'AI 提示词包', materials: '材料清单' };
         window.App.showToast('正在准备 ' + labels[type] + ' 导出...');
         if (type === 'prompts') {
           setTimeout(() => {
             const p = window.AppState.proposal;
             if (p) {
               const blob = new Blob([p.aiPrompt], { type: 'text/plain' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url; a.download = 'ai-prompts.txt'; a.click();
               URL.revokeObjectURL(url);
             }
           }, 800);
         } else if (type === 'website') {
           setTimeout(() => {
             const shareUrl = window.App._getShareUrl();
             if (navigator.share) {
               navigator.share({ title: '设计提案', url: shareUrl }).catch(() => {});
             } else {
               navigator.clipboard.writeText(shareUrl).then(() => {
                 window.App.showToast('分享链接已复制');
               });
             }
           }, 800);
         } else if (type === 'materials') {
           setTimeout(() => {
             const p = window.AppState.proposal;
             if (p) {
               const lines = ['材料清单', '========', ''];
               p.designSystem.materials.forEach(m => {
                 lines.push(m.name + ' - ' + m.desc + ' [' + m.tag + ']');
               });
               lines.push('');
               lines.push('色彩方案');
               p.designSystem.colors.forEach(c => {
                 lines.push(c.name + ' - ' + c.desc + ' [' + c.tag + '] ' + c.swatch);
               });
               const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url; a.download = 'materials.txt'; a.click();
               URL.revokeObjectURL(url);
             }
           }, 800);
         }
       });
     });
   }
};
