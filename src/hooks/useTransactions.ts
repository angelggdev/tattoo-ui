import { PickerValue } from "@mui/x-date-pickers/internals";
import { useCallback, useState } from "react";
import { Employee } from "./useEmployees";

export type service = 'Tattoo' | 'Piercing';

export interface Transaction {
    _id: string;
    date: string;
    employee_id: string;
    employee_name: string;
    employee_lastname: string;
    service: service[];
    amount: number;
    details: string;
    client_name: string;
    client_phone: number;
    client_mail: string;
};

export interface SearchTransactions {
    start_date: PickerValue;
    end_date: PickerValue;
    service: service | '';
    employee_id: string;
}

export interface AddTransaction {
    date: PickerValue;
    employee_id: string;
    employee_name: string;
    employee_lastname: string;
    service: service[];
    amount: number | null;
    details: string;
    client_name: string;
    employee: Employee;
}

export function useTransactions() {
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');
    const getTransactions = useCallback(() => {
        setLoading(true);
        return fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
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

    return { loading, getTransactions };
}

export function useSearchTransactions() {
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    const searchTransactions = useCallback((payload: SearchTransactions) => {
        const params = new URLSearchParams(JSON.stringify(payload));
        setLoading(true);
        return fetch(`${process.env.REACT_APP_API_URL}/api/transactions/search?${params}`, {
            headers: {
                "Authorization": token || '',
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                return res;
            });
    }, [token]);

    return { loading, searchTransactions };
}

export function useAddTransaction() {
    const token = localStorage.getItem('token');

    const addTransaction = (value: AddTransaction) => {
        return fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
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

    return { addTransaction };
}

export function useDeleteTransaction() {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState<boolean>(false);

    const deleteTransaction = (ids: string[]) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
            headers: {
                "Authorization": token || '',
                "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({ ids }),
        })
            .then(res => res.json())
            .then(res => res);
        setLoading(false);
    };

    return { deleteTransaction, loading };
}