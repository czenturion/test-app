import {Button, CircularProgress, OutlinedInput} from "@mui/material";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import '../App.css';
import {useState} from "react";

const Login = ({auth}) => {
    const {register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = loginData => {
        auth(loginData, navigate, setIsLoading);
    }

    return <form className="login-page" onSubmit={handleSubmit(onSubmit)}>
        {
            isLoading
                ? <CircularProgress sx={{marginTop: "15vh"}}/>
                : <><OutlinedInput {...register("login", {required: true})}
                                   className="login-input"
                                   placeholder="Login"/>
                    <OutlinedInput {...register("password", {required: true})}
                                   className="login-input"
                                   placeholder="Password"
                                   type="password"/>
                    <Button className="login-button" type="submit"
                            sx={{marginTop: '15px', maxWidth: '223px', width: '100%', height: '56px'}}>Log in</Button></>
        }
    </form>
}

export default Login;