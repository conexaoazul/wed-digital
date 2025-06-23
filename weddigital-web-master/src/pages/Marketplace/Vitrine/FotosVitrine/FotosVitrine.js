import React, { useState, useEffect } from 'react';
import './FotosVitrine.css'

import NoImage from '../../../../fileContents/imagensVitrineProfissional/no-image.png'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function FotosVitrine(props) {
	const [images, setImages] = useState(null);
	let listaImagens = props.listaImagens;

	useEffect(() => {
		let _images = [];

		if (listaImagens.length > 0) {
			for (let i = 0; i < listaImagens.length; i++) {
				_images.push(
					<div>
						<img src={listaImagens[i].urlImagem} />
					</div>
				)
			}

			setImages(_images)
		} else {
			_images.push(
				<div className='imagem'>
					<img src={NoImage} />
				</div>
			)

			setImages(_images)
		}
	}, []);

	return (
		<>
			<div className='imagem'>
				<Carousel >
					{images}
				</Carousel>
			</div>
		</>
	);
}
