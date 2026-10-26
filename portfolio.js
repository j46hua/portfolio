document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const pageIndicator = document.getElementById('pageIndicator');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isAnimating = false;

    function updateIndicator() {
        pageIndicator.innerText = `${currentSlide + 1}/${totalSlides}`;
    }

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        if (index >= totalSlides) index = 0;
        
        const oldSlide = slides[currentSlide];
        oldSlide.classList.remove('active');
        oldSlide.classList.remove('glitch-anim');

        currentSlide = index;
        const newSlide = slides[currentSlide];

        if (currentSlide === 4) {
            document.body.classList.add('error-state');
        } else {
            document.body.classList.remove('error-state');
        }

        newSlide.classList.add('active');
        
        void newSlide.offsetWidth; 
        newSlide.classList.add('glitch-anim');

        updateIndicator();

        setTimeout(() => {
            isAnimating = false;
        }, 400); 
    }

    function nextPage() {
        goToSlide(currentSlide + 1);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            nextPage();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.social-link')) {
            nextPage();
        }
    });

    updateIndicator();
});