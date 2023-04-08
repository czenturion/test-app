import axios from "axios";


const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

const API = {
    auth(loginData) {
        return instance.post('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res.data)
    },
    getData() {
        return instance.get('/ru/data/v3/testmethods/docs/userdocs/get',
            // todo: Find out how to optimise configs, cause declaring in line 5 causes server deny
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    uploadDocument(formData) {
        return instance.post('/ru/data/v3/testmethods/docs/userdocs/create', formData,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    deleteDocument(id) {
        return instance.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    editDocument(id, doc) {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, doc,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    }
}

export const auth = async (formData, navigate, setIsLoading) => {
    setIsLoading(true);
    const {error_code, data} = await API.auth(formData);

    if (error_code === 0) {
        await localStorage.setItem("token", data.token);
        navigate('/content');
    }
    setIsLoading(false);
}

export const getData = async (setData, setIsLoading, alertMessageTimer) => {
    setIsLoading(false);
    const {error_code, data} = await API.getData();

    if (error_code === 0) {
        setData(data);
    } else if (error_code === 2004) {
        alertMessageTimer();
    }
    setIsLoading(true);
}

export const uploadNewDocument = async (formData, setIsLoading, setData, setActive, alertMessageTimer) => {
    setIsLoading(true);
    formData.companySigDate = formData.employeeSigDate = new Date().toISOString();
    setActive(false);

    const {error_code} = await API.uploadDocument(formData);
    if (error_code === 0) {
        await getData(setData, setIsLoading);
    } else {
        alertMessageTimer();
    }
}

export const deleteDocumentById = async (id, setData, setIsLoading, alertMessageTimer) => {
    const {error_code} = await API.deleteDocument(id);

    if (error_code === 0) {
        await getData(setData, setIsLoading);
    } else {
        alertMessageTimer();
    }
}

export const editDocumentById = async (id, doc, setData, setIsLoading, alertMessageTimer) => {
    const {error_code} = await API.editDocument(id, doc);

    if (error_code === 0) {
        await getData(setData, setIsLoading);
    } else {
        alertMessageTimer();
    }
}