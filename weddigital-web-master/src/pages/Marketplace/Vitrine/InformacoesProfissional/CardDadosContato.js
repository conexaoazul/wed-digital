import React, {useContext, useEffect, useRef, useState} from "react";
import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";
import PopupOrcamentoSimultaneo from "../PopupOrcamentoSimultaneo/PopupOrcamentoSimultaneo";
import CardInfo from "./CardInfo";
import {AiFillCaretDown, AiFillCaretRight} from "react-icons/ai";

import MoneyIcon from "../../../../assets/icons/money.png";
import CalendarIcon from "../../../../assets/icons/calendar.png";
import LocalizadorIcon from "../../../../assets/icons/Localizador.png";
import CheckmarkIcon from "../../../../assets/icons/checkmark.png";
import MandarIcon from "../../../../assets/icons/mandar.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {tratarErroRequestApi} from "../../../../utils/TratamentoErros";
import CarregandoPlaceholder from "../../../../components/Modal/CarregandoPlaceholder";

export default function CardDadosContato(props) {
    const [carregando, setCarregando] = useState(false);
    const [DadosNoivaOrcamento, setDadosNoivaOrcamento] = useState([]);
    const [MensagemSolicitacao, setMensagemSolicitacao] = useState(
        "Olá! Vou me casar e gostaria de mais informações sobre seu serviço.",
    );
    const {token} = useContext(UserContext);

    const [openPopup, setOpenPopup] = useState(false);
    const [listaProfissionaisFiltrados, setListaProfissionaisFiltrados] =
        useState([]);

    let dadosToken = token.split("_");
    let tipoUsuarioRemetente = dadosToken[0];
    let idClienteReq = dadosToken[1];
    let tokenUsuario = dadosToken[2];
    let idProfissionalReq = props.dadosProfissional.idProfissional;
    let descricao = props.dadosProfissional.descricaoEmpresa;
    let nomeEmpresa = props.dadosProfissional.nomeEmpresa;
    let categoriaSegmento = `${props.dadosProfissional.segmento}`;
    let cidade = props.dadosProfissional.cidade
        ? props.dadosProfissional.cidade
        : null;
    let estado = props.dadosProfissional.estado
        ? props.dadosProfissional.estado
        : null;
    let cidadeEstado = cidade && estado ? `${cidade} / ${estado}` : estado;
    let background = props.dadosProfissional.imagensProfissional.length
        ? props.dadosProfissional.imagensProfissional[0].urlImagem
        : "";
    let imagemPerfil = props.dadosProfissional.urlImagemPerfil
        ? props.dadosProfissional.urlImagemPerfil
        : background;
    let imagensProfissional = props.dadosProfissional.imagensProfissional
        ? props.dadosProfissional.imagensProfissional
        : null;

    let trabalhaSozinho = "";
    let realizaMaisDeUmEventoPorDia = "";
    if (
        props.dadosProfissional.realizaMaisDeUmEventoPorDia != null ||
        props.dadosProfissional.realizaMaisDeUmEventoPorDia !== undefined
    ) {
        realizaMaisDeUmEventoPorDia = props.dadosProfissional
            .realizaMaisDeUmEventoPorDia
            ? "Sim"
            : "Não";
    } else {
        realizaMaisDeUmEventoPorDia = "Não informado";
    }
    if (
        props.dadosProfissional.trabalhaSozinho != null ||
        props.dadosProfissional.trabalhaSozinho !== undefined
    ) {
        trabalhaSozinho = props.dadosProfissional.trabalhaSozinho ? "Sim" : "Não";
    } else {
        trabalhaSozinho = "Não informado";
    }

    useEffect(() => {
        api
            .get(
                `obterDadosParaSolicitacaoOrcamento?idNoiva=${idClienteReq}&idProfissional=${idProfissionalReq}`,
            )
            .then(({data}) => {
                setDadosNoivaOrcamento(data);
                if (data == null || data === "" || data === undefined) {
                    setMensagemSolicitacao(
                        `Olá ${nomeEmpresa}. Gostaria de mais informações sobre seu serviço.`,
                    );
                } else {
                    setMensagemSolicitacao(
                        `Olá ${nomeEmpresa}, me chamo ${data.nomeNoiva}. Vou me casar em ${data.dataCasamento} e gostariamos de mais informações sobre seu serviço.`,
                    );
                }
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch(({error}) => {
                console.log(error);
            });
    }, []);

    function abrirPopup() {
        setCarregando(true);
        props.setIsCarregando(true);
        props.setSolicitacaoRealizada(false);
        props.setErroSolicitacao(false);
        props.setRetornoStatusSolicitacao("");

        const dadosPedidoOrcamento = {
            idProfissional: idProfissionalReq,
            idCliente: idClienteReq,
            corpoMensagem: MensagemSolicitacao,
            tipoUsuarioRemetente: tipoUsuarioRemetente,
            tokenUsuarioRemetente: tokenUsuario,
        };

        if (dadosPedidoOrcamento.tipoUsuarioRemetente === "P") {
            props.setSolicitacaoRealizada(false);
            props.setErroSolicitacao(true);
            props.setIsCarregando(false);
            props.setRetornoStatusSolicitacao(
                "Apenas noivos podem contatar o profissional.",
            );
            window.scrollTo(0, 0);
            setCarregando(false);
            return;
        }

        if (dadosToken === "" || dadosToken === undefined) {
            props.setSolicitacaoRealizada(false);
            props.setErroSolicitacao(true);
            props.setIsCarregando(false);
            props.setRetornoStatusSolicitacao(
                "Você precisa efetuar o login como noivo(a) para contatar este profissional.",
            );
            window.scrollTo(0, 0);
            setCarregando(false);
            return;
        }

        if (idClienteReq !== undefined && idProfissionalReq !== undefined) {
            api.get(`profissionais/filtrarProfissionais?categoria=&segmento=&estado=${props.dadosProfissional.estado}`).then(({data}) => {
                processarProfissionaisIndicados(data, props.dadosProfissional);
                // window.scrollTo(0, 0);
                setCarregando(false);
            });
            api
                .post("orcamento/solicitacao", dadosPedidoOrcamento)
                .then((response) => {
                    props.setIsCarregando(false);
                    props.setErroSolicitacao(false);
                    props.setSolicitacaoRealizada(true);
                    props.setRetornoStatusSolicitacao(response.data);
                })
                .catch((ex) => {
                    props.setIsCarregando(false);
                    props.setErroSolicitacao(true);
                    props.setRetornoStatusSolicitacao(tratarErroRequestApi(ex));
                    window.scrollTo(0, 0);
                    setCarregando(false);
                });
            // window.scrollTo(0, 0);
        } else {
            props.setIsCarregando(false);
            props.setErroSolicitacao(true);
            props.setRetornoStatusSolicitacao(
                "Houve algum problema e não foi possível solicitar o orçamento para este profissional",
            );
            console.error("error");
            window.scrollTo(0, 0);
            setCarregando(false);
        }
        props.setIsCarregando(false);
    }

    function processarProfissionaisIndicados(
        listagemProfissionais,
        profissional,
    ) {
        let urlParam = window.location.href.split("=");
        let idProfissionalURL = null;

        if (urlParam.length > 1) {
            idProfissionalURL = urlParam[1];
        }

        let _listagemProfissionais = [];

        for (const element of listagemProfissionais) {
            if (
                element.idProfissional !== idProfissionalURL &&
                // element.segmento === foundSegmento &&
                element.estado === profissional.estado &&
                element.nomeEmpresa !== ""
            ) {
                _listagemProfissionais.push(element);
                setListaProfissionaisFiltrados(_listagemProfissionais);
            }

            if (_listagemProfissionais.length === 4) {
                break;
            }
        }

        if (_listagemProfissionais.length > 0) {
            setOpenPopup(true);
        }
    }

    const [urlImagem, setUrlImagem] = useState("");

    const settings = {
        dots: false, // Exibir indicadores de navegação
        infinite: true, // Navegação infinita
        speed: 500, // Velocidade da animação
        slidesToShow: 3.16, // Quantidade de slides visíveis por vez
        slidesToScroll: 3.16,
        verticalSwiping: true,
        vertical: true,
        prevArrow: <AiFillCaretRight size={0}/>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3.16,
                    slidesToScroll: 3.16,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 1152,
                settings: {
                    verticalSwiping: false,
                    swipeToSlide: false,
                    vertical: false,
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    verticalSwiping: false,
                    swipeToSlide: false,
                    vertical: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    verticalSwiping: false,
                    swipeToSlide: false,
                    vertical: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    nextArrow: <AiFillCaretRight size={24} color="black"/>,
                },
            },
            {
                breakpoint: 380,
                settings: {
                    verticalSwiping: false,
                    swipeToSlide: false,
                    vertical: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    nextArrow: <AiFillCaretRight size={24} color="black"/>,
                },
            },
        ],
    };

    const sliderRef = useRef(null);

    function next() {
        sliderRef.current.slickNext();
    }

    function previous() {
        sliderRef.current.slickPrev();
    }

    const handleSliderHover = (isHovered) => {
        const body = document.body;
        if (isHovered) {
            body.classList.add("no-scroll");
            return;
        }
        body.classList.remove("no-scroll");
    };

    function enviarPerfil() {
        const urlEmpresa = window.location.href;
        window.location.href = `https://api.whatsapp.com/send/?text=%20Ol%C3%A1!%20Encontrei%20essa%20empresa%20na%20Plataforma%20Wed%20Digital%20${urlEmpresa}`;
    }

    const [styleCardInfo, setStyleCardInfo] = useState({});
    const [styleCardOrcamento, setStyleCardOrcamento] = useState({});

    const [isCardFixed, setIsCardFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 680 && !isCardFixed) {
                setIsCardFixed(true);
            } else {
                setIsCardFixed(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isCardFixed) {
            setStyleCardInfo({width: "75%"});
            setStyleCardOrcamento({
                width: "288px",
                position: "fixed",
                top: "80px",
                right: "70px",
            });
        }
        if (!isCardFixed) {
            setStyleCardInfo({});
            setStyleCardOrcamento({});
        }
    }, [isCardFixed]);

    const div_img_desktop = {
        maxWitdth: "364px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "20px",
    };

    const img_desktop = {
        maxHeight: "160px",
        borderRadius: "10px",
        cursor: "pointer",
        justifyContent: "center",
    };

    /* maxWidth: "90%", maxHeight: 150, margin: "0px auto", cursor: "pointer", justifyContent: "center" */

    return (
        <>
            <div className="perfil" id="pedirOrcamento">
                <div className="background-pc">
                    <div className="juntos">
                        {props.dadosProfissional.numeroContatoFormatado ? (
                            <img
                                className="mandar"
                                onClick={enviarPerfil}
                                src={MandarIcon}
                                alt=""
                                style={{
                                    width: 35,
                                    height: 35,
                                    objectFit: "contain",
                                    position: "absolute",
                                    right: 15,
                                    top: 10,
                                    backgroundColor: "white",
                                    borderRadius: "2rem",
                                    padding: 5,
                                    cursor: "pointer",
                                }}
                            />
                        ) : (
                            ""
                        )}
                        <img
                            src={urlImagem === "" ? background : urlImagem}
                            alt=""
                            className="background img_desktop"
                        />
                    </div>
                    <div
                        className="slider-pc"
                        onWheel={(event) => {
                            event.preventDefault();
                            if (event.deltaY > 0) {
                                next();
                                return;
                            }

                            previous();
                        }}
                        onMouseEnter={() => handleSliderHover(true)}
                        onMouseLeave={() => handleSliderHover(false)}
                    >
                        <Slider ref={sliderRef} className="slider" {...settings}>
                            {imagensProfissional.map((item, index) => (
                                <div key={index} style={{}}>
                                    <div style={div_img_desktop}>
                                        <img
                                            src={item.urlImagem}
                                            alt={`Imagem ${index + 1}`}
                                            onClick={() => {
                                                setUrlImagem(item.urlImagem);
                                            }}
                                            onMouseOver={() => {
                                                setUrlImagem(item.urlImagem);
                                            }}
                                            className="image image-desktop"
                                            style={img_desktop}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <AiFillCaretDown
                            onClick={next}
                            size={26}
                            style={{margin: "0px auto", marginTop: 5}}
                        />
                    </div>
                </div>

                <div className="content" style={{zIndex: 5}}>
                    <div className="imgPerfil">
                        <img src={imagemPerfil} className="image" alt=""/>
                    </div>

                    <div className="title pt-0">
                        <h4>
                            <span className="fontePrincipal-regular">{nomeEmpresa}</span>
                            <small className="categoriaSeg">{categoriaSegmento}</small>
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: "14rem",
                            }}
                        >
                            <span>{categoriaSegmento}</span>
                            <span style={{marginLeft: 8}}>
                <img
                    src={LocalizadorIcon}
                    alt=""
                    style={{width: 25, height: 18, objectFit: "contain"}}
                />
                                {cidadeEstado}
              </span>
                        </div>

                        <Slider className="slider" {...settings}>
                            {imagensProfissional.map((item, index) => (
                                <div key={index} style={{}}>
                                    <img
                                        src={item.urlImagem}
                                        alt={`Imagem ${index + 1}`}
                                        onClick={() => {
                                            setUrlImagem(item.urlImagem);
                                        }}
                                        className="image image-mobile"
                                        style={{
                                            width: 120,
                                            height: 90,
                                            objectFit: "cover",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>

                        <div className="backInfo-cell">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderBottom: "1px solid rgba(64, 0, 114, 0.5)",
                                    paddingBottom: 8,
                                }}
                            >
                                <img
                                    src={LocalizadorIcon}
                                    alt=""
                                    style={{
                                        width: 22,
                                        height: 22,
                                        marginRight: 5,
                                        objectFit: "contain",
                                    }}
                                />
                                <span>{cidadeEstado}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: 10,
                                    borderBottom: "1px solid rgba(64, 0, 114, 0.5)",
                                    paddingBottom: 8,
                                }}
                            >
                                <img
                                    style={{
                                        width: 22,
                                        height: 22,
                                        marginRight: 5,
                                        objectFit: "contain",
                                    }}
                                    src={MoneyIcon}
                                    alt=""
                                />
                                <span>
                  Preço a partir de {props.dadosProfissional.valorMinimo}
                </span>
                            </div>
                            <div
                                style={{display: "flex", alignItems: "center", marginTop: 10}}
                            >
                                <img
                                    style={{
                                        width: 22,
                                        height: 22,
                                        marginRight: 5,
                                        objectFit: "contain",
                                    }}
                                    src={CalendarIcon}
                                    alt=""
                                />
                                <span>Datas ainda disponíveis</span>
                            </div>
                            {carregando ? (
                                <CarregandoPlaceholder/>
                            ) : (
                                <div className="text-center button-pedir-orcamento mt-4">
                                    <button className="btn btn-primary" onClick={abrirPopup}>
                                        <span>Pedir orçamento grátis</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* <PrincipaisPerguntas valorMinimo={props.dadosProfissional.valorMinimo} formasPagamento={props.dadosProfissional.formasPagamento} maisDeUmDia={props.dadosProfissional.realizaMaisDeUmEventoPorDia} trabalhaSozinho={props.dadosProfissional.trabalhaSozinho} /> */}
                        <div className="backDescricao-cell">
                            <p className="backDescricao-cell-p">{descricao}</p>
                        </div>

                        {!isCardFixed && (
                            <CardInfo
                                carregando={carregando}
                                abrirPopup={abrirPopup}
                                descricao={descricao}
                                styleCardInfo={styleCardInfo}
                                styleCardOrcamento={styleCardOrcamento}
                                valorMinimo={props.dadosProfissional.valorMinimo}
                            />
                        )}

                        <div
                            style={
                                isCardFixed
                                    ? {
                                        display: "flex",
                                        flexDirection: "row",
                                        marginTop: "5rem",
                                        alignItems: "start",
                                        gap: "1rem",
                                    }
                                    : {}
                            }
                        >
                            <div className="maisInformacoes">
                                <h4>Mais informações</h4>

                                <div className="field">
                                    <label>Formas de pagamento aceitas:</label>
                                    <p>
                                        <img
                                            src={CheckmarkIcon}
                                            style={{
                                                width: 22,
                                                height: 22,
                                                objectFit: "contain",
                                                marginRight: 5,
                                            }}
                                            alt=""
                                        />
                                        {props.dadosProfissional.formasPagamento
                                            ? props.dadosProfissional.formasPagamento
                                            : "Não informado"}
                                    </p>
                                </div>

                                <div style={{borderBottom: "1px solid #400072"}}></div>

                                <div className="field">
                                    <label htmlFor="check-evento">
                                        Realiza mais de um evento por dia?
                                    </label>
                                    <p>
                                        <img
                                            id="check-evento"
                                            src={CheckmarkIcon}
                                            style={{
                                                width: 22,
                                                height: 22,
                                                objectFit: "contain",
                                                marginRight: 5,
                                            }}
                                            alt="Checar Evento"
                                        />
                                        {realizaMaisDeUmEventoPorDia}
                                    </p>
                                </div>
                                {/*<div className="field">*/}
                                {/*  <label>Trabalha só ou com equipe?</label>*/}
                                {/*  <p>*/}
                                {/*    <img*/}
                                {/*      src={CheckmarkIcon}*/}
                                {/*      style={{*/}
                                {/*        width: 22,*/}
                                {/*        height: 22,*/}
                                {/*        objectFit: "contain",*/}
                                {/*        marginRight: 5,*/}
                                {/*      }}*/}
                                {/*      alt=""*/}
                                {/*    />*/}
                                {/*    {trabalhaSozinho}*/}
                                {/*  </p>*/}
                                {/*</div>*/}
                            </div>
                            {isCardFixed && (
                                <div
                                    style={{
                                        marginTop: "28px",
                                    }}
                                >
                                    <CardInfo
                                        carregando={carregando}
                                        abrirPopup={abrirPopup}
                                        styleCardOrcamento={{width: "288px"}}
                                        valorMinimo={props.dadosProfissional.valorMinimo}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="row g-4">
                            {/* <div className={DadosNoivaOrcamento.orcamentoPedido ? "col-lg-8" : "col-lg-12"}>
								<div className="field h-100">
									<label>Sua mensagem ficará assim:</label>
									<span>{MensagemSolicitacao}</span>
								</div>
							</div> */}
                            {/*<div className={DadosNoivaOrcamento.orcamentoPedido ? "col-lg-4" : "d-none"}>*/}
                            {/*	<CardAceitar />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>

            {openPopup && (
                <PopupOrcamentoSimultaneo
                    listaProfissionaisFiltrados={listaProfissionaisFiltrados}
                    setOpenPopup={setOpenPopup}
                    setIsCarregando={props.setIsCarregando}
                    setSolicitacaoRealizada={props.setSolicitacaoRealizada}
                    setErroSolicitacao={props.setErroSolicitacao}
                    setRetornoStatusSolicitacao={props.setRetornoStatusSolicitacao}
                />
            )}
        </>
    );
}
