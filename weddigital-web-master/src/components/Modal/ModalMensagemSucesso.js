import React from "react";

export default function ModalMensagemSucesso(props){
    return(
        <div className="alert alert-success text-center w-40" role="alert">
            {props.texto}
        </div>
    )
}