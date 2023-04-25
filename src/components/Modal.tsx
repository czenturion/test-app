import {FC} from "react";
import {useForm} from "react-hook-form";
import {IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/CloseRounded';
import FileDownloadDoneRoundedIcon from '@mui/icons-material/FileDownloadDoneRounded';
import {uploadNewDocument} from "../api/api.ts";
import {ModalFormType, ModalType} from "../ts/types";


export const Modal: FC<ModalType> = ({active, setActive, setData, setIsLoading, alertMessageTimer}) => {
    const {register, handleSubmit} = useForm<ModalFormType>();

    const onSubmit = (formData) => {
        uploadNewDocument(formData, setIsLoading, setData, setActive, alertMessageTimer);
    }

    return (
        <div className={active ? "modal active" : "modal"}>
            <form onSubmit={handleSubmit(onSubmit)} className="modal__content">
                <div className="form__buttons">
                    <IconButton className="form-close-btn" onClick={() => setActive(false)}>
                        <CloseIcon/>
                    </IconButton>
                    <IconButton className="form-accept-btn" type="submit">
                        <FileDownloadDoneRoundedIcon/>
                    </IconButton>
                </div>
                <div>
                    <TextField {...register("companySignatureName", {required: true})} id="standard-basic"
                               label="companySignatureName"
                               variant="standard"/>
                    <TextField {...register("documentName", {required: true})} id="standard-basic"
                               label="documentName"
                               variant="standard"/>
                    <TextField {...register("documentStatus", {required: true})} id="standard-basic"
                               label="documentStatus"
                               variant="standard"/>
                </div>
                <div>
                    <TextField {...register("documentType", {required: true})} id="standard-basic"
                               label="documentType"
                               variant="standard"/>
                    <TextField {...register("employeeNumber", {required: true})} id="standard-basic"
                               label="employeeNumber"
                               variant="standard"/>
                    <TextField {...register("employeeSignatureName", {required: true})} id="standard-basic"
                               label="employeeSignatureName"
                               variant="standard"/>
                </div>
            </form>

        </div>
    )
}