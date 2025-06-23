import React from "react";
import "./CardDestaqueProfissionais.css";
import {Link} from "react-router-dom";

import {IoDiamondOutline} from "react-icons/io5";
import {RiVipCrown2Line} from "react-icons/ri";

export default function CardDestaqueProfissionais({profissional}) {
    const {
        idProfissional,
        nomeProfissional,
        imagemVitrine,
        segmentoEmpresa,
        nivelStatusConta,
        valorMinimo,
    } = profissional;

    return (
        <div className="card-destaque" key={idProfissional} style={{margin: 0}}>
            <img
                className="card-imagem-destaque"
                src={imagemVitrine}
                alt={`${nomeProfissional} em destaque no card`}
            />
            <div className="card-info" style={{position: "relative"}}>
                {nivelStatusConta ? (
                    <h5 className={"nivel-status " + nivelStatusConta.toLowerCase()}>
                        <IoDiamondOutline className="me-2 icon diamante"/>
                        <RiVipCrown2Line className="me-2 icon ouro"/>
                        <span>{nivelStatusConta}</span>
                    </h5>
                ) : (
                    ""
                )}
                <h3 className="info-titulo">{nomeProfissional}</h3>
                <h4 className="info-segmento">{segmentoEmpresa}</h4>
                <h5 className="info-preco">A partir de {valorMinimo}</h5>
                <Link
                    className="card-botao"
                    to={`/buscar-profissional/detalhes/${idProfissional}`}
                >
                    SOLICITAR ORÇAMENTO
                </Link>
            </div>
        </div>
    );
}
