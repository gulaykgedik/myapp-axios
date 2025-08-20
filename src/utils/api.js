import axios from "axios";

// bir axios örneği oluştur
const api = axios.create({
    // hiçbir şey koymasak bile bütün isteklerin atılacağı ortak link
    baseURL: "http://localhost:4000",

    // eğer post isteği atacaksak json olduğunu anlaması için headerı json olarak belirliyoruz.
    headers: {
        'Content-Type': 'application/json'
    },
    // timeout süresi 10 saniye
    timeout: 10000

})

export default api;