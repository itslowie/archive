const elementos = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementos.forEach((elemento) => observador.observe(elemento));
} else {
    elementos.forEach((elemento) => elemento.classList.add('visivel'));
}