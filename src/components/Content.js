import {useEffect, useState} from "react";
import {Card, CircularProgress, IconButton} from '@mui/material';
import '../App.css';
import {useNavigate} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Content = ({getData, data, setData}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    if (!localStorage.token) navigate('/login');

    useEffect(() => {
        getData(localStorage.token, setData, setIsLoading);
    }, [])

    const onClick = () => {
        console.log('+')
    }

    return <div className="content-page">
        {
            !isLoading
                ? <CircularProgress sx={{marginTop: "20vh"}}/>
                : data
                    ? data.map(elem => <Card key={elem.id}
                                             sx={{padding: "10px", margin: "20px", maxWidth: "300px", width: "100%"}}>{<div>
                        <p>{elem.companySigDate}</p>
                        <p>{elem.companySignatureName}</p>
                        <p>{elem.documentName}</p>
                        <b>Статус: {elem.documentStatus}</b>
                        <p>{elem.documentType}</p>
                        <p>{elem.employeeNumber}</p>
                        <p>{elem.employeeSigDate}</p>
                        <p>{elem.employeeSignatureName}</p>
                        <p>{elem.id}</p>
                    </div>}</Card>)
                    : <></>
        }
        <Card style={{padding: "10px", margin: "20px", maxWidth: "300px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "295px"}}>
            <IconButton onClick={onClick}>
                <AddCircleOutlineIcon fontSize="large" className="button-add"/>
            </IconButton>
        </Card>
    </div>
}

export default Content;