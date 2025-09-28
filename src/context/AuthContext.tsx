import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<{login: (newToken: string) => void; logout: () => void} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}