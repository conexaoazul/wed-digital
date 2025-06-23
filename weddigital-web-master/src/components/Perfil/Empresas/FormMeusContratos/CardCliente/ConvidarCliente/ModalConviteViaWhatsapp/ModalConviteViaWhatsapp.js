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
          href="https://api.whatsapp.com/send/?text=Ol%C3%A1!%20Estou%20convidando%20voc%C3%AA%20para%20minha%20lista%20da%20casais%20da%20Wed%20Digital%20%EF%BF%BD%20Acesse:%20https://bit.ly/convit3-wed%20para%20entrar"
          rel="noreferrer"
          onClick={() => fechar()}
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
