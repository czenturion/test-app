// Component types
export type LoginType = {
    auth: (loginData: LoginFormType, navigate: (path: string) => void, setIsLoading: (val: boolean) => void) => void
}

export type LoginFormType = {
    login: string
    password: string
    serverResponse?: string
}

export type DataType = {

}

export type ArrayElemType = {
    companySigDate: string
    companySignatureName: string
    documentName: string
    documentStatus: string
    documentType: string
    employeeNumber: string
    employeeSigDate: string
    employeeSignatureName: string
    id?: string
}

export type ItemEditFormType = {
    elem: ArrayElemType
    setEditMode: (value: boolean) => void
    setData: (data: ArrayElemType[]) => void
    setIsLoading: (val: boolean) => void
    alertMessageTimer: () => void
}

export type ItemType = {
    elem: ArrayElemType
    setData: (data: ArrayElemType[]) => void
    setIsLoading: (val: boolean) => void
    alertMessageTimer: () => void
}

export type ContentType = {
    data: ArrayElemType[]
    setData: () => void
    alertMessageTimer: () => void
}

export type ModalType = {
    active: boolean
    setActive: (val: boolean) => void
    setData: (data: ArrayElemType[]) => void
    setIsLoading: (val: boolean) => void
    alertMessageTimer: () => void
}

export type ModalFormType = {
    companySignatureName: string
    documentName: string
    documentStatus: string
    documentType: string
    employeeNumber: string
    employeeSignatureName: string
}


// API types
type simpleResponseObject = {
    error_code: number
    error_message: string
}

export type authResponseDataType = simpleResponseObject & {
    data: { token: string }
}

export type authResponseType = simpleResponseObject & {
    data: authResponseDataType
}

export type getDataResponseType = simpleResponseObject & {
    data: ArrayElemType[]
}

export type getDataType = {
    setData: () => void
}

export type uploadDocumentResponseType = simpleResponseObject & {
    data: ArrayElemType
}

export type deleteDocumentResponseType = simpleResponseObject

export type editDocumentResponseType = simpleResponseObject & {
    data: ArrayElemType
}

export type authType = {
    formData: LoginFormType
    navigate: (path: string) => void
    setIsLoading: (val: boolean) => void
}
