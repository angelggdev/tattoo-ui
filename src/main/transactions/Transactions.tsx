import "./Transactions.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SearchTransactions, Transaction, useDeleteTransaction, useSearchTransactions, useTransactions } from "../../hooks/useTransactions.ts";
import { Button, SvgIconTypeMap, TablePagination } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal/AddTransactionModal.tsx";
import { Add, Delete } from "@mui/icons-material";
import { DeleteTransactionModal } from "./DeleteTransactionModal/DeleteTransactionModal.tsx";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Row from "./Row/Row.tsx";
import { BarChart } from '@mui/x-charts/BarChart';
import TransactionFilters from "./TransactionFilters/TransactionFilters.tsx";

export type action = {
    id: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    action: (id: string[]) => void;
};

export default function Transactions() {
    const [showAddSaleModal, setShowAddSaleModal] = useState<boolean>(false);
    const [showDeleteTransactionModal, setShowDeleteTransactionModal] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsToDelete, setTransactionsToDelete] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    
    const { getTransactions: fetchTransactions, loading: loadingTransactions } = useTransactions();
    const { searchTransactions: fetchSearchTransactions, loading: loadingSearch } = useSearchTransactions();
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
    const columnData: Array<{ name: string; width: number; testId: string }> = [
        { name: 'Fecha', width: 100, testId: 'transactions-table-date' },
        { name: 'Nombre', width: 100, testId: 'transactions-table-name' },
        { name: 'Servicios', width: 100, testId: 'transactions-table-services' },
        { name: 'Monto', width: 50, testId: 'transactions-table-amount' },
        { name: 'Detalles', width: 150, testId: 'transactions-table-details' },
        { name: 'Cliente', width: 100, testId: 'transactions-table-client' },
        { name: 'Acciones', width: 50, testId: 'transactions-table-actions' },
    ];

    const openDeleteTransactionModal = (ids: string[]) => {
        setTransactionsToDelete(ids)
        setShowDeleteTransactionModal(true);
    };
    const getTransactions = useCallback(async () => {
        await fetchTransactions()
            .then((res) => setTransactions(res));
    }, [fetchTransactions]);
    const searchTransactions = useCallback(async (values: SearchTransactions) => {
        await fetchSearchTransactions(values)
            .then((res) => setTransactions(res));
    }, [fetchSearchTransactions]);
    const deleteTransaction = (ids: string[]) => {
        fetchDeleteTransaction(ids);
        getTransactions();
        setShowDeleteTransactionModal(false);
    };

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    const EmptyTable = () => {
        return ((loadingTransactions || deletingTransactions || loadingSearch) ? 
            <TableRow>
                <TableCell>Cargando...</TableCell>
            </TableRow>
            :
            <TableRow>
                <TableCell>Sin resultados</TableCell>
            </TableRow>
        );
    }

    // Chart data
    const chartData = useMemo(() => {
        const amountByDates = transactions.reduce((acc: { [key: string]: number}, currentValue) => {
            const date = new Date(currentValue.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
            acc[date] = (acc[date] || 0) + currentValue.amount;
            return acc;
        }, {})
        const data = Object.keys(amountByDates).map((key) => {
            return {
                amount: amountByDates[key],
                date: key,
            }
        }).splice(0, 10);
        return data;
    }, [transactions]);

    // Pagination 
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="transactions">
            <div className="transactions__table-container">
                <div className="transactions__actions">
                    <TransactionFilters onSubmit={searchTransactions}/>
                    <Button variant="outlined" onClick={() => setShowAddSaleModal(true)} data-testid="add-sale-button"><Add/></Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: '60vw' }} aria-label="simple table">
                        {
                            window.innerWidth > 650 ?
                            <>
                                <TableHead>
                                    <TableRow>
                                        {
                                            columnData.map((column) => {
                                                return (
                                                    <TableCell data-testid={column.testId} key={column.name} sx={{ width: column.width }}>{column.name}</TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {(transactions.length && !loadingTransactions && !deletingTransactions && !loadingSearch) ? 
                                    transactions.slice(page * 10, page * 10 + 10).map((row) => (
                                        <TableRow
                                            key={row._id}
                                        >
                                            <TableCell>{new Date(row.date).toLocaleDateString('es-ES')}</TableCell>
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
                                        (transactions.length && !loadingTransactions && !deletingTransactions && !loadingSearch) ? 
                                        transactions.slice(page * 10, page * 10 + 10).map((row) => (
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
                <TablePagination
                    component="div"
                    count={transactions.length}
                    rowsPerPage={10}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </div>
            {
               /*  window.innerWidth > 650 &&
                <div style={{ width: '30vw' }}>
                    <BarChart
                        yAxis={[{ label: 'Amount', width: 100 }]}
                        xAxis={[{ dataKey: 'date', tickPlacement: 'middle' }]}
                        series={[{ dataKey: 'amount' }]}
                        dataset={chartData}
                        height={300}
                    />
                </div> */
            }
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