window.StyleDirectionSection = {
   render(proposal) {
     const mix = proposal.styleMix;
     return `
       <div class="section" id="section-style">
         <div class="container-wide">
           <div class="section-header">
             <div class="section-label">02 / 风格方向</div>
             <h2 class="section-title">风格基因</h2>
             <p class="section-desc">定义空间气质的精选风格融合</p>
           </div>
           <div class="style-mix-bar">
             ${mix.map(s => '<div class="style-mix-segment" style="flex:' + s.weight + ';background:' + s.bg + '">' + s.name + ' (' + s.weight + '%)</div>').join('')}
           </div>
           <div class="style-pillars">
             <div class="style-pillar">
               <div class="pillar-icon">🎨</div>
               <div class="pillar-title">视觉氛围</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.spatialLogic.map(l => '<li>' + l + '</li>').join('')}
               </ul>
             </div>
             <div class="style-pillar">
               <div class="pillar-icon">🪚</div>
               <div class="pillar-title">材质方向</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.materials.map(m => '<li>' + m.name + '</li>').join('')}
               </ul>
             </div>
             <div class="style-pillar">
               <div class="pillar-icon">💡</div>
               <div class="pillar-title">灯光策略</div>
               <ul class="pillar-items">
                 ${proposal.designSystem.lighting.map(l => '<li>' + l.name + '</li>').join('')}
               </ul>
             </div>
           </div>
           <div class="mood-board">
             <div class="mood-board-item" style="background:linear-gradient(135deg,#E8E3DD,#D4CFC9)" data-mood-img="0">${mix[0].name} 氛围</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#9C9590,#8B8680)" data-mood-img="1">纹理</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#8B7355,#6B5B4A)" data-mood-img="2">材质</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#B5A48C,#9C9590)" data-mood-img="3">光影</div>
             <div class="mood-board-item" style="background:linear-gradient(135deg,#7A8B6F,#5C6B52)" data-mood-img="4">${mix.length > 1 ? mix[1].name : '点缀'}</div>
           </div>
           <div style="margin-top:var(--space-lg);text-align:center;">
             <div class="img-upload-zone" id="moodImageUpload" style="max-width:400px;margin:0 auto;">
               <input type="file" accept="image/*" multiple>
               <div class="upload-icon">🖼️</div>
               <div class="upload-text">上传氛围板插图</div>
               <div class="upload-hint">支持多张 JPG/PNG</div>
             </div>
           </div>
         </div>
       </div>
     `;
   },
   init() {
     // Upload zones on mood board items
     document.querySelectorAll('.mood-board-item[data-mood-img]').forEach(el => {
       const zone = window.ImageUpload.createZone(el, '替换插图');
       el.appendChild(zone);
     });
     // Multi-file upload for mood board
     const moodUpload = document.getElementById('moodImageUpload');
     if (moodUpload) {
       const fileInput = moodUpload.querySelector('input[type="file"]');
       fileInput.addEventListener('change', () => {
         const files = fileInput.files;
         if (!files.length) return;
         const moodItems = document.querySelectorAll('.mood-board-item[data-mood-img]');
         for (let i = 0; i < Math.min(files.length, moodItems.length); i++) {
           const reader = new FileReader();
           const item = moodItems[i];
           reader.onload = (function(target) {
             return function(e) {
               const img = document.createElement('img');
               img.src = e.target.result;
               img.className = 'uploaded-img';
               target.innerHTML = '';
               target.appendChild(img);
             };
           })(item);
           reader.readAsDataURL(files[i]);
         }
       });
     }
   }
};
