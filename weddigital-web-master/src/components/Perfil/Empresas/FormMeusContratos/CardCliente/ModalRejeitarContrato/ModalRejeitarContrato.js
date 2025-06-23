import React from "react";
import { Modal } from "antd";
import styles from "./ModalRejeitarContrato.module.css";

export default function ModalRejeitarContrato({
  open,
  confirmar,
  fechar,
  cliente,
}) {
  return (
    <Modal
      open={open}
      okText="Rejeitar contrato"
      onOk={() => confirmar()}
      cancelText="Responder depois"
      onCancel={() => fechar()}
      cancelButtonProps={{
        className: styles.cancel,
      }}
      okButtonProps={{
        className: styles.ok,
      }}
      className={styles.modal}
    >
      <div className={styles.box}>
        Você está prestes a rejeitar o contrato com o casal {cliente}
      </div>
    </Modal>
  );
}
