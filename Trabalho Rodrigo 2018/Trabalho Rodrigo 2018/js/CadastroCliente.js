const NAME_KEY_LOCAL_STORAGE = "Clientes";

start();

/**
 * @description Função principal de Clientes
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start(){

    var btnGravar =  document.getElementById("buttonGravar");
    btnGravar.onclick = function() {

        var clientes = loadLocalStorage(NAME_KEY_LOCAL_STORAGE);
        var cliente = new Cliente();

        if (isObjectEmpty(cliente)) {
            cliente = null;
            alert("Preencha todos os campos!");
        } else {
            clientes.push(cliente.values());
            salvarCliente(clientes);
            clearAllInputs(cliente);
            cliente.focus();
        }
    };

    var btnCancelar = document.getElementById("buttonCancelar");
    btnCancelar.onclick = function() {
        cancelarAddCliente();
    }
}

/**
 * @description Salva novo cliente no localStorage
 * @param {Array} arrayClientes array de clientes à ser salvo.
 */
function salvarCliente(arrayClientes) {

    saveLocalStorage(NAME_KEY_LOCAL_STORAGE, arrayClientes);
    alert("Cliente salvo!");
}

/**
 * @description: Classe cria uma instancia de Cliente- Instancia de inputs
 * @constructor
 * @this {Cliente}
 */
class Cliente{

    constructor(){
        this.codigo   = document.getElementById("cod");
        this.nome     = document.getElementById("nome");
        this.cpf      = document.getElementById("cpf");
        this.email    = document.getElementById("email");
        this.dataNasc = document.getElementById("dataNasc");
        this.phone    = document.getElementById("phone");
        this.end      = document.getElementById("end");
        this.numEnd   = document.getElementById("numEnd");
        this.bairro   = document.getElementById("bairro");
        this.cidade   = document.getElementById("cidade");
    }

    values(){
        var valuesObject = {
            codigo  : this.codigo.value,
            nome    : this.nome.value,
            cpf     : this.cpf.value,
            email   : this.email.value,
            dataNasc: this.dataNasc.value,
            phone   : this.phone.value, 
            end     : this.end.value, 
            numEnd  : this.numEnd.value, 
            bairro  : this.bairro.value,
            cidade  : this.cidade.value
        };
        return valuesObject;
    }

    focus(){
        this.codigo.focus();
    }
}

// FUNÇÃO ALTERAR 

// FUNÇÃO REMOVER 

/**
 * @description Cancela e vai para página inicial.
 */
function cancelarAddCliente() {
    var cancelarConfirm = window.confirm("Deseja realmente cancelar?");  
    if(cancelarConfirm){	
        location.href="TelaPrincipal.html"; 
    }
}