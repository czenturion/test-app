import axios from "axios";
import {
    ArrayElemType,
    authResponseType,
    deleteDocumentResponseType,
    editDocumentResponseType,
    getDataResponseType,
    LoginFormType,
    uploadDocumentResponseType
} from "../ts/types";
import {UseFormSetError} from "react-hook-form";


const instance = axios.create({
    baseURL: "https://test.v5.pryaniky.com"
})

const API = {
    auth(loginData: LoginFormType) {
        return instance.post<authResponseType>('/ru/data/v3/testmethods/docs/login', loginData)
            .then(res => res.data)
    },
    getData() {
        return instance.get<getDataResponseType>('/ru/data/v3/testmethods/docs/userdocs/get',
            // todo: Find out how to optimise configs, cause declaring it in line 5 causes server deny
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    uploadDocument(formData: ArrayElemType) {
        return instance.post<uploadDocumentResponseType>('/ru/data/v3/testmethods/docs/userdocs/create', formData,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    deleteDocument(id: string) {
        return instance.delete<deleteDocumentResponseType>(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    },
    editDocument(id: string, doc: ArrayElemType) {
        return instance.post<editDocumentResponseType>(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, doc,
            {headers: {"x-auth": localStorage.getItem("token")}})
            .then(res => res.data)
    }
}



export const auth = async (formData: LoginFormType,
                           navigate: (path: string) => void,
                           setIsLoading: (val: boolean) => void,
                           setError: UseFormSetError<LoginFormType>) => {
    setIsLoading(true);
    const {error_code, data} = await API.auth(formData);

    if (error_code === 0) {
        await localStorage.setItem("token", data.token + formData.login);
        navigate('/content');
    } else if (error_code === 2004) {
        setError("serverResponse", {type: error_code, message: "Login or password is incorrect"});
    }

    setIsLoading(false);
}

export const getData = async (setData: (data: ArrayElemType[]) => void,
                              setIsLoading: (val: boolean) => void,
                              alertMessageTimer: () => void) => {
    setIsLoading(false);
    const {error_code, data} = await API.getData();

    if (error_code === 0) {
        setData(data.sort((a, b) => b.companySigDate.localeCompare(a.companySigDate)));
    } else if (error_code === 2004) {
        alertMessageTimer();
    }
    setIsLoading(true);
}

export const uploadNewDocument = async (formData: ArrayElemType,
                                        setIsLoading: (val: boolean) => void,
                                        setData: (data: ArrayElemType[]) => void,
                                        setActive: (val: boolean) => void,
                                        alertMessageTimer: () => void) => {
    setIsLoading(true);
    formData.companySigDate = formData.employeeSigDate = new Date().toISOString();
    setActive(false);

    const {error_code} = await API.uploadDocument(formData);
    if (error_code === 0) {
        await getData(setData, setIsLoading, alertMessageTimer);
    } else {
        alertMessageTimer();
    }
}

export const deleteDocumentById = async (id: string,
                                         setData: (data: ArrayElemType[]) => void,
                                         setIsLoading: (val: boolean) => void,
                                         alertMessageTimer: () => void) => {
    const {error_code} = await API.deleteDocument(id);

    if (error_code === 0) {
        await getData(setData, setIsLoading, alertMessageTimer);
    } else {
        alertMessageTimer();
    }
}

export const editDocumentById = async (id: string,
                                       doc: ArrayElemType,
                                       setData: (data: ArrayElemType[]) => void,
                                       setIsLoading: (val: boolean) => void,
                                       alertMessageTimer: () => void) => {
    const {error_code} = await API.editDocument(id, doc);

    if (error_code === 0) {
        await getData(setData, setIsLoading, alertMessageTimer);
    } else {
        alertMessageTimer();
    }
}

