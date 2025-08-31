import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.tsx";

function ProtectedRoute() {
    const [isValid, setIsValid] = useState<boolean | null>(false);
    const authContext = useAuthContext();

    useEffect(() => {
        const isAuthenticated = async () => {
            const token = authContext?.token;
            if (token) {
                const valid = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-token`, { 
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({token}),
                });
                if (valid) {
                    setIsValid(true);
                } else {
                    authContext.logout();
                    setIsValid(false);
                }
            } else {
                setIsValid(false);
            }
        }

        isAuthenticated();
    }, [])

    if (!isValid) {
        return <Navigate to="/auth/login" replace/>;
    }
    return <Outlet/>
}

export default ProtectedRoute;