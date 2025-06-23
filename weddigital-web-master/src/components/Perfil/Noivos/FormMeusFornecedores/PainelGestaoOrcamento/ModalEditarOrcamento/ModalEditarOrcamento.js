import React, { useContext, useState } from "react";
import styles from "./ModalEditarOrcamento.module.css";
import { Modal } from "antd";
import CurrencyInput from "react-currency-input-field";
import api from "../../../../../../api";
import UserContext from "../../../../../../api/userContext-api/userContext";

export default function ModalEditarOrcamento({
  valor,
  mostrarModal,
  salvando,
  cancelando,
}) {
  const [orcamento, setOrcamento] = useState(valor);

  const { token } = useContext(UserContext);

  let dadosToken = token.split("_");
  let idNoivos = dadosToken[1];
  let tokenAcesso = dadosToken[2];

  const salvar = () => {
    salvarNovoOrcamentoNoiva();
  };

  const cancelar = () => {
    cancelando();
  };

  const salvarNovoOrcamentoNoiva = () => {
    api
      .put(
        `noivos/dadosOrcamento/atualizarOrcamento?idNoivos=${idNoivos}&tokenAcesso=${tokenAcesso}&valorAtualizado=${orcamento}`,
      )
      .then(({ data }) => {
        window.location.reload();
      })
      .catch(({ error }) => {
        console.error("error: ", error);
      });
  };

  return (
    <Modal
      title="Editar valor do orçamento total  "
      onOk={salvar}
      onCancel={cancelar}
      destroyOnClose
      open={mostrarModal}
      okText={"Salvar"}
      cancelText={"Cancelar"}
      okButtonProps={{
        className: styles.modalButtonOk,
      }}
      cancelButtonProps={{
        className: styles.modalButtonCancel,
      }}
      className={styles.modal}
    >
      <div className={styles.form}>
        <label className={styles.label}>Novo valor do orçamento:*</label>
        <CurrencyInput
          className={styles.emailInput}
          placeholder="Digite o novo valor do orçamento"
          value={orcamento}
          decimalsLimit={2}
          onValueChange={(value) => {
            setOrcamento(Number(value) || "");
          }}
          prefix="R$ "
        />
      </div>
    </Modal>
  );
}
