import React, { useState, useEffect, useRef } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CiBadgeDollar, CiUser, CiVideoOn } from "react-icons/ci";

export default function Regressiva(props) {
	let dadosCasamento = props.dadosCasamento;


	const [dias, setDias] = useState("");
	const [horas, setHoras] = useState("");
	const [minutos, setMinutos] = useState("");
	const [segundos, setSegundos] = useState("");

	function countdown() {
		if (dadosCasamento.dadosCasamento.dataCasamento) {
			let dateParts = dadosCasamento.dadosCasamento.dataCasamento.split("/");
			let countDownDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getTime();
			let now = new Date().getTime();
			let distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			let days = Math.floor(distance / (1000 * 60 * 60 * 24));
			setDias(days);
			setHoras(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			setMinutos(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
			setSegundos(Math.floor((distance % (1000 * 60)) / 1000));

			// If the count down is finished, write some text
			if (days < 0) {
				// document.getElementById("ex").innerHTML = "<strong>Chegou, é hoje!!</strong>";
				return true;
			}

			return false;
		}
	}

	setTimeout(function () {
		let isHoje = countdown();
		if (!isHoje) {
			setInterval(countdown, 1000);
		}
	}, 0);

	return (
		<>
			<div className="regressiva">
				<strong>{dias}</strong>
				<small className="ms-1">D</small>
				<small className="mx-2">:</small>
				<strong>{horas}</strong>
				<small className="ms-1">H</small>
				<small className="mx-2">:</small>
				<strong>{minutos}</strong>
				<small className="ms-1">M</small>
				<small className="mx-2">:</small>
				<strong>{segundos}</strong>
				<small className="ms-1">S</small>
			</div>
		</>
	);
}
