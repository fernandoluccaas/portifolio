document.addEventListener('DOMContentLoaded', () => {
    const menuHamburger = document.getElementById('menu-hamburger');
    const menuNav = document.getElementById('menu-nav');

    if (menuHamburger && menuNav) {
        menuHamburger.addEventListener('click', () => {
            menuNav.classList.toggle('active');
            const isExpanded = menuNav.classList.contains('active');
            menuHamburger.setAttribute('aria-expanded', isExpanded);
        });
    }
});