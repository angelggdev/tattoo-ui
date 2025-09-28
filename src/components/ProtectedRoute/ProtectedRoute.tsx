import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.tsx";
import { Loader } from "../Loader/Loader.tsx";

function ProtectedRoute() {
    const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const authContext = useAuthContext();

    useEffect(() => {
        const isAuthenticated = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const valid = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-token`, { 
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({token}),
                })
                    .then((res) => res.json())
                    .then((res) => res.valid);
                if (valid) {
                    setIsValid(true);
                } else {
                    authContext?.logout();
                    setIsValid(false);
                }
                setReadyToRedirect(true);
            } else {
                setIsValid(false);
                setReadyToRedirect(true);
            }
        }

        isAuthenticated();
    }, [authContext])

    if (!readyToRedirect) {
        return <Loader />
    }

    if (!isValid) {
        return <Navigate to="/auth/login" replace/>;
    }
    return <Outlet/>
}

export default ProtectedRoute;