import axios from "axios"

const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

export const API = {
    auth(loginData) {
        return instance.post('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res)
    }
}