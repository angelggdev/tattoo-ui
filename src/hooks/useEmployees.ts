import { useCallback, useEffect, useState } from "react";
import { service } from "./useTransactions.ts";

export interface Employee {
    _id: string;
    name: string;
    lastname: string;
    services: Array<service>;
}

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
            headers: {
                "Authorization": token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => setEmployees(res)); 
    }, [token]);
    
    return { employees };
}

export const useGetEmployeeServices = () => {
    const token = localStorage.getItem('token');

    const getEmployeeServices = useCallback((employeeId: string) => {
        return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${employeeId}/services`, {
            headers: {
                "Authorization": token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => res);
    }, [token]);

    return { getEmployeeServices };
}