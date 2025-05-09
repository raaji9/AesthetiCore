document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const imageContainer = document.getElementById('image-container');
    const moreButton = document.getElementById('more-button');
    const linkedinLink = document.getElementById('linkedin-link');
    const githubLink = document.getElementById('github-link');
    const imagesPerLoad = 8;
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

    // Update footer links
    linkedinLink.href = 'https://www.linkedin.com/in/rajaram-parida/';
    githubLink.href = 'https://github.com/raaji9/';

    function loadImages(count) {
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            let randomId = Math.floor(Math.random() * 5000) + 1;  // Increased ID range for more variety
            const imageUrl = `https://picsum.photos/id/${randomId}/400/250`;

            img.src = imageUrl;
            img.alt = 'Random image';
            img.classList.add('image-item');
            img.dataset.imageId = randomId; // Store the image ID

            // Add error handling for images
            img.addEventListener('error', function() {
                console.warn('Image failed to load, retrying with new ID:', this.src);
                let newRandomId;
                do {
                    newRandomId = Math.floor(Math.random() * 5000) + 1;
                } while (newRandomId == this.dataset.imageId); // Ensure new ID is different
                this.src = `https://picsum.photos/id/${newRandomId}/400/250`;
                this.dataset.imageId = newRandomId;
            });

            imageContainer.appendChild(img);

            img.addEventListener('click', function () {
                const imageId = this.dataset.imageId;
                const originalImageUrl = `https://picsum.photos/id/${imageId}/0/0`;  // 0/0 for original size

                fetch(originalImageUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `image_${imageId}.jpg`; // Use image ID in filename
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    })
                    .catch(error => console.error('Error downloading image:', error));
            });
        }
    }

    // Initial load
    loadImages(imagesPerLoad);

    moreButton.addEventListener('click', function () {
        loadImages(imagesPerLoad);
    });

    // Theme toggle
    themeToggle.addEventListener('click', function () {
        body.classList.add('theme-transition');
        body.classList.toggle('dark-mode');
        themeToggle.innerText = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    });

    // Show/hide buttons on scroll
    window.addEventListener('scroll', () => {
        // Scroll to Top button
        if (window.scrollY === 0) {
            scrollToTopBtn.classList.add('hidden');
        } else {
            scrollToTopBtn.classList.remove('hidden');
        }

        // Scroll to Bottom button
        // Add a small buffer (e.g., 5 pixels) for more robust detection of the bottom
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
            scrollToBottomBtn.classList.add('hidden');
        } else {
            scrollToBottomBtn.classList.remove('hidden');
        }
    });

    // Scroll to top function
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll to bottom function
    scrollToBottomBtn.addEventListener('click', () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
});