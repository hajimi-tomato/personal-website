/* ============================================
   窗口管理系统 - 创建、拖拽、最大化、最小化、关闭、层叠
   ============================================ */

const WindowManager = (function () {
    let zIndexCounter = 100;
    const openWindows = new Map(); // id -> windowEl
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    function bringToFront(winEl) {
        zIndexCounter += 1;
        winEl.style.zIndex = zIndexCounter;
        // 焦点窗口
        document.querySelectorAll('.window').forEach((w) => w.classList.remove('focused'));
        winEl.classList.add('focused');
        // 更新任务栏激活态
        document.querySelectorAll('.taskbar-win').forEach((t) => t.classList.remove('active'));
        const taskItem = document.querySelector(`.taskbar-win[data-win="${winEl.dataset.winId}"]`);
        if (taskItem) taskItem.classList.add('active');
    }

    function createWindow(id, config) {
        // 已打开则聚焦
        if (openWindows.has(id)) {
            const existing = openWindows.get(id);
            existing.classList.remove('minimized');
            bringToFront(existing);
            return existing;
        }

        const win = document.createElement('div');
        win.className = 'window';
        win.dataset.winId = id;

        // 初始位置（错位排布）
        const offset = openWindows.size * 30;
        const w = config.width || 560;
        const h = config.height || 420;
        win.style.width = w + 'px';
        win.style.height = h + 'px';
        win.style.left = Math.min(80 + offset, window.innerWidth - w - 20) + 'px';
        win.style.top = Math.min(60 + offset, window.innerHeight - h - 80) + 'px';

        const winIcon = config.iconSvg
            ? `<span class="wt-ico pxi-svg pxi-svg-16">${window.PixelIcons[config.iconSvg] || ''}</span>`
            : '';
        win.innerHTML = `
            <div class="window-titlebar">
                <span class="window-title">${winIcon}${config.title}</span>
                <div class="window-controls">
                    <div class="window-ctrl minimize" title="最小化"><span class="ctrl-min"></span></div>
                    <div class="window-ctrl maximize" title="最大化"><span class="ctrl-max"></span></div>
                    <div class="window-ctrl close" title="关闭"><span class="ctrl-close"></span></div>
                </div>
            </div>
            <div class="window-body">${config.content || ''}</div>
            <div class="window-resize"></div>
        `;

        document.getElementById('window-container').appendChild(win);
        openWindows.set(id, win);

        bringToFront(win);
        addTaskbarItem(id, config);
        attachWindowEvents(win, id, config);

        if (isMobile()) win.classList.add('maximized');

        // 播放打开音效
        if (window.SoundFX) window.SoundFX.play('open');

        return win;
    }

    function attachWindowEvents(win, id, config) {
        const titlebar = win.querySelector('.window-titlebar');
        const btnMin = win.querySelector('.minimize');
        const btnMax = win.querySelector('.maximize');
        const btnClose = win.querySelector('.close');
        const resizeHandle = win.querySelector('.window-resize');

        // 保存拖拽前的尺寸（用于 Aero Snap 还原）
        let preSnapState = null;

        win.addEventListener('mousedown', () => bringToFront(win));

        // 拖拽 + Aero Snap
        if (!isMobile()) {
            let dragging = false, sx, sy, sl, st;
            let snapPreview = null;

            titlebar.addEventListener('mousedown', (e) => {
                if (e.target.closest('.window-ctrl')) return;
                if (win.classList.contains('maximized')) return;
                dragging = true;
                sx = e.clientX; sy = e.clientY;
                sl = win.offsetLeft; st = win.offsetTop;
                preSnapState = { left: sl, top: st, width: win.offsetWidth, height: win.offsetHeight };
                document.body.style.userSelect = 'none';
            });
            document.addEventListener('mousemove', (e) => {
                if (!dragging) return;
                win.style.left = (sl + e.clientX - sx) + 'px';
                win.style.top = Math.max(0, st + e.clientY - sy) + 'px';

                // Aero Snap 预览检测
                const snapZone = 8;
                let snapType = null;
                if (e.clientY <= snapZone) snapType = 'top';       // 最大化
                else if (e.clientX <= snapZone) snapType = 'left';  // 左半屏
                else if (e.clientX >= window.innerWidth - snapZone) snapType = 'right'; // 右半屏

                if (snapType) {
                    if (!snapPreview) {
                        snapPreview = document.createElement('div');
                        snapPreview.className = 'aero-snap-preview';
                        document.body.appendChild(snapPreview);
                    }
                    snapPreview.style.display = 'block';
                    const tb = 40; // taskbar height
                    if (snapType === 'top') {
                        snapPreview.style.cssText = 'display:block;left:0;top:0;width:100vw;height:'+(window.innerHeight - tb)+'px;';
                    } else if (snapType === 'left') {
                        snapPreview.style.cssText = 'display:block;left:0;top:0;width:50vw;height:'+(window.innerHeight - tb)+'px;';
                    } else {
                        snapPreview.style.cssText = 'display:block;left:50vw;top:0;width:50vw;height:'+(window.innerHeight - tb)+'px;';
                    }
                    snapPreview.dataset.snap = snapType;
                } else if (snapPreview) {
                    snapPreview.style.display = 'none';
                    delete snapPreview.dataset.snap;
                }
            });
            document.addEventListener('mouseup', (e) => {
                if (!dragging) return;
                dragging = false;
                document.body.style.userSelect = '';

                // 执行 Aero Snap
                if (snapPreview && snapPreview.dataset.snap) {
                    const snap = snapPreview.dataset.snap;
                    const tb = 40;
                    if (snap === 'top') {
                        win.classList.add('maximized');
                    } else if (snap === 'left') {
                        win.classList.remove('maximized');
                        win.style.left = '0px';
                        win.style.top = '0px';
                        win.style.width = '50vw';
                        win.style.height = (window.innerHeight - tb) + 'px';
                    } else if (snap === 'right') {
                        win.classList.remove('maximized');
                        win.style.left = '50vw';
                        win.style.top = '0px';
                        win.style.width = '50vw';
                        win.style.height = (window.innerHeight - tb) + 'px';
                    }
                    snapPreview.remove();
                    snapPreview = null;
                    SoundFX && SoundFX.play('click');
                } else if (snapPreview) {
                    snapPreview.remove();
                    snapPreview = null;
                }
            });

            // 缩放
            let resizing = false, rsx, rsy, rsw, rsh;
            resizeHandle.addEventListener('mousedown', (e) => {
                resizing = true;
                rsx = e.clientX; rsy = e.clientY;
                rsw = win.offsetWidth; rsh = win.offsetHeight;
                e.stopPropagation();
            });
            document.addEventListener('mousemove', (e) => {
                if (!resizing) return;
                win.style.width = Math.max(320, rsw + e.clientX - rsx) + 'px';
                win.style.height = Math.max(240, rsh + e.clientY - rsy) + 'px';
            });
            document.addEventListener('mouseup', () => { resizing = false; });
        }

        // 控制按钮
        btnMin.addEventListener('click', (e) => { e.stopPropagation(); minimize(id); });
        btnMax.addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(id); });
        btnClose.addEventListener('click', (e) => { e.stopPropagation(); closeWindow(id); });
        titlebar.addEventListener('dblclick', () => toggleMaximize(id));
    }

    function addTaskbarItem(id, config) {
        const bar = document.getElementById('taskbar-windows');
        if (document.querySelector(`.taskbar-win[data-win="${id}"]`)) return;
        const item = document.createElement('div');
        item.className = 'taskbar-win active';
        item.dataset.win = id;
        const iconHtml = config.iconSvg
            ? `<span class="pxi-svg pxi-svg-16">${window.PixelIcons ? (window.PixelIcons[config.iconSvg] || '') : ''}</span>`
            : '';
        item.innerHTML = `<span>${iconHtml}</span><span>${config.title}</span>`;
        item.addEventListener('click', () => {
            const win = openWindows.get(id);
            if (!win) return;
            if (win.classList.contains('minimized')) {
                win.classList.remove('minimized');
                bringToFront(win);
            } else if (win.style.zIndex == zIndexCounter) {
                minimize(id);
            } else {
                bringToFront(win);
            }
        });
        bar.appendChild(item);
    }

    function minimize(id) {
        const win = openWindows.get(id);
        if (win) {
            win.classList.add('minimizing');
            setTimeout(() => {
                win.classList.remove('minimizing');
                win.classList.add('minimized');
            }, 200);
            const t = document.querySelector(`.taskbar-win[data-win="${id}"]`);
            if (t) t.classList.remove('active');
        }
    }

    function toggleMaximize(id) {
        if (isMobile()) return;
        const win = openWindows.get(id);
        if (win) win.classList.toggle('maximized');
    }

    function closeWindow(id) {
        const win = openWindows.get(id);
        if (win) {
            win.classList.add('closing');
            const t = document.querySelector(`.taskbar-win[data-win="${id}"]`);
            if (t) t.remove();
            setTimeout(() => {
                win.remove();
                openWindows.delete(id);
            }, 150);
            if (window.SoundFX) window.SoundFX.play('close');
        }
    }

    return { createWindow, closeWindow, minimize, toggleMaximize };
})();

window.WindowManager = WindowManager;
