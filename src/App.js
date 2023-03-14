import './App.css';
import Login from './components/Login';
import {Route, Routes, Navigate} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {useState} from "react";
import {useEffect} from "react";


function App() {
    const [state, setState] = useState({});

    useEffect( () => {
        console.log(state)
    }, [state])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login setState={setState} state={state} />}/>

                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
