export function tratarErroRequestApi(responseError){
    let mensagemErro = ''
    if(responseError.code == "ERR_NETWORK"){
        mensagemErro = 'Ops, parece que houve algum problema, por favor tente novamente mais tarde!'
    }

    if(responseError.code == "ERR_BAD_REQUEST"){
        mensagemErro = responseError.response.data
    }

    if(mensagemErro == ''){
        mensagemErro = 'Ops, parece que houve algum problema, por favor tente novamente mais tarde!'
    }

    return mensagemErro;
}