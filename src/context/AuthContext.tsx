import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{token: string | null; login: (newToken) => void; logout: () => void} | null>(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState<string | null>('');

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}