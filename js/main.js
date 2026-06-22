/* ============================================
   主控制 - 开机、引导、日夜切换、音效、时钟、事件
   ============================================ */

// ---------- 音效（Web Audio 合成，无需音频文件） ----------
const SoundFX = (function () {
    let enabled = true;
    let ctx = null;

    function ensureCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        return ctx;
    }

    function beep(freq, dur, type = 'square') {
        if (!enabled) return;
        try {
            const c = ensureCtx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start();
            osc.stop(c.currentTime + dur);
        } catch (e) { /* ignore */ }
    }

    function play(name) {
        switch (name) {
            case 'open': beep(660, 0.12); setTimeout(() => beep(880, 0.1), 60); break;
            case 'close': beep(440, 0.12); setTimeout(() => beep(330, 0.1), 60); break;
            case 'click': beep(800, 0.06); break;
            case 'easter': beep(523, 0.1); setTimeout(() => beep(659, 0.1), 80); setTimeout(() => beep(784, 0.15), 160); break;
            default: break;
        }
    }

    function toggle() { enabled = !enabled; return enabled; }

    return { play, toggle, get enabled() { return enabled; } };
})();
window.SoundFX = SoundFX;

// ---------- 开窗口 ----------
function openModule(id) {
    const cfg = WindowContent[id];
    if (!cfg) return;
    WindowManager.createWindow(id, cfg);
    closeHintFn();
    closeStartMenu();
}

// ---------- 引导提示 ----------
function closeHintFn() {
    const hint = document.getElementById('hint');
    if (hint) hint.classList.add('hidden');
}
window.closeHint = closeHintFn;

// ---------- 开始菜单 ----------
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    const btn = document.getElementById('start-btn');
    menu.classList.toggle('open');
    btn.classList.toggle('active');
    SoundFX.play('click');
}
function closeStartMenu() {
    document.getElementById('start-menu').classList.remove('open');
    document.getElementById('start-btn').classList.remove('active');
}

// ---------- 日夜切换 ----------
function toggleTheme() {
    const isNight = document.body.classList.toggle('night');
    const themeIcon = document.querySelector('#theme-toggle .pxi');
    if (themeIcon) {
        themeIcon.className = isNight ? 'pxi pxi-16 pxi-moon' : 'pxi pxi-16 pxi-sun';
    }
    SoundFX.play('click');
}

// ---------- 时钟 ----------
function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('tray-clock').textContent = `${hh}:${mm}`;
}

// ---------- 连击彩蛋 ----------
let clickStreak = {};
function registerEasterEgg(id) {
    clickStreak[id] = (clickStreak[id] || 0) + 1;
    clearTimeout(clickStreak[id + '_timer']);
    clickStreak[id + '_timer'] = setTimeout(() => { clickStreak[id] = 0; }, 800);
    if (clickStreak[id] >= 3) {
        clickStreak[id] = 0;
        SoundFX.play('easter');
        showEasterEgg();
    }
}
function showEasterEgg() {
    const egg = document.createElement('div');
    egg.innerHTML = '<span class="pxi pxi-16 pxi-party" style="margin-right:8px;"></span>彩蛋触发！(此处后续放隐藏内容)';
    egg.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
        background:#fffbe6;border:3px solid #000;box-shadow:4px 4px 0 rgba(0,0,0,0.3);
        padding:20px;font-family:'Press Start 2P',cursive;font-size:10px;z-index:9999;`;
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 1500);
}

// ---------- 桌面右键上下文菜单 ----------
function showContextMenu(x, y) {
    const menu = document.getElementById('ctx-menu');
    const mw = 200, mh = 220;
    const px = Math.min(x, window.innerWidth - mw - 4);
    const py = Math.min(y, window.innerHeight - mh - 4);
    menu.style.left = px + 'px';
    menu.style.top = py + 'px';
    menu.classList.add('open');
}
function hideContextMenu() {
    document.getElementById('ctx-menu').classList.remove('open');
}
function handleCtxAction(act) {
    switch (act) {
        case 'refresh':
            SoundFX.play('click');
            const desk = document.getElementById('desktop');
            desk.style.opacity = '0.6';
            setTimeout(() => { desk.style.opacity = '1'; }, 150);
            break;
        case 'personalize':
            openModule('about');
            break;
        default:
            SoundFX.play('click');
            break;
    }
}

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    // 注入 SVG 图标到桌面和开始菜单
    if (window.PixelIcons) {
        ['ai','ui','product','art','about','trash','contact'].forEach((key) => {
            const el = document.getElementById('icon-' + key);
            if (el && PixelIcons[key]) el.innerHTML = PixelIcons[key];
            const smi = document.getElementById('smi-' + key);
            if (smi && PixelIcons[key]) smi.innerHTML = PixelIcons[key];
        });
    }

    // 开机动画
    setTimeout(() => {
        document.getElementById('boot-screen').classList.add('hidden');
    }, 2400);

    // 桌面图标：双击打开 + 单击选中 + 连击彩蛋
    document.querySelectorAll('.desktop-icon').forEach((icon) => {
        const id = icon.dataset.window;
        icon.addEventListener('dblclick', () => openModule(id));
        icon.addEventListener('click', () => { SoundFX.play('click'); registerEasterEgg(id); });
        icon.addEventListener('keydown', (e) => { if (e.key === 'Enter') openModule(id); });
        // 手机端单击即打开
        if (window.matchMedia('(max-width: 768px)').matches) {
            icon.addEventListener('click', () => openModule(id));
        }
    });

    // 开始菜单
    document.getElementById('start-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStartMenu();
    });
    document.querySelectorAll('.start-menu-item').forEach((item) => {
        item.addEventListener('click', () => openModule(item.dataset.window));
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) closeStartMenu();
    });

    // 托盘按钮
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('sound-toggle').addEventListener('click', () => {
        const on = SoundFX.toggle();
        const soundIcon = document.querySelector('#sound-toggle .pxi');
        if (soundIcon) {
            soundIcon.className = on ? 'pxi pxi-16 pxi-sound-on' : 'pxi pxi-16 pxi-sound-off';
        }
    });

    // 桌面右键菜单
    const desktop = document.getElementById('desktop');
    desktop.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.desktop-icon') || e.target.closest('.window')) return;
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
    });
    document.getElementById('ctx-menu').addEventListener('click', (e) => {
        const item = e.target.closest('.ctx-item');
        if (item && !item.classList.contains('disabled')) {
            handleCtxAction(item.dataset.act);
            hideContextMenu();
        }
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#ctx-menu')) hideContextMenu();
    });
    document.addEventListener('contextmenu', (e) => {
        if (!e.target.closest('#desktop')) hideContextMenu();
    });

    // 电源按钮 → 重新开机动画
    document.getElementById('start-power').addEventListener('click', () => {
        closeStartMenu();
        const boot = document.getElementById('boot-screen');
        boot.classList.remove('hidden');
        setTimeout(() => { boot.classList.add('hidden'); }, 2400);
        SoundFX.play('close');
    });

    // 时钟
    updateClock();
    setInterval(updateClock, 1000);

    // 键盘彩蛋：输入 "hello"
    let typed = '';
    document.addEventListener('keydown', (e) => {
        if (e.key.length === 1) typed = (typed + e.key).slice(-5).toLowerCase();
        if (typed === 'hello') { SoundFX.play('easter'); showEasterEgg(); typed = ''; }
    });
});
