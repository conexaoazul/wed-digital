import React from "react";
import "./CardProfissionalMarketplace.css";

import {IoDiamondOutline} from "react-icons/io5";
import {RiVipCrown2Line} from "react-icons/ri";
import {number, object} from "prop-types";

export default function CardProdutoMarketplace(props) {
    let nomeEmpresa = props.dadosProfissionais.nomeEmpresa;
    let segmento = props.dadosProfissionais.segmento;
    let valorMinimoSemFormatacao = props.dadosProfissionais.valorMinimo
        ? props.dadosProfissionais.valorMinimo
        : "R$ --";
    let valorMinimo = valorMinimoSemFormatacao.replace(/[^\d.,]/g, "");
    let cidade = props.dadosProfissionais.cidade;
    let estado = props.dadosProfissionais.estado;
    let idProfissional = props.dadosProfissionais.idProfissional;
    let nivelStatusConta = props.dadosProfissionais.nivelStatusConta;
    let imagemVitrine = props.dadosProfissionais.imagemMarketplace;

    let imagemPrincipalCapa = require("../../../fileContents/imagensVitrineProfissional/no-image.png");

    if (imagemVitrine) {
        imagemPrincipalCapa = imagemVitrine;
    }

    if (!valorMinimo.includes(".") && !valorMinimo.includes(",")) {
        valorMinimo = valorMinimo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const renderNivelConta = () => {
        if (!nivelStatusConta) {
            return null;
        }
        if (nivelStatusConta === "Start" || nivelStatusConta === "Start ") {
            return null;
        }

        return (
            <span
                className={"nivel-status-marketplace " + nivelStatusConta.toLowerCase()}
            >
        <IoDiamondOutline className="me-2 icon diamante"/>
        <RiVipCrown2Line className="me-2 icon ouro"/>
        <span>{nivelStatusConta}</span>
      </span>
        );
    };

    const renderHref = () => {
        if (props.paginaAtual) {
            return `/buscar-profissional/detalhes/${idProfissional}?paginaAtual=${props.paginaAtual}`;
        }
        return `/buscar-profissional/detalhes/${idProfissional}`;
    };
    return (
        <div className="col-lg-3">
            <div className="card-anuncio-marketplace">
                <div
                    className="image"
                    style={{
                        paddingTop: "60%",
                        background:
                            "url(" + imagemPrincipalCapa + ") no-repeat top center/cover",
                        backgroundSize: "cover",
                    }}
                >
                    {renderNivelConta()}
                </div>
                <div className="content_">
                    <h4 className="mb-1">{nomeEmpresa}</h4>
                    <h6 className="mb-1">{segmento}</h6>

                    <h5>A partir de R$: {valorMinimo}</h5>
                    <p className="mb-0">
                        {cidade} - {estado}
                    </p>
                    <div className="spotlight mt-auto">
            <span style={{fontSize: 12}}>
              🤑 Solicite orçamento e ganhe <strong>5 pontos Wed</strong>
            </span>
                    </div>
                    <a className="btn btn-secondary mt-3" href={renderHref()}>
                        <span>Orçamento grátis</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

CardProdutoMarketplace.propTypes = {
    paginaAtual: number,
    dadosProfissionais: object,
};
