import {IconButton, Input, Typography} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import {useForm} from "react-hook-form";
import {editDocumentById} from "../api/api";

export const ItemEditForm = ({elem, setEditMode, setData, setIsLoading}) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = editedDoc => {
        editedDoc.companySigDate = editedDoc.employeeSigDate = elem.companySigDate;
        editDocumentById(elem.id, editedDoc, setData, setIsLoading);
    }

    return <form className="itemForm">
        <div className="btnStyle">
            <Typography variant="h7">{elem.companySigDate}</Typography>
            <IconButton title="Save edited document"
                        onClick={handleSubmit(onSubmit)}>
                <CheckRoundedIcon/>
            </IconButton>
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