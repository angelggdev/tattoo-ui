import { useFormik } from "formik";
import { authBody, useLogin, useRegister } from "../hooks/useAuth.ts";
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
import { useAuthContext } from "../context/AuthContext.tsx";

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
                navigate('/home');
            }
        },
    });
    
    return (
        <div className="login__container">
            <form onSubmit={formik.handleSubmit} className="login__form">
                <img src="/login-pic.jpg" alt="logo" className={loading ? 'loading-animation' : ''}/>
                <FormControl className="login__form__username">
                    <InputLabel htmlFor="username">Usuario</InputLabel>
                    <OutlinedInput
                        id="username"
                        label="Username"
                        disabled={loading}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
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
                <Button disabled={loading} type="submit" variant="contained">Ingresar</Button>
                <Button
                    disabled={loading}
                    onClick={() => {
                        formik.setValues({
                            username: process.env.REACT_APP_GUEST_USER || '',
                            password: process.env.REACT_APP_GUEST_PASSWORD || '',
                        });
                        formik.handleSubmit();
                    }}
                    variant="text"
                    data-testid="enter-as-a-guest"
                >
                    Ingresar como invitado
                </Button>
                {
                    showErrorMessage && 
                    <p className="login__error-message" data-testid="error-message">Nombre de usuario o contraseña incorrectos</p>
                }
            </form>
        </div>
    );
}

export default Login;