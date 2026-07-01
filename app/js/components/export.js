window.ExportPage = {
  render() {
    return `
      <div class="export-page">
        <div class="export-card">
          <div class="export-icon">↗</div>
          <div class="eyebrow">Deliverables</div>
          <div class="export-title">导出与交付</div>
          <div class="export-desc">导出区也做成与整站一致的排版语言，方便提案讲完以后自然进入分享、留档或交接后端资源的阶段。</div>
          <div class="export-options">
            <div class="export-option" data-export="pdf">
              <div class="opt-icon">▣</div>
              <div class="opt-title">提案 PDF</div>
              <div class="opt-desc">输出便于归档或线下展示的静态版本。</div>
            </div>
            <div class="export-option" data-export="website">
              <div class="opt-icon">⌘</div>
              <div class="opt-title">分享链接</div>
              <div class="opt-desc">复制当前网页地址，适合快速发给客户查看。</div>
            </div>
            <div class="export-option" data-export="prompts">
              <div class="opt-icon">◇</div>
              <div class="opt-title">AI 提示词包</div>
              <div class="opt-desc">导出当前方案对应的图像提示词文本。</div>
            </div>
            <div class="export-option" data-export="materials">
              <div class="opt-icon">◫</div>
              <div class="opt-title">材料清单</div>
              <div class="opt-desc">导出材质和色彩说明，方便继续深化。</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    document.querySelectorAll('.export-option').forEach(option => {
      option.addEventListener('click', event => {
        const type = event.currentTarget.dataset.export;
        const labels = {
          pdf: 'PDF',
          website: '分享链接',
          prompts: 'AI 提示词包',
          materials: '材料清单'
        };

        window.App.showToast('正在准备 ' + labels[type]);

        if (type === 'prompts') {
          setTimeout(() => {
            const proposal = window.AppState.proposal;
            if (!proposal) return;
            const blob = new Blob([proposal.aiPrompt], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ai-prompts.txt';
            a.click();
            URL.revokeObjectURL(url);
          }, 500);
        }

        if (type === 'website') {
          setTimeout(() => {
            const shareUrl = window.App._getShareUrl();
            if (navigator.share) {
              navigator.share({ title: '设计提案', url: shareUrl }).catch(() => {});
              return;
            }
            navigator.clipboard.writeText(shareUrl).then(() => {
              window.App.showToast('分享链接已复制');
            });
          }, 500);
        }

        if (type === 'materials') {
          setTimeout(() => {
            const proposal = window.AppState.proposal;
            if (!proposal) return;
            const lines = ['材料清单', '========', ''];
            proposal.designSystem.materials.forEach(item => {
              lines.push(item.name + ' - ' + item.desc + ' [' + item.tag + ']');
            });
            lines.push('');
            lines.push('色彩方案');
            proposal.designSystem.colors.forEach(item => {
              lines.push(item.name + ' - ' + item.desc + ' [' + item.tag + '] ' + item.swatch);
            });

            const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'materials.txt';
            a.click();
            URL.revokeObjectURL(url);
          }, 500);
        }
      });
    });
  }
};
