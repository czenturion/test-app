import {useState, FC} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import '../App.css';
import {Button, CircularProgress, OutlinedInput} from "@mui/material";

type LoginType = {
    auth: () => void
}

type LoginFormType = {
    login: string
    password: string
}

const Login: FC<LoginType> = ({auth}) => {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<LoginFormType>();
    const [isLoading, setIsLoading] = useState(false);

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
                    <Button className="login-button"
                            type="submit"
                            sx={{marginTop: '15px', maxWidth: '223px', width: '100%', height: '56px'}}>Log in</Button></>
        }
    </form>
}

export default Login;