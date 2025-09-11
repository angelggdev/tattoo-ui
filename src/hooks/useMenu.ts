import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.tsx";
import { Logout, Person, TableChart } from "@mui/icons-material";

export function useMenu() {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    return [
        {
            title: 'Sales',
            action: () => navigate('/home/transactions'),
            icon: TableChart,
        },
        {
            title: 'Employees',
            acion: () => navigate('/home/employees'),
            icon: Person,
        },
        {
            title: 'Logout',
            action: () => {
                authContext?.logout();
                navigate('/auth/login');
            },
            icon: Logout,
        }
    ];
}