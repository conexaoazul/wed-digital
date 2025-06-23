import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";
import NavCrumb from '../NavCrumb'

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img30 from '../../../assets/blog/30.jpeg'
import img31 from '../../../assets/blog/31.jpg'
import img32 from '../../../assets/blog/32.jpg'
import img33 from '../../../assets/blog/33.jpg'
import img34 from '../../../assets/blog/34.jpeg'
import img35 from '../../../assets/blog/35.jpg'
import img36 from '../../../assets/blog/36.jpeg'
import img37 from '../../../assets/blog/37.jpg'


export default function Artigo_9() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Descubra detalhes que tornam um Casamento Clássico inesquecível
				</title>
			</Helmet>

			{/* --- INIT PIXEL --- */}
			<noscript>
				<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898" height="0" width="0" style="display:none;visibility:hidden"></iframe>
			</noscript>
			{/* --- END PIXEL --- */}

			<Navbar navfix={true} utmCadastro={utmData} />

			<NavCrumb />

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
											<a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} className="link mt-3 d-block" style={{ color: 'var(--color-secondary)' }}>
												<span>Encontrar fornecedores</span>
												<i className="fa-solid fa-arrow-right ms-2 ps-1"></i>
											</a>
										</div>
									</div>
									{/* header_ */}
									<div className="col-lg-12">
										<div className="header_">
											<h6>Dicas sobre planejamento</h6>
											<h2>Descubra detalhes que tornam um Casamento Clássico inesquecível
											</h2>
											<div className="col-lg-12">
												<p>Para muitos casais, escolher o seu estilo de casamento que reflita sua personalidade é uma parte essencial do planejamento
												</p>
											</div>
										</div>
									</div>
									{/* author share */}
									<div className="col-lg-12">
										<div className="author-share">
											<div className="info">
												{/* <div className="author">Nome do autor</div> */}
												<div className="date ms-0">Atualizado dia 02 de setembro de 2023</div>
												{/* <div className="likes">
													<ion-icon name="heart-outline"></ion-icon>
													<span>20</span>
												</div> */}
											</div>
											<div className="share">
												<button onClick={() => {
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/descubra-detalhes-que-tornam-um-casamento-classico-inesquecivel/02-09-2023", '_blank');
													win.focus();
												}}>
													<ion-icon name="share-outline"></ion-icon>
												</button>
												{/* <button>
													<ion-icon name="heart-outline"></ion-icon>
												</button> */}
											</div>
										</div>

									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12 text-center">
												<iframe id="video_ytb" src="https://www.youtube.com/embed/4p5yk4a97nI?si=iG9RiCCqCzCSbE9l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
											</div>

											<p className="mt-4">Um estilo que permanece atemporal e eternamente elegante é o "casamento clássico". Se você está procurando por uma celebração que evoca elegância e tradição, aqui estão os detalhes que tornam um casamento clássico inesquecível.</p>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>1. Paleta de Cores Sofisticada</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img36} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>A paleta de cores é a base de qualquer decoração de casamento clássico. Opte por cores sofisticadas e atemporais, como branco, marfim, tons de champagne e dourado. Essas cores adicionam um toque de elegância e criam um ambiente refinado e clássico.
													<br />
													<br />
													Aqui na Wed Digital você pode encontrar os <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
														<strong>melhores decoradores.</strong>
													</a></p>
											</div>

											{/** item */}

											<div className="col-lg-12 mt-5">
												<p><strong>2. Convites Clássicos</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img35} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>


											<div className="col-lg-12">
												<p>O convite de casamento é o primeiro contato que os convidados terão do seu casamento. Escolha convites que apresentem design elegante, tipografia refinada e se possível detalhes de folhas douradas. Isso estabelecerá o tom para a celebração sofisticada e clássica que está por vir. Encontre profissionais de convite tocando <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
													<strong>AQUI</strong>
												</a></p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>3. Vestido de Noiva Atemporal</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img37} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>O vestido de noiva é uma das peças centrais do casamento clássico. Opte por um vestido que evoca a elegância intemporal, como um vestido de corte reto, com renda ou detalhes bordados delicados. Um véu longo adiciona um toque de tradição. Escolher um profissional que entende tudo sobre casamento clássico, vai te ajudar nessa tarefa. Encontre-os <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
													<strong>AQUI</strong>
												</a>.</p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>4. Decoração Elegante</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img30} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>A decoração deve ser elegante e sofisticada. Arranjos de flores clássicos, como rosas, lírios e peônias, são belas opções para um casamento clássico. Utilize vasos de cristal, candelabros e velas para criar uma atmosfera romântica e tradicional, os melhores decoradores de casamento te ajudarão nisso, você pode entra-los <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
													<strong>aqui</strong>
												</a>.</p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>5. Cerimônia Tradicional</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img31} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>Uma cerimônia clássica muitas vezes envolve elementos tradicionais, como a troca de votos e a entrada da noiva pelo corredor. Música clássica, como uma marcha nupcial, adiciona um toque de grandiosidade à cerimônia. Os <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
													<strong>músicos para cerimônia</strong>
												</a>  irão tornar esse momento ainda mais especial.</p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>6. Recepção Elegante</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img32} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>O <a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} style={{ color: 'var(--color-secondary)' }}>
													<strong>espaço para recepção</strong>
												</a> deve ser uma extensão da cerimônia, mantendo a atmosfera clássica. Toalhas de mesa de linho, talheres de prata e taças de cristal são detalhes que fazem a diferença. Um bolo de casamento de várias camadas com detalhes de renda ou flores de açúcar é uma escolha clássica.</p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>7. Dança Tradicional</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img33} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>A dança dos noivos é um momento especial em qualquer casamento clássico. Escolha uma música romântica e que representem a história de vocês, considere incluir a valsa tradicional, evocando a elegância dos tempos passados.</p>
											</div>

											{/** item */}
											<div className="col-lg-12 mt-5">
												<p><strong>8. Lembrancinhas Elegantes</strong></p>
											</div>
											<div className="col-lg-12">
												<img src={img34} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>

											<div className="col-lg-12">
												<p>Agradeça aos seus convidados com lembrancinhas elegantes, como miniaturas de perfume, caixas de chocolate ou marcadores de lugar personalizados. A embalagem deve ser refinada e alinhada ao tema clássico.

													Um casamento clássico é uma escolha que nunca sai de moda. Com atenção aos detalhes certos, você pode criar uma celebração que será lembrada por sua elegância atemporal e pela beleza duradoura.
													Seja fiel à sua visão e deixe que a tradição e a sofisticação guiem cada escolha que você faz.
												</p>
											</div>
											<div className="col-lg-12 mt-5">
												<p>Um casamento clássico é uma escolha que nunca sai de moda. Com atenção aos detalhes certos, você pode criar uma celebração que será lembrada por sua elegância atemporal e pela beleza duradoura.
													Seja fiel à sua visão e deixe que a tradição e a sofisticação guiem cada escolha que você faz</p>
											</div>

											<div className="col-lg-12 mt-5">
												<p>
													Seja fiel à sua visão e deixe que a tradição e a sofisticação guiem cada escolha que você faz</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="p-4" style={{ border: "1px solid var(--color-secondary)", borderRadius: "1rem" }}>
											<div className="d-flex px-3 text-lg-left text-center justify-content-lg-between align-items-center flex-lg-row flex-column w-100">
												<h4 className="mb-0">Encontre os melhores decoradores da sua região</h4>
												<a href={`/buscar-profissional?estado=${localStorage.getItem("estado")}&categoria=&segmento=&pagina=1`} className="btn btn-primary mt-lg-0 mt-3">
													<strong>TOCANDO AQUI</strong>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* sidebar */}
							<div className="col-lg-3">
								{/* sidebar */}
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
