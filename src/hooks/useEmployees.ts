import { useCallback, useState } from "react";
import { service } from "./useTransactions.ts";

export interface Employee {
    _id: string;
    name: string;
    lastname: string;
    services: Array<service>;
}

export interface AddEmployee {
    name: string;
    lastname: string;
    services: Array<service>;
}

export const useEmployees = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');
    const getEmployees = useCallback(() => {
        setLoading(true);
        return fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
            headers: {
                "Authorization": token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                return res;
            }); 
    }, [token]);
    
    return { getEmployees, loading };
};

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
};

export const useDeleteEmployee = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState<boolean>(false);

    const deleteEmployee = (_id: string) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/employees/${_id}`, {
            headers: {
                "Authorization": token || '',
                "Content-Type": "application/json",
            },
            method: "DELETE",
        })
            .then(res => res.json())
            .then(res => res);
        setLoading(false);
    };

    return { deleteEmployee, loading };
};

export const useAddEmployee = () => {
    const token = localStorage.getItem('token');

    const addEmployee = (value: AddEmployee) => {
        return fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
            headers: {
                "Authorization": token || '',
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(value),
        })
            .then(res => res.json())
            .then(res => res);
    }

    return { addEmployee };
};