import selecionaCotacao from './imprimeCotacao.js';
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

function geraHorario() {
    let data = new Date();
    return data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
}

function adicionaDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', event => {
   let tempo = geraHorario();
   let valor = event.data.ask;
    selecionaCotacao('dolar', valor);
   adicionaDados(graficoParaDolar, tempo, valor);
});

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    },
});

// Instancia de novo worker
let workerIene = new Worker('./script/workers/workerIene.js')
workerIene.postMessage('iene');
workerIene.addEventListener('message', event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionaDados(graficoParaIene, tempo, valor);
    selecionaCotacao('iene', valor);
});