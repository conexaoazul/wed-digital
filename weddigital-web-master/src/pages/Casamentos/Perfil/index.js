import React, {useContext, useEffect, useState} from "react";
import "./PerfilNoivos.css";

import api from "../../../api";
import UserContext from "../../../api/userContext-api/userContext";

import NavbarPerfil from "../../../components/Perfil/Navbar";

import FormResumo from "../../../components/Perfil/Noivos/FormResumoCasamentos";
import FormDadosCasamentos from "../../../components/Perfil/Noivos/FormDadosCasamentos";
import FormMinhaConta from "../../../components/Perfil/Noivos/FormMinhaConta";
import FormPontosWed from "../../../components/Perfil/Noivos/FormPontosWed";
import FormDicasNoivas from "../../../components/Perfil/Noivos/FormDicasNoivas";
import FormCursosNoivas from "../../../components/Perfil/Noivos/FormCursosNoivas";
import FormComunidadeNoivos from "../../../components/Perfil/Noivos/FormComunidadeNoivos";
import FormOrcamentosNoivos from "../../../components/Perfil/Noivos/FormOrcamentosNoivos";
import Helmet from "react-helmet";
import FormSuporteNoivas from "../../../components/Perfil/Noivos/FormSuporteNoivas";

import errorImage from "../../../assets/error.png";
import {GiDiamondRing} from "react-icons/gi";
import {FaHandshake} from "react-icons/fa";
import FormMeusFornecedores from "../../../components/Perfil/Noivos/FormMeusFornecedores";

export default function Perfil() {
    const [DadosResumoPerfil, setDadosResumoPerfil] = useState([]);
    const [IsDadosInvalido, setIsDadosInvalido] = useState(false);
    const [TabLocation, setTabLocation] = useState("resumo");
    const [IsCarregando, setIsCarregando] = useState(true);
    const [SidebarOpen, setSidebarOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState(
        require("../../../fileContents/imagensPerfil/avatar.jpg"),
    );
    const [Loaded, setLoaded] = useState(false);
    const {token} = useContext(UserContext);

    let urlTabAcesso = window.location.href.split("#");
    let dadosToken = token.split("_");
    let tipoUsuario = dadosToken[0];
    let idNoivos = dadosToken[1];
    let tokenUsuario = dadosToken[2];

    function togglerSidebar(e) {
        if (e !== null) {
            let status = document
                .querySelector(".nav-system")
                .classList.contains("closed");
            if (e.target.localName === "html") {
                setSidebarOpen(true);
                return false;
            }
            if (
                e.target?.classList?.contains("toggler-navbar") ||
                e.target?.parentElement?.classList?.contains("toggler-navbar")
            ) {
                if (status) {
                    setSidebarOpen(false);
                    return false;
                }
                setSidebarOpen(true);
                return false;
            }
        }
        setSidebarOpen(true);
    }

    useEffect(() => {
        api
            .get(
                `usuario/noivos/obterDadosPerfil?idNoivos=${idNoivos}&tokenAcesso=${tokenUsuario}`,
            )
            .then(({data}) => {
                setDadosResumoPerfil(data);
                if (data.linkFotoPerfil) {
                    setImageUrl(data.linkFotoPerfil);
                }
                setTabLocation(urlTabAcesso[1] ? urlTabAcesso[1] : "resumo");
                localStorage.setItem("estado", data.estado);
                setIsCarregando(false);
                //eslint-disable-next-line react-hooks/exhaustive-deps
            })
            .catch(({error}) => {
                setIsCarregando(false);
                setIsDadosInvalido(true);
            });
        if (!Loaded) {
            let b = document.querySelector("html");
            b.addEventListener("click", function (e) {
                togglerSidebar(e);
            });
            window.addEventListener("scroll", function (e) {
                setSidebarOpen(true);
            });
            setLoaded(true);
        }
        const hash = window.location.hash;
        setTabLocation(hash);
    }, [Loaded]);

    function toggleSidebar() {
        // setSidebarOpen(!SidebarOpen);
    }

    return (
        <div className="perfil-container">
            <Helmet>
                <title>Perfil - WedDigital</title>
            </Helmet>

            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                ></iframe>
            </noscript>
            {/* --- END PIXEL --- */}

            <div className={["nav-system " + (SidebarOpen ? "closed" : "")]}>
                <NavbarPerfil
                    toggleState={setSidebarOpen}
                    toggleMove={toggleSidebar}
                    nivelContaEmpresa={"null"}
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
                        <h4>{DadosResumoPerfil.nomeUsuario}</h4>
                    </div>
                    {/* list */}
                    <ul>
                        {/* tab button */}
                        <li>
                            <a
                                href="#resumo"
                                onClick={() => setTabLocation("resumo")}
                                className={TabLocation === "resumo" ? "active" : ""}
                            >
                                <i className="fa-solid fa-address-card"></i>
                                <span>Meu perfil</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#meuCasamento"
                                onClick={() => setTabLocation("meuCasamento")}
                                className={TabLocation === "meuCasamento" ? "active" : ""}
                            >
                                <i>
                                    <GiDiamondRing/>
                                </i>
                                <span>Meu Casamento</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#meusFornecedores"
                                onClick={() => setTabLocation("meusFornecedores")}
                                className={TabLocation === "meusFornecedores" ? "active" : ""}
                            >
                                <i className="fa-solid">
                                    <FaHandshake/>
                                </i>
                                <span>Meus fornecedores</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#orcamentos"
                                onClick={() => setTabLocation("orcamentos")}
                                className={TabLocation === "orcamentos" ? "active" : ""}
                            >
                                <i className="fa-solid fa-comment-dots"></i>
                                <span>Mensagens</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href="#pontos"
                                onClick={() => setTabLocation("pontos")}
                                className={TabLocation === "pontos" ? "active" : ""}
                            >
                                <i className="fa-solid fa-dollar-sign cifrao"></i>
                                <span>Pontos Wed</span>
                            </a>
                        </li>
                        {/* tab button */}
                        {/*<li>*/}
                        {/*	<a href="#luaDeMel" onClick={() => setTabLocation("luaDeMel")} className={TabLocation === "luaDeMel" ? "active" : ""}>*/}
                        {/*		<i className="fa-solid fa-heart"></i>*/}
                        {/*		<span>Lua de mel</span>*/}
                        {/*	</a>*/}
                        {/*</li>*/}
                        {/* tab button */}
                        <li>
                            <a
                                href="#cursos"
                                onClick={() => setTabLocation("cursos")}
                                className={TabLocation === "cursos" ? "active" : ""}
                            >
                                <i className="fa-solid fa-graduation-cap"></i>
                                <span>Cursos</span>
                            </a>
                        </li>
                        {/* tab button */}
                        <li>
                            <a
                                href={`/buscar-profissional?estado=${localStorage.getItem(
                                    "estado",
                                )}&categoria=&segmento=&pagina=1`}
                                className={TabLocation === "" ? "active" : ""}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Fornecedores</span>
                            </a>
                        </li>
                        {/*/!* tab button *!/*/}
                        <li>
                            <a
                                href="/blog"
                                className={TabLocation === "inspiracoes" ? "active" : ""}
                            >
                                <i className="fa-solid fa-lightbulb"></i>
                                <span>Ideias</span>
                            </a>
                        </li>
                        {/*/!* tab button *!/*/}
                        {/*<li>*/}
                        {/*	<a href="#comunidade" onClick={() => setTabLocation("comunidade")} className={TabLocation === "comunidade" ? "active" : ""}>*/}
                        {/*		<i className="fa-solid fa-people-group"></i>*/}
                        {/*		<span>Comunidade</span>*/}
                        {/*	</a>*/}
                        {/*</li>*/}
                        {/* tab button */}
                        {/* tab button */}

                        {/*<li>*/}
                        {/*	<a href="#minhaConta" onClick={() => setTabLocation("minhaConta")} className={TabLocation === "minhaConta" ? "active" : ""}>*/}
                        {/*		<i>*/}
                        {/*			<HiUser />*/}
                        {/*		</i>*/}
                        {/*		<span>Minha Conta</span>*/}
                        {/*	</a>*/}
                        {/*</li>*/}
                        <li>
                            <a
                                href="#suporte"
                                onClick={() => setTabLocation("suporte")}
                                className={TabLocation === "suporte" ? "active" : ""}
                            >
                                <i className="fa-solid fa-headset"></i>
                                <span>Suporte</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>

            <main
                className="dashboard"
                style={{
                    background: TabLocation ? "var(--color-branco)" : "",
                }}
            >
                {IsCarregando ? (
                    <section className="loading">
                        <div className="container">
                            <div className="content">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        {IsDadosInvalido ? (
                            <section className="error">
                                <div className="container">
                                    <div className="content">
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="row g-4">
                                                    <div className="col-lg-5 mx-auto">
                                                        <img src={errorImage} className="img-fluid"/>
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
                                {/* float */}
                                {/*<aside className="float-message">*/}
                                {/*	<div className="container-fluid">*/}
                                {/*		<div className="p-1">*/}
                                {/*			<div className="row g-4 justify-content-between align-items-center">*/}
                                {/*				<div className="col-lg-auto">*/}
                                {/*					<h6 className="mb-0">Torne seu casamento inesquecível!</h6>*/}
                                {/*				</div>*/}
                                {/*				<div className="col-lg-auto">*/}
                                {/*					<a href="https://forms.gle/6g5FEVqeanwthdPi7" target="_blank" className="btn btn-secondary">*/}
                                {/*						<span>Compartilhar meu sonho</span>*/}
                                {/*					</a>*/}
                                {/*				</div>*/}
                                {/*			</div>*/}
                                {/*		</div>*/}
                                {/*	</div>*/}
                                {/*</aside>*/}

                                {/* /float */}
                                {/* resumo */}
                                {TabLocation === "resumo" ? (
                                    <FormResumo
                                        tabLocation={setTabLocation}
                                        dadosResumoPerfil={DadosResumoPerfil}
                                        dadosCasamento={DadosResumoPerfil}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* meus dados */}
                                {TabLocation === "meuCasamento" ? (
                                    <FormDadosCasamentos
                                        tabLocation={setTabLocation}
                                        setImageUrl={setImageUrl}
                                        dadosResumoPerfil={DadosResumoPerfil}
                                        idUsuario={DadosResumoPerfil.idUsuario}
                                        idNoivos={idNoivos}
                                        tokenUsuario={tokenUsuario}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* minha conta */}
                                {TabLocation === "minhaConta" ? (
                                    <FormMinhaConta
                                        tabLocation={setTabLocation}
                                        setImageUrl={setImageUrl}
                                        dadosResumoPerfil={DadosResumoPerfil}
                                        idUsuario={DadosResumoPerfil.idUsuario}
                                        idNoivos={idNoivos}
                                        tokenUsuario={tokenUsuario}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* meus fornecedores */}
                                {TabLocation === "meusFornecedores" ? (
                                    <FormMeusFornecedores
                                        tabLocation={setTabLocation}
                                        setImageUrl={setImageUrl}
                                        dadosResumoPerfil={DadosResumoPerfil}
                                        idUsuario={DadosResumoPerfil.idUsuario}
                                        idNoivos={idNoivos}
                                        tokenUsuario={tokenUsuario}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* mensagens */}
                                {TabLocation === "orcamentos" ? (
                                    <FormOrcamentosNoivos
                                        tabLocation={setTabLocation}
                                        dadosResumoPerfil={DadosResumoPerfil}
                                        tokenUsuario={tokenUsuario}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* pontos */}
                                {TabLocation === "pontos" ? (
                                    <FormPontosWed
                                        tabLocation={setTabLocation}
                                        dadosCasamento={DadosResumoPerfil}
                                    />
                                ) : (
                                    ""
                                )}
                                {/* cursos */}
                                {TabLocation === "cursos" ? (
                                    <FormCursosNoivas tabLocation={setTabLocation}/>
                                ) : (
                                    ""
                                )}
                                {/* dicas */}
                                {TabLocation === "dicas" ? (
                                    <FormDicasNoivas tabLocation={setTabLocation}/>
                                ) : (
                                    ""
                                )}
                                {/* comunidade */}
                                {TabLocation === "comunidade" ? (
                                    <FormComunidadeNoivos tabLocation={setTabLocation}/>
                                ) : (
                                    ""
                                )}
                                {/* suporte */}
                                {TabLocation === "suporte" ? (
                                    <FormSuporteNoivas tabLocation={setTabLocation}/>
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
