import React, { useState } from "react";
import styles from "./CardCliente.module.css";
import { formatarMoeda } from "../../../../../utils/Utils";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaEllipsisH,
  FaMoneyBillAlt,
  FaPlus,
  FaRegTimesCircle,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import ModalCancelarContrato from "./ModalCancelarContrato/ModalCancelarContrato";
import ModalAceitarContrato from "./ModalAceitarContrato/ModalAceitarContrato";
import ModalRejeitarContrato from "./ModalRejeitarContrato/ModalRejeitarContrato";
import CardOptions from "./CardOptions/CardOptions";
import CarregandoPlaceholder from "../../../../Modal/CarregandoPlaceholder";
import api from "../../../../../api";
import { formataTexto } from "../../../../../utils/UtilFormatacao";
import noivosPerfil from "../../../../../assets/avatar/noivoenoiva.png";

export default function CardCliente(props) {
  const [contrato, setContrato] = useState(props.contrato);
  const [isCarregando, setIsCarregando] = useState(false);
  const [mostrarModalCancelarContrato, setMostrarModalCancelarContrato] =
    useState(false);
  const [mostrarModalAceitarContrato, setMostrarModalAceitarContrato] =
    useState(false);
  const [mostrarModalRejeitarContrato, setMostrarModalRejeitarContrato] =
    useState(false);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [mostrarEditarContratoModal, setMostrarEditarContratoModal] =
    useState(false);
  const [mostrarPedirAvaliacaoModal, setMostrarPedirAvaliacaoModal] =
    useState(false);

  let convidarCliente = props.convidarCliente;

  const aceitarContratacao = () => {
    setIsCarregando(true);
    api
      .put(`contratos/aprovarContrato`, contrato)
      .then(({ data }) => {
        setIsCarregando(false);
        window.location.reload();
      })
      .catch(({ error }) => {
        console.error("error", error);
        setIsCarregando(false);
      });

    setMostrarModalAceitarContrato(false);
  };

  const rejeitarContratacao = () => {
    api
      .put(`contratos/rejeitarContrato`, contrato)
      .then(({ data }) => {
        setIsCarregando(false);
        window.location.reload();
      })
      .catch(({ error }) => {
        console.error("error", error);
        setIsCarregando(false);
      });

    setMostrarModalRejeitarContrato(false);
  };

  const cancelarContratacao = () => {
    api
      .put(`contratos/cancelarContrato`, contrato)
      .then(({ data }) => {
        setIsCarregando(false);
        window.location.reload();
      })
      .catch(({ error }) => {
        console.error("error", error);
        setIsCarregando(false);
      });

    setMostrarModalCancelarContrato(false);
  };

  return (
    <div className={styles.card}>
      {isCarregando ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "2rem",
          }}
        >
          <CarregandoPlaceholder />
        </div>
      ) : (
        <>
          {/*<ModalPedirAvalicao*/}
          {/*    nomeDoCasal={casal.nome}*/}
          {/*    open={mostrarPedirAvaliacaoModal}*/}
          {/*    fechar={() => setMostrarPedirAvaliacaoModal(false)}*/}
          {/*    email={casal.email}*/}
          {/*/>*/}

          {/*<ModalEditarContrato*/}
          {/*    mostrarModal={mostrarEditarContratoModal}*/}
          {/*    cancelando={() => setMostrarEditarContratoModal(false)}*/}
          {/*    salvando={(valor) => {*/}
          {/*        const dif = valor - casal.valorDoContrato;*/}
          {/*        setCasal({*/}
          {/*            ...casal,*/}
          {/*            valorDoContrato: valor,*/}
          {/*        });*/}
          {/*        atualizarValor(dif);*/}
          {/*        setMostrarEditarContratoModal(false);*/}
          {/*    }}*/}
          {/*    valor={casal.valorDoContrato}*/}
          {/*/>*/}

          <ModalCancelarContrato
            open={mostrarModalCancelarContrato}
            cliente={`${contrato.nomeNoiva} & ${contrato.nomeConjuge}`}
            confirmar={() => cancelarContratacao()}
            fechar={() => setMostrarModalCancelarContrato(false)}
          />

          <ModalAceitarContrato
            open={mostrarModalAceitarContrato}
            cliente={`${contrato.nomeNoiva} & ${contrato.nomeConjuge}`}
            confirmar={() => aceitarContratacao()}
            fechar={() => setMostrarModalAceitarContrato(false)}
          />

          <ModalRejeitarContrato
            open={mostrarModalRejeitarContrato}
            cliente={`${contrato.nomeNoiva} & ${contrato.nomeConjuge}`}
            confirmar={() => rejeitarContratacao()}
            fechar={() => setMostrarModalRejeitarContrato(false)}
          />

          <div className={styles.cardInfo}>
            <img
              className={styles.image}
              src={
                contrato.imagemNoiva !== null
                  ? contrato.imagemNoiva
                  : noivosPerfil
              }
              width={128}
              height={128}
              alt={`Imagem do casal ${contrato.nomeNoiva} ${
                formataTexto(contrato.nomeConjuge) &&
                "e " + formataTexto(contrato.nomeConjuge)
              }`}
            />
            <div className={styles.dataBox}>
              <div className={styles.name}>
                {`${contrato.nomeNoiva} ${
                  formataTexto(contrato.nomeConjuge) &&
                  "e " + formataTexto(contrato.nomeConjuge)
                }`}
              </div>
              <div className={styles.valueAndDateBox}>
                <div className={styles.valueBox}>
                  <FaMoneyBillAlt className={styles.valueBoxIcon} />
                  <div className={styles.value}>
                    {formatarMoeda({
                      valor: contrato.valorContrato,
                      mostrarPrefixo: true,
                    })}
                  </div>
                </div>
                <div className={styles.dateBox}>
                  <FaCalendarAlt className={styles.dateBoxIcon} />
                  <div>{contrato.dataCasamento}</div>
                </div>
              </div>
              <div>
                {contrato.isContratoConfirmado ? (
                  <button
                    onClick={() => setMostrarModalCancelarContrato(true)}
                    className={styles.cancelContractButton}
                  >
                    <div>Cancelar contrato</div>
                    <FaRegTimesCircle
                      className={styles.cancelContractButtonIcon}
                    />
                  </button>
                ) : (
                  <>
                    {contrato.isContratoConfirmado === false ? (
                      <>
                        <div>Contrato rejeitado</div>
                      </>
                    ) : (
                      <div className={styles.confirmContract}>
                        <div>Confirma essa contratação?</div>
                        <div className={styles.confirmContractButtonBox}>
                          <button
                            onClick={() => setMostrarModalAceitarContrato(true)}
                            className={styles.buttonnone}
                          >
                            <FaCheckCircle
                              className={styles.confirmContractYes}
                            />
                          </button>
                          <button
                            onClick={() =>
                              setMostrarModalRejeitarContrato(true)
                            }
                            className={styles.buttonnone}
                          >
                            <FaTimesCircle
                              className={styles.confirmContractNo}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            className={styles.iconBox}
            onClick={() => {
              setMostrarOpcoes(!mostrarOpcoes);
            }}
          >
            <FaEllipsisH />
            {mostrarOpcoes && (
              <CardOptions
                setMostrarOpcoes={setMostrarOpcoes}
                opcoes={[
                  {
                    action: () => convidarCliente(),
                    title: "Convidar cliente",
                    icon: <FaPlus />,
                  },
                  // {
                  //     action: () => setMostrarEditarContratoModal(true),
                  //     title: "Editar valor do contrato",
                  //     icon: <FaPen/>,
                  // },
                  // {
                  //     action: () => setMostrarPedirAvaliacaoModal(true),
                  //     title: "Pedir avaliação",
                  //     icon: <FaStar/>,
                  // },
                  {
                    action: () => setMostrarModalRejeitarContrato(true),
                    title: "Cancelar contrato",
                    icon: <FaTimes />,
                  },
                ]}
              />
            )}
          </button>
        </>
      )}
    </div>
  );
}
