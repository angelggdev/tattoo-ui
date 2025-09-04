import { useCallback, useState } from "react";
import { useAuthContext } from "../context/AuthContext.tsx";

export type service = 'Tattoo' | 'Piercing';

export interface Transaction {
    _id: string;
    date: string;
    employee_id: string;
    employee_name: string;
    employee_lastname: string;
    service: service[];
    amount: Number;
    details: string;
    client_name: string;
    client_phone: Number;
    client_mail: string;
};

export function useTransactions() {
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useAuthContext();
    const getTransactions = useCallback(() => {
        setLoading(true);
        return fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
            headers: {
                "Authorization": authContext?.token || '',
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                return res;
            });
    }, [authContext?.token]);

    return { loading, getTransactions };
}

export function useAddTransaction() {
    const authContext = useAuthContext();

    const addTransaction = (value: Partial<Transaction>) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
            headers: {
                "Authorization": authContext?.token || '',
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
    const authContext = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const deleteTransaction = (ids: string[]) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
            headers: {
                "Authorization": authContext?.token || '',
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