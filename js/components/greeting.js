(function() {
    'use strict';

    const TIMING = {
        ROTATION_INTERVAL: 3600,
        FADE_DURATION: 800
    };

    const GREETINGS = [
        { text: 'Hello',     lang: 'en' },
        { text: 'Hola',      lang: 'es' },
        { text: 'Bonjour',   lang: 'fr' },
        { text: 'Hallo',     lang: 'de' },
        { text: 'Ciao',      lang: 'it' },
        { text: 'Olá',       lang: 'pt' },
        { text: 'Привет',    lang: 'ru' },
        { text: 'こんにちは', lang: 'ja' },
        { text: '你好',       lang: 'zh' },
        { text: '안녕하세요',  lang: 'ko' },
        { text: 'नमस्ते',      lang: 'hi' },
        { text: 'مرحبا',      lang: 'ar' }
    ];

    function init() {
        const el = document.getElementById('greeting');
        if (!el) return;

        let index = Math.floor(Math.random() * GREETINGS.length);

        function show() {
            const g = GREETINGS[index];
            el.textContent = g.text;
            el.setAttribute('lang', g.lang);
            requestAnimationFrame(() => el.classList.add('is-visible'));
        }

        function hide() {
            el.classList.remove('is-visible');
        }

        function cycle() {
            show();
            const visibleTime = TIMING.ROTATION_INTERVAL - TIMING.FADE_DURATION;
            setTimeout(() => {
                hide();
                setTimeout(() => {
                    index = (index + 1) % GREETINGS.length;
                    cycle();
                }, TIMING.FADE_DURATION);
            }, visibleTime);
        }

        cycle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
