import React from "react";

import Config from '../../../../config.json'

export default function FormComunidade(){

    return(
        <div className='formCardPlanosContainer'>
            <div className='acesso-comunidade'>
                <a href={Config.comunidade.linkNoivos} target='_blank'>Acessar comunidade</a>
            </div>
        </div>
    )
}