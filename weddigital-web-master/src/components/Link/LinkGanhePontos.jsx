import React from "react";

export default function LinkGanhePontos() {
    return (
        <div className="col-auto d-lg-block d-none">
            <a
                href={`/buscar-profissional?estado=${localStorage.getItem(
                    "estado",
                )}&categoria=&segmento=&pagina=1`}
                className="btn btn-primary px-lg-5 py-lg-3 px-4 py-2"
            >
                <span>Ganhe pontos</span>
            </a>
        </div>
    )
}