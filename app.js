document.addEventListener("DOMContentLoaded", () => {
    const buscarPopulares = async () => {
        
        const resposta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d2be3c3ca677490a327420b8916ea672&language=pt-BR')
        const dados = await resposta.json()
        
        console.log(dados)
        
        for (const filme of dados.results) {
            const card = document.createElement('div');
        }
    }
    buscarPopulares()
});

