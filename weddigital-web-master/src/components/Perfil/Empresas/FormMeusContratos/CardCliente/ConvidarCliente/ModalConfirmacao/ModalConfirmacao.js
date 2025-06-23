import { Modal } from "antd";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./ModalConfirmacao.module.css";

export default function ModalConfirmacao({ open, fechar }) {
  return (
    <Modal open={open} onCancel={() => fechar()} footer={<></>}>
      <div className={styles.box}>
        <div className={styles.text}>
          <FaCheckCircle className={styles.check} />
          <div>
            Convite realizado com sucesso!
            <br className={styles.mobileOnly} /> Aguarde o cliente aceitar
          </div>
        </div>
      </div>
    </Modal>
  );
}
