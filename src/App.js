import { BrowserRouter } from 'react-router-dom'
import './App.css';

import TagManager from 'react-gtm-module'

import Router from './pages/Router'
import UserProvider from './api/userContext-api/userProvider';
import {useEffect} from "react";

function App() {

    let key = 'token';
    let aValue = localStorage.getItem(key);
    if(aValue == null){
        localStorage.setItem(key, '""');
    }

    useEffect(() => {
        const tagManagerArgs = {
            gtmid: 'GTM-TNVR898'
        }

        TagManager.initialize(tagManagerArgs)
    })

    return (
        <BrowserRouter>
            <UserProvider>
                <div className="App">
                    {/* --- INIT PIXEL --- */}
                    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNVR898" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                    {/* --- END PIXEL --- */}
                    <Router />
                </div>
            </UserProvider>
    </BrowserRouter>
    )
}

export default App;
