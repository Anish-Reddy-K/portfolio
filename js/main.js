(function() {
    'use strict';

    function init() {
        const container = document.getElementById('background-container');
        const canvas = document.createElement('canvas');
        canvas.id = 'starfield-canvas';
        canvas.className = 'starfield-background';
        container.appendChild(canvas);

        if (window.darkStarfieldBg && window.darkStarfieldBg.init) {
            window.darkStarfieldBg.init('starfield-canvas');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
