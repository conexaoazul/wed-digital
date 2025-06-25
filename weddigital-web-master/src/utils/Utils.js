export function verificarIgualdadeSenha(senha1, senha2) {
  if (senha1 !== "" && senha2 !== "") {
    return senha1 === senha2;
  } else {
    return false;
  }
}

export function verificarIntegridadeSenha(senha) {
  // var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})/
  if (senha.length < 8) {
    return false;
  }
  // else if(!regex.exec(senha)){
  //     return false
  // }

  return true;
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/; // Expressão regular para validar o formato do e-mail
  return regex.test(email); // Verifica se o e-mail corresponde ao formato esperado
}

export function formatarMoeda({ valor, mostrarPrefixo = false }) {
  const valorEmTexto = String(valor).replace(",", "").replace("R$", "").trim();

  const [inteiro, decimal] = Number(Number(valorEmTexto).toFixed(2))
    .toLocaleString("pt-BR")
    .split(",");
  const texto = `${inteiro},${decimal ?? "00"}`;
  return mostrarPrefixo ? `R$ ${texto}` : texto;
}

export function obterCategoriaPorResumoCategoria(categoriaResumo) {
  if (categoriaResumo === "Espaço para casamento")
    return "Espaço para casamentos";
  if (categoriaResumo === "Decoração") return "Decoração de casamentos";
  if (categoriaResumo === "Cerimonial") return "Assessoria e Cerimonial";
  if (categoriaResumo === "Buffet") return "Buffet, bebibas, bolos e doces";
  if (categoriaResumo === "Foto") return "Foto e vídeo para casamentos";
  if (categoriaResumo === "Vídeo") return "Foto e vídeo para casamentos";
  if (categoriaResumo === "Música") return "Música e iluminação";
  if (categoriaResumo === "Convites") return "Convites";
  if (categoriaResumo === "Dia da noiva") return "Beleza e dia da noiva";
  if (categoriaResumo === "Jóias") return "Joalheria para casamentos";
  if (categoriaResumo === "Transporte") return "Transporte para casamento";
  if (categoriaResumo === "Adicionar outro") return "";
}

export function obterEstadoPorSigla(siglaEstado) {
  switch (siglaEstado.toUpperCase()) {
    case "AC":
      return "Acre";
    case "AL":
      return "Alagoas";
    case "AP":
      return "Amapá";
    case "AM":
      return "Amazonas";
    case "BA":
      return "Bahia";
    case "CE":
      return "Ceará";
    case "DF":
      return "Distrito Federal";
    case "ES":
      return "Espírito Santo";
    case "GO":
      return "Goiás";
    case "MA":
      return "Maranhão";
    case "MT":
      return "Mato Grosso";
    case "MS":
      return "Mato Grosso do Sul";
    case "MG":
      return "Minas Gerais";
    case "PA":
      return "Pará";
    case "PB":
      return "Paraíba";
    case "PR":
      return "Paraná";
    case "PE":
      return "Pernambuco";
    case "PI":
      return "Piauí";
    case "RJ":
      return "Rio de Janeiro";
    case "RN":
      return "Rio Grande do Norte";
    case "RS":
      return "Rio Grande do Sul";
    case "RO":
      return "Rondônia";
    case "RR":
      return "Roraima";
    case "SC":
      return "Santa Catarina";
    case "SP":
      return "São Paulo";
    case "SP-ZS":
      return "São Paulo";
    case "SP-ZL":
      return "São Paulo";
    case "SP-ZN":
      return "São Paulo";
    case "SP-ZO":
      return "São Paulo";
    case "SE":
      return "Sergipe";
    case "TO":
      return "Tocantins";
    default:
      return "Sigla de estado inválida";
  }
}

// Função que transforma os strings "true"/"false" em boolean e números válidos em int
export const normalizeBooleanPayload = (payload) => {
  const result = {};
  for (const key in payload) {
    const value = payload[key];
    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else if (!isNaN(value)) {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }
  return result;
};

export function getUltimoDiaMes() {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formattedDate = lastDay.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return formattedDate;
}
