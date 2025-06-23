import React, { useContext, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import "./FormDadosGerais.css";
import { Toast } from "primereact/toast";
import api from "../../../../api";
import UserContext from "../../../../api/userContext-api/userContext";

import ErroCarregarDados from "../../../Modal/ErroCarregarDados";
import ErroUploadArquivo from "../../../Modal/ErroUploadArquivo";
import CardImagemVitrine from "./CardImagemVitrine";
import ErroLimiteUpload from "../../../Modal/ErroLimiteUpload";
import UploadImage from "../../../UploadImage";
import ModalAssineAgora from "../../../Modal/ModalAssineAgora";
import { func, number, object, string } from "prop-types";

const tiposPagamento = {
  boleto: "Boleto bancário",
  pix: "Pix",
  credito: "Cartão de crédito",
  debito: "Cartão de débito",
  transferencia: "Transferência bancária",
  outros: "Outros",
  dinheiro: "Dinheiro",
};

export default function FormDadosGerais(props) {
  const toast = useRef(null);
  const fP = props?.dadosResumoPerfil?.formasDePagamento
    ? props.dadosResumoPerfil.formasDePagamento.split(",").map((item) => {
        const tipo = item.trim();
        if (Object.values(tiposPagamento).includes(tipo)) {
          return tipo;
        }
      })
    : [];
  const { setToken } = useContext(UserContext);
  const [dadosCadastro, setDadosCadastro] = useState(props.dadosResumoPerfil);
  const [isErroCadastro, setIsErroCadastro] = useState(false);
  const [isErroUploadFoto] = useState(false);
  const [isLimiteUpload] = useState(false);
  const [formasPagamento, setFormasPagamento] = useState(fP);
  const handlePagamento = (e, campo) => {
    if (e.target.checked) {
      setFormasPagamento([...formasPagamento, campo]);
    } else {
      setFormasPagamento(formasPagamento.filter((item) => item !== campo));
    }
  };

  const [isCarregandoDados, setIsCarregandoDados] = useState(false);
  const [isCNPJ, setIsCNPJ] = useState(dadosCadastro?.is_CNPJ ?? false);
  const [isMaisDeUmEventoPorDia, setIsMaisDeUmEventoPorDia] = useState(
    dadosCadastro?.maisDeUmEventoPorDia ?? false,
  );
  const [isTrabalhaSozinho, setIsTrabalhaSozinho] = useState(
    dadosCadastro?.trabalhaSozinho ?? false,
  );

  let idUsuario = props.idUsuario;
  let idProfissional = props.idProfissional;
  let tokenUsuario = props.tokenUsuario;

  //Carregar upload fotos vitrine
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    setIsCarregandoDados(true);
    api
      .get("obterImagensVitrine/" + idProfissional)
      .then(({ data }) => {
        setImagens(data);
        setIsCarregandoDados(false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
      })
      .catch(({ error }) => {
        console.error(
          error?.message || "Erro desconhecido ao carregar imagens",
        );
        setIsCarregandoDados(false);
      });
  }, []);

  useEffect(() => {
    setDadosCadastro({
      ...dadosCadastro,
      formasDePagamento: formasPagamento.toString(),
    });
  }, [formasPagamento]);

  let listaImagens = imagens;
  let listaCardImagensVitrine = [];

  for (const element of listaImagens) {
    listaCardImagensVitrine.push(
      <CardImagemVitrine
        idImagem={element.idImagem}
        nomeImagem={element.nomeImagem}
        imagemCarregada={element.urlImagem}
        idProfissional={idProfissional}
        isCarregando={setIsCarregandoDados}
        imagemPrincipal={element.imagemPrincipal}
      />,
    );
  }

  function onChange(ev) {
    const { value, name } = ev.target;
    setDadosCadastro({
      ...dadosCadastro,
      [name]: value,
    });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setIsCarregandoDados(true);
    setIsErroCadastro(false);

    api
      .put(
        `empresa/dadosPerfil/atualizarDados?idProfissional=${idProfissional}&tokenAcesso=${tokenUsuario}`,
        dadosCadastro,
      )
      .then((response) => {
        setToken(response.data);
        document.location.reload();
        setIsCarregandoDados(false);
      })
      .catch(() => {
        setIsErroCadastro(true);
        setIsCarregandoDados(false);
        window.scrollTo(0, 0);
      });
  }

  const removerImagemPerfil = () => {
    if (!dadosCadastro?.idUsuario || !dadosCadastro?.fotoPerfil) {
      console.error("Erro: idUsuario ou fotoPerfil estão indefinidos.");
      return;
    }
    //Delete image S3 storage
    api
      .delete(
        `imagens/deletarImagemPerfil?idUsuario=${dadosCadastro.idUsuario}&idImagem=${dadosCadastro.fotoPerfil}`,
      )
      .then(() => {
        document.location.reload();
      })
      .catch((error) => {
        console.error(error);
        document.location.reload();
      });
  };

  return (
    <>
      {isErroCadastro ? <ErroCarregarDados /> : ""}
      {isLimiteUpload ? <ErroLimiteUpload /> : ""}
      {isErroUploadFoto ? <ErroUploadArquivo /> : ""}
      {isCarregandoDados ? (
        <section className="loading h-auto">
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
          <Toast ref={toast} />
          <section
            className="background slim background-dados-gerais"
            style={{
              background:
                "linear-gradient(45deg, var(--color-dark), var(--color-secondary))",
            }}
          >
            {dadosCadastro.nivelConta < 2 ? (
              <div style={{ zIndex: "999" }}>
                <ModalAssineAgora
                  titulo={"Aumente a visibilidade do seu perfil"}
                  textColor={"text-white"}
                />
              </div>
            ) : (
              ""
            )}
          </section>
          <section className="dados-gerais" style={{ marginTop: "" }}>
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="content">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="title">
                          <div className="d-flex justify-content-between align-items-center pb-2">
                            <button
                              onClick={() => props.setTabLocation("resumo")}
                              className="link-back"
                            >
                              <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <div className="title-back">
                              <h2 className="mb-0">Dados gerais</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <form>
                          <div className="row g-4">
                            <div className="col-lg-12">
                              <div className="row g-4">
                                <div className="col-lg-5">
                                  <label
                                    htmlFor="imagem-perfil"
                                    className="mb-2 sublabel"
                                  >
                                    Complete todas as informações e torne sua
                                    empresa mais confiável, aumentando suas
                                    chances de excelentes contratações
                                  </label>
                                  <UploadImage
                                    id="imagem-perfil"
                                    isImagemPerfil={true}
                                    isConfirmacaoCadastro={false}
                                    idUsuario={idUsuario}
                                    tokenUsuario={tokenUsuario}
                                    setImageUrl={props.setImageUrl}
                                    corBG="black"
                                  />

                                  {dadosCadastro.linkFotoPerfil ? (
                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={removerImagemPerfil}
                                    >
                                      Remover imagem de perfil
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <strong>Nome da Empresa</strong>
                              <input
                                style={{ marginTop: 5 }}
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                required
                                name="nomeEmpresa"
                                value={dadosCadastro?.nomeEmpresa || ""}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-lg-12">
                              <strong>Descrição da Empresa</strong>
                              <br />
                              <label
                                htmlFor="validationTextarea"
                                style={{ marginTop: 5, marginBottom: 5 }}
                                className="sublabel"
                              >
                                Detalhe todos os serviços e produtos oferecidos
                                por sua empresa, fornecendo informações de alta
                                relevância para nossos noivos.
                                <br />
                                Nossa equipe de marketing realizará edições no
                                texto, usando essas informações, para que o seu
                                perfil torne-se ainda mais atraente.
                                <br />
                                <strong>
                                  Não é permitido incluir e-mail, telefone, site
                                  ou qualquer coisa do tipo.
                                </strong>
                              </label>
                              <textarea
                                style={{ marginTop: 5 }}
                                className="form-control"
                                id="validationTextarea"
                                placeholder="Fale aos noivos sobre os seus serviços!"
                                required
                                name="descricaoEmpresa"
                                value={dadosCadastro.descricaoEmpresa || ""}
                                onChange={onChange}
                              ></textarea>
                            </div>
                            {/* input */}
                            <div className="col-lg-12">
                              <strong>Segmento da empresa</strong>
                              <input
                                style={{ marginTop: 5 }}
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                disabled
                                readOnly={true}
                                required
                                name="segmento"
                                value={
                                  dadosCadastro.categoria +
                                    " -> " +
                                    dadosCadastro.segmento || ""
                                }
                                onChange={onChange}
                              />
                            </div>
                            {/* input */}
                            <div className="col-lg-12">
                              <strong>Número do CPF</strong>
                              <InputMask
                                style={{ marginTop: 5 }}
                                className="form-control"
                                id="validationCustom01"
                                required
                                mask="999.999.999-99"
                                maskChar=" "
                                name="numeroCPF"
                                value={dadosCadastro.numeroCPF || ""}
                                onChange={onChange}
                              />
                            </div>
                            {/* input */}
                            <div className="col-lg-12">
                              <strong>Possui CNPJ?</strong>
                              <div
                                style={{ marginTop: 5 }}
                                className="form-check form-switch"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefaultLogin"
                                  name="isCNPJ"
                                  checked={isCNPJ}
                                  value={isCNPJ || ""}
                                  onChange={() => {
                                    setIsCNPJ(!isCNPJ);
                                    setDadosCadastro({
                                      ...dadosCadastro,
                                      is_CNPJ: !isCNPJ,
                                    });
                                  }}
                                />
                                <strong className="form-check-label">
                                  {isCNPJ ? "Sim" : "Não"}
                                </strong>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              {isCNPJ ? (
                                <>
                                  <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                  >
                                    Número do CNPJ
                                  </label>
                                  <InputMask
                                    className="form-control"
                                    id="validationCustom01"
                                    required
                                    mask="99.999.999/9999-99"
                                    maskChar=" "
                                    name="numeroCNPJ"
                                    value={dadosCadastro.numeroCNPJ || ""}
                                    onChange={onChange}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end content */}
              </div>
            </div>
          </section>
          {/* end dados gerais */}
          {/* contato */}
          <section className="dados-gerais dados-gerais-contato mt-0">
            <div className="container">
              <div className="row g-4">
                {/* content */}
                <div className="col-lg-12">
                  <div className="content mt-5">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="title">
                          <h2>Contato</h2>
                          <p>
                            É essencial que todas as informações estejam
                            atualizadas e sejam verdadeiras.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <form>
                          <div className="row g-4">
                            <div className="col-lg-12">
                              <label htmlFor="validationCustom01">
                                Pessoa responsável
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                required
                                name="nomeUsuario"
                                value={dadosCadastro.nomeUsuario || ""}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-lg-12">
                              <label htmlFor="validationCustom01">
                                Cidade principal de atuação
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                required
                                name="cidade"
                                value={dadosCadastro.cidade || ""}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-lg-12">
                              <label htmlFor="validationCustom04">Estado</label>
                              <select
                                className="form-select"
                                id="validationCustom04"
                                disabled
                                required
                                name="estado"
                                value={dadosCadastro.estado || ""}
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
                                <option value="SP-CE">
                                  São Paulo - Centro
                                </option>
                                <option value="SP-ZL">
                                  São Paulo - Zona Leste
                                </option>
                                <option value="SP-ZN">
                                  São Paulo - Zona Norte
                                </option>
                                <option value="SP-ZO">
                                  São Paulo - Zona Oeste
                                </option>
                                <option value="SP-ZS">
                                  São Paulo - Zona Sul
                                </option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                              </select>
                            </div>
                            <div className="col-lg-12">
                              <label htmlFor="exampleInputEmail1">E-mail</label>
                              <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                disabled
                                readOnly={true}
                                required
                                name="email"
                                value={dadosCadastro.email || ""}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-lg-12">
                              <label htmlFor="validationCustom01">
                                WhatsApp da empresa
                              </label>
                              <InputMask
                                className="form-control"
                                id="validationCustom01"
                                required
                                mask="(99) 99999-9999"
                                maskChar=" "
                                name="numeroContato"
                                value={dadosCadastro.numeroContato || ""}
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="dados-gerais dados-gerais-imagens mt-0">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="content mt-5">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="title">
                          <h2>Imagens</h2>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <form>
                          <div className="row g-4">
                            <div className="col-lg-12">
                              <div className="row g-4">
                                <div className="col-lg-7">
                                  <label
                                    htmlFor="fotos"
                                    style={{ color: "red" }}
                                  >
                                    * Mínimo de 7 fotos
                                  </label>

                                  <UploadImage
                                    id="fotos"
                                    isImagemPerfil={false}
                                    isConfirmacaoCadastro={false}
                                    idUsuario={idUsuario}
                                    idProfissional={idProfissional}
                                    tokenUsuario={tokenUsuario}
                                    setImageUrl={props.setImageUrl}
                                    corBG="black"
                                  />
                                  <label htmlFor="fotos" className="sublabel">
                                    Não é permitido adicionar imagens com
                                    informações de contato: Telefone, Whatsapp,
                                    Email, logotipos e etc. <br />
                                    <br />
                                    <strong>
                                      Lembre-se: Imagens são a primeira
                                      impressão que os noivos têm de você, então
                                      adicione o máximo e as melhores fotos
                                      possíveis, com isso, você receberá ainda
                                      mais solicitações.
                                    </strong>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="image-list">
                                <div className="row g-4">
                                  {listaCardImagensVitrine.length > 0
                                    ? listaCardImagensVitrine
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="dados-gerais dados-gerais-perguntas-relevantes pb-5 mt-0">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="content mt-5">
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="title">
                          <h2>Perguntas relevantes</h2>
                          <p>
                            É essencial que todas as informações estejam
                            atualizadas e sejam verdadeiras.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <form>
                          <div className="row g-4">
                            <div className="col-lg-12">
                              <label htmlFor="validationCustom01">
                                Valor a partir de
                              </label>
                              <InputMask
                                className="form-control"
                                id="validationCustom01"
                                required
                                mask="R$ 999999"
                                maskChar=" "
                                name="valorMinimo"
                                value={dadosCadastro.valorMinimo || ""}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-lg-12">
                              <label htmlFor="formarDePagamento">
                                Formas de pagamento
                              </label>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="dinheiro"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.pix,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.pix)
                                  }
                                />
                                <label
                                  htmlFor="dinheiro"
                                  className="form-check-label"
                                >
                                  Pix
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="dinheiro"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.dinheiro,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.dinheiro)
                                  }
                                />
                                <label
                                  htmlFor="dinheiro"
                                  className="form-check-label"
                                >
                                  Dinheiro
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="boleto"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.boleto,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.boleto)
                                  }
                                />
                                <label
                                  htmlFor="boleto"
                                  className="form-check-label"
                                >
                                  Boleto bancário
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="credito"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.credito,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.credito)
                                  }
                                />
                                <label
                                  htmlFor="credito"
                                  className="form-check-label"
                                >
                                  Cartão de crédito
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="debito"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.debito,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.debito)
                                  }
                                />
                                <label
                                  htmlFor="debito"
                                  className="form-check-label"
                                >
                                  Cartão de débito
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="transferencia"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.transferencia,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(
                                      e,
                                      tiposPagamento.transferencia,
                                    )
                                  }
                                />
                                <label
                                  htmlFor="transferencia"
                                  className="form-check-label"
                                >
                                  Transferência bancária
                                </label>
                              </div>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="outros"
                                  name="maisDeUmEventoPorDia"
                                  checked={formasPagamento.includes(
                                    tiposPagamento.outros,
                                  )}
                                  onChange={(e) =>
                                    handlePagamento(e, tiposPagamento.outros)
                                  }
                                />
                                <label
                                  htmlFor={"outros"}
                                  className="form-check-label"
                                >
                                  Outros
                                </label>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="col-lg-12">
                            <label htmlFor="flexSwitchCheckDefaultLogin">
                              Sua empresa realiza mais de um evento por dia?
                            </label>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefaultLogin"
                                name="maisDeUmEventoPorDia"
                                checked={isMaisDeUmEventoPorDia}
                                value={isMaisDeUmEventoPorDia || false}
                                onChange={() => {
                                  setIsMaisDeUmEventoPorDia(
                                    !isMaisDeUmEventoPorDia,
                                  );
                                  setDadosCadastro({
                                    ...dadosCadastro,
                                    maisDeUmEventoPorDia:
                                      !isMaisDeUmEventoPorDia,
                                  });
                                }}
                              />
                              <label className="form-check-label">
                                {isMaisDeUmEventoPorDia ? "Sim" : "Não"}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <label htmlFor="flexSwitchCheckDefaultLogin">
                              Você trabalha sozinho(a)?
                            </label>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefaultLogin"
                                name="trabalhaSozinho"
                                checked={isTrabalhaSozinho}
                                value={isTrabalhaSozinho || false}
                                onChange={() => {
                                  setIsTrabalhaSozinho(!isTrabalhaSozinho);
                                  setDadosCadastro({
                                    ...dadosCadastro,
                                    trabalhaSozinho: !isTrabalhaSozinho,
                                  });
                                }}
                              />
                              <label className="form-check-label">
                                {isTrabalhaSozinho ? "Sim" : "Não"}
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="pt-3">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Atualizar Dados
                  </button>
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="alert alert-primary">
                  <span>
                    É essencial que todas as informações estejam atualizadas e
                    sejam verdadeiras.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

FormDadosGerais.propTypes = {
  dadosResumoPerfil: object,
  idUsuario: number,
  idProfissional: number,
  tokenUsuario: string,
  setTabLocation: func,
  setImageUrl: func,
};
