import React, { useEffect, useState } from "react";
import style from "./CardContratoEstimativa.module.css";
import { FaEllipsisH, FaPen, FaPlus, FaTimes } from "react-icons/fa";
import CardOptions from "../CardOptions/CardOptions";
import { formatarMoeda } from "../../../../../../utils/UtilFormatacao";
import ModalCancelarContrato from "../ModalCancelarContrato/ModalCancelarContrato";
import CarregandoPlaceholder from "../../../../../Modal/CarregandoPlaceholder";
import api from "../../../../../../api";
import styles from "../ModalEditarContrato/ModalEditarContrato.module.css";
import CurrencyInput from "react-currency-input-field";
import { Modal } from "antd";
import constantes from "../../../../../../constantes.json";

export default function CardContratoEstimativa(props) {
  const [isCarregando, setIsCarregando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalValorEstimado, setMostrarModalValorEstimado] =
    useState(false);
  const [mostrarCancelarContrato, setMostrarCancelarContrato] = useState(false);
  const [valorDoContrato, setValorDoContrato] = useState(
    props.contrato.valorContratado ?? null,
  );

  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [contrato, setContrato] = useState(props.contrato);
  const [imagem, setImagem] = useState(props.imagem);
  console.log(mostrarOpcoes);
  let setCategoriaSelecionada = props.setCategoriaSelecionada;
  let adicionarNovoFornecedor = props.adicionarNovoFornecedor;
  let totalValue = props.totalValue;
  let setTotalValue = props.setTotalValue;
  let handleContratoSelecionado = props.handleContratoSelecionado;
  let isAmbienteProducao = constantes["ambiente-producao"];
  let urlPublica = isAmbienteProducao
    ? constantes.linkPublicoProducao
    : constantes.linkPublicoLocalhost;

  useEffect(() => {
    setTotalValue(totalValue + valorDoContrato);
    if (contrato.idProfissional) {
      setIsCarregando(true);
      api
        .get(
          `contrato/obterNomeProfissionalContratado?idProfissional=${contrato.idProfissional}`,
        )
        .then(({ data }) => {
          setContrato({
            ...contrato,
            nomeDoFornecedor: data.nomeProfissional,
          });

          setImagem(data.imagemProfissional);
          setIsCarregando(false);
        })
        .catch((error) => {
          setIsCarregando(false);
        });
    }
  }, []);

  const salvarDadosContrato = () => {
    setIsCarregando(true);
    api
      .post("contato/adicionarEstimativaContrato", contrato)
      .then(({ data }) => {
        setIsCarregando(false);
        window.location.reload();
      })
      .catch((error) => {
        setIsCarregando(false);
        window.location.reload();
      });
  };

  const atualizarValorContratoAtual = (valorAtualizado) => {
    setValorDoContrato(valorAtualizado);

    setContrato({
      ...contrato,
      valorContratado: valorAtualizado,
    });
  };
  const salvarCancelamentoContrato = () => {
    api
      .put(`contratos/cancelarContrato`, contrato)
      .then(({ data }) => {
        setIsCarregando(false);
        window.location.reload();
      })
      .catch(({ error }) => {
        console.error("errror", error);
        setIsCarregando(false);
      });
  };

  const avaliar = () => {
    window.location.replace(
      `${urlPublica}/avaliacao`, //${contrato.idProfissional}`
    );
  };

  const opcoes = contrato.idProfissional
    ? [
        // {
        //     action: () => {
        //         setcontratoSelecionado(contrato);
        //         adicionarNovoFornecedor(true);
        //     },
        //     title: "Adicionar fornecedor",
        //     icon: <FaPlus/>,
        // },
        {
          action: () => setMostrarModal(true),
          title: "Editar contrato",
          icon: <FaPen />,
        },
        // {
        //     action: () => avaliar(),
        //     title: "Avaliar fornecedor",
        //     icon: <FaStar/>,
        // },
        {
          action: () => setMostrarCancelarContrato(true),
          title: "Cancelar contrato",
          icon: <FaTimes />,
        },
      ]
    : [
        {
          action: () => {
            handleContratoSelecionado(contrato);
            adicionarNovoFornecedor(true);
            setCategoriaSelecionada(contrato.segmentoContrato);
          },
          title: "Adicionar fornecedor",
          icon: <FaPlus />,
        },
        {
          action: () => setMostrarModal(true),
          title: "Editar estimativa",
          icon: <FaPen />,
        },
        {
          action: () => setMostrarCancelarContrato(true),
          title: "Cancelar contrato",
          icon: <FaTimes />,
        },
      ];

  return (
    <>
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
        <div className={style.card}>
          {/* EDIÇÃO */}
          <Modal
            title={
              contrato.idProfissional
                ? "Atualizar contrato"
                : "Adicionar estimativa"
            }
            onOk={() => {
              salvarDadosContrato();
              setMostrarModal(false);
            }}
            onCancel={() => {
              setMostrarModal(false);
            }}
            destroyOnClose
            open={mostrarModal}
            okText={"Salvar"}
            okButtonProps={{
              className: styles.modalButtonOk,
            }}
            cancelText={"Fechar"}
            cancelButtonProps={{
              className: styles.modalButtonCancel,
            }}
            className={styles.modal}
          >
            <div className={styles.form}>
              <br />
              <label className={styles.label}>
                {contrato.idProfissional
                  ? "Informe o novo valor do contrato:*"
                  : "Informe valor da estimativa:*"}
              </label>
              <CurrencyInput
                className={styles.emailInput}
                placeholder={
                  contrato.idProfissional
                    ? "Digite o novo valor do contrato"
                    : "Digite o valor da estimativa"
                }
                value={valorDoContrato}
                decimalsLimit={2}
                onValueChange={(value) => {
                  atualizarValorContratoAtual(value);
                }}
                prefix="R$ "
              />
            </div>
          </Modal>

          <Modal
            title={"Adicionar estimativa"}
            onOk={() => {
              salvarDadosContrato();
              setMostrarModalValorEstimado(false);
            }}
            onCancel={() => {
              setMostrarModalValorEstimado(false);
            }}
            destroyOnClose
            open={mostrarModalValorEstimado}
            okText={"Salvar"}
            okButtonProps={{
              className: styles.modalButtonOk,
            }}
            cancelText={"Fechar"}
            cancelButtonProps={{
              className: styles.modalButtonCancel,
            }}
            className={styles.modal}
          >
            <div className={styles.form}>
              <br />
              <label className={styles.label}>
                Informe valor que pretende investir nesse fornecedor:*
              </label>
              <CurrencyInput
                className={styles.emailInput}
                placeholder={"Digite o valor da estimativa"}
                value={valorDoContrato}
                decimalsLimit={2}
                onValueChange={(value) => {
                  atualizarValorContratoAtual(value);
                }}
                prefix="R$ "
              />
            </div>
          </Modal>

          <ModalCancelarContrato
            salvando={() => {
              salvarCancelamentoContrato();
            }}
            cancelando={() => {
              setMostrarCancelarContrato(false);
            }}
            nomeDoFornecedor={contrato.nomeDoFornecedor}
            mostrarModal={mostrarCancelarContrato}
          />

          <div className={style.cardInfo}>
            <img
              className={style.image}
              src={imagem}
              width={128}
              height={128}
              alt={`Imagem do segmento ${contrato.nomeDoFornecedor}`}
            />
            <div className={style.dataBox}>
              <div className={style.name}>
                {contrato.idProfissional && contrato.nomeDoFornecedor
                  ? `${contrato.nomeDoFornecedor}`
                  : contrato.segmentoContrato}
              </div>

              {contrato.valorContratado && contrato.valorContratado > 0 ? (
                <div className={style.valueBox}>
                  <div>
                    {contrato.idProfissional
                      ? "Valor do contrato"
                      : "Valor estimado"}
                  </div>
                  <div>-</div>
                  <div className={style.value}>
                    {formatarMoeda({
                      valor: valorDoContrato,
                      mostrarPrefixo: true,
                    })}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!contrato.idProfissional) {
                      setMostrarModalValorEstimado(true);
                    } else {
                      setMostrarModal(true);
                    }
                  }}
                  className={style.button}
                >
                  {contrato.idProfissional
                    ? "Adicionar valor contratado"
                    : "Adicionar valor estimado"}
                </button>
              )}
            </div>
          </div>
          <button
            className={style.iconBox}
            onClick={(e) => {
              e.stopPropagation();
              setMostrarOpcoes(!mostrarOpcoes);
            }}
          >
            <FaEllipsisH />
            {mostrarOpcoes && (
              <CardOptions
                setMostrarOpcoes={setMostrarOpcoes}
                opcoes={opcoes}
              />
            )}
          </button>
        </div>
      )}
    </>
  );
}
