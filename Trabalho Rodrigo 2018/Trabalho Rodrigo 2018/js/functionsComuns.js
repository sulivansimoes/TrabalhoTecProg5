/**
 * @description Salva Objeto em formato JSON no LocalStorage
 * @param {String} key nome da key onde deverá ser salvo.
 * @param {Array} array array que será salvo no LocalStorage
 */
function saveLocalStorage(key,array){

    window.localStorage.setItem(key , JSON.stringify(array) );
}

/**
 * @description Carrega conteudo do LocalStorage e retorna em formato de array.
 * @param {String} key nome da key à ser consultada.
 * @returns {Array} array contendo informações do localStorage
 */
function loadLocalStorage(key){

    var storage = window.localStorage.getItem(key);
    if(storage){ 
        return  JSON.parse(storage) ;
    }else{
        console.log("Impossível realizar consulta no LocalStorage na Key:"+key+", a mesma não existe!");
        return [];
    }
}

/**
 * @description Valida se objeto contém algum atributo vazio.
 * @param {object} object objeto à ser validado 
 * @return {boolean} true se conter algum atributo vazio, false caso contrário.
 */
function isObjectEmpty( object ){
    
    if(object == null ){
        return true;
    }else{
        for(var i in object){
            if(object[i].value.trim() == ""){
                return true;        
            }
        }
        return false;
    }
}

/**
 * @description Valida se objeto contém algum atributo vazio, exceto atributos passados no array.
 * @param {object} object objeto à ser validado 
 * @param {Array} arrayNameInputs array contendo inputs (id) que não deverão ser validados.
 * @return {boolean} true se conter algum atributo vazio, false caso contrário.
 */
function isTheObjectEmpty( object , arrayNameInputs ){
    
    var valida = true;

    if(object == null ){
        return true;
    }else{
        for(var i in object){
            for(var y = 0; y < arrayNameInputs.length; y++){

                if(object[i].id == arrayNameInputs[y].id){
                    valida = false;
                }
            }
            if(valida){
                if(object[i].value.trim() == ""){
                    return true;        
                }
            }
        }
        return false;
    }
}


/**
 * @description Valida se Array contém algum atributo vazio.
 * @param {Array} array array à ser validado 
 * @return {boolean} true se conter algum atributo vazio, false caso contrário.
 */
function isArrayEmpty( array ){
    
    if(array == null ){
        return true;
    }else{
        for(var i = 0; i < array.length; i++){
            if(array[i].value.trim() == ""){
                return true;        
           }
        }
        return false;
    }
}

/**
 * @description Limpa todos os campos/inputs do formulario
 * @param {Object} object object contendo todos os inputs a serem limpos
 */
function clearAllInputs(object){
    for(var i in object){
        object[i].value = "";
    }  
}


/**
 * @description Formata data para o formato dd/mm/aaaa
 * @param {String} date data a ser formatada no formato dd/mm/aaaa
 * @returns String  dataFormatada
 */
function formatDate(date){

    var dia = date.substr(8,2);
    var mes = date.substr(5,2);
    var ano = date.substr(0,4);
    var dataFormatada = dia+"/"+mes+"/"+ano;

    return dataFormatada;
}

/**
 * @description Exclui todas as linhas (tr) de uma tabela
 * @param {String} table tabela a ser limpa.
 */
function limpaTabela(table){

    if(table != null){

        var tBody = table.tBodies[0];
        for (var i = tBody.children.length; i > 0; i--) {
            var tr = tBody.children[i - 1];
            tBody.removeChild(tr);
        }
    }
}

/**
 * @description Limpa os campos/inputs do formulario, exceto os inputs (id) passados no array.
 * @param {Object} object object contendo todos os inputs a serem limpos
 * @param {Array} arrayNameInputs array contendo inputs que cujo os inputs não vão ser limpos
 */
function clearTheInputs(object,arrayNameInputs){

    var limpa = true;

    for(var i in object){
        for(var y = 0; y < arrayNameInputs.length; y++){
            if(object[i].id == arrayNameInputs[y].id){
                limpa = false;
            }
        }
        if(limpa){
            object[i].value = "";
        }
        limpa = true;
    }  
}
