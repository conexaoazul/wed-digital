import React from "react";

export default function ModalMensagemErro(props){
    return(
        <div className="alert alert-danger text-center w-40" role="alert">
            {props.texto}
        </div>
    )
}