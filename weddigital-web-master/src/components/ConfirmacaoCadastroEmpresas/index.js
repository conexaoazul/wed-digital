import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { message } from "antd";
import Navbar from "../Navbar";
import api from "../../api";
import axios from "axios";
import UserContext from "../../api/userContext-api/userContext";
import { profissional } from "../../utils/models/UsuarioModel";
import "./ConfirmacaoCadastroEmpresas.css";

import CarregandoPlaceholder from "../Modal/CarregandoPlaceholder";
import CardPlanos from "../PlanosProfissional/miniCard";
import UploadImage from "../UploadImage";
import configServer from "../../config.json";
import FormasDePagamento from "../FormasDePagamento";

export default function ConfirmacaoCadastroEmpresas() {
  const { token } = useContext(UserContext);

  const [DadosCadastro, setDadosCadastro] = useState(profissional);
  const [idUsuario, setIdUsuario] = useState(0);
  const [idTipoUsuario, setIdTipoUsuario] = useState(0);
  const [tokenUsuario, setTokenUsuario] = useState("");
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [IsMaisDeUmEventoPorDia, setIsMaisDeUmEventoPorDia] = useState(false);
  const [IsTrabalhaSozinho, setIsTrabalhaSozinho] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [UploadImageVitrine, setUploadImageVitrine] = useState(false);
  const [stepCurrent, setStepCurrent] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

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
    setCarregandoDados(true);

    api
      .put(
        `empresa/complementoCadastro?idProfissional=${idTipoUsuario}&tokenAcesso=${tokenUsuario}`,
        DadosCadastro,
      )
      .then(() => {
        setStepCurrent(6);
        setCarregandoDados(false);
        enviarAtualizacaoRelatorio(DadosCadastro);
      })
      .catch((error) => {
        setStepCurrent(6);
        setCarregandoDados(false);
        messageApi.open({
          type: "error",
          content:
            "Houve algum problema ao salvar seus dados! Mas não se preocupe você poderá visualizá-los em seu perfil",
          style: {
            marginTop: "4rem",
          },
        });
        console.error("Error");
        console.error(error);
      });
  }

  function enviarAtualizacaoRelatorio(cadastroRelatorio) {
    axios
      .post(
        "https://hook.us1.make.com/jqx43g4hb5pcezvs3uyn2q8725k9fkdy",
        cadastroRelatorio,
      )
      .then(() => {
        console.log("Cadastro informado com sucesso!");
      })
      .catch(() => {
        console.error("Falha ao informar cadastro");
      });
  }

  const onNextStep = () => {
    if (stepCurrent === 1) {
      if (imageUrl === undefined && !loading) {
        messageApi.open({
          type: "warning",
          content: "Faça o upload de sua imagem de perfil para prosseguir!",
          style: {
            marginTop: "4rem",
          },
        });
        return;
      }
      if (imageUrl === undefined && loading) {
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

    if (stepCurrent === 2) {
      if (imageUrl === undefined && !loading) {
        messageApi.open({
          type: "warning",
          content: "Faça o upload de imagens para sua vitrine!",
          style: {
            marginTop: "4rem",
          },
        });
        return;
      } else {
        if (!UploadImageVitrine && loading) {
          messageApi.open({
            type: "warning",
            content: "Aguarde o upload das imagens ser completa",
            style: {
              marginTop: "4rem",
            },
          });
          return;
        } else {
          setStepCurrent(stepCurrent + 1);
        }
      }
    }

    if (stepCurrent === 3) {
      if (
        DadosCadastro.nomeEmpresa.length < 3 ||
        DadosCadastro.descricaoEmpresa.length < 3
      ) {
        messageApi.open({
          type: "warning",
          content: "Preencha todos os campos para prosseguir!",
          style: {
            marginTop: "4rem",
          },
        });
        return;
      }
      setStepCurrent(stepCurrent + 1);
    }

    if (stepCurrent === 4) {
      if (
        DadosCadastro.valorMinimo.length < 1 ||
        DadosCadastro.formasPagamento.length < 3
      ) {
        messageApi.open({
          type: "warning",
          content: "Preencha todos os campos para prosseguir!",
          style: {
            marginTop: "4rem",
          },
        });
        return;
      }
      setStepCurrent(stepCurrent + 1);
    }

    if (stepCurrent === 5) {
      if (DadosCadastro.enderecoComercial.length < 6) {
        messageApi.open({
          type: "warning",
          content: "Preencha todos os campos para prosseguir!",
          style: {
            marginTop: "4rem",
          },
        });
        return;
      }
      salvarDadosComplementares();
    }
  };

  const onPreviousStep = () => {
    if (stepCurrent === 2) {
      setStepCurrent(stepCurrent - 1);
    }

    if (stepCurrent === 3) {
      setStepCurrent(stepCurrent - 1);
    }

    if (stepCurrent === 4) {
      setStepCurrent(stepCurrent - 1);
    }

    if (stepCurrent === 5) {
      setStepCurrent(stepCurrent - 1);
    }

    if (stepCurrent === 6) {
      setStepCurrent(stepCurrent - 1);
    }
  };

  const onChangeData = (ev) => {
    const { value, name } = ev.target;

    setDadosCadastro({
      ...DadosCadastro,
      idProfissional: idTipoUsuario,
      [name]: value,
    });
  };

  return (
    <div className="">
      <script>fbq('track', 'Lead');</script>

      <Navbar navfix={true} />
      {contextHolder}

      {carregandoDados ? (
        <div
          className="passosConfirmacaoCadastro"
          style={{ paddingTop: "6rem" }}
        >
          <CarregandoPlaceholder />
        </div>
      ) : (
        <div
          className="passosConfirmacaoCadastro"
          style={{ paddingTop: "6rem" }}
        >
          {/* Passo 1 */}
          {stepCurrent === 1 ? (
            <div className="cardPassoAtual">
              <div className="cardPassoAtual_header">
                <div className="cardPassoAtualStep">
                  <h4>Passo 1 de 5</h4>
                </div>
                <h1>Conta criada!</h1>
                <h2>
                  Crie seu perfil para que
                  <br></br>
                  nossas noivas possam te encontrar
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
                  <h4>Passo 2 de 5</h4>
                </div>
                <h2>
                  Agora adicione suas melhores fotos
                  <br></br>e surpreenda nossas noivas
                </h2>
              </div>

              <UploadImage
                isImagemPerfil={false}
                isConfirmacaoCadastro={true}
                idUsuario={idTipoUsuario}
                tokenUsuario={tokenUsuario}
                corBG="white"
                setImageUrl={setImageUrl}
                idProfissional={idTipoUsuario}
              />

              <h2 className="textWarningObs">*Mínimo de 7 fotos</h2>
              <h2 className="textWarningObs">
                *Não é permitido adicionar imagens com informações de contato:
                Telefone, Whatsapp, Email, logotipos e etc. <br />
                <br />
                <strong>
                  Lembre-se: Imagens são a primeira impressão que os noivos têm
                  de você, então adicione o máximo e as melhores fotos
                  possíveis, com isso, você receberá ainda mais solicitações.
                </strong>
              </h2>
              <div
                className="col-12 btnProximoConfirmacao d-flex flex-column"
                style={{ width: 150 }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onNextStep}
                >
                  PRÓXIMO
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderStyle: "none",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  type="button"
                  onClick={onPreviousStep}
                >
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Passo 3 */}
          {stepCurrent === 3 ? (
            <div className="cardPassoAtual">
              <div className="cardPassoAtual_header">
                <div className="cardPassoAtualStep">
                  <h4>Passo 3 de 5</h4>
                </div>
                <h1>Estamos quase lá...</h1>
                <h2>
                  Como nossas noivas podem
                  <br></br>
                  chamar sua empresa?
                </h2>
              </div>

              <div className="inputsDadosEmpresa">
                <input
                  type="text"
                  className="inputDadosEmpresa"
                  required
                  name="nomeEmpresa"
                  value={DadosCadastro.nomeEmpresa}
                  onChange={onChangeData}
                  placeholder="Adicione o nome da sua empresa"
                />
              </div>

              <div className="inputsDadosEmpresa">
                <textarea
                  className="inputDadosEmpresa"
                  required
                  placeholder="Descreva sua empresa. Detalhe todos os serviços e produtos oferecidos, fornecendo informações de alta relevância para nossos noivos. Nossa equipe de marketing realizará edições no texto usando essas informações, para que o seu perfil torne-se ainda mais atraente. Não é permitido incluir e-mail, telefone, site ou qualquer coisa do tipo."
                  style={{ height: 220 }}
                  name="descricaoEmpresa"
                  value={DadosCadastro.descricaoEmpresa}
                  onChange={onChangeData}
                ></textarea>
              </div>

              <div
                className="col-12 btnProximoConfirmacao d-flex flex-column"
                style={{ width: 150 }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onNextStep}
                >
                  PRÓXIMO
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderStyle: "none",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  type="button"
                  onClick={onPreviousStep}
                >
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Passo 4 */}
          {stepCurrent === 4 ? (
            <div className="cardPassoAtual">
              <div className="cardPassoAtual_header">
                <div className="cardPassoAtualStep">
                  <h4>Passo 4 de 5</h4>
                </div>
                <h1>Falta apenas um passo...</h1>
                <h2>
                  De qual forma nossas noivas
                  <br></br>
                  podem te contratar?
                </h2>
              </div>

              <div className="inputsDadosEmpresaPasso4">
                <InputMask
                  className="form-control"
                  id="validationCustom01"
                  required
                  mask="R$ 999999"
                  maskChar=" "
                  name="valorMinimo"
                  value={DadosCadastro.valorMinimo}
                  onChange={onChangeData}
                  placeholder="Você tem serviços a partir de?"
                />
              </div>
              <div className="inputsDadosEmpresaPasso4">
                <FormasDePagamento
                  value={DadosCadastro.formasPagamento}
                  onChange={onChangeData}
                />
                {/*<textarea*/}
                {/*    className="form-control"*/}
                {/*    id="validationTextarea"*/}
                {/*    placeholder="Como são suas formas de pagamento?"*/}
                {/*    required*/}
                {/*    name="formasPagamento"*/}
                {/*    value={DadosCadastro.formasPagamento}*/}
                {/*    onChange={onChangeData}*/}
                {/*></textarea>*/}
              </div>

              <div className="inputsDadosEmpresaPasso4 ">
                <div className="inputsDadosEmpresaPasso4-title">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    <h5>Faz mais de um evento por dia?</h5>
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefaultLogin"
                    name="maisDeUmEventoPorDia"
                    checked={IsMaisDeUmEventoPorDia}
                    value={IsMaisDeUmEventoPorDia}
                    onChange={() => {
                      setIsMaisDeUmEventoPorDia(!IsMaisDeUmEventoPorDia);
                      setDadosCadastro({
                        ...DadosCadastro,
                        maisDeUmEventoPorDia: !IsMaisDeUmEventoPorDia,
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {IsMaisDeUmEventoPorDia ? "Sim" : "Não"}
                  </label>
                </div>
              </div>

              <div className="inputsDadosEmpresaPasso4">
                <div className="inputsDadosEmpresaPasso4-title">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    <h5>Trabalha só ou possui equipe?</h5>
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefaultLogin"
                    name="trabalhaSozinho"
                    checked={IsTrabalhaSozinho}
                    value={IsTrabalhaSozinho}
                    onChange={() => {
                      setIsTrabalhaSozinho(!IsTrabalhaSozinho);
                      setDadosCadastro({
                        ...DadosCadastro,
                        trabalhaSozinho: !IsTrabalhaSozinho,
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {IsTrabalhaSozinho ? "Só" : "Equipe"}
                  </label>
                </div>
              </div>

              <div
                className="col-12 btnProximoConfirmacao d-flex flex-column"
                style={{ width: 150 }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onNextStep}
                >
                  PRÓXIMO
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderStyle: "none",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  type="button"
                  onClick={onPreviousStep}
                >
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Passo 5 */}
          {stepCurrent === 5 ? (
            <div className="cardPassoAtual">
              <div className="cardPassoAtual_header">
                <div className="cardPassoAtualStep">
                  <h4>Passo 5 de 5</h4>
                </div>
                <h2>
                  Informe seu endereço comercial
                  <br></br>
                  que esteja disponível para receber possíveis presentes.
                </h2>
              </div>

              <div className="inputsDadosEmpresaPasso4">
                <input
                  type="text"
                  className="inputDadosEmpresa"
                  id="validationCustom01"
                  required
                  name="enderecoComercial"
                  value={DadosCadastro.enderecoComercial}
                  onChange={onChangeData}
                  placeholder="Endereço comercial"
                />
              </div>

              <div
                className="col-12 btnProximoConfirmacao d-flex flex-column"
                style={{ width: 150 }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onNextStep}
                >
                  FINALIZAR
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderStyle: "none",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  type="button"
                  onClick={onPreviousStep}
                >
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Checkout */}
          {stepCurrent === 6 ? (
            <div className="cardPassoAtual">
              <CardPlanos />
              <div
                className="col-12 btnProximoConfirmacao d-flex flex-column"
                style={{ width: 180, marginBottom: 20 }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    window.location.href = `${configServer.api.linkPublico}/empresas/perfil`;
                  }}
                >
                  Acessar Painel
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    borderStyle: "none",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                  type="button"
                  onClick={onPreviousStep}
                >
                  Voltar
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
