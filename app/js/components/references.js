window.ReferencesSection = {
   render(proposal) {
     return `
       <div class="section" id="section-references">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">06 / 参考资料</div>
             <h2 class="section-title">视觉参考</h2>
             <p class="section-desc">精选灵感与 AI 渲染提示词</p>
           </div>
           <div class="ref-grid">
             ${proposal.references.map((ref, i) => {
               const gradients = [
                 'linear-gradient(135deg, #E8E3DD 0%, #D4CFC9 50%, #9C9590 100%)',
                 'linear-gradient(135deg, #D4CFC9 0%, #8B7355 50%, #6B5B4A 100%)',
                 'linear-gradient(135deg, #B5A48C 0%, #7A8B6F 50%, #5C6B52 100%)'
               ];
               return `
                 <div class="ref-card">
                   <div class="ref-card-image" style="background:${gradients[i % gradients.length]}" data-ref-img="${i}">
                     ${ref.title}
                   </div>
                   <div class="ref-card-body">
                     <div class="ref-card-title">${ref.title}</div>
                     <div class="ref-card-desc">${ref.desc}</div>
                   </div>
                 </div>
               `;
             }).join('')}
           </div>
           <div style="margin-top:var(--space-xl);text-align:center;">
             <div class="img-upload-zone" id="refImageUpload" style="max-width:400px;margin:0 auto;">
               <input type="file" accept="image/*">
               <div class="upload-icon">📷</div>
               <div class="upload-text">点击上传参考图</div>
               <div class="upload-hint">支持 JPG/PNG，用于补充视觉参考</div>
             </div>
           </div>
           <div class="ref-prompt-section">
             <div class="ref-prompt-title">AI 渲染提示词</div>
             <div class="ref-prompt-code">${proposal.aiPrompt}</div>
           </div>
         </div>
       </div>
     `;
   },
   init() {
     const uploadZone = document.getElementById('refImageUpload');
     if (uploadZone) {
       const fileInput = uploadZone.querySelector('input[type="file"]');
       fileInput.addEventListener('change', () => {
         window.ImageUpload.handleFile(fileInput, uploadZone);
       });
     }
     document.querySelectorAll('.ref-card-image[data-ref-img]').forEach(el => {
       const zone = window.ImageUpload.createZone(el, '替换参考图');
       el.appendChild(zone);
     });
   }
};
