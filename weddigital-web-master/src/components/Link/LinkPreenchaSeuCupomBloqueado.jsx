import React from "react";

export default function LinkPreenchaSeuCupomBloqueado() {
  return (
    <div className="col-lg-auto  text-center">
      <a href="#" className="btn btn-primary w-100 px-lg-5 py-lg-3 px-4 py-2">
        <span>
          <i className="fa-solid fa-lock" style={{ marginRight: "0.5rem" }}></i>
          Preencha seu cupom
        </span>
      </a>
      <p className="mt-2">Conquiste 100 pontos ou mais para desbloquear</p>
    </div>
  );
}
