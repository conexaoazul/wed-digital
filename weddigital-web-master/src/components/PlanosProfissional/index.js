import React, { useState } from "react";
import "./Planos.css";

import configServer from '../../config.json'
import WhatsAppFlutter from "../WhatsappFlutter";

export default function Plans() {
	const [openMenu, setOpenMenu] = useState(false);
	const toggleMenu = () => {
		if (openMenu == "open") {
			setOpenMenu(false);
			return false;
		}
		setOpenMenu("open");
	};
	return (
		<>
			<WhatsAppFlutter />

			<main>
				<section className="plans">
					<div className="container">
						<div className="row g-4">
							<div className="col-lg-11 mx-auto">
								<div className="title text-center pb-lg-5 mb-4">
									<h2>
										Escolha seu plano e destaque-se
									</h2>
								</div>
							</div>
							<div className="col-lg-11 mx-auto">
								<div className="row g-0">
									{/* item */}
									<div className="col-lg-4">
										<div className="item">
											<div className="title_">
												<h6>
													<span>R$</span>
													<span>907</span>
												</h6>
												<div className="price">
													<h2>
														<span>R$</span>
														<span>122</span>
													</h2>
													<div>
														<span>,49</span>
														<span>em 3x</span>
													</div>
												</div>
												<span className='valor_plano_profissional_a_vista'>Ou R$ 347 à vista</span>
												<h5>Trimestral</h5>
												<h4>Plano Start</h4>
											</div>
											<span className="div"></span>
											<ul>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Painel grátis</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Orçamentos ilimitados</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Participação no Pontos Wed</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Certificação de curso</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Acesso exclusivo aos dados dos noivos</span>
												</li>
												<div className='mobile-hidden'>
													<li className="no">
														<i className="fa-solid fa-check"></i>
														<span>Participação no Pro Win</span>
													</li>
													<li className="no">
														<i className="fa-solid fa-check"></i>
														<span>Visibilidade de status</span>
													</li>
													<li>
														<i className="fa-solid fa-check"></i>
														<span>7 dias de destaque na homepage noivos</span>
													</li>

												</div>
											</ul>
											<a href={`${configServer.planos.start}`} className="btn btn-primary">
												<span>Assinar agora!</span>
											</a>
											<button className="link">
												<span>Teste 14 dias de carência</span>
											</button>
										</div>
									</div>
									{/* item */}
									<div className="col-lg-4">
										<div className="item">
											<div className="title_">
												<h6>
													<span>R$</span>
													<span>1.397</span>
												</h6>
												<div className="price">
													<h2>
														<span>R$</span>
														<span>99</span>
													</h2>
													<div>
														<span>,70</span>
														<span>em 12x</span>
													</div>
												</div>
												<span className='valor_plano_profissional_a_vista'>Ou R$ 997 à vista</span>

												<h5 style={{ marginTop: "1rem" }}>Anual</h5>
												<h4>Plano Ouro</h4>
											</div>
											<span className="div"></span>
											<ul>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Painel grátis</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Orçamentos ilimitados</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Destaque no seu segmento</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Participação no Pontos Wed</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Certificação de curso</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Acesso exclusivo aos dados dos noivos</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Visibilidade de status</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>2x mais visibilidade</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Participação no Pro Win</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>14 dias de destaque na homepage e Dashboard noivos</span>
												</li>
											</ul>
											<a href={`${configServer.planos.ouro}`} className="btn btn-primary">
												<span>Assinar agora!</span>
											</a>
											<button className="link">
												<span>Teste 30 dias de carência</span>
											</button>
										</div>
									</div>
									{/* item */}
									<div className="col-lg-4">
										<div className="item">
											<div className="title_">
												<h6>
													<span>R$</span>
													<span>1.997</span>
												</h6>
												<div className="price">
													<h2>
														<span>R$</span>
														<span>149</span>
													</h2>
													<div>
														<span>,70</span>
														<span>em 12x</span>
													</div>
												</div>
												<span className='valor_plano_profissional_a_vista'>Ou R$ 1497 à vista</span>

												<h5 style={{ marginTop: "1rem" }}>Anual</h5>
												<h4>Plano Diamante</h4>
											</div>
											<span className="div"></span>
											<ul>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Painel grátis</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Orçamentos ilimitados</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Destaque no seu segmento</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Destaque no seu estado</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Participação no Pontos Wed</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Certificação de curso</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Acesso exclusivo aos dados dos noivos</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Visibilidade de status</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>4x mais visibilidade</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>30 dias de destaque na homepage e Dashboard noivos</span>
												</li>
												<li>
													<i className="fa-solid fa-check"></i>
													<span>Participação no Pro Win</span>
												</li>
											</ul>
											<a href={`${configServer.planos.diamante}`} className="btn btn-primary">
												<span>Assinar agora!</span>
											</a>
											<button className="link">
												<span>Teste 30 dias de carência</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
