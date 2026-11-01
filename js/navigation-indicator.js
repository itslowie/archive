const navegacao = document.querySelector('.navegacao');

if (navegacao) {
    let linkSobMouse = null;
    let linkEmFoco = null;

    const atualizarIndicador = () => {
        const link = linkSobMouse || linkEmFoco;

        if (!link) {
            navegacao.classList.remove('indicador-visivel');
            return;
        }

        const limitesNavegacao = navegacao.getBoundingClientRect();
        const limitesLink = link.getBoundingClientRect();

        navegacao.style.setProperty(
            '--indicador-left',
            `${limitesLink.left - limitesNavegacao.left}px`
        );
        navegacao.style.setProperty('--indicador-width', `${limitesLink.width}px`);
        navegacao.classList.add('indicador-visivel');
    };

    navegacao.addEventListener('pointermove', (evento) => {
        if (evento.pointerType === 'touch') return;

        linkSobMouse = evento.target.closest('a');
        atualizarIndicador();
    });

    navegacao.addEventListener('pointerleave', () => {
        linkSobMouse = null;
        atualizarIndicador();
    });

    navegacao.addEventListener('focusin', (evento) => {
        linkEmFoco = evento.target.closest('a');
        atualizarIndicador();
    });

    navegacao.addEventListener('focusout', (evento) => {
        if (!navegacao.contains(evento.relatedTarget)) {
            linkEmFoco = null;
            atualizarIndicador();
        }
    });

    window.addEventListener('resize', atualizarIndicador);
}
