const NAME_KEY_LOCAL_STORAGE = "Agenda Banho e Tosa";

start();

/**
 * @description Função principal do arquivo
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start() {
    var btnVisualizar = document.getElementById("buttonVisualizar");
    btnVisualizar.onclick = function() {
        relatorioBanhoTosa();
    };
}

/**
 * @description Função extrai conteudo dos input e toma decisão se será ou não executado relatório.
 */
function relatorioBanhoTosa(){

    var inputSelecaoStaus = document.getElementById("selecaoStatus");
    var inputSelecaoServico = document.getElementById("selecaoServico");
    var inputDataInicial = document.getElementById("dataInicial");
    var inputDataFinal = document.getElementById("dataFinal");

    if(isArrayEmpty([inputDataInicial,inputDataFinal,inputSelecaoStaus,inputSelecaoServico]) ){

        alert("Preencha todos os campos");
    }else {
        executaRelatorio(inputSelecaoServico.value, 
                         inputSelecaoStaus.value,   
                         inputDataInicial.value, 
                         inputDataFinal.value);
    }
}

/**
 * @description Função monta condições gerais do relatório.
 * @param {String} inputSelecaoServico tipo do serviço: Banho, Tosa, Banho e Tosa
 * @param {String} inputSelecaoStaus Status do serviço: Executado, Agendado, Entregue, Cancelado
 * @param {Date}  inputDataInicial  data do inicial a ser considerada no filtro
 * @param {Date}  inputDataFinal data do final a ser considerada no filtro
 */
function executaRelatorio(inputSelecaoServico,inputSelecaoStaus,inputDataInicial, inputDataFinal) {
    var dadosRelatorio = [];

    dadosRelatorio = carregaInformacoes(inputSelecaoServico,
                                        inputSelecaoStaus ,
                                        inputDataInicial, 
                                        inputDataFinal);

    populaTabela(dadosRelatorio);

    console.log(dadosRelatorio);
}

/**
 * @description Função carrega informações que estão salvas no localSotorage de acordo com filrtros
 * @param {String} inputSelecaoServico tipo do serviço: Banho, Tosa, Banho e Tosa
 * @param {String} inputSelecaoStaus Status do serviço: Executado, Agendado, Entregue, Cancelado
 * @param {Date}   inputDataInicial  data do inicial a ser considerada no filtro
 * @param {Date}   inputDataFinal data do final a ser considerada no filtro
 * @return {Array} cadastroFiltrado, array contendo informações filtradas do localStorage 
 */
function carregaInformacoes(inputSelecaoServico,inputSelecaoStaus ,inputDataInicial, inputDataFinal) {

    var cadastroFiltrado = [];
    
    if(inputDataFinal < inputDataInicial) {
        alert("Data final não pode ser menor que data inicial.");
    }else{

        var todosCadastros  = loadLocalStorage(NAME_KEY_LOCAL_STORAGE);   

        for(var indice in todosCadastros){
            
            var dataAgendamento = todosCadastros[indice].dataAgenda;
            var tipoServico     = todosCadastros[indice].servico;
            var statusServico   = todosCadastros[indice].status;
    
            if( tipoServico == inputSelecaoServico  &&
                statusServico == inputSelecaoStaus  &&
                dataAgendamento >= inputDataInicial && 
                dataAgendamento <= inputDataFinal){
    
                cadastroFiltrado.push(todosCadastros[indice]);
            }
        }
        if(cadastroFiltrado.length < 1){
            alert("Não existem registros com esses filtros.");
        }
    }

    return cadastroFiltrado;
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
        var tdDataAgenda  = document.createElement("td");
        var tdCoPet       = document.createElement('td');
        var tdNomeCliente = document.createElement('td');
        var tdNomePet     = document.createElement('td');
        var tdQtdBanho    = document.createElement('td');
        var tdQtdTosa     = document.createElement('td');
        var tdValorTosa   = document.createElement('td');
        var tdValorBanho  = document.createElement('td');
        var tdValorTotal  = document.createElement('td');  

        //Tratando valor da tosa em casos em que ela vir vazia.
        if(dadoRelatorio.tosa == ""){
            dadoRelatorio.tosa = "0.00";
        }

        //Setando conteudo das colunas
        tdDataAgenda.innerHTML  = formatDate(dadoRelatorio.dataAgenda);
        tdCoPet.innerHTML       = dadoRelatorio.codigoPet; 
        tdNomeCliente.innerHTML = dadoRelatorio.nomeDonoPet;
        tdNomePet.innerHTML     = dadoRelatorio.nomePet;
        if(dadoRelatorio.servico == "Banho"){
            tdQtdBanho.innerHTML  = "✔";
            tdQtdTosa.innerHTML   = "✖";
            tdValorTosa.innerHTML = dadoRelatorio.tosa;
            tdValorBanho.innerHTML= dadoRelatorio.valor;  
            tdValorTotal.innerHTML= parseFloat(dadoRelatorio.valor) + parseFloat(dadoRelatorio.tosa);  
        }else{
            if(dadoRelatorio.servico == "Tosa"){
                tdQtdBanho.innerHTML = "✖";
                tdQtdTosa.innerHTML =  "✔";
                tdValorTosa.innerHTML = parseFloat(dadoRelatorio.valor) + parseFloat(dadoRelatorio.tosa);
                tdValorBanho.innerHTML= "0,00"
                tdValorTotal.innerHTML= parseFloat(dadoRelatorio.valor) + parseFloat(dadoRelatorio.tosa);  
            }else{
                if(dadoRelatorio.servico == "Banho e Tosa") {
                    tdQtdTosa.innerHTML   = "✔";
                    tdQtdBanho.innerHTML  = "✔";

                    tdValorTosa.innerHTML = dadoRelatorio.tosa;
                    tdValorBanho.innerHTML= dadoRelatorio.valor;
                    tdValorTotal.innerHTML= parseFloat(dadoRelatorio.valor) + parseFloat(dadoRelatorio.tosa);  
                }        
            }
        }   
        
        //Adicionando colunas na linha
        tr.appendChild(tdDataAgenda);
        tr.appendChild(tdCoPet);
        tr.appendChild(tdNomeCliente);
        tr.appendChild(tdNomePet);
        tr.appendChild(tdQtdBanho);
        tr.appendChild(tdQtdTosa);
        tr.appendChild(tdValorBanho);
        tr.appendChild(tdValorTosa);
        tr.appendChild(tdValorTotal);

        //Adicionando linha na tabela.
        table.tBodies[0].appendChild(tr);
    }
}