/*
  JavaScript Final: Animação que se repete ao entrar e sair da tela
*/
document.addEventListener("DOMContentLoaded", function() {

  const revealElements = document.querySelectorAll('.reveal');

  // Adiciona as classes de direção alternadamente (esta parte não muda)
  revealElements.forEach((element, index) => {
    if (index % 2 === 0) {
      element.classList.add('from-left');
    } else {
      element.classList.add('from-right');
    }
  });

  // A única mudança está aqui dentro do IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se o elemento ESTÁ visível na tela
      if (entry.isIntersecting) {
        // Adiciona a classe 'visible' para disparar a animação de entrada
        entry.target.classList.add('visible');
      } 
      // Se o elemento NÃO ESTÁ mais visível na tela
      else {
        // Remove a classe 'visible' para que ele possa ser animado novamente quando entrar
        entry.target.classList.remove('visible');
      }
    });
  }, {
    // Aumentamos um pouco o threshold para a animação de saída ficar mais natural
    threshold: 0.15 
  });

  // Pede ao observador para observar cada elemento (esta parte não muda)
  revealElements.forEach(element => {
    observer.observe(element);
  });

});