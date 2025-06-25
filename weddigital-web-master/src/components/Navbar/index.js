import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import UserContext from "../../api/userContext-api/userContext";

// import Logo from "../../assets/icon.ico";
import Logo from "../../assets/logo-weddigital.png";

export default function Navbar(props) {
  const { token, setToken } = useContext(UserContext);
  const history = useNavigate();

  let dadosToken = "";
  let tipoUsuario = "";
  let possuiUsuario = false;

  let dadosUTM = props.utmCadastro;

  try {
    dadosToken = token.split("_");
    tipoUsuario = dadosToken[0];
    possuiUsuario = dadosToken !== "" ? true : false;
  } catch (e) {
    console.error("Error navbar");
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setToken("");
    history("/");
  }

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    if (openMenu == "open") {
      setOpenMenu(false);
      return false;
    }
    setOpenMenu("open");
  };

  return (
    <header className={openMenu}>
      <div className={props.fluid ? "container-fluid" : "container"}>
        <div className="content">
          <a href="/" className="logo">
            <img
              src={Logo}
              style={{ padding: "5px 0" }}
              alt="Logo Weddigital"
            />
            {/*
						<div>
							<span>WED</span>
							<span>Digital</span>
						</div>
						*/}
          </a>
          <nav>
            <ul>
              {props.isAreaEmpresa ? (
                <>
                  <li>
                    <a href="/empresas#inicio">Início</a>
                  </li>
                  <li>
                    <a href="#servicos">Serviços</a>
                  </li>
                  <li>
                    <a href="#premios">Vantagens</a>
                  </li>
                  <li>
                    <a href="#quemsomos">Quem Somos</a>
                  </li>
                  <li>
                    <a href="#quemsomos">Contato</a>
                  </li>
                </>
              ) : (
                <>
                  {tipoUsuario == "P" ? (
                    <>
                      <li>
                        <a href="/#inicio">Início</a>
                      </li>
                      <li>
                        <a href="/#sorteio">Sorteios</a>
                      </li>
                      <li>
                        <a href="/#dicas">Dicas</a>
                      </li>
                      <li>
                        <a href="/#quemsomos">Quem Somos</a>
                      </li>
                      <li>
                        <a href="/#quemsomos">Contato</a>
                      </li>
                    </>
                  ) : tipoUsuario == "N" ? (
                    <>
                      <li>
                        <a href="/perfil#meuCasamento">Meu Casamento</a>
                      </li>
                      <li>
                        <a
                          href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`}
                        >
                          Fornecedores
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a href="/#inicio">Início</a>
                      </li>
                      <li>
                        <a href="/#sorteio">Sorteios</a>
                      </li>
                      <li>
                        <a href="/#dicas">Dicas</a>
                      </li>
                      <li>
                        <a href="/#quemsomos">Quem Somos</a>
                      </li>
                      <li>
                        <a href="/#quemsomos">Contato</a>
                      </li>
                    </>
                  )}
                </>
              )}
              {props.isAreaEmpresa ? (
                <>
                  {possuiUsuario ? (
                    <>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary-outline"
                          href="/empresas"
                          onClick={onSubmit}
                        >
                          Sair
                        </a>
                      </li>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary"
                          href="/empresas/perfil"
                          id="btnLogin"
                        >
                          Perfil
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary-outline"
                          href="/login"
                          id="btnLoginEmpresa"
                        >
                          Entrar
                        </a>
                      </li>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary"
                          href={`/empresas/cadastro${dadosUTM}`}
                          id="btnAreaEmpresa"
                        >
                          Cadastre-se
                        </a>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  {token ? (
                    <>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary"
                          href={
                            tipoUsuario == "P" ? "/empresas/perfil" : "/perfil"
                          }
                          id="btnLogin"
                        >
                          Perfil
                        </a>
                      </li>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary-outline"
                          href="/"
                          onClick={onSubmit}
                        >
                          Sair
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary-outline"
                          href="/empresas"
                          id="btnParaEmpresas"
                        >
                          Empresas
                        </a>
                      </li>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary"
                          href={`/cadastro${dadosUTM}`}
                          id="btnCadastro"
                        >
                          Cadastre-se
                        </a>
                      </li>
                      <li>
                        <a
                          className="ms-lg-3 btn btn-primary-outline"
                          href="/login"
                          id="btnLogin"
                        >
                          Entrar
                        </a>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
          <button className="menu" onClick={toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
