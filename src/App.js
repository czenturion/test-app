import './App.css';
import Login from './components/Login';
import {Navigate, Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {useState} from "react";
import {auth, getData} from "./api/api";
import Content from "./components/Content";


function App() {
    const [data, setData] = useState([]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login auth={auth} />}/>
                <Route path="/content" element={<Content getData={getData} data={data} setData={setData}/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
