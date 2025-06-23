import axios from "axios";
import constantes from "../constantes.json";

let isAmbienteproducao = constantes["ambiente-producao"];
let urlPublica = isAmbienteproducao
  ? constantes.linkPublicoProducao
  : constantes.linkPublicoLocalhost;

export function atualizarDadosCadastroNoivaWebhook(cadastroRelatorio) {
  if (isAmbienteproducao) {
    axios
      .post(constantes.webhookAtualizacaoCadastroNoiva, cadastroRelatorio)
      .then(() => {
        console.log("Cadastro informado com sucesso!");
        setTimeout(() => {
          window.location.replace(`${urlPublica}/perfil`);
        }, "1000");
      })
      .catch(() => {
        console.error("Falha ao informar cadastro");
        setTimeout(() => {
          window.location.replace(`${urlPublica}/perfil`);
        }, "1000");
      });
  } else {
    setTimeout(() => {
      window.location.replace(`${urlPublica}/perfil`);
    }, "1000");
  }
}
