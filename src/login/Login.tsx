import { useFormik } from "formik";
import { authBody, useLogin, useRegister } from "../shared/hooks/useAuth.ts";
import './Login.scss';
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/AuthContext.tsx";

function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit } = useLogin();
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values: authBody) => {
            setLoading(true);
            const res = await handleSubmit(values);
            const { token } = await res.json();
            if (!res.ok) {
                setShowErrorMessage(true);
                setLoading(false);
            } else {
                authContext?.login(token);
                navigate('home');
            }
        },
    });
    
    return (
        <div className="login__container">
            <form onSubmit={formik.handleSubmit} className="login__form">
                <img src="/login-pic.jpg" alt="logo"/>
                <FormControl className="login__form__username">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                        id="username"
                        label="Username"
                        disabled={loading}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        disabled={loading}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button disabled={loading} type="submit" variant="contained">Login</Button>
                {
                    showErrorMessage && 
                    <p className="login__error-message">Invalid username or password</p>
                }
            </form>
        </div>
    );
}

export default Login;