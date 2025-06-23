import React, {useContext, useEffect, useRef, useState} from "react";
import InputMask from "react-input-mask";
import "./CadastroEmpresa.css";

import {Cascader} from "antd";

import api from "../../../api";

import axios from "axios";

import UsuarioModel from "../../../utils/models/UsuarioModel";
import UserContext from "../../../api/userContext-api/userContext";
import {validarEmail, verificarIgualdadeSenha, verificarIntegridadeSenha,} from "../../../utils/Utils";
import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";
import LogoWed from "../../../assets/icon.ico";
import Helmet from "react-helmet";
import ServerConfig from "../../../config.json";

import {optionsSegmento} from "../../../utils/models/ModelsUtils";

export default function CadastroEmpresa() {
    const {setToken} = useContext(UserContext);
    const [disabled, setDisabled] = useState(false)

    const [dadosCadastro, setDadosCadastro] = useState(
        UsuarioModel.dadosUsuarioEmpresaDTO,
    );
    const [erroCadastro, setErroCadastro] = useState("");
    const [isCarregandoDados, setIsCarregandoDados] = useState(false);
    const [isAcordoChecked, setIsAcordoChecked] = useState(true);
    const [isSenhaValida, setIsSenhaValida] = useState(true);
    const [isSenhaIgual, setIsSenhaIgual] = useState(true);

    const form = useRef();

    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    const utm_id = params.get("utm_id");
    const utm_term = params.get("utm_term");
    const utm_content = params.get("utm_content");
    const idConvite = params.get("convite");

    let dadosUTM = {
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_id: utm_id,
        utm_term: utm_term,
        utm_content: utm_content,
    };

    function onChange(ev) {
        ev.preventDefault();
        const {value, name} = ev.target;
        setDadosCadastro({
            ...dadosCadastro,
            [name]: value,
        });
    }

    const onChangeSegmento = (value) => {
        let categoria = value[0];
        let segmento = value[1];

        setDadosCadastro({
            ...dadosCadastro,
            categoria: categoria,
            segmento: segmento,
        });
    };

    function onSenhaValida(ev) {
        ev.preventDefault();
        setIsSenhaValida(false);
        const {value, name} = ev.target;

        let isSenhaIntegra = verificarIntegridadeSenha(value);
        if (isSenhaIntegra) {
            setIsSenhaValida(true);
        } else {
            setIsSenhaValida(false);
        }

        setDadosCadastro({
            ...dadosCadastro,
            [name]: value,
        });
    }

    function onSenhaIgual(ev) {
        ev.preventDefault();
        setIsSenhaIgual(false);
        const {value} = ev.target;
        let isSenhaIgual = verificarIgualdadeSenha(dadosCadastro.senha, value);

        if (isSenhaIgual) {
            setIsSenhaIgual(true);
        } else {
            setIsSenhaIgual(false);
        }
    }

    function validacao() {
        setIsCarregandoDados(true);
        setErroCadastro("");

        let termosUso = document.getElementById("invalidCheck").checked;
        let inputEmail = document.getElementById("inputEmailValidacao").value;
        let inputNome = document.getElementById("inputNomeUsuarioValidacao").value;

        dadosCadastro.email = inputEmail;
        document.getElementById("inputHiddenEmail").value = inputEmail;
        document.getElementById("inputHiddenNomeUsuario").value = inputNome;

        if (!termosUso) {
            setIsAcordoChecked(false);
            setIsCarregandoDados(false);
            return;
        }

        if (!validarEmail(inputEmail)) {
            setErroCadastro("Informe um email válido");
            setIsCarregandoDados(false);
            return;
        }

        setIsCarregandoDados(true);
        salvarDadosProfissional();
    }

    function salvarDadosProfissional() {
        setIsCarregandoDados(true);

        api
            .post("usuario/empresa/novoUsuario", dadosCadastro)
            .then((response) => {
                if (response.data == null) {
                    setErroCadastro(
                        "Ooops! Houve algum problema em seu cadastro, tente novamente ou contate nosso suprote",
                    );
                    return;
                }

                setToken(response.data.tokenUsuario);
                enviarCadastroRelatorio(response.data);
            })
            .catch(() => {
                console.error("Error");
                setErroCadastro(
                    "Ooops! Parece que o usuário já está cadastrado. Tente fazer Login para continuar",
                );
                setInterval(() => window.location.reload(), 3000);
                window.scrollTo(0, 0);
            });
    }

    function enviarCadastroRelatorio(cadastroRelatorio) {
        let DadosCadastroComUTM = {...cadastroRelatorio, ...dadosUTM};

        axios
            .post(
                "https://hook.us1.make.com/ve465kt77kmkk9swe66w2qs9o1ecplkd",
                DadosCadastroComUTM,
            )
            .then(() => {
                console.log("Cadastro informado com sucesso!");
                window.location.replace(
                    `${ServerConfig.api.linkPublico}/empresas/confirmacaoCadastro-empresas`,
                );
            })
            .catch(() => {
                console.error("Falha ao informar cadastro");
                window.location.replace(
                    `${ServerConfig.api.linkPublico}/empresas/confirmacaoCadastro-empresas`,
                );
            });
    }

    useEffect(() => {
        if (idConvite) {
            setDadosCadastro(prevState => ({
                ...prevState,
                idUsuarioConvite: idConvite,
                is_CadastroPorConvite: true
            }))
            setDisabled(true)
        }
    }, []);

    // <Navbar isAreaEmpresa={true}/>
    return (
        <div className="container-page-login">
            <Helmet>
                <title>Cadastro - WedDigital</title>
            </Helmet>

            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe
                    title="gtag"
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
            {/* --- END PIXEL --- */}

            <div className="cadastro-usuario-empresas-container">
                {erroCadastro ? (
                    <div
                        className="container-sm alert alert-danger text-center w-25"
                        role="alert"
                    >
                        {erroCadastro}
                    </div>
                ) : (
                    ""
                )}

                {isCarregandoDados ? (
                    <CarregandoPlaceholder/>
                ) : (
                    <>
                        <img src={LogoWed} className="login-logo-img" alt="login-logo"/>
                        <h3>Cadastre-se e faça o seu negócio crescer</h3>
                        <form className="row g-3 needs-validation">
                            <div className="form-floating col-mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNomeUsuarioValidacao"
                                    required
                                    name="nomeUsuario"
                                    value={dadosCadastro.nomeUsuario}
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor="inputNomeUsuarioValidacao"
                                    className="form-label"
                                >
                                    Nome completo*
                                </label>
                            </div>

                            <div className="form-floating col-mb-4">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmailValidacao"
                                    autoComplete="off"
                                    required
                                />
                                <label htmlFor="inputEmailValidacao">E-mail*</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationSenha1"
                                    required
                                    name="senha"
                                    value={dadosCadastro.senha}
                                    onChange={onSenhaValida}
                                />
                                <label htmlFor="validationSenha1">Senha*</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="validationSenha2"
                                    required
                                    onChange={onSenhaIgual}
                                />
                                <label htmlFor="validationSenha2">Confirmar senha*</label>
                            </div>
                            {isSenhaValida ? (
                                ""
                            ) : (
                                <div className="col-md-6">
                                    <div className=".text-danger">
                                        <p className="text-danger">
                                            *Sua senha deve ter entre 8 e 36 caracteres
                                        </p>
                                    </div>
                                </div>
                            )}
                            {isSenhaIgual ? (
                                ""
                            ) : (
                                <div className="col-md-6">
                                    <div className=".text-danger">
                                        <p className="text-danger">*As senhas não são iguais!</p>
                                    </div>
                                </div>
                            )}

                            <div className="form-floating col-md-6">
                                <InputMask
                                    className="form-control"
                                    id="validationCustom01"
                                    required
                                    mask="(99) 99999-9999"
                                    maskChar=" "
                                    name="numeroContato"
                                    value={dadosCadastro.numeroContato}
                                    onChange={onChange}
                                />
                                <label htmlFor="validationCustom01">Whatsapp*</label>
                            </div>

                            <div className="form-floating col-md-6">
                                <select
                                    className="form-select"
                                    id="validationCustom04"
                                    required
                                    name="estado"
                                    value={dadosCadastro.estado}
                                    onChange={onChange}
                                >
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SP-CE">São Paulo - Centro</option>
                                    <option value="SP-ZL">São Paulo - Zona Leste</option>
                                    <option value="SP-ZN">São Paulo - Zona Norte</option>
                                    <option value="SP-ZO">São Paulo - Zona Oeste</option>
                                    <option value="SP-ZS">São Paulo - Zona Sul</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                                <label htmlFor="validationCustom04">Estado*</label>
                            </div>
                            {/* className='special-label-cascader' */}
                            <div className="form-floating col-md-12">
                                <Cascader
                                    options={optionsSegmento}
                                    onChange={onChangeSegmento}
                                    size={"large"}
                                    className="form-control"
                                    id="idSegmentoEmpresa"
                                    suffixIcon={
                                        <span
                                            role="img"
                                            aria-label="down"
                                            className="anticon anticon-down ant-select-suffix"
                                        >
                      <svg
                          viewBox="0 0 16 16"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                      >
                        <path
                            fill="none"
                            stroke="#343a40"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2 5l6 6 6-6"
                        />
                      </svg>
                    </span>
                                    }
                                />
                                <label htmlFor="idSegmentoEmpresa">Segmento da empresa*</label>
                            </div>
                            {dadosCadastro.idUsuarioConvite &&
                                <div className="form-floating col-md-12">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name='idUsuarioConvite'
                                        id="inputIdUsuarioConvite"
                                        autoComplete="off"
                                        disabled={disabled}
                                        required={false}
                                        onChange={onChange}
                                        value={dadosCadastro.idUsuarioConvite}
                                    />
                                    <label htmlFor="inputIdUsuarioConvite">Código do Convite</label>
                                </div>}
                            <div className="col-12 mt-5">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="invalidCheck"
                                        required
                                    />
                                    <label className="form-check-label">
                                        Declaro que li e aceito os{" "}
                                        <a
                                            href="/empresas/termos-de-uso"
                                            style={{color: "purple"}}
                                            target="_blank"
                                        >
                                            termos de uso
                                        </a>{" "}
                                        e a{" "}
                                        <a
                                            href="/politicas-de-privacidade"
                                            style={{color: "purple"}}
                                        >
                                            Política de Privacidade
                                        </a>
                                    </label>
                                    {isAcordoChecked ? (
                                        ""
                                    ) : (
                                        <div className=".text-danger">
                                            <p className="text-danger">
                                                *Para se cadastrar você precisa marcar a caixa de
                                                confirmação
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <input
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={validacao}
                                    value="Cadastrar"
                                    style={{fontSize: 18}}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 17,
                                }}
                            >
                                Possui conta?{" "}
                                <a
                                    href="/login"
                                    target="_self"
                                    style={{
                                        color: "purple",
                                        marginLeft: "0.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Toque aqui
                                </a>
                            </div>
                        </form>
                    </>
                )}
                <div className="form-envio-email-confirmacao-cadastro">
                    <form ref={form}>
                        <label htmlFor="inputHiddenNomeUsuario">Name</label>
                        <input type="text" name="nomeUsuario" id="inputHiddenNomeUsuario"/>
                        <label htmlFor="inputHiddenEmail">Email</label>
                        <input type="text" name="email" id="inputHiddenEmail"/>
                        <label htmlFor="inputHiddenLink">Link Validacao</label>
                        <input type="text" name="urlValidacaoEmail" id="inputHiddenLink"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
