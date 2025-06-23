import React, {useState} from "react";
import ModalConviteViaEmail from "./ModalConviteViaEmail/ModalConviteViaEmail";
import ModalConviteViaWhatsapp from "./ModalConviteViaWhatsapp/ModalConviteViaWhatsapp";
import ModalConfirmacao from "./ModalConfirmacao/ModalConfirmacao";

export default function ConvidarCliente(props) {
    const [etapa, setEtapa] = useState(0);
    let mostrar = props.mostrar
    let fechar = props.fechar
    let idUsuario = props.idUsuario


    return (
        mostrar && (
            <>
                <ModalConviteViaEmail
                    idUsuario={idUsuario}
                    open={etapa === 0}
                    fechar={() => fechar()}
                    cancelando={() => {
                    }}
                    enviando={() => {
                        setEtapa(1);
                    }}
                />
                <ModalConviteViaWhatsapp
                    open={etapa === 1}
                    fechar={() => {
                        setEtapa(2);
                    }}
                />
                <ModalConfirmacao
                    open={etapa === 2}
                    fechar={() => {
                        setEtapa(0);
                        fechar();
                    }}
                />
            </>
        )
    );
}
