document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-links[href^="#"]');

    const sections = document.querySelectorAll('section[id]');

    const removeActiveClasses = () => {
        menuLinks.forEach(link => {
            link.classList.remove('active');
        });
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActiveClasses();

                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.menu-links[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-30% 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});