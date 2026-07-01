window.DecisionPanelSection = {
  render() {
    const state = window.AppState;
    return `
      <section class="section" id="section-decision">
        <div class="container-wide">
          <div class="decision-container">
            <div class="section-header">
              <div class="section-kicker">
                <div class="section-label">提案决策</div>
                <div class="section-label-en">Decision</div>
              </div>
              <div>
                <h2 class="section-title">把选择动作做得更像签版</h2>
                <p class="section-desc">这里保留确认、微调和锁定三步，但整体视觉更克制，便于提案最后一步收口，也更像正式设计交付的确认页。</p>
              </div>
            </div>

            <div class="decision-step">
              <div class="decision-step-number">Step 01</div>
              <div class="decision-step-title">确认整体方向</div>
              <div class="decision-actions">
                <button class="btn-decision primary ${state.styleAccepted ? 'selected' : ''}" id="acceptDirection">接受当前方向</button>
                <button class="btn-decision ${!state.styleAccepted ? 'selected' : ''}" id="requestAdjust">需要微调</button>
              </div>
            </div>

            <div class="decision-step">
              <div class="decision-step-number">Step 02</div>
              <div class="decision-step-title">微调表达强度</div>
              <div class="slider-group">
                <div class="slider-label"><span>更克制</span><span>更奢华</span></div>
                <input type="range" class="slider-track" id="sliderLuxury" min="0" max="100" value="${state.sliders.luxury}">
              </div>
              <div class="slider-group">
                <div class="slider-label"><span>更极简</span><span>更戏剧化</span></div>
                <input type="range" class="slider-track" id="sliderMinimal" min="0" max="100" value="${state.sliders.minimal}">
              </div>
            </div>

            <div class="decision-step">
              <div class="decision-step-number">Step 03</div>
              <div class="decision-step-title">锁定设计方向</div>
              <button class="btn-lock" id="lockDirection" ${state.decisionStatus === 'locked' ? 'disabled' : ''}>
                ${state.decisionStatus === 'locked' ? 'Direction Locked' : 'Lock Proposal Direction'}
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    const acceptBtn = document.getElementById('acceptDirection');
    const adjustBtn = document.getElementById('requestAdjust');
    const lockBtn = document.getElementById('lockDirection');
    const sliderLuxury = document.getElementById('sliderLuxury');
    const sliderMinimal = document.getElementById('sliderMinimal');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        window.AppState.styleAccepted = true;
        acceptBtn.classList.add('selected');
        adjustBtn.classList.remove('selected');
        window.App.showToast('已确认当前方向');
      });
    }

    if (adjustBtn) {
      adjustBtn.addEventListener('click', () => {
        window.AppState.styleAccepted = false;
        adjustBtn.classList.add('selected');
        acceptBtn.classList.remove('selected');
        window.App.showToast('已标记为需要微调');
      });
    }

    if (sliderLuxury) {
      sliderLuxury.addEventListener('input', event => {
        window.AppState.sliders.luxury = parseInt(event.target.value, 10);
      });
    }

    if (sliderMinimal) {
      sliderMinimal.addEventListener('input', event => {
        window.AppState.sliders.minimal = parseInt(event.target.value, 10);
      });
    }

    if (lockBtn && window.AppState.decisionStatus !== 'locked') {
      lockBtn.addEventListener('click', () => {
        window.AppState.decisionStatus = 'locked';
        document.getElementById('lockedOverlay').classList.add('active');
      });
    }
  }
};
