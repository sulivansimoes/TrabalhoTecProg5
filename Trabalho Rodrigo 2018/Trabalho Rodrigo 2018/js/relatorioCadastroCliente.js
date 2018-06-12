const NAME_KEY_LOCAL_STORAGE = "Clientes";

start();

/**
 * @description Função principal do arquivo
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start() {
    var btnVisualizar = document.getElementById("buttonVisualizar");
    btnVisualizar.onclick = function() {
        executaRelatorio();
    };
}

/**
 * @description Monta condições gerais do relatório filtros, montagem etc.
 */
function executaRelatorio(){

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
        var tdCodCliente= document.createElement("td");
        var tdNome      = document.createElement('td');
        var tdCpf       = document.createElement('td');
        var tdEmail     = document.createElement('td');
        var tdNasc      = document.createElement('td');
        var tdTel       = document.createElement('td');
        var tdEndereco  = document.createElement('td');
 
        //Setando conteudo das colunas
        tdCodCliente.innerHTML = dadoRelatorio.codigo; 
        tdNome.innerHTML       = dadoRelatorio.nome;
        tdCpf.innerHTML        = dadoRelatorio.cpf;
        tdEmail.innerHTML      = dadoRelatorio.email; 
        tdNasc.innerHTML       = formatDate(dadoRelatorio.dataNasc);
        tdTel.innerHTML        = dadoRelatorio.phone; 
        tdEndereco.innerHTML   = dadoRelatorio.end+" Nº "+dadoRelatorio.numEnd+", "+dadoRelatorio.bairro+","+dadoRelatorio.cidade ;
        
        //Adicionando colunas na linha
        tr.appendChild(tdCodCliente);
        tr.appendChild(tdNome);
        tr.appendChild(tdCpf);
        tr.appendChild(tdEmail);
        tr.appendChild(tdNasc);
        tr.appendChild(tdTel);
        tr.appendChild(tdEndereco);
        
        //Adicionando linha na tabela.
        table.tBodies[0].appendChild(tr);
    }
}
