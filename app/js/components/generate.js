window.GeneratePage = {
  render() {
    return `
      <div class="generate-page">
        <div class="generate-card">
          <aside class="generate-aside">
            <div class="aside-copy">
              <div class="aside-chip">Design Proposal OS</div>
              <div>
                <div class="eyebrow">Editorial Proposal Builder</div>
                <h1 class="aside-title">
                  \u8ba9\u63d0\u6848\u50cf\u6837\u677f\u520a\u7269\u4e00\u6837\u5c55\u5f00
                  <small>\u4ee5\u9ed1\u767d\u7070\u3001\u6750\u8d28\u3001\u79e9\u5e8f\u548c\u7559\u767d\u4e3a\u6838\u5fc3\uff0c\u5feb\u901f\u751f\u6210\u53ef\u5c55\u793a\u3001\u53ef\u6362\u56fe\u3001\u53ef\u5206\u4eab\u7684\u7a7a\u95f4\u63d0\u6848\u524d\u53f0\u3002</small>
                </h1>
              </div>
              <div class="aside-principles">
                <div class="aside-principle">
                  <strong>Comfort</strong>
                  <span>\u8212\u9002\u611f\u6765\u81ea\u5c3a\u5ea6\u4e0e\u9759\u8c27\u3002</span>
                </div>
                <div class="aside-principle">
                  <strong>Texture</strong>
                  <span>\u8d28\u611f\u6765\u81ea\u6750\u8d28\u4e0e\u5149\u6cfd\u5c42\u6b21\u3002</span>
                </div>
                <div class="aside-principle">
                  <strong>Simplicity</strong>
                  <span>\u7b80\u7ea6\u6765\u81ea\u4fe1\u606f\u514b\u5236\u4e0e\u6392\u7248\u79e9\u5e8f\u3002</span>
                </div>
              </div>
            </div>
          </aside>
          <main class="generate-main">
            <div class="brand">
              <div class="brand-label">Proposal Input</div>
              <div class="brand-title">\u8bbe\u8ba1\u63d0\u6848\u751f\u6210\u5668</div>
              <div class="brand-sub">\u8f93\u5165\u9879\u76ee\u6982\u51b5\u540e\uff0c\u7cfb\u7edf\u4f1a\u81ea\u52a8\u751f\u6210\u6574\u5957\u5c55\u793a\u7ad9\u5185\u5bb9\uff0c\u5305\u62ec\u89c6\u89c9\u65b9\u5411\u3001\u6750\u8d28\u7cfb\u7edf\u3001\u7a7a\u95f4\u7b56\u7565\u3001\u9884\u7b97\u5206\u5c42\u548c\u53ef\u66ff\u6362\u7684\u63d2\u56fe\u69fd\u4f4d\u3002</div>
            </div>
            <div class="form-grid">
              <div class="form-group span-2">
                <label class="form-label">\u9879\u76ee\u63cf\u8ff0</label>
                <textarea class="form-input" id="projectDesc" placeholder="\u4f8b\u5982\uff1a320 \u5e73\u73b0\u4ee3\u5927\u5e73\u5c42\uff0c\u504f\u9ed1\u767d\u7070\u77f3\u6750\u8d28\u611f\uff0c\u5e0c\u671b\u6574\u4f53\u50cf\u9ad8\u7aef\u6742\u5fd7\u63d0\u6848\u9875\uff0c\u5f3a\u8c03\u5ba2\u5385\u3001\u58c1\u7089\u3001\u6750\u8d28\u7eb9\u7406\u548c\u79e9\u5e8f\u611f\u3002">320 \u5e73\u73b0\u4ee3\u5927\u5e73\u5c42\uff0c\u504f\u9ed1\u767d\u7070\u77f3\u6750\u8d28\u611f\uff0c\u5e0c\u671b\u6574\u4f53\u50cf\u9ad8\u7aef\u6742\u5fd7\u63d0\u6848\u9875\uff0c\u5f3a\u8c03\u5ba2\u5385\u3001\u58c1\u7089\u3001\u6750\u8d28\u7eb9\u7406\u548c\u79e9\u5e8f\u611f\u3002</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">\u9884\u7b97\u5c42\u7ea7</label>
                <select class="form-select" id="budgetLevel">
                  <option value="low">\u4f18\u5316\u63a7\u5236</option>
                  <option value="mid" selected>\u54c1\u8d28\u5e73\u8861</option>
                  <option value="high">\u5b8c\u6574\u9ad8\u914d</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">\u98ce\u683c\u65b9\u5411</label>
                <select class="form-select" id="stylePref">
                  <option value="minimal">\u6781\u7b80\u79e9\u5e8f</option>
                  <option value="luxury" selected>\u9759\u5962\u77f3\u6750</option>
                  <option value="natural">\u81ea\u7136\u6e29\u6da6</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">\u9879\u76ee\u533a\u57df</label>
                <select class="form-select" id="regionSelect">
                  <option value="local">\u56fd\u5185\u9879\u76ee</option>
                  <option value="international">\u6d77\u5916\u9879\u76ee</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">\u63d0\u6848\u8bed\u6c14</label>
                <select class="form-select" id="toneSelect">
                  <option value="editorial" selected>\u6742\u5fd7\u578b\u5c55\u793a</option>
                  <option value="sales">\u504f\u9500\u552e\u8bf4\u670d</option>
                  <option value="studio">\u504f\u8bbe\u8ba1\u4e8b\u52a1\u6240</option>
                </select>
              </div>
              <div class="form-group span-2">
                <button class="btn-generate" id="generateBtn">Generate Proposal</button>
              </div>
            </div>
          </main>
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
      region: document.getElementById('regionSelect').value,
      tone: document.getElementById('toneSelect').value
    };

    await this.showGenerationProgress();

    window.AppState.proposal = window.Generator.generate(input);
    window.AppState.decisionStatus = 'pending';
    window.AppState.selectedTier = null;
    window.AppState.styleAccepted = false;
    window.AppState.sliders = { luxury: 50, minimal: 50 };
    window.AppState.media = {};

    btn.classList.remove('loading');
    document.getElementById('genOverlay').classList.remove('active');
    window.Router.navigate('proposal');
  },

  async showGenerationProgress() {
    const overlay = document.getElementById('genOverlay');
    const stepsEl = document.getElementById('genSteps');
    const steps = [
      '\u89e3\u6790\u9879\u76ee\u6761\u4ef6\u4e0e\u7a7a\u95f4\u671f\u5f85',
      '\u5339\u914d\u89c6\u89c9\u53d9\u4e8b\u4e0e\u98ce\u683c\u4e3b\u8f74',
      '\u751f\u6210\u6750\u8d28\u4e0e\u8272\u5f69\u7cfb\u4f53',
      '\u6784\u5efa\u8bbe\u8ba1\u6982\u5ff5\u4e0e\u7a7a\u95f4\u7b56\u7565',
      '\u6574\u7406\u53c2\u8003\u56fe\u4e0e\u5c55\u793a\u69fd\u4f4d',
      '\u8f93\u51fa\u5b8c\u6574\u63d0\u6848\u7ad9\u70b9'
    ];

    stepsEl.innerHTML = steps.map((step, index) => `
      <div class="gen-step" data-step="${index}">
        <div class="step-ind">${index + 1}</div>
        <span>${step}</span>
      </div>
    `).join('');

    overlay.classList.add('active');

    for (let i = 0; i < steps.length; i += 1) {
      const el = stepsEl.querySelector('[data-step="' + i + '"]');
      el.classList.add('active');
      await new Promise(resolve => setTimeout(resolve, 360));
      el.classList.remove('active');
      el.classList.add('done');
      el.querySelector('.step-ind').textContent = '✓';
    }
  }
};
