import {Card, IconButton} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import {deleteDocumentById} from "../api/api.ts";
import {useState, FC} from "react";
import {ItemEditForm} from "./ItemEditForm.tsx";
import {ItemType} from "../ts/types";


export const Item: FC<ItemType> = ({elem, setData, setIsLoading, alertMessageTimer}) => {
    const [editMode, setEditMode] = useState(false);

    return <Card key={elem.id}
                 sx={{padding: "10px", margin: "10px", width: "300px"}}
                 className="card">
        {
            !editMode
                ? <div>
                    <div className="btnStyle">
                        <p>{elem.companySigDate}</p>
                        <IconButton onClick={() => deleteDocumentById(elem.id, setData, setIsLoading, alertMessageTimer)}
                                    title="Delete this Document">
                            <DeleteForeverRoundedIcon/>
                        </IconButton>
                    </div>
                    <div className="btnStyle">
                        <b>{elem.companySignatureName}</b>
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
                : <ItemEditForm elem={elem}
                                setEditMode={setEditMode}
                                setData={setData}
                                setIsLoading={setIsLoading}
                                alertMessageTimer={alertMessageTimer}/>
        }
    </Card>
}