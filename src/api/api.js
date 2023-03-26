import axios from "axios";


const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

const config = {
    headers: {"x-auth": localStorage.token}
}

const API = {
    auth(loginData) {
        return instance.post('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res.data)
    },
    getData() {
        return instance.get('/ru/data/v3/testmethods/docs/userdocs/get', config)
            .then(res => res.data)
    },
    uploadDocument(formData) {
        return instance.post('/ru/data/v3/testmethods/docs/userdocs/create', formData, config)
            .then(res => res.data)
    },
    deleteDocument(id) {
        return instance.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, config)
            .then(res => res.data)
    },
    editDocument(id, doc) {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, doc, config)
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

export const getData = async (setData, setIsLoading) => {
    setIsLoading(false);
    const {error_code, data} = await API.getData();

    if (error_code === 0) {
        setData(data);
    }
    setIsLoading(true);
}

export const uploadNewDocument = async (formData, setIsLoading, setData, setActive) => {
    setIsLoading(true);
    formData.companySigDate = formData.employeeSigDate = new Date().toISOString();
    const {error_code} = await API.uploadDocument(formData);

    if (error_code === 0) {
        await getData(setData, setIsLoading);
    }
    setActive(false);
}

export const deleteDocumentById = async (id, getData, setData, setIsLoading) => {
    const {error_code} = await API.deleteDocument(id);

    if (error_code === 0) {
        getData(setData, setIsLoading);
    }
}

export const editDocumentById = async (id, doc, getData, setData, setIsLoading) => {
    const {error_code} = await API.editDocument(id, doc);

    if (error_code === 0) {
        getData(setData, setIsLoading);
    }
}