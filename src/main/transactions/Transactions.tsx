import "./Transactions.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Transaction, useDeleteTransaction, useTransactions } from "../../hooks/useTransactions.ts";
import { Button, Collapse, IconButton, SvgIconTypeMap } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal/AddTransactionModal.tsx";
import { Delete } from "@mui/icons-material";
import { DeleteTransactionModal } from "./DeleteTransactionModal/DeleteTransactionModal.tsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OverridableComponent } from "@mui/material/OverridableComponent";

type action = {
    id: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    action: (id: string[]) => void;
};

function Row(props: {row: Transaction, actions: action[]}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow className="row">
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {`${props.row.employee_name} ${props.row.employee_lastname}`}
                </TableCell>
                <TableCell>
                    {
                        props.actions.map((action) => {
                            return (
                                <Button key={action.id} onClick={() => action.action([props.row._id])}>
                                    <action.icon />
                                </Button>
                            )
                        })
                    }
                </TableCell>
            </TableRow>
            <TableRow className="row" sx={{ backgroundColor: '#f4f5fa', width: '100%' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} >
                        <ul>
                            <li className="row__listItem">
                                <p className='row__listItem__title'>Date:</p>
                                {new Date(props.row.date).toLocaleDateString()}
                            </li> 
                            <li className="row__listItem">
                                <p className='row__listItem__title'>Services:</p>
                                {props.row.service.join(', ')}
                            </li> 
                            <li className="row__listItem">
                                <p className='row__listItem__title'>Amount:</p>
                                {props.row.amount.toString()}
                            </li>
                            {
                                props.row.details && 
                                <li className="row__listItem">
                                    <p className='row__listItem__title'>Details: </p>
                                    {props.row.details}
                                </li> 
                            }
                            {
                                props.row.client_name && 
                                <li className="row__listItem">
                                    <p className='row__listItem__title'>Client: </p>
                                    {props.row.client_name}
                                </li> 
                            }
                        </ul>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default function Transactions() {
    const [showAddSaleModal, setShowAddSaleModal] = useState<boolean>(false);
    const [showDeleteTransactionModal, setShowDeleteTransactionModal] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsToDelete, setTransactionsToDelete] = useState<string[]>([]);
    
    const { getTransactions: fetchTransactions, loading: loadingTransactions } = useTransactions();
    const { deleteTransaction: fetchDeleteTransaction, loading: deletingTransactions } = useDeleteTransaction();

    const actions: action[] = useMemo(() => {
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

    const EmptyTable = () => {
        return ((loadingTransactions || deletingTransactions) ? 
            <TableRow>
                <TableCell>Loading...</TableCell>
            </TableRow>
            :
            <TableRow>
                <TableCell>No results</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="transactions">
            <div className="transactions__actions">
                <Button variant="outlined" onClick={() => setShowAddSaleModal(true)}>Add sale</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '80vw' }} aria-label="simple table">
                    {
                        window.innerWidth > 650 ?
                        <>
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
                                <EmptyTable />
                            }
                            </TableBody>
                        </>
                        :
                        <>
                            <TableBody>
                                {
                                    transactions.length && (!loadingTransactions || deletingTransactions) ? 
                                    transactions.map((row) => (
                                        <Row key={row._id} row={row} actions={actions} />
                                    ))
                                    :
                                    <EmptyTable />
                                }
                            </TableBody>
                        </>
                    }
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