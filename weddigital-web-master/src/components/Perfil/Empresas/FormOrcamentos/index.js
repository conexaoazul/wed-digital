import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import "./FormOrcamento.css";
import configServer from "../../../../config.json";

import api from "../../../../api";

import Cardcontato from "../../MensagensChat/Cardcontato";
import CardChat from "../../MensagensChat/CardChat";
import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

import empty from "../../../../assets/wed.png";
import background from "../../../../assets/chat.png";
import SockJsClient from "react-stomp";
import ModalAssineAgora from "../../../Modal/ModalAssineAgora";
import casalContratoImg from "../../../../assets/casal-abracado-lendo-os-termos-de-um-contrato-de-hipoteca-enquanto-estava-em-uma-reuniao-com-seu-age.jpeg";

import { IoClose } from "react-icons/io5";

export default function FormOrcamentos(props) {
  const [isCarregando, setIsCarregando] = useState(true);
  const [dadosConversa, setDadosConversa] = useState([]);
  const [idContatoAtivo, setIdContatoAtivo] = useState(0);
  const [idConversaAtual, setIdConversaAtual] = useState();
  const [IsAlterado, setIsAlterado] = useState(true);
  const [listaCardMensagens, setListaCardMensagens] = useState([]);
  const [clientRef, setClientRef] = useState();

  let idProfissional = props.dadosProfissional.idProfissional;
  let tokenUsuario = props.tokenUsuario;

  let nivelConta = props.nivelConta;

  const [chatOpen, setChatOpen] = useState(false);

  function initLoad() {
    api
      .get(`mensagens/profissional/listarConversas/${idProfissional}`)
      .then(({ data }) => {
        setDadosConversa(data);
        setIsCarregando(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
      })
      .catch(({ error }) => {
        console.error(error);
        setIsCarregando(false);
      });
  }

  useEffect(() => {
    initLoad();
  }, []);

  function loadCardsMensagem() {
    let imagePerfilChatDefault = require("../../../../fileContents/imagensPerfil/avatar.jpg");

    if (idConversaAtual) {
      setIdContatoAtivo(
        dadosConversa.findIndex((it) => it.idCliente === idConversaAtual),
      );
    }

    setListaCardMensagens(
      dadosConversa.map((it, index) => {
        return (
          <Cardcontato
            idItem={index}
            open={setChatOpen}
            idContato={it.idCliente}
            isAltaredo={setIsAlterado}
            setContatoAtivo={setIdContatoAtivo}
            setIdConversaAtual={setIdConversaAtual}
            nome={it.nomeContato}
            fotoPerfil={it.fotoPerfil ? it.fotoPerfil : imagePerfilChatDefault}
            isOnline={true}
            isActive={index === idContatoAtivo}
          />
        );
      }),
    );
  }

  useEffect(() => {
    loadCardsMensagem();
  }, [dadosConversa, idContatoAtivo]);

  const [mensagemAlert, setMensagemAlert] = useState(false);

  return (
    <>
      <div>
        <Helmet>
          <title>Orçamentos - WedDigital</title>
        </Helmet>

        {isCarregando ? (
          <CarregandoPlaceholder />
        ) : (
          <>
            {/* background */}
            <section
              className="background slim"
              style={{
                background:
                  "linear-gradient(45deg, var(--color-dark), var(--color-secondary))",
              }}
            ></section>
            {/* end background */}
            <SockJsClient
              // url={api.defaults.baseURL.replace("/api", "") + "/ws/websocket-chat/"}
              url={api.defaults.baseURL + "/ws/websocket-chat/"}
              topics={["/weddigital/mensagem"]}
              onConnect={() => {
                console.log("connected to chat");
              }}
              onDisconnect={() => {
                console.log("Disconnected from chat");
              }}
              onMessage={(msg) => {
                // Mensagem recebida
                if (
                  msg != null &&
                  msg.statusCodeValue === 200 &&
                  msg.body.split("&").find((i) => i == idProfissional)
                ) {
                  setIsAlterado(true);
                  setIdConversaAtual(dadosConversa[idContatoAtivo].idCliente);
                  initLoad();
                }
              }}
              ref={(client) => {
                // Client usado para enviar mensagens
                setClientRef(client);
              }}
            />
            {/* chat orçamentos */}

            <section className="chat-orcamentos chat-orcamentos-empresas">
              {mensagemAlert && (
                <div
                  style={{
                    display: "flex",
                    position: "fixed",
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    padding: 10,
                    paddingTop: 80,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: 4,
                      padding: 10,
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <IoClose
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        margin: 5,
                      }}
                      onClick={() => setMensagemAlert(false)}
                    />

                    <div
                      style={{
                        background:
                          "url(" +
                          casalContratoImg +
                          ") no-repeat center/cover",
                        width: "100%",
                        height: 250,
                        marginBottom: 20,
                        borderRadius: 4,
                        marginTop: 15,
                      }}
                    ></div>

                    <strong style={{ textTransform: "uppercase" }}>
                      VOCÊ PODE RESPONDER GRATUITAMENTE ATÉ 5 SOLICITAÇÕES
                    </strong>

                    <p style={{ marginTop: 20, fontSize: 10 }}>
                      Destaque sua empresa agora e receba muito mais
                      solicitações
                    </p>

                    <a
                      href={`${configServer.api.linkPublico}/planos-profissional`}
                    >
                      <button
                        style={{ marginBottom: 10, fontSize: 16 }}
                        className="btn btn-primary px-3 py-2 mt-lg-0 mt-4 ms-lg-4"
                      >
                        <small>Conheça nossos planos</small>
                      </button>
                    </a>
                  </div>
                </div>
              )}
              <div className="container">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content">
                      <div className={"chat-list " + (chatOpen ? "" : "open")}>
                        <div className="back_">
                          <button
                            onClick={() => props.tabLocation("resumo")}
                            className="link"
                          >
                            <i className="fa-solid fa-arrow-left"></i>
                          </button>
                          <h6>Mensagens</h6>
                        </div>

                        <ul>
                          {listaCardMensagens.length > 0 ? (
                            listaCardMensagens
                          ) : (
                            <li
                              className="p-5 text-center"
                              style={{ borderBottom: 0 }}
                            >
                              <span
                                className="message"
                                style={{ lineHeight: 1.6 }}
                              >
                                Não há nenhuma solicitação de orçamento no
                                momento
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div
                        className={"chat " + (chatOpen ? "open" : "")}
                        style={{
                          background:
                            "linear-gradient(0deg, hsla(273.68deg 100% 22.35% / 5%), hsla(273.68deg 100% 22.35% / 5%)), hsla(273.68deg 100% 22.35% / 5%) url(" +
                            background +
                            ") repeat center/50%",
                        }}
                      >
                        {listaCardMensagens.length > 0 ? (
                          <CardChat
                            mensageAlerta={setMensagemAlert}
                            open={setChatOpen}
                            isAlterado={IsAlterado}
                            setAlterado={setIsAlterado}
                            dadosConversa={dadosConversa[idContatoAtivo]}
                            isProfissional={true}
                            tokenUsuario={tokenUsuario}
                            nivelConta={nivelConta}
                            clientRef={clientRef}
                          />
                        ) : (
                          <img src={empty} className="empty" />
                        )}
                      </div>
                    </div>
                  </div>
                  {nivelConta < 2 ? (
                    <ModalAssineAgora
                      titulo={
                        "Receba mais solicitações e acesse o contato dos noivos agora"
                      }
                      textColor={""}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            {/* end chat orçamentos */}
          </>
        )}
      </div>
    </>
  );
}
