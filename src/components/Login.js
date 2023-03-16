import {Button, OutlinedInput} from "@mui/material";
import {useForm} from "react-hook-form";
import '../App.css';

const Login = ({auth}) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = loginData => {
        auth(loginData);
    }

    return <form className="login-page" onSubmit={handleSubmit(onSubmit)}>
        <OutlinedInput {...register("login", {required: true})}
                       className="login-input"
                       placeholder="Login"/>
        <OutlinedInput {...register("password", {required: true})}
                       className="login-input"
                       placeholder="Password"
                       type="password"/>
        <Button className="login-button" type="submit"
                sx={{marginTop: '15px', maxWidth: '223px', width: '100%', height: '56px'}}>Log in</Button>
    </form>
}

export default Login;