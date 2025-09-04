import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext.tsx";
import { service } from "./useTransactions.ts";

export interface Employee {
    _id: string;
    name: string;
    lastname: string;
    services: Array<service>;
}

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const authContext = useAuthContext();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
            headers: {
                "Authorization": authContext?.token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => setEmployees(res)); 
    }, [authContext?.token]);
    
    return { employees };
}

export const useGetEmployeeServices = () => {
    const authContext = useAuthContext();

    const getEmployeeServices = useCallback((employeeId: string) => {
        return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${employeeId}/services`, {
            headers: {
                "Authorization": authContext?.token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => res);
    }, [authContext?.token]);

    return { getEmployeeServices };
}