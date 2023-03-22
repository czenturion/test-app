import axios from "axios";


const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

const API = {
    auth(loginData) {
        return instance.post('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res.data)
    },
    getData(token) {
        return instance.get('/ru/data/v3/testmethods/docs/userdocs/get', {headers: {"x-auth": token}})
            .then(res => res.data)
    },
    uploadData(token, formData) {
        return instance.post('/ru/data/v3/testmethods/docs/userdocs/create', formData, {headers: {"x-auth": token}})
            .then(res => res.data)
    }
}

export const auth = async (formData, navigate, setIsLoading) => {
    setIsLoading(true);
    const {error_code, data} = await API.auth(formData);
    if (error_code === 0) {
        localStorage.setItem("token", data.token);
        navigate('/content');
    }
    setIsLoading(false);
}

export const getData = async (token, setData, setIsLoading) => {
    setIsLoading(false);
    const {data} = await API.getData(token);
    setData(data);
    setIsLoading(true);
}

export const uploadNewDocument = async (formData, setIsLoading) => {
    setIsLoading(true);
    const time = new Date().toISOString();
    formData.companySigDate = time;
    formData.employeeSigDate = time;
    const {data} = await API.uploadData(localStorage.token, formData);
    setIsLoading(false);
}

