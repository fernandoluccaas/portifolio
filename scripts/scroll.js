document.addEventListener("DOMContentLoaded", function() {

  const revealElements = document.querySelectorAll('.reveal');

  revealElements.forEach((element, index) => {
    if (index % 2 === 0) {
      element.classList.add('from-left');
    } else {
      element.classList.add('from-right');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } 
      else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15 
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });

});