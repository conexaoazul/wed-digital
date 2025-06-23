import React from "react";

export default function navCrumb(props){
    return(
        <section className="crumb">
            <div className="container">
                <ul>
                    <li>
                        <a href="/perfil">Casamento</a>
                    </li>
                    <li>/</li>
                    <li>
                        <a href="/blog">Ideias de casamento</a>
                    </li>
                    <li>/</li>
                    <li>
                        <a href="">Artigo</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}