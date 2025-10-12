import { Button, Collapse, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik"
import { Employee } from "../../../hooks/useEmployees.ts";
import { SearchTransactions, service } from "../../../hooks/useTransactions.ts";
import './TransactionFilters.scss';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DateField from "../../../components/DateField/DateField.tsx";

export default function TransactionFilters(props: { onSubmit: (values: SearchTransactions) => void, employees: Employee[] }) {
    const [open, setOpen] = useState<boolean>(false);
    const formik = useFormik<SearchTransactions>({
        initialValues: {
            start_date: null,
            end_date: null,
            employee_id: '',
            service: '',
        },
        onSubmit: (values: SearchTransactions) => {
            props.onSubmit(values);
        },
    });
    const services: service[] = ['Tattoo', 'Piercing'];

    return (
        <div className="filters" data-testid="filters">
            <Button variant="text" onClick={() => setOpen(!open)} data-testid="filters-button">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                <p>Filtros</p>
            </Button>
            <Collapse in={open}>
                <form onSubmit={formik.handleSubmit} className="filters__form">
                    <FormControl>
                        <DateField
                            label="Fecha inicial"
                            onChange={(value) => {
                                formik.setValues({
                                    ...formik.values,
                                    start_date: value,
                                });
                                formik.handleSubmit();
                            }}
                            value={formik.values.start_date}
                        />
                    </FormControl>
                    <FormControl>
                        <DateField
                            label="Fecha final"
                            onChange={(value) => {
                                    formik.setValues({
                                    ...formik.values,
                                    end_date: value,
                                });
                                formik.handleSubmit();
                            }}
                            value={formik.values.end_date}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="employee-label">Empleado</InputLabel>
                        <Select
                            labelId="employee-label"
                            id="employee_id"
                            value={formik.values.employee_id}
                            label="Employee"
                            onChange={(event) => {
                                formik.setValues({
                                    ...formik.values,
                                    employee_id: event.target.value,
                                });
                                formik.handleSubmit();
                            }}
                            className="filters__form__select"
                        >
                            {
                                props.employees.map((employee) => {
                                    return (
                                        <MenuItem key={employee._id} value={employee._id}>
                                            {`${employee.name} ${employee.lastname}`}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl className="marginTop">
                        <InputLabel id="service-label">Servicio</InputLabel>
                        <Select
                            labelId="service-label"
                            id="service"
                            value={formik.values.service}
                            label="Servicio"
                            onChange={(event) => {
                                formik.setValues({
                                    ...formik.values,
                                    service: event.target.value,
                                });
                                formik.handleSubmit();
                            }}
                            className="filters__form__select"
                        >
                            {
                                services.map((service) => {
                                    return (
                                        <MenuItem key={service} value={service}>
                                            {service}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button
                        className="marginTop"
                        variant="text"
                        onClick={() => {
                            formik.resetForm();
                            formik.handleSubmit();
                        }}
                    >
                        Borrar
                    </Button>
                </form>
            </Collapse>
        </div>
    )
}