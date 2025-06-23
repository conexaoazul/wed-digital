import React from "react";

export default function CardAnuncioPlaceholder(){
    return(
    <div className="card placeholder_container" aria-hidden="true">
        <div src='...' className="card-img-top placeholder-img-div
placeholder-img-div" alt="..." />
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <a href="#" tabindex="-1" className="btn btn-primary disabled placeholder col-6"></a>
            </div>
        </div>
    )
}