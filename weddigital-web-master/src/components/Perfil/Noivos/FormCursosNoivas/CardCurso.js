import React from "react";

export default function CardConteudoCurso(props) {
	let capaCurso = props.capaCurso != "" ? props.capaCurso : "no-image.png";
	const imagemCapaCurso = require(`../../../../fileContents/Capa Cursos/${capaCurso}`);

	return (
		<div className="col-lg-4">
			<div className="card mb-0 d-flex flex-column h-100" style={{ overflow: "hidden", position: 'relative' }}>
				<img src={imagemCapaCurso} className="card-img-top imagem-conteudo-capa" alt="..." />
				{props.isCursoBloqueado ? <i className="icon-lock-curso fa-solid fa-lock"></i> : ""}
				<div className="card-body">
					{props.isCursoBloqueado ? (
						<>
							<div style={{ fontWeight: 700, background: 'rgb(0 0 0 / 48%)', color: '#ffffff', borderRadius: ".56rem", position: 'absolute', top: '1rem' }} className="d-inline-flex px-2 py-1 text-center">
								Em breve
							</div>
						</>
					) : (
						<></>
					)}
					<h5 className="card-title">{props.nomeCurso}</h5>
					<p className="card-text">{props.descricaoCurso}</p>
					{props.isCursoBloqueado ? (
						<></>
					) : (
						<a href={props.linkCurso} target="_blank" className="btn btn-primary rounded mt-auto" rel="noreferrer">
							<strong>{props.descricaoCurso.indexOf("Baixe") === 0 ? "Baixar E-book" : "Acessar Curso"}</strong>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
