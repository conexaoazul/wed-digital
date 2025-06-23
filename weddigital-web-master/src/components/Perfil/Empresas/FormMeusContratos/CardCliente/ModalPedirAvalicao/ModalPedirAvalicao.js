import { Modal } from "antd";
import React, { useState } from "react";

import styles from "./ModalPedirAvalicao.module.css";
import { FaEnvelope } from "react-icons/fa";

export default function ModalPedirAvalicao({
  open,
  fechar,
  nomeDoCasal,
  email: emailInicial,
}) {
  const [email, setEmail] = useState(emailInicial);
  const [enviado, setEnviado] = useState(false);

  const pedirAvalicao = () => {
    setEnviado(true);
  };

  return (
    <Modal
      title={"Pedir avaliação do cliente"}
      open={open}
      onCancel={() => {
        setEmail(emailInicial);
        setEnviado(false);
        fechar();
      }}
      onOk={() => pedirAvalicao()}
      cancelText="Não enviar"
      okText="Enviar pedido"
      footer={enviado ? <></> : undefined}
      okButtonProps={{
        id: styles.modalButtonOk,
        disabled: !email || email === "",
      }}
      cancelButtonProps={{
        id: styles.modalButtonCancel,
      }}
      className={styles.modal}
    >
      {enviado ? (
        <div className={styles.text}>
          {`Solicitação de avaliação ao casal ${nomeDoCasal} enviada com sucesso para o email ${email}`}
        </div>
      ) : (
        <div className={styles.searchBox}>
          <FaEnvelope className={styles.icon} />
          <input
            placeholder="Digite o email do cliente"
            className={styles.search}
            type="email"
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value);
            }}
          />
        </div>
      )}
    </Modal>
  );
}
