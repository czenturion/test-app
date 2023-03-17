import axios from "axios";


const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

export const API = {
    auth(loginData) {
        return instance.post('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res.data)
    },
    getData(token) {
        return instance.get('/ru/data/v3/testmethods/docs/userdocs/get', {headers: {"x-auth": token}})
            .then(res => res.data)
    }
}

export const auth = async (formData, navigate) => {
    const {error_code, data} = await API.auth(formData);
    if (error_code === 0) {
        localStorage.setItem("token", data.token);
        navigate('/content');
    }
}

export const getData = async (token, setData) => {
    const {data} = await API.getData(token);
    setData(data);
}