import React, { useContext, useRef, useState } from "react";
import InputMask from "react-input-mask";
import "./CadastroNoivos.css";

import api from "../../../api";
import UserContext from "../../../api/userContext-api/userContext";
import UsuarioModel from "../../../utils/models/UsuarioModel";
import {
  validarEmail,
  verificarIgualdadeSenha,
  verificarIntegridadeSenha,
} from "../../../utils/Utils";
import { estadosDoBrasil } from "../../../utils/models/ModelsUtils";

import CarregandoPlaceholder from "../../../components/Modal/CarregandoPlaceholder";
import Logo from "../../../assets/icon.ico";
import Helmet from "react-helmet";

import constantes from "../../../constantes.json";

export default function CadastroUsuario() {
  const { setToken } = useContext(UserContext);
  const form = useRef();

  const [dadosCadastro, setDadosCadastro] = useState(
    UsuarioModel.dadosUsuarioNoivDTO,
  );
  const [erroCadastro, setErroCadastro] = useState("");
  const [isCarregandoDados, setIsCarregandoDados] = useState(false);
  const [isAcordoChecked, setIsAcordoChecked] = useState(true);
  const [isSenhaValida, setIsSenhaValida] = useState(true);
  const [isSenhaIgual, setIsSenhaIgual] = useState(true);
  const [isNoiva, setIsNoiva] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source");
  const utm_medium = params.get("utm_medium");
  const utm_campaign = params.get("utm_campaign");
  const utm_id = params.get("utm_id");
  const utm_term = params.get("utm_term");
  const utm_content = params.get("utm_content");

  let isAmbienteProducao = constantes["ambiente-producao"];
  let urlPublica = isAmbienteProducao
    ? constantes.linkPublicoProducao
    : constantes.linkPublicoLocalhost;

  function onChange(ev) {
    ev.preventDefault();
    const { value, name } = ev.target;
    setDadosCadastro({
      ...dadosCadastro,
      [name]: value,

      isSimulacao: !isAmbienteProducao,
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_id: utm_id,
      utm_term: utm_term,
      utm_content: utm_content,
    });
  }

  function onSenhaValida(ev) {
    ev.preventDefault();
    setIsSenhaValida(false);
    const { value, name } = ev.target;

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
    const { value } = ev.target;
    let isSenhaIgual = verificarIgualdadeSenha(dadosCadastro.senha, value);

    if (isSenhaIgual) {
      setIsSenhaIgual(true);
    } else {
      setIsSenhaIgual(false);
    }
  }

  function validacao(ev) {
    ev.preventDefault();
    setIsCarregandoDados(true);
    setErroCadastro("");
    setIsSenhaValida(true);

    if (!validarSenha()) {
      setIsSenhaValida(false);
      setIsCarregandoDados(false);
      return;
    }

    let termosUso = document.getElementById("invalidCheck").checked;
    let inputEmail = document.getElementById("inputEmailValidacao").value;
    let inputNome = document.getElementById("inputNomeUsuarioValidacao").value;

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

    dadosCadastro.email = inputEmail;
    dadosCadastro.isSimulacao = !constantes["ambiente-producao"];
    document.getElementById("inputHiddenEmail").value = inputEmail;
    document.getElementById("inputHiddenNomeUsuario").value = inputNome;

    setIsCarregandoDados(true);
    salvarDadosNoiva();
  }

  function salvarDadosNoiva() {
    setIsCarregandoDados(true);
    api
      .post("usuario/noivos/novoUsuario", dadosCadastro)
      .then((response) => {
        setToken(response.data);
        window.location.replace(`${urlPublica}/confirmacaoCadastro-noivos`);
      })
      .catch((ex) => {
        window.scrollTo(0, 0);
        setErroCadastro(`Ooops! ${ex}`);
        setIsCarregandoDados(false);
      });
  }

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

      <div className="cadastro-usuario-noivos-container">
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
          <CarregandoPlaceholder />
        ) : (
          <>
            <img src={Logo} className="login-logo-img" alt={"Logo"} />
            <h3 style={{ marginBottom: 0 }}>Cadastre-se e encontre</h3>
            <h3 style={{ marginTop: 0 }}> tudo para o seu casamento</h3>
            <form
              className="row g-3 needs-validation divContainerFormCadastro"
              onSubmit={validacao}
            >
              <div className="form-floating col-mb-4">
                <input
                  className="form-control"
                  type="text"
                  id="inputNomeUsuarioValidacao"
                  name="nomeUsuario"
                  value={dadosCadastro.nomeUsuario}
                  onChange={onChange}
                  required={true}
                />
                <label htmlFor="inputNomeUsuarioValidacao">
                  Nome completo*
                </label>
              </div>

              <div className="form-floating col-mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmailValidacao"
                  autoComplete="off"
                  aria-describedby="emailHelp"
                  required
                  name="email"
                />
                <label htmlFor="inputEmailValidacao" className="floatingInput">
                  Email*
                </label>
              </div>

              <div className="form-floating col-mb-4">
                <InputMask
                  className="form-control"
                  required={true}
                  mask="(99) 99999-9999"
                  maskChar=" "
                  name="contato"
                  value={dadosCadastro.contato}
                  onChange={onChange}
                />
                <label htmlFor="exampleInputEmail1" className="floatingInput">
                  Whatsapp*
                </label>
              </div>

              <div className="form-floating col-xs-12 col-md-6">
                <input
                  type="password"
                  className="form-control"
                  id="validationSenha1"
                  required={true}
                  name="senha"
                  value={dadosCadastro.senha}
                  onChange={onSenhaValida}
                />
                <label htmlFor="validationSenha1" className="floatingInput">
                  Senha*
                </label>
              </div>

              <div className="form-floating col-xs-12 col-md-6">
                <input
                  type="password"
                  className="form-control"
                  id="validationSenha2"
                  required
                  onChange={onSenhaIgual}
                />
                <label htmlFor="validationSenha2" className="floatingInputs">
                  Confirmar senha*
                </label>
              </div>

              {isSenhaValida ? (
                ""
              ) : (
                <div className="col-mb-4">
                  <div className=".text-danger">
                    <p className="text-danger">
                      *Sua senha deve ter entre 8 e 36 caracteres e incluir,{" "}
                      <br></br>
                      pelo menos, uma letra maiúscula e um número!
                    </p>
                  </div>
                </div>
              )}

              {isSenhaIgual ? (
                ""
              ) : (
                <div className="col-mb-4">
                  <div className=".text-danger">
                    <p className="text-danger">*As senhas não são iguais!</p>
                  </div>
                </div>
              )}

              <div className="form-floating col-xs-12 col-md-6">
                <select
                  className="form-select"
                  required
                  name="estado"
                  id="estado-casar"
                  value={dadosCadastro.estado}
                  onChange={onChange}
                >
                  <option selected disabled>
                    Selecione
                  </option>

                  {estadosDoBrasil.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
                <label htmlFor="estado-casar" className="floatingInputs">
                  Onde pretende se casar?*
                </label>
              </div>

              <div className="form-floating col-xs-12 col-md-6">
                <input
                  type="date"
                  className="form-control"
                  required={true}
                  name="dataCasamento"
                  id="date-casamento"
                  value={dadosCadastro.dataCasamento}
                  onChange={onChange}
                />
                <label htmlFor="date-casamento" className="floatingInput">
                  Qual data da festa do casamento?*
                </label>
              </div>

              <div
                className="form-check form-switch"
                style={{ paddingLeft: "3rem", paddingTop: "1rem" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefaultLogin"
                  name="is_CNPJ"
                  checked={isNoiva}
                  value={isNoiva}
                  onChange={() => {
                    setIsNoiva(!isNoiva);
                    setDadosCadastro({
                      ...dadosCadastro,
                      is_Noiva: !isNoiva,
                    });
                  }}
                />
                <label className="form-check-label">{`Sou ${isNoiva ? "a noiva" : "o noivo"}`}</label>
              </div>

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
                      href="/noivas/termos-de-uso"
                      style={{ color: "purple" }}
                      target="_blank"
                    >
                      termos de uso{" "}
                    </a>{" "}
                    e as{" "}
                    <a
                      style={{ color: "purple" }}
                      href="/regras-sorteio"
                      target="_blank"
                    >
                      {" "}
                      regras do sorteio
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
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ fontSize: 18 }}
                  // onClick={validacao}
                >
                  Cadastrar
                </button>
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href="/empresas/cadastro"
                  target="_self"
                  style={{
                    color: "purple",
                    marginLeft: "0.5rem",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Cadastro empresa
                </a>
              </div>
            </form>
          </>
        )}
        <div className="form-envio-email-confirmacao-cadastro">
          <form ref={form}>
            <label htmlFor="inputHiddenNomeUsuario">Name</label>
            <input type="text" name="nomeUsuario" id="inputHiddenNomeUsuario" />
            <label htmlFor={"inputHiddenEmail"}>Email</label>
            <input type="text" name="email" id="inputHiddenEmail" />
            <label htmlFor="inputHiddenLink">Link Validacao</label>
            <input type="text" name="urlValidacaoEmail" id="inputHiddenLink" />
          </form>
        </div>
      </div>
    </div>
  );
}

function validarSenha() {
  let senha1 = document.getElementById("validationSenha1").value;
  let senha2 = document.getElementById("validationSenha2").value;
  let isSenhaIgual = verificarIgualdadeSenha(senha1, senha2);

  if (isSenhaIgual) {
    return verificarIntegridadeSenha(senha1);
  } else {
    return false;
  }
}
