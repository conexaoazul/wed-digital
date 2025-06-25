import React, { useState } from "react";

import Config from "../../../../config.json";

export default function FormInficacao(props) {
  const [IsCarregando, setIsCarregando] = useState(false);
  const [IsTextoCopiado, setIsTextoCopiado] = useState(false);

  let nivelConta = props.nivelConta;
  let dadosProfissional = props.dadosProfissional;

  let urlIndicacao = `${Config.api.linkPublico}/empresas/cadastro${dadosProfissional.idUsuario}_${dadosProfissional.tokenConvite}`;

  function copiarCodigo() {
    navigator.clipboard
      .writeText(urlIndicacao)
      .then(() => {
        setIsTextoCopiado(true);
      })
      .catch((err) => {
        setIsTextoCopiado(false);
      });
  }

  return (
    <div>
      <div>
        {IsTextoCopiado ? (
          <div className="alert alert-success" role="alert">
            Link copiado com sucesso!
          </div>
        ) : (
          ""
        )}

        <h1>
          Convide parceiros e noivas para fazer parte da família WedDigital
          através do link abaixo:{" "}
        </h1>
        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">
            Envie o link para outros profissionais
          </label>
          <input
            type="text"
            id="disabledTextInputUrl"
            className="form-control"
            placeholder="Disabled input"
            value={urlIndicacao}
          />
          <br></br>
          <button
            type="button"
            className="btn btn-primary"
            onClick={copiarCodigo}
          >
            Copiar código <i className="fa-solid fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
