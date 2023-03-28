import {Card, IconButton, Input} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DoDisturbRoundedIcon from '@mui/icons-material/DoDisturbRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {deleteDocumentById, editDocumentById} from "../api/api";
import {useState} from "react";
import {useForm} from "react-hook-form";

export const Item = ({elem, getData, setData, setIsLoading}) => {
    const [editMode, setEditMode] = useState(false);
    const {register, handleSubmit} = useForm();

    const onSubmit = editedDoc => {
        console.log(elem.id, editedDoc)
        editDocumentById(elem.id, editedDoc, getData, setData, setIsLoading);
    }

    const onClick = event => {
        console.log(event.target.elements)
    }

    return <Card key={elem.id}
                 sx={{padding: "10px", margin: "10px", width: "300px"}}
                 className="card">
        {
            !editMode
                ? <div>
                    <div className="btnStyle">
                        <p>{elem.companySigDate}</p>
                        <IconButton onClick={() => deleteDocumentById(elem.id, getData, setData, setIsLoading)}
                                    title="Delete this Document">
                            <DeleteForeverRoundedIcon/>
                        </IconButton>
                    </div>
                    <div className="btnStyle">
                        <p>{elem.companySignatureName}</p>
                        <IconButton onClick={() => setEditMode(true)} title="Edit this Document">
                            <BorderColorRoundedIcon/>
                        </IconButton>
                    </div>
                    <p>{elem.documentName}</p>
                    <p><b>Статус: {elem.documentStatus}</b></p>
                    <p>{elem.documentType}</p>
                    <p>{elem.employeeNumber}</p>
                    <p>{elem.employeeSigDate}</p>
                    <p>{elem.employeeSignatureName}</p>
                    <p>{elem.id}</p>
                </div>
                : <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="btnStyle">
                        <Input {...register("companySigDate", {required: true})}
                               defaultValue={elem.companySigDate}
                               disabled={true}
                               className="input"/>
                        <IconButton onClick={() => setEditMode(false)}
                                    title="Exit from edit mode">
                            <DoDisturbRoundedIcon/>
                        </IconButton>
                    </div>
                    <div className="btnStyle">
                        <Input {...register("companySignatureName", {required: true})}
                               defaultValue={elem.companySignatureName}
                               placeholder="companySignatureName"
                               className="input"/>
                        <IconButton title="Save edited document"
                                    component="button"
                                    type="submit">
                            <CheckRoundedIcon/>
                        </IconButton>
                    </div>
                    <Input {...register("documentName", {required: true})}
                           defaultValue={elem.documentName}
                           placeholder="documentName"/>
                    <Input {...register("documentStatus", {required: true})}
                           defaultValue={elem.documentStatus}
                           placeholder="documentStatus"/>
                    <Input {...register("documentType", {required: true})}
                           defaultValue={elem.documentType}
                           placeholder="documentType"/>
                    <Input {...register("employeeNumber", {required: true})}
                           defaultValue={elem.employeeNumber}
                           placeholder="employeeNumber"/>
                    <Input {...register("employeeSigDate", {required: true})}
                           defaultValue={elem.employeeSigDate}
                           disabled={true}/>
                    <Input {...register("employeeSignatureName", {required: true})}
                           defaultValue={elem.employeeSignatureName}
                           placeholder="employeeSignatureName"
                           sx={{marginBottom: "23px"}}/>
                </form>
        }
    </Card>
}