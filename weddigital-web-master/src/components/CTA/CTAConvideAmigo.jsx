import React from "react";
import {Button} from "antd";
import './CTAConvideAmigo.css'
import alarm from "../../assets/icons/alarm-branco.png";

export default function CTAConvideAmigo(props) {
    return (
        <div className="container cta-convite-amigo">
            <div className="d-lg-flex align-items-center justify-content-center text-center p-2">
                <div className="col-lg-1">
                    <img src={alarm} alt='https://www.flaticon.com/free-icons/bel' width={60}/>
                </div>
                <div className="mb-0 pb-0 col-lg-7 titulo">
                    <h5 className={`mb-0`}>
                        <b>Convide 5 parceiros</b> e ganhe uma assinatura totalmente grátis aparecendo para mais noivos
                        e fechando novos contratos agora
                    </h5>
                </div>
                {/*<div className='col-lg-1'></div>*/}
                <div className='col-lg-4'>
                    <Button className="btn btn-primary large" onClick={props.onClick}>
                        CONVIDAR PARCEIROS
                    </Button>
                </div>
            </div>
        </div>
    );
}
