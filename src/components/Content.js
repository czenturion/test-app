import {useEffect, useState} from "react";
import {CircularProgress, IconButton, Typography} from '@mui/material';
import '../App.css';
import {useNavigate} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Item} from "./Item";
import {Modal} from "./Modal";
import {getData} from "../api/api";

const Content = ({data, setData}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (!localStorage.token) navigate('/login');
        getData(setData, setIsLoading);
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
                                                 setData={setData}/>)
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
               setIsLoading={setIsLoading}/>
    </div>
}

export default Content;