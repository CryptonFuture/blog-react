import axios from "axios";

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

let headers = {

}

export const instance = axios.create({
    baseURL: baseUrl,
    
})
