export function formatarMoeda({ valor, mostrarPrefixo = false }) {
  const valorEmTexto = String(valor).replace(",", "").replace("R$", "").trim();

  const [inteiro, decimal] = Number(Number(valorEmTexto).toFixed(2))
    .toLocaleString("pt-BR")
    .split(",");
  const texto = `${inteiro},${decimal ?? "00"}`;
  return mostrarPrefixo ? `R$ ${texto}` : texto;
}

export function formataTexto(texto) {
  return texto !== null ? texto : "";
}
