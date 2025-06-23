import React, { useState } from "react";
import "./LoginEmpresa.css";

import api from "../../api";
import CarregandoPlaceholder from "../../components/Modal/CarregandoPlaceholder";
import ModalMensagemSucesso from "../../components/Modal/ModalMensagemSucesso";
import ModalMensagemErro from "../../components/Modal/ModalMensagemErro";
import Logo from "../../assets/icon.ico";
import Navbar from "../../components/Navbar";
import { tratarErroRequestApi } from "../../utils/TratamentoErros";

export default function SolicitarNovaSenha() {
  const [IsCarregandoDados, setIsCarregandoDados] = useState(false);
  const [erroInfo, setErroInfo] = useState("");
  const [isSucessoNovaSenha, setIsSucessoNovaSenha] = useState(false);
  const [email, setEmail] = useState("");

  let urlUTM = window.location.href.split("?");
  let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

  function onChange(ev) {
    const { value } = ev.target;
    setEmail(value);
    setErroInfo("");
    setIsSucessoNovaSenha(false);
  }

  function solicitarLinkNovaSenha() {
    setIsCarregandoDados(true);
    setErroInfo("");
    setIsSucessoNovaSenha(false);

    api
      .get(`usuario/solicitarNovaSenha?email=${email}`)
      .then((response) => {
        setIsSucessoNovaSenha(true);
        setIsCarregandoDados(false);
      })
      .catch((error) => {
        setErroInfo(tratarErroRequestApi(error));
        setIsCarregandoDados(false);
      });
  }

  return (
    <div>
      <Navbar utmCadastro={utmData} />

      <div className="container-page-login">
        <div className="login-usuario-container">
          {!erroInfo ? "" : <ModalMensagemErro texto={erroInfo} />}
          {!isSucessoNovaSenha ? (
            ""
          ) : (
            <ModalMensagemSucesso
              texto="Enviamos um link para redefinição de senha para seu email.
                                Caso não localize o email na caixa de entrada, verifique na caixa de spam/lixo eletrônico"
            />
          )}

          <img src={Logo} className="login-logo-img" alt="Logo WedDigital" />

          {IsCarregandoDados ? (
            <CarregandoPlaceholder />
          ) : (
            <>
              <h3>Bem-Vindo!</h3>
              <p>Informe seu e-mail de acesso</p>
              <form>
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                    name="user"
                    value={email}
                    onChange={onChange}
                  />
                  <label htmlFor="exampleInputEmail1" className="floatingInput">
                    E-mail
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={solicitarLinkNovaSenha}
                  >
                    Solicitar redefinição de senha
                  </button>
                </div>
              </form>

              <a href="/login">
                <button className="btn btn-link">Retornar ao Login</button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
