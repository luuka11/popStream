document.addEventListener("DOMContentLoaded", () => {

    const criarCard = (filme) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${filme.poster_path ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 'assets/sem-poster.png'}" alt="${filme.title}">
            <div class="card-info">
                <h3 class="card-titulo">${filme.title}</h3>
                <p class="card-nota">⭐ ${filme.vote_average.toFixed(1)}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            document.getElementById('modalTitulo').textContent = filme.title;
            document.getElementById('modalSinopse').textContent = filme.overview || 'Sinopse não disponível';
            document.getElementById('modal').classList.add('ativo');
        });

        return card;
    };

    const buscarPopulares = async () => {
        const resposta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0d1bb834bd20684dfdf4e3fb16c15123&language=pt-BR')
        const dados = await resposta.json()

        const lista = document.getElementById('listaFilmes');

        for (const filme of dados.results) {
            const card = criarCard(filme);
            lista.appendChild(card);
        }
    }

    document.getElementById('btnBuscar').addEventListener('click', async () => {
        const termo = document.getElementById('inputBusca').value.trim();

        if (!termo) return;

        const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0d1bb834bd20684dfdf4e3fb16c15123&language=pt-BR&query=${termo}`);
        const dados = await resposta.json();

        const lista = document.getElementById('listaFilmes');
        lista.innerHTML = '';

        for (const filme of dados.results) {
            const card = criarCard(filme);
            lista.appendChild(card);
        }
    });

    document.getElementById('fecharModal').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('ativo');
    });

    document.getElementById('modal').addEventListener('click', (evento) => {
        if (evento.target === document.getElementById('modal')) {
            document.getElementById('modal').classList.remove('ativo');
        }
    });

    buscarPopulares();

    document.getElementById('inputBusca').addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            document.getElementById('btnBuscar').click();
        }
    });
});