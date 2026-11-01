const janelaCategoria = document.querySelector('#janela-categoria');
const tituloJanela = document.querySelector('#titulo-janela');
const corpoJanela = document.querySelector('#corpo-janela');
const fecharJanela = document.querySelector('.fechar-janela');
const cabecalhoJanela = document.querySelector('.janela-cabecalho');
let arrastoJanela = null;
let observadorConteudo = null;

document.querySelectorAll('.categoria[data-modal]').forEach((categoria) => {
    categoria.addEventListener('click', () => {
        tituloJanela.textContent = categoria.querySelector('h3').textContent;
        corpoJanela.title = tituloJanela.textContent;
        corpoJanela.src = categoria.dataset.modal;
        janelaCategoria.showModal();
    });
});

corpoJanela.addEventListener('load', () => {
    if (observadorConteudo) {
        observadorConteudo.disconnect();
        observadorConteudo = null;
    }

    corpoJanela.style.height = '';
    const documento = corpoJanela.contentDocument;
    if (!documento || !documento.body.classList.contains('pagina-interesses')) {
        corpoJanela.removeAttribute('scrolling');
        return;
    }

    corpoJanela.setAttribute('scrolling', 'no');

    const conteudoInteresses = documento.querySelector('.interesses');
    const ajustarAltura = () => {
        corpoJanela.style.height = `${documento.documentElement.scrollHeight}px`;
    };

    ajustarAltura();
    observadorConteudo = new ResizeObserver(ajustarAltura);
    observadorConteudo.observe(conteudoInteresses);
});

fecharJanela.addEventListener('click', () => {
    janelaCategoria.close();
});

cabecalhoJanela.addEventListener('pointerdown', (evento) => {
    if (evento.button !== 0 || evento.target.closest('.fechar-janela')) return;

    const limites = janelaCategoria.getBoundingClientRect();
    arrastoJanela = {
        pointerId: evento.pointerId,
        deslocamentoX: evento.clientX - limites.left,
        deslocamentoY: evento.clientY - limites.top
    };

    janelaCategoria.style.margin = '0';
    janelaCategoria.style.left = `${limites.left}px`;
    janelaCategoria.style.top = `${limites.top}px`;
    janelaCategoria.style.right = 'auto';
    janelaCategoria.style.bottom = 'auto';
    cabecalhoJanela.setPointerCapture(evento.pointerId);
    evento.preventDefault();
});

cabecalhoJanela.addEventListener('pointermove', (evento) => {
    if (!arrastoJanela || arrastoJanela.pointerId !== evento.pointerId) return;

    const limites = janelaCategoria.getBoundingClientRect();
    const esquerda = Math.min(
        Math.max(0, evento.clientX - arrastoJanela.deslocamentoX),
        window.innerWidth - limites.width
    );
    const topo = Math.min(
        Math.max(0, evento.clientY - arrastoJanela.deslocamentoY),
        window.innerHeight - cabecalhoJanela.offsetHeight
    );

    janelaCategoria.style.left = `${esquerda}px`;
    janelaCategoria.style.top = `${topo}px`;
});

const encerrarArrasto = () => {
    arrastoJanela = null;
};

cabecalhoJanela.addEventListener('pointerup', encerrarArrasto);
cabecalhoJanela.addEventListener('pointercancel', encerrarArrasto);

janelaCategoria.addEventListener('close', () => {
    janelaCategoria.style.margin = '';
    janelaCategoria.style.left = '';
    janelaCategoria.style.top = '';
    janelaCategoria.style.right = '';
    janelaCategoria.style.bottom = '';
});

janelaCategoria.addEventListener('click', (evento) => {
    if (evento.target === janelaCategoria) {
        janelaCategoria.close();
    }
});