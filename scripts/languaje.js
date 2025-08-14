document.addEventListener('DOMContentLoaded', () => {
    const langToggleButton = document.getElementById('lang-toggle-button');

    const translatePage = (language) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            const translation = translations[language]?.[key]; 

            if (translation) {
                if (key.includes('placeholder')) {
                    element.placeholder = translation;
                } else if (key.includes('_alt')) { 
                    element.alt = translation;
                }
                else {
                    const img = element.querySelector('img');
                    if (img) {
                        element.innerHTML = translation + ' ' + img.outerHTML;
                    } else {
                        element.innerHTML = translation;
                    }
                }
            }
        });
        
        document.documentElement.lang = language;
        langToggleButton.textContent = language === 'pt' ? 'EN' : 'PT-BR';
    };

    const savedLanguage = localStorage.getItem('language') || 'pt';
    translatePage(savedLanguage);
    
    langToggleButton.addEventListener('click', () => {
        const currentLanguage = document.documentElement.lang;
        const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
        translatePage(newLanguage);
        localStorage.setItem('language', newLanguage);
    });
});