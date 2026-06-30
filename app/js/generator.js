window.Generator = {
   templates: {
     minimal: {
       styles: [
         { name: '现代极简', weight: 70, color: '#2C2926', bg: '#3A3633' },
         { name: '日式侘寂', weight: 30, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: '白橡木', desc: '纹理干净，浅色涂装，天然温润', tag: '木材', swatch: '#C4B49A' },
         { name: '白色微水泥', desc: '无缝墙面，哑光表面，纯粹美学', tag: '面材', swatch: '#E8E3DD' },
         { name: '拉丝黄铜', desc: '细节五金点缀，精致质感', tag: '金属', swatch: '#C4A86B' }
       ],
       colors: [
         { name: '柔白', desc: '墙面与天花板主色调', tag: '基底', swatch: '#F5F2ED' },
         { name: '暖灰', desc: '家具与织物主色', tag: '主色', swatch: '#9C9590' },
         { name: '炭色', desc: '点缀与对比元素', tag: '点缀', swatch: '#4A4744' }
       ],
       lighting: [
         { name: '氛围层', desc: '间接顶光，均匀漫射', tag: '基底', swatch: '#F5F2ED' },
         { name: '功能照明', desc: '工作面方向性射灯', tag: '功能', swatch: '#E8E3DD' },
         { name: '自然优先', desc: '最大化采光，纱帘过滤', tag: '策略', swatch: '#D4CFC9' }
       ],
       spatialLogic: ['纯粹线条', '留白', '功能流线', '视觉宁静'],
       mood: '宁静简约'
     },
     luxury: {
       styles: [
         { name: '现代奢华', weight: 60, color: '#2C2926', bg: '#3A3633' },
         { name: '侘寂', weight: 40, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: '卡拉卡塔大理石', desc: '醒目纹理，抛光饰面，视觉焦点', tag: '石材', swatch: '#E8E3DD' },
         { name: '黑胡桃木', desc: '深沉纹理，油面处理，温润厚重', tag: '木材', swatch: '#6B5B4A' },
         { name: '微水泥', desc: '无缝哑光墙面，当代质感', tag: '面材', swatch: '#9C9590' }
       ],
       colors: [
         { name: '暖灰', desc: '墙面主调，沉稳底色', tag: '基底', swatch: '#9C9590' },
         { name: '米色', desc: '织物与点缀面材', tag: '主色', swatch: '#D4CFC9' },
         { name: '柔白', desc: '天花板与高光对比', tag: '点缀', swatch: '#F5F2ED' }
       ],
       lighting: [
         { name: '氛围层', desc: '间接暖光，顶面周边', tag: '基底', swatch: '#D4CFC9' },
         { name: '重点光', desc: '艺术品与特色墙照射', tag: '焦点', swatch: '#C4A86B' },
         { name: '自然漫射', desc: '纱帘柔化，光影律动', tag: '策略', swatch: '#E8E3DD' }
       ],
       spatialLogic: ['非对称', '流动', '视觉层次', '静奢'],
       mood: '宁静奢华与天然不完美'
     },
     natural: {
       styles: [
         { name: '有机现代', weight: 65, color: '#7A8B6F', bg: '#5C6B52' },
         { name: '北欧风', weight: 35, color: '#8B7355', bg: '#B5A48C' }
       ],
       materials: [
         { name: '回收原木', desc: '特征纹理，天然包浆，可持续', tag: '木材', swatch: '#8B7355' },
         { name: '石灰抹面', desc: '呼吸墙面，柔软质感，活性饰面', tag: '面材', swatch: '#E8E3DD' },
         { name: '洞石', desc: '哑光石材，温暖色调，经典', tag: '石材', swatch: '#D4CFC9' }
       ],
       colors: [
         { name: '鼠尾草绿', desc: '主色调，自然和谐', tag: '点缀', swatch: '#9CA895' },
         { name: '沙色', desc: '墙面与织物底色', tag: '基底', swatch: '#D4CFC9' },
         { name: '奶油白', desc: '天花板与浅色面材', tag: '主色', swatch: '#F5F2ED' }
       ],
       lighting: [
         { name: '日光采集', desc: '最大化窗户，减少遮挡', tag: '策略', swatch: '#F5F2ED' },
         { name: '暖光晕', desc: '低色温吊灯，亲密区域', tag: '氛围', swatch: '#C4A86B' },
         { name: '光影韵律', desc: '亚麻过滤，斑驳天光', tag: '特色', swatch: '#9C9590' }
       ],
       spatialLogic: ['有机流动', '亲生物', '材质真实', '柔和过渡'],
       mood: '扎根的自然温度'
     }
   },

   spaces: {
     living: {
       icon: '\u{1F3E0}',
       title: '客厅',
       subtitle: '主要社交与休闲空间',
       strategies: {
         minimal: { layout: '开放平面 + 干净轴线', focus: '留白即特征', materials: '白橡木 + 白色微水泥' },
         luxury: { layout: '开放 + 轴线流动', focus: '中央视觉锚点', materials: '大理石墙面 + 胡桃木基座' },
         natural: { layout: '有机分区 + 流动', focus: '自然连接点', materials: '原木 + 石灰抹面' }
       }
     },
     bedroom: {
       icon: '\u{1F6CF}',
       title: '卧室',
       subtitle: '私密休息与恢复空间',
       strategies: {
         minimal: { layout: '极简占地，悬浮元素', focus: '床为唯一焦点', materials: '浅色橡木 + 亚麻' },
         luxury: { layout: '柔软 / 私密 / 宁静', focus: '层叠纹理帷幔', materials: '胡桃木 + 丝绸 + 大理石' },
         natural: { layout: '轻柔围合，沉稳', focus: '窗-自然对齐', materials: '回收原木 + 棉麻' }
       }
     },
     kitchen: {
       icon: '\u{1F37D}',
       title: '厨房',
       subtitle: '功能优先的烹饪空间',
       strategies: {
         minimal: { layout: '隐藏收纳，平齐表面', focus: '岛台为雕塑形态', materials: '白色石英 + 橡木' },
         luxury: { layout: '功能优先模块设计', focus: '材质展示岛台', materials: '大理石 + 胡桃木 + 黄铜' },
         natural: { layout: '开放搁架，真实收纳', focus: '香草花园融合', materials: '洞石 + 原木' }
       }
     }
   },

   budgetMultipliers: { low: 0.6, mid: 1.0, high: 1.6 },

   generate(input) {
     const style = input.style || 'luxury';
     const budget = input.budget || 'mid';
     const tmpl = this.templates[style];
     const baseBudget = budget === 'low' ? 180 : budget === 'mid' ? 320 : 520;

     return {
       projectName: input.description || '未命名项目',
       projectType: this._inferType(input.description),
       area: this._inferArea(input.description),
       stylePreference: style,
       budgetLevel: budget,
       styleMix: tmpl.styles,
       designSystem: {
         materials: tmpl.materials,
         colors: tmpl.colors,
         lighting: tmpl.lighting,
         spatialLogic: tmpl.spatialLogic
       },
       mood: tmpl.mood,
       spaces: Object.keys(this.spaces).map(key => {
         const sp = this.spaces[key];
         const strat = sp.strategies[style];
         return { ...sp, strategies: undefined, ...strat, key };
       }),
       budgetTiers: [
         {
           id: 'luxury',
           label: '奢华档',
           name: '完整呈现',
           price: Math.round(baseBudget * 1.6),
           features: ['全空间高端材质', '定制工艺', '完整灯光设计', '艺术品策展', '定制家具'],
           recommended: budget === 'high'
         },
         {
           id: 'mid',
           label: '品质档',
           name: '精炼平衡',
           price: baseBudget,
           features: ['优质材质，重点高端', '半定制方案', '核心灯光设计', '关键单品', '精选搭配'],
           recommended: budget === 'mid'
         },
         {
           id: 'optimized',
           label: '优化档',
           name: '智慧之选',
           price: Math.round(baseBudget * 0.6),
           features: ['智能替代材质', '成品 + 定制混合', '功能灯光', '仅重点点缀', '价值工程设计'],
           recommended: budget === 'low'
         }
       ],
       references: this._generateReferences(style),
       aiPrompt: this._generatePrompt(style, input.description)
     };
   },

   _inferType(desc) {
     if (!desc) return '住宅';
     const d = desc.toLowerCase();
     if (d.includes('office') || d.includes('office') || d.includes('\u529E\u516C')) return '商业';
     if (d.includes('restaurant') || d.includes('retail') || d.includes('\u9910\u996e') || d.includes('\u96f6\u552e')) return '商业';
     if (d.includes('apartment') || d.includes('house') || d.includes('\u516c\u5bd3') || d.includes('\u522b\u5885') || d.includes('\u5367\u5ba4')) return '住宅';
     return '住宅';
   },

   _inferArea(desc) {
     if (!desc) return '120-180 \u33A1';
     const d = desc.toLowerCase();
     if (d.includes('large') || d.includes('\u5927') || d.includes('villa') || d.includes('\u522b\u5885')) return '250+ \u33A1';
     if (d.includes('small') || d.includes('\u5c0f') || d.includes('studio')) return '50-80 \u33A1';
     return '120-180 \u33A1';
   },

   _generateReferences(style) {
     const refs = {
       minimal: [
         { title: 'MUJI Hotel', desc: '极简酒店与材质克制' },
         { title: 'John Pawson \u4F4F\u5B85', desc: '建筑极简主义，纯粹体量' },
         { title: 'Noma \u5BA4\u5185', desc: '北欧天然材质调色板' }
       ],
       luxury: [
         { title: 'Aman Tokyo', desc: '日式优雅的宁静奢华' },
         { title: 'Kelly Wearstler', desc: '材质丰富的当代奢华' },
         { title: 'Axel Vervoordt', desc: '\u4F98\u5BC2\u4E0E\u6B27\u6D32\u7CBE\u81F4\u7684\u878D\u5408' }
       ],
       natural: [
         { title: 'Soori Bali', desc: '\u706B\u5C71\u77F3\u4E0E\u70ED\u5E26\u73B0\u4EE3\u4E3B\u4E49' },
         { title: 'Studio MK27', desc: '\u5DF4\u897F\u73B0\u4EE3\u4E3B\u4E49\u4E0E\u539F\u59CB\u6750\u8D28' },
         { title: 'Stiness Arkitektur', desc: '\u5317\u6B27\u539F\u6728\u4E0E\u666F\u89C2\u878D\u5408' }
       ]
     };
     return refs[style] || refs.luxury;
   },

   _generatePrompt(style, desc) {
     const prompts = {
       minimal: '\u5BA4\u5185\u8BBE\u8BA1\u6E32\u67D3\uFF0C' + (desc || '\u73B0\u4EE3\u6781\u7B80\u516C\u5BD3') + '\uFF0C\u7EAF\u767D\u5899\u9762\uFF0C\u767D\u6A61\u6728\u5730\u677F\uFF0C\u5FAE\u6C34\u6CE5\u8868\u9762\uFF0C\u7559\u767D\u7A7A\u95F4\uFF0C\u7EB1\u5E18\u540E\u67D4\u548C\u81EA\u7136\u5149\uFF0C\u62C9\u4E1D\u9EC4\u94DC\u4E94\u91D1\uFF0C\u65E5\u5F0F\u4F98\u5BC2\u7F8E\u5B66\uFF0C\u5B81\u9759\u6C1B\u56F4\uFF0C\u5EFA\u7B51\u6444\u5F71\uFF0C8K',
       luxury: '\u5BA4\u5185\u8BBE\u8BA1\u6E32\u67D3\uFF0C' + (desc || '\u8F7B\u5962\u516C\u5BD3') + '\uFF0C\u5361\u62C9\u5361\u5854\u5927\u7406\u77F3\u5899\u9762\uFF0C\u6DF1\u8272\u80E1\u6843\u6728\uFF0C\u6E29\u6696\u5FAE\u6C34\u6CE5\uFF0C\u5C42\u53E0\u67D4\u5149\uFF0C\u5929\u7136\u6750\u8D28\u4E0D\u5B8C\u7F8E\u611F\uFF0C\u4F98\u5BC2\u4E0E\u73B0\u4EE3\u5962\u534E\u878D\u5408\uFF0C\u6696\u7070\u8272\u8C03\uFF0C\u5EFA\u7B51\u6444\u5F71\u7EA7\u54C1\u8D28\uFF0C8K',
       natural: '\u5BA4\u5185\u8BBE\u8BA1\u6E32\u67D3\uFF0C' + (desc || '\u81EA\u7136\u73B0\u4EE3\u4F4F\u5B85') + '\uFF0C\u56DE\u6536\u539F\u6728\uFF0C\u77F3\u7070\u62B9\u9762\u5899\u4F53\uFF0C\u6D1E\u77F3\u6750\u8D28\uFF0C\u9F20\u5C3E\u8349\u7EFF\u8272\u70B9\u7F00\uFF0C\u4EB2\u751F\u7269\u8BBE\u8BA1\uFF0C\u6709\u673A\u6D41\u52A8\uFF0C\u6591\u9A73\u5929\u5149\uFF0C\u4E9A\u9EBB\u7EB9\u7406\uFF0C\u5317\u6B27\u6E29\u6696\u8D28\u611F\uFF0C8K'
     };
     return prompts[style] || prompts.luxury;
   }
};
