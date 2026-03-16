document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const navContainer = document.querySelector('.carousel-nav');

    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    // Cria os pontos de navegação dinamicamente
    navContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-nav-dot');
        dot.addEventListener('click', () => {
            stopAutoPlay();
            updateCarousel(i);
        });
        navContainer.appendChild(dot);
    });
    const navDots = Array.from(navContainer.children);

    // Função que atualiza as classes de todos os slides
    function updateCarousel(targetIndex) {
        // Calcula os índices do slide anterior e do próximo, garantindo o loop
        const prevIndex = (targetIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (targetIndex + 1) % totalSlides;

        // Limpa todas as classes especiais de todos os slides
        slides.forEach(slide => {
            slide.classList.remove('current-slide', 'prev-slide', 'next-slide');
        });

        // Aplica as classes corretas nos slides visíveis
        slides[targetIndex].classList.add('current-slide');
        slides[prevIndex].classList.add('prev-slide');
        slides[nextIndex].classList.add('next-slide');

        // Atualiza os pontos de navegação
        navDots.forEach((dot, index) => {
            dot.classList.toggle('current-slide', index === targetIndex);
        });

        currentIndex = targetIndex;
    }

    // Funções para autoplay e navegação
    function showNextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(nextIndex);
    }
    
    function showPrevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(prevIndex);
    }

    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(showNextSlide, 2000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Eventos dos botões
    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        showNextSlide();
    });

    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        showPrevSlide();
    });

    // Inicia tudo
    updateCarousel(0);
    startAutoPlay();
});