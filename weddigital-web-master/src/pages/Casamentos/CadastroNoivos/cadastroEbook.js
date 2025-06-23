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

export default function CadastroNoivosEbook() {
  const { setToken } = useContext(UserContext);
  const form = useRef();

  const [DadosCadastro, setDadosCadastro] = useState(
    UsuarioModel.dadosUsuarioNoivDTO,
  );
  const [ErroCadastro, setErroCadastro] = useState("");
  const [IsCarregandoDados, setIsCarregandoDados] = useState(false);
  const [IsAcordoChecked, setIsAcordoChecked] = useState(true);
  const [IsSenhaValida, setIsSenhaValida] = useState(true);
  const [IsSenhaIgual, setIsSenhaIgual] = useState(true);
  const [IsNoiva, setIsNoiva] = useState(true);

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
      ...DadosCadastro,
      [name]: value,

      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      utm_id: utm_id,
      utm_term: utm_term,
      utm_content: utm_content,
      isSimulacao: !isAmbienteProducao,
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
      ...DadosCadastro,
      [name]: value,
    });
  }

  function onSenhaIgual(ev) {
    ev.preventDefault();
    setIsSenhaIgual(false);
    const { value } = ev.target;
    let isSenhaIgual = verificarIgualdadeSenha(DadosCadastro.senha, value);

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

    DadosCadastro.email = inputEmail;
    DadosCadastro.isSimulacao = !constantes["ambiente-producao"];
    document.getElementById("inputHiddenEmail").value = inputEmail;
    document.getElementById("inputHiddenNomeUsuario").value = inputNome;

    setIsCarregandoDados(true);
    salvarDadosNoiva();
  }

  function salvarDadosNoiva() {
    setIsCarregandoDados(true);
    try {
      api
        .post("usuario/noivos/novoUsuario", DadosCadastro)
        .then((response) => {
          setToken(response.data);
          window.open(
            "https://storage.weddigital.com.br/weddigital/Ebook%20-%20Casando%20Sem%20Neura.pdf",
            "_blank",
          );
          setTimeout(() => {
            window.location.replace(`${urlPublica}/confirmacaoCadastro-noivos`);
          }, 2000);
        })
        .catch((ex) => {
          window.scrollTo(0, 0);
          setErroCadastro(`Ooops! ${ex}`);
          setIsCarregandoDados(false);
        });
    } catch (error) {
      setErroCadastro(
        "Ooops! Houve algum problema em seu cadastro, tente novamente ou contate nosso suporte",
      );
      setIsCarregandoDados(false);
    }
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
        {ErroCadastro ? (
          <div
            className="container-sm alert alert-danger text-center w-25"
            role="alert"
          >
            {ErroCadastro}
          </div>
        ) : (
          ""
        )}

        {IsCarregandoDados ? (
          <CarregandoPlaceholder />
        ) : (
          <>
            <img src={Logo} className="login-logo-img" alt={"Logo"} />
            <h3>Cadastre-se para baixar e planejar sua festa de casamento</h3>
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
                  value={DadosCadastro.nomeUsuario}
                  onChange={onChange}
                  required={true}
                />
                <label>Nome completo*</label>
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
                <label className="floatingInput">Email*</label>
              </div>

              <div className="form-floating col-mb-4">
                <InputMask
                  className="form-control"
                  required={true}
                  mask="(99) 99999-9999"
                  maskChar=" "
                  name="contato"
                  value={DadosCadastro.contato}
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
                  value={DadosCadastro.senha}
                  onChange={onSenhaValida}
                />
                <label className="floatingInput">Senha*</label>
              </div>

              <div className="form-floating col-xs-12 col-md-6">
                <input
                  type="password"
                  className="form-control"
                  id="validationSenha2"
                  required
                  onChange={onSenhaIgual}
                />
                <label className="floatingInputs">Confirmar senha*</label>
              </div>

              {IsSenhaValida ? (
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

              {IsSenhaIgual ? (
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
                  value={DadosCadastro.estado}
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
                <label className="floatingInputs">
                  Onde pretende se casar?*
                </label>
              </div>

              <div className="form-floating col-xs-12 col-md-6">
                <input
                  type="date"
                  className="form-control"
                  required={true}
                  name="dataCasamento"
                  value={DadosCadastro.dataCasamento}
                  onChange={onChange}
                />
                <label className="floatingInput">
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
                  checked={IsNoiva}
                  value={IsNoiva}
                  onChange={() => {
                    setIsNoiva(!IsNoiva);
                    setDadosCadastro({
                      ...DadosCadastro,
                      is_Noiva: !IsNoiva,
                    });
                  }}
                />
                <label className="form-check-label">{`Sou ${IsNoiva ? "a noiva" : "o noivo"}`}</label>
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
                  {IsAcordoChecked ? (
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
                  // onClick={validacao}
                >
                  Cadastrar e baixar
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
            <label>Name</label>
            <input type="text" name="nomeUsuario" id="inputHiddenNomeUsuario" />
            <label>Email</label>
            <input type="text" name="email" id="inputHiddenEmail" />
            <label>Link Validacao</label>
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
