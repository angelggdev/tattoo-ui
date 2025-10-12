import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.tsx";
import { Logout, Person, TableChart } from "@mui/icons-material";

export function useMenu() {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    return [
        {
            title: 'Ventas',
            action: () => navigate('/home/transactions'),
            icon: TableChart,
            testId: 'sidenav-sales',
        },
        {
            title: 'Empleados',
            action: () => navigate('/home/employees'),
            icon: Person,
            testId: 'sidenav-employees',
        },
        {
            title: 'Salir',
            action: () => {
                authContext?.logout();
                navigate('/auth/login');
            },
            icon: Logout,
            testId: 'sidenav-logout',
        }
    ];
}