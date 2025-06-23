import axios from "axios";
import constantes from '../constantes.json'

let url = constantes["ambiente-producao"] ? constantes.api.linkApiGeralProducao : constantes.api.linkApiGeralLocalhost;
const api = axios.create({
    baseURL: url
})

export default api