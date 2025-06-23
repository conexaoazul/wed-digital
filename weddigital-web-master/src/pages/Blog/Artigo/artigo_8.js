import React, { useEffect, useState } from "react";
import "../style.css";
import "./style.css";

import Sidebar from "../Sidebar";
import NavCrumb from '../NavCrumb'

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Helmet from "react-helmet";

import img1 from '../../../assets/blog/1.jpg';
import img2 from '../../../assets/blog/2.jpg';
import img3 from '../../../assets/blog/3.jpg';
import img4 from '../../../assets/blog/4.jpg';
import img5 from '../../../assets/blog/5.jpg';
import img6 from '../../../assets/blog/6.jpg';
import img7 from '../../../assets/blog/7.jpg';
import img8 from '../../../assets/blog/8.jpg';
import img9 from '../../../assets/blog/9.jpg';
import img10 from '../../../assets/blog/10.jpg';
import img11 from '../../../assets/blog/11.jpg';
import img12 from '../../../assets/blog/12.jpg';
import img13 from '../../../assets/blog/13.jpg';
import img14 from '../../../assets/blog/14.jpg';
import img15 from '../../../assets/blog/15.jpg';
import img16 from '../../../assets/blog/16.jpg';
import img17 from '../../../assets/blog/17.jpg';
import img18 from '../../../assets/blog/18.jpg';
import img19 from '../../../assets/blog/19.jpg';
import img20 from '../../../assets/blog/20.jpg';
import img21 from '../../../assets/blog/21.jpg';
import img22 from '../../../assets/blog/22.jpg';
import img23 from '../../../assets/blog/23.jpg';
import img24 from '../../../assets/blog/24.jpg';
import img28 from '../../../assets/blog/28.png'
import img29 from '../../../assets/blog/29.png'


export default function Artigo_8() {
	let urlUTM = window.location.href.split("?");
	let utmData = urlUTM[1] ? `?${urlUTM[1]}` : "";

	const [shareOptions, setShareOptions] = useState(0);

	return (
		<div>
			<Helmet>
				<title>WedDigital | Blog | Artigo | Baixe gratuitamente o plano
					perfeito para a festa do seu casamento
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
											<h2>Baixe gratuitamente o plano
												perfeito para a festa do seu casamento
											</h2>
											<div className="col-lg-12">
												<p>Um guia prático te ajudando a planejar o seu
													grande dia de forma leve e divertida
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
													var win = window.open("https://wa.me/?text=https://weddigital.com.br/blog/artigo/baixe-gratuitamente-o-plano-perfeito-para-a-festa-do-seu-casamento/02-09-2023", '_blank');
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
												<img src={img28} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />

												<a href={`/cadastro${utmData}`} className="btn btn-primary mt-lg-0 mt-3 mb-4">
													<strong>BAIXE SEU EBOOK</strong>
												</a>
											</div>
											<div className="col-lg-12">
												<p><strong>Para quem é?</strong> Noivos que estão no planejamento da sua festa de casamento e desejam aprender a organizar de forma prática o seu grande dia para que tudo saia como se imagina.</p>
											</div>
											<div className="col-lg-12">
												<p><strong>O que você vai encontrar?</strong> São 39 páginas de um conteúdo objetivo e rico sobre detalhes do casamento que você precisa conhecer. São anos de experiência compactados em um único lugar, tudo foi preparado com muito carinho e apreço.</p>
											</div>

											<div className="col-lg-12 mt-5">
												<img src={img29} className="img-fluid w-100" style={{ borderRadius: '1rem' }} />
												<p>Não perca tempo e <strong>baixe gratuitamente</strong> o seu e-book agora e comece a dar início a uma jornada tranquila de um dos dias mais felizes e importantes da sua vida
												</p>
											</div>
											<div className="col-lg-12 text-center">

												<a href={`/cadastro${utmData}`} className="btn btn-secondary mt-4">
													<span>SIM, EU QUERO</span>
												</a>
											</div>


										</div>
									</div>

								</div>
							</div>
							{/* sidebar */}
							<div className="col-lg-3">
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
