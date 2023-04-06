import {CircularProgress, IconButton, Input, Typography} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import {useForm} from "react-hook-form";
import {editDocumentById} from "../api/api.tsx";
import {useState, FC} from "react";

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

type ItemEditFormType = {
    elem: ArrayElemType
    setEditMode: (value: boolean) => void
    setData: () => void
    setIsLoading: boolean
    alertMessageTimer: () => void
}

export const ItemEditForm: FC<ItemEditFormType> = ({elem, setEditMode, setData, setIsLoading, alertMessageTimer}) => {
    const {register, handleSubmit} = useForm<ArrayElemType>();
    const [btnClicked, setBtnClicked] = useState(false);

    const onSubmit = editedDoc => {
        setBtnClicked(true);
        editedDoc.companySigDate = editedDoc.employeeSigDate = elem.companySigDate;
        editDocumentById(elem.id, editedDoc, setData, setIsLoading, alertMessageTimer);
    }

    return <form className="itemForm">
        <div className="btnStyle">
            <Typography variant="h7">{elem.companySigDate}</Typography>
            {
                !btnClicked
                    ? <IconButton title="Save edited document"
                                  onClick={handleSubmit(onSubmit)}>
                        <CheckRoundedIcon/>
                    </IconButton>
                    : <CircularProgress size={20}
                                        sx={{marginRight: "10px"}}
                                        color="inherit"/>
            }
        </div>
        <div className="btnStyle">
            <Input {...register("companySignatureName", {required: true})}
                   defaultValue={elem.companySignatureName}
                   placeholder="companySignatureName"
                   className="input"/>
            <IconButton onClick={() => setEditMode(false)}
                        title="Exit from edit mode">
                <DoDisturbRoundedIcon/>
            </IconButton>
        </div>
        <Input {...register("documentName", {required: true})}
               defaultValue={elem.documentName}
               placeholder="documentName"/>
        <Input {...register("documentStatus", {required: true})}
               defaultValue={elem.documentStatus}
               placeholder="documentStatus"
               component="b"/>
        <Input {...register("documentType", {required: true})}
               defaultValue={elem.documentType}
               placeholder="documentType"/>
        <Input {...register("employeeNumber", {required: true})}
               defaultValue={elem.employeeNumber}
               placeholder="employeeNumber"/>
        <Typography variant="h7">{elem.employeeSigDate}</Typography>
        <Input {...register("employeeSignatureName", {required: true})}
               defaultValue={elem.employeeSignatureName}
               placeholder="employeeSignatureName"
               sx={{marginBottom: "14px"}}/>
    </form>
}