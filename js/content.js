/* ============================================
   各窗口内容 - Win7 资源管理器质感空壳骨架
   内容为占位骨架，等真实素材逐步填入
   ============================================ */

// 通用资源管理器外壳
function explorerShell({ crumb, sidebar, toolbar, content, status }) {
    return `
        <div class="explorer">
            <div class="exp-addressbar">
                <div class="exp-nav-btn" title="后退">‹</div>
                <div class="exp-nav-btn" title="前进">›</div>
                <div class="exp-address">${crumb}</div>
                <div class="exp-search"><span class="pxi pxi-16 pxi-search" style="margin-right:6px;"></span>搜索</div>
            </div>
            <div class="exp-toolbar">${toolbar}</div>
            <div class="exp-main">
                <div class="exp-sidebar">${sidebar}</div>
                <div class="exp-content">${content}</div>
            </div>
            <div class="exp-statusbar">${status}</div>
        </div>
    `;
}

function sidebarStd(active) {
    const items = [
        ['ai', 'AI 生图'], ['ui', 'UI 制作'], ['product', '产品思考'], ['art', '美术作品']
    ];
    return `
        <div class="exp-sidebar-group">收藏夹</div>
        <div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-star" style="margin-right:6px;"></span> 桌面</div>
        <div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-star" style="margin-right:6px;"></span> 最近访问</div>
        <div class="exp-sidebar-group">库</div>
        ${items.map(([k, label]) =>
            `<div class="exp-sidebar-item ${k === active ? 'active' : ''}"><span class="pxi pxi-16 pxi-folder" style="margin-right:6px;"></span> ${label}</div>`).join('')}
        <div class="exp-sidebar-group">计算机</div>
        <div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-disk" style="margin-right:6px;"></span> 本地磁盘 (C:)</div>
    `;
}

function skeletonTiles(n, label) {
    return `<div class="skeleton-grid">${Array.from({ length: n }).map(() =>
        `<div class="skeleton-tile"><div class="skeleton-thumb"></div>${label}</div>`).join('')}</div>`;
}

function skeletonRows(n) {
    return Array.from({ length: n }).map(() => `
        <div class="skeleton-row">
            <div class="skeleton-thumb"></div>
            <div class="lines">
                <div class="skeleton-line" style="width:55%;"></div>
                <div class="skeleton-line" style="width:80%;"></div>
            </div>
        </div>`).join('');
}

const WindowContent = {
    ai: {
        title: 'AI_Gallery', iconSvg: 'ai', width: 660, height: 480,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-image" style="margin-right:4px;"></span>库 <span class="crumb-sep">›</span> AI 生图',
            toolbar: '<span>组织 ▾</span><span>放映幻灯片</span><span>视图 ▾</span>',
            sidebar: sidebarStd('ai'),
            content: skeletonTiles(12, '图片占位'),
            status: '12 个项目（占位） · 待填入真实 AI 作品'
        })
    },

    ui: {
        title: 'UI_Studio', iconSvg: 'ui', width: 660, height: 480,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-image" style="margin-right:4px;"></span>库 <span class="crumb-sep">›</span> UI 制作',
            toolbar: '<span>组织 ▾</span><span>打开 Figma</span><span>视图 ▾</span>',
            sidebar: sidebarStd('ui'),
            content: skeletonTiles(6, '项目占位'),
            status: '6 个项目（占位） · 待填入 UI 作品 / Figma'
        })
    },

    product: {
        title: 'Product_Lab', iconSvg: 'product', width: 620, height: 460,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-folder" style="margin-right:4px;"></span>库 <span class="crumb-sep">›</span> 产品思考',
            toolbar: '<span>组织 ▾</span><span>新建文件夹</span><span>视图 ▾</span>',
            sidebar: sidebarStd('product'),
            content: skeletonRows(5),
            status: '5 个文档（占位） · 待填入产品文章'
        })
    },

    art: {
        title: 'Art_Corner', iconSvg: 'art', width: 660, height: 480,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-image" style="margin-right:4px;"></span>库 <span class="crumb-sep">›</span> 美术作品',
            toolbar: '<span>组织 ▾</span><span>放映幻灯片</span><span>视图 ▾</span>',
            sidebar: sidebarStd('art'),
            content: skeletonTiles(9, '作品占位'),
            status: '9 个项目（占位） · 待填入手绘 / 合成美术'
        })
    },

    about: {
        title: 'About_Me - 记事本', iconSvg: 'about', width: 480, height: 400,
        content: `
            <div style="display:flex;flex-direction:column;height:100%;">
                <div style="height:24px;background:linear-gradient(180deg,#fbfdff,#eef4fa);border-bottom:1px solid #dbe6f0;display:flex;align-items:center;gap:16px;padding:0 10px;font-size:12px;color:#15428b;">
                    <span>文件</span><span>编辑</span><span>格式</span><span>查看</span><span>帮助</span>
                </div>
                <div style="flex:1;background:#fff;padding:14px;font-family:'Consolas','Courier New',monospace;font-size:13px;color:#222;line-height:1.7;overflow:auto;">
                    <div style="color:#999;">// About_Me.txt</div><br>
                    姓名：耿鹤<br>
                    简介：武汉理工大学交互设计专业大三在读，<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现任深圳腾讯 CSIG AI 产品实习生。<br><br>
                    标签：AI Agent 架构 / 提示词工程 / 叙事逻辑<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意图识别 / 评价体系构建<br><br>
                    <span class="placeholder-note">[ 头像、简历下载、详细经历 — 待填入 ]</span>
                </div>
            </div>`
    },

    contact: {
        title: 'Contact', iconSvg: 'contact', width: 420, height: 320,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-mail" style="margin-right:4px;"></span> 联系方式',
            toolbar: '<span>发送邮件</span>',
            sidebar: '<div class="exp-sidebar-group">联系</div><div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-mail" style="margin-right:6px;"></span> Email</div><div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-github" style="margin-right:6px;"></span> GitHub</div><div class="exp-sidebar-item"><span class="pxi pxi-16 pxi-chat" style="margin-right:6px;"></span> 微信</div>',
            content: `
                <div class="skeleton-row"><div class="skeleton-thumb"></div><div class="lines"><div class="skeleton-line" style="width:40%;"></div><div class="skeleton-line" style="width:70%;"></div></div></div>
                <div class="skeleton-row"><div class="skeleton-thumb"></div><div class="lines"><div class="skeleton-line" style="width:40%;"></div><div class="skeleton-line" style="width:70%;"></div></div></div>
                <div class="placeholder-note">Email / GitHub / 微信 — 待填入真实链接</div>`,
            status: '待填入联系方式'
        })
    },

    trash: {
        title: '回收站', iconSvg: 'trash', width: 520, height: 360,
        content: explorerShell({
            crumb: '<span class="pxi pxi-16 pxi-trash-s" style="margin-right:4px;"></span> 回收站',
            toolbar: '<span>清空回收站</span><span>还原所有项目</span>',
            sidebar: sidebarStd(''),
            content: `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9fb3c8;font-size:13px;">回收站是空的（可在此藏彩蛋）</div>`,
            status: '0 个项目'
        })
    },

    terminal: {
        title: 'Logic_Terminal.bat', iconSvg: '', width: 600, height: 380,
        content: [
            '<div class="terminal">',
            '  <div><span class="t-path">C:\\Users\\GengHe></span> <span class="t-prompt">logic --start</span></div>',
            '  <div>Logic Terminal v0.1 (占位)</div>',
            '  <div>此处将接入真实 Agent 对话 / 意图识别演示。</div>',
            '  <div>键入 help 查看命令（待接后端）。</div>',
            '  <div><span class="t-path">C:\\Users\\GengHe></span> <span class="cursor">&nbsp;</span></div>',
            '</div>'
        ].join('\n')
    }
};

window.WindowContent = WindowContent;
