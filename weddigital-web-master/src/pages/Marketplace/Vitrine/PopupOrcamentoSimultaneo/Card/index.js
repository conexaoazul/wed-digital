import React, { useState, useEffect } from "react";
import "./card.css";
import semImagem from "../../../../../fileContents/imagensVitrineProfissional/no-image.png";

function Card(props) {
	let nomeEmpresa = props.dadosProfissionais.nomeEmpresa;
	let segmento = props.dadosProfissionais.segmento;
	let valorMinimo = props.dadosProfissionais.valorMinimo;
	let cidade = props.dadosProfissionais.cidade;
	let estado = props.dadosProfissionais.estado;
	let idProfissional = props.dadosProfissionais.idProfissional;
	let imagemVitrine = props.dadosProfissionais.imagemMarketplace;

	let imagemArquivo = imagemVitrine ? imagemVitrine : semImagem;

	const [check, setCheck] = useState(false);

	return (
		<>
			<div className="col-lg-4">
				<div className="card-profissional" key={idProfissional}>
					<div className="image" style={{ paddingTop: "60%", background: "url(" + imagemArquivo + ") no-repeat center/cover" }}></div>
					<div className="content_">
						<h4>{nomeEmpresa}</h4>
						<h6>{cidade}</h6>
						<div className="checkbox">
							<label className="checkbox-label">
								Solicitar Orçamento
								<input type="checkbox" className="checkbox-input" name={nomeEmpresa} value={nomeEmpresa} checked={check} onClick={() => setCheck(!check)} onChange={props.handleSelectProfissional} />
								<span className="checkmark"></span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Card;
