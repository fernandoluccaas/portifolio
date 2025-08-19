document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário e os elementos do modal
    const contactForm = document.getElementById('contact-form');
    const modalOverlay = document.getElementById('modal-overlay');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Funções para controlar o modal
    const openModal = () => {
        modalOverlay.classList.add('visible');
        successModal.classList.add('visible');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('visible');
        successModal.classList.remove('visible');
    };

    // Adiciona eventos para fechar o modal
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Adiciona o listener de evento ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // 1. Impede o redirecionamento padrão do navegador
            event.preventDefault();

            // 2. Prepara os dados para envio
            const formData = new FormData(this);
            
            // 3. Envia os dados para o Formspree em segundo plano
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Pede ao Formspree para responder com JSON (sem redirecionar)
                }
            }).then(response => {
                // 4. Se o envio foi bem-sucedido...
                if (response.ok) {
                    this.reset();       // Limpa os campos do formulário
                    openModal();        // Abre o seu modal de sucesso
                } else {
                    // Se houve um erro no Formspree
                    alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
                }
            }).catch(error => {
                // Se houve um erro de rede
                console.error('Erro de rede:', error);
                alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
            });
        });
    }
});