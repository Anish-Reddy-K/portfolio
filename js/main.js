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

        initNavbarSectionHighlight();
    }

    function initNavbarSectionHighlight() {
        const links = Array.from(document.querySelectorAll('.navbar__link[href^="#"]'));
        const sections = links
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        if (!links.length || !sections.length) {
            return;
        }

        function setActiveSection() {
            const anchorLine = window.innerHeight * 0.38;
            let activeSection = null;

            sections.forEach((section) => {
                if (section.getBoundingClientRect().top <= anchorLine) {
                    activeSection = section;
                }
            });

            links.forEach((link) => {
                const isActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
                link.classList.toggle('is-active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        setActiveSection();
        window.addEventListener('scroll', setActiveSection, { passive: true });
        window.addEventListener('resize', setActiveSection);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
