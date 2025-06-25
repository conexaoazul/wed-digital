import React, { useState } from "react";
import "./FormDadosCasamento.css";

import api from "../../../../api";

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

import UploadImage from "../../../UploadImage";
import CurrencyInput from "react-currency-input-field";
import { func, number, string } from "prop-types";
import { message} from "antd";

export default function FormDadosGerais(props) {
  const [dadosCadastro, setDadosCadastro] = useState(props.dadosResumoPerfil);
  const [, setIsErroCadastro] = useState(false);
  const [isCarregandoDados, setIsCarregandoDados] = useState(false);
  const [numeroInvalido, setNumeroInvalido] = useState(false);

  let dataCasamentoSplit =
    dadosCadastro.dadosCasamento.dataCasamentoFormatada != null
      ? dadosCadastro.dadosCasamento.dataCasamentoFormatada.split("/")
      : "";
  let dataFormatada =
    dataCasamentoSplit !== ""
      ? `${dataCasamentoSplit[2]}-${dataCasamentoSplit[1]}-${dataCasamentoSplit[0]}`
      : "";
  const [dataFormatadaConst, setDataFormatadaConst] = useState(dataFormatada);

  let idUsuario = props.idUsuario;
  let idNoivos = props.idNoivos;
  let tokenUsuario = props.tokenUsuario;

  function onChange(ev) {
    const { value, name } = ev.target;
    setDadosCadastro({
      ...dadosCadastro,
      [name]: value,
    });
  }

  function transformaZap(value) {
    value = value.replace(/ /gm, "");
    value = value.replace(/\D/g, "");
    let num = `(${value.substring(0, 2)}) ${value.substring(2, 7)} - ${value.substring(7, 11)}`;
    num = num.trim();
    return num;
  }

  function formatarDataCasamento(ev) {
    const { value } = ev.target;
    let data = value.split("-");
    let dataCasamentoFormatada = `${data[2]}/${data[1]}/${data[0]}`;

    setDadosCadastro((prevDados) => ({
      ...prevDados,
      dadosCasamento: {
        ...prevDados.dadosCasamento,
        dataCasamento: `${value}T00:00:00.000+00:00`,
        dataCasamentoFormatada: dataCasamentoFormatada,
      },
    }));

    setDataFormatadaConst(value);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setIsCarregandoDados(true);
    setIsErroCadastro(false);

    const formatInstagram = (handle = '') => {
      const trimmed = handle.trim();
      if (!trimmed) return '';                
      return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
    };

    const formatFacebook = (slug = '') => {
      const trimmed = slug.trim();
      if (!trimmed) return '';                
      return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    };

    const { dadosCasamento, instagram, facebook } = dadosCadastro;
    const whatsappOriginal = props.dadosResumoPerfil.numeroContato;

    const dadosParaEnviar = {
      ...dadosCadastro,
      instagram: formatInstagram(instagram),
      facebook: formatFacebook(facebook),
      nomeConjuge: dadosCasamento.nomeConjuge,
      dadosCasamento: {
        ...dadosCasamento,
        qtdConvidados: dadosCasamento.qtdConvidados,
        luaMel: dadosCasamento.luaMel,
        orcamentoCasamento: dadosCasamento.orcamentoCasamento,
      },
    };

    const validateWhatsapp = (number) => number.replace(/\D/g, '').length === 11;
    const isWhatsappValido = validateWhatsapp(dadosCadastro.numeroContato);

    if (!isWhatsappValido) {
      dadosParaEnviar.numeroContato = whatsappOriginal; // mantém o antigo
      setNumeroInvalido(true);
    } else {
      setNumeroInvalido(false);
    }

    api
      .put(
        `noivos/dadosPerfil/atualizarDados?idNoivos=${idNoivos}&tokenAcesso=${tokenUsuario}`,
        dadosParaEnviar,
      )
      .then(() => {
        setIsCarregandoDados(false);
        if (!isWhatsappValido) {
          message.warning({
            content: 'Dados atualizados, mas o WhatsApp não foi alterado. Formato inválido!',
            duration: 10,
            style: { marginTop: '4rem' },
          });
        } else {
          message.success({
            content: 'Dados atualizados com sucesso!',
            duration: 5,
            style: { marginTop: '4rem' },
          });
        }
        console.log('Estado de Envio (dadosParaEnviar):', dadosParaEnviar);
        document.location.reload();
      })
      .catch((error) => {
        setIsErroCadastro(true);
        setIsCarregandoDados(false);
        console.error('Erro na atualização:', error);
        message.error('Erro ao atualizar dados!');
        window.scrollTo(0, 0);
      });
  }

  return (
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
      {/* dados gerais */}
      <section className="dados-gerais dados-gerais-noivas">
        <div className="container">
          <div className="row g-4">
            {/* content */}
            <div className="col-lg-12">
              <div className="content">
                {isCarregandoDados ? (
                  <CarregandoPlaceholder />
                ) : (
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="title">
                        <div className="d-flex justify-content-between align-items-center pb-2">
                          <button
                            onClick={() => props.tabLocation("resumo")}
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
                      <div className="row g-4">
                        <div className="col-lg-12">
                          <div className="row g-4">
                            <div className="col-lg-5">
                              <label htmlFor="updatePhoto" className="mb-2">
                                Atualizar foto do perfil (até 5MB no formato
                                quadrado)
                              </label>
                              <UploadImage
                                id="updatePhoto"
                                isImagemPerfil={true}
                                isConfirmacaoCadastro={false}
                                idUsuario={idUsuario}
                                tokenUsuario={tokenUsuario}
                                setImageUrl={props.setImageUrl}
                                corBG="black"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <label htmlFor="nomeUsuario" className="mb-2">
                            Nome completo
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="nomeUsuario"
                            id="nomeUsuario"
                            value={dadosCadastro.nomeUsuario}
                            onChange={onChange}
                            required
                          />
                        </div>
                        <div className="col-lg-5">
                          <label htmlFor="nomeConjuge" className="mb-2">
                            Qual o nome do seu amor?
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nomeConjuge"
                            required
                            value={dadosCadastro.dadosCasamento.nomeConjuge || ''}
                            onChange={(e) => {
                              setDadosCadastro(prev => ({
                                ...prev,
                                nomeConjuge: e.target.value,
                                dadosCasamento: {
                                  ...prev.dadosCasamento,
                                  nomeConjuge: e.target.value
                                }
                              }));
                            }}
                          />
                        </div>
                        <div className="col-lg-5">
                          <label htmlFor="email" className="mb-2">
                            E-mail
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            name="email"
                            id="email"
                            value={dadosCadastro.email}
                          />
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="cidade" className="mb-2">
                            Cidade
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            name="cidade"
                            id="cidade"
                            value={dadosCadastro.cidade}
                            onChange={onChange}
                          />
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="estado" className="mb-2">
                            Estado
                          </label>
                          <select
                            className="form-control"
                            required
                            name="estado"
                            id="estado"
                            value={dadosCadastro.estado}
                            onChange={onChange}
                          >
                            <option selected disabled>
                              Selecione
                            </option>
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
                            <option value="SP-ZL">
                              São Paulo - Zona Leste
                            </option>
                            <option value="SP-ZN">
                              São Paulo - Zona Norte
                            </option>
                            <option value="SP-ZO">
                              São Paulo - Zona Oeste
                            </option>
                            <option value="SP-ZS">São Paulo - Zona Sul</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor={"dataCasamento"} className="mb-2">
                            Casamos em:*
                          </label>
                          <input
                            type="date"
                            id={"dataCasamento"}
                            className="form-control"
                            value={dataFormatadaConst}
                            onChange={formatarDataCasamento}
                            required
                          />
                        </div>
                        <div className="col-lg-3">
                          <label
                            htmlFor={"validationCustom01"}
                            className="mb-2"
                          >
                            Pretende levar quantos convidados?
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            name="luaMel"
                            value={dadosCadastro.dadosCasamento.qtdConvidados}
                            onChange={(e) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                dadosCasamento: {
                                  ...prevDados.dadosCasamento,
                                  qtdConvidados: e.target.value,
                                },
                              }));
                            }}
                          />
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="validationCustom01" className="mb-2">
                            Onde será sua lua de mel?
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            required
                            name="luaMel"
                            value={dadosCadastro.dadosCasamento.luaMel}
                            onChange={(e) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                dadosCasamento: {
                                  ...prevDados.dadosCasamento,
                                  luaMel: e.target.value,
                                },
                              }));
                            }}
                          />
                        </div>

                        <div className="col-lg-3">
                          <label
                            htmlFor={"orcamentoCasamento"}
                            className="mb-2"
                          >
                            Qual seu orçamento previsto?
                          </label>
                          <CurrencyInput
                            className="form-control"
                            id="orcamentoCasamento"
                            placeholder="Digite o novo valor do orçamento"
                            value={
                              dadosCadastro.dadosCasamento.orcamentoCasamento
                            }
                            decimalsLimit={2}
                            onValueChange={(value) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                dadosCasamento: {
                                  ...prevDados.dadosCasamento,
                                  orcamentoCasamento: Number(value),
                                },
                              }));
                            }}
                            prefix="R$ "
                          />
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="zapzap" className="mb-2">
                            Whatsapp
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="zapzap"
                            required
                            name="zapzap"
                            value={dadosCadastro.numeroContato}
                            onChange={(e) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                numeroContato: transformaZap(e.target.value),
                              }));
                            }}
                          />
                          {numeroInvalido && (
                            <span color={"red"}>Número inválido</span>
                          )}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="instaglande" className="mb-2">
                            Instagram (@usuario)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="instaglande"
                            required
                            name="instaglande"
                            value={dadosCadastro.instagram}
                            onChange={(e) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                instagram: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="facebook" className="mb-2">
                            Facebook (/usuario)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="facebook"
                            required
                            name="facebook"
                            value={dadosCadastro.facebook}
                            onChange={(e) => {
                              setDadosCadastro((prevDados) => ({
                                ...prevDados,
                                facebook: e.target.value,
                              }));
                            }}
                          />
                        </div>

                        <div className="col-lg-12">
                          <button
                            className="btn btn-primary"
                            onClick={onSubmit}
                          >
                            <span>Atualizar dados</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="alert alert-primary">
                        <span>
                          É essencial que todas as informações estejam
                          atualizadas e sejam verdadeiras.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* end content */}
          </div>
        </div>
      </section>
      {/* end dados gerais */}
    </>
  );
}

FormDadosGerais.propTypes = {
  tabLocation: func,
  setImageUrl: func,
  idUsuario: number,
  idNoivos: number,
  tokenUsuario: number,
  dadosResumoPerfil: string,
};
