import { useFormik } from "formik";
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import "./AddEmployeeModal.scss";
import { AddEmployee, useAddEmployee } from "../../../hooks/useEmployees.ts";
import { service } from "../../../hooks/useTransactions.ts";

export function AddEmployeeModal(props: {
    open: boolean,
    handleClose: () => void,
    setOpen: (open: boolean) => void,
    getEmployees: () => void,
}) {
    const { addEmployee, loading } = useAddEmployee();
    const services: service[] = ['Tattoo', 'Piercing'];
    const formik = useFormik<AddEmployee>({
        initialValues: {
            name: '',
            lastname: '',
            services: [],
        },
        onSubmit: async (values) => {
            await addEmployee(values)
                .then(() => props.getEmployees());
            formik.resetForm();
            props.setOpen(false);
        },
    });
    
    return (
        <Dialog open={props.open}>
            <DialogTitle>Agregar Empleado</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} className="addEmployeeModal__form">
                    <div className="addEmployeeModal__form__row">
                        <FormControl>
                            <InputLabel htmlFor="name">Nombre</InputLabel>
                            <OutlinedInput
                                sx={{ width: '200px' }}
                                id="name"
                                label="Nombre"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                required={true}
                                data-testid="name-input"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="lastname">Apellido</InputLabel>
                            <OutlinedInput
                                sx={{ width: '200px' }}
                                id="lastname"
                                label="Apellido"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                value={formik.values.lastname}
                                required={true}
                                data-testid="lastname-input"
                            />
                        </FormControl>
                    </div>
                    <div className="addEmployeeModal__form__row">
                        <FormControl>
                            <InputLabel id="services-label">Servicios</InputLabel>
                            <Select
                                sx={{ width: '200px' }}
                                labelId="services-label"
                                id="services"
                                value={formik.values.services}
                                label="Servicios"
                                onChange={(event) => formik.setValues({
                                    ...formik.values,
                                    services: typeof event.target.value === 'string' ? [] : event.target.value,
                                })}
                                multiple
                                renderValue={(selected) => selected.join(', ')}
                                data-testid="services-select"
                            >
                                {
                                    services.map((service) => {
                                        return (
                                            <MenuItem disableRipple key={service} value={service}>
                                                <Checkbox disableRipple checked={formik.values.services.includes(service)} />
                                                <ListItemText primary={service} />
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="addEmployeeModal__form__buttons">
                        <Button disabled={loading} disableRipple type="submit" variant="contained" data-testid="add-employee-modal-button">
                            Agregar
                        </Button>
                        <Button
                            disableRipple
                            disabled={loading}
                            variant="outlined" 
                            onClick={() => {
                                props.handleClose();
                                formik.resetForm();
                            }}
                            data-testid="cancel-add-employee-button"
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}