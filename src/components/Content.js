import {useEffect, useState} from "react";
import {CircularProgress, IconButton} from '@mui/material';
import '../App.css';
import {useNavigate} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Item} from "./Item";
import {Modal} from "./Modal";

const Content = ({getData, data, setData}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        if (!localStorage.token) navigate('/login');
        getData(localStorage.token, setData, setIsLoading);
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
                    : data
                        ? data.map(elem => <Item elem={elem}
                                                 key={elem.id}/>)
                        : <></>
            }
        </div>
        <div style={{visibility: `${isLoading ? "visible" : "hidden"}`}}>
            <IconButton onClick={onClickLogOut}>
                <LogoutIcon fontSize="large" className="button-add"/>
            </IconButton>
            <IconButton onClick={() => setModalActive(true)}>
                <AddCircleOutlineIcon fontSize="large" className="button-add"/>
            </IconButton>
        </div>
        <Modal active={modalActive} setActive={setModalActive} getData={getData} setData={setData} setIsLoading={setIsLoading}/>
    </div>
}

export default Content;