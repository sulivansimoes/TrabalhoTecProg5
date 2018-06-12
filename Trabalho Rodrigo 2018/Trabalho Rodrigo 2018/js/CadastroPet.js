const NAME_KEY_LOCAL_STORAGE = "Pets";

start();

/**
 * @description Função principal de CadastroPet
 * Observação: Esse aquivo usa funções do arquivo functionscomuns.js, sendo assim 
 *             o functionscomuns.js deve ser importado primeiro no HTML
 */
function start(){

    var btnGravar =  document.getElementById("buttonGravar");
    btnGravar.onclick = function() {
        
        var pets = loadLocalStorage(NAME_KEY_LOCAL_STORAGE);
        var pet = new Pet();

        if(isObjectEmpty(pet)){
            pet = null;
            alert("Preencha todos os campos!");
        }else{
            pets.push(pet.values());
            salvarPet(pets);
            clearAllInputs(pet);
            pet.focus();
        }
    };

    var btnCancelar = document.getElementById("buttonCancelar");
    btnCancelar.onclick = function() {
        cancelarAddPet();
    }
}

/**
 * @description Salva novo Pet no localStorage
 * @param {Array} arrayPets array de pets à ser salvo.
 */
function salvarPet(arrayPets) {

    saveLocalStorage(NAME_KEY_LOCAL_STORAGE, arrayPets);
    alert("Pet salvo!");
}   

/**
 * @description: Classe cria uma instancia de Pet- Instancia de inputs
 * @constructor
 * @this {Pet}
 */
class Pet{
    
    constructor(){
        this.codigoPet   = document.getElementById("cod");
        this.codDono     = document.getElementById("codDono");
        this.nomePet     = document.getElementById("nomePet");
        this.especiePet  = document.getElementById("especiePet");
        this.racaPet     = document.getElementById("racaPet");
        this.corPet      = document.getElementById("corPet");
        this.sexoPet     = document.getElementById("sexoPet");
        this.nascPet     = document.getElementById("dataNascPet");
        this.tamanhoPet  = document.getElementById("tamanhoPet");
        this.pelagemPet  = document.getElementById("pelagemPet");
        this.obsPet      = document.getElementById("obsPet");

        return this;
    }

    values(){
        var valuesObject = {
            codigoPet  : this.codigoPet.value,
            codDono    : this.codDono.value,
            nomePet    : this.nomePet.value,   
            especiePet : this.especiePet.value,
            racaPet    : this.racaPet.value,   
            corPet     : this.corPet.value,  
            sexoPet    : this.sexoPet.value,   
            nascPet    : this.nascPet.value,   
            tamanhoPet : this.tamanhoPet.value,
            pelagemPet : this.pelagemPet.value,
            obsPet     : this.obsPet.value    
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
function cancelarAddPet() {
    var cancelarConfirm = window.confirm("Deseja realmente cancelar?");  
    if(cancelarConfirm){	
        location.href="TelaPrincipal.html"; 
    }
}