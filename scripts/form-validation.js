document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário e do modal
    const contactForm = document.querySelector('.contact-form');
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
    contactForm.addEventListener('submit', async (event) => {
        // 1. Impede o envio padrão que recarregaria a página
        event.preventDefault(); 

        // 2. Pega os valores dos campos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 3. Faz a validação. Se algo estiver errado, mostra um alerta e para a execução com 'return'
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return; // Para a função aqui
        }

        if (name.length < 2) {
            alert('O nome deve ter pelo menos 2 caracteres.');
            return; // Para a função aqui
        }

        console.log('Formulário válido! Enviando dados...'); // Esta linha só será alcançada se a validação acima passar

        // 4. Se a validação passou, o código continua para o envio dos dados
        try {
            const response = await fetch('http://localhost:3000/enviar-contato', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                contactForm.reset(); // Limpa os campos
                openModal();         // Abre o modal de sucesso
            } else {
                alert('Erro: ' + result.error);
            }
        } catch (error) {
            console.error('Falha ao enviar o formulário:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        }
    });
});