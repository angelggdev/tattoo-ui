import { useState } from "react";
import { action } from "../Employees";
import { Button, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Employee } from "../../../hooks/useEmployees";

export default function Row(props: {row: Employee, actions: action[]}) {
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
                    {`${props.row.name} ${props.row.lastname}`}
                </TableCell>
                <TableCell>
                    {
                        props.actions.map((action) => {
                            return (
                                <Button key={action.id} onClick={() => action.action(props.row._id)}>
                                    <action.icon />
                                </Button>
                            )
                        })
                    }
                </TableCell>
            </TableRow>
            <TableRow className="row" sx={{ backgroundColor: '#f4f5fa', width: '100%' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open}>
                        <ul>
                            <li className="row__listItem">
                                <p className='row__listItem__title'>Servicios:</p>
                                {props.row.services.join(', ')}
                            </li> 
                        </ul>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
