import { Button, Collapse, FormControl, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useFormik } from "formik"
import { useEmployees } from "../../../hooks/useEmployees.ts";
import { SearchTransactions, service } from "../../../hooks/useTransactions.ts";
import './TransactionFilters.scss';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DateField from "../../../components/DateField/DateField.tsx";

export default function TransactionFilters(props: { onSubmit: (values: SearchTransactions) => void }) {
    const [open, setOpen] = useState<boolean>(false);
    const { employees } = useEmployees();
    const services: service[] = [
        'Tattoo',
        'Piercing',
    ];
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

    return (
        <div className="filters">
            <Button variant="text" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                <p>Filters</p>
            </Button>
            <Collapse in={open}>
                <form onSubmit={formik.handleSubmit} className="filters__form">
                    <FormControl>
                        <DateField
                            label="Start Date"
                            onChange={(value) => formik.setValues({
                                ...formik.values,
                                start_date: value,
                            })}
                            value={formik.values.start_date}
                        />
                    </FormControl>
                    <FormControl>
                        <DateField
                            label="End Date"
                            onChange={(value) => formik.setValues({
                                ...formik.values,
                                end_date: value,
                            })}
                            value={formik.values.end_date}
                        />
                    </FormControl>
                    <FormControl className="marginTop">
                        <InputLabel id="employee-label">Employee</InputLabel>
                        <Select
                            labelId="employee-label"
                            id="employee_id"
                            value={formik.values.employee_id}
                            label="Employee"
                            onChange={(event) => formik.setValues({
                                ...formik.values,
                                employee_id: event.target.value,
                            })}
                            className="filters__form__select"
                        >
                            {
                                employees.map((employee) => {
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
                        <InputLabel id="service-label">Service</InputLabel>
                        <Select
                            labelId="service-label"
                            id="service"
                            value={formik.values.service}
                            label="Service"
                            onChange={(event) => formik.setValues({
                                ...formik.values,
                                service: event.target.value,
                            })}
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
                    <Button className="marginTop" type="submit" variant="contained">Search</Button>
                    <Button className="marginTop" variant="text" onClick={() => formik.resetForm}>Clear</Button>
                </form>
            </Collapse>
        </div>
    )
}