import axios from "axios";

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

const accessToken = localStorage.getItem('access_token')

const headers = {
    'Authorization': `Bearer ${accessToken}`,
}


export const instance = axios.create({
    baseURL: baseUrl,
    headers: headers
    
})
