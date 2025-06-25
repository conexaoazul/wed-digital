import React, { useEffect, useState } from "react";

const tiposPagamento = {
  boleto: "Boleto bancário",
  pix: "Pix",
  credito: "Cartão de crédito",
  debito: "Cartão de débito",
  transferencia: "Transferência bancária",
  outros: "Outros",
  dinheiro: "Dinheiro",
};
export default function FormasDePagamento({ formasDePagamento, onChange }) {
  const fP = formasDePagamento
    ? formasDePagamento.split(",").map((item) => {
        const tipo = item.trim();
        if (Object.values(tiposPagamento).includes(tipo)) {
          return tipo;
        }
      })
    : [];
  const [formasPagamento, setFormasPagamento] = useState(fP);
  const handlePagamento = (e, campo) => {
    if (e.target.checked) {
      setFormasPagamento([...formasPagamento, campo]);
    } else {
      setFormasPagamento(formasPagamento.filter((item) => item !== campo));
    }
  };
  useEffect(() => {
    onChange({
      target: {
        value: formasPagamento.toString(),
        name: "formasPagamento",
      },
    });
  }, [formasPagamento]);

  return (
    <div className="col-lg-12 text-align-left">
      <label
        className="form-check-label"
        id="labelFormaPagamento"
        htmlFor="dinheiro"
      >
        <h5 align="center">Formas de pagamento</h5>
      </label>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="dinheiro"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.pix)}
          onChange={(e) => handlePagamento(e, tiposPagamento.pix)}
        />
        <label htmlFor="dinheiro" className="form-check-label">
          Pix
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="dinheiro"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.dinheiro)}
          onChange={(e) => handlePagamento(e, tiposPagamento.dinheiro)}
        />
        <label htmlFor="dinheiro" className="form-check-label">
          Dinheiro
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="boleto"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.boleto)}
          onChange={(e) => handlePagamento(e, tiposPagamento.boleto)}
        />
        <label htmlFor="boleto" className="form-check-label">
          Boleto bancário
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="credito"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.credito)}
          onChange={(e) => handlePagamento(e, tiposPagamento.credito)}
        />
        <label htmlFor="credito" className="form-check-label">
          Cartão de crédito
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="debito"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.debito)}
          onChange={(e) => handlePagamento(e, tiposPagamento.debito)}
        />
        <label htmlFor="debito" className="form-check-label">
          Cartão de débito
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="transferencia"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.transferencia)}
          onChange={(e) => handlePagamento(e, tiposPagamento.transferencia)}
        />
        <label htmlFor="transferencia" className="form-check-label">
          Transferência bancária
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="outros"
          name="maisDeUmEventoPorDia"
          checked={formasPagamento.includes(tiposPagamento.outros)}
          onChange={(e) => handlePagamento(e, tiposPagamento.outros)}
        />
        <label htmlFor={"outros"} className="form-check-label">
          Outros
        </label>
      </div>
    </div>
  );
}
