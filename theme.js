document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema salvo ou o padrão
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.removeAttribute('data-theme');
        }
    };

    // Pega o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Aplica o tema salvo ao carregar a página
    // Se não houver tema salvo, o padrão (escuro) será usado
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // Adiciona o evento de clique no botão
    themeToggleButton.addEventListener('click', () => {
        // Verifica se o tema atual é o claro
        const isLight = body.getAttribute('data-theme') === 'light';
        
        if (isLight) {
            // Se for claro, muda para escuro
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Se for escuro, muda para claro
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });
});