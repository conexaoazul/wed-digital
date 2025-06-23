import React from "react";
import { Modal } from "antd";
import styles from "./ModalCancelarContrato.module.css";

export default function ModalCancelarContrato({
  open,
  confirmar,
  fechar,
  cliente,
}) {
  return (
    <Modal
      open={open}
      className={styles.modal}
      okText="Cancelar contrato"
      onOk={() => confirmar()}
      cancelText="Manter contrato"
      onCancel={() => fechar()}
      cancelButtonProps={{
        className: styles.cancel,
      }}
      okButtonProps={{
        className: styles.ok,
      }}
    >
      <div className={styles.box}>
        Você está prestes a cancelar o contrato com o casal {cliente}
      </div>
    </Modal>
  );
}
