import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "./Item.tsx";
import {Modal} from "./Modal.tsx";
import {getData} from "../api/api.tsx";
import {CircularProgress, IconButton, Typography} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import '../App.css';

const Content = ({data, setData, alertMessageTimer}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (!localStorage.token) navigate('/login');
        getData(setData, setIsLoading, alertMessageTimer);
    }, [])

    const onClickLogOut = () => {
        setIsLoading(true);
        localStorage.clear();
        navigate('/login');
    }

    return <div className="content-page">
        <div className="content-cards">
            {
                !isLoading
                    ? <CircularProgress sx={{marginTop: "20vh"}}/>
                    : data.length !== 0
                        ? data.map(elem => <Item elem={elem}
                                                 key={elem.id}
                                                 setIsLoading={setIsLoading}
                                                 setData={setData}
                                                 alertMessageTimer={alertMessageTimer}/>)
                        : <Typography variant="h2" sx={{margin: "40px 80px"}}>No documents</Typography>
            }
        </div>
        <div style={{visibility: `${isLoading ? "visible" : "hidden"}`, display: "flex", flexDirection: "column", padding: "15px"}}>
            <IconButton
                onClick={onClickLogOut}
                title="Log Out">
                <LogoutIcon fontSize="large" className="button-add"/>
            </IconButton>
            <IconButton
                onClick={() => setModalActive(true)}
                title="Add new Document"
                sx={{marginTop: "15px"}}>
                <AddCircleOutlineIcon fontSize="large" className="button-add"/>
            </IconButton>
        </div>
        <Modal active={modalActive}
               setActive={setModalActive}
               setData={setData}
               setIsLoading={setIsLoading}
               alertMessageTimer={alertMessageTimer}/>
    </div>
}

export default Content;