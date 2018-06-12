const NAME_KEY_LOCAL_STORAGE     = "Pets";

start();

/**
 * @description Função principal do arquivo
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start() {
    var btnVisualizar = document.getElementById("buttonVisualizar");
    btnVisualizar.onclick = function() {
        executaRelatorioPet();
    };
}

/**
 * @description Monta condições gerais do relatório filtros, montagem etc.
 */
function executaRelatorioPet(){
    
    dadosRelatorio = loadLocalStorage(NAME_KEY_LOCAL_STORAGE);
    if(dadosRelatorio.length < 1 ){
        alert("Não existem registros com esses filtros.");
    }else{
        populaTabela(dadosRelatorio);
    }
}

/**
 * @description Função monta e apresenta relatório ao usuário.
 * @param {Array} dadosRelatorio array contendo dados a serem apresentados no relatório.
 */
function populaTabela(dadosRelatorio) {

    var table = document.getElementById('clientes_table');

    limpaTabela(table);

    for (var i = 0; i < dadosRelatorio.length; i++) {
        
        //Pegando registro atual.
        var dadoRelatorio = dadosRelatorio[i]; 

        //Criando linha
        var tr = document.createElement('tr');

        //Criando Colunas
        var tdCodPet   = document.createElement("td");
        var tdNomePet  = document.createElement('td');
        var tdEspecie  = document.createElement('td');
        var tdRaca     = document.createElement('td');
        var tdCor      = document.createElement('td');
        var tdSexo     = document.createElement('td');
        var tdNasci    = document.createElement('td');
        var tdTamanho  = document.createElement('td');
        var tdPelagem  = document.createElement('td'); 
        
        //Setando conteudo das colunas
        tdCodPet.innerHTML  = dadoRelatorio.codigoPet;
        tdNomePet.innerHTML = dadoRelatorio.nomePet;
        tdEspecie.innerHTML = dadoRelatorio.especiePet; 
        tdRaca.innerHTML    = dadoRelatorio.racaPet;
        tdCor.innerHTML     = dadoRelatorio.corPet;
        tdSexo.innerHTML    = dadoRelatorio.sexoPet; 
        tdNasci.innerHTML   = formatDate(dadoRelatorio.nascPet);
        tdTamanho.innerHTML = dadoRelatorio.tamanhoPet; 
        tdPelagem.innerHTML = dadoRelatorio.pelagemPet;
        
        //Adicionando colunas na linha
        tr.appendChild(tdCodPet);
        tr.appendChild(tdNomePet);
        tr.appendChild(tdEspecie);
        tr.appendChild(tdRaca);
        tr.appendChild(tdCor);
        tr.appendChild(tdSexo);
        tr.appendChild(tdNasci);
        tr.appendChild(tdTamanho);
        tr.appendChild(tdPelagem);

        //Adicionando linha na tabela.
        table.tBodies[0].appendChild(tr);
    }
}


