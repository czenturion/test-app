import {useState, FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from './components/Login.tsx';
import {NotFound} from "./components/NotFound.tsx";
import Content from "./components/Content.tsx";
import {auth} from "./api/api.ts";
import {Alert} from "@mui/material";
import './App.css';
import {ArrayElemType} from "./ts/types";


function App(): FC {
    const [data, setData] = useState<ArrayElemType[]>([]);
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
