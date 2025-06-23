import { Modal } from "antd";
import React from "react";
import styles from "./ModalConviteViaWhatsapp.module.css";
import { FaWhatsapp } from "react-icons/fa";

export default function ModalConviteViaWhatsapp({ open, fechar }) {
  return (
    <Modal open={open} onCancel={() => fechar()} footer={<></>}>
      <div className={styles.box}>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send/?text=Estou%20convidando%20voc%C3%AA%20para%20minha%20lista%20de%20fornecedores%20da%20Wed%20Digital%F0%9F%92%9C%20%20Acesse:https://bit.ly/c0nvite-wed%20para%20entrar"
          onClick={() => fechar()}
          rel="noreferrer"
          id={styles.whatsappInvite}
        >
          <FaWhatsapp className={styles.whatsappIcon} />
          <div className={styles.text}>
            Convide também no WhatsApp tocando aqui
          </div>
        </a>
      </div>
    </Modal>
  );
}
