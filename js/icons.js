/* ============================================
   8-bit SVG 像素图标库
   viewBox=16x16, shape-rendering: crispEdges
   ============================================ */

const PixelIcons = {
    ai: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <rect x="3" y="1" width="10" height="12" fill="#ff003c"/>
        <polygon points="4,2 10,2 6,8 12,8 5,12 7,7 3,7" fill="#000000"/>
        <rect x="1" y="3" width="6" height="2" fill="#d49b00"/>
        <rect x="1" y="5" width="14" height="9" fill="#eab308"/>
        <polygon points="1,14 3,7 15,7 13,14" fill="#facc15"/>
        <rect x="1" y="14" width="12" height="1" fill="#ca8a04"/>
    </svg>`,

    ui: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <rect x="1" y="2" width="14" height="12" fill="#e2e8f0"/>
        <rect x="1" y="2" width="14" height="3" fill="#3b82f6"/>
        <rect x="13" y="3" width="1" height="1" fill="#ef4444"/>
        <rect x="11" y="3" width="1" height="1" fill="#ffffff"/>
        <rect x="3" y="6" width="4" height="4" fill="#94a3b8"/>
        <rect x="8" y="6" width="5" height="1" fill="#0f172a"/>
        <rect x="8" y="8" width="4" height="1" fill="#64748b"/>
        <rect x="8" y="10" width="3" height="1" fill="#64748b"/>
        <rect x="3" y="12" width="10" height="1" fill="#cbd5e1"/>
    </svg>`,

    product: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <rect x="2" y="2" width="12" height="12" fill="#1e293b"/>
        <rect x="2" y="2" width="12" height="3" fill="#0f172a"/>
        <rect x="12" y="3" width="1" height="1" fill="#ef4444"/>
        <rect x="4" y="6" width="3" height="3" fill="#38bdf8"/>
        <rect x="9" y="10" width="4" height="4" fill="#10b981"/>
        <rect x="10" y="5" width="2" height="2" fill="#f59e0b"/>
        <rect x="5" y="9" width="1" height="3" fill="#475569"/>
        <rect x="6" y="11" width="3" height="1" fill="#475569"/>
        <rect x="8" y="6" width="2" height="1" fill="#475569"/>
    </svg>`,

    art: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <polygon points="8,2 14,5 8,8 2,5" fill="#333333"/>
        <polygon points="2,5 8,8 8,14 2,11" fill="#1a1a1a"/>
        <polygon points="14,5 8,8 8,14 14,11" fill="#000000"/>
        <rect x="7" y="6" width="2" height="2" fill="#ff003c"/>
        <rect x="8" y="8" width="1" height="3" fill="#ff003c"/>
        <polygon points="4,13 12,13 10,15 6,15" fill="#666666"/>
    </svg>`,

    about: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <path d="M4,15 L4,12 C4,10 6,9 8,9 C10,9 12,10 12,12 L12,15 Z" fill="#1e293b"/>
        <circle cx="8" cy="5" r="3" fill="#1e293b"/>
        <rect x="5" y="4" width="6" height="2" fill="#39ff14"/>
        <rect x="11" y="4" width="1" height="1" fill="#ffffff"/>
    </svg>`,

    trash: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <polygon points="4,14 12,14 13,4 3,4" fill="rgba(0,0,0,0.3)"/>
        <rect x="5" y="6" width="3" height="2" fill="#39ff14"/>
        <rect x="8" y="7" width="2" height="3" fill="#ff00ff"/>
        <rect x="6" y="10" width="4" height="2" fill="#ffffff"/>
        <polygon points="4,14 12,14 14,3 2,3" fill="rgba(200, 230, 255, 0.4)"/>
        <rect x="2" y="3" width="12" height="1" fill="rgba(255, 255, 255, 0.8)"/>
        <rect x="3" y="4" width="10" height="1" fill="rgba(255, 255, 255, 0.5)"/>
        <rect x="6" y="5" width="1" height="8" fill="rgba(255, 255, 255, 0.5)"/>
        <rect x="9" y="5" width="1" height="8" fill="rgba(255, 255, 255, 0.5)"/>
    </svg>`,

    // 小尺寸辅助图标（开始菜单/标题栏用 16-22px）
    contact: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="px-svg">
        <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#7a9fc4" stroke-width="1"/>
        <polyline points="1,3 8,8 15,3" fill="none" stroke="#7a9fc4" stroke-width="1"/>
    </svg>`,
};

window.PixelIcons = PixelIcons;
