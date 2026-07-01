window.OverviewSection = {
  render(proposal) {
    const budgetLabels = { low: '\u4f18\u5316\u63a7\u5236', mid: '\u54c1\u8d28\u5e73\u8861', high: '\u5b8c\u6574\u9ad8\u914d' };
    const gallery = this._galleryByStyle(proposal.stylePreference);

    return `
      <section class="section" id="section-overview">
        <div class="container-wide">
          <div class="section-header">
            <div class="section-kicker">
              <div class="section-label">\u8bbe\u8ba1\u7406\u5ff5</div>
              <div class="section-label-en">Design Concept</div>
            </div>
            <div>
              <h2 class="section-title">${proposal.projectName}</h2>
              <p class="section-desc">\u8fd9\u4e00\u7248\u9996\u9875\u91c7\u7528\u66f4\u63a5\u8fd1\u9ad8\u7aef\u63d0\u6848\u518c\u7684\u53d9\u4e8b\u65b9\u5f0f\uff0c\u901a\u8fc7\u5927\u56fe\u3001\u77ed\u53e5\u3001\u53cc\u8bed\u6807\u9898\u548c\u6750\u8d28\u5bfc\u5411\u7684\u6392\u7248\uff0c\u8ba9\u6d4f\u89c8\u8282\u594f\u5148\u88ab\u6c14\u8d28\u5438\u5f15\uff0c\u518d\u88ab\u4fe1\u606f\u8bf4\u670d\u3002</p>
            </div>
          </div>
          <div class="overview-hero">
            <div class="hero-panel">
              <div>
                <div class="eyebrow">Signature Narrative</div>
                <h1 class="hero-title">${this._headline(proposal)}</h1>
                <p class="hero-subtitle">${this._tagline(proposal)}</p>
                <div class="hero-conclusion">
                  <span class="dot"></span>
                  ${this._conclusion(proposal)}
                </div>
              </div>
              <div class="project-info-grid">
                <div class="info-card"><div class="label">\u9879\u76ee\u7c7b\u578b</div><div class="value">${proposal.projectType}</div></div>
                <div class="info-card"><div class="label">\u9762\u79ef\u533a\u95f4</div><div class="value">${proposal.area}</div></div>
                <div class="info-card"><div class="label">\u98ce\u683c\u4e3b\u8f74</div><div class="value">${proposal.styleMix[0].name}</div></div>
                <div class="info-card"><div class="label">\u9884\u7b97\u5efa\u8bae</div><div class="value">${budgetLabels[proposal.budgetLevel] || proposal.budgetLevel}</div></div>
              </div>
            </div>
            <div class="hero-gallery">
              ${gallery.map((item, index) => `
                <div class="editorial-tile ${index === 1 ? 'tall' : ''}" style="--tile-gradient:${item.gradient}" data-slot="${item.slot}">
                  <div class="tile-copy">
                    <strong>${item.en}</strong>
                    <span>${item.cn}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  },

  _headline(proposal) {
    const heads = {
      minimal: 'Quiet Order',
      luxury: 'Calm Luxury',
      natural: 'Soft Nature'
    };
    return heads[proposal.stylePreference] || heads.luxury;
  },

  _tagline(proposal) {
    const tags = {
      minimal: '\u7528\u6781\u7b80\u7ebf\u6761\u3001\u7559\u767d\u548c\u5149\u5f71\u8fb9\u754c\uff0c\u8ba9\u7a7a\u95f4\u6709\u4e0d\u8a00\u81ea\u660e\u7684\u79e9\u5e8f\u611f\u3002',
      luxury: '\u4ee5\u77f3\u6750\u3001\u6df1\u8272\u6728\u9970\u9762\u548c\u7070\u9636\u5149\u611f\uff0c\u6784\u6210\u5b89\u9759\u4f46\u8db3\u591f\u6709\u91cd\u91cf\u7684\u7a7a\u95f4\u8868\u60c5\u3002',
      natural: '\u5c06\u5929\u7136\u7eb9\u7406\u4e0e\u67d4\u548c\u4f53\u5757\u7ec4\u7ec7\u6210\u66f4\u8212\u5c55\u3001\u66f4\u8d34\u8fd1\u547c\u5438\u8282\u594f\u7684\u5c45\u4f4f\u6c1b\u56f4\u3002'
    };
    return tags[proposal.stylePreference] || tags.luxury;
  },

  _conclusion(proposal) {
    const concs = {
      minimal: 'Comfort x Silence x Structure',
      luxury: 'Texture x Contrast x Simplicity',
      natural: 'Warmth x Organic x Lightness'
    };
    return concs[proposal.stylePreference] || concs.luxury;
  },

  _galleryByStyle(style) {
    const map = {
      minimal: [
        { slot: 'hero-1', en: 'COMFORTABLE', cn: '\u8212\u9002', gradient: 'linear-gradient(140deg, #e8e3dd 0%, #807b76 52%, #1b1b1b 100%)' },
        { slot: 'hero-2', en: 'TEXTURE', cn: '\u8d28\u611f', gradient: 'linear-gradient(140deg, #dad5cd 0%, #8e8a84 36%, #262626 100%)' },
        { slot: 'hero-3', en: 'SIMPLICITY', cn: '\u7b80\u7ea6', gradient: 'linear-gradient(140deg, #c9c4bc 0%, #77736f 42%, #161616 100%)' }
      ],
      luxury: [
        { slot: 'hero-1', en: 'COMFORTABLE', cn: '\u8212\u9002', gradient: 'linear-gradient(140deg, #efebe4 0%, #a7a29d 45%, #1d1d1d 100%)' },
        { slot: 'hero-2', en: 'TEXTURE', cn: '\u8d28\u611f', gradient: 'linear-gradient(140deg, #f5f1ea 0%, #a09a91 36%, #202020 100%)' },
        { slot: 'hero-3', en: 'SIMPLICITY', cn: '\u7b80\u7ea6', gradient: 'linear-gradient(140deg, #d8d3cb 0%, #74706b 44%, #181818 100%)' }
      ],
      natural: [
        { slot: 'hero-1', en: 'COMFORTABLE', cn: '\u8212\u9002', gradient: 'linear-gradient(140deg, #e4ddd4 0%, #9a968e 48%, #262622 100%)' },
        { slot: 'hero-2', en: 'TEXTURE', cn: '\u8d28\u611f', gradient: 'linear-gradient(140deg, #ddd9d1 0%, #8a847d 40%, #2f2e2b 100%)' },
        { slot: 'hero-3', en: 'SIMPLICITY', cn: '\u7b80\u7ea6', gradient: 'linear-gradient(140deg, #d3cec4 0%, #7d7a73 44%, #1d1d1b 100%)' }
      ]
    };
    return map[style] || map.luxury;
  }
};
