import { FaWhatsapp } from "react-icons/fa";
import React from "react";

export default function LinkEntrarNaComunidade() {
  return (
    <div className="d-flex comunidade">
      <a
        href="https://chat.whatsapp.com/LrY8j8R4R3q9ssgcdwM8oY"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp /> <span>Entrar na comunidade</span>
      </a>
    </div>
  );
}
