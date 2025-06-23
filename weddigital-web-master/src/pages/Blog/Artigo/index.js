import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

export default function Artigo() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital</title>
			</Helmet>

			{/* --- INIT PIXEL --- */}
			<noscript>
				<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898" height="0" width="0" style="display:none;visibility:hidden"></iframe>
			</noscript>
			{/* --- END PIXEL --- */}

			<Navbar navfix={true} utmCadastro={utmData} />

			<section className="crumb">
				<div className="container">
					<ul>
						<li>
							<a href="">Casamentos</a>
						</li>
						<li>/</li>
						<li>
							<a href="">Ideias de casamento</a>
						</li>
						<li>/</li>
						<li>
							<a href="">Artigo</a>
						</li>
					</ul>
				</div>
			</section>

			<main className="blog">
				<section className="article">
					<div className="container">
						<div className="row g-4 g-lg-5">
							{/* article */}
							<div className="col-lg-9">
								<div className="row g-4 gy-5">
									<div className="col-lg-12 d-lg-none d-block">
										<div className="block call">
											<h4 className="mt-0">Encontre o fornecedor ideal para seu casamento</h4>
											<a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} className="link mt-3 d-block" style={{color: 'var(--color-secondary)'}}>
												<span>Encontrar fornecedores</span>
												<i className="fa-solid fa-arrow-right ms-2 ps-1"></i>
											</a>
										</div>
									</div>
									{/* header_ */}
									<div className="col-lg-12">
										<div className="header_">
											<h6>TRÂMITES MATRIMÔNIO</h6>
											<h2>15 Dúvidas (e respostas!) sobre a mudança de sobrenome depois do casamento</h2>
											<p>A escolha de incluir ou não o sobrenome do cônjuge, e todo o processo para que essa troca seja feita, podem trazer dúvidas aos casais. São questionamentos comuns e, para tornar essa etapa mais fácil, trazemos respostas para as suas dúvidas.</p>
										</div>
									</div>
									{/* author share */}
									<div className="col-lg-12">
										<div className="author-share">
											<div className="info">
												{/* <div className="author">Nome do autor</div> */}
												<div className="date ms-0">Atualizado dia 03 de março de 2023</div>
												{/* <div className="likes">
													<ion-icon name="heart-outline"></ion-icon>
													<span>20</span>
												</div> */}
											</div>
											<div className="share">
												<button onClick={() => setShareOptions(1)}>
													<ion-icon name="share-outline"></ion-icon>
												</button>
												{/* <button>
													<ion-icon name="heart-outline"></ion-icon>
												</button> */}
											</div>
										</div>
										{shareOptions ? (
											<div className="share-options">
											<button className="close_" onClick={() => setShareOptions(0)}>
												<i className="fa-solid fa-xmark"></i>
											</button>
											<h4>Compartilhar</h4>
											<ul>
												<li>
													<a href="">
														<i className="fa-brands fa-facebook me-3"></i>
														<span>Facebook</span>
													</a>
												</li>
												<li>
													<a href="">
														<i className="fa-brands fa-instagram me-3"></i>
														<span>Instagram</span>
													</a>
												</li>
												<li>
													<a href="">
														<i className="fa-brands fa-whatsapp me-3"></i>
														<span>Whatsapp</span>
													</a>
												</li>
											</ul>
										</div>
										) : (<></>)}
									</div>
									{/* image */}
									<div className="col-lg-12">
										<img src="https://cdn0.casamentos.com.br/article-real-wedding/899/3_2/1280/jpg/2842811.webp" className="img-fluid" style={{borderRadius: '1rem'}} />
									</div>
									{/* text */}
									<div className="col-lg-12">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula dui eu dictum aliquam. Phasellus vestibulum, leo ac congue tempor, odio velit finibus nisl, eget porta diam enim id orci. Vivamus pellentesque non neque quis cursus. Duis ut ultricies odio. Curabitur pharetra nisi vel tellus venenatis posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi scelerisque magna quis turpis consectetur, et mattis metus aliquet. Sed rutrum eget elit id eleifend. Vestibulum finibus sapien et orci ullamcorper, sit amet iaculis ante mattis. Vivamus et est nisi. Suspendisse viverra bibendum sem, non mattis sapien sollicitudin ut.</p>
									</div>
									{/* text */}
									<div className="col-lg-12">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula dui eu dictum aliquam. Phasellus vestibulum, leo ac congue tempor, odio velit finibus nisl, eget porta diam enim id orci. Vivamus pellentesque non neque quis cursus. Duis ut ultricies odio. Curabitur pharetra nisi vel tellus venenatis posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi scelerisque magna quis turpis consectetur, et mattis metus aliquet. Sed rutrum eget elit id eleifend. Vestibulum finibus sapien et orci ullamcorper, sit amet iaculis ante mattis. Vivamus et est nisi. Suspendisse viverra bibendum sem, non mattis sapien sollicitudin ut.</p>
									</div>
									{/* image */}
									<div className="col-lg-12">
										<img src="https://inesquecivelassessoria.com.br/wp-content/uploads/2017/02/organizacao-de-casamento.jpg" className="img-fluid" style={{borderRadius: '1rem'}} />
									</div>
								</div>
							</div>
							{/* sidebar */}
							<div className="col-lg-3">
								<div className="sidebar-blog">
									<div className="row g-4">
										{/* block */}
										<div className="col-lg-12">
											<div className="block">
												<h4 className="mb-3">Seções</h4>
												<ul>
													<li>
														<a href="#">
															<span>Antes do casamento</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>A cerimônia de casamento</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>A recepção</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>Os serviços para seu casamento</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>Moda nupcial</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>Beleza e saúde</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>Lua de mel</span>
															<span>(4)</span>
														</a>
													</li>
													<li>
														<a href="#">
															<span>Depois do casamento</span>
															<span>(4)</span>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
