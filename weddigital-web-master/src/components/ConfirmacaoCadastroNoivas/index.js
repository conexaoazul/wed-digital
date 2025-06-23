import React, {useContext, useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";

import configServer from "../../config.json";
import {message} from "antd";
import Navbar from "../Navbar";
import api from "../../api";
import UserContext from "../../api/userContext-api/userContext";
import {casamento} from "../../utils/models/UsuarioModel";

import CarregandoPlaceholder from "../Modal/CarregandoPlaceholder";
import Helmet from "react-helmet";
import UploadImage from "../UploadImage";
import {atualizarDadosCadastroNoivaWebhook} from "../../utils/integracaoWebhook";

export default function ConfirmacaoCadastroNoivas() {
    const {token} = useContext(UserContext);

    const [messageApi, contextHolder] = message.useMessage();
    const [idUsuario, setIdUsuario] = useState(0);
    const [idTipoUsuario, setIdTipoUsuario] = useState(0);
    const [tokenUsuario, setTokenUsuario] = useState("");
    const [DadosCadastro, setDadosCadastro] = useState(casamento);
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [stepCurrent, setStepCurrent] = useState(1);

    let dadosToken = null;
    let tipoUsuario = null;
    let idTipoUsuarioParam = null;
    let tokenUsuarioParam = null;

    useEffect(() => {
        if (token == null || token == "") {
            setCarregandoDados(true);
            messageApi.open({
                type: "warning",
                content: "Aguardando seus dados serem validados",
                style: {
                    marginTop: "4rem",
                },
            });

            setTimeout(() => {
                window.location.href = `${configServer.api.linkApiGeral}/perfil`;
            }, 1000);
            return;
        } else {
            dadosToken = token.split("_");
            tipoUsuario = dadosToken[0];
            idTipoUsuarioParam = dadosToken[1];
            tokenUsuarioParam = dadosToken[2];
        }

        api
            .get(
                `usuario/obterChaveUsuario?tipoUsuario=${tipoUsuario}&idTipoUsuario=${idTipoUsuarioParam}&tokenUsuario=${tokenUsuarioParam}`,
            )
            .then((response) => {
                if (response.data != null) {
                    setIdUsuario(Number(response.data));
                    setTokenUsuario(tokenUsuarioParam);
                    setIdTipoUsuario(idTipoUsuarioParam);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function salvarDadosComplementares() {
        if (DadosCadastro.luaMel.length < 3 || DadosCadastro.qtdConvidados === 0) {
            messageApi.open({
                type: "warning",
                content: "Preencha todos os campos para prosseguir!",
                style: {
                    marginTop: "4rem",
                },
            });
            return;
        }

        setCarregandoDados(true);
        api
            .put(
                `noivos/complementoCadastro?idNoiva=${idTipoUsuario}&tokenAcesso=${tokenUsuario}`,
                DadosCadastro,
            )
            .then(() => {
                setStepCurrent(6);
                atualizarDadosCadastroNoivaWebhook(DadosCadastro);
            })
            .catch((error) => {
                console.error("Error");
                console.error(error);
                window.location.replace(`${configServer.api.linkApiGeral}/perfil`);
            });
    }

    const onNextStep = () => {
        if (stepCurrent === 1) {
            if (imageUrl == undefined && !loading) {
                messageApi.open({
                    type: "warning",
                    content: "Faça o upload de sua imagem de perfil para prosseguir!",
                    style: {
                        marginTop: "4rem",
                    },
                });
                return;
            }
            if (imageUrl == undefined && loading) {
                messageApi.open({
                    type: "warning",
                    content: "Aguarde o upload de sua imagem de perfil ser completa",
                    style: {
                        marginTop: "4rem",
                    },
                });
                return;
            }
            setStepCurrent(stepCurrent + 1);
            setImageUrl("");
        }
    };

    const onChangeData = (ev) => {
        const {value, name} = ev.target;
        setDadosCadastro({
            ...DadosCadastro,
            idNoiva: idTipoUsuario,
            [name]: value,
        });
    };

    return (
        <div className="">
            <script>fbq('track', 'Lead');</script>

            <Helmet>
                <title>WedDigital - Criação de perfil - Etapa 1</title>
            </Helmet>

            <Navbar navfix={true}/>
            {contextHolder}

            {carregandoDados ? (
                <div
                    className="passosConfirmacaoCadastro"
                    style={{paddingTop: "5rem"}}
                >
                    <CarregandoPlaceholder/>
                </div>
            ) : (
                <div
                    className="passosConfirmacaoCadastro"
                    style={{paddingTop: "5rem"}}
                >
                    {/* Passo 1 */}
                    {stepCurrent === 1 ? (
                        <div className="cardPassoAtual">
                            <div className="cardPassoAtual_header">
                                <div className="cardPassoAtualStep">
                                    <h4>Passo 1 de 2</h4>
                                </div>
                                <h1>Conta criada!</h1>
                                <h2>
                                    Crie seu perfil e comece
                                    <br></br>a organizar seu casamento
                                </h2>
                            </div>

                            <UploadImage
                                isImagemPerfil={true}
                                isConfirmacaoCadastro={true}
                                idUsuario={idUsuario}
                                tokenUsuario={tokenUsuario}
                                corBG="white"
                                setImageUrl={setImageUrl}
                            />

                            <div className="col-12 btnProximoConfirmacao">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={onNextStep}
                                >
                                    PRÓXIMO
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {/* Passo 2 */}
                    {stepCurrent === 2 ? (
                        <div className="cardPassoAtual">
                            <div className="cardPassoAtual_header">
                                <div className="cardPassoAtualStep">
                                    <h4>Passo 2 de 2</h4>
                                </div>
                                <h1>Último passo</h1>
                            </div>

                            <div className="col-lg-4 mx-auto">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <label className="mb-2">Qual o nome do seu amor?</label>
                                        <input
                                            type="text"
                                            className="inputDadosEmpresa"
                                            required
                                            name="nomeConjuge"
                                            value={DadosCadastro.nomeConjuge}
                                            onChange={onChangeData}
                                        />
                                    </div>

                                    <div className="col-lg-12">
                                        <label className="mb-2">
                                            Qual a quantidade de convidados
                                        </label>
                                        <input
                                            type="number"
                                            className="inputDadosEmpresa"
                                            required
                                            name="qtdConvidados"
                                            value={DadosCadastro.qtdConvidados}
                                            onChange={onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className="mb-2">Onde será sua lua de mel?</label>
                                        <textarea
                                            className="inputDadosEmpresa"
                                            required
                                            name="luaMel"
                                            value={DadosCadastro.luaMel}
                                            onChange={onChangeData}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 btnProximoConfirmacao">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={salvarDadosComplementares}
                                >
                                    FINALIZAR
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
}
