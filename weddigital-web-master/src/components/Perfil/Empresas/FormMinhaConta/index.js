import React, { useState } from "react";

import CarregandoPlaceholder from "../../../Modal/CarregandoPlaceholder";

export default function FormMinhaConta(props) {

	let nivelConta = props.dadosStatusPontuacao;

	const [IsCarregandoDados, setIsCarregandoDados] = useState(false);

	return (
		<>
			{/* background */}
			<section className="background slim" style={{ background: "linear-gradient(45deg, var(--color-dark), var(--color-secondary))" }}></section>
			{/* end background */}
			{/* dados gerais */}
			<section className="dados-gerais">
				<div className="container">
					<div className="row g-4">
						{/* content */}
						<div className="col-lg-12">
							<div className="content">
								{IsCarregandoDados ? (
									<CarregandoPlaceholder />
								) : (
									<div className="row g-4 align-items-end">
										<div className="col-lg-12">
											<div className="title">
												<div className="d-flex justify-content-between align-items-center pb-2">
													<button onClick={() => props.tabLocation("resumo")} className="link-back">
														<i className="fa-solid fa-arrow-left"></i>
													</button>
													<div className="title-back">
														<h2 className="mb-0">Minha conta</h2>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-3">
											<label htmlFor="" className="mb-2">Meu plano</label>
											<input type="text" className="form-control" value={nivelConta.nivelContaNome} disabled/>
										</div>
										<div className="col-lg-12">
											<hr />
										</div>
										<div className="col-lg-3">
											<label htmlFor="" className="mb-2">Nova senha</label>
											<input type="text" className="form-control" placeholder={'******'}/>
										</div>
										<div className="col-lg-3">
											<label htmlFor="" className="mb-2">Repita senha</label>
											<input type="text" className="form-control" placeholder={'******'}/>
										</div>
										<div className="col-lg-auto">
											<button className="btn btn-primary">
												<span>Salvar</span>
											</button>
										</div>
										<div className="col-lg-12">
											<hr />
										</div>
										<div className="col-lg-auto">
											<button className="btn btn-danger">
												<span>Excluir conta</span>
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
						{/* end content */}
					</div>
				</div>
			</section>
			{/* end dados gerais */}
		</>
	);
}
