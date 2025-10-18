import "./Employees.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, SvgIconTypeMap, TablePagination } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddEmployeeModal } from "./AddEmployeeModal/AddEmployeeModal.tsx";
import { Add, Delete } from "@mui/icons-material";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal.tsx";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Row from "./Row/Row.tsx";
import { Employee, useDeleteEmployee, useEmployees } from "../../hooks/useEmployees.ts";

export type action = {
    id: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    action: (id: string) => void;
};

export default function Employees() {
    const [showAddEmployeeModal, setShowAddEmployeeeModal] = useState<boolean>(false);
    const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState<boolean>(false);
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [employeeToDelete, setEmployeeToDelete] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    
    const { getEmployees: fetchEmployees, loading: loadingEmployees } = useEmployees();
    const { deleteEmployee: fetchDeleteEmployee, loading: deletingEmployees } = useDeleteEmployee();

    const actions: action[] = useMemo(() => {
        return [
            {
                id: 'delete',
                icon: Delete,
                action: (id: string) => {
                    openDeleteEmployeeModal(id);
                },
            },
        ];
    }, []);
    const columnData: Array<{ name: string; width: number; testId: string }> = [
        { name: 'Nombre', width: 100, testId: 'employees-table-name' },
        { name: 'Apellido', width: 100, testId: 'employees-table-lastname' },
        { name: 'Servicios', width: 100, testId: 'employees-table-services' },
        { name: 'Acciones', width: 50, testId: 'employees-table-actions' },
    ];

    const openDeleteEmployeeModal = (id: string) => {
        setEmployeeToDelete(id);
        setShowDeleteEmployeeModal(true);
    };
    const getEmployees = useCallback(async () => {
        await fetchEmployees()
            .then((res) => setEmployee(res));
    }, [fetchEmployees]);
    const deleteEmployee = async (id: string) => {
        await fetchDeleteEmployee(id)
            .then(() => getEmployees());
        setShowDeleteEmployeeModal(false);
    };

    useEffect(() => {
        getEmployees();
    }, [getEmployees]);

    const EmptyTable = () => {
        return ((loadingEmployees || deletingEmployees) ? 
            <TableRow>
                <TableCell>Cargando...</TableCell>
            </TableRow>
            :
            <TableRow>
                <TableCell>Sin resultados</TableCell>
            </TableRow>
        );
    }

    // Pagination 
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="employees">
            <div className="employees__table-container">
                <div className="employees__actions">
                    <Button variant="outlined" onClick={() => setShowAddEmployeeeModal(true)} data-testid="add-employee-button"><Add/></Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: '60vw' }}>
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
                                {(employee.length && !loadingEmployees && !deletingEmployees) ? 
                                    employee.slice(page * 10, page * 10 + 10).map((row) => (
                                        <TableRow
                                            key={row._id}
                                        >
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.lastname}</TableCell>
                                            <TableCell>{row.services.join(', ')}</TableCell>
                                            <TableCell>
                                                {
                                                    actions.map((action) => {
                                                        return (
                                                            <Button key={action.id} onClick={() => action.action(row._id)} data-testid={`action-delete-${row.name}`}>
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
                                        (employee.length && !loadingEmployees && !deletingEmployees) ? 
                                        employee.slice(page * 10, page * 10 + 10).map((row) => (
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
                    count={employee.length}
                    rowsPerPage={10}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </div>
            <AddEmployeeModal open={showAddEmployeeModal} handleClose={() => setShowAddEmployeeeModal(false)} setOpen={setShowAddEmployeeeModal} getEmployees={getEmployees}/>
            <DeleteModal
                open={showDeleteEmployeeModal}
                handleClose={() => setShowDeleteEmployeeModal(false)}
                setOpen={setShowDeleteEmployeeModal}
                deleteFn={() => deleteEmployee(employeeToDelete)}
            />
        </div>
    )
}