import {useEffect} from "react";
import { Card } from '@mui/material';
import '../App.css';
import {useNavigate} from "react-router-dom";

const Content = ({getData, data, setData}) => {
    const navigate = useNavigate();

    if (!localStorage.token) {
        navigate('/login');
    }

    useEffect(() => {
        getData(localStorage.token, setData);
    }, [])

    return <div className="content-page">
        {
            data
                ? data.map(elem => <Card key={elem.id} sx={{width: "300px", height: "150px", padding: "20px", margin: "20px"}}>{<div><p>{elem.documentName}</p><p>{elem.companySigDate}</p><p>{elem.id}</p></div>}</Card>)
                : <></>
        }
    </div>
}

export default Content;