import './App.css';
import Login from './components/Login';
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {useState} from "react";
import {auth} from "./api/api";
import Content from "./components/Content";
import {Alert} from "@mui/material";


function App() {
    const [data, setData] = useState([]);
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    const alertMessageTimer = () => {
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 2500);
    }

    return (
        <div className="App">
            <Alert className="mui__error"
                   severity="error"
                   sx={{visibility: `${isAlertVisible ? "visible" : "hidden"}`}}>Something went wrong. Refresh page please.</Alert>
            <Routes>
                <Route path="/" element={<Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login auth={auth} />}/>
                <Route path="/content" element={<Content data={data} setData={setData} alertMessageTimer={alertMessageTimer}/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
