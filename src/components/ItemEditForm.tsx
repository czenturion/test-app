import {CircularProgress, IconButton, TextField, Typography} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {useForm} from "react-hook-form";
import {editDocumentById} from "../api/api.ts";
import {useState, FC} from "react";
import {ArrayElemType, ItemEditFormType} from "../ts/types";


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
            <Typography variant="p" sx={{ fontWeight: 'bold' }}>{elem.companySigDate}</Typography>
            {
                !btnClicked
                    ? <IconButton title="Save edited document"
                                  onClick={handleSubmit(onSubmit)}>
                        <ThumbUpAltIcon/>
                    </IconButton>
                    : <CircularProgress size={20}
                                        sx={{marginRight: "10px"}}
                                        color="inherit"/>
            }
        </div>
        <div className="btnStyle">
            <TextField {...register("companySignatureName", {required: true})}
                   defaultValue={elem.companySignatureName}
                   label="companySignatureName"
                   className="input"/>
            <IconButton onClick={() => setEditMode(false)}
                        title="Exit from edit mode">
                <CancelIcon/>
            </IconButton>
        </div>
        <TextField {...register("documentName", {required: true})}
               defaultValue={elem.documentName}
               label="documentName"/>
        <TextField {...register("documentStatus", {required: true})}
               defaultValue={elem.documentStatus}
               label="documentStatus"
               component="b"/>
        <TextField {...register("documentType", {required: true})}
               defaultValue={elem.documentType}
               label="documentType"/>
        <TextField {...register("employeeNumber", {required: true})}
               defaultValue={elem.employeeNumber}
               label="employeeNumber"/>
        <TextField {...register("employeeSignatureName", {required: true})}
               defaultValue={elem.employeeSignatureName}
               label="employeeSignatureName"/>
    </form>
}