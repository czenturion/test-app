import {Card} from '@mui/material';
import {IconButton} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {deleteDocumentById} from "../api/api";

export const Item = ({elem, getData, setData, setIsLoading}) => {
    return <Card key={elem.id}
                 sx={{padding: "10px", margin: "10px", width: "300px"}}>
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "24px"
            }}>
                <p>{elem.companySigDate}</p>
                <IconButton onClick={() => deleteDocumentById(elem.id, getData, setData, setIsLoading)}>
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </div>
            <p>{elem.companySignatureName}</p>
            <p>{elem.documentName}</p>
            <b>Статус: {elem.documentStatus}</b>
            <p>{elem.documentType}</p>
            <p>{elem.employeeNumber}</p>
            <p>{elem.employeeSigDate}</p>
            <p>{elem.employeeSignatureName}</p>
            <p>{elem.id}</p>
        </div>
    </Card>
}