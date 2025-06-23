import {FaWhatsapp} from "react-icons/fa";
import React from "react";

export default function LinkEntrarNaComunidade() {
    return (
        <div className="d-flex comunidade">
            <a
                href="https://chat.whatsapp.com/FDSaC95uM59Cu5c3xwkJWo"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaWhatsapp/>{" "}
                Entrar na comunidade
            </a>
        </div>
    )
}