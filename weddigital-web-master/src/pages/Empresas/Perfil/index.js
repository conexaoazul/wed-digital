import React, {useContext, useEffect, useState} from "react";
import "./PerfilEmpresa.css";

import api from "../../../api";
import UserContext from "../../../api/userContext-api/userContext";
import UsuarioModel from "../../../utils/models/UsuarioModel";
import StatusModel from "../../../utils/models/statusNivelModel";

import NavbarPerfil from "../../../components/Perfil/Navbar";

import FormResumo from "../../../components/Perfil/Empresas/FormResumo";
import FormDadosGerais from "../../../components/Perfil/Empresas/FormDadosGerais";
import FormMinhaConta from "../../../components/Perfil/Empresas/FormMinhaConta";
import FormCursos from "../../../components/Perfil/Empresas/FormCursos";
import FormOrcamentos from "../../../components/Perfil/Empresas/FormOrcamentos";
import FormComunidade from "../../../components/Perfil/Empresas/FormComunidade";
import FormSuporte from "../../../components/Perfil/Empresas/FormSuporte";
import iconVideo from "../../../assets/icons/video-icon.png";
import FormMeusContratos from "../../../components/Perfil/Empresas/FormMeusContratos";

import errorImage from "../../../assets/error.png";
import Helmet from "react-helmet";
import {FaHandshake} from "react-icons/fa";
import PopUpOferta from "../../Vendas/PopUp/PopUpOferta";
import ModalConviteEmpresa from "../../Vendas/PopUp/ModalConviteEmpresa";
import {useNavigate} from "react-router-dom";

export default function Perfil() {
    const estadosOferta = ["SP", "RJ", "PR", "BA", "MG"];
    const [isOpenConviteEmpresa, setIsOpenConviteEmpresa] = useState(false);
    const [dadosResumoPerfil, setDadosResumoPerfil] = useState(
        UsuarioModel.dadosResumoPerfilProfissionalDTO,
    );
    const isFree =
        dadosResumoPerfil.nivelConta === 1 &&
        estadosOferta.includes(dadosResumoPerfil.estado);

    const [openPopUp, setOpenPopUp] = useState(isFree);
    const [dadosStatusProfissional, setDadosStatusProfissional] = useState(
        StatusModel.StatusNivelProfissional,
    );
    const [isDadosInvalido, setIsDadosInvalido] = useState(false);
    const [tabLocation, setTabLocation] = useState("resumo");
    const [isCarregando, setIsCarregando] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState(
        require("../../../fileContents/imagensPerfil/avatar.jpg"),
    );
    const {token, setToken} = useContext(UserContext);
    const history = useNavigate();

    let urlTabAcesso = window.location.href.split("#");

    let dadosToken = token.split("_");
    let idProfissional = dadosToken[1];
    let tokenUsuario = dadosToken[2];

    function togglerSidebar(e) {
        let status = document
            .querySelector(".nav-system")
            .classList.contains("closed");
        if (e.target.localName === "html") {
            setSidebarOpen(true);
            return false;
        }
        if (
            e.target.classList.contains("toggler-navbar") ||
            e.target.parentElement.classList.contains("toggler-navbar")
        ) {
            if (status) {
                setSidebarOpen(false);
                return false;
            }
            setSidebarOpen(true);
            return false;
        }
        setSidebarOpen(true);
    }

    useEffect(() => {
        api
            .get(
                `usuario/empresa/obterDadosPerfil?idProfissional=${idProfissional}&tokenAcesso=${tokenUsuario}`,
            )
            .then(({data}) => {
                setDadosResumoPerfil(data);
                if (data.nivelConta === 1 && estadosOferta.includes(data.estado)) {
                    // if (data.nivelConta === 1) {
                    setOpenPopUp(true);
                }
                if (data.linkFotoPerfil) {
                    setImageUrl(data.linkFotoPerfil);
                }
                setIsCarregando(false);
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch(() => {
                setToken("");
                setIsCarregando(false);
                setIsDadosInvalido(true);
                history("/empresas");
            });

        api
            .get(`usuario/empresa/obterDadosPontuacao/${idProfissional}`)
            .then(({data}) => {
                setDadosStatusProfissional(data);
                setTabLocation(urlTabAcesso[1] ? urlTabAcesso[1] : "resumo");
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch(() => {
                setIsCarregando(false);
            });
        if (!loaded) {
            let b = document.querySelector("html");
            b.addEventListener("click", function (e) {
                togglerSidebar(e);
            });
            window.addEventListener("scroll", function () {
                setSidebarOpen(true);
            });
            setLoaded(true);
        }
        if (isFree) setOpenPopUp(true);
    }, [loaded]);

    return (
        <div className="perfil-container">
            <ModalConviteEmpresa
                profissional={dadosResumoPerfil}
                isOpen={isOpenConviteEmpresa}
                handleClose={() => {
                    setIsOpenConviteEmpresa(!isOpenConviteEmpresa);
                    setInterval(() => {
                        if (isFree) setOpenPopUp(true);
                    }, 300000);
                }}
            />
            {openPopUp && <PopUpOferta setOpenPopUp={setOpenPopUp}/>}
            <Helmet>
                <title>Perfil - WedDigital</title>
            </Helmet>
            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe
                    title="GTM"
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
            {/* --- END PIXEL --- */}
            <div className={["nav-system " + (sidebarOpen ? "closed" : "")]}>
                <NavbarPerfil
                    toggleState={sidebarOpen}
                    toggleMove={() => []}
                    nivelContaEmpresa={dadosStatusProfissional.nivelContaNome}
                />
                <aside className="sidebar_">
                    {/* profile */}
                    <div className="profile">
                        <div
                            className="image"
                            style={{
                                background: "url(" + imageUrl + ") no-repeat center/cover",
                            }}
                        ></div>
                        <h4>{dadosResumoPerfil.nomeEmpresa}</h4>
                    </div>
                    {/* list */}
                    <ul>
                        {/* tab button */}
                        <li>
                            <a
                                href="#resumo"
                                onClick={() => setTabLocation("resumo")}
                                className={tabLocation === "resumo" ? "active" : ""}
                            >
                                <i className="fa-solid fa-address-card"></i>
                                <span>Meu perfil</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#meuPerfil"
                                onClick={() => setTabLocation("meuPerfil")}
                                className={tabLocation === "meuPerfil" ? "active" : ""}
                            >
                                <i className="fa-solid fa-store"></i>
                                <span>Dados gerais</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#meusContratos"
                                onClick={() => setTabLocation("meusContratos")}
                                className={tabLocation === "meusContratos" ? "active" : ""}
                            >
                                <i className="fa-solid">
                                    <FaHandshake/>
                                </i>
                                <span>Meus contratos</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#orcamentos"
                                onClick={() => setTabLocation("orcamentos")}
                                className={tabLocation === "orcamentos" ? "active" : ""}
                            >
                                <i className="fa-solid fa-message"></i>
                                <span>Meus orçamentos</span>
                            </a>
                        </li>

                        {/* tab button */}
                        <li>
                            <a
                                href="#cursos"
                                onClick={() => setTabLocation("cursos")}
                                className={tabLocation === "cursos" ? "active" : ""}
                            >
                                <i className="fa-solid fa-graduation-cap"></i>
                                <span>Cursos</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#plans"
                                onClick={() => setTabLocation("plans")}
                                className={tabLocation === "plans" ? "active" : ""}
                            >
                                {/* <i className="fa-solid fa-people-group"></i> */}
                                <i className="fa-solid fa-rocket"></i>
                                <span>Planos</span>
                            </a>
                        </li>

                        {/* tab button */}
                        {/*<li>*/}
                        {/*	<a href="#minhaConta" onClick={() => setTabLocation("minhaConta")} className={tabLocation === "minhaConta" ? "active" : ""}>*/}
                        {/*		<i>*/}
                        {/*			<HiUser />*/}
                        {/*		</i>*/}
                        {/*		<span>Minha Conta</span>*/}
                        {/*	</a>*/}
                        {/*</li>*/}
                        {/* tab button */}
                        <li>
                            <a
                                href="#suporte"
                                onClick={() => setTabLocation("suporte")}
                                className={tabLocation === "suporte" ? "active" : ""}
                            >
                                <i className="fa-solid fa-headset"></i>
                                <span>Suporte</span>
                            </a>
                        </li>

                        <li>
                            <a
                                className="suporte"
                                href="https://youtu.be/0cVxC_pIOeg?si"
                                style={{textAlign: "center"}}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i
                                    style={{
                                        background: "url(" + iconVideo + ") no-repeat center/cover",
                                        width: 25,
                                        height: 25,
                                    }}
                                ></i>
                                <span>Criando seu perfil</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
            <main className="dashboard">
                {isCarregando ? (
                    <section className="loading">
                        <div className="container">
                            <div className="content">
                                <div className="spinner-border text-warning">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        {isDadosInvalido ? (
                            <section className="error">
                                <div className="container">
                                    <div className="content">
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    <div className="col-lg-5 mx-auto">
                                                        <img
                                                            src={errorImage}
                                                            className="img-fluid"
                                                            alt={"Imagem Erro"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    <div className="col-lg-4 mx-auto">
                                                        <h6>
                                                            Oooops! Parece que algo não saiu como o planejado.
                                                            Por favor, tente novamente.
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <>
                                {/* resumo */}
                                {tabLocation === "resumo" ? (
                                    <FormResumo
                                        tabLocation={setTabLocation}
                                        dadosStatusPontuacao={dadosStatusProfissional}
                                        dadosUsuario={dadosResumoPerfil}
                                        setTabLocation={setTabLocation}
                                        isPerfilVisivelMarketplace={
                                            dadosResumoPerfil.perfilVisivelMarketplace
                                        }
                                        itensPendentesParaMarketplace={
                                            dadosResumoPerfil.itensPendentesParaMarketplace
                                        }
                                        handleClick={() => setIsOpenConviteEmpresa(true)}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* meus dados */}
                                {tabLocation === "meuPerfil" ? (
                                    <FormDadosGerais
                                        setImageUrl={setImageUrl}
                                        dadosResumoPerfil={dadosResumoPerfil}
                                        idUsuario={dadosResumoPerfil.idUsuario}
                                        idProfissional={idProfissional}
                                        tokenUsuario={tokenUsuario}
                                        setTabLocation={setTabLocation}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* minha conta */}
                                {tabLocation === "minhaConta" ? (
                                    <FormMinhaConta
                                        tabLocation={setTabLocation}
                                        dadosStatusPontuacao={dadosStatusProfissional}
                                        dadosUsuario={dadosResumoPerfil}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* orcamentos */}
                                {tabLocation === "orcamentos" ? (
                                    <FormOrcamentos
                                        tabLocation={setTabLocation}
                                        dadosProfissional={dadosResumoPerfil}
                                        tokenUsuario={tokenUsuario}
                                        nivelConta={dadosResumoPerfil.nivelConta}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* cursos */}
                                {tabLocation === "cursos" ? (
                                    <FormCursos
                                        tabLocation={setTabLocation}
                                        nivelConta={dadosResumoPerfil.nivelConta}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* plans */}
                                {tabLocation === "plans" ? (
                                    <FormComunidade
                                        tabLocation={setTabLocation}
                                        nivelConta={dadosResumoPerfil.nivelConta}
                                    />
                                ) : (
                                    ""
                                )}

                                {/* suporte */}
                                {tabLocation === "suporte" ? (
                                    <FormSuporte tabLocation={setTabLocation}/>
                                ) : (
                                    ""
                                )}

                                {/* meus contratos */}
                                {tabLocation === "meusContratos" ? (
                                    <FormMeusContratos
                                        tabLocation={setTabLocation}
                                        dadosProfissional={dadosResumoPerfil}
                                    />
                                ) : (
                                    ""
                                )}
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
