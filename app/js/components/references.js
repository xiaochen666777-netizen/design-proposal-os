window.ReferencesSection = {
  render(proposal) {
    const gradients = this._gradients(proposal.stylePreference);

    return `
      <section class="section" id="section-references">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">参考图集</div>
              <div class="section-label-en">Reference Gallery</div>
            </div>
            <div>
              <h2 class="section-title">图像区先做成可替换结构</h2>
              <p class="section-desc">参考图区域现在和首页一样是标准化大图槽位。你后续既可以手动替换，也可以让后端直接按槽位写图，整个版式不需要改。</p>
            </div>
          </div>
          <div class="ref-grid">
            ${proposal.references.map((ref, index) => `
              <div class="ref-card">
                <div class="ref-card-image" style="--tile-gradient:${gradients[index % gradients.length]}" data-slot="ref-${index + 1}">
                  <div class="media-slot-copy">
                    <strong>${ref.title}</strong>
                    <span>${ref.desc}</span>
                  </div>
                </div>
                <div class="ref-card-body">
                  <div class="ref-card-title">${ref.title}</div>
                  <div class="ref-card-desc">${ref.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="batch-upload-card">
            <div class="eyebrow">Reference Replace</div>
            <div class="style-headline" style="font-size:2rem;">批量替换参考图</div>
            <p>上传后会依次填入三张参考图卡片，适合你先手工测试，后端接入时复用同一组槽位键名。</p>
            <div class="img-upload-zone" id="refImageUpload" style="position:relative;inset:auto;opacity:1;transform:none;margin-top:14px;">
              <input type="file" accept="image/*" multiple>
              <div class="upload-icon">⌘</div>
              <div class="upload-text">上传参考图集</div>
              <div class="upload-hint">按顺序填充 Ref 1-3</div>
            </div>
          </div>
          <div class="ref-prompt-section">
            <div class="eyebrow">Prompt Package</div>
            <div class="ref-prompt-title">AI 渲染提示词</div>
            <div class="ref-prompt-code">${proposal.aiPrompt}</div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    window.MediaSlots.enhanceAll('[data-slot]');

    const uploadZone = document.getElementById('refImageUpload');
    if (!uploadZone) return;

    const fileInput = uploadZone.querySelector('input[type="file"]');
    fileInput.addEventListener('change', () => {
      window.MediaSlots.fillMany(['ref-1', 'ref-2', 'ref-3'], fileInput.files);
    });
  },

  _gradients(style) {
    const map = {
      minimal: [
        'linear-gradient(140deg, #e6e2db 0%, #9a948d 42%, #232323 100%)',
        'linear-gradient(140deg, #dfdbd3 0%, #86807a 42%, #1f1f1f 100%)',
        'linear-gradient(140deg, #d7d2c9 0%, #706a65 42%, #141414 100%)'
      ],
      luxury: [
        'linear-gradient(140deg, #f2eee8 0%, #a5a09a 42%, #1d1d1d 100%)',
        'linear-gradient(140deg, #e4dfd8 0%, #8e8881 42%, #212121 100%)',
        'linear-gradient(140deg, #d3cec6 0%, #706b66 42%, #171717 100%)'
      ],
      natural: [
        'linear-gradient(140deg, #e7e1d8 0%, #9e9990 42%, #262521 100%)',
        'linear-gradient(140deg, #ddd7cf 0%, #878178 42%, #232220 100%)',
        'linear-gradient(140deg, #d1cabe 0%, #716b63 42%, #191816 100%)'
      ]
    };
    return map[style] || map.luxury;
  }
};
