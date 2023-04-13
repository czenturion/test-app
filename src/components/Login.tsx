import {useState, FC} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import '../App.css';
import {Button, CircularProgress, OutlinedInput, Typography} from "@mui/material";
import {LoginFormType, LoginType} from "../ts/types";


const Login: FC<LoginType> = ({auth}) => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm<LoginFormType>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = loginData => {
        auth(loginData, navigate, setIsLoading, setError);
    }

    const clearErrorsForm = () => {
        if (errors && errors.serverResponse && errors.serverResponse.message!.length > 0) {
            clearErrors("serverResponse")
        }
    }

    return <form className="login-page" onSubmit={handleSubmit(onSubmit)}>
        {
            isLoading
                ? <CircularProgress sx={{marginTop: "15vh"}}/>
                : <><OutlinedInput {...register("login", {required: true, onChange: clearErrorsForm})}
                                   className="login-input"
                                   placeholder="Login"/>
                    <OutlinedInput {...register("password", {required: true, onChange: clearErrorsForm})}
                                   className="login-input"
                                   placeholder="Password"
                                   type="password"/>
                    <Button className="login-button"
                            type="submit"
                            sx={{marginTop: '15px', maxWidth: '223px', width: '100%', height: '56px'}}>Log in</Button></>
        }
        {
            errors?.serverResponse?.message
                ? <Typography variant="p" sx={{color: "red", textTransform: "uppercase", marginTop: "25px"}}>{errors?.serverResponse?.message}</Typography>
                : <></>
        }
    </form>
}

export default Login;