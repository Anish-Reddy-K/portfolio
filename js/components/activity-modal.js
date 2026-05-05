(function() {
    'use strict';

    function init() {
        const modal = document.getElementById('activity-modal');
        const entries = Array.from(document.querySelectorAll('.activity-entry[data-images]'));
        if (!modal || entries.length === 0) return;

        const panel = modal.querySelector('.activity-modal__panel');
        const closeButton = modal.querySelector('.activity-modal__close');
        const prevButton = modal.querySelector('.activity-modal__nav--prev');
        const nextButton = modal.querySelector('.activity-modal__nav--next');
        const image = modal.querySelector('.activity-modal__image');
        const title = document.getElementById('activity-modal-title');
        const date = document.getElementById('activity-modal-date');
        const desc = document.getElementById('activity-modal-desc');
        const counter = document.getElementById('activity-modal-counter');

        let activeImages = [];
        let activeIndex = 0;
        let lastFocused = null;

        function updateImage() {
            const src = activeImages[activeIndex];
            image.src = src;
            image.alt = title.textContent ? `${title.textContent} image ${activeIndex + 1}` : '';
            counter.textContent = `${activeIndex + 1}/${activeImages.length}`;

            const hasMultipleImages = activeImages.length > 1;
            prevButton.hidden = !hasMultipleImages;
            nextButton.hidden = !hasMultipleImages;
        }

        function moveImage(direction) {
            if (activeImages.length < 2) return;
            activeIndex = (activeIndex + direction + activeImages.length) % activeImages.length;
            updateImage();
        }

        function openModal(entry) {
            activeImages = entry.dataset.images
                .split(',')
                .map((src) => src.trim())
                .filter(Boolean);

            if (activeImages.length === 0) return;

            activeIndex = 0;
            lastFocused = document.activeElement;
            title.textContent = entry.dataset.title || '';
            date.textContent = entry.dataset.date || '';
            desc.textContent = entry.dataset.description || '';
            updateImage();

            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            modal.removeAttribute('inert');
            document.body.classList.add('activity-modal-open');
            closeButton.focus();
        }

        function closeModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('inert', '');
            document.body.classList.remove('activity-modal-open');
            image.removeAttribute('src');

            if (lastFocused) {
                lastFocused.focus();
                lastFocused = null;
            }
        }

        entries.forEach((entry) => {
            entry.addEventListener('click', () => openModal(entry));
            entry.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(entry);
                }
            });
        });

        closeButton.addEventListener('click', closeModal);
        prevButton.addEventListener('click', () => moveImage(-1));
        nextButton.addEventListener('click', () => moveImage(1));

        modal.addEventListener('click', (event) => {
            if (!panel.contains(event.target)) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (!modal.classList.contains('is-open')) return;

            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                moveImage(-1);
            } else if (event.key === 'ArrowRight') {
                moveImage(1);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
