import './App.css';
import Login from './components/Login';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {useState} from "react";
import {useEffect} from "react";
import {API} from "./api/api";
import Content from "./components/Content";


function App() {
    const [state, setState] = useState({});
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const auth = async (formData) => {
        const {error_code, data} = await API.auth(formData);
        if (error_code === 0) {
            setState(data);
            navigate('/content')
        }
    }

    const getData = async (token) => {
        const {data} = await API.getData(token);
        setData(data);
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login auth={auth} />}/>
                <Route path="/content" element={<Content getData={getData} state={state} data={data}/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
