import React from "react";
import InputMask from "react-input-mask";

export default function CardDadosContato(props) {
	let valorMinimo = props.valorMinimo;
	let formasPagamento = props.formasPagamento;
	let maisDeUmDia = props.maisDeUmDia;
	let trabalhaSozinho = props.trabalhaSozinho;

	return (
		<>
			<div className="infos" style={{ marginLeft: 0, paddingLeft: 0, paddingRight: 0 }}>
				<div className="row g-2" style={{ width: "100%" }}>
					{/* <div className="col-lg-12">
						<h4>Informações complementares</h4>
					</div> */}
					<div style={{ display: "flex", flexDirection: "row", width: "100%", gap: 10 }}>
						<div className="field">
							<label>Valores a partir de:</label>
							<span>{valorMinimo ? valorMinimo : "Não informado"}</span>
						</div>
						<div className="field">
							<label>Formas de pagamento</label>
							<span>{formasPagamento ? formasPagamento : "Não informado"}</span>
						</div>
					</div>

					<div className="col-lg-12" style={{ display: "flex", flexDirection: "row", width: "100%", gap: 10 }}>
						<div className="field">
							<label>Realiza mais de um evento por dia?</label>
							<span>{maisDeUmDia ? "Sim" : "Não"}</span>
						</div>
						<div className="field">
							<label>Trabalha só ou com equipe?</label>
							<span>{trabalhaSozinho ? "Sozinho" : "Em equipe"}</span>
						</div>
					</div>

				</div>
			</div>
		</>
	);
}
