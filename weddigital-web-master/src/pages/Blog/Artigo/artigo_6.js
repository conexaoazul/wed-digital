import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img1 from '../../../assets/blog/1.jpg';
import img2 from '../../../assets/blog/2.jpg';
import img3 from '../../../assets/blog/3.jpg';
import img4 from '../../../assets/blog/4.jpg';
import img5 from '../../../assets/blog/5.jpg';
import img6 from '../../../assets/blog/6.jpg';
import NavCrumb from "../NavCrumb";

export default function Artigo_6() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Tendências 2023 de vestidos de noivas</title>
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
											<h2>Tendências 2023 de vestidos de noivas</h2>
											<p>Com a chegada do novo ano, novas tendências em casamentos começam a surgir e uma das maiores preocupações da noiva é escolher o vestido perfeito para o grande dia. Por isso, selecionamos as tendências mais quentes de vestidos de noivas para 2023 para ajudá-la nessa escolha tão importante.</p>
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
												<button onClick={() => {
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/tendencias-2023-de-vestidos-de-noivas/03-06-2023", '_blank');
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
											<div className="col-lg-12">
												<h4>Decote quadrado</h4>
											</div>
											<div className="col-lg-12">
												<img src={img6} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>O decote quadrado é uma tendência forte para 2023 e pode ser visto em diversos modelos de vestidos de noiva. É uma ótima opção para noivas que desejam um vestido elegante, mas ao mesmo tempo moderno.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Mangas bufantes</h4>
											</div>
											<div className="col-lg-12">
												<img src={img5} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>As mangas bufantes são uma tendência que está de volta em 2023, trazendo um toque romântico e vintage ao vestido de noiva. Podem ser encontradas em diversos modelos, desde os mais tradicionais até os mais modernos.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Detalhes em tule</h4>
											</div>
											<div className="col-lg-12">
												<img src={img4} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>O tule é um tecido clássico que sempre esteve presente nos vestidos de noiva, mas em 2023 ele ganha destaque como detalhe nos vestidos. Os detalhes em tule podem ser vistos nas mangas, decotes e saias, criando um efeito de transparência e leveza.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Vestidos com camadas</h4>
											</div>
											<div className="col-lg-12">
												<img src={img3} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Os vestidos de noiva com camadas estão em alta em 2023, trazendo um visual mais romântico e fluido ao vestido. Podem ser encontrados em diversos tecidos, desde os mais leves até os mais estruturados.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Vestidos minimalistas</h4>
											</div>
											<div className="col-lg-12">
												<img src={img2} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Para as noivas que preferem um visual mais clean e minimalista, essa tendência é para você. Os vestidos minimalistas estão em alta em 2023, trazendo um visual elegante e atemporal ao vestido de noiva. São ótimas opções para noivas que desejam um vestido que possa ser usado em outras ocasiões.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<h4>Cor nos vestidos de noiva</h4>
											</div>
											<div className="col-lg-12">
												<img src={img1} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
											</div>
											<div className="col-lg-12">
												<p>Uma das tendências mais ousadas de 2023 é a inclusão de cor nos vestidos de noiva. Podem ser encontrados em tons pastel como rosa, azul e verde, ou até mesmo em cores mais fortes como vermelho e preto. É uma opção para noivas que desejam um visual mais ousado e moderno.</p>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row g-3">
											<div className="col-lg-12">
												<p>Essas são algumas das tendências mais quentes de vestidos de noiva para 2023. Lembre-se de escolher um vestido que reflita a sua personalidade e estilo, e que te faça sentir linda e confiante no seu grande dia.</p>
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
