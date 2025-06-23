import React from "react";
import {Button} from "antd";
import './CTAConvideAmigo.css'
import notification from "../../assets/icons/notificacao.png";

export default function CTAConvideAmigoMobile(props) {
    return (
        <div className="cta-convite-amigo-mobile mt-2">
            <div className="d-flex flex-row justify-content-center mb-2">
                <div className='col-1 text-center'>
                    <img src={notification} alt='https://www.flaticon.com/free-icons/bel' width={25}/>
                </div>
                <div className="col-11 titulo">
                    <h5 align='center'>
                        <strong>Convide seus parceiros</strong> e apareça para mais noivos fechando
                        novos contratos agora
                    </h5>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <Button className="btn btn-primary large" onClick={props.onClick}>
                    GANHAR ASSINATURA
                </Button>
            </div>
        </div>
    );
}
