import React, { useState } from "react";
import { Modal } from "antd";
import stringSimilarity from "string-similarity/src/index";
import styles from "./ModalAdicionarFornecedor.module.css";
import { FaSearch } from "react-icons/fa";
import ModalConviteViaEmail from "./ModalConviteViaEmail/ModalConviteViaEmail";
import ModalConviteViaWhatsapp from "./ModalConviteViaWhatsapp/ModalConviteViaWhatsapp";
import ModalConfirmacao from "./ModalConfirmacao/ModalConfirmacao";
import CurrencyInput from "react-currency-input-field";
import api from "../../../../../api";
import { obterCategoriaPorResumoCategoria } from "../../../../../utils/Utils";
import CarregandoPlaceholder from "../../../../Modal/CarregandoPlaceholder";
import style from "../PainelGestaoOrcamento/CardContratoEstimativa/CardContratoEstimativa.module.css";

export default function ModalAdicionarFornecedor(props) {
  const [contratatando, setContratatando] = useState(null);
  const [isCarregando, setIsCarregando] = useState(false);
  const [sugestoes, setSugestoes] = useState([]);
  const [abrirEmailModal, setAbrirEmailModal] = useState(false);
  const [abrirWhatsappModal, setAbrirWhatsappModal] = useState(false);
  const [abrirConfirmacaoConviteModal, setAbrirConfirmacaoConviteModal] =
    useState(false);
  const [abrirConfirmacaoContratoModal, setAbrirConfirmacaoContratoModal] =
    useState(false);

  let contratoRef = props.contratoRef;
  let open = props.open;
  let onCancel = props.onCancel;
  let fornecedores = props.fornecedores;
  let contratoSelecionado = props.contratoSelecionado;
  let categoriaSelecionada = props.categoriaSelecionada;
  const idUsuario = props.idUsuario;

  const getSugestoes = (valor, limiar = 0.1) => {
    const termoLowerCase = valor.toLowerCase().trim();

    if (termoLowerCase.length <= 0) {
      setSugestoes([]);
      return;
    }

    let categoriaLowerCase = "";
    let novosResultados = [];

    if (categoriaSelecionada && categoriaSelecionada !== "Adicionar outro") {
      categoriaLowerCase = obterCategoriaPorResumoCategoria(
        categoriaSelecionada,
      )
        .toLowerCase()
        .trim();
      novosResultados = fornecedores
        .filter(
          ({ categoria }) => categoria.toLowerCase() === categoriaLowerCase,
        )
        .filter(({ nome }) => {
          const elementoLowerCase = nome.toLowerCase();
          const similaridade =
            stringSimilarity.compareTwoStrings(
              termoLowerCase,
              elementoLowerCase,
            ) * (elementoLowerCase.includes(termoLowerCase) ? 3 : 1);
          return similaridade >= limiar;
        })
        .sort(
          ({ nome: a }, { nome: b }) =>
            stringSimilarity.compareTwoStrings(b, termoLowerCase) *
              (b.includes(termoLowerCase) ? 3 : 1) -
            stringSimilarity.compareTwoStrings(a, termoLowerCase) *
              (a.includes(termoLowerCase) ? 3 : 1),
        )
        .slice(0, 20);
    } else {
      novosResultados = fornecedores
        .filter(({ nome }) => {
          const elementoLowerCase = nome.toLowerCase();
          const similaridade =
            stringSimilarity.compareTwoStrings(
              termoLowerCase,
              elementoLowerCase,
            ) * (elementoLowerCase.includes(termoLowerCase) ? 3 : 1);
          return similaridade >= limiar;
        })
        .sort(
          ({ nome: a }, { nome: b }) =>
            stringSimilarity.compareTwoStrings(b, termoLowerCase) *
              (b.includes(termoLowerCase) ? 3 : 1) -
            stringSimilarity.compareTwoStrings(a, termoLowerCase) *
              (a.includes(termoLowerCase) ? 3 : 1),
        )
        .slice(0, 20);
    }
    setSugestoes(novosResultados);
  };

  const confirmarContratacao = () => {
    let _contratoSelecionado = contratoSelecionado;
    setIsCarregando(true);
    if (!categoriaSelecionada) _contratoSelecionado = contratoRef;
    _contratoSelecionado.idProfissional = contratatando.idProfissional;
    _contratoSelecionado.valorContratado = contratoSelecionado.valorContratado;
    api
      .post("contato/adicionarNovoContrato", _contratoSelecionado)
      .then(({ data }) => {
        setAbrirConfirmacaoContratoModal(true);
        setContratatando(null);
        window.location.reload();
      })
      .catch((error) => {
        setAbrirConfirmacaoContratoModal(false);
        setContratatando(null);
        setIsCarregando(false);
      });
  };

  return (
    <>
      <ModalConviteViaWhatsapp
        open={abrirWhatsappModal}
        fechar={() => {
          setAbrirConfirmacaoConviteModal(true);
          setAbrirConfirmacaoContratoModal(false);
          setAbrirWhatsappModal(false);
        }}
      />
      <ModalConviteViaEmail
        idUsuario={idUsuario}
        open={abrirEmailModal}
        fechar={() => setAbrirEmailModal(false)}
        cancelando={() => {}}
        enviando={() => {
          setAbrirWhatsappModal(true);
          setAbrirEmailModal(false);
        }}
      />
      <ModalConfirmacao
        open={abrirConfirmacaoConviteModal || abrirConfirmacaoContratoModal}
        fechar={() => {
          if (abrirConfirmacaoConviteModal) {
            setAbrirConfirmacaoConviteModal(false);
            setContratatando(null);
            return;
          }
          setContratatando(null);
          setAbrirConfirmacaoContratoModal(false);
          onCancel();
        }}
      />
      <Modal
        title={"Adicionar fornecedor"}
        open={
          open &&
          !abrirEmailModal &&
          !abrirWhatsappModal &&
          !abrirConfirmacaoConviteModal &&
          !abrirConfirmacaoContratoModal
        }
        onCancel={() => onCancel()}
        footer={
          !contratatando ? (
            <div id={styles.footer}>
              <button
                target="_blank"
                onClick={() => {
                  setAbrirEmailModal(true);
                }}
                className={styles.emailInvite}
                rel="noreferrer"
              >
                Não encontrou? <br />
                Convide seu fornecedor tocando <strong>aqui</strong>
              </button>
            </div>
          ) : (
            <div id={styles.confirmationBox}>
              {isCarregando ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: "2rem",
                  }}
                  className={style.card}
                >
                  <CarregandoPlaceholder />
                </div>
              ) : (
                <>
                  <div id={styles.confirmationText}>
                    Confirma essa contratação?
                  </div>
                  <button
                    className={styles.confirmationButton}
                    onClick={() => {
                      setContratatando(null);
                    }}
                  >
                    Não
                  </button>
                  <button
                    onClick={() => {
                      confirmarContratacao();
                    }}
                    className={styles.confirmationButton}
                  >
                    Sim
                  </button>
                </>
              )}
            </div>
          )
        }
      >
        {!contratatando ? (
          <>
            <div className={styles.searchBox}>
              <FaSearch className={styles.icon} />
              <input
                placeholder="Digite o nome do fornecedor"
                className={styles.search}
                type="text"
                onChange={({ target: { value } }) => {
                  getSugestoes(value);
                }}
              />
            </div>
            <div className={styles.buttonList}>
              {sugestoes.map(
                ({ nome: sugestao, imagem, idProfissional }, index) => (
                  <button
                    className={styles.suggestion}
                    onClick={() => {
                      setContratatando({
                        nome: sugestao,
                        imagem,
                        idProfissional,
                      });
                    }}
                    key={index}
                  >
                    <img
                      className={styles.suggestionImage}
                      src={imagem}
                      alt={`imagem do fornecedor ${sugestao}`}
                    />
                    <div className={styles.suggestionText}>{sugestao}</div>
                  </button>
                ),
              )}
            </div>
          </>
        ) : (
          <>
            <div>{`Você está prestes a contratar ${contratatando?.nome}`}</div>
            <div className={styles.form}>
              <label className={styles.label}>No valor de*</label>
              <CurrencyInput
                className={styles.emailInput}
                placeholder="R$ 999,99"
                // value={contratoSelecionado.valorContratado ?? null}
                decimalsLimit={2}
                onValueChange={(value) => {
                  contratoSelecionado.valorContratado = value;
                }}
                prefix="R$ "
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
