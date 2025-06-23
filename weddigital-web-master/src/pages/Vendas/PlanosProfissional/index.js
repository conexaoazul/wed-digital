import React from "react";

import Navbar from '../../../components/Navbar'
import CardPlanos from '../../../components/PlanosProfissional'

export default function PagePlanosProfissional() {

    return (
        <div className='card-planos__container'>
            {/* --- INIT PIXEL --- */}
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898" height="0" width="0"
                        style="display:none;visibility:hidden"></iframe>
            </noscript>
            {/* --- END PIXEL --- */}
            <div>
                <Navbar/>
                <CardPlanos/>
            </div>
        </div>
    )
}