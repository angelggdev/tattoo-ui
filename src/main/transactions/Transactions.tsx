import "./Transactions.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Transaction, useDeleteTransaction, useTransactions } from "../../hooks/useTransactions.ts";
import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal/AddTransactionModal.tsx";
import { Delete } from "@mui/icons-material";
import { DeleteTransactionModal } from "./DeleteTransactionModal/DeleteTransactionModal.tsx";

function Transactions() {
    const [showAddSaleModal, setShowAddSaleModal] = useState<boolean>(false);
    const [showDeleteTransactionModal, setShowDeleteTransactionModal] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsToDelete, setTransactionsToDelete] = useState<string[]>([]);
    
    const { getTransactions: fetchTransactions, loading: loadingTransactions } = useTransactions();
    const { deleteTransaction: fetchDeleteTransaction, loading: deletingTransactions } = useDeleteTransaction();

    const actions = useMemo(() => {
        return [
            {
                id: 'delete',
                icon: Delete,
                action: (ids: string[]) => {
                    openDeleteTransactionModal(ids);
                },
            },
        ];
    }, []);
    const columnData: Array<{ name: string; width: number; }> = [
        { name: 'Date', width: 100 },
        { name: 'Name', width: 100 },
        { name: 'Services', width: 100 },
        { name: 'Amount', width: 50 },
        { name: 'Details', width: 150 },
        { name: 'Client', width: 100 },
        { name: 'Actions', width: 50 },
    ];

    const openDeleteTransactionModal = (ids: string[]) => {
        setTransactionsToDelete(ids)
        setShowDeleteTransactionModal(true);
    }
    const getTransactions = useCallback(async () => {
        await fetchTransactions()
            .then((res) => setTransactions(res));
    }, [fetchTransactions]);
    const deleteTransaction = (ids: string[]) => {
        fetchDeleteTransaction(ids);
        getTransactions();
        setShowDeleteTransactionModal(false);
    }

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    return (
        <div className="transactions">
            <h1 className="transactions__title">Sales</h1>
            <div className="transactions__actions">
                <Button variant="outlined" onClick={() => setShowAddSaleModal(true)}>Add sale</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                columnData.map((column) => {
                                    return (
                                        <TableCell key={column.name} sx={{ width: column.width }}>{column.name}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(transactions.length && (!loadingTransactions || deletingTransactions)) ? 
                        transactions.map((row) => (
                            <TableRow
                                key={row._id}
                            >
                                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                <TableCell>{`${row.employee_name} ${row.employee_lastname}`}</TableCell>
                                <TableCell>{row.service.join(', ')}</TableCell>
                                <TableCell>{row.amount.toString()}</TableCell>
                                <TableCell>{row.details}</TableCell>
                                <TableCell>{row.client_name}</TableCell>
                                <TableCell>
                                    {
                                        actions.map((action) => {
                                            return (
                                                <Button key={action.id} onClick={() => action.action([row._id])}>
                                                    <action.icon />
                                                </Button>
                                            )
                                        })
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        ((loadingTransactions || deletingTransactions) ? 
                            <TableRow>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell>No results</TableCell>
                            </TableRow>
                        )
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <AddTransactionModal open={showAddSaleModal} handleClose={() => setShowAddSaleModal(false)} setOpen={setShowAddSaleModal} getTransactions={getTransactions}/>
            <DeleteTransactionModal
                open={showDeleteTransactionModal}
                handleClose={() => setShowDeleteTransactionModal(false)}
                setOpen={setShowDeleteTransactionModal}
                deleteTransaction={deleteTransaction}
                transactionIds={transactionsToDelete}
            />
        </div>
    )
}

export default Transactions;