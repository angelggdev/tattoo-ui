import { useState } from "react";
import { Transaction } from "../../../hooks/useTransactions";
import { action } from "../Transactions";
import { Button, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Row(props: {row: Transaction, actions: action[]}) {
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
                    <Collapse in={open}>
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
