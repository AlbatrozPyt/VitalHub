import axios from "axios";

// Declarar porta da API 
const portaAPI = '4466'

// const ip = "172.16.39.73" // Pedro
//const ip = "172.16.39.89" // Matheus
const ip = "192.168.21.67"  // Lucca

// Definir URL padrão
const apiUrlLocal = `http://${ip}:${portaAPI}/api`

// Trazer a configuração para o axios
const api = axios.create({
    baseURL: apiUrlLocal
})

export default api;