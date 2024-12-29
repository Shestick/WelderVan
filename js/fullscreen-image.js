document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const body = document.body;
    let currentImageIndex = 0;
    let images = [];

    if (gallery) {
        images = Array.from(gallery.querySelectorAll('img'));
        
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                showFullscreenImage(e.target);
            }
        });
    }

    function showFullscreenImage(clickedImage) {
        currentImageIndex = images.indexOf(clickedImage);
        
        const fullscreenContainer = document.createElement('div');
        fullscreenContainer.classList.add('fullscreen-container');
        
        const fullscreenImage = document.createElement('img');
        fullscreenImage.src = clickedImage.src;
        fullscreenImage.alt = clickedImage.alt;
        fullscreenImage.classList.add('fullscreen-image');

        const prevButton = createNavigationButton('←', 'previous-image');
        const nextButton = createNavigationButton('→', 'next-image');

        fullscreenContainer.appendChild(prevButton);
        fullscreenContainer.appendChild(fullscreenImage);
        fullscreenContainer.appendChild(nextButton);
        body.appendChild(fullscreenContainer);

        body.classList.add('fullscreen-active');

        fullscreenContainer.addEventListener('click', function(e) {
            if (e.target === fullscreenContainer) {
                body.removeChild(fullscreenContainer);
                body.classList.remove('fullscreen-active');
            }
        });

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateImage(-1);
        });

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateImage(1);
        });

        document.addEventListener('keydown', handleKeyNavigation);
    }

    function createNavigationButton(text, className) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('fullscreen-nav-button', className);
        button.setAttribute('aria-label', className === 'previous-image' ? 'Previous image' : 'Next image');
        return button;
    }

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        const fullscreenImage = document.querySelector('.fullscreen-image');
        fullscreenImage.src = images[currentImageIndex].src;
        fullscreenImage.alt = images[currentImageIndex].alt;
    }

    function handleKeyNavigation(e) {
        if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        } else if (e.key === 'Escape') {
            const fullscreenContainer = document.querySelector('.fullscreen-container');
            if (fullscreenContainer) {
                body.removeChild(fullscreenContainer);
                body.classList.remove('fullscreen-active');
            }
            document.removeEventListener('keydown', handleKeyNavigation);
        }
    }
});