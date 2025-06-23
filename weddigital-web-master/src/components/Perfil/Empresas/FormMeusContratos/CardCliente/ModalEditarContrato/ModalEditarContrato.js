import React, { useState } from "react";
import styles from "./ModalEditarContrato.module.css";
import { Modal } from "antd";
import CurrencyInput from "react-currency-input-field";

export default function ModalEditarContrato({
  valor,
  mostrarModal,
  salvando,
  cancelando,
}) {
  const [valorDoContrato, setValorDoContrato] = useState(valor);

  const salvar = () => {
    salvando(valorDoContrato);
  };

  const cancelar = () => {
    cancelando();
  };

  return (
    <Modal
      title="Atualizar contrato"
      onOk={salvar}
      onCancel={cancelar}
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
        <label className={styles.label}>
          Informe o novo valor do contrato:*
        </label>
        <CurrencyInput
          className={styles.emailInput}
          placeholder="Digite o novo valor do contrato"
          value={valorDoContrato}
          decimalsLimit={2}
          onValueChange={(value) => {
            setValorDoContrato(value || "");
          }}
          prefix="R$ "
        />
      </div>
    </Modal>
  );
}
