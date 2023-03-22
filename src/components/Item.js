import {Card} from '@mui/material';

export const Item = ({elem}) => {
    return <Card key={elem.id}
                 sx={{padding: "10px", margin: "10px", width: "300px"}}>
        {
            <div>
                <p>{elem.companySigDate}</p>
                <p>{elem.companySignatureName}</p>
                <p>{elem.documentName}</p>
                <b>Статус: {elem.documentStatus}</b>
                <p>{elem.documentType}</p>
                <p>{elem.employeeNumber}</p>
                <p>{elem.employeeSigDate}</p>
                <p>{elem.employeeSignatureName}</p>
                <p style={{textOverflow: "ellipsis"}}>{elem.id}</p>
            </div>
        }
    </Card>
}