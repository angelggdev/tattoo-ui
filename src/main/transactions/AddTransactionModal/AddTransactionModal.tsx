import { useFormik } from "formik";
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { AddTransaction, service, useAddTransaction } from "../../../hooks/useTransactions.ts";
import "./AddTransactionModal.scss";
import { Employee, useEmployees, useGetEmployeeServices } from "../../../hooks/useEmployees.ts";
import { useEffect, useState } from "react";
import DateField from "../../../components/DateField/DateField.tsx";

export function AddTransactionModal(props: {
    open: boolean,
    handleClose: () => void,
    setOpen: (open: boolean) => void,
    getTransactions: () => void,
}) {
    const { addTransaction } = useAddTransaction();
    const { employees } = useEmployees();
    const { getEmployeeServices } = useGetEmployeeServices();
    const [services, setServices] = useState<service[]>([]);
    const formik = useFormik<AddTransaction>({
        initialValues: {
            date: null,
            employee_id: '',
            employee_name: '',
            employee_lastname: '',
            service: [] as service[],
            amount: null,
            details: '',
            client_name: '',
            employee: {} as Employee,
        },
        onSubmit: (values) => {
            const transaction = {
                ...values,
                amount: Number(values.amount),
            };
            addTransaction(transaction).then(() => props.getTransactions());
            formik.resetForm();
            props.setOpen(false);
        },
    });

    useEffect(() => {
        if (!!formik.values.employee_id) {
            getEmployeeServices(formik.values.employee_id)
                .then(res => setServices(res));
        }
    }, [formik.values.employee_id, getEmployeeServices]);
    
    return (
        <Dialog open={props.open}>
            <DialogTitle>Add Sale</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} className="addSaleModal__form">
                    <div className="addSaleModal__form__row">
                        <FormControl>
                             <DateField
                                label="Date"
                                onChange={(value) => formik.setValues({
                                    ...formik.values,
                                    date: value,
                                })}
                                value={formik.values.date}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel id="employee-label">Employee</InputLabel>
                            <Select
                                labelId="employee-label"
                                id="employee_id"
                                value={formik.values.employee_id}
                                label="Employee"
                                onChange={(event) => {
                                    const employee = employees.find((employee) => employee._id === event.target.value);
                                    if (employee) {
                                        formik.setValues({
                                            ...formik.values,
                                            employee,
                                            employee_id: event.target.value,
                                            employee_name: employee?.name || '',
                                            employee_lastname: employee?.lastname || '',
                                        })
                                    }
                                }}
                                disabled={formik.isSubmitting}
                                className="fullWidth"
                                data-testid="employee-select"
                            >
                                {
                                    employees.map((employee) => {
                                        return (
                                            <MenuItem disableRipple key={employee._id} value={employee._id} data-testid={`${employee.name} ${employee.lastname}`}>
                                                {`${employee.name} ${employee.lastname}`}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="addSaleModal__form__row">
                       <FormControl>
                            <InputLabel id="service-label">Services</InputLabel>
                            <Select
                                labelId="service-label"
                                id="service"
                                value={formik.values.service}
                                label="Services"
                                onChange={(event) => formik.setValues({
                                    ...formik.values,
                                    service: typeof event.target.value === 'string' ? [] : event.target.value,
                                })}
                                className="fullWidth"
                                disabled={!services.length || formik.isSubmitting}
                                multiple
                                renderValue={(selected) => selected.join(', ')}
                                data-testid="service-select"
                            >
                                {
                                    services.map((service) => {
                                        return (
                                            <MenuItem disableRipple key={service} value={service}>
                                                <Checkbox disableRipple checked={formik.values.service.includes(service)} />
                                                <ListItemText primary={service} />
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="amount">Amount</InputLabel>
                            <OutlinedInput
                                id="amount"
                                label="Amount"
                                type="number"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.amount}
                                required={true}
                                data-testid="amount-input"
                            />
                        </FormControl>
                    </div>
                    <div className="addSaleModal__form__row">
                        <FormControl>
                            <InputLabel htmlFor="details">Details</InputLabel>
                            <OutlinedInput
                                id="details"
                                label="Details"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.details}
                                data-testid="details-input"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="client_name">Client Name</InputLabel>
                            <OutlinedInput
                                id="client_name"
                                label="Client Name"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.client_name}
                                data-testid="client-name-input"
                            />
                        </FormControl>
                    </div>
                    <div className="addSaleModal__form__buttons">
                        <Button disableRipple type="submit" variant="contained">
                            Add
                        </Button>
                        <Button
                            disableRipple
                            variant="outlined" 
                            onClick={() => {
                                props.handleClose();
                                formik.resetForm();
                                setServices([]);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}