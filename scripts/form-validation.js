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

    const resolveEndpoint = () => {
        const action = contactForm?.getAttribute('action') || '/enviar-contato';
        const isLocal =
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1';

        if (isLocal && window.location.port !== '3000') {
            return 'http://localhost:3000/enviar-contato';
        }

        return action;
    };

    // Adiciona o listener de evento ao formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // 1. Impede o redirecionamento padrão do navegador
            event.preventDefault();

            // 2. Prepara os dados para envio (JSON)
            const payload = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                message: this.message.value.trim()
            };

            // 3. Envia os dados para o back-end em segundo plano
            fetch(resolveEndpoint(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(async response => {
                // 4. Se o envio foi bem-sucedido...
                if (response.ok) {
                    this.reset();       // Limpa os campos do formulário
                    openModal();        // Abre o seu modal de sucesso
                } else {
                    const data = await response.json().catch(() => null);
                    const message = data?.error || 'Ocorreu um erro ao enviar o formulário. Tente novamente.';
                    alert(message);
                }
            }).catch(error => {
                // Se houve um erro de rede
                console.error('Erro de rede:', error);
                alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
            });
        });
    }
});
