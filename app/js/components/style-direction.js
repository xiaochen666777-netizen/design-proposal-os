window.StyleDirectionSection = {
  render(proposal) {
    const mix = proposal.styleMix;
    const moods = this._moodCards(proposal.stylePreference, mix);

    return `
      <section class="section" id="section-style">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">风格方向</div>
              <div class="section-label-en">Style Direction</div>
            </div>
            <div>
              <h2 class="section-title">把感受先说清楚</h2>
              <p class="section-desc">这一段不再只是列出风格关键词，而是用更像视觉提案的方式，把画面气质、材料倾向和空间情绪拆成可以快速沟通的模块。</p>
            </div>
          </div>

          <div class="style-summary">
            <div class="style-intro">
              <div class="eyebrow">Primary Blend</div>
              <div class="style-headline">${mix[0].name}${mix[1] ? ` / ${mix[1].name}` : ''}</div>
              <p>${proposal.mood} 是本案的核心氛围，强调 ${proposal.designSystem.spatialLogic.slice(0, 2).join('、')}，并通过更克制的图文信息层次，让客户第一眼就理解方向。</p>
              <div class="style-mix-bar">
                ${mix.map(item => `<div class="style-mix-segment" style="flex:${item.weight};background:${item.bg}">${item.name} ${item.weight}%</div>`).join('')}
              </div>
            </div>
            <div class="style-metrics">
              <div class="eyebrow">Reading Lens</div>
              <p>你给的参考图核心不是“装饰”，而是“版式上的安静感”。所以这里把信息节奏也设计成杂志页：先大图，再短语，再补充解释。</p>
              <div class="style-metrics-grid">
                <div class="style-metric"><strong>01</strong><span>双语标题更像提案版头</span></div>
                <div class="style-metric"><strong>02</strong><span>黑白灰石材形成主记忆点</span></div>
                <div class="style-metric"><strong>03</strong><span>上传后可直接替换整组插图</span></div>
                <div class="style-metric"><strong>04</strong><span>适合后端继续做一键换图</span></div>
              </div>
            </div>
          </div>

          <div class="style-pillars">
            <div class="style-pillar">
              <div class="pillar-icon">◼</div>
              <div class="pillar-title">视觉气质</div>
              <ul class="pillar-items">
                ${proposal.designSystem.spatialLogic.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="style-pillar">
              <div class="pillar-icon">◐</div>
              <div class="pillar-title">材质重心</div>
              <ul class="pillar-items">
                ${proposal.designSystem.materials.map(item => `<li>${item.name}</li>`).join('')}
              </ul>
            </div>
            <div class="style-pillar">
              <div class="pillar-icon">◎</div>
              <div class="pillar-title">光影策略</div>
              <ul class="pillar-items">
                ${proposal.designSystem.lighting.map(item => `<li>${item.name}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="mood-board">
            ${moods.map(item => `
              <div class="mood-board-item" style="--tile-gradient:${item.gradient}" data-slot="${item.slot}">
                <div class="media-slot-copy">
                  <strong>${item.en}</strong>
                  <span>${item.cn}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="batch-upload-card">
            <div class="eyebrow">Batch Replace</div>
            <div class="style-headline" style="font-size:2rem;">批量替换这组氛围图</div>
            <p>这里保留了成组槽位。你后端后续如果做一键换图，只需要按槽位顺序写入即可，不用改布局结构。</p>
            <div class="img-upload-zone" id="moodImageUpload" style="position:relative;inset:auto;opacity:1;transform:none;margin-top:14px;">
              <input type="file" accept="image/*" multiple>
              <div class="upload-icon">⌂</div>
              <div class="upload-text">上传整组氛围图</div>
              <div class="upload-hint">按顺序填充 Mood 1-5</div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    window.MediaSlots.enhanceAll('[data-slot]');

    const moodUpload = document.getElementById('moodImageUpload');
    if (!moodUpload) return;

    const fileInput = moodUpload.querySelector('input[type="file"]');
    fileInput.addEventListener('change', () => {
      const slots = ['mood-1', 'mood-2', 'mood-3', 'mood-4', 'mood-5'];
      window.MediaSlots.fillMany(slots, fileInput.files);
    });
  },

  _moodCards(style, mix) {
    const base = {
      minimal: [
        { slot: 'mood-1', en: 'BALANCE', cn: '平衡', gradient: 'linear-gradient(135deg, #dfdad3, #2f2f2f)' },
        { slot: 'mood-2', en: 'STONE', cn: '石感', gradient: 'linear-gradient(135deg, #e9e5de, #5e5b57)' },
        { slot: 'mood-3', en: 'SHADOW', cn: '暗面', gradient: 'linear-gradient(135deg, #bcb7ae, #232323)' },
        { slot: 'mood-4', en: 'FORM', cn: '体块', gradient: 'linear-gradient(135deg, #d8d1c7, #4e4b46)' },
        { slot: 'mood-5', en: mix[1] ? mix[1].name.toUpperCase() : 'ACCENT', cn: '点题', gradient: 'linear-gradient(135deg, #e7e1d7, #69645f)' }
      ],
      luxury: [
        { slot: 'mood-1', en: 'COMPOSURE', cn: '沉静', gradient: 'linear-gradient(135deg, #ece7e0, #2a2a2a)' },
        { slot: 'mood-2', en: 'MARBLE', cn: '石材', gradient: 'linear-gradient(135deg, #f1ede7, #4b4b4b)' },
        { slot: 'mood-3', en: 'CONTRAST', cn: '反差', gradient: 'linear-gradient(135deg, #cbc5bb, #161616)' },
        { slot: 'mood-4', en: 'DETAIL', cn: '细节', gradient: 'linear-gradient(135deg, #ddd7cf, #57514a)' },
        { slot: 'mood-5', en: mix[1] ? mix[1].name.toUpperCase() : 'TACTILE', cn: '触感', gradient: 'linear-gradient(135deg, #e1dbd1, #79736b)' }
      ],
      natural: [
        { slot: 'mood-1', en: 'WARMTH', cn: '温度', gradient: 'linear-gradient(135deg, #e6dfd7, #36352f)' },
        { slot: 'mood-2', en: 'GRAIN', cn: '纹理', gradient: 'linear-gradient(135deg, #e8e1d8, #66605a)' },
        { slot: 'mood-3', en: 'QUIET', cn: '静气', gradient: 'linear-gradient(135deg, #c7c1b6, #2b2b28)' },
        { slot: 'mood-4', en: 'LIGHT', cn: '光感', gradient: 'linear-gradient(135deg, #ddd6cb, #5a554d)' },
        { slot: 'mood-5', en: mix[1] ? mix[1].name.toUpperCase() : 'NATURE', cn: '自然', gradient: 'linear-gradient(135deg, #e4ddd3, #757068)' }
      ]
    };
    return base[style] || base.luxury;
  }
};
