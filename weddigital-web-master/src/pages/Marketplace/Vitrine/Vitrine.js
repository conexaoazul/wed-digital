import React, {useEffect, useState} from "react";
import "./Vitrine.css";

import api from "../../../api";
import VitrineModel from "../../../utils/models/VitrineModel";
import Navbar from "../../../components/Navbar";
import CardDadosContato from "./InformacoesProfissional/CardDadosContato";
import CardDepoimentos from "./DepoimentosSobreProfissional/CardOpinioes";
import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";
import CheckmarkIcon from "../../../assets/icons/checkmark.png";
import ListaDeAvaliacoes from "./InformacoesProfissional/ListaDeAvaliacoes/ListaDeAvaliacoes";
import {useParams} from "react-router-dom";

const params = new URLSearchParams(window.location.search);

export default function Vitrine() {
    const [dadosVitrine, setDadosVitrine] = useState(
        VitrineModel.dadosVitrineDTO,
    );
    const [isCarregando, setIsCarregando] = useState(true);

    const [solicitacaoRealizada, setSolicitacaoRealizada] = useState(false);
    const [erroSolicitacao, setErroSolicitacao] = useState(false);
    const [retornoStatusSolicitacao, setRetornoStatusSolicitacao] = useState("");

    localStorage.setItem("paginaAtual", params.get("paginaAtual"));
    const {idProfissional} = useParams();

    let idProfissionalURL = idProfissional;

    useEffect(() => {
        api
            .get(`detalhesProfissional/${idProfissionalURL}`)
            .then(({data}) => {
                setDadosVitrine(data);
                setIsCarregando(false);
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch(({error}) => {
                console.error(error);
                setIsCarregando(false);
            });
    }, []);

    return (
        <>
            <Navbar/>
            <div className="vitrine-data-box">
                <div
                    className="breadcrumb-container mb-0"
                    style={{marginTop: "4.56rem"}}
                >
                    <div className="container-fluid px-lg-5 my-0"></div>
                </div>

                {solicitacaoRealizada ? (
                    <div className="alert alert-success" role="alert">
                        {retornoStatusSolicitacao}
                    </div>
                ) : (
                    ""
                )}

                {erroSolicitacao ? (
                    <div className="alert alert-danger" role="alert">
                        {retornoStatusSolicitacao}
                    </div>
                ) : (
                    ""
                )}

                {isCarregando ? (
                    <div className=".container p-4 d-flex justify-content-center">
                        <CarregandoPlaceholder/>
                    </div>
                ) : (
                    <section className="vitrine-marketplace">
                        <div className="container-fluid px-lg-5">
                            <div className="row g-4">
                                <div className="col-lg-12">
                                    <div className="perfil">
                                        <CardDadosContato
                                            idProfissional={idProfissionalURL}
                                            dadosProfissional={dadosVitrine}
                                            isCarregando={isCarregando}
                                            setIsCarregando={setIsCarregando}
                                            setSolicitacaoRealizada={setSolicitacaoRealizada}
                                            setErroSolicitacao={setErroSolicitacao}
                                            setRetornoStatusSolicitacao={setRetornoStatusSolicitacao}
                                        />
                                    </div>
                                    <div className="maisInformacoes-cell">
                                        <h4>Mais informações</h4>

                                        <div className="bg-red field-cell">
                                            <label htmlFor="pagamento-aceitas">
                                                Formas de pagamento aceitas:
                                            </label>
                                            <p>
                                                <img
                                                    id="pagamento-aceitas"
                                                    src={CheckmarkIcon}
                                                    style={{
                                                        width: 22,
                                                        height: 22,
                                                        objectFit: "contain",
                                                        marginRight: 5,
                                                    }}
                                                    alt=""
                                                />
                                                {dadosVitrine.formasPagamento
                                                    ? dadosVitrine.formasPagamento
                                                    : "Não informado"}
                                            </p>
                                        </div>

                                        <div style={{borderBottom: "1px solid #400072"}}></div>

                                        <div className="bg-red field-cell">
                                            <label htmlFor="trabalha-equipe">
                                                Trabalha só ou com equipe?
                                            </label>
                                            <p>
                                                <img
                                                    id="trabalha-equipe"
                                                    src={CheckmarkIcon}
                                                    style={{
                                                        width: 22,
                                                        height: 22,
                                                        objectFit: "contain",
                                                        marginRight: 5,
                                                    }}
                                                    alt=""
                                                />
                                                {dadosVitrine.trabalhaSozinho
                                                    ? dadosVitrine.trabalhaSozinho
                                                    : "Não informado"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <ListaDeAvaliacoes
                                    avaliacoes={[
                                        {
                                            cidadeDoCasamento: "Teresina",
                                            nomeDoCasal: "Casal 1",
                                            descricao:
                                                "A orquestra tocou todos os estilos que amamos, os convidados se divertiram, ficaram apaixonados. Sem dúvidas foi a melhor escolha! O casamento foi em Caruaru, mas o preço foi melhor que outras orquestras e bandas de Caruaru e região. Valeu muito a pena, especialmente por tocar desde a cerimônia até a festa!",
                                            avaliacao: "Excelente",
                                            dataDoCasamento: "19/01/2024",
                                            atendimento: "Bom",
                                            servicoCombinado: "Muito Bom",
                                            Profissionalismo: "Excelente",
                                            dataDaAvaliacao: "13/01/2024",
                                            imagens: dadosVitrine.imagensProfissional,
                                            imagemDoCasal:
                                                "https://i.pinimg.com/736x/16/a0/24/16a0246606b14cea1922f36e9b074b21.jpg",
                                        },
                                        {
                                            cidadeDoCasamento: "São Paulo",
                                            nomeDoCasal: "Casal 2",
                                            descricao:
                                                "A orquestra tocou todos os estilos que amamos, os convidados se divertiram, ficaram apaixonados. Sem dúvidas foi a melhor escolha! O casamento foi em Caruaru, mas o preço foi melhor que outras orquestras e bandas de Caruaru e região. Valeu muito a pena, especialmente por tocar desde a cerimônia até a festa!",
                                            avaliacao: "Excelente",
                                            dataDoCasamento: "19/01/2024",
                                            atendimento: "Bom",
                                            servicoCombinado: "Muito Bom",
                                            Profissionalismo: "Excelente",
                                            dataDaAvaliacao: "13/01/2024",
                                            imagens: dadosVitrine.imagensProfissional,
                                            imagemDoCasal:
                                                "https://i.pinimg.com/736x/16/a0/24/16a0246606b14cea1922f36e9b074b21.jpg",
                                        },
                                        {
                                            cidadeDoCasamento: "Belo Horizonte",
                                            nomeDoCasal: "Cassal 3",
                                            descricao:
                                                "A orquestra tocou todos os estilos que amamos, os convidados se divertiram, ficaram apaixonados. Sem dúvidas foi a melhor escolha! O casamento foi em Caruaru, mas o preço foi melhor que outras orquestras e bandas de Caruaru e região. Valeu muito a pena, especialmente por tocar desde a cerimônia até a festa!",
                                            avaliacao: "Excelente",
                                            dataDoCasamento: "19/01/2024",
                                            atendimento: "Bom",
                                            servicoCombinado: "Muito Bom",
                                            Profissionalismo: "Excelente",
                                            dataDaAvaliacao: "13/01/2024",
                                            imagens: dadosVitrine.imagensProfissional,
                                            imagemDoCasal:
                                                "https://i.pinimg.com/736x/16/a0/24/16a0246606b14cea1922f36e9b074b21.jpg",
                                        },
                                    ]}
                                />
                                <div className="col-lg-12 d-none">
                                    <CardDepoimentos/>
                                </div>
                                <div className="col-lg-12">
                                    <button
                                        className="btn btn-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={() => window.history.back()}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
