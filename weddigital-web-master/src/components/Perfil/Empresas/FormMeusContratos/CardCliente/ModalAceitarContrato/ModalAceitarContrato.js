import React from "react";
import {Modal} from "antd";
import styles from "./ModalAceitarContrato.module.css";

export default function ModalAceitarContrato({
                                                 open,
                                                 confirmar,
                                                 fechar,
                                                 cliente,
                                             }) {
    return (
        <Modal
            open={open}
            okText="Aceitar contrato"
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
                Você está prestes a confirmar o contrato com o casal {cliente}
            </div>
        </Modal>
    );
}
