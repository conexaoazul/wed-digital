import React from "react";
import "./style.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Helmet from "react-helmet";

import NavCrumb from './NavCrumb'
import Sidebar from "./Sidebar";

import img23 from '../../assets/blog/23.jpg';
import img27 from '../../assets/blog/27.jpg';
import img14 from '../../assets/blog/14.jpg';
import img25 from '../../assets/blog/25.jpg';
import img12 from '../../assets/blog/12.jpg';
import img7 from '../../assets/blog/7.jpg';
import img6 from '../../assets/blog/6.jpg';
import img5 from '../../assets/blog/5.jpg';
import img28 from '../../assets/blog/28.png'
import img32 from '../../assets/blog/32.jpg'

export default function Blog() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

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

			<Navbar navfix={true} fluid={false} utmCadastro={utmData} />

			<NavCrumb />

			<main className="blog">
				<section className="initial-blog">
					<div className="container">
						<div className="row g-4">
							<div className="col-lg-12">
								<h1>Conteúdos de casamento</h1>
								<p>Planejar um casamento precisa ser algo leve apesar de tanto trabalho. Por isso, nós da Wed Digital vamos te ajudar com os melhores conteúdos para casamento, que irão transformar processos burocráticos em algo tranquilo e divertido.</p>
							</div>
							<div className="col-lg-5">
								<div className="search-blog">
									<i className="fa-solid fa-magnifying-glass"></i>
									<input type="text" className="form-control" placeholder="Qual artigo você está procurando" />
									<button className="btn">
										<span>Pesquisar</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="destaques">
					<div className="container">
						<div className="row g-5">
							{/* item */}
							<div className="col-lg-6">
								<a href="/blog/artigo/conheca-os-principais-estilos-de-decoracoes-para-sua-festa-de-casamento/03-06-2023" className="item large">
									<div className="image" style={{ background: "#ccc url(" + img32 + ") no-repeat center/cover" }}></div>
									<div className="content">
										<div className="sub">Ideias de casamento</div>
										<h6>Conheça os principais estilos de decorações para sua festa de casamento</h6>
										<p>Tornando o seu casamento memorável: Dicas de Decoração para Casamentos Inesquecíveis... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span></p>
									</div>
								</a>
							</div>
							<div className="col-lg-6">
								<div className="row g-5">
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/entenda-sobre-como-a-decoracao-do-seu-casamento-pode-mudar-tudo/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img27 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Entenda sobre como a decoração do seu casamento pode mudar tudo</h6>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/3-passos-para-escolher-as-musicas-da-cerimonia-do-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img14 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>3 passos para escolher as músicas da cerimônia do seu casamento</h6>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/contratar-ou-nao-uma-cerimonialista-para-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img25 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Contratar ou não uma cerimonialista para seu casamento?</h6>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/qual-buque-de-noiva-ideal-para-o-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img12 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Qual buquê de noiva ideal para o seu casamento?</h6>
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="last">
					<div className="container">
						<div className="row g-5">
							<div className="col-lg-12">
								<div className="title">
									<h4>Últimos artigos publicados</h4>
								</div>
							</div>
							{/* last */}
							<div className="col-lg-9">
								<div className="row g-5">
									{/* <div className="col-lg-12">
										<p>Nenhuma publicação encontrada.</p>
									</div> */}

									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/baixe-gratuitamente-o-plano-perfeito-para-a-festa-do-seu-casamento/02-09-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img28 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento
												</div>
												<h6>Baixe gratuitamente o plano
													perfeito para a festa do seu casamento
												</h6>
												<p>Um guia prático te ajudando a planejar o seu
													grande dia de forma... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span></p>
											</div>
										</a>
									</div>

									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/descubra-detalhes-que-tornam-um-casamento-classico-inesquecivel/02-09-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img32 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento
												</div>
												<h6>Descubra detalhes que tornam um Casamento Clássico inesquecível
												</h6>
												<p>Um estilo que permanece atemporal e eternamente elegante é o... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span></p>
											</div>
										</a>
									</div>


									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/conheca-os-principais-estilos-de-decoracoes-para-sua-festa-de-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img23 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Conheça os principais estilos de decorações para sua festa de casamento</h6>
												<p>Tornando o seu casamento memorável: Dicas de Decoração para Casamentos Inesquecíveis... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span></p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/entenda-sobre-como-a-decoracao-do-seu-casamento-pode-mudar-tudo/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img27 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Entenda sobre como a decoração do seu casamento pode mudar tudo</h6>
												<p>Antes de começar a pensar na decoração, é importante definir um tema ou estilo para... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/3-passos-para-escolher-as-musicas-da-cerimonia-do-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img14 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>3 passos para escolher as músicas da cerimônia do seu casamento</h6>
												<p>A música é um dos elementos principais quando o assunto é festa de casamento... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/contratar-ou-nao-uma-cerimonialista-para-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img25 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Contratar ou não uma cerimonialista para seu casamento?</h6>
												<p>Agora que você decidiu realizar a sua festa de casamento e começou a pesquisar tudo... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/qual-buque-de-noiva-ideal-para-o-seu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img12 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Qual buquê de noiva ideal para o seu casamento?</h6>
												<p>O buquê de noiva é um dos elementos mais importantes do casamento, pois simboliza a beleza... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/com-quanto-tempo-devo-escolher-a-fotografia-do-meu-casamento/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img7 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Com quanto tempo devo escolher a fotografia do meu casamento?</h6>
												<p>A fotografia é uma das coisas mais importantes de um casamento se você realmente se importa... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span></p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/tendencias-2023-de-vestidos-de-noivas/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img6 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Tendências 2023 de vestidos de noivas</h6>
												<p>Com a chegada do novo ano, novas tendências em casamentos começam a surgir e uma das maiores... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>
									{/* item */}
									<div className="col-lg-6">
										<a href="/blog/artigo/quais-documentos-necessarios-para-um-casamento-catolico/03-06-2023" className="item">
											<div className="image" style={{ background: "#ccc url(" + img5 + ") no-repeat center/cover" }}></div>
											<div className="content">
												<div className="sub">Ideias de casamento</div>
												<h6>Quais documentos necessários para um casamento católico?</h6>
												<p>- Foto 3x4 atualizada de cada um do casal; - Cópias autenticadas do RG do casal; - Comprovantes... <span style={{ color: 'var(--color-secondary)' }}>continue lendo!</span> </p>
											</div>
										</a>
									</div>

								</div>
							</div>
							{/* end list */}
							<div className="col-lg-3">
								<Sidebar />
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
