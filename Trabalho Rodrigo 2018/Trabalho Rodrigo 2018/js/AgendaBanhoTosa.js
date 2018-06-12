const NAME_KEY_LOCAL_STORAGE = "Agenda Banho e Tosa";

start();

/**
 * @description Função principal de Agendamento
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start(){

    var btnGravar =  document.getElementById("buttonGravar");
    btnGravar.onclick = function() {

        var banhoTosas = loadLocalStorage(NAME_KEY_LOCAL_STORAGE);
        var agendamento = new Agendamento();
        var arrayValidacao = [];

        if(agendamento.servico.value != "Banho e Tosa"){ 
            arrayValidacao.push(agendamento.tosa); //retira obrigatoriedade do campo valor tosa.
        }

        if(isTheObjectEmpty(agendamento,arrayValidacao) ) {
            agendamento = null;
            alert("Preencha todos os campos!");
        } else {
            banhoTosas.push(agendamento.values());
            salvarAgendaBanhoTosa(banhoTosas);
            clearTheInputs(agendamento,[agendamento.status])
            agendamento.focus();
        };
    };

    var btnCancelar = document.getElementById("buttonCancelar");
    btnCancelar.onclick = function() {
        cancelarAddAgenda();
    };
}

/**
 * @description Salva novo agendamento no localStorage
 * @param {Array} arrayBanhoTosas array de agendamento à ser salvo.
 */
function salvarAgendaBanhoTosa(arrayBanhoTosas) {

    saveLocalStorage(NAME_KEY_LOCAL_STORAGE, arrayBanhoTosas);
    alert("Agendamento salvo!");
}

/**
 * @description: Classe cria uma instancia de Agendamento- Instancia de inputs
 * @constructor
 * @this {Agendamento}
 */
class Agendamento{

    constructor(){        
        this.codigoPet   = document.getElementById("codPetAgenda");
        this.nomePet     = document.getElementById("nomePetAgenda");
        this.nomeDonoPet = document.getElementById("donoPetAgenda");
        this.dataAgenda  = document.getElementById("dataAgendaPet");
        this.servico     = document.getElementById("servicoPetAgenda");
        this.horario     = document.getElementById("horarioPetAgenda");
        this.valor       = document.getElementById("valorPetAgenda");
        this.tosa        = document.getElementById("catTosaPetAgenda");
        this.obsPet      = document.getElementById("obsPetAgenda");
        this.status      = document.getElementById("gridRadios1");
               
        return this;
    }

    values(){
        var valuesObject = {
            codigoPet  : this.codigoPet.value,
            nomePet    : this.nomePet.value,
            nomeDonoPet: this.nomeDonoPet.value,
            dataAgenda : this.dataAgenda.value,
            servico    : this.servico.value,
            horario    : this.horario.value,
            valor      : this.valor.value,
            tosa       : this.tosa.value,
            obsPet     : this.obsPet.value,
            status     : this.status.value
        }
        return valuesObject; 
    }

    focus(){
        this.codigoPet.focus();
    }
}

// FUNÇÃO ALTERAR 

// FUNÇÃO REMOVER 

/**
 * @description Cancela e vai para página inicial.
 */
function cancelarAddAgenda() {
    var cancelarConfirm = window.confirm("Deseja realmente cancelar?");  
    if(cancelarConfirm){	
        location.href="TelaPrincipal.html"; 
    }
}