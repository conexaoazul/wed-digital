import React, {useState} from "react";
import styles from "./ModalCancelarContrato.module.css";
import {Modal} from "antd";

export default function ModalCancelarContrato({ mostrarModal, salvando, cancelando, nomeDoFornecedor, }) {
    const salvar = () => {
        salvando();
    };

    const cancelar = () => {
        cancelando();
    };

    return (
        <Modal
            title="Cancelar contrato"
            onOk={salvar}
            onCancel={cancelar}
            destroyOnClose
            open={mostrarModal}
            okText={"Cancelar contrato"}
            okButtonProps={{
                className: styles.modalButtonOk,
            }}
            cancelText={"Manter contrato"}
            cancelButtonProps={{
                className: styles.modalButtonCancel,
            }}
            className={styles.modal}
        >
            <div className={styles.form}>
                <div>
                    Tem certeza que deseja cancelar o contrato com {nomeDoFornecedor}?
                </div>
            </div>
        </Modal>
    );
}
