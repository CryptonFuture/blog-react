import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1"

let headers = {}

export const instance = axios.create({
    baseURL: baseUrl,
    
})
